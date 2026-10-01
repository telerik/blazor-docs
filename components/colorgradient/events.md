---
title: Events
page_title: Events - ColorGradient for Blazor
description: Events in the ColorGradient for Blazor.
slug: colorgradient-events
tags: telerik,blazor,colorgradient,events
published: true
position: 10
components: ["colorgradient"]
---

# ColorGradient Events

This article describes the available events of the Telerik ColorGradient for Blazor.

* [FormatChanged](#formatchanged)
* [ValueChanged](#valuechanged)


## FormatChanged

The `FormatChanged` event fires when the user clicks on the toggle button, which changes the input format. The event can help you persist the selected `Format` at a later stage.

When using this event, make sure to update the component `Format` programmatically in the event handler.

>caption Handle the ColorGradient FormatChanged event

<demo metaUrl="client/colorgradient/events/format-changed/" height="470"></demo>

## ValueChanged

The `ValueChanged` event fires continuously while the user is dragging the component handles, or changing the textbox values.

When using this event, make sure to update the component `Value` programmatically in the event handler.

>caption Handle the ColorGradient ValueChanged event

<demo metaUrl="client/colorgradient/events/value-changed/" height="470"></demo>


## See Also

* [ColorGradient Overview](slug:colorgradient-overview)
* [ColorGradient Live Demo](https://demos.telerik.com/blazor-ui/colorgradient/overview)
