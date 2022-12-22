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

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The numeric textbox is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange

````CSHTML
@result
<br />

<TelerikNumericTextBox T="decimal" OnChange="@MyOnChangeHandler"></TelerikNumericTextBox>

@code {
    string result;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (decimal)theUserInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle OnChange and use two-way binding

````CSHTML
@result
<br />
model value: @theTbValue
<br />

<TelerikNumericTextBox @bind-Value="@theTbValue" OnChange="@MyOnChangeHandler"></TelerikNumericTextBox>

@code {
    string result;

    double theTbValue { get; set; } = 1.2345;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // when a Value is provided, the type is taken from it
        result = string.Format("The user entered: {0}", (double)theUserInput);
    }
}
````

## ValueChanged

The `ValueChanged` event fires on every change (keystroke) in the input. Using this event requires one-way binding for the `Value` parameter and manual update of the value in the handler. If the value is not updated, this will effective cancel the event.

>caption Handle ValueChanged

````CSHTML
<TelerikNumericTextBox Value="@NumericValue"
                       ValueChanged="@( (double newValue) => NumericValueChanged(newValue) )"
                       Width="200px">
</TelerikNumericTextBox>

<p> @Result </p>

@code {
    private double NumericValue { get; set; } = 1.23;

    private string Result { get; set; }

    private void NumericValueChanged(double newValue)
    {
        // one-way binding requires manual value update
        NumericValue = newValue;

        Result = $"The new value is: {NumericValue}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

<TelerikNumericTextBox @bind-Value="@TheValue"
                       OnBlur="@OnBlurHandler">
</TelerikNumericTextBox>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheValue}.");
    }

    decimal TheValue { get; set; } = 12.34m;
}
````


## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
