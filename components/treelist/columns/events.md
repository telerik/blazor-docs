---
title: Column Events
page_title: TreeList - Column Events
description: Events of the TreeList Column for Blazor.
slug: treelist-column-events
tags: telerik,blazor,treelist,column,columns,events
published: True
position: 100
---

# TreeList Column Events

This article explains the events available for the Columns of the Telerik TreeList for Blazor.

* [OnCellRender](#oncellrender)

## OnCellRender

This event fires upon the rendering of the TreeLists columns. It receives an argument of type `TreeListCellRenderEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the current data item.
* `Value` - an object that contains the value that is rendered in the TreeList cell. You can cast it to its data type, for example to a `string`, `DateTime` or a number.
* `Class` - the CSS class that will be applied to the cells.

>caption Use the OnCellRender event to apply custom format to TreeList cells based on certain value

````CSHTML

````

## See Also

  * [TreeList Overview]({%slug treelist-overview%})
  * [TreeList Events]({%slug treelist-events%})
