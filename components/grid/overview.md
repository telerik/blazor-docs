---
title: Overview
page_title: Grid Overview
description: The Blazor Grid provides a comprehensive set of ready-to-use features that cover everything - paging, sorting, filtering, editing and more.
slug: grid-overview
tags: telerik,blazor,grid,datagrid,overview
published: True
position: 0
---

# Blazor Grid Component Overview

This article provides a quick introduction to get your first <a href="https://demos.telerik.com/blazor-ui/grid/overview" target="_blank">Blazor data grid component</a> up and running in a few seconds. There is a video tutorial and a list of the key features.

The Telerik Blazor Data Grid provides a comprehensive set of ready-to-use features. They cover everything from paging, sorting, filtering, editing, and grouping to row virtualization, optimized data reading, keyboard navigation and accessibility support.

The Telerik Blazor grid is built on native Blazor from the ground up, by a company with a long history of making enterprise-ready Grids. This results in a highly customizable Grid that delivers lighting fast performance.


## Creating Blazor Grid

1. Use the `TelerikGrid` tag.
1. Assign the Grid `Data` parameter to an `IEnumerable<T>` property, **or** use the [`OnRead` event](slug://common-features-data-binding-onread). We'll go with `Data` this time. The [Grid Data Binding article](slug://grid-data-binding) compares the two alternatives.
1. (optional) Enable some data operations like paging, sorting or filtering.
1. Add [`GridColumn`](slug://components/grid/columns/bound) instances under the `GridColumns` tag. Each column `Field` should point to the model property to display. Use `nameof()` or the plain field name. Define user-friendly column `Title`s or [`DisplayFormat` for numeric and date values](slug://grid-columns-displayformat).

>caption Get started with the Blazor Grid

````RAZOR
@* Telerik Blazor Grid with some common features *@

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" />
        <GridColumn Field="Price" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product
            {
                Id = i,
                Name = "Product name " + i,
                Price = (decimal)(rnd.Next(1, 50) * 3.14),
                Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                Discontinued = i % 5 == 0
            });

        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## Blazor Grid Video Tutorial

If you prefer video instructions, watch this short Blazor Grid video tutorial. It covers to following topics:

* Introduction to the Telerik Blazor Grid
* Add TelerikRootComponent to MainLayout
* Add a Blazor Grid
* Configure columns
* Enable additional features

<iframe width="560" height="315" src="https://www.youtube.com/embed/NW2hHtmM2Gk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Data Binding

The are [two main ways to provide data to the Grid - via the `Data` parameter and via the `OnRead` event](slug://grid-data-binding). `Data` provides **simplicity**, while `OnRead` allows more **flexibility** in complex scenarios, and **performance** when there is a lot of data.


## Data Operations

The Blazor Grid supports all fundamental data operations out-of-the-box:

* [Paging](slug://components/grid/features/paging) or alternatively, [virtual scrolling](slug://components/grid/virtual-scrolling)
* [Sorting](slug://components/grid/features/sorting)
* [Filtering](slug://components/grid/filtering)
* [Grouping](slug://components/grid/features/grouping). The Grid can also [load the data for each group on demand](slug://grid-group-lod).
* [Aggregates](slug://grid-aggregates)


## Editing

The Grid can perform CRUD operations on its current data - add, edit and delete rows. It exposes events that let you control the editing and commit changes to the actual data source.

The Grid offers several editing modes with different user experience - incell, inline and popup.

See [Grid CRUD Operations Overview](slug://components/grid/editing/overview) for more details.


## Virtualization

The Blazor Grid features UI virtualization to improve browser performance:

* [Row virtualization](slug://components/grid/virtual-scrolling)
* [Column virtualization](slug://grid-columns-virtual)


## Column Features

The Grid columns offer a rich set of functionality to enable immense flexibility for your application scenarios. The main column features include:

* [Display Format](slug://grid-columns-displayformat) for numeric and date values
* [Resizing](slug://components/grid/columns/resize)
* [Reodering](slug://components/grid/columns/reorder)
* [Column Menu](slug://grid-column-menu) to control data operations and column visibility
* [Frozen columns](slug://grid-columns-frozen), which do not scroll horizontally (also called locked columns)
* [Multi-column Headers](slug://grid-columns-multiple-column-headers) to group multiple column headers under a single parent header
* [Column Events](slug://grid-column-events)
* [Visibility](slug://grid-columns-visible) and [Width](slug://grid-columns-width)


## Templates

The Grid supports custom content in various parts of the component such as data cells, headers, footers, editors and more. See [Grid Templates](slug://components/grid/features/templates).


## More Blazor Grid Features

* [Selection](slug://grid-selection-overview)—select one or multiple rows through clicks or checkboxes or select one or multiple cells through clicks.
* [State](slug://grid-state)—get or set the Grid configuration programmatically.
* [Toolbar](slug://components/grid/features/toolbar)—define user actions in a toolbar above the header cells.
* [Hierarchy](slug://components/grid/features/hierarchy)—nest Grids and visualize parent-child relations between data records.
* [Drag and drop rows](slug://grid-drag-drop-overview)—move rows in a Grid or between different Grids.
* [Loading animation](slug://grid-loading)—show a loading animation to improve user experience during long data operations.
* Scrolling—the Grid will show standard scrollbars automatically if the data does not fit the current component width and height.


## Grid Parameters

The following table lists Grid parameters, which are not discussed elsewhere in the component documentation. Check the [Grid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikGrid-1) for a full list of parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Additional CSS class for the `<div class="k-grid">` element. Use it to apply custom styles or [override the theme](slug://themes-override). For example, [change the Grid font size](slug://grid-kb-change-font-size). |
| `Height` | `string` | A height style in [any supported CSS unit](slug://common-features/dimensions). You can also [make the Grid height change automatically with the browser window](slug://grid-kb-adjust-height-with-browser). |
| `Navigable` | `bool` | Enables [keyboard navigation](slug://accessibility-overview#keyboard-navigation). |
| `Width` | `string` | A width style in [any supported CSS unit](slug://common-features/dimensions). The Grid has no default width, but expands horizontally to fill its container. |


## Blazor Grid Reference and Methods

The Grid has methods to execute actions such as:

* [rebind to refresh the data](slug://grid-refresh-data#rebind-method)
* [export to Excel](slug://grid-export-excel) and other formats
* [automatically resize columns to fit their content](slug://components/grid/columns/resize#autofit-columns)
* [get or set the Grid configuration state](slug://grid-state)
* [get the dragged data item and its drop index from the destination Grid instance](slug://grid-drag-drop-overview)

To execute these methods, obtain reference to the Grid instance via `@ref`.

>caption How to obtain a Grid reference and call methods

````RAZOR
<TelerikButton OnClick="@AutoFit">Autofit All Columns</TelerikButton>

<TelerikGrid @ref="TheGrid"
             Data="@GridData"
             Width="600px">
    <GridColumns>
        <GridColumn Field="@(nameof(GridModel.Id))" />
        <GridColumn Field="@(nameof(GridModel.Text))" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<GridModel> TheGrid { get; set; }

    private async Task AutoFit()
    {
        await TheGrid.AutoFitAllColumnsAsync();
    }

    private IEnumerable<GridModel> GridData = Enumerable.Range(1, 5)
        .Select(x => new GridModel
            {
                Id = x,
                Text = "some longer text here that will not fit on a single line and we would like to expand it " + x
            });

    public class GridModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````


## Next Steps

* [Explore Grid data binding](slug://grid-data-binding)
* [Learn about Grid columns](slug://components/grid/columns/bound)

## See Also

* [Live Demos: Grid](https://demos.telerik.com/blazor-ui/grid/overview)
* [Grid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikGrid-1)
* [Blazor Grid](slug://grid-overview)
