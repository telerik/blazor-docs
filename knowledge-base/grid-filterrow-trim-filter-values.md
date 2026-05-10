---
title: Trim Leading and Trailing Spaces in Grid FilterRow Values
description: Learn how to trim leading and trailing spaces from Telerik Grid FilterRow input values in Blazor.
type: how-to
page_title: How to Trim Leading and Trailing Spaces in Grid FilterRow Values
slug: grid-kb-filterrow-trim-filter-values
tags: telerik, blazor, grid, filterrow, filtering
ticketid: 1712682
res_type: kb
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

When users type leading or trailing spaces in Grid FilterRow inputs, the filter can return unexpected results. You can customize the filter UI with `FilterCellTemplate` and trim the input before applying the filter.

## Solution

To trim leading and trailing spaces in Grid FilterRow values, define a [`FilterCellTemplate`](slug:grid-templates-filter#filter-row-template) for the target columns and update the filter descriptor manually.

Use `string.Trim()` only when assigning the value to the filter descriptor. This keeps internal spaces intact, so values like `Green Apple` continue to work as expected.

>caption Grid FilterRow that trims leading and trailing spaces

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             TItem="@FruitItem"
             FilterMode="@GridFilterMode.FilterRow"
             Pageable="true"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="@nameof(FruitItem.Id)" />
        <GridColumn Field="@nameof(FruitItem.Name)">
            <FilterCellTemplate>
                <TelerikTextBox Value="@NameFilterValue"
                                ValueChanged="@( (string newValue) => OnNameChanged(newValue, context) )" />
                <TelerikButton Class="k-clear-button-visible ml-2"
                               Icon="@SvgIcon.FilterClear"
                               OnClick="@(async () => await OnNameCleared(context))" />
            </FilterCellTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(FruitItem.Status)">
            <FilterCellTemplate>
                <TelerikTextBox Value="@StatusFilterValue"
                                ValueChanged="@( (string newValue) => OnStatusChanged(newValue, context) )" />
                <TelerikButton Class="k-clear-button-visible ml-2"
                               Icon="@SvgIcon.FilterClear"
                               OnClick="@(async () => await OnStatusCleared(context))" />
            </FilterCellTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<FruitItem> GridData { get; set; } = new();
    private string NameFilterValue { get; set; } = string.Empty;
    private string StatusFilterValue { get; set; } = string.Empty;

    private async Task OnNameChanged(string newValue, FilterCellTemplateContext context)
    {
        NameFilterValue = newValue;
        ApplyTrimmedFilter(context, newValue, FilterOperator.Contains);
        await context.FilterAsync();
    }

    private async Task OnNameCleared(FilterCellTemplateContext context)
    {
        NameFilterValue = string.Empty;
        await context.ClearFilterAsync();
    }

    private async Task OnStatusChanged(string newValue, FilterCellTemplateContext context)
    {
        StatusFilterValue = newValue;
        ApplyTrimmedFilter(context, newValue, FilterOperator.Contains);
        await context.FilterAsync();
    }

    private async Task OnStatusCleared(FilterCellTemplateContext context)
    {
        StatusFilterValue = string.Empty;
        await context.ClearFilterAsync();
    }

    private static void ApplyTrimmedFilter(
        FilterCellTemplateContext context,
        string rawValue,
        FilterOperator filterOperator)
    {
        FilterDescriptor? filterDescriptor = context.FilterDescriptor.FilterDescriptors
            .OfType<FilterDescriptor>()
            .FirstOrDefault();

        if (filterDescriptor is null)
        {
            return;
        }

        filterDescriptor.Operator = filterOperator;
        filterDescriptor.Value = rawValue.Trim();
    }

    protected override void OnInitialized()
    {
        GridData = new List<FruitItem>
        {
            new() { Id = 1, Name = "Apple", Status = "Active" },
            new() { Id = 2, Name = "Banana", Status = "Inactive" },
            new() { Id = 3, Name = "Green Apple", Status = "Active" },
            new() { Id = 4, Name = "Mango", Status = "Pending" },
            new() { Id = 5, Name = "Pineapple", Status = "Active" }
        };
    }

    public class FruitItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
````

## See Also

* [Grid Filtering](slug:components/grid/filtering)
* [Grid Filter Templates](slug:grid-templates-filter)
* [Grid Filter Row](slug:grid-filter-row)
