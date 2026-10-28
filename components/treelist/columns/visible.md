---
title: Visible
page_title: TreeList - Visible Columns
description: Hide TreeList columns.
slug: treelist-columns-visible
tags: telerik,blazor,treelist,column,visible
published: True
position: 15
components: ["treelist"]
---

# Visible Columns

The TreeList allows you to programmatically hide some of its columns. 

In this article:
* [Basics](#basics)
* [Notes](#notes)
* [Examples](#examples)
    * [Toggle The Visibility Of A Column On Button Click](#toggle-the-visibility-of-a-column-on-button-click)
    * [Hidden TreeList Column With Template](#hidden-treelist-column-with-template)
    * [Hide A TreeList Column Based On A Condition](#hide-a-treelist-column-based-on-a-condition)

## Basics

To hide a TreeList column set its `Visible` parameter to `false`. To hide a column based on a certain condition you can pass, for example, a ternary operator or a method that returns `bool` - the app can provide an expression according to its logic (like screen size).

>caption Hide a column from the TreeList. Basic example.

<demo metaUrl="client/treelist/columns/visible/example-1/" height="720"></demo>

- the ID column is not rendered
## Notes

Non-visible columns (`Visible="false"`) will have the following behavior:

* Will not be [editable](slug:treelist-editing-overview).
* [Templates](slug:treelist-templates-overview) will not be rendered.
    * When using [Row Template](slug:treelist-templates-row) the visibility of the column should be implemented by the application in the row template itself - the treelist can only toggle the visibility of the header.


## Examples

In this section you will find the following examples:

* [Toggle The Visibility Of A Column On Button Click](#toggle-the-visibility-of-a-column-on-button-click)
* [Hidden TreeList Column With Template](#hidden-treelist-column-with-template)
* [Hide A TreeList Column Based On A Condition](#hide-a-treelist-column-based-on-a-condition)

### Toggle The Visibility Of A Column On Button Click

The application can later the value of the `Visible` parameter and that will toggle the column.

<demo metaUrl="client/treelist/columns/visible/example-2/" height="720"></demo>

### Hidden TreeList Column With Template

When cell-specific templates are used, they are not rendered at all. If you are using the RowTemplate, however, make sure to handle the column visibility there as well.

<demo metaUrl="client/treelist/columns/visible/example-3/" height="720"></demo>

- the HireDate column is not rendered
### Hide A TreeList Column Based On A Condition

This example shows hiding a column based on a simple condition in its data. You can change it to use other view-model data - such as screen dimensions, user preferences you have stored, or any other logic.

<demo metaUrl="client/treelist/columns/visible/example-4/" height="720"></demo>

## See Also

* [Live Demo: TreeList Columns](https://demos.telerik.com/blazor-ui/treelist/columns)
