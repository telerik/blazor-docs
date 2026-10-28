---
title: Filter Menu
page_title: Gantt - Filter Menu
description: Enable and configure Filter Menu in Gantt for Blazor.
slug: gantt-filter-menu
tags: telerik,blazor,gantt,filtering,filter,menu
published: True
position: 10
components: ["gantt"]
---

# Gantt Filter Menu

One of the filter modes of the Gantt is a popup menu with filter options that you can open from the column headers.

In this article:

* [Basics](#basics)
* [Customization](#customization)

## Basics

To enable the filter menu, set the `FilterMode` property of the grid to `Telerik.Blazor.GanttFilterMode.FilterMenu`.

The Gantt will render a button in the column header that you click to get a popup with filtering options. The popup lets you choose filter operator, filter criteria, to apply and clear the filter.

A key difference in the behavior from the [filter row](slug:gantt-filter-row) is that the filter is now applied only upon a button click, not upon input change. This may improve performance with large data sets.

>caption Filter Menu in Telerik Gantt

<demo metaUrl="client/gantt/filter-menu/example-2/" height="740"></demo>


## Customization

You can customize the default Filter Menu behavior for each column through the following property the `GanttColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-menu-customization-properties)

>caption Configure the Filter Menu

<demo metaUrl="client/gantt/filter-menu/example-1/" height="740"></demo>

## See Also

* [Gantt Filtering Overview](slug:gantt-filtering-overview)
* [Live Demo: Gantt Filter Menu](https://demos.telerik.com/blazor-ui/gantt/filter-menu)