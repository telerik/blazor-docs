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

````CSHTML
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

The DateInput is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````CSHTML
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
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", (DateTime)userInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires on every change in the component value that occurs after typing and if:
* the input is valid.
The handler will receive the valid input.

The event also fires when the component loses focus and if:
* the `Value` parameter is nullable and
* the user changes the existing `Value` (default or valid updated) as:
    * types a value that is outside the `Min` and `Max` range (even for a single date segment) or
    * leaves an empty format segments.
The handler will receive a `null` argument.

>caption Handle ValueChanged and provide initial value

````CSHTML
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

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
