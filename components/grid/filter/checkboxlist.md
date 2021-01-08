---
title: Filter CheckBoxList
page_title: Grid - Filtering CheckBoxList
description: Enable and configure filtering CheckBoxList in Grid for Blazor.
slug: grid-checklist-filter
tags: telerik,blazor,grid,filtering,filter,CheckBoxList
published: True
position: 15
---

# Grid CheckBoxList Filtering

You can change the [filter menu]({%slug grid-filter-menu%}) to show a list of checkboxes with the distinct values from the data source. This lets your users filter records by a commonly found value quickly, and select multiple values with east. The behavior is similar to Excel filtering.

To enable the checkbox list filtering in the grid:

1. Set the `FilterMode` parameter of the grid to `Telerik.Blazor.GridFilterMode.FilterMenu`
1. Set the `FilterMenuType` parameter of the grid to `Telerik.Blazor.FilterMenuType.CheckBoxList`. It defaults to `Menu` for the default behavior.

You can also change the filter menu behavior for a particular column - its own `FilterMenuType` parameter can be either `Menu` or `CheckBoxList` regardless of the main grid parameter. This lets you mix both modes as necessary for your application - you can either have all grid columns use the same mode with a single setting, or override it for a few columns that need the less common mode.





## See Also

  * [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
  * [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
