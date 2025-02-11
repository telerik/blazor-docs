---
title: Events
page_title: DateTimePicker - Events
description: Events in the DateTimePicker for Blazor.
slug: components/datetimepicker/events
tags: telerik,blazor,DateTimePicker,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DateTimePicker for Blazor:

* [OnBlur](#onblur)
* [OnCalendarCellRender](#oncalendarcellrender)
* [OnChange](#onchange)
* [OnClose](#onclose)
* [OnOpen](#onopen)
* [ValueChanged](#valuechanged)


## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````RAZOR
@* You do not have to use OnChange to react to loss of focus *@

@result

<TelerikDateTimePicker @bind-Value="@DateTimePickerValue"
                       OnBlur="@OnBlurHandler">
</TelerikDateTimePicker>

@code {
    private string result = string.Empty;

    private DateTime? DateTimePickerValue { get; set; } = DateTime.Now;

    private void OnBlurHandler()
    {
        result = $"BLUR fired, current value is {DateTimePickerValue}.";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. The event allows you to:
* Identify the current view.
* Find out the cell date.
* Set a custom CSS class for the `<td>` element.

As an argument, the event handler receives a [`DateTimePickerCalendarCellRenderEventArgs` object](slug:telerik.blazor.components.datetimepickercalendarcellrendereventargs), which contains the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

````RAZOR
@* Customize the calendar cells using the OnCalendarCellRender event. *@

<TelerikDateTimePicker @bind-Value="@DateTimePickerValue"
                       OnCalendarCellRender="@OnCalendarCellRenderHandler"
                       Width="295px">
</TelerikDateTimePicker>

<style>
    .special {
        color: white;
        background-color: greenyellow;
        font-weight: bold;
    }
</style>

@code {
    private DateTime? DateTimePickerValue { get; set; } = DateTime.Now;

    private void OnCalendarCellRenderHandler(DateTimePickerCalendarCellRenderEventArgs args)
    {
        if (args.View == CalendarView.Month)
        {
            args.Class = args.Date.Day % 3 == 0 ? "special" : "";
        }
        else if (args.View == CalendarView.Decade)
        {
            args.Class = args.Date.Year == 2020 ? "special" : "";
        }
    }
}
````

## OnChange

The `OnChange` event represents a user action that confirms the current value. It fires when the user presses `Enter` in the input or when the input loses focus.

The event handler receives an `object` argument that you need to cast to the actual `Value` type. The argument can hold a value or be `null`, depending on the user input and the `Value` type.

The DateTimePicker is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````RAZOR
@result
<br />
model value: @DateTimePickerValue
<br />

<TelerikDateTimePicker @bind-Value="@DateTimePickerValue"
                       OnChange="@MyOnChangeHandler">
</TelerikDateTimePicker>

@code {
    private string result = string.Empty;

    private DateTime? DateTimePickerValue { get; set; } = DateTime.Now;

    private void MyOnChangeHandler(object userInput)
    {
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (DateTime)userInput);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## OnClose

The `OnClose` event fires before the DateTimePicker popup closes.

As an argument, the event handler receives a [`DateTimePickerCloseEventArgs` object](slug:telerik.blazor.components.datetimepickercloseeventargs), which contains the following properties:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````RAZOR
@* Cancel the OnClose event based on a condition *@

<TelerikDateTimePicker @bind-Value="@DateTimePickerValue"
                       OnClose="@OnDateTimePickerPopupClose">
</TelerikDateTimePicker>

@code {
    private DateTime? DateTimePickerValue = DateTime.Now;

    private void OnDateTimePickerPopupClose(DateTimePickerCloseEventArgs args)
    {
        //cancel the OnClose event based on a condition
        if (DateTimePickerValue > DateTime.Now)
        {
            args.IsCancelled = true;
        }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## OnOpen

The `OnOpen` event fires before the DateTimePicker popup renders. 

As an argument, the event handler receives a [`DateTimePickerOpenEventArgs` object](slug:telerik.blazor.components.datetimepickeropeneventargs), which contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````RAZOR
<TelerikDateTimePicker @bind-Value="@DateTimePickerValue"
                       OnOpen="@OnDateTimePickerPopupOpen">
</TelerikDateTimePicker>

@code {
    private DateTime? DateTimePickerValue = DateTime.Now;

    private void OnDateTimePickerPopupOpen(DateTimePickerOpenEventArgs args)
    {
        //set the IsCancelled to true to cancel the OnOpen event
        args.IsCancelled = false;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## ValueChanged

The `ValueChanged` event fires:

 * On Calendar or TimeView selection and during typing when the resulting input value is valid.
 * On input blur if the input value is not valid and the `Value` type is nullable.

>caption Handle ValueChanged and provide initial value

````RAZOR
@result
<br />
model value: @DateTimePickerValue
<br />

<TelerikDateTimePicker Value="@DateTimePickerValue" 
                       ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )">
</TelerikDateTimePicker>

@code {
    private string result = string.Empty;

    private DateTime DateTimePickerValue { get; set; } = DateTime.Now;

    private void MyValueChangeHandler(DateTime userInput)
    {
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", userInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        DateTimePickerValue = userInput;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
