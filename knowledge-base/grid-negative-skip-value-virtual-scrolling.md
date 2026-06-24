---
title: Negative Skip Value or Runtime Exceptions with Virtual Grid Scrolling
description: Learn how to avoid runtime exceptions or negative Skip values in the OnRead event during elastic virtual Grid scrolling.
type: troubleshooting
page_title: How to Avoid Negative Skip Value or Runtime Exceptions with Virtual Grid Scrolling
slug: grid-kb-negative-skip-value-virtual-scrolling
tags: blazor, grid, treelist, virtualization
ticketid: 1681703, 1705599, 1712296, 1713445
res_type: kb
components: ["grid", "treelist"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

When scrolling through virtual Grid rows, users may be able to scroll beyond the top or bottom of the Grid data area, leading to unexpected empty row skeletons or a runtime exception. This KB article discusses the following scenarios related to the Telerik Grid for Blazor with enabled [virtual scrolling](slug:components/grid/virtual-scrolling):

* Telerik Blazor Grid with virtual scrolling disconnects SignalR circuit on iOS Safari when fast scrolling.
* When using a Grid with virtual scrolling and `OnRead`, if the user scrolls down and up very quickly in Safari on iPhone (iOS), the Blazor SignalR circuit disconnects.
* Virtual Grid scrolling on Safari causes the `Skip` value in the `DataSourceRequest` to be negative `-1`, which is invalid.
* Virtual Grids on iOS allow the user to continuously scroll past the end of the data source and generate additional dummy rows with the grey loading bars (row skeletons).
* Scrolling down and then quickly back up in Safari may show row placeholders.

## Cause

Some browsers, especially on Apple devices, support the so-called *elastic scrolling*, which allows users to temporarily scroll beyond the content limit of the scrollable container. In scenarios with Grid row virtualization, this can lead to data requests with a negative or too large `Skip` value that is not valid for the current Grid data.

## Solution

To avoid runtime exceptions or incorrect `Skip` values in the `OnRead` event handler, prevent elastic scrolling with a CSS rule:

>caption Disable elastic scrolling for all Grids

````CSS.skip-repl
div.k-grid-content {
    overscroll-behavior: none;
}
````

You can also target specific Grids in the app through their `Class` or `Id` parameter value:

>caption Disable elastic scrolling for specific Grids

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<style>
    .no-elastic-scrolling div.k-grid-content {
        overscroll-behavior: none;
    }
</style>

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             Class="no-elastic-scrolling"
             FilterMode="GridFilterMode.FilterMenu"
             Height="90vh"
             PageSize="30"
             RowHeight="40"
             ScrollMode="@GridScrollMode.Virtual"
             Sortable="true">
    <GridToolBarTemplate>
        Skip @GridSkip of Total @GridTotal
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Category)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" />
    </GridColumns>
</TelerikGrid>

@code {
    #nullable enable

    private List<Product> GridData { get; set; } = new();

    private int GridSkip { get; set; }
    private int? GridTotal { get; set; }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        GridSkip = args.Request.Skip;

        DataSourceResult result = await GridData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;

        GridTotal = result.Total;
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i}",
                Category = $"Category {i % 6 + 1}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000),
                Release = DateTime.Now.AddDays(-Random.Shared.Next(60, 1000)),
                Discontinued = i % 4 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Release { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Grid Row Virtualization](slug:components/grid/virtual-scrolling)
* [OnRead Event](slug:common-features-data-binding-onread)
