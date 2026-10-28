---
title: Events
page_title: Form Events
description: The Form component for Blazor exposes events that allow you to react to user actions and provide user logic.
slug: form-events
tags: telerik,blazor,form,edit,events
published: True
position: 30
components: ["form"]
---

# Form Events

The Form component for Blazor exposes events that allow you to respond to user actions and provide custom logic.

* [OnSubmit](#onsubmit)
* [OnUpdate](#onupdate)
* [OnValidSubmit](#onvalidsubmit)
* [OnInvalidSubmit](#oninvalidsubmit)

>note The examples in this article use the `EditContext`, but you can use a [model](slug:form-overview#creating-blazor-form) instead. 

## OnSubmit

The `OnSubmit` event fires when the user clicks on the Submit button in the Form. Its handler takes as an argument the `EditContext` object and is used to trigger some custom logic based on the validity of the form. 

When there is a handler for the `OnSubmit` event, the [`OnValidSubmit`](#onvalidsubmit) and [`OnInvalidSubmit`](#oninvalidsubmit) events will not be fired.
  
The `OnSubmit` event is mapped to the `OnSubmit` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0">Microsoft EditForm</a>


>caption Handle the OnSubmit event

<demo metaUrl="client/form/events/example-4/" height="650"></demo>

## OnUpdate

The `OnUpdate` event fires when the user changes a value in the Form. The event is tied to the `FieldChanged` event of the Form's `EditContext`.

By default, `OnUpdate` will fire on each keystroke for [auto-generated form items](slug:form-overview#automatic-generation-of-fields) and [`FormItem` templates](slug:form-formitems-template). To change this behavior, define a `FormItem` `Template` and set [`ValidateOn` to `ValidationEvent.Change`](slug:common-features/input-validation#validation-modes-for-simple-inputs) for the field editor component. In this case, `OnUpdate` will fire when the user blurs the field editor or hits Enter while the editor is focused.

You can use the `OnUpdate` event to programmatically [refresh the UI outside the current Form item](slug:form-formitems#ui-rendering-inside-the-form).

The `OnUpdate` event argument is a [`FormUpdateEventArgs` object](slug:Telerik.Blazor.Components.FormUpdateEventArgs) with the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `Model` | `object` | The Form model with the latest updated values. Cast it to the correct type to access the class members. |
| `FieldName` | `string` | The name of the updated model property. |

>caption Using the Form OnUpdate event

<demo metaUrl="client/form/events/example-3/" height="600"></demo>

## OnValidSubmit

The `OnValidSubmit` event fires when the form is submitted and there are no validation errors. It is mapped to `OnValidSubmit ` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0">Microsoft EditForm</a>. Its handler takes the `EditContext` as an argument.

>caption Use the OnValidSubmit event

<demo metaUrl="client/form/events/example-2/" height="650"></demo>

## OnInvalidSubmit

The `OnInvalidSubmit` event fires when there are validation errors in the Form upon its submission. It is mapped to `OnInvalidSubmit` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0">Microsoft EditForm</a>. Its handler takes the `EditContext` as an argument.

>caption Use the OnInvalidSubmit event

<demo metaUrl="client/form/events/example-1/" height="650"></demo>

## See Also

* [Overview](slug:form-overview)
* [FormItems](slug:form-formitems)
* [Template](slug:form-formitems-template)
* [Orientation](slug:form-orientation)
* [Events](slug:form-events)
   
