---
title: Events
page_title: SplitButton Events
description: How to handle events with the SplitButton for Blazor.
slug: splitbutton-events
tags: telerik,blazor,splitbutton,events
published: True
position: 15
components: ["splitbutton"]
---

# SplitButton Events

This article describes the SplitButton events:

* [OnClick](#onclick)

## OnClick

The `OnClick` event fires when the user clicks or taps the primary button or a secondary button. Each SplitButton action can execute a separate `OnClick` handler.

* The event argument type is [`MouseEventArgs`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs).
* The event handler can be synchronous (`void`) or asynchronous (`async Task`).

>caption SplitButton OnClick event

<demo metaUrl="client/splitbutton/events/example-1/" height="420"></demo>

## Next Steps

* [Add SplitButton Icons](slug:splitbutton-icons)
* [Configure the SplitButton appearance](slug:splitbutton-appearance)


## See Also

* [SplitButton API](slug:Telerik.Blazor.Components.TelerikSplitButton)
* [Live Demo: SplitButton](https://demos.telerik.com/blazor-ui/splitbutton/overview)
