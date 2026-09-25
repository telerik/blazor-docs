---
title: Integration
page_title: Filter Integration
description: Discover the Blazor Filter Integration and explore the examples.
slug: filter-integration
tags: telerik,blazor,filter,integration
published: True
position: 3
components: ["filter"]
---

# Blazor Filter Integration

You can integrate the Filter component with different databound components. This allows users to build complex filtering criteria that may not be supported by the databound component UI.

This article contains sections and examples for Filter integration with:

* [Chart](#filter-a-chart)
* [Grid](#filter-a-grid)
* [ListView](#filter-a-listview)
* [TreeList](#filter-a-treelist)
* [TreeView](#filter-a-treeview)

## Filter a Chart

To integrate the Filter with the Telerik Chart:

1. Set the `Value` parameter of the Filter.
2. Update the `ChartSeries` `Data`, based on the Filter `Value`. If you want to filter automatically on each user change, subscribe to the [Filter `OnUpdate` event](slug:filter-events#onupdate).
3. `Refresh()` the Chart.

>caption Use a Filter component with a ListView

<demo metaUrl="client/filter/integration/example-5/" height="620"></demo>

## Filter a Grid

To integrate the Filter with the Telerik Grid:

1. Set the `Value` parameter of the Filter.
2. Update the Grid `Data` on demand, based on the Filter `Value`. If you want to filter automatically on each user change, subscribe to the [Filter `OnUpdate` event](slug:filter-events#onupdate).

>caption Use a Filter component with a Grid

<demo metaUrl="client/filter/integration/example-4/" height="600"></demo>

## Filter a ListView

To integrate the Filter with the Telerik ListView:

1. Set the `Value` parameter of the Filter.
2. Update the ListView `Data`, based on the Filter `Value`. If you want to filter automatically on each user change, subscribe to the [Filter `OnUpdate` event](slug:filter-events#onupdate).

>caption Use a Filter component with a ListView

<demo metaUrl="client/filter/integration/example-3/" height="520"></demo>

## Filter a TreeList

To integrate the Filter with the Telerik TreeList:

1. Set the `Value` parameter of the Filter.
2. Update the TreeList `Data`, based on the Filter `Value`. If you want to filter automatically on each user change, subscribe to the [Filter `OnUpdate` event](slug:filter-events#onupdate).

>caption Use a Filter component with a TreeList

<demo metaUrl="client/filter/integration/example-2/" height="620"></demo>

## Filter a TreeView

To integrate the Filter with the Telerik TreeView:

1. Set the `Value` parameter of the Filter.
2. Update the TreeView `Data`, based on the Filter `Value`. If you want to filter automatically on each user change, subscribe to the [Filter `OnUpdate` event](slug:filter-events#onupdate).

>caption Use a Filter component with a TreeView

<demo metaUrl="client/filter/integration/example-1/" height="600"></demo>

## See Also

* [Online Demo: Filter](https://demos.telerik.com/blazor-ui/filter/overview)
* [Filter Events](slug:filter-events)
