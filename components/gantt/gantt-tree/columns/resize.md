---
title: Resize
page_title: Gantt Tree - Resize Columns
description: Drag to resize columns in the Gantt Chart for Blazor.
slug: gantt-columns-resize
tags: telerik,blazor,gantt,column,resize,drag
published: True
position: 3
components: ["gantt"]
---

# Resize Columns

The Gantt Tree features two different column resizing mechanisms:

* [Resize by Dragging](#resize-by-dragging)
* [Fit to Content](#autofit-columns)

The [example at the end of this page](#example) shows both options in action.

## Resize by Dragging

The Gantt Tree allows users to resize columns by dragging the borders between header cells.

To enable column resizing, set the `Resizable` parameter of the grid to `true`.

To prevent the user from resizing a certain column, set its own parameter `Resizable="false"`. The user will still be able to resize other columns around it.

Here a few notes on the resizing behavior:

* If the column `Width` is less than `MinResizableWidth` and the user tries to resize the column, it will snap to its minimum width.
* Similarly, if the column `Width` is greater than `MaxResizableWidth`, the column will snap to its maximum width.

## Autofit Columns

When column resizing is enabled, a double click on the resize handle between the header cells will automatically fit the column width to the content of the header, data and footers. This will remove text wrapping in the component.

Autofitting specific columns preserves the current widths of all the other columns. Similar to [column resizing](#resize-by-dragging), column autofitting can trigger a horizontal Gantt Tree scrollbar, or leave empty space after the last column.


## Example

>caption Enable column resizing in Telerik Gantt Tree

<demo metaUrl="client/gantt/resize/example-1/" height="740"></demo>

## See Also

* [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/gantt/column-resizing)
