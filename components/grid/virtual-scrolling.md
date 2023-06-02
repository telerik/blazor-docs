---
title: Virtual Scrolling
page_title: Grid - Virtual Scrolling
description: Enable and configure virtual scrolling in Grid for Blazor.
slug: components/grid/virtual-scrolling
tags: telerik,blazor,grid,virtual,scrolling
published: True
position: 60
---

# Virtual Scrolling

Virtual scrolling is an alternative to paging. Instead of using a pager, the user scrolls vertically through all records in the data source.

The same set of elements is reused to improve the rendering performance. While the next data is loading, a loading indicator is shown on the cells. If the user scrolls back up after scrolling down to a next set of rows, the previous data will be loaded anew from the data source, like with regular paging, but the scroll distance determines the data to be loaded.

You can also Virtually Scroll the Grid Columns. More information can be found in the [Column Virtualization]({%slug grid-columns-virtual%}) article.

## Requirements

To enable virtual scrolling:

1. Set `ScrollMode="@GridScrollMode.Virtual"` - this enables the virtualization of items

2. Provide  `Height`, `RowHeight`, and `PageSize` to the grid - this lets the grid calculate the position of the user in order to fetch the correct set of items from the data source.

>caption Sample of virtual scrolling in the Telerik Grid for Blazor

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             ScrollMode="@GridScrollMode.Virtual"
             Height="480px" RowHeight="60" PageSize="20"
             Sortable="true" FilterMode="GridFilterMode.FilterRow">
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

>tip Set suitable widths for columns that will render long text. This will prevent the cell content from breaking into multiple lines, which will increase the row height. See the notes below for more details.

## Notes

There are several things to keep in mind when using virtual scrolling:

* The `RowHeight` is a decimal value that is always considered as pixel values. If you use [row template]({%slug components/grid/features/templates%}#row-template), make sure it matches the `RowHeight`. The grid `Height` does not have to be in pixels, but it may help you calculate the `PageSize` (see below).

    * If the row/cell height the browser would render is larger than the `RowHeight` value, the browser will ignore it. It can depend on the chosen Theme or other CSS rules, or on cell data that falls on more than one row. Inspect the rendered HTML to make sure the grid setting matches the rendering.

        The default grid rendering has padding in the cells, and the loading sign has a line height set in order to render. This may impose some minimum heights that can vary with the theme and/or custom styles on the page. You can remove both with the following rules: `.k-placeholder-line{display:none;} .k-grid td{margin:0;padding:0;}`.

    * The `RowHeight` must not change at runtime, because the new dimensions will cause issues with the scrolling logic.

    * Browser zoom or monitor DPI settings can cause the browser to render different dimensions than the expected and/or non-integer values, which can break the virtualization logic.

* Do not mix virtualization with paging, as they are alternatives to the same feature.

* Provide for a `PageSize` of the Grid that is large enough, so that the loaded table rows do not fit in the scrollable data area, otherwise the vertical virtual scrollbar will not be created and scrolling will not work. To do this, take into account the `Height` of the grid and the `RowHeight`.

    * The `PageSize` controls how many rows are rendered at any given time, and how many items are requested from the data source when loading data on demand (see below). You should avoid setting large page sizes, you need to only fill up the grid data viewport.

* To load data on demand, use the [`OnRead` event]({%slug components/grid/manual-operations%}), and in it, use the `PageSize` and `Skip` parameters to know what data to return, instead of `PageSize` and `Page` as with regular paging.

    * Data requests will be made when the user scrolls, but not necessarily when they scroll an entire page of data. Row virtualization is a user experience and UI optimization technique and not necessarily a data request optimization. The user may scroll a few rows, or they may keep scrolling and skip many pages. The grid cannot predict the user action, so it needs to request the data when the user changes what should be displayed.

* Horizontal scrolling is not virtualized by default and all columns are rendered. You can enable [Column Virtualization]({%slug grid-columns-virtual%}) separately too.

* Multiple Selection has some specifics when you use the `OnRead` event, you can read more about its behavior in the [Multiple Selection]({%slug components/grid/selection/multiple%}#checkbox-selection) article.

## Limitations

Virtualization is mainly a technique for improving client-side (rendering) performance and the user experience. Its cost is that some features of the grid do not work with it. An alternative to that is to use [regular paging]({%slug components/grid/features/paging%}) with [manual data source operations]({%slug components/grid/manual-operations%}) to implement the desired performance of the data retrieval.

List of the known limitations of the virtual scrolling feature:

* [Hierarchy]({%slug components/grid/features/hierarchy%}) is not supported.

* [Grouping]({%slug components/grid/features/grouping%}) is not supported. [Loading Group Data On Demand]({%slug grid-group-lod%}) is supported, however.

* The `Data` of the grid must contain more items than the `PageSize` in order for the virtual scrolling feature to work. You can work around this with something similar to `ScrollMode="@(DataCollection.Count() > 30 ? GridScrollMode.Virtual : GridScrollMode.Scrollable)"`

    * If you set the `Skip` manually through the grid [state]({%slug grid-state%}), you must ensure the value is valid and does not result in items that cannot fill up the viewport. You can find more details in the [Setting Too Large Skip]({%slug grid-kb-large-skip-virtualization%}) Knowledge Base article.

* When there are too many records, the browser may not let you scroll down to all of them, read more in the [Virtual Scroll does not show all items]({%slug grid-kb-virtualization-many-records%}) KB article.


## See Also

  * [Live Demo: Grid Virtual Scrolling](https://demos.telerik.com/blazor-ui/grid/virtual-scrolling)
