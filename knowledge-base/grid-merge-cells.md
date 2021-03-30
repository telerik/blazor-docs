---
title: Merge Cells in the grid
description: How to Merge Cells across rows in the grid.
type: how-to
page_title: Merge cells and rows in the grid
slug: grid-kb-merge-cells
position: 
tags: 
res_type: kb
---


## Description

How can I merge cells across rows in the Blazor Data Grid?


## Solution

To control the table cell and row rendering, you must use the [Row Template]({%slug grid-templates-row%}) of the grid.

Then, you can set the `rowspan` and `colspan` attributes of the `<td>` elements as necessary to merge them.

Make sure to provide valid HTML - if you make one cell larger, you must not render the appropriate number of adjacent cells. For example, if you set `rowspan=2`, the next row must not render that cell.

You can find a runnable sample project in the following repo: <a href="https://github.com/telerik/blazor-ui/tree/master/grid/merge-cells-rows" target="_blank">https://github.com/telerik/blazor-ui/tree/master/grid/merge-cells-rows</a>