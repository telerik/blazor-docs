---
title: Resize
page_title: TreeList - Resize Columns
description: Drag to resize columns in the treelist for Blazor.
slug: treelist-columns-resize
tags: telerik,blazor,treelist,column,resize,drag
published: True
position: 3
components: ["treelist"]
---

# Resize Columns

The TreeList features two different column resizing mechanisms:

* [Resize by Dragging](#resize-by-dragging)
* [Fit to Content](#autofit-columns)

The [example at the end of this page](#example) shows both options in action.

## Resize by Dragging

The TreeList allows users to resize columns by dragging the borders between header cells.

To enable column resizing, set the `Resizable` parameter of the treelist to `true`.

To prevent the user from resizing a certain column, set its own parameter `Resizable="false"`. The user will still be able to resize other columns around it.

Here a few notes on the resizing behavior:

* If the column `Width` is less than `MinResizableWidth` and the user tries to resize the column, it will snap to its minimum width.
* Similarly, if the column `Width` is greater than `MaxResizableWidth`, the column will snap to its maximum width.
* In [multi-column header scenarios](slug:treelist-columns-multiple-column-headers), you may set `MinResizableWidth` or `MaxResizableWidth` to child columns only. Setting these attributes to parent columns will have no effect.

## Autofit Columns

When column resizing is enabled, a double click on the resize handle between two header cells automatically adjusts the column width to the content of the header, data and footers. Autofitting also removes text wrapping in the column cells.

Similar to regular [column resizing](#resize-by-dragging), autofitting specific columns preserves the current widths of all the other columns. Column autofitting can trigger a horizontal TreeList scrollbar, or leave empty space after the last column.

The TreeList takes into account the `MinResizableWidth` and `MaxResizableWidth` of each auto-fitted column.

The component also exposes methods to programmatically resize columns to fit their contents:

* `AutoFitColumnAsync(string id)`—Autofits the column with the specified [`Id` attribute](slug:treelist-columns-bound#identification).
* `AutoFitColumnsAsync(IEnumerable<string> ids)`—Autofits multiple columns at once.
* `AutoFitAllColumnsAsync()`—Autofits all applicable columns. For example, this method does not affect the hierarchy expand/collapse columns.

Programmatic autofitting works even if column resizing is disabled.

> Autofitting a large number of columns with a large `PageSize` can be a resource-intensive operation. For better client-side performance, set fixed optimal widths to all columns with predictable content like numbers and dates, and only autofit the others.

### Limitations

The known limitations of the Autofit Columns feature include:

* Autofitting the columns is not supported with [Virtual Columns](slug:treelist-columns-virtual).

* Autofitting the columns on initial load of the TreeList is not supported.

>important Trying to autofit the columns on initial load will throw a `NullReferenceException`. Check the [AutoFit all Grid columns on initial load knowledge-base article](slug:grid-autofit-columns-on-initial-load) to see a possible solution to achieve this behavior. 

## Example

>caption How column resizing works in the Telerik TreeList
>caption TreeList Column Resizing and Autofitting

<demo metaUrl="client/treelist/columns/resize/example-1/" height="720"></demo>

## See Also

* [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/treelist/column-resizing)
