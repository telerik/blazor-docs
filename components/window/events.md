---
title: Events
page_title: Window - Events
description: Events of the Window for Blazor.
slug: window-events
tags: telerik,blazor,window,events
published: True
position: 20
components: ["window"]
---

# Window Events

This article explains the events available in the Telerik Window for Blazor:

* [HeightChanged and WidthChanged](#heightchanged-and-widthchanged)
* [LeftChanged and TopChanged](#leftchanged-and-topchanged)
* [Action OnClick](#action-onclick)
* [StateChanged](#statechanged)
* [VisibleChanged](#visiblechanged)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async) 

## HeightChanged and WidthChanged

You can use the `WidthChanged` and `HeightChanged` events to get notifications when the user tries to resize the window. The events require the `Resizable` parameter of the Window to be `true`, which is by default.

>caption Respond to the user actions when resizing the window

<demo metaUrl="client/window/events/example-1/" height="420"></demo>

## LeftChanged and TopChanged

These two events fire when the user finishes [moving the window](slug:window-draggable). If you set the `Top` and `Left` parameters of the window, you must update their values in these events - either by handling them yourself, or through using two-way binding.

The values will be in pixels, in a `string` format, rounded to one decimal place.

These events will also fire when the user maximizes the window because then its top and left coordinates become `0px`. You can capture this event through the [`StateChanged`](#statechanged) event that will fire afterwards.

The `LeftChanged` event fires second, so if you intend to store locations in an application state, and you want to do this only once, you can do that in `LeftChanged`.

>caption Handle LeftChanged and TopChanged

<demo metaUrl="client/window/events/example-2/" height="420"></demo>

## Action OnClick

Window actions expose the `OnClick` event. You can use it to implement custom buttons that invoke application logic from the Window's titlebar. See the [Window Actions](slug:components/window/actions) article for examples.

If you use the `OnClick` event on a built-in action, it will act as a custom action, and it will no longer perform the built-in feature (for example, close the window). If you want to invoke both a built-in action and custom logic from the same button, you have two options:

* Use the [`VisibleChanged`](#visiblechanged) and/or the [`StateChanged`](#statechanged) events to execute the custom logic on the user actions.
* Or, use two-way binding for the corresponding Window parameter (e.g., `@bind-Visible`, or `@bind-State`) and toggle its variable from the custom `OnClick` handler.

## StateChanged

Handle the `StateChanged` event to detect when the user tries to minimize, maximize or restore the window. You can effectively cancel the event by *not* updating the `State` parameter value in the handler.

>caption React to the user actions to minimize, restore or maximize the window

<demo metaUrl="client/window/events/example-3/" height="420"></demo>

## VisibleChanged

You can use the `VisibleChanged` event to get notifications when the user tries to close the window. You can effectively cancel the event by *not* propagating the new visibility state to the variable the `Visible` property is bound to. This is the way to cancel the event and keep the window open.

>caption Handle the Window VisibleChanged event

<demo metaUrl="client/window/events/example-4/" height="420"></demo>

## See Also

* [Window Overview](slug:window-overview)
* [Window State](slug:components/window/size)
* [Window Actions](slug:components/window/actions)
* [Focus TextBox on Window Open](slug:window-kb-focus-button-textbox-on-open)
