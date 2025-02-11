---
title: Events
page_title: TimePicker - Events
description: Events in the TimePicker for Blazor.
slug: components/timepicker/events
tags: telerik,blazor,TimePicker,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik TimePicker for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input, and upon clicking the `Set` or `Now` buttons in the dropdown.

>caption Handle ValueChanged

````RAZOR
@result
<br />

<TelerikTimePicker ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikTimePicker>

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

````RAZOR
@result
<br />
model value: @thePickerValue
<br />

<TelerikTimePicker Value="@thePickerValue" ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikTimePicker>

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

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The time picker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange

````RAZOR
@result
<br />

<TelerikTimePicker T="DateTime" OnChange="@MyOnChangeHandler"></TelerikTimePicker>

@code {
    string result;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:HH:mm:ss}", (DateTime)theUserInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle OnChange and use two-way binding

````RAZOR
@result
<br />
model value: @thePickerValue
<br />

<TelerikTimePicker @bind-Value="@thePickerValue" OnChange="@MyOnChangeHandler"></TelerikTimePicker>

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

## OnOpen

The `OnOpen` event fires before the TimePicker popup renders. 

The event handler receives as an argument an `TimePickerOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````RAZOR
<TelerikTimePicker Min="@Min"
                   OnOpen="@OnTimePickerPopupOpen"
                   Max="@Max"
                   Format="hh:mm:ss tt"
                   @bind-Value="@TimePickerValue">
</TelerikTimePicker>

@code {
    private DateTime? TimePickerValue = DateTime.Now;
    private DateTime Min = new DateTime(1900, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(1900, 1, 1, 19, 30, 45);

    private void OnTimePickerPopupOpen(TimePickerOpenEventArgs args)
    {
        //set the IsCancelled to true to cancel the OnOpen event
        args.IsCancelled = false;
    }
}
````

## OnClose

The `OnClose` event fires before the TimePicker popup closes.

The event handler receives as an argument an `TimePickerCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````RAZOR
@* Cancel the OnClose event based on a condition *@

<TelerikTimePicker Min="@Min"
                   OnClose="@OnTimePickerPopupClose"
                   Max="@Max"
                   Format="hh:mm:ss tt"
                   @bind-Value="@TimePickerValue">
</TelerikTimePicker>

@code {
    private DateTime? TimePickerValue = DateTime.Now;
    private DateTime Min = new DateTime(1900, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(1900, 1, 1, 19, 30, 45);

    private void OnTimePickerPopupClose(TimePickerCloseEventArgs args)
    {
        //cancel the OnClose event based on a condition
        if (TimePickerValue > DateTime.Now.AddHours(1))
        {
            args.IsCancelled = true;
        }
    }
}
````

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````RAZOR
@* You do not have to use OnChange to react to loss of focus *@

<TelerikTimePicker @bind-Value="@TheTime"
                   OnBlur="@OnBlurHandler">
</TelerikTimePicker>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheTime}.");
    }

    DateTime? TheTime { get; set; } = DateTime.Now;
}
````


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
