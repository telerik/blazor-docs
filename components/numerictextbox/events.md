---
title: Events
page_title: NumericTextbox - Events
description: Events in the NumericTextbox for Blazor.
slug: components/numerictextbox/events
tags: telerik,blazor,numeric,textbox,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik NumericTextbox for Blazor:

* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)


## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

@result

<TelerikNumericTextBox @bind-Value="@TheValue"
                       OnBlur="@OnBlurHandler">
</TelerikNumericTextBox>

@code {
    private string result = string.Empty;

    private decimal TheValue { get; set; } = 12.34m;

    private void OnBlurHandler()
    {
        result = $"BLUR fired, current value is {TheValue}.";
    }
}
````


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The NumericTextBox is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````CSHTML
@result
<br />
model value: @TheTbValue
<br />

<TelerikNumericTextBox @bind-Value="@TheTbValue" 
                       OnChange="@MyOnChangeHandler">
</TelerikNumericTextBox>

@code {
    private string result = string.Empty;

    private double TheTbValue { get; set; } = 1.2345;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // when a Value is provided, the type is taken from it
        result = string.Format("The user entered: {0}", (double)theUserInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires upon every valid change in the input (for example, keystroke). Using this event requires one-way binding for the `Value` parameter and manual update of the value in the handler. If the value is not updated, this will effective cancel the event.

>caption Handle ValueChanged

````CSHTML
@result
<br />
<TelerikNumericTextBox Value="@NumericValue"
                       ValueChanged="@( (double newValue) => NumericValueChanged(newValue) )"
                       Width="200px">
</TelerikNumericTextBox>

@code {
    private string result { get; set; } = string.Empty;

    private double NumericValue { get; set; } = 1.23;

    private void NumericValueChanged(double newValue)
    {
        // the handler receives a generic type <T>

        // one-way binding requires manual value update
        NumericValue = newValue;

        result = $"The new value is: {NumericValue}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
