---
title: Overview
page_title: Grid - Grouping
description: Learn how to group Telerik UI for Blazor Grid data, use aggregates, load groups on demand, and configure grouping settings.
slug: components/grid/features/grouping
tags: telerik,blazor,grid,grouping
published: True
previous_url: /components/grid/grouping
position: 0
components: ["grid"]
---

# Grid Grouping Overview

The Telerik UI for Blazor Grid supports grouping.

* [Basics](#basics)
* [Aggregates](#aggregates)
* [Sticky Group Headers and Footers](#sticky-group-headers-and-footers)
* [Load On Demand](#load-on-demand)
* [Grouping from Code](#grouping-from-code)
* [Grouping Settings](#grouping-settings)
* [More Examples](#more-examples)

## Basics

To enable grouping, set the Grid's `Groupable` property to `true`.

Drag a column header to the group panel and the Grid will create groups in the data rows based on the available values for that field. An indicator will be shown for the column that is used for grouping. The group header shows the value for the field by which it is grouping.

You can also group by multiple fields and groups for subsequent fields will be nested within their parent groups. When adding a group, you can drag it in the desired position in the list of current groups.

To remove a group setting, click the **[x]** button on its indicator in the group panel.

To prevent grouping by a field, set `Groupable="false"` on its column. This can be useful for fields with unique values like IDs or names.

You can also use [aggregates](slug:grid-aggregates) for the grouped data.

>caption Enable grouping in Telerik Grid

<demo metaUrl="client/grid/grouping/" height="500"></demo>

## Aggregates

The Grid lets you define and use aggregates that it can calculate for you. For more information, see the [Aggregates](slug:grid-aggregates) article.

## Sticky Group Headers and Footers

The Grid can pin group headers and footers while the user scrolls through the grouped data. Sticky headers remain fixed at the top of the scrollable area and sticky footers remain fixed at the bottom. Read more in the [Sticky Group Headers and Footers](slug:sticky-groups) article.

## Load On Demand

The Grid can load grouped data on demand. This is useful when you have many groups and want users to scroll through them without loading all their data at once. The Grid loads a group's child items only when the user expands that group. This mode can also be used with Virtual Scrolling. For more information, see the [Grid - Load Group Data On Demand](slug:grid-group-lod) article.


## Grouping from Code

You can group the Grid from your code through the [Grid state](slug:grid-state). This is possible even if `Groupable="false"` and the group panel is not visible. You can define the list of fields by which the Grid is grouped and indexes of groups that will be collapsed (all groups are expanded by default).

@[template](/_contentTemplates/grid/state.md#initial-state)

>caption Set grouping programmatically

````RAZOR
@[template](/_contentTemplates/grid/state.md#group-from-code)
````

## Grouping Settings

The Grid provides grouping configuration options via the [`GridGroupableSettings` tag](slug:Telerik.Blazor.Components.GridGroupableSettings), which is nested inside `GridSettings`.

<demo metaUrl="client/grid/grouping-settings/" height="450"></demo>

## More Examples

The following articles and sample projects can be helpful when implementing grouping:

* [Capture the Group event](slug:grid-state#onstatechanged)&mdash;The Grid state lets you know when it changes so you can capture different aspects of the change.

* [Server Grouping](slug:components/grid/manual-operations)&mdash;This article explains how to implement manual data source operations so you can offload work to the server. It provides an overview of how to set up the Grid and includes examples with local data and REST API endpoints.

* [Static group that is always present](slug:grid-kb-static-group)

## See Also

* [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
* [Grid Aggregates](slug:grid-aggregates)
* [Blazor Grid](slug:grid-overview)
