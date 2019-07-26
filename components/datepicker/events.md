---
title: Events
page_title: DatePicker for Blazor | Events
description: Events in the DatePicker for Blazor
slug: components/datepicker/events
tags: telerik,blazor,DatePicker,events
published: true
position: 20
---

# Events

This article explsins the events available in the Telerik DatePicker for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnChange

The `OnChange` event fires when the new value is commited by the user either by pressing `Enter`, or when the input loses focus.

The date picker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange

````CSHTML
@using Telerik.Blazor.Components.DatePicker

<TelerikDatePicker T="DateTime" OnChange="@MyOnChangeHandler"></TelerikDatePicker>

<br />
@result

@code {
    string result;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", (DateTime)theUserInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle OnChange and use two-way binding

````CSHTML
@using Telerik.Blazor.Components.DatePicker

<TelerikDatePicker @bind-Value="@thePickerValue" OnChange="@MyOnChangeHandler"></TelerikDatePicker>

<br />
@result
<br />
model value: @thePickerValue

@code {
    string result;

    DateTime? thePickerValue { get; set; } = DateTime.Now;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", (theUserInput as DateTime?).Value);
    }
}
````

## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input.

>caption Handle ValueChanged

````CSHTML
@using Telerik.Blazor.Components.DatePicker

<TelerikDatePicker ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDatePicker>

<br />
@result

@code {
    string result;

    private void MyValueChangeHandler(DateTime theUserInput)
    {
        result = string.Format("The user entered: {0}", theUserInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value

````CSHTML
@using Telerik.Blazor.Components.DatePicker

<TelerikDatePicker Value="@thePickerValue" ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDatePicker>

<br />
@result
<br />
model value: @thePickerValue

@code {
    string result;

    DateTime thePickerValue { get; set; } = DateTime.Now;

    private void MyValueChangeHandler(DateTime theUserInput)
    {
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", theUserInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        thePickerValue = theUserInput;
    }
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
