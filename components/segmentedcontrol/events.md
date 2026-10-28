---
title: Events
page_title: SegmentedControl - Events
description: Explore the ValueChanged event of the Telerik Blazor SegmentedControl component, which fires when the user selects a different item.
slug: segmentedcontrol-events
tags: telerik,blazor,segmented,control,events
published: True
position: 30
components: ["segmentedcontrol"]
---

# SegmentedControl Events

This article describes the ValueChanged event of the Telerik SegmentedControl for Blazor.

## ValueChanged

The `ValueChanged` event fires when the user clicks an item and the selection changes. The event handler receives the new value as its argument. The application must update the Value parameter in the handler.

Use `ValueChanged` together with `Value` for one-way binding, or use `@bind-Value` for two-way binding.

>caption Handle the SegmentedControl ValueChanged event

<demo metaUrl="client/segmentedcontrol/events/example-1/" height="320"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl API Reference](slug:Telerik.Blazor.Components.TelerikSegmentedControl-2)
