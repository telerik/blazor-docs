---
title: Events
page_title: DateInput - Events
description: Events in the DateInput for Blazor.
slug: components/dateinput/events
tags: telerik,blazor,DateInput,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DateInput for Blazor:

* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````RAZOR
@* You do not have to use OnChange to react to loss of focus *@

@result

<TelerikDateInput @bind-Value="@DateInputValue"
                  OnBlur="@OnBlurHandler">
</TelerikDateInput>

@code{
    private string result = string.Empty;

    private DateTime? DateInputValue { get; set; } = DateTime.Now;

    private void OnBlurHandler()
    {
        result = string.Format("BLUR fired, current value is {0:dd/MMM/yyyy}.", DateInputValue);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnChange

The `OnChange` event represents a user action that confirms the current value. It fires when the user presses `Enter` in the input or when the input loses focus.

The event handler receives an `object` argument that you need to cast to the actual `Value` type. The argument can hold a value or be `null`, depending on the user input and the `Value` type.

The DateInput is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````RAZOR
@result
<br />
model value: @DateInputValue
<br />

<TelerikDateInput @bind-Value="@DateInputValue" 
                  OnChange="@MyOnChangeHandler">
</TelerikDateInput>

@code {
    private string result = string.Empty;

    private DateTime? DateInputValue { get; set; } = DateTime.Now;

    private void MyOnChangeHandler(object userInput)
    {
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", (DateTime)userInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires:

 * During typing when the resulting input value is valid.
 * On input blur if the input value is not valid and the `Value` type is nullable.


>caption Handle ValueChanged and provide initial value

````RAZOR
@result
<br />
model value: @DateInputValue
<br />

<TelerikDateInput Value="@DateInputValue" 
                  ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )">
</TelerikDateInput>

@code {
    private string result = string.Empty;

    private DateTime DateInputValue { get; set; } = DateTime.Now;

    private void MyValueChangeHandler(DateTime userInput)
    {
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", userInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        DateInputValue = userInput;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [ValueChanged and Validation](slug://value-changed-validation-model)
* [Fire OnChange Only Once](slug://ddl-kb-onchange-fires-twice)
