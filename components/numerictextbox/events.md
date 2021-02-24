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

The `ValueChanged` event fires upon every change (for example, keystroke) in the input.

>caption Handle ValueChanged

````CSHTML
@* Update the model value in the ValueChanged handler *@

<TelerikButton Class="btn-warning">Button</TelerikButton>

@result
<br />

<TelerikNumericTextBox Value="@NumericValue"
                       ValueChanged="@( (double v) => MyValueChangeHandler(v) )"></TelerikNumericTextBox>

@code {
    public double NumericValue { get; set; }

    string result;

    private void MyValueChangeHandler(double theUserInput)
    {
        NumericValue = theUserInput;
        result = string.Format("The user entered: {0}", theUserInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value

````CSHTML
from the handler: @result
<br />
from model: @theTbValue
<br />

<TelerikNumericTextBox Value="@theTbValue" ValueChanged="@( (decimal v) => MyValueChangeHandler(v) )"></TelerikNumericTextBox>

@code {
    string result;

    decimal theTbValue { get; set; } = 1.2345m;

    private void MyValueChangeHandler(decimal theUserInput)
    {
        result = string.Format("The user entered: {0}", theUserInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        theTbValue = theUserInput;
    }
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
