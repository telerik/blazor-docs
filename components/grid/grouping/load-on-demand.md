---
title: Load On Demand
page_title: Grid - Load Group Data On Demand
description: How to load groups and their data on demand.
slug: grid-group-lod
tags: telerik,blazor,grid,group,load,on,demand
published: True
position: 10
---

# Load On Demand Group Data

The grid component lets you load the data for each individual [group]({%slug components/grid/features/grouping%}) on demand, instead of having it always present.

To enable load-on-demand for the groups, set the `GroupsLoadOnDemand` parameter of the grid to `true`. In this mode, the grid behaves as usual while there is no grouping, and you can use this together with [Virtual Scrolling for the rows]({%slug components/grid/virtual-scrolling%}).

Once grouping is applied (either manually by the user, or through the grid [state]({%slug grid-state%}#set-grid-options-through-state)), the groups will now show up collapsed by default, and each of them will count as a row in the grid. When a group is expanded by the user its data is requested from the data source - the [OnRead event]({%slug components/grid/manual-operations%}) will fire if you are using it, and the `GroupPaging` parameter of its `DataSourceRequest` will be set to `true`. If you are not using that event, but are providing all the data to the grid, the grid will automatically handle the operation for you.


## See Also

  * [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
   
  
