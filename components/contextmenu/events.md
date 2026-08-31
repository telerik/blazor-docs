---
title: Events
page_title: Context Menu - Events
description: Events in the Context Menu for Blazor.
slug: contextmenu-events
tags: telerik,blazor,context menu,events
published: true
position: 100
components: ["contextmenu"]
---

# Events

This article describes the events that are fired by the Telerik Context Menu for Blazor:

* [`OnClick`](#onclick)
* [`OnItemRender`](#onitemrender)

## OnClick

The `OnClick` event fires when the user clicks or taps on a menu item. It receives the model of the item as an argument that you can cast to the concrete model type you are using.

You can use the `OnClick` event to react to user choices, for example load new content without using navigation.

>caption Handle OnClick

<demo metaUrl="client/contextmenu/events/on-click/" height="300"></demo>

## OnItemRender

The `OnItemRender` event fires when each Context Menu item renders. It allows you to customize the appearance of an item.

The event handler receives an argument object of type `MenuItemRenderEventArgs` that contains the following properties: 

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The current item that renders in the Context Menu. |
| `Class` | `string` | The custom CSS class that will be added to the item. |

>caption Using OnItemRender to customize the appearance of the Context Menu items.

<demo metaUrl="client/contextmenu/events/on-item-render/" height="350"></demo>

## See Also

* [Templates](slug:contextmenu-templates-overview)
