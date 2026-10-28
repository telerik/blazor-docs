---
title: Load On Demand
page_title: Grid - Load Group Data On Demand
description: Load Telerik UI for Blazor Grid group data on demand to reduce initial data loading when users expand groups.
slug: grid-group-lod
tags: telerik,blazor,grid,group,load,on,demand
published: True
position: 10
components: ["grid"]
---

# Load Group Data On Demand

The Grid component lets you load the data for each individual [group](slug:components/grid/features/grouping) on demand instead of having it always present.

## In This Article

* [Basics](#basics)
    * [Server Operations](#server-operations)
* [Examples](#examples)
	* [Regular Paging and Group Load On Demand](#regular-paging-and-group-load-on-demand)
    * [Virtual Scrolling, Group Load On Demand, and Server Data Operations](#virtual-scrolling-group-load-on-demand-and-server-side-data-operations)
    * [Toggle Group Load Mode at Runtime](#toggle-group-load-mode-at-runtime)
* [Limitations](#limitations)

## Basics

To enable load-on-demand for the groups, set `LoadGroupsOnDemand="true"` for the Grid. In this mode, the Grid behaves as usual when there is no grouping, and you can use this together with [Virtual Scrolling for the rows](slug:components/grid/virtual-scrolling).

Once grouping is applied, either manually or [through the Grid state](slug:grid-state#setstateasync-examples), groups appear collapsed by default. When the user expands a group, the Grid requests all rows in that group from the data source. If you provide all the `Data` to the Grid, the component performs the operations for you. For details about server operations, see [Server Operations](#server-operations).

Each group header, each group footer and the Grid footer will count as rows for the purposes of paging. Until you expand a group, its child items are not counted and shown in the `Total` count for the purposes of paging.


### Server Operations

When you load data on demand through the [OnRead event](slug:components/grid/manual-operations), the Grid sends one of three request types, depending on the required data:

* If there is no grouping, the request is unchanged. The Grid adds no additional parameters or settings.

* If there is grouping and the Grid needs a list of groups, the `GroupPaging` parameter of its `DataSourceRequest` will be set to `true`.

    * If the currently expanded group row has subgroups, a request is sent with the `GroupPaging` parameter set to `true`, prompting that the response must include the total of items in the sub group and return a collection of groups once again, instead of a collection of models.

    * If the Grid starts with grouping set, it will make one request for the list of all groups, and will keep them in memory for paging.

* If the currently expanded group row does not have subgroups, the `Filter` parameter of the `DataSourceRequest` will contain the group value (and the values of any subgroups) for which the items are requested. The `PageSize` of that request is set to `0` so the Grid gets all items for that group. The `OnRead` event will fire every time you expand a group to get all items for that group.

While grouping is active, paging and virtual scrolling operations do not trigger `OnRead`, because the Grid already has all the group headers and all the items from the currently expanded groups.

## Examples

This section contains the following examples:

* [Regular Paging and Group Load On Demand](#regular-paging-and-group-load-on-demand)&mdash;a basic example of how to enable the feature.
* [Virtual Scrolling, Group Load On Demand, and Server Data Operations](#virtual-scrolling-group-load-on-demand-and-server-side-data-operations)&mdash;simulates a data service that loads group data when the user expands a group. No requests are made during scrolling. The `PageSize` determines the number of rendered rows, but not the number of expected rows in data requests. The example also shows how to set the initial Grid state to include grouping.

### Regular Paging and Group Load On Demand

This example shows the basics of enabling group load on demand by setting `LoadGroupsOnDemand="true"`. Group the Grid by the Team or Vacation columns to see the effect.

<demo metaUrl="client/grid/grouping-load-on-demand/" height="650"></demo>


### Virtual Scrolling, Group Load On Demand, and Server-Side Data Operations

This example shows how you can combine virtual row scrolling with loading group data on demand through a remote service (mocked by a static class in this example), and how to set the initial state of the Grid to have grouping by default.

<demo metaUrl="client/grid/grouping-load-on-demand-virtual/" height="700"></demo>


### Toggle Group Load Mode at Runtime

To toggle how the Grid loads groups:

1. [Obtain reference to the Grid instance with `@ref`](slug:grid-overview#blazor-grid-reference-and-methods).
1. Change the `LoadGroupsOnDemand` parameter value.
1. [Rebind()](slug:common-features-data-binding-overview#refresh-data) the Grid.

>caption Switch the Grid group load mode

<demo metaUrl="client/grid/grouping-toggle-load-mode/" height="550"></demo>


## Limitations

Load-on-demand grouping has the following limitations:

* The expanded state of the groups is preserved during paging only, but not if sorting or filtering is applied.

* Since group headers and footers are treated like rows in the Grid, the group headers may remain on a previous page from the data when you page the Grid.

* If the group load on demand is used in combination with [virtual scrolling](slug:components/grid/virtual-scrolling):

    * All requirements and limitations of virtual scrolling apply.
    
    * [Aggregates](slug:grid-aggregates) are not supported.

* When exporting only the current Grid page (`AllPages="false"`), the exported file will not contain child data for collapsed groups.


## See Also

* [Live Demo: Grid Group Load On Demand](https://demos.telerik.com/blazor-ui/grid/group-loadondemand)
* [Blazor Grid](slug:grid-overview)
