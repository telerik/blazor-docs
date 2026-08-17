---
title: Overview
page_title: Grid Overview
description: The Blazor Grid provides a comprehensive set of ready-to-use features that cover everything - paging, sorting, filtering, editing and more.
slug: grid-overview
tags: telerik,blazor,grid,datagrid,overview
published: True
hideCta: True
position: 0
components: ["grid"]
---

# Blazor Grid Component Overview

This article provides a quick introduction to get your first <a href="https://demos.telerik.com/blazor-ui/grid/overview" target="_blank">Blazor data grid component</a> up and running. The article includes a video tutorial and a list of key features.

Updated on August 16, 2026

This article applies to Telerik UI for Blazor, .NET 8 and later, and the Grid component.

<span class="cta-panel-big-module--container--c08a9 d-print-none "><span class="row align-items-center justify-content-center cta-panel-big-module--row--9b71a"><span class="col-auto"><img class="cta-panel-big-module--icon--a648c" src="/images/avatar-ninja.svg" alt="ninja-icon"></span><span class="col-12 col-sm"><span class="cta-panel-big-module--message--40a0f">Tired of reading docs? With our new AI Coding Assistants, you can add, configure, and troubleshoot Telerik UI for Blazor components—right inside your favorite AI-powered IDE: Visual Studio, VS Code, Cursor, and more. Start building faster, smarter, and with contextual intelligence powered by our docs/APIs:</span></span><span class="col-12 col-lg-auto"><a class="cta-panel-big-module--btnTrial--38b3e" href="https://www.telerik.com/blazor-ui/documentation/ai/overview?utm_source=ai-assistants-docs" target="_blank">Try AI Assistants</a></span></span></span>

The Telerik Blazor Data Grid provides a comprehensive set of ready-to-use features that cover everything from paging, sorting, filtering, editing, and grouping to row virtualization, optimized data reading, keyboard navigation, and accessibility support.

> tip **Jumpstart Your Grid** <br/><br/> With the Agentic UI Generator, you can build components and layouts using natural language prompts — directly inside AI-powered IDEs like VS Code and Cursor. Get intelligent assistance with component implementation, styling, layout design, and iconography powered by our documentation and APIs. <br/><br/>[Try the Agentic UI Generator](slug:agentic-ui-generator-getting-started)

## Creating Blazor Grid

1. Use the `TelerikGrid` tag.
1. Assign the Grid `Data` parameter to an `IEnumerable<T>` property, **or** use the [`OnRead` event](slug:common-features-data-binding-onread). This example uses `Data`. The [Grid Data Binding article](slug:grid-data-binding) compares the two alternatives.
1. Optionally, enable data operations such as paging, sorting, or filtering.
1. Add [`GridColumn`](slug:components/grid/columns/bound) instances under the `GridColumns` tag. Each column `Field` should point to the model property to display. Use `nameof()` or the plain field name. Define user-friendly column `Title`s or [`DisplayFormat` for numeric and date values](slug:grid-columns-displayformat).

>caption Get started with the Blazor Grid

<demo metaUrl="client/grid/overview/"></demo>

## Blazor Grid Video Tutorial

If you prefer video instructions, watch this short Blazor Grid video tutorial. It covers the following topics:

* Introduction to the Telerik Blazor Grid
* Add TelerikRootComponent to MainLayout
* Add a Blazor Grid
* Configure columns
* Enable additional features

<iframe width="560" height="315" src="https://www.youtube.com/embed/NW2hHtmM2Gk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Data Binding

There are [two main ways to provide data to the Grid: through the `Data` parameter and through the `OnRead` event](slug:grid-data-binding). `Data` provides **simplicity**, while `OnRead` allows more **flexibility** in complex scenarios and can improve **performance** when the data source contains many records.


## Data Operations

The Blazor Grid supports all fundamental data operations out-of-the-box:

* [Paging](slug:components/grid/features/paging) or alternatively, [virtual scrolling](slug:components/grid/virtual-scrolling)
* [Sorting](slug:components/grid/features/sorting)
* [Filtering](slug:components/grid/filtering)
* [Grouping](slug:components/grid/features/grouping). The Grid can also [load the data for each group on demand](slug:grid-group-lod).
* [Aggregates](slug:grid-aggregates)


## Editing

The Grid can perform CRUD operations on its current data - add, edit and delete rows. It exposes events that let you control the editing and commit changes to the actual data source.

The Grid offers several editing modes with different user experiences: in-cell, inline, and popup.

See [Grid CRUD Operations Overview](slug:grid-editing-overview) for more details.


## Virtualization

The Blazor Grid features UI virtualization to improve browser performance:

* [Row virtualization](slug:components/grid/virtual-scrolling)
* [Column virtualization](slug:grid-columns-virtual)


## Column Features

The Grid columns offer a rich set of functionality to enable immense flexibility for your application scenarios. The main column features include:

