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

When the filter input contains leading or trailing spaces, the Grid's filtering does not return any matches. How to ensure that the Grid returns matching records, for example, when I search for " Apple" or "Apple ", it should behave the same way as when I search for "Apple"?

## Solution

To trim leading and trailing spaces in Grid FilterRow values, use the Grid [`OnRead` event](slug:components/grid/manual-operations). Create a new `DataSourceRequest` based on `args.Request` and trim only the string filter values in the copied filter descriptors.

This approach does not require column templates and keeps the visible filter input unchanged.

>caption Grid FilterRow that trims leading and trailing spaces

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>
    Try typing <strong>" Apple"</strong> or <strong>"Apple "</strong> — matches same as <strong>"Apple"</strong>.
    The filter input is untouched; only the query copy is trimmed.
</p>

<TelerikGrid OnRead="@OnReadItems"
             TItem="@FruitItem"
             FilterMode="@GridFilterMode.FilterRow"
             Pageable="true"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="@nameof(FruitItem.Id)" />
        <GridColumn Field="@nameof(FruitItem.Name)" />
        <GridColumn Field="@nameof(FruitItem.Status)" />
        <GridColumn Field="@nameof(FruitItem.Category)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<FruitItem> AllData { get; set; } =
    [
        new() { Id = 1, Name = "Apple",       Status = "Active",   Category = "Fruit" },
        new() { Id = 2, Name = "Banana",      Status = "Inactive", Category = "Fruit" },
        new() { Id = 3, Name = "Green Apple", Status = "Active",   Category = "Fruit" },
        new() { Id = 4, Name = "Mango",       Status = "Pending",  Category = "Tropical" },
        new() { Id = 5, Name = "Pineapple",   Status = "Active",   Category = "Tropical" },
        new() { Id = 6, Name = "Red Apple",   Status = "Active",   Category = "Fruit" },
    ];

    private async Task OnReadItems(GridReadEventArgs args)
    {
        // Build a new DataSourceRequest with fresh, trimmed FilterDescriptor instances.
        // The original args.Request (and its descriptors) are never touched,
        // so the Grid's internal state and the visible filter input stay intact.
        var trimmedRequest = new DataSourceRequest
        {
            Page = args.Request.Page,
            PageSize = args.Request.PageSize,
            Sorts = args.Request.Sorts,
            Filters = BuildTrimmedFilters(args.Request.Filters),
            Groups = args.Request.Groups,
            Aggregates = args.Request.Aggregates
        };

        var result = AllData.ToDataSourceResult(trimmedRequest);
        args.Data = result.Data;
        args.Total = result.Total;

        await Task.CompletedTask;
    }

    // Returns a new filter list where every FilterDescriptor is a new instance
    // with its string Value trimmed. Composite descriptors are also recreated.
    private static FilterDescriptorCollection BuildTrimmedFilters(IEnumerable<IFilterDescriptor> source)
    {
        var result = new FilterDescriptorCollection();
        foreach (var filter in source)
        {
            if (filter is CompositeFilterDescriptor composite)
            {
                result.Add(new CompositeFilterDescriptor
                {
                    LogicalOperator = composite.LogicalOperator,
                    FilterDescriptors = BuildTrimmedFilters(composite.FilterDescriptors)
                });
            }
            else if (filter is FilterDescriptor fd)
            {
                result.Add(new FilterDescriptor
                {
                    Member = fd.Member,
                    MemberType = fd.MemberType,
                    Operator = fd.Operator,
                    Value = fd.Value is string s ? s.Trim() : fd.Value
                });
            }
        }
        return result;
    }

    public class FruitItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
````

## See Also

* [Grid Filtering](slug:components/grid/filtering)
* [Grid Filter Templates](slug:grid-templates-filter)
* [Grid Filter Row](slug:grid-filter-row)
