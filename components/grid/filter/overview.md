---
title: Overview
page_title: Grid - Filtering Overview
description: Learn how to filter Telerik UI for Blazor Grid data with Filter Row, Filter Menu, CheckBoxList, SearchBox, and custom filtering options.
slug: components/grid/filtering
tags: telerik,blazor,grid,filtering,filter
published: True
previous_url: /components/grid/filtering
position: 0
components: ["grid"]
---

# Grid Filtering Overview

This article describes the basic filtering functionality of the Telerik UI for Blazor Grid.

The Grid provides two alternative user interfaces for filtering:

* [Filter Row](#filter-row)
* [Filter Menu](#filter-menu)

## Filter Row

The `FilterRow` filtering mode renders a row below the column headers, providing a UI where you can enter filter criteria. For more information about enabling and configuring the Filter Row, see the [Grid Filter Row](slug:grid-filter-row) article.

## Filter Menu

The `FilterMenu` filter mode renders a button in the column header. Clicking the button opens a popup with filtering options, allowing you to apply two filter criteria, choose a filter operator, and use buttons to apply or clear the filter. For more information about enabling and configuring the Filter Menu, see the [Grid Filter Menu](slug:grid-filter-menu) article.

## Changing the Filter Mode at Runtime

To change between `None`, `FilterRow`, and `FilterMenu` at runtime, recreate the Grid so that it rebuilds its columns and filter templates. For the complete example, refer to [Change the Grid Filter Mode at Runtime](slug:grid-kb-change-filter-mode-at-runtime).

## More Filtering Options

In addition to the two main filtering modes, the Grid offers two more features that can enhance the user experience when looking for data.

### ToolBar SearchBox

The ToolBar of the Telerik Grid for Blazor includes a [SearchBox](slug:grid-searchbox) that lets users amend filters and search across multiple fields simultaneously.

### CheckBoxList

The filter menu can display a [list of checkboxes](slug:grid-checklist-filter) with distinct values from the data, making filtering similar to Excel.

## Filter Descriptors

You can get the applied filtering criteria for each filtered field. Use the [Grid state](slug:grid-state) or the [Grid `OnRead` event handler](slug:grid-events#read-event) to obtain the user input, the filter operator and other filtering properties. Find out how in the [Data Operation Descriptors article](slug:common-features-descriptors#filtering).

## Custom Filtering

There are two approaches to customize the Grid filtering behavior, and you can use them together:

* Perform data operations yourself by outsourcing them to an API backend or other service. Use the [`OnRead` event](slug:components/grid/manual-operations) to fetch only the current page of data instead of pulling the entire data set into the view model.

* Customize the appearance and behavior of the filters. Use the [Filter Templates](slug:grid-templates-filter) that the Grid provides.

## Advanced Examples

The following articles and sample projects can be helpful when implementing filtering:

* [Capture the Filtered event](slug:grid-state#onstatechanged)&mdash;The Grid state lets you know when it changes so you can capture different aspects of the change.

* [Server Filtering](slug:components/grid/manual-operations)&mdash;This article explains how to implement manual data source operations so you can offload work to the server. It provides an overview of how to set up the Grid and includes examples with local data and REST API endpoints.

* [Filter and Edit Enum fields](slug:grid-kb-filter-edit-enum)

* [Leave only one option in the Filter Menu](slug:grid-kb-only-one-filtermenu-option)&mdash;Use this CSS approach, or implement a [custom filter template](slug:grid-templates-filter).

## Next Steps

* [Use Grid Filter Row](slug:grid-filter-row)
* [Use Grid Filter Menu](slug:grid-filter-menu)
* [Use Grid Checkbox List Filtering](slug:grid-checklist-filter)

## See Also

* [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
* [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
* [Filter the Grid by Date Only](slug:grid-kb-filter-date-only)
* [Blazor Grid](slug:grid-overview)
