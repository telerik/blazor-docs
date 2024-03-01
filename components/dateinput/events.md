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

<TelerikDateInput @bind-Value="@ТheInputValue"
                  OnBlur="@OnBlurHandler">
</TelerikDateInput>

@code{
    private string result = string.Empty;

    private DateTime? ТheInputValue { get; set; } = DateTime.Now;

    private void OnBlurHandler()
    {
        result = string.Format("BLUR fired, current value is {0:dd/MMM/yyyy}.", ТheInputValue);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The DateInput is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````CSHTML
@result
<br />
model value: @ТheInputValue
<br />

<TelerikDateInput @bind-Value="@ТheInputValue" 
                  OnChange="@MyOnChangeHandler">
</TelerikDateInput>

@code {
    private string result = string.Empty;

    private DateTime? ТheInputValue { get; set; } = DateTime.Now;

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


## ValueChanged

The `ValueChanged` event fires upon every valid change in the input (for example, keystroke).

>caption Handle ValueChanged and provide initial value

````CSHTML
@result
<br />
model value: @ТheInputValue
<br />

<TelerikDateInput Value="@ТheInputValue" 
                  ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )">
</TelerikDateInput>

@code {
    private string result = string.Empty;

    private DateTime ТheInputValue { get; set; } = DateTime.Now;

    private void MyValueChangeHandler(DateTime theUserInput)
    {
        // the handler receives a generic type <T>

        result = string.Format("The user entered: {0:dd/MMM/yyyy}", theUserInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        ТheInputValue = theUserInput;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
