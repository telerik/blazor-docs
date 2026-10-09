---
title: Filter Row
page_title: Gantt - Filter Row
description: Enable and configure Filter Row in Gantt for Blazor.
slug: gantt-filter-row
tags: telerik,blazor,gantt,filtering,filter,row
published: True
position: 5
components: ["gantt"]
---

# Gantt Filter Row

One of the filter modes of the Gantt Chart is a row of filter that renders below the column headers.

In this article:

* [Basics](#basics)
* [Customization](#customization)

## Basics

To enable the filter row set the `FilterMode` property of the Gantt Chart to `Telerik.Blazor.GanttFilterMode.FilterRow`.

The Gantt Chart will render a row below the column headers in the Gantt Tree with UI that you can use to fill in the filter criteria. You can type in the input to execute the default operator as you type, or click a button to choose a different filter operator (like "contains", "greater than" and so on). Filters are applied as the user types in the inputs. Once you enter a filter criteria, the clear button will be enabled to allow you to reset the filter state.

>caption Filter Row in Telerik Gantt

<demo metaUrl="client/gantt/filter-row/example-2/" height="740"></demo>

## Customization

The Gantt allows you to customize the default behavior of the Filter Row in a couple ways:

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Configuring the Filter Row

You can customize the default Filter Row behavior for each Gantt Tree column through the following properties the `GanttColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

>caption Configure the Filter Row

<demo metaUrl="client/gantt/filter-row/example-1/" height="740"></demo>

## See Also

* [Gantt Filtering Overview](slug:gantt-filtering-overview)
* [Live Demo: Gantt Filter Row](https://demos.telerik.com/blazor-ui/gantt/filter-row)