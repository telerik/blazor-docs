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

The DropDownButton exposes events that you can use to respond to user actions within the application.

## OnClick

The `OnClick` event fires when the user clicks or taps the primary button or a secondary button. The primary `<TelerikDropDownButton>` and each of its `<DropDownButtonItem>` instances execute a separate `OnClick` handler.

The event argument type is [`MouseEventArgs`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs).
 
The event handler can be synchronous (`void`) or asynchronous (`async Task`).

>caption Handling the DropDownButton OnClick event

<demo metaUrl="client/dropdownbutton/events/" height="360"></demo>


## See Also

* [DropDownButton API](slug:Telerik.Blazor.Components.TelerikDropDownButton)
* [Live Demo: DropDownButton](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
