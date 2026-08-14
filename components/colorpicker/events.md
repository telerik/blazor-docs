---
title: Events
page_title: Events - ColorPicker for Blazor
description: Events in the ColorPicker for Blazor.
slug: colorpicker-events
tags: telerik,blazor,colorpicker,events
published: true
position: 20
components: ["colorpicker"]
---

# ColorPicker Events

This article describes the available events of the Telerik ColorPicker for Blazor.

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [ViewChanged](#viewchanged)
* [OnOpen](#onopen)
* [OnClose](#onclose)

## OnChange

The `OnChange` event fires when the user commits their selection with:

* Apply or Cancel button click
* Enter keypress
* Blur action (popup close)

Note that the `OnChange` event may also fire when the actual selected color has not changed.

The event type is `EventCallback<object>`. The `OnChange` event does not prevent two-way binding for the `Value` attribute.

<demo metaUrl="client/colorpicker/events/on-change/" height="220"></demo>

## ValueChanged

The `ValueChanged` event fires when the user selects a new color and the component value changes.

The event type is `EventCallback<string>`. Using `ValueChanged` requires one-way binding for the `Value` attribute and manual value update in the event handler.

<demo metaUrl="client/colorpicker/events/value-changed/" height="220"></demo>

## ViewChanged

The `ViewChanged` event fires when the user toggles between the popup views.

The event type is `EventCallback<ColorPickerView>`. Using `ViewChanged` requires one-way binding for the `View` attribute and manual value update in the event handler.

<demo metaUrl="client/colorpicker/events/view-changed/" height="220"></demo>

## OnOpen

The `OnOpen` event fires before the ColorPicker popup renders.

The event handler receives as an argument an `ColorPickerOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/colorpicker/events/on-open/" height="220"></demo>

## OnClose

The `OnClose` event fires before the ColorPicker popup closes.

The event handler receives as an argument an `MultiColumnComboBoxCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/colorpicker/events/on-close/" height="220"></demo>

## See Also

* [ColorPicker Overview](slug:colorpicker-overview)
* [ColorPicker Views](slug:colorpicker-views)
