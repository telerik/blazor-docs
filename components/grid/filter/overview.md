---
title: Overview
page_title: Grid - Filtering Overview
description: Enable and configure filtering in Grid for Blazor.
slug: components/grid/filtering
tags: telerik,blazor,grid,filtering,filter
published: True
previous_url: /components/grid/filtering
position: 0
components: ["grid"]
---
# Grid Filtering Overview

This article describes the basics of the filtering functionality of the Telerik Grid for Blazor.

The Grid provides two alternative user interfaces for filtering:

* [Filter Row](#filterrow)
* [Filter Menu](#filtermenu)

## FilterRow

The `FilterRow` filtering mode renders a row below the column headers, providing a UI where you can fill in the filter criteria. Read more about enabling and fine-tuning the filtering row in the [Grid Filter Row](slug:grid-filter-row) article.

## FilterMenu

The `FilterMenu` filter mode renders a button in the column header. Clicking the button opens a popup with filtering options, allowing you to apply two filter criteria, choose a filter operator, and use buttons to apply or clear the filter. Read more about enabling and fine-tuning the filtering menu in the [Grid Filter Menu](slug:grid-filter-menu) article.

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

* Perform the data operations yourself (e.g., by outsourcing them to some API backend or other service) - to do that, use the [`OnRead` event](slug:components/grid/manual-operations). This will let you fetch only the current page of data for the Grid, instead of pulling the entire data set and storing it in-memory in the view-model.

* Customize the appearance and behavior of the filters - for that, use the [Filter Templates](slug:grid-templates-filter) the Grid provides.

## Advanced Examples

The following articles and sample projects can be helpful when implementing filtering:

* [Capture Filtered event](slug:grid-state#onstatechanged) - the grid state lets you know when it changes so you can capture different aspects of the change.

* [Server Filtering](slug:components/grid/manual-operations) - this article explains how to implement manual data source operations so you can offload the work to the server. It provides the overview of how to setup the grid for that, and examples - several with local data and links a repository with examples using REST API endpoints.

* [Filter and Edit Enum fields](slug:grid-kb-filter-edit-enum)

* [Leave only one option in the Filter Menu](slug:grid-kb-only-one-filtermenu-option) - this is a CSS approach, or you can implement a [custom filter template](slug:grid-templates-filter).

## Next Steps

* [Use Grid Filter Row](slug:grid-filter-row)
* [Use Grid Filter Menu](slug:grid-filter-menu)
* [Use Grid Checkbox List Filtering](slug:grid-checklist-filter)

## See Also

* [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
* [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
* [Filter the Grid by Date Only](slug:grid-kb-filter-date-only)
* [Blazor Grid](slug:grid-overview)
