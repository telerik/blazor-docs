---
title: Column Menu
page_title: Grid - Column Menu
description: Use the Column Menu for the Grid
slug: grid-column-menu
tags: telerik,blazor,grid,column,columns,menu
published: True
position: 55
components: ["grid"]
---
# Column Menu

The Grid allows you to set up a menu for its columns. It enables you to perform high-level customization like [sorting](slug:components/grid/features/sorting), [filtering](slug:components/grid/filtering), [showing or hiding](slug:grid-columns-visible) columns and [freezing or unfreezing](slug:grid-columns-frozen) them.

>caption In this article:
* [Basics](#basics)
* [Features](#features)
    * [Column Chooser](#column-chooser)
    * [Filtering](#filtering)
    * [Groupable](#groupable)
    * [Frozen Columns](#frozen-columns)
    * [Sections](#sections)
    * [Sorting](#sorting)
    * [Reorderable](#reorderable)
* [Column Menu Configuration Example](#column-menu-configuration-example)
* [Column Menu Features Example](#column-menu-features-example)
* [Notes](#notes)

## Basics

To enable the Column Menu, set the `ShowColumnMenu` parameter of the `<TelerikGrid>` tag to `true`. This will enable the menu for each column of the Grid.

To disable the Column Menu for a specific column in the Grid, set the `ShowColumnMenu` parameter of the column to `false`.

You can see what the column menu can do and how to control its settings in the [Features](#features) section. By default, all of them are enabled.

>caption Enable the column menu for all Grid columns.

<demo metaUrl="client/grid/columns/menu-basics/" height="500"></demo>

## Features

To control the common features of the `Column Menu` use the `<GridColumnMenuSettings>` tag, nested inside the `<GridSettings>` tag:

* [Column Chooser](#column-chooser)
* [Filtering](#filtering)
* [Groupable](#groupable)
* [Frozen Columns](#frozen-columns)
* [Sections](#sections)
* [Sorting](#sorting)
* [Reorderable](#reorderable)

### Column Chooser

The Column Chooser in the Column Menu allows you to toggle the visibility of Grid columns. By default, all columns are visible under the **Columns** section of the Column Menu. To expand the menu, click the **Columns** item.

The **Apply** button sets the column visibility according to the current checkbox values and closes the column menu. The **Reset** button reverts the checkbox values to their state when the column menu was opened. At this point, the user can start over, click **Apply**, or click outside the column menu to close it.

* To disable the column chooser, set the `ShowColumnChooser` parameter of the `<GridColumnMenuSettings>` to `false`.
* To hide a column from the Column Chooser, set the `VisibleInColumnChooser` property of the column to `false`.

### Filtering

To control whether filtering is possible from the Column Menu set the `FilterMode` parameter of the `GridColumnMenuSettings` tag to a member of the `ColumnMenuFilterMode` enum:

* `None`—disables the filtering from the Column Menu. This is the recommended option if you use the [`FilterRow` mode](slug:grid-filter-row).
* `FilterMenu`—enables a filter menu to apply filtering.

### Groupable

To group the Grid from the Column Menu, set the `Groupable` parameter of the `GridColumnMenuSettings` tag to `true`. This feature will group the component by the column you have opened the Column Menu from.

### Frozen Columns

To disable the locking and unlocking of a column from the Column Menu, set the `Lockable` parameter of the column to `false`.

### Sorting

To remove the sorting option from the Column Menu, set the `Sortable` parameter of the `GridColumnMenuSettings` tag to `false`.

### Reorderable

To allow column reordering from the Column Column, set the `Reorderable` parameter of the `GridColumnMenuSettings` tag to `true`.

### Sections

You can organize the columns in the [Column Chooser](#column-chooser) in different sections. To group the columns in different sections:

1. Use the `GridColumnMenuChooser` tag (child to the `GridColumnMenuSettings`)

1. Add the [Template](slug:grid-templates-column-chooser) tag

1. Provide `GridColumnMenuChooserGroup` which is a collection of the columns that should be in the section
    
    * You can use the `Title` parameter to render a Title for the section

1. Use the `GridColumnMenuChooserItem` to denote the columns that should be in the group

    * You must use set the `ColumnId` parameter of the `GridColumnMenuChooserItem` to the value of the [`Id`](slug:components/grid/columns/bound#grid-bound-column-parameters) parameter of the corresponding Grid Column.
    
    * If you set the `Title` parameter of the `GridColumnMenuChooserItem` it will override the value of the `Title` parameter of the corresponding Grid Column. 


### Column Menu Configuration Example

The following example shows the basic configuration of the `ColumnMenuSettings`.

The columns in the Column Chooser are divided into sections. The Lockable option is disabled from the Column Menu. Filtering in the Column Menu is disabled, so the Grid can use a `FilterRow`. The `Id` column has no Column Menu and the `HireDate` column is not visible in Column Chooser.

<demo metaUrl="client/grid/columns/menu-configuration/" height="500"></demo>

### Column Menu Features Example

>caption Use the GridColumnMenuSettings tag to control the common features of the Column Menu, use column parameters to affect its relationship with the column menu

<demo metaUrl="client/grid/columns/menu-features/" height="500"></demo>

## Notes

* Applying settings to a Grid column like `Filterable="false"`, `Sortable="false"`, `Lockable="false"` will take precedence over the common settings applied in the `<GridColumnMenuSettings>` and disable the above-mentioned functionalities for the corresponding column.

* If the Grid has a [frozen](slug:grid-columns-frozen) column (`Locked="true"`), that column cannot be unfrozen from the column menu.

* If you are using the [Column Chooser Template](slug:grid-templates-column-chooser) or you are grouping the columns into [sections](#sections), it is recommended to add the `Title` parameter to all Grid Columns.

## See Also
  * [Live Demo: Grid Column Menu](https://demos.telerik.com/blazor-ui/grid/column-menu)
  * [Live Demo: Grid Custom Column Menu](https://demos.telerik.com/blazor-ui/grid/custom-column-menu)
  * [Blazor Grid](slug:grid-overview)
