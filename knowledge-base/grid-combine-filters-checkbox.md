---
title: Combine a Default Filter Menu with a Checkbox List
description: Learn how to create Excel-like filtering in Blazor Data Grid columns by combining operator-based filters and checkbox lists.
type: how-to
page_title: Combine a Default Filter Menu with a Checkbox List
meta_title: Combine a Default Filter Menu with a Checkbox List
slug: grid-kb-combine-filters-checkbox
tags: grid, blazor, filter, menu, template, checkbox, list, excel
res_type: kb
ticketid: 1708346
components: ["grid"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to enable "Excel-like" filtering in the Blazor Grid. Specifically, for each column, I want to combine operator-based filtering (e.g., contains or equals) with a checkbox list for selecting distinct values from the data source. By default, the Blazor Grid allows either the filter menu or the checkbox list, but not both simultaneously.

## Solution

To combine operator-based filters and checkbox lists in the same column, use the [`FilterMenuTemplate`](slug:grid-templates-filter#filter-menu-template) that allows you to customize the filter menu. 

````Razor
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             FilterMode="@GridFilterMode.FilterMenu"
             Pageable="true"
             Width="600px">
    <GridColumns>
        <GridColumn Field="@(nameof(Product.Name))"
                    Title="Product"
                    Filterable="false" />

        <GridColumn Field="@(nameof(Product.Size))">
            <FilterMenuTemplate Context="context">
                @{
                    EnsureFilterDescriptors(context);
                    var fd0 = (FilterDescriptor)context.FilterDescriptor.FilterDescriptors[0];
                    var fd1 = (FilterDescriptor)context.FilterDescriptor.FilterDescriptors[1];
                }

                <!-- First operator -->
                <TelerikDropDownList Data="@FilterOperators"
                                     TextField="Text"
                                     ValueField="Value"
                                     @bind-Value="@fd0.Operator"
                                     Width="100%" />

                <!-- First value -->
                <TelerikTextBox Value="@Convert.ToString(fd0.Value)"
                                ValueChanged="@(v => fd0.Value = v)"
                                Width="100%" />

                <!-- Logical operator -->
                <TelerikDropDownList Data="@LogicalOperators"
                                     TextField="Text"
                                     ValueField="Value"
                                     @bind-Value="@context.FilterDescriptor.LogicalOperator"
                                     Width="100%" />

                <!-- Second operator -->
                <TelerikDropDownList Data="@FilterOperators"
                                     TextField="Text"
                                     ValueField="Value"
                                     @bind-Value="@fd1.Operator"
                                     Width="100%" />

                <!-- Second value -->
                <TelerikTextBox Value="@Convert.ToString(fd1.Value)"
                                ValueChanged="@(v => fd1.Value = v)"
                                Width="100%" />

                <!-- Checkbox filter -->
                @foreach (var size in Sizes)
                {
                    <div>
                        <TelerikCheckBox Value="@(IsCheckboxInCurrentFilter(context.FilterDescriptor, size))"
                                         TValue="bool"
                                         ValueChanged="@((value) => UpdateCheckedSizes(value, size, context))"
                                         Id="@($"size_{size}")" />
                        <label for="@($"size_{size}")">
                            @(size ?? "Empty")
                        </label>
                    </div>
                }
            </FilterMenuTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }
    private string[] Sizes = new[] { "XS", "S", "M", "L", "XL", null };

    private readonly List<DropDownItem<FilterOperator>> FilterOperators =
        Enum.GetValues(typeof(FilterOperator))
            .Cast<FilterOperator>()
            .Select(o => new DropDownItem<FilterOperator>
            {
                Text = o.ToString(),
                Value = o
            }).ToList();

    private readonly List<DropDownItem<FilterCompositionLogicalOperator>> LogicalOperators =
        Enum.GetValues(typeof(FilterCompositionLogicalOperator))
            .Cast<FilterCompositionLogicalOperator>()
            .Select(o => new DropDownItem<FilterCompositionLogicalOperator>
            {
                Text = o.ToString(),
                Value = o
            }).ToList();

    private void EnsureFilterDescriptors(FilterMenuTemplateContext context)
    {
        while (context.FilterDescriptor.FilterDescriptors.Count < 2)
        {
            context.FilterDescriptor.FilterDescriptors.Add(new FilterDescriptor());
        }
    }

    private bool IsCheckboxInCurrentFilter(CompositeFilterDescriptor filterDescriptor, string size)
    {
        if (size == null)
        {
            return filterDescriptor.FilterDescriptors
                .OfType<FilterDescriptor>()
                .Any(fd => fd.Operator == FilterOperator.IsNull);
        }

        return filterDescriptor.FilterDescriptors
            .OfType<FilterDescriptor>()
            .Any(fd => fd.Value?.ToString() == size);
    }

    private void UpdateCheckedSizes(bool isChecked, string itemValue, FilterMenuTemplateContext context)
    {
        var composite = context.FilterDescriptor;
        composite.LogicalOperator = FilterCompositionLogicalOperator.Or;

        if (!isChecked)
        {
            var toRemove = composite.FilterDescriptors
                .OfType<FilterDescriptor>()
                .FirstOrDefault(fd =>
                    (fd.Operator == FilterOperator.IsNull && itemValue == null) ||
                    (fd.Operator == FilterOperator.IsEqualTo && fd.Value?.ToString() == itemValue));

            if (toRemove != null)
            {
                composite.FilterDescriptors.Remove(toRemove);
            }
        }
        else
        {
            composite.FilterDescriptors.Add(new FilterDescriptor
            {
                Member = nameof(Product.Size),
                MemberType = typeof(string),
                Operator = itemValue == null ? FilterOperator.IsNull : FilterOperator.IsEqualTo,
                Value = itemValue
            });
        }
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 70).Select(x => new Product
        {
            Id = x,
            Name = $"Product {x}",
            Size = Sizes[x % Sizes.Length]
        }).ToList();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
    }

    public class DropDownItem<T>
    {
        public string Text { get; set; }
        public T Value { get; set; }
    }
}
````

## See Also

* [Filter Menu Template Documentation](slug:grid-templates-filter#filter-menu-template)
* [Filter Menu Documentation](slug:grid-filter-menu)
* [CheckBoxList Filter Documentation](slug:grid-checklist-filter)
