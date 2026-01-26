---
title: Virtual Scrolling
page_title: Grid - Virtual Scrolling
description: Enable and configure virtualization in Blazor Grid with virtual scrolling - an alternative to paging.
slug: components/grid/virtual-scrolling
tags: telerik,blazor,grid,virtual,scrolling
published: True
position: 60
components: ["grid"]
---
# Grid Virtual Scrolling

The Grid virtual scrolling feature allows users to scroll vertically through all records in the Grid data source. The feature is an alternative to paging.

To enhance the rendering performance, the Grid reuses the same set of HTML elements. Loading indicators (skeletons) appear in the table cells during scrolling and data loading. If the user scrolls back up after scrolling down to the next set of rows, the previous data reloads from the data source, similar to regular paging, with the scroll distance determining the data to be loaded.

You can also use the [Blazor Grid virtualization for the Grid columns](slug:grid-columns-virtual).

## Using Virtual Scrolling

To enable Blazor Grid row virtualization:

1. Set the `ScrollMode` parameter to `GridScrollMode.Virtual` (the default value is `Scrollable`).
1. [Set the `Height` parameter](#height) to a `string` CSS value.
1. [Set the `RowHeight` parameter](#rowheight) to a `decimal` value that denotes pixels.
1. [Set the `PageSize` parameter](#pagesize).

> The values of the `Height`, `RowHeight`, and `PageSize` parameters are related to one another. The following sections explain how.

## Height

Set the Grid `Height` parameter to any [valid `string` CSS value](slug:common-features/dimensions), for example, `px`, `%`, `em`, or `vh`. If the Grid should expand vertically, accoding to the available space, then check the article [Adjust Grid Height to Match the Browser Viewport Height](slug:grid-kb-adjust-height-with-browser).

Set the `Height` value, so that users can't see the whole [`PageSize` of items](#pagesize) at once. Otherwise, empty row skeletons may display in the Grid while users are not scrolling.

## PageSize

Set the Grid `PageSize` parameter to an `int` value. The `PageSize` determines:

* How many table rows are populated and rendered at any given time.
* How many data items are requested from the data source when using the [Grid `OnRead` event to load data on demand](slug:components/grid/manual-operations).

Set the `PageSize` value, so that the rendered table rows do fit in the [Grid height](#height). At least one table row must be completely invisible. Otherwise, empty row skeletons may display in the Grid while users are not scrolling. The exact `PageSize` value allows you to balance between better user experience and data request efficiency:

* A larger `PageSize` value will make the Grid display empty row skeletons more rarely while users are scrolling down. At the same time, the Grid may be requesting a larger number of data items repetitively.
* A smaller `PageSize` will make the Grid request a smaller number of items on each user scroll. At the same time, users will see row skeletons sooner or more frequently during scrolling.

> The `PageSize` value does not affect the data request frequency. The Grid `OnRead` event always fires when the user stops scrolling, no matter what data is currently available.

## RowHeight

Set the `RowHeight` parameter to a `decimal` value. The Grid uses it to set an inline `height` style in pixels to all Grid table rows (`<tr>`).

The `RowHeight` value must be large enough to accommodate the cell content in all rows, even if the content differs. In other words, the `RowHeight` setting must apply the same or greater table row height than what the browser would normally render. The effective row height depends on:

* The cell content and text wrapping.
* The [`Size` parameter value](slug:grid-sizing).
* The CSS theme, including font size, line height, and cell paddings.

For example, the following list shows the minimum valid `RowHeight` values when using the [built-in CSS themes](slug:themes-overview), single-line plain text content, no command buttons, and [`Medium` `Size`](slug:grid-sizing):

* `36` for the Default theme (`14px` font size, `20px` line height, and 2 * `8px` vertical paddings)
* `40` for the Bootstrap theme (`16px` font size, `24px` line height, and 2 * `8px` vertical paddings)
* `48` for the Material theme (`14px` font size, `28px` line height, and 2 * `10px` vertical paddings)
* `44` for the Fluent theme (`14px` font size, `20px` font size and 2 * `12px` vertical paddings)

> Browsers treat table row `height` styles as `min-height` styles. If the table row content cannot fit in the set `RowHeight`, the browser expands the table row. The Grid configuration must not allow this to happen. It is crucial that all Grid table rows display with the same effective height when using virtial scrolling, otherwise the virtual scrolling experience will break.

The `RowHeight` parameter value cannot change at runtime, unless the application recreates the whole Grid component by removing it from the web page temporarily.

If necessary, you can also use the `RowHeight` parameter without virtual row scrolling.

## Limitations

The Blazor Grid virtualization enhances client-side rendering performance and improves the user experience by providing quicker access to all data items. However, this comes with the trade-offs:

* [Hierarchy](slug:components/grid/features/hierarchy) is not supported. If the Grid hierarchy is self-referencing, use a [TreeList with virtual scrolling](slug:treelist-virtual-scrolling) instead.
* [Grouping](slug:components/grid/features/grouping) is supported only when [loading groups on demand](slug:grid-group-lod).
* There is a [browser limitation, which affects the maximum number of data items in a virtual Grid](slug:grid-kb-virtualization-many-records). The problem occurs with millions of items and you can partially mitigate it by [changing the Grid styles to make the row height smaller](slug:grid-kb-reduce-row-height).

In addition to virtual scrolling, another approach to optimize the app rendering and data request performance is to use [Grid paging](slug:components/grid/features/paging) and [`OnRead` event](slug:common-features-data-binding-onread).

## Example

Row virtualization is often used with a large number of data items that cannot be loaded in a single request. Thus, the example below uses the [Grid `OnRead` event](slug:components/grid/manual-operations) together with the [`ToDataSourceResultAsync()`](slug:common-features-data-binding-onread#todatasourceresult-method) method. You can also use the Grid `Data` parameter and load all data items with a single request. [Do not use `Data` and `OnRead` at the same time](slug:common-features-data-binding-overview#how-to-provide-data).

If you use the `OnRead` event without `ToDataSourceResultAsync()`, then [use the `Skip` and `PageSize` values](slug:components/grid/manual-operations#virtual-scrolling-with-onread) of the [`DataSourceRequest` argument](slug:common-features-data-binding-onread#event-argument) to determine the Grid scroll offset and load the correct data items.

>caption Virtual Grid scrolling with optional OnRead event and grouping

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             FilterMode="GridFilterMode.FilterMenu"
             Groupable="true"
             Height="360px"
             LoadGroupsOnDemand="true"
             PageSize="20"
             RowHeight="40"
             ScrollMode="@GridScrollMode.Virtual"
             Sortable="true">
    <GridAggregates>
        <GridAggregate Field="@nameof(Product.Name)"
                       FieldType="@typeof(string)"
                       Aggregate="@GridAggregateType.Count" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)">
            <FooterTemplate>
                Count: @context.Count
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Category)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" />
    </GridColumns>
</TelerikGrid>

<p style="margin-top: 1em; font-size: 1.5em;">
    <code>DataSourceRequest.Skip</code> value
    in the <code>OnRead</code> event argument: <strong>@GridSkip</strong>
</p>

@code {
    private List<Product> GridData { get; set; } = new();

    private int GridSkip { get; set; }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        // Use args.Request.Skip and args.Request.PageSize
        // to load the correct data items without ToDataSourceResultAsync()
        GridSkip = args.Request.Skip;

        DataSourceResult result = await GridData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
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

* [Live Demo: Grid Virtual Scrolling](https://demos.telerik.com/blazor-ui/grid/virtual-scrolling)
* [Grid Selection with Virtual Rows](slug:grid-selection-row#selection-and-virtual-scrolling)
* [How to Disable Row Placeholders During Virtual Scrolling](slug:grid-kb-hide-virtual-row-skeletons)
