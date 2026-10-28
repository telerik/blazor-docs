---
title: Filter Menu
page_title: TreeList - Filter Menu
description: Enable and configure Filter Menu in TreeList for Blazor.
slug: treelist-filter-menu
tags: telerik,blazor,TreeList,filtering,filter,menu
published: True
position: 10
components: ["treelist"]
---

# TreeList Filter Menu

The `FilterMenu` filter mode renders a button in the column header. When you click the button, a popup with filtering options appears. The popup allows you to apply two filter criteria, choose a suitable filter operator and buttons to apply, or clear the filter.

## Enabling Filter Menu

Set the `FilterMode` parameter of the Telerik TreeList to `TreeListFilterMode.FilterMenu` and make sure that all filterable columns have their `Field` parameter set.

````RAZOR.skip-repl
<TelerikTreeList FilterMode="@TreeListFilterMode.FilterMenu" />
````

Also see the full [runnable example](#example) below.

## Customization

You can customize the default behavior of the Filter Menu with parameters of the columns and the TreeList.

### Configuring the Filter Menu

You can override the default Filter Row behavior for each column through the following property the `TreeListColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-menu-customization-properties)

### Filter Menu Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter  Menu Template](slug:treelist-templates-filter#filter-menu-template) article.

## Filter From Code

To learn how to programmatically filter the TreeList, refer to the [TreeList State](slug:treelist-state) documentation article. You can filter the TreeList on initial display with the [`OnStateInit` event](slug:treelist-state#onstateinit) or at any time afterwards with the [`SetStateAsync()` method](slug:treelist-state#methods).

## Example

>caption Using the TreeList Filter Menu

<demo metaUrl="client/treelist/filter/filter-menu/example-1/" height="720"></demo>

## See Also

* [Treelist Filtering Overview](slug:treelist-filtering)
* [Live Demo: TreeList Filter Menu](https://demos.telerik.com/blazor-ui/treelist/filter-menu)
