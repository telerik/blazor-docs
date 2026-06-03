---
title: Overview
page_title: Gantt Chart - Filtering Overview
description: Overview of the filtering for the Gantt Chart for Blazor.
slug: gantt-filtering-overview
tags: telerik,blazor,gantt,chart,tree,filtering,filter,menu,row
published: True
position: 0
components: ["gantt"]
---
# Gantt Filtering Overview

The Gantt Tree component offers built-in support for filtering.

## Basics

To enable filtering, set the grid's `FilterMode` property to one of the following values:

* [`Telerik.Blazor.GanttFilterMode.FilterRow`](slug:gantt-filter-row) - a row of filter options is rendered below the column headers

* [`Telerik.Blazor.GanttFilterMode.FilterMenu`](slug:gantt-filter-menu) - the column headers render a button that shows a popup with filtering options

The behavior of the filter input and the available filter operators will depend on the column data type. For example, a `boolean` field will only have the options `"is true"` and `"is false"` and will not have operators like `"contains"` or `"greater than"`.

You can filter more than one column at a time, and all filter rules will be applied together with an `AND` logic.

## Filter Descriptors

You can get the applied filtering criteria for each filtered field. Use the [Gantt state](slug:gantt-state) to obtain the user input, the filter operator and other filtering properties. Find out how in the [Data Operation Descriptors article](slug:common-features-descriptors#filtering).

## Next Steps

* [Use Gantt Filter Row](slug:gantt-filter-row)
* [Use Gantt Filter Menu](slug:gantt-filter-menu)
* [Use Gantt Checkbox List Filtering](slug:gantt-checklist-filter)
