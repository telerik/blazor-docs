---
title: FilterMenuTemplate Not Updating After Dynamic Value Change
description: Learn how to refresh and update the displayed value within a FilterMenuTemplate when its value changes dynamically in Grid for Blazor.
type: troubleshooting
page_title: Refreshing FilterMenuTemplate to Reflect Dynamic Value Changes in Blazor Grid
slug: grid-kb-dynamically-updating-filtermenutemplate-value
tags: grid, blazor, filter, filtermenutemplate
res_type: kb
ticketid: 1677674
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

I have a custom `FilterMenuTemplate` for a column where a slider is shown. Although filtering works as expected, the `<span>` within the `FilterMenuTemplate` that is supposed to show the current selected value does not update when the slider value changes.

## Cause

The [`FilterMenuTemplate`](slug:grid-templates-filter#filter-menu-template) does not refresh automatically when the value bound to a control within it, such as a slider, changes dynamically.

## Solution

To resolve this issue, encapsulate the content of the `FilterMenuTemplate` in a separate Razor component. Then, refresh this component upon any value change in the Slider. This approach ensures that the displayed value updates dynamically to reflect the current selection. Follow the steps below to implement this solution:

1. Create a separate Razor component (for example, `CustomFilterMenu.razor`) that will contain the `FilterMenuTemplate` content, including the slider and the span displaying the selected value.

2. In your `CustomFilterMenu.razor`, define the necessary parameters and logic to handle the value change and update the display.

3. Use this component within the `FilterMenuTemplate` of the desired column in your Grid.

4. Ensure that any value change in the slider triggers the component's refresh to update the displayed value accordingly.

`````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             FilterMode="@GridFilterMode.FilterMenu"
             Pageable="true"
             Width="600px">
    <GridColumns>
        <GridColumn Field="@(nameof(Product.Name))" Title="Product" Filterable="false" />
        <GridColumn Field="@(nameof(Product.Price))">
    <FilterMenuTemplate>
        <CustomPriceFilter @bind-SelectedPrice="@SelectedPrice"
                           Context="context" />
    </FilterMenuTemplate>
</GridColumn>

        <GridColumn Field="@(nameof(Product.Size))">
            <FilterMenuTemplate>
                @foreach (var size in Sizes)
                {
                    <div>
                        <TelerikCheckBox Value="@(IsCheckboxInCurrentFilter(context.FilterDescriptor, size))"
                                         TValue="bool"
                                         ValueChanged="@((value) => UpdateCheckedSizes(value, size, context))"
                                         Id="@($"size_{size}")">
                        </TelerikCheckBox>
                        <label for="@($"size_{size}")">
                            @if (size == null) // part of handling nulls - show meaningful text for the end user
                            {
                                <text>Empty</text>
                            }
                            else
                            {
                                @size
                            }
                        </label>
                    </div>
                }
            </FilterMenuTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }

    private string[] Sizes = new string[] { "XS", "S", "M", "L", "XL", null };

    private double SelectedPrice { get; set; }

    private void OnPriceChanged(double value, FilterMenuTemplateContext context)
    {
        SelectedPrice = value;
        context.FilterDescriptor.FilterDescriptors.Clear();
        context.FilterDescriptor.FilterDescriptors.Add(new FilterDescriptor(nameof(Product.Price), FilterOperator.IsGreaterThanOrEqualTo, value));
    }

    private bool IsCheckboxInCurrentFilter(CompositeFilterDescriptor filterDescriptor, string size)
    {
        if (size == null)
        {
            foreach (FilterDescriptor item in filterDescriptor.FilterDescriptors)
            {
                if (item.Operator == FilterOperator.IsNull)
                {
                    return true;
                }
            }
            return false;
        }
        return filterDescriptor.FilterDescriptors.Select(f => (f as FilterDescriptor).Value?.ToString()).ToList().Contains(size);
    }

    private void UpdateCheckedSizes(bool isChecked, string itemValue, FilterMenuTemplateContext context)
    {
        var compositeFilterDescriptor = context.FilterDescriptor;
        compositeFilterDescriptor.LogicalOperator = FilterCompositionLogicalOperator.Or;

        if (!isChecked)
        {
            compositeFilterDescriptor.FilterDescriptors.Remove(compositeFilterDescriptor.FilterDescriptors.First(x =>
            {
                var fd = x as FilterDescriptor;
                if ((fd.Operator == FilterOperator.IsNull && itemValue == null) ||
                    (fd.Operator == FilterOperator.IsEqualTo && fd.Value?.ToString() == itemValue))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }));
        }
        else
        {
            compositeFilterDescriptor.FilterDescriptors.Add(new FilterDescriptor()
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
            Size = Sizes[x % Sizes.Length],
            Name = $"Product {x}",
            Price = x
        }).ToList();

        base.OnInitialized();
    }
}
`````
`````RAZOR CustomPriceFilter.razor
@using Telerik.DataSource

<TelerikStackLayout HorizontalAlign="@StackLayoutHorizontalAlign.Center" Orientation="StackLayoutOrientation.Vertical">
    <span>@SelectedPrice</span>
    <TelerikSlider ShowButtons="false"
                   TickPosition="SliderTickPosition.None"
                   Min="0"
                   Max="100"
                   Width="100%"
                   LargeStep="10"
                   SmallStep="1"
                   Value="@SelectedPrice"
                   ValueChanged="@((double v) => OnPriceChanged(v))">
    </TelerikSlider>
</TelerikStackLayout>

@code {
    [Parameter] public double SelectedPrice { get; set; }
    [Parameter] public EventCallback<double> SelectedPriceChanged { get; set; }
    [Parameter] public FilterMenuTemplateContext Context { get; set; } = null!;

    private async Task OnPriceChanged(double newValue)
    {
        SelectedPrice = newValue;
        Context.FilterDescriptor.FilterDescriptors.Clear();
        Context.FilterDescriptor.FilterDescriptors.Add(new FilterDescriptor(nameof(Product.Price), FilterOperator.IsGreaterThanOrEqualTo, newValue));
        await SelectedPriceChanged.InvokeAsync(newValue);
    }
}
`````
`````RAZOR Product.cs
public class Product
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Size { get; set; }
    public double Price { get; set; }
}
`````
## See Also

- [Grid Filter Templates](slug:grid-templates-filter)
- [Filtering in Grid](slug:components/grid/filtering)
