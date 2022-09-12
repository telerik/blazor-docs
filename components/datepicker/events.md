---
title: Events
page_title: DatePicker - Events
description: Events in the DatePicker for Blazor.
slug: components/datepicker/events
tags: telerik,blazor,DatePicker,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DatePicker for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The date picker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange

````CSHTML
@result
<br />

<TelerikDatePicker T="DateTime" OnChange="@MyOnChangeHandler"></TelerikDatePicker>

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
model value: @thePickerValue
<br />

<TelerikDatePicker @bind-Value="@thePickerValue" OnChange="@MyOnChangeHandler"></TelerikDatePicker>

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
@result
<br />

<TelerikDatePicker ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDatePicker>

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

<TelerikDatePicker Value="@thePickerValue" ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDatePicker>

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

## OnOpen

The `OnOpen` event fires before the DatePicker popup renders. 

The event handler receives as an argument an `DatePickerOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````CSHTML
<TelerikDatePicker @bind-Value="@DatePickerValue"
                   OnOpen="@OnDatePickerPopupOpen"
                   Format="dd MMMM yyyy"
                   Min="@Min" Max="@Max">
</TelerikDatePicker>

@code {
    private DateTime DatePickerValue { get; set; } = DateTime.Now;
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

    private void OnDatePickerPopupOpen(DatePickerOpenEventArgs args)
    {
        //set the IsCancelled to true to cancel the OnOpen event
        args.IsCancelled = false;
    }
}
````

## OnClose

The `OnClose` event fires before the DatePicker popup closes.

The event handler receives as an argument an `DatePickerCloseEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````CSHTML
@* Cancel the OnClose event based on a condition *@

<TelerikDatePicker @bind-Value="@DatePickerValue"
                   OnClose="@OnDatePickerPopupClose"
                   Format="dd MMMM yyyy"
                   Min="@Min" Max="@Max">
</TelerikDatePicker>

@code {
    private DateTime DatePickerValue { get; set; } = DateTime.Today;
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

    private void OnDatePickerPopupClose(DatePickerCloseEventArgs args)
    {
        //cancel the OnClose event based on a condition
        if (DatePickerValue > DateTime.Today)
        {
            args.IsCancelled = true; 
        }
    }
}
````

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

<TelerikDatePicker @bind-Value="@TheDate"
                   OnBlur="@OnBlurHandler">
</TelerikDatePicker>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheDate}.");
    }

    DateTime? TheDate { get; set; } = DateTime.Now;
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
