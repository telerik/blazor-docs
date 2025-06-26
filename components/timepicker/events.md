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

The event handler receives the new value as an argument and you must update the component `Value` programmatically for the user changes to take effect.

>caption Handle the TimePicker ValueChanged event

````RAZOR
@Result
<br />
TimePicker Value: @TimePickerValue
<br />

<TelerikTimePicker Value="@TimePickerValue"
                   ValueChanged="@( (DateTime d) => TimePickerValueChanged(d) )">
</TelerikTimePicker>

@code {
    private string Result { get; set; } = string.Empty;

    private DateTime TimePickerValue { get; set; } = DateTime.Now;

    private void TimePickerValueChanged(DateTime newValue)
    {
        Result = $"The user entered: {newValue}";

        TimePickerValue = newValue;
    }
}
````

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The time picker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle the TimePicker OnChange event

````RAZOR
@Result
<br />
TimePicker Value: @TimePickerValue
<br />

<TelerikTimePicker @bind-Value="@TimePickerValue"
                   OnChange="OnTimePickerChange">
</TelerikTimePicker>

@code {
    private string Result { get; set; } = string.Empty;

    private DateTime TimePickerValue { get; set; } = DateTime.Now;

    private void OnTimePickerChange(object currentValue)
    {
        // Cast the event argument to the actual value type
        Result = $"The user entered: {(DateTime)currentValue}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

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
