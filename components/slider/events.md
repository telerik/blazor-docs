---
title: Events
page_title: Slider - Events
description: Events in the Slider for Blazor.
slug: slider-events
tags: telerik,blazor,slider,events
published: true
position: 20
components: ["slider"]
---

# Events

This article showcases the available events in the Telerik Slider component:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)

## ValueChanged

The `ValueChanged` event fires every time the `Value` parameter changes. This happens when the user:
* clicks on the increase/decrease buttons;
* clicks on the track;
* while dragging the handle;

>tip As of version 2.28.0 of Telerik UI for Blazor, the `ValueChanged` event fires continuously while the user is dragging the handle to ensure updating the value accordingly and deliver live UX. Thus, the component will re-render multiple times during the dragging process. If you want to avoid that, you can handle the [`OnChange`](#onchange) event instead.

>caption Handle the ValueChanged

<demo metaUrl="client/slider/events/value-changed/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user:
* clicks on the increase/decrease buttons;
* clicks on the track;
* after the user stops dragging the handle;

If you use two-way binding, the [`ValueChanged`](#valuechanged) event will fire continuously while the user is dragging the handle. This will result in continuous component re-rendering. If you want to avoid that, use one-way binding and update the value for the view-model in the `OnChange` event handler.


>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event

<demo metaUrl="client/slider/events/on-change/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [Slider Overview](slug:slider-overview)