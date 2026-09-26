---
title: Visible
page_title: TreeList - Visible Columns
description: Hide TreeList columns.
slug: gantt-columns-visible
tags: telerik,blazor,gantt,column,visible
published: True
position: 15
components: ["gantt"]
---

# Visible Columns

The TreeList allows you to programmatically hide some of its columns. 

In this article:
* [Basics](#basics)
* [Notes](#notes)
* [Examples](#examples)
    * [Toggle The Visibility Of A Column On Button Click](#toggle-the-visibility-of-a-column-on-button-click)
    * [Hide A Gantt Column Based On A Condition](#hide-a-gantt-column-based-on-a-condition)

## Basics

To hide a Gantt Tree column set its `Visible` parameter to `false`. To hide a column based on a certain condition you can pass, for example, a ternary operator or a method that returns `bool` - the app can provide an expression according to its logic (like screen size).

>caption Hide a column from the Gantt. Basic example.

<demo metaUrl="client/gantt/visible/example-3/" height="740"></demo>

## Notes

Non-visible columns (`Visible="false"`) will have the following behavior:

* Will not be [editable](slug:gantt-tree-editing).


## Examples

In this section you will find the following examples:

* [Toggle The Visibility Of A Column On Button Click](#toggle-the-visibility-of-a-column-on-button-click)
* [Hide A Gantt Column Based On A Condition](#hide-a-gantt-column-based-on-a-condition)

### Toggle The Visibility Of A Column On Button Click

The application can later the value of the `Visible` parameter and that will toggle the column.

<demo metaUrl="client/gantt/visible/example-2/" height="740"></demo>
### Hide A Gantt Column Based On A Condition

This example shows hiding a column based on a simple condition in its data. You can change it to use other view-model data - such as screen dimensions, user preferences you have stored, or any other logic.

<demo metaUrl="client/gantt/visible/example-1/" height="740"></demo>
