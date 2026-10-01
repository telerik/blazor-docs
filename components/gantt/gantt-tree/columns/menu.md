---
title: Column Menu
page_title: Gantt - Column Menu
description: Use the Column Menu for the Gantt to show a menu that allows you to perform column customization.
slug: gantt-column-menu
tags: telerik,blazor,gantt,column,columns,menu
published: True
position: 20
components: ["gantt"]
---

# Column Menu

The Gantt allows you to set up a menu for its columns. The Column Menu enables you to perform high-level customization like [sorting](slug:gantt-sorting), [filtering](slug:gantt-filtering-overview), and [showing or hiding](slug:gantt-columns-visible) columns.

>caption In this article:
* [Basics](#basics)
* [Features](#features)
    * [Column Chooser](#column-chooser)
    * [Filtering](#filtering)
    * [Frozen Columns](#frozen-columns)
    * [Column Sections](#column-sections)
    * [Sorting](#sorting)
    * [Reordering](#reordering)
* [Example](#example)
* [Notes](#notes)

## Basics

To enable the Column Menu, set the `ShowColumnMenu` parameter of the `<TelerikGantt>` tag to `true`. This will enable the menu for each column of the Gantt.

To disable the Column Menu for a specific column in the Gantt, set the `ShowColumnMenu` parameter of the column to `false`.

>caption Enable the column menu for all Gantt columns.

<demo metaUrl="client/gantt/menu/example-2/" height="740"></demo>

## Features

To control the features of the Column Menu, use the `<GanttColumnMenuSettings>` tag, nested inside the `<GanttSettings>` tag.

By default, all Column Menu features are enabled.

### Column Chooser

The Column Chooser in the Column Menu allows you to toggle the visibility of Gantt columns. By default, all columns are visible under the **Columns** section of the Column Menu. To expand the menu, click the **Columns** item.

The **Apply** button sets the column visibility according to the current checkbox values and closes the column menu. The **Reset** button reverts the checkbox values to their state when the column menu was opened. At this point, the user can start over, click **Apply**, or click outside the column menu to close it.

* To disable the column chooser, set the `ShowColumnChooser` parameter of the `<GanttColumnMenuSettings>` to `false`.
* To hide a column from the Column Chooser, set the `VisibleInColumnChooser` property of the column to `false`.

### Filtering

To control whether filtering is possible from the Column Menu, set the `FilterMode` parameter of the `GanttColumnMenuSettings` tag to a member of the `ColumnMenuFilterMode` enum:

* `None`—disables the filtering from the Column Menu. This is the recommended option if you use the [`FilterRow` mode](slug:gantt-filter-row).
* `FilterMenu`—enables filtering from a filter menu.

### Frozen Columns

To disable the locking and unlocking of a column from the Column Menu, set the `Lockable` parameter of the `GanttColumnMenuSettings` tag to `false`.

### Sorting

To remove the sorting option from the Column Menu, set the `Sortable` parameter of the `GanttColumnMenuSettings` tag to `false`.

### Reordering

To allow column reordering from the Column Menu, set the `Reorderable` parameter of the `GanttColumnMenuSettings` tag to `true`.

### Column Sections

The Gantt Column Menu lets you group the columns in the [Column Chooser](#column-chooser) into different sections:

1. Use the `GanttColumnMenuChooser` tag (child to the `GanttColumnMenuSettings`).

1. Add the [Template](slug:gantt-templates-column-chooser) tag.

1. Provide a `GanttColumnMenuChooserGroup`, which is a collection of the columns that will be in the section. To render a title for the section, use the `Title` parameter.
    

1. Use the `GanttColumnMenuChooserItem` to denote the columns that belong to the group.

    * You must set the `ColumnId` parameter of the `GanttColumnMenuChooserItem` to the value of the [`Id`] parameter of the corresponding Gantt Column.
    
    * If you set the `Title` parameter of the `GanttColumnMenuChooserItem`, it will override the value of the `Title` parameter of the corresponding Gantt Column. 

## Example

The example shows the following things: 
* A custom `GanttColumnChooser`
* How to use the `GanttColumnMenuSettings` tag to control the features of the Column Menu.
* How to use column parameters to affect the column's relationship with the column menu.

<demo metaUrl="client/gantt/menu/example-1/" height="740"></demo>

## Notes

* The settings applied to a Gantt column take precedence over the settings applied to the Column Menu through the `<GanttColumnMenuSettings>` tag. For example, if you set `Lockable="false"` to a Gantt column and `Lockable="true"` to the Gantt Column Menu, the Frozen Columns functionality will be disabled.

* When using the [Column Chooser Template](slug:gantt-templates-column-chooser) or grouping the columns into [sections](#column-sections), add the `Title` parameter to all Gantt Columns.

## See Also

* [Live Demo: Gantt Column Menu](https://demos.telerik.com/blazor-ui/gantt/column-menu)
* [Live Demo: Gantt Custom Column Menu](https://demos.telerik.com/blazor-ui/gantt/custom-column-menu)