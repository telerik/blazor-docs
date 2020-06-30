---
title: Events
page_title: DateInput | Events
description: Events in the DateInput for Blazor.
slug: components/dateinput/events
tags: telerik,blazor,DateInput,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DateInput for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The date input is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange

````CSHTML
@result
<br />

<TelerikDateInput T="DateTime" OnChange="@MyOnChangeHandler"></TelerikDateInput>

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
@result
<br />
model value: @theInputValue
<br />

<TelerikDateInput @bind-Value="@theInputValue" OnChange="@MyOnChangeHandler"></TelerikDateInput>

@code {
    string result;

    DateTime? theInputValue { get; set; } = DateTime.Now;

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
@result
<br />

<TelerikDateInput ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDateInput>

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
model value: @theInputValue
<br />

<TelerikDateInput Value="@theInputValue" ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDateInput>

@code {
    string result;

    DateTime theInputValue { get; set; } = DateTime.Now;

    private void MyValueChangeHandler(DateTime theUserInput)
    {
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", theUserInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        theInputValue = theUserInput;
    }
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
