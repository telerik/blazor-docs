---
title: Virtual Scrolling
page_title: Grid - Virtual Scrolling
description: Enable and configure virtualization in Blazor Grid with virtual scrolling - an alternative to paging.
slug: components/grid/virtual-scrolling
tags: telerik,blazor,grid,virtual,scrolling
published: True
position: 60
---

# Virtual Scrolling

Virtual scrolling provides an alternative to paging. Instead of utilizing a pager, the user scrolls vertically through all records in the data source.

To enhance rendering performance, the Grid reuses the same set of HTML elements. As the next data loads, a loading indicator appears on the cells. If the user scrolls back up after scrolling down to the next set of rows, the previous data reloads from the data source, similar to regular paging, with the scroll distance determining the data to be loaded.

You can also use the Blazor Grid virtualization for the Grid columns. See the [Column Virtualization](slug://grid-columns-virtual) article for more information.

## Using Virtual Scrolling

For the Blazor Grid virtualization to work, you need to:

1. Set the `ScrollMode` parameter to `GridScrollMode.Virtual` (the default value is `Scrollable`).
1. [Set the `Height` parameter](#setting-a-value-for-the-height-parameter).
1. [Set the `RowHeight` parameter](#setting-a-value-for-the-rowheight-parameter).
1. [Set the `PageSize` parameter](#setting-a-value-for-the-pagesize-parameter).

## Setting a Value for the Height Parameter

Set the `Height` parameter to a `string` value. The value can be in:

* Pixels&mdash;for example, `Height="480px"`.
* Percent&mdash;for example, `Height="30%"`. If you set the `Height` parameter to a percentage value, ensure that the wrapper of the Grid has a fixed height set in pixels.
* Relative CSS units like vh, vmin, and vmax&mdash;for example, `Height="30vh"`.

The tabs below show how to set the `Height` parameter with the different value options.

<div class="skip-repl"></div>
````RAZOR Pixel
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             ScrollMode="@GridScrollMode.Virtual"
             Height="480px" RowHeight="60" PageSize="20"
             Sortable="true" FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.Stock)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();

    private async Task OnGridRead(GridReadEventArgs args)
    {
        await Task.Delay(200); // simulate network delay

        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Stock = rnd.Next(0, 100)
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
````
````RAZOR Percent
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<div style="height: 600px">
    <TelerikGrid OnRead="@OnGridRead"
                 TItem="@Product"
                 ScrollMode="@GridScrollMode.Virtual"
                 Height="100%" RowHeight="60" PageSize="20"
                 Sortable="true" FilterMode="@GridFilterMode.FilterRow">
        <GridColumns>
            <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
            <GridColumn Field="@nameof(Product.Stock)" />
        </GridColumns>
    </TelerikGrid>
</div>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();

    private async Task OnGridRead(GridReadEventArgs args)
    {
        await Task.Delay(200); // simulate network delay

        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new Product()
                {
                    Id = i,
                    Name = $"Product {i}",
                    Stock = rnd.Next(0, 100)
                });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
````
````RAZOR RelativeUnits
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<div>Select a relative CSS unit from the RadioGroup to see how the Grid's Height reacts to different relative CSS units.</div>

<TelerikRadioGroup Data="@RelativeUnitsOptions"
                   Value="@ChosenRelativeUnit"
                   ValueChanged="@((int relativeUnitId) => RadioGroupChanged(relativeUnitId))"
                   ValueField="@nameof(RelativeUnitsDescriptor.RelativeUnitId)"
                   TextField="@nameof(RelativeUnitsDescriptor.RelativeUnitText)">
</TelerikRadioGroup>

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             ScrollMode="@GridScrollMode.Virtual"
             Height="@GridHeight" RowHeight="60" PageSize="20"
             Sortable="true" FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.Stock)" />
    </GridColumns>
</TelerikGrid>

@code {
    private int ChosenRelativeUnit { get; set; }

    private string GridHeight { get; set; }

    private void RadioGroupChanged(int relativeUnitId)
    {
        ChosenRelativeUnit = relativeUnitId;

        RelativeUnitsDescriptor relativeUnit = RelativeUnitsOptions.FirstOrDefault(x => x.RelativeUnitId == relativeUnitId);

        GridHeight = "50" + relativeUnit.RelativeUnitText;
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        await Task.Delay(200); // simulate network delay

        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    protected override void OnInitialized()
    {
        GridHeight = "50" + RelativeUnitsOptions.FirstOrDefault().RelativeUnitText;

        GridData = new List<Product>();

        var rnd = new Random();

        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new Product()
                {
                    Id = i,
                    Name = $"Product {i}",
                    Stock = rnd.Next(0, 100)
                });
        }
    }

    private List<Product> GridData { get; set; } = new List<Product>();

    private List<RelativeUnitsDescriptor> RelativeUnitsOptions { get; set; } = new List<RelativeUnitsDescriptor>
    {
        new RelativeUnitsDescriptor { RelativeUnitId = 1, RelativeUnitText = "vm" },
        new RelativeUnitsDescriptor { RelativeUnitId = 2, RelativeUnitText = "vmax" },
        new RelativeUnitsDescriptor { RelativeUnitId = 3, RelativeUnitText = "vmin" }
    };

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Stock { get; set; }
    }

    public class RelativeUnitsDescriptor
    {
        public int RelativeUnitId { get; set; }
        public string RelativeUnitText { get; set; }
    }
}
````

## Setting a Value for the RowHeight Parameter

Set the `RowHeight` parameter to a `decimal` value which will always be interpreted as pixels (`px`). The value of the `RowHeight` must be greater than the height of the cell (or row) that the browser would normally render. 

Consider the following specifics when setting the row height value:

* The Grid renders padding in the cells by default. The loading skeletons have a line height in order to render. This results in some minimum row heights, which can vary depending on the theme and custom CSS styles on the page.
* Ensure the height of the `td` element matches the `RowHeight` when using the [Row Template](slug://grid-templates-row).
* Do not change the value of the `RowHeight` parameter at runtime.

````RAZOR
@* Remove the default padding and margin from the cells and remove the default line height of the loading skeletons to reduce the row height. *@

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<style>
    .small-row-height .k-placeholder-line {
        display: none;
    }

    .small-row-height.k-grid td {
        margin: 0;
        padding: 0;
    }
</style>

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             ScrollMode="@GridScrollMode.Virtual"
             Height="480px" RowHeight="30" PageSize="20"
             Sortable="true" FilterMode="@GridFilterMode.FilterRow"
             Class="small-row-height">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.Stock)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();

    private async Task OnGridRead(GridReadEventArgs args)
    {
        await Task.Delay(200); // simulate network delay

        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new Product()
                {
                    Id = i,
                    Name = $"Product {i}",
                    Stock = rnd.Next(0, 100)
                });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
````

## Setting a Value for the PageSize Parameter

Set the `PageSize` parameter to an `int` value. The `PageSize` determines how many rows are rendered at any given time and how many items are requested from the data source when loading data on demand. For optimal performance, use a page size that fills the grid's data viewport without being excessively large.

## Limitations

The Blazor Grid virtualization primarily enhances client-side rendering performance and improves the user experience. However, it comes with the trade-off that certain features of the Grid are incompatible with it. An alternative approach is to utilize [regular paging](slug://components/grid/features/paging) combined with [manual data source operations](slug://components/grid/manual-operations) to achieve the desired data retrieval performance.

These are the known limitations of the virtual scrolling feature:

* [Hierarchy](slug://components/grid/features/hierarchy) is not supported.

* [Grouping](slug://components/grid/features/grouping) is not supported. [Loading Group Data On Demand](slug://grid-group-lod) is supported, however.


## See Also

  * [Live Demo: Grid Virtual Scrolling](https://demos.telerik.com/blazor-ui/grid/virtual-scrolling)
  * [Selection in Grid with Virtualized Rows](slug://grid-selection-row#selection-and-virtual-scrolling)
  * [Knowledge Base Article: Virtual Scroll Does Not Show All Items](slug://grid-kb-virtualization-many-records)
  * [Knowledge Base Article: Virtual Scrolling Does Not Work](slug://grid-kb-virtual-scrolling-troubleshooting)
  * [Knowledge Base Article: Setting Too Large Skip](slug://grid-kb-large-skip-virtualization)
  * [Blazor Grid](slug://grid-overview)
