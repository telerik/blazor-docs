---
title: Events
page_title: Drawer - Events
description: Events in the Drawer for Blazor.
slug: drawer-events
tags: telerik,blazor,drawer,event,events
published: True
position: 25
components: ["drawer"]
---

# Drawer Events

This article explains the events available in the Telerik Drawer for Blazor:

* [`SelectedItemChanged`](#selecteditemchanged)
* [`ExpandedChanged`](#expandedchanged)
* [`OnItemRender`](#onitemrender)


## SelectedItemChanged

The `SelectedItemChanged` event fires every time the user clicks on a new item from the Drawer. You can use it with one-way data binding to respond to the user [selection](slug:drawer-selection). It receives an argument of the Drawer data model type.

>caption Handle SelectedItemChanged event

<demo metaUrl="client/drawer/events/selecteditemchanged-3/" height="420"></demo>

## ExpandedChanged

The `ExpandedChanged` event fires every time the component's state is changed - to expanded or to collapsed. You can use it with one-way data binding for the `Expanded` parameter. It takes an argument of the `bool` type that corresponds to its new state - whether the drawer is expanded.

>tip If you only need conditional markup based on the expanded/collapsed state of the drawer, use two-way binding (`@bind-Expanded`) - in this example, hiding the button conditionally can be achieved either way, but two-way binding requires less code.

>caption Handle ExpandedChanged event

<demo metaUrl="client/drawer/events/expandedchanged-2/" height="420"></demo>
>caption The result from the code snippet above

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnItemRender

The `OnItemRender` event fires when each item in the Drawer renders. It allows you to customize the appearance of an item. Note that the event does not work alongside a [`<Template>`](slug:drawer-templates#template), as the template disables all item related built-in features of the Drawer.

As an argument, the event handler receives an object of type `DrawerItemRenderEventArgs` that contains the following properties: 

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The current item that renders in the Drawer. |
| `Class` | `string` | The custom CSS class that will be added to the item. |

>caption Customizing the appearance of the Drawer items based on the Drawer mode.

<demo metaUrl="client/drawer/events/item-appearance-1/" height="420"></demo>

## See Also

* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
