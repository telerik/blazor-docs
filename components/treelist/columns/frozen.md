---
title: Frozen (Locked)
page_title: TreeList - Frozen Columns
description: How to freeze treelist columns so they are always visible in a scrollable treelist.
slug: treelist-columns-frozen
tags: telerik,blazor,treelist,column,freeze,frozen
published: true
position: 5
components: ["treelist"]
---

# Frozen Columns

The treelist lets you freeze one or more columns. This will allow the user to scroll horizontally through the treelist, but still be able to keep some important columns visible at all times (such as ID or command column).

To enable the column freezing, set the `Locked` parameter of the column to `true`.

If the column you want to freeze is not the first in the list, the treelist must be scrollable. This requires that there are enough columns with their `Width` set so that the treelist has a horizontal scrollbar (the sum of the Widths of the columns exceeds the Width of the treelist). You can read more about the scrolling behavior of the treelist in the [TreeList Column Width Behavior](slug:treelist-columns-width) article.

>caption Frozen columns in the beginning, middle and at the end of the treelist
<demo metaUrl="client/treelist/columns/frozen/example-1/" height="720"></demo>

## Limitations

The frozen columns pose some requirements:

* The `Width` of the TreeList **must** be set in `px` units.

* When a column is frozen (it has `Locked="true"`), its `Width` **must** be in `px` units.



## See also

 * [Live demo: Frozen Columns](https://demos.telerik.com/blazor-ui/treelist/frozen-columns)
