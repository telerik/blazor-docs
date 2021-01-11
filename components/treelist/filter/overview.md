---
title: Overview
page_title: TreeList - Filtering Overview
description: Enable and configure filtering in TreeList for Blazor.
slug: treelist-filtering
tags: telerik,blazor,TreeList,filtering,filter
published: True
previous_url: /components/treelist/filtering
position: 0
---

# TreeList Filtering Overview

The TreeList component offers built-in support for filtering.

## Basics

To enable filtering, set the `FilterMode` property of the treelist to one of the following values:

* [`Telerik.Blazor.TreeListFilterMode.FilterRow`]({%slug treelist-filter-row%}) - a row of filter options is rendered below the column headers

* [`Telerik.Blazor.TreeListFilterMode.FilterMenu`]({%slug treelist-filter-menu%}) - the column headers render a button that shows a popup with filtering options

The behavior of the filter input and the available filter operators will depend on the column data type. For example, a boolean field will only have the options "is true" and "is false" and will not have operators like "contains" or "greater than".

You can filter more than one column at a time, and all filter rules will be applied together with an `AND` logic.

You can prevent the user from filtering a certain field by setting `Filterable="false"` on its column.


Filtering keeps an item's parent(s) in the list, so you may see item that do not match the criteria. This is required so you can actually navigate to and see the items that match.

Filtering keeps the expanded/collapsed state of items. For example, if filtering leaves a child whose parent is collapsed, you will only see the collapsed parent.

## More Filtering Options

In addition to the two main filtering modes, the treelist offers two more features that can enhance the user experience when looking for data:

* A [searchbox in the toolbar]({%slug treelist-searchbox%}) can amend the filters and let the user look up many fields at once

* The filter menu can show a [list of checkboxes]({%slug treelist-checklist-filter%}) with the distinct values from the data to make filtering resemble Excel.

* You can customize the appearance and behavior of the filters through the [filter templates]({%slug treelist-templates-filter%}).


## See Also

  * [Live Demo: TreeList Filter Row](https://demos.telerik.com/blazor-ui/treelist/filter-row)
  * [Live Demo: TreeList Filter Menu](https://demos.telerik.com/blazor-ui/treelist/filter-menu)
