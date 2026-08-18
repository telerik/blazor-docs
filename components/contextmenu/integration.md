---
title: Integration
page_title: Context Menu - Integration
description: Integrating the context menu with other code and customizing it according to the target and its metadata.
slug: contextmenu-integration
tags: telerik,blazor,menu,integration
published: True
position: 3
components: ["contextmenu"]
---

# Context Menu Integration

In some cases, you may need to know which element the user clicked so you can use it in the command handling. You may also want to adjust the menu contents based on which element the user clicked (e.g., disable or entirely remove some items from the menu based on a condition).

Using the `Selector` parameter to attach the context menu to one or more targets at a time is simple, and can be useful when you want the same menu for many elements, but it does not matter which one the user clicked. So, the Telerik Context Menu offers the `ShowAsync(x, y)` method that lets you show it on demand after executing business logic.

To achieve such flexibility and granularity, you can:

1. Use your own code to hook to an event such as `@oncontextmenu` to store the desired target and its metadata. You can use other events such as `@onclick` too.
    * You can use other events to show the context menu, like click, mousedown and so on. Make sure to pass correct coordinates to the menu - they must be relative to the viewport.
    * If you use the `@oncontextmenu` event, also add `@oncontextmenu:preventDefault="true"` to avoid the browser context menu which will always show above HTML structures on the page, like the Telerik Context Menu.
1. Optionally, alter the [data source](slug:contextmenu-data-binding-overview) or [templates](slug:contextmenu-templates-overview) of the menu based on the metadata for the target.
1. Show the Telerik menu through its `@ref` and the `ShowAsync` method it exposes.

This article provides the following two examples:


* [Know The Target And Adjust Items](#know-the-target-and-adjust-items)
* [Context Menu for a Grid Row](#context-menu-for-a-grid-row)
* [Context Menu for a TreeView Node](#context-menu-for-a-treeview-node)

You can apply the approach of hooking to your own events to show the context menu in other scenarios as well. For example, you can [add a context menu for your treeview nodes](slug:contextmenu-kb-treeview-item).

## Know The Target And Adjust Items

Hooking to your own HTML elements' events lets you determine what to do with the context menu before showing it (for example, altering its data source).

>caption Use the context menu target and change menu items based on the target data

<demo metaUrl="client/contextmenu/integration/target-customization/" height="550"></demo>

## Context Menu for a Grid Row

To integrate the context menu with the Telerik Grid, you need to:

1. Use the grid's [`OnRowContextMenu`](slug:grid-events#onrowcontextmenu) event to get the current row model and show the menu
2. Use the context menu's [`OnClick`](slug:contextmenu-events#onclick) event to handle the desired operation

In this example, the context menu is used to select/deselect items, put an item in edit mode and delete items

>caption Use a Context Menu for Grid rows

<demo metaUrl="client/contextmenu/integration/grid-row/" height="700"></demo>

## Context Menu for a TreeView Node

To integrate the ContextMenu with the TreeView, you need to:

1. Use the [`OnItemContextMenu`](slug:treeview-events#onitemcontextmenu) event of the TreeView to get the current row model and show the menu
2. Use the context menu's [`OnClick`](slug:contextmenu-events#onclick) event to handle the desired operation

In this example, the context menu is used to select/deselect items and delete items

>caption Use a Context Menu for TreeView nodes

<demo metaUrl="client/contextmenu/integration/treeview-node/" height="500"></demo>

## See Also

* [Context Menu Overview](slug:contextmenu-overview)
* [Context Menu Data Binding](slug:contextmenu-data-binding-overview)
* [Context Menu Templates](slug:contextmenu-templates-overview)
