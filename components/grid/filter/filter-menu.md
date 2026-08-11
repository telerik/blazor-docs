---
title: Filter Menu
page_title: Grid - Filter Menu
description: Enable and configure Filter Menu in Grid for Blazor.
slug: grid-filter-menu
tags: telerik,blazor,grid,filtering,filter,menu
published: True
position: 10
components: ["grid"]
---

# Grid Filter Menu

The `FilterMenu` filter mode renders a button in the column header. When you click the button, a popup with filtering options appears. The popup allows you to apply two filter criteria, choose a suitable filter operator and buttons to apply, or clear the filter.

## Enabling Filter Menu

Set the `FilterMode` parameter of the Telerik Grid to `GridFilterMode.FilterMenu` and make sure that all filterable columns have their `Field` parameter set.

````RAZOR.skip-repl
<TelerikGrid FilterMode="@GridFilterMode.FilterMenu" />
````

Also see the full [runnable example](#example) below.

## Customization

You can customize the default behavior of the Filter Menu with parameters of the columns and the Grid.

### Configuring the Filter Menu

You can override the default Filter Menu behavior for each column through the following property the `GridColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-menu-customization-properties)

### FilterMenuType

You can switch between [CheckBoxList](slug:grid-checklist-filter) and a `Menu` filtering layout for a particular `<GridColumn>` by setting the `FilterMenuType` to `FilterMenuType.Menu` or `FilterMenuType.CheckBoxList`. Read the [CheckBoxList Filtering article](slug:grid-checklist-filter) for more information.

### Filter Menu Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter Menu Template](slug:grid-templates-filter#filter-menu-template) article.

## Filter From Code

To learn how to programmatically filter the Grid, refer to the [Grid State](slug:grid-state) documentation article. You can filter the Grid on initial display with the [`OnStateInit` event](slug:grid-state#onstateinit) or at any time afterwards with the [`SetStateAsync()` method](slug:grid-state#methods).

## Example

>caption Using the Grid Filter Menu

<demo metaUrl="client/grid/filter-menu/" height="500"></demo>

## See Also

* [Grid Filtering Overview](slug:components/grid/filtering)
* [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
* [Blazor Grid](slug:grid-overview)
