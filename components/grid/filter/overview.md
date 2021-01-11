---
title: Overview
page_title: Grid - Filtering Overview
description: Enable and configure filtering in Grid for Blazor.
slug: components/grid/filtering
tags: telerik,blazor,grid,filtering,filter
published: True
previous_url: /components/grid/filtering
position: 0
---

# Grid Filtering Overview

The Grid component offers built-in support for filtering.

## Basics

To enable filtering, set the grid's `FilterMode` property to one of the following values:

* [`Telerik.Blazor.GridFilterMode.FilterRow`]({%slug grid-filter-row%}) - a row of filter options is rendered below the column headers

* [`Telerik.Blazor.GridFilterMode.FilterMenu`]({%slug grid-filter-menu%}) - the column headers render a button that shows a popup with filtering options

The behavior of the filter input and the available filter operators will depend on the column data type. For example, a boolean field will only have the options "is true" and "is false" and will not have operators like "contains" or "greater than".

You can filter more than one column at a time, and all filter rules will be applied together with an `AND` logic.

You can prevent the user from filtering a certain field by setting `Filterable="false"` on its column.

## More Filtering Options

In addition to the two main filtering modes, the grid offers two more features that can enhance the user experience when looking for data:

* A [searchbox in the toolbar]({%slug grid-searchbox%}) can amend the filters and let the user look up many fields at once

* The filter menu can show a [list of checkboxes]({%slug grid-checklist-filter%}) with the distinct values from the data to make filtering resemble Excel.

## Custom Filtering

There are two approaches to customize the grid filtering behavior, and you can use them together:

* Perform the data operations yourself (e.g., by outsourcing them to some API backend or other service) - to do that, use the [`OnRead` event]({%slug components/grid/manual-operations%}). This will let you fetch only the current page of data for the grid, instead of pulling the entire data set and storing it in-memory in the view-model.

* Customize the appearance and behavior of the filters - for that, use the [Filter Templates]({%slug grid-templates-filter%}) the grid provides.

## Advanced Examples

The following articles and sample projects can be helpful when implementing filtering:

* [Capture Filtered event]({%slug grid-state%}#get-and-override-user-action-that-changes-the-grid) - the grid state lets you know when it changes so you can capture different aspects of the change

* [Server Filtering]({%slug components/grid/manual-operations%}) - this article explains how to implement manual data source operations so you can offload the work to the server. It provides the overview of how to setup the grid for that, and examples - several with local data and links a repository with examples using REST API endpoints.

* [Filter and Edit Enum fields]({%slug grid-kb-filter-edit-enum%})

* [Leave only one option in the Filter Menu]({%slug grid-kb-only-one-filtermenu-option%}) - this is a CSS approach, or you can implement a [custom filter template]({%slug grid-templates-filter%}).


## See Also

  * [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
  * [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
