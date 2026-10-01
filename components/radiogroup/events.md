---
title: Events
page_title: RadioGroup - Events
description: Events in the Radio Button Group for Blazor.
slug: radiogroup-events
tags: telerik,blazor,radio button group,list,dropdownlist,events
published: true
position: 25
components: ["radiogroup"]
---

# Events

This article explains the events available in the Telerik RadioGroup for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

The examples in this article use `string` values and simple data sources for brevity. You can use full models, see the [data binding](slug:radiogroup-databind) article for more details.


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. In inputs, it fires when the user presses `Enter` in the input, or when the input loses focus. In the RadioGroup, it fires when the user selects an item because there is no other action.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event and use two-way binding

<demo metaUrl="client/radiogroup/events/example-3/" height="350"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection.

The example below uses [binding](slug:radiogroup-databind) to string data for brevity. You can use a model class as well.

>caption Handle ValueChanged

<demo metaUrl="client/radiogroup/events/example-2/" height="350"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)



## OnBlur

The `OnBlur` event fires when an element inside the component loses focus (radio button or the entire component).

>caption Handle the OnBlur event

<demo metaUrl="client/radiogroup/events/example-1/" height="350"></demo>




## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
