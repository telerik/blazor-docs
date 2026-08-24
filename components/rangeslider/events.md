---
title: Events
page_title: RangeSlider - Events
description: Events in the RangeSlider for Blazor.
slug: rangeslider-events
tags: telerik,blazor,range,slider,events
published: true
position: 20
components: ["rangeslider"]
---

# Events

This article showcases the available events in the Telerik RangeSlider component:

* [StartValueChanged and EndValueChanged](#startvaluechanged-and-endvaluechanged)
* [OnChange](#onchange)

## StartValueChanged and EndValueChanged

`StartValueChanged` fires when the user moves the lower range of the slider, and `EndValueChanged` fires when the user changes the higher range of the slider.

The `ValueChanged` events fire every time the corresponding `Value` parameter changes. This happens while the user is dragging the handle or when they click on the track.

>tip As of version 2.28.0 of Telerik UI for Blazor, the `ValueChanged` events fire continuously while the user is dragging the handle to ensure updating the value accordingly and deliver live UX. Thus, the component will re-render multiple times during the dragging process. If you want to avoid that, you can handle the [`OnChange`](#onchange) event instead.

>caption Handle the StartValueChanged and EndValueChanged to filter products

<demo metaUrl="client/rangeslider/events-value-changed/" height="450"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user stops dragging the handle or when they click on the track.

The handler receives an object of type `RangeSliderChangeEventArgs` which exposes the following fields:

* `StartValue` - the new lower value of the slider that marks the range start.
* `EndValue` - the new higher value of the slider that marks the range end.

If you use two-way binding, this will effectively fire the [`StartValueChanged and EndValueChanged`](#startvaluechanged-and-endvaluechanged) events while the user is dragging the handle. This will result in continuous component re-rendering. If you want to avoid that, use one-way binding and update the value for the view-model in the `OnChange` event handler.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event to filter products

<demo metaUrl="client/rangeslider/events-on-change/" height="450"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [RangeSlider Overview](slug:rangeslider-overview)