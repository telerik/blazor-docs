---
title: Events
page_title: Menu - Events
description: Events in the Menu for Blazor.
slug: components/menu/events
tags: telerik,blazor,menu,events
published: true
position: 20
components: ["menu"]
---

# Events

This article describes the events available in the Telerik Menu for Blazor:

* [`OnClick`](#onclick)
* [`OnItemRender`](#onitemrender)

## OnItemRender

The `OnItemRender` event fires when each Menu item renders. It allows you to customize the appearance of an item.

The event handler receives an argument object of type `MenuItemRenderEventArgs` that contains the following properties: 

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The current item that renders in the Menu. |
| `Class` | `string` | The custom CSS class that will be added to the item. |

>caption Customizing the appearance of the Menu items.

<demo metaUrl="client/menu/events/example-1/" height="320"></demo>

## OnClick

The `OnClick` event fires when the user clicks or taps on a menu item. It receives the model of the item as an argument that you can cast to the concrete model type you are using.

You can use the `OnClick` event to react to user choices in a menu without using navigation to load new content automatically.

>caption Handle OnClick

<demo metaUrl="client/menu/events/example-2/" height="320"></demo>


## See Also

* [Templates](slug:components/menu/templates)
