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

| Validation of input | Event handler argument | Nullable of not `Value` parameter |
| --- | --- | --- |
| Invalid input | `Null` | Nullable |
| Invalid input | Default value of the `Value` parameter | Not nullable |
| Valid input | The valid input as an object that needs to be cast to the type of the component | Nullable or not nullable |

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
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", (DateTime)userInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires on every typing in the input and if the input is valid. The handler will receive the valid input.

The event also fires if the input is invalid and when the input loses focus and the `Value` parameter is nullable. The handler will receive a `null` argument.

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
