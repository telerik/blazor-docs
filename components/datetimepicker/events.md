---
title: Events
page_title: DateTimePicker for Blazor | Events
description: Events in the DateTimePicker for Blazor
slug: components/datetimepicker/events
tags: telerik,blazor,DateTimePicker,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DateTimePicker for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The datetime picker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange

````CSHTML
@result
<br />

<TelerikDateTimePicker T="DateTime" OnChange="@MyOnChangeHandler"></TelerikDateTimePicker>

@code {
    string result;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (DateTime)theUserInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle OnChange and use two-way binding

````CSHTML
@result
<br />
model value: @thePickerValue
<br />

<TelerikDateTimePicker @bind-Value="@thePickerValue" OnChange="@MyOnChangeHandler"></TelerikDateTimePicker>

@code {
    string result;

    DateTime? thePickerValue { get; set; } = DateTime.Now;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (theUserInput as DateTime?).Value);
    }
}
````


## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input, and upon clicking the `Set` or `Now` buttons in the time dropdown.

>caption Handle ValueChanged

````CSHTML
@result
<br />

<TelerikDateTimePicker ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDateTimePicker>

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
@result
<br />
model value: @thePickerValue
<br />

<TelerikDateTimePicker Value="@thePickerValue" ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDateTimePicker>

@code {
    string result;

    DateTime thePickerValue { get; set; } = DateTime.Now;

    private void MyValueChangeHandler(DateTime theUserInput)
    {
        result = $"The user entered: {theUserInput}";

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        thePickerValue = theUserInput;
    }
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
