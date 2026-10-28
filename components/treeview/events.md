---
title: Events
page_title: TreeView - Events
description: Events of the TreeView for Blazor.
slug: treeview-events
tags: telerik,blazor,treeview,events
published: True
position: 20
components: ["treeview"]
---

# TreeView Events

This article explains the events available in the Telerik TreeView for Blazor:

* [CheckedItemsChanged](#checkeditemschanged)
* [ExpandedItemsChanged](#expandeditemschanged)
* [OnExpand](#onexpand)
* [OnItemClick](#onitemclick)
* [OnItemContextMenu](#onitemcontextmenu)
* [OnItemDoubleClick](#onitemdoubleclick)
* [OnItemRender](#onitemrender)
* [SelectedItemsChanged](#selecteditemschanged)
* [Drag Events](#drag-events)

## CheckedItemsChanged

The `CheckedItemsChanged` event fires every time the user uses a [checkbox](slug:treeview-checkboxes-overview) to select a new item.

## ExpandedItemsChanged

The `ExpandedItemsChanged` event fires every time the user expands or collapses a TreeView item.

## OnExpand

The `OnExpand` event fires when the user expands or collapses a node (either with the mouse, or with the keyboard). You can use it to know that the user performed that action, and/or to implement [load on demand](slug:components/treeview/data-binding/load-on-demand).

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## OnItemClick

The `OnItemClick` event fires when the user clicks, taps or presses `Enter` on a TreeView node (item). For example, use this event to react to user actions and load data on demand for another component.

The `OnItemClick` event handler receives a `TreeViewItemClickEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

## OnItemContextMenu

The `OnItemContextMenu` event fires when the user right-clicks on a TreeView node, presses the context menu keyboard button, or taps-and-holds on a touch device.

The event handler receives a `TreeViewItemContextMenuEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

The `OnItemContextMenu` is used to [integrate the Context menu](slug:contextmenu-integration#context-menu-for-a-treeview-node) to the TreeView node.

## OnItemDoubleClick

The `OnItemDoubleClick` event fires when the user double-clicks or double-taps a TreeView node.

The event handler receives a `TreeViewItemDoubleClickEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

## OnItemRender

The `OnItemRender` event fires when each node in the TreeView renders. 

The event handler receives as an argument an `TreeViewItemRenderEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `Item`   | The current item that renders in the TreeView. |
| `Class`  | The custom CSS class that will be added to the item. Renders on the `<div>` element that wraps the current `Item`. |

## SelectedItemsChanged

The `SelectedItemsChanged` event fires when the [selection](slug:treeview-selection-overview) is enabled and the user clicks on a new item.

## Drag Events

The TreeView implements the Drag and Drop functionality through the following drag events:

* The `OnDragStart` event fires when the user starts dragging a node.
* The `OnDrag` event fires continuously while a node is being dragged by the user.
* The `OnDrop` event fires when the user drops a node into a new location. The event fires only if the new location is a Telerik component.
* The `OnDragEnd` event fires when a drag operation ends. Unlike the `OnDrop` event, `OnDragEnd` will fire even if the new location is not a Telerik component.   

For more details and examples, see the [Treeview Drag and Drop](slug:treeview-drag-drop-overview) article.

## Example

>caption Handle Blazor TreeView Events

<demo metaUrl="client/treeview/events/example-1/" height="420"></demo>

## See Also

* [TreeView Overview](slug:treeview-overview)
* [TreeView Selection](slug:treeview-selection-overview)
* [TreeView CheckBoxes](slug:treeview-checkboxes-overview)
