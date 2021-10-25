---
title: Width
page_title: Grid - Column Width
description: Column width behavior in Grid for Blazor.
slug: grid-columns-width
tags: telerik,blazor,grid,column,width
published: True
position: 4
---

# Grid Column Width Behavior

This article explains how the grid column width behaves depending on the settings applied by the developer.

You can set the grid column `Width` parameter in any CSS unit, such as `px`, `%`, `vw`, `em`, `rem`. You can read more on how to set sizes in Telerik components in the [Dimensions]({%slug common-features/dimensions%}) article. You must, however, provide the unit so that the browser can understand it.

With regard to the widths of its columns, the scrollable (default) Grid typically behaves as any regular HTML table with a `table-layout: fixed`.

* When all column widths are explicitly set and the cumulative column width is greater than the available Grid width, a horizontal scrollbar appears and all set column widths are respected.

* When all column widths are explicitly set and the cumulative column width is less than the available Grid width, the remaining width is distributed evenly between all columns.

* When only some column widths are set and the cumulative width of the columns with set widths is greater than the available Grid width, a horizontal scrollbar appears and all set column widths are respected. Columns with no set width are invisible as their width is `0`.

* When only some column widths are set and the cumulative width of columns with set widths is less than the available Grid width, the widths of the columns with a set width are respected and the remaining width is distributed evenly between the other columns.

* When no column widths are set, the available width is distributed evenly between all Grid columns.

* To allow the users to auto-fit the column widths to the content, enable [column resizing]({%slug components/grid/columns/resize%}) - a double click on the border between the headers will have the grid adjust the column width according to the size of the data, headers and footers content. It is also possible to [auto-fit columns programmatically]({%slug components/grid/columns/resize%}#autofit-columns).

# See Also

* [Column Resizing]({%slug components/grid/columns/resize%})
