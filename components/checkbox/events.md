---
title: Events
page_title: CheckBox - Events
description: Events in the CheckBox for Blazor.
slug: checkbox-events
tags: telerik,blazor,checkbox,events
published: true
position: 20
components: ["checkbox"]
---

# Events

This article describes the available events in the Telerik CheckBox component for Blazor.

* [IndeterminateChanged](#indeterminatechanged)
* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## IndeterminateChanged

The CheckBox fires its `IndeterminateChanged` event when the user clicks an [indeterminate CheckBox](slug:checkbox-indeterminate-state) and the `Indeterminate` parameter changes to `false`. From this point, only the app can restore the `Indeterminate` parameter value to `true`, which does not fire the `IndeterminateChanged` event.

>caption Using the CheckBox IndeterminateChanged event

<demo metaUrl="client/checkbox/indeterminate-changed/" height="420"></demo>

## OnBlur

The `OnBlur` event fires when the CheckBox loses focus.

>caption Using the CheckBox OnBlur event

<demo metaUrl="client/checkbox/on-blur/" height="300"></demo>

## OnChange

The `OnChange` event fires every time the `Value` parameter changes. The key differences with [`ValueChanged`](#valuechanged) are:

* `OnChange` does not prevent two-way data binding for the `Value` parameter (`@bind-Value` syntax).
* `ValueChanged` always fires before `OnChange`.
* The `OnChange` event argument is an `object` that you need to cast. The `ValueChanged` event argument has the same type as `Value`.
* The `OnChange` event argument holds the current `Value`, while `ValueChanged` holds the new value that you must apply manually.

>caption Using the CheckBox OnChange event

<demo metaUrl="client/checkbox/on-change/" height="300"></demo>

## ValueChanged

The `ValueChanged` event fires every time the `Value` parameter changes. The event handler argument has the same type as the `Value` parameter. However, the handler always receives a `true` or `false` argument, even if the component is bound to a nullable boolean property. The new value depends on the old one as follows:

| Old Value | New Value |
| --- | --- |
| `true` | `false` |
| `false` | `true` |
| `null` | `true` |

Using the `ValueChanged` event requires one-way binding for the `Value` parameter and manual updating of the parameter in the handler. Compare with the [`OnChange` event](#onchange).

You can use the `ValueChanged` handler to set a `null` `Value` programmatically and toggle between three possible values instead of two.

>caption Using the CheckBox ValueChanged event

<demo metaUrl="client/checkbox/value-changed/" height="400"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)

