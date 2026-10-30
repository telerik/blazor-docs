---
title: Events
page_title: DropDownButton - Events
description: Explore the events that the DropDownButton for Blazor fires. See how you can handle the OnClick of the primary button and the secondary items to respond to the user action.
slug: dropdownbutton-events
tags: telerik,blazor,dropdownbutton,events
published: True
position: 15
components: ["dropdownbutton"]
---

# DropDownButton Events

The DropDownButton exposes events that you can use to respond to user actions within the application:

* [OnClick](#onclick)
* [OnClose](#onclose)
* [OnOpen](#onopen)

## OnClick

The `OnClick` event fires when the user clicks or taps the primary button or a secondary button. The primary `<TelerikDropDownButton>` and each of its `<DropDownButtonItem>` instances execute a separate `OnClick` handler.

The event argument type is [`MouseEventArgs`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs).
 
The event handler can be synchronous (`void`) or asynchronous (`async Task`).

>caption Handling the DropDownButton OnClick event

<demo metaUrl="client/dropdownbutton/events/" height="300"></demo>

## OnClose

The `OnClose` event fires before the DropDownButton popup closes. Set the `IsCancelled` property of the `DropDownButtonCloseEventArgs` argument to `true` to keep the popup open.

The event fires for user interaction and when calling `CloseAsync()`. It does not fire when the popup is already closed.

## OnOpen

The `OnOpen` event fires before the DropDownButton popup opens. Set the `IsCancelled` property of the `DropDownButtonOpenEventArgs` argument to `true` to keep the popup closed.

The event fires for user interaction and when calling `OpenAsync()`. It does not fire when the popup is already open.


## See Also

* [DropDownButton API](slug:Telerik.Blazor.Components.TelerikDropDownButton)
* [Live Demo: DropDownButton](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
