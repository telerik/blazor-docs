---
title: Events
page_title: DatePicker - Events
description: Events in the DatePicker for Blazor.
slug: components/datepicker/events
tags: telerik,blazor,DatePicker,events
published: true
position: 20
components: ["datepicker"]
---
# Events

This article describes the events of the Telerik DatePicker for Blazor.

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

<TelerikDatePicker @bind-Value="@DatePickerValue"
                   OnBlur="@OnBlurHandler">
</TelerikDatePicker>

@code {
    private string result = string.Empty;

    private DateTime? DatePickerValue { get; set; } = DateTime.Today;

    private void OnBlurHandler()
    {
        result = string.Format("BLUR fired, current value is {0:dd/MMM/yyyy}", DatePickerValue);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. The event allows you to:
* Identify the current view.
* Find out the cell date.
* Set a custom CSS class for the `<td>` element.

As an argument, the event handler receives a [`DatePickerCalendarCellRenderEventArgs` object](slug:telerik.blazor.components.datepickercalendarcellrendereventargs), which contains the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

````RAZOR
@* Customize the calendar cells using the OnCalendarCellRender event. *@

<TelerikDatePicker @bind-Value="@DatePickerValue"
                   OnCalendarCellRender="@OnCalendarCellRenderHandler"
                   Width="295px">
</TelerikDatePicker>

<style>
    .special {
        color: white;
        background-color: greenyellow;
        font-weight: bold;
    }
</style>

@code {
    private DateTime? DatePickerValue { get; set; } = DateTime.Today;

    private void OnCalendarCellRenderHandler(DatePickerCalendarCellRenderEventArgs args)
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

The DatePicker is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````RAZOR
<TelerikDatePicker @bind-Value="@DatePickerValue"
                   OnChange="@DatePickerValueChanged"
                   Width="150px">
</TelerikDatePicker>

<span><code>OnChange</code> fired at <strong>@LastOnChange?.ToString("HH:mm:ss.fff")</strong></span>

@code {
    private DateTime? DatePickerValue { get; set; }
    private DateTime? LastOnChange { get; set; }

    private void DatePickerValueChanged(object currentValue)
    {
        LastOnChange = DateTime.Now;
        Console.WriteLine($"The current Value is {(DateTime?)currentValue}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## OnClose

The `OnClose` event fires before the DatePicker popup closes.

The event handler receives as an argument an [`DatePickerCloseEventArgs` object](slug:telerik.blazor.components.datepickercloseeventargs) that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````RAZOR
@* Cancel the OnClose event based on a condition *@

<TelerikDatePicker @bind-Value="@DatePickerValue"
                   OnClose="@OnDatePickerPopupClose">
</TelerikDatePicker>

@code {
    private DateTime? DatePickerValue { get; set; } = DateTime.Today;

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

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnOpen

The `OnOpen` event fires before the DatePicker popup renders. 

As an argument, the event handler receives a [`DatePickerOpenEventArgs` object](slug:Telerik.Blazor.Components.DatePickerOpenEventArgs), which contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````RAZOR
<TelerikDatePicker @bind-Value="@DatePickerValue"
                   OnOpen="@OnDatePickerPopupOpen">
</TelerikDatePicker>

@code {
    private DateTime? DatePickerValue { get; set; } = DateTime.Today;

    private void OnDatePickerPopupOpen(DatePickerOpenEventArgs args)
    {
        //set the IsCancelled to true to cancel the OnOpen event
        args.IsCancelled = false;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## ValueChanged

The `ValueChanged` event fires:

 * On Calendar selection and during typing when the resulting input value is valid.
 * On input blur if the input value is not valid and the `Value` type is nullable.

>caption Handle ValueChanged and provide initial value

````RAZOR
@result
<br />
model value: @DatePickerValue
<br />

<TelerikDatePicker Value="@DatePickerValue" 
                   ValueChanged="@( (DateTime inputDate) => MyValueChangeHandler(inputDate) )">
</TelerikDatePicker>

@code {
    private string result = string.Empty;

    private DateTime DatePickerValue { get; set; } = DateTime.Today;

    private void MyValueChangeHandler(DateTime userInput)
    {
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", userInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        DatePickerValue = userInput;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)