* [Display Format](slug:grid-columns-displayformat) for numeric and date values
* [Resizing](slug:components/grid/columns/resize)
* [Reordering](slug:components/grid/columns/reorder)
* [Column Menu](slug:grid-column-menu) to control data operations and column visibility
* [Frozen columns](slug:grid-columns-frozen), which do not scroll horizontally (also called locked columns)
* [Multi-column Headers](slug:grid-columns-multiple-column-headers) to group multiple column headers under a single parent header
* [Column Events](slug:grid-column-events)
* [Visibility](slug:grid-columns-visible) and [Width](slug:grid-columns-width)


## Templates

The Grid supports custom content in various parts of the component such as data cells, headers, footers, editors and more. See [Grid Templates](slug:components/grid/features/templates).


## More Blazor Grid Features

* [Selection](slug:grid-selection-overview)—select one or multiple rows through clicks or checkboxes or select one or multiple cells through clicks.
* [State](slug:grid-state)—get or set the Grid configuration programmatically.
* [Toolbar](slug:components/grid/features/toolbar)—define user actions in a toolbar above the header cells.
* [Hierarchy](slug:components/grid/features/hierarchy)—nest Grids and visualize parent-child relations between data records.
* [Drag and drop rows](slug:grid-drag-drop-overview)—move rows in a Grid or between different Grids.
* [Loading animation](slug:grid-loading)—show a loading animation to improve user experience during long data operations.
* Scrolling—the Grid will show standard scrollbars automatically if the data does not fit the current component width and height.
* [Highlighting](slug:grid-highlighting)—highlight rows or cells programmatically to draw attention to important data.


## Smart AI Features

The Grid supports AI-enabled natural language commands for filtering, sorting, grouping, highlighting, column operations, paging, selection, and exporting. The [Grid Smart AI Features overview](slug:grid-ai-overview) describes the supported operations and the AI tools that you can add to the Grid toolbar.


## Blazor Grid API

See the [Grid API Reference](slug:Telerik.Blazor.Components.TelerikGrid-1) for the full list of Grid parameters, methods, and events.


## Blazor Grid Reference and Methods

The Grid has methods to execute actions such as:

* [rebind to refresh the data](slug:grid-refresh-data#rebind-method)
* [export to Excel](slug:grid-export-excel) and other formats
* [automatically resize columns to fit their content](slug:components/grid/columns/resize#autofit-columns)
* [get or set the Grid configuration state](slug:grid-state)
* [get the dragged data item and its drop index from the destination Grid instance](slug:grid-drag-drop-overview)

To execute these methods, obtain reference to the Grid instance via `@ref`.

>caption How to obtain a Grid reference and call methods

<demo metaUrl="client/grid/overview-ref/"></demo>

## Next Steps

* [Explore Grid data binding](slug:grid-data-binding)
* [Learn about Grid columns](slug:components/grid/columns/bound)
* [Control the Grid with natural language prompts](slug:grid-ai-overview)

## Frequently Asked Questions

### Does the Telerik Blazor Grid require a license?

Telerik UI for Blazor requires a commercial license or an active trial license. You can use the Grid during the [Telerik UI for Blazor free trial](https://www.telerik.com/blazor-ui/free-trial).

### How do I bind data to the Blazor Grid?

You can assign an `IEnumerable<T>` collection to the `Data` parameter for local data binding. For more control over data requests and operations, use the [`OnRead` event](slug:common-features-data-binding-onread). See [Grid data binding](slug:grid-data-binding) for a comparison of both approaches.

### Which editing modes does the Blazor Grid support?

The Grid supports [in-cell](slug:grid-editing-incell), [inline](slug:grid-editing-inline), and [popup](slug:grid-editing-popup) editing. Choose the mode that best matches the workflow in your application.

### Does the Blazor Grid support AI-powered data operations?

Yes. The Grid supports natural language commands for operations such as filtering, sorting, grouping, highlighting, selection, and exporting. See the [Grid Smart AI Features overview](slug:grid-ai-overview) for setup guidance and supported tools.

## See Also

* [Live Demos: Grid](https://demos.telerik.com/blazor-ui/grid/overview)
* [Grid API Reference](slug:Telerik.Blazor.Components.TelerikGrid-1)

<VideoMetadata 
    name="Telerik UI for Blazor Data Grid"
    description="The Telerik Grid for Blazor is a powerful component, which allows you to visualize and edit data through its table representation. It provides a variety of options about how to present and perform operations over the underlying data, such as paging, sorting, filtering and editing. In this short video, we'll learn how to bind data to the data grid and customize its features."
    thumbnail-url="https://img.youtube.com/vi/NW2hHtmM2Gk/maxresdefault.jpg"
    upload-date="2020-02-13T00:00:00Z"
    duration="PT5M10S"
    content-url="https://youtu.be/NW2hHtmM2Gk"
    embed-url="https://www.youtube.com/embed/NW2hHtmM2Gk">
</VideoMetadata>