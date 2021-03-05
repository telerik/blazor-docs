---
title: Width
page_title: TreeList - Column Width
description: Column width behavior in treelist for Blazor.
slug: treelist-columns-width
tags: telerik,blazor,treelist,column,width
published: True
position: 4
---

# TreeList Column Width Behavior

This article explains how the treelist column width behaves depending on the settings applied by the developer.

With regard to the widths of its columns, the scrollable (default) treelist typically behaves as any regular HTML table with a `table-layout: fixed`.

* When all column widths are explicitly set and the cumulative column width is greater than the available treelist width, a horizontal scrollbar appears and all set column widths are respected.

* When all column widths are explicitly set and the cumulative column width is less than the available treelist width, the remaining width is distributed evenly between all columns.

* When only some column widths are set and the cumulative width of the columns with set widths is greater than the available treelist width, a horizontal scrollbar appears and all set column widths are respected. Columns with no set width are invisible as their width is `0`.

* When only some column widths are set and the cumulative width of columns with set widths is less than the available treelist width, the widths of the columns with a set width are respected and the remaining width is distributed evenly between the other columns.

* When no column widths are set, the available width is distributed evenly between all treelist columns.

* To allow the users to auto-fit the column widths to the content, enable [column resizing]({%slug treelist-columns-resize%}) - a double click on the border between the headers will have the treelist adjust the column width according to the size of the data, and header content.


# See Also

* [Column Resizing]({%slug treelist-columns-resize%})
