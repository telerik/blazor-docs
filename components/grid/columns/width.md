---
title: Width
page_title: Grid - Column Width
description: Column width behavior in Grid for Blazor.
slug: grid-columns-width
tags: telerik,blazor,grid,column,width
published: True
position: 30
components: ["grid"]
---
# Grid Column Width

This article explains how to set Grid column widths and how the component behaves, depending on its column width configuration.

## Basics

The Grid renders separate HTML `<table>` elements for its header, data, and footer areas. This allows users to scroll the data area vertically, while the header and footer areas remain visible at all times. The Grid tables apply `table-layout: fixed` and `width: 100%` CSS styles to ensure column alignment between the three areas.

You can set the Grid column `Width` parameter in any CSS unit, such as `px`, `%`, `vw`, `em`, `rem`. Unit-less `Width` values are not supported. You can read more on how to set sizes in Telerik components in the [Dimensions](slug:common-features/dimensions) article.

## Column Width Behavior

The Grid column width settings can vary and result in the following behaviors:

@[template](/_contentTemplates/common/parameters-table-styles.md#multidimensional-table)

<table class="multi-dimensional-table">
    <colgroup><col style="width: 112px" /><col style="width: 70px" /><col /><col /></colgroup>
    <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th colspan="2">The Sum of All Set Column Widths Is:</th>
    </tr>
    <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Greater Than the Grid Width</th>
        <th>Less Than the Grid Width</th>
    </tr>
    <tr>
        <th style="writing-mode: vertical-lr;" rowspan="3">How Many Columns Have Width:</th>
        <th>All</th>
        <td><ul><li>All columns respect their <code>Width</code> setting.</li><li>A horizontal scrollbar appears.</li></ul></td>
        <td><ul><li>All columns expand beyond their <code>Width</code> setting to fill the available space in the Grid.</li><li>There is no horizontal scrollbar.</li></ul></td>
    </tr>
    <tr>
        <th>Some</th>
        <td><ul><li>All columns respect their <code>Width</code> setting, if exists.</li><li>All columns without a <code>Width</code> shrink and disappear.</li><li>A horizontal scrollbar appears.</li></ul></td>
        <td><ul><li>All columns respect their <code>Width</code> setting, if exists.</li><li>All columns without a <code>Width</code> shrink or expand, depending on the remaining space in the Grid.</li><li>There is no horizontal scrollbar.</li></ul></td>
    </tr>
    <tr>
        <th>None</th>
        <td colspan="2"><ul style="margin: .5em auto; width: max-content;"><li>All columns have the same width, which depends on the Grid width.</li><li>There is no horizontal scrollbar.</li></ul></td>
    </tr>
</table>

To allow the users to adjust or auto-fit the column widths to the content, enable [Grid column resizing](slug:components/grid/columns/resize). You can also [resize columns through the Grid state](slug:grid-state#methods) or [auto-fit columns programmatically](slug:components/grid/columns/resize#autofit-columns).

> Single table rendering and automatic table layout are not supported.

## Recommendations

For predictable and user-friendly behavior, consider the following Grid configuration:

* If the Grid has a fixed width and you need horizontal scrolling, set widths to all columns. Use absolute units that do not depend on the browser viewport size.
* If the Grid does not need horizontal scrolling and is not likely to shrink too much, then leave at least one column without a width. This ensures that all set column widths are respected and the width-less columns take up the remaining space.
* If the Grid width is unpredictable and the width-less columns may shrink too much, then apply a `min-width` style to the Grid tables, according to the example below.

>caption Apply a minimum width to the Grid table in a responsive layout

````RAZOR
<TelerikSplitter Orientation="@SplitterOrientation.Horizontal">
    <SplitterPanes>
        <SplitterPane Size="120px" Collapsible="true">
            <p>Resize this pane to resize the Grid.</p>
        </SplitterPane>
        <SplitterPane>
            <TelerikGrid Data="@GridData"
                         Class="grid-min-width"
                         FilterMode="@GridFilterMode.FilterMenu"
                         Resizable="true"
                         Sortable="true">
                <GridAggregates>
                    <GridAggregate Field="@nameof(Product.Name)" Aggregate="@GridAggregateType.Count" />
                    <GridAggregate Field="@nameof(Product.Price)" Aggregate="@GridAggregateType.Average" />
                    <GridAggregate Field="@nameof(Product.Quantity)" Aggregate="@GridAggregateType.Sum" />
                </GridAggregates>
                <GridColumns>
                    <GridColumn Field="@nameof(Product.Id)" Width="90px" />
                    <GridColumn Field="@nameof(Product.Name)">
                        <FooterTemplate>
                            Count: @context.Count
                        </FooterTemplate>
                    </GridColumn>
                    <GridColumn Field="@nameof(Product.Price)" Width="110px">
                        <FooterTemplate>
                            Average: @context.Average
                        </FooterTemplate>
                    </GridColumn>
                    <GridColumn Field="@nameof(Product.Quantity)" Width="130px">
                        <FooterTemplate>
                            Sum: @context.Sum
                        </FooterTemplate>
                    </GridColumn>
                    <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:D}" />
                    <GridColumn Field="@nameof(Product.IsActive)" Width="120px" />
                </GridColumns>
            </TelerikGrid>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>

<style>
    .grid-min-width .k-table {
        /* 450px set widths + at least 150px for each remaining column */
        min-width: 750px;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000),
                ReleaseDate = DateTime.Today.AddDays(-Random.Shared.Next(60, 1000)),
                IsActive = i % 4 > 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool IsActive { get; set; }
    }
}
````

# See Also

* [Column Resizing](slug:components/grid/columns/resize)
* [Blazor Grid](slug:grid-overview)
