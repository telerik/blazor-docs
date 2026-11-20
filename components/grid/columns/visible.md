---
title: Visible
page_title: Grid - Visible Columns
description: Show or hide Telerik UI for Blazor Grid columns programmatically and conditionally based on application logic.
slug: grid-columns-visible
tags: telerik,blazor,grid,column,visible
published: True
position: 50
components: ["grid"]
---

# Visible Columns

The Grid allows you to programmatically hide some of its columns.

In this article:
* [Hiding Grid Columns](#hiding-grid-columns)
* [Hidden Column Behavior](#hidden-column-behavior)
* [Visibility Examples](#visibility-examples)
    * [Toggling the Visibility of a Column on Button Click](#toggling-the-visibility-of-a-column-on-button-click)
    * [Hiding a Grid Column with a Template](#hiding-a-grid-column-with-a-template)
    * [Hiding a Grid Column Based on a Condition](#hiding-a-grid-column-based-on-a-condition)

## Hiding Grid Columns

To hide a Grid column, set its `Visible` parameter to `false`. To hide a column based on a condition, pass a ternary operator or a method that returns `bool`. This lets the application use logic such as screen size.

>caption Basic example that hides a column from the Grid

<demo metaUrl="client/grid/columns-visible/" height="450"></demo>

## Hidden Column Behavior

Non-visible columns (`Visible="false"`) will have the following behavior:

* Will not be [editable](slug:grid-editing-overview).
* Will not be exported in [Excel export](slug:grid-export-excel).
* Will not be visible when the data is [grouped](slug:components/grid/features/grouping).
* [Templates](slug:components/grid/features/templates) will not be rendered.
    * When you use [Row Template](slug:grid-templates-row), the application must implement column visibility in the row template because the Grid can only toggle the header visibility.
* You can control the visibility of the column through the [Grid State](slug:grid-state).

## Visibility Examples

This section contains the following examples:

* [Toggling the Visibility of a Column on Button Click](#toggling-the-visibility-of-a-column-on-button-click)
* [Hiding a Grid Column with a Template](#hiding-a-grid-column-with-a-template)
* [Hiding a Grid Column Based on a Condition](#hiding-a-grid-column-based-on-a-condition)

### Toggling the Visibility of a Column on Button Click

The application can alter the value of the `Visible` parameter to toggle the column.

<demo metaUrl="client/grid/columns-visible-toggle/" height="500"></demo>

### Hiding a Grid Column with a Template

When cell-specific templates are used, they are not rendered. If you use the `RowTemplate`, handle column visibility there as well.

<demo metaUrl="client/grid/columns-visible-template/" height="500"></demo>

### Hiding a Grid Column Based on a Condition

This example shows hiding a column based on a simple condition in its data. You can change it to use other view-model data - such as screen dimensions, user preferences you have stored, or any other logic.

<demo metaUrl="client/grid/columns-visible-condition/" height="500"></demo>

## See Also

* [Live Demo: Visible Columns](https://demos.telerik.com/blazor-ui/grid/columns)
* [Blazor Grid](slug:grid-overview)
