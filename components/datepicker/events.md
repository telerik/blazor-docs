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

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)
* [OnCalendarCellRender](#oncalendarcellrender)


## ValueChanged

The `ValueChanged` event fires immediately upon every change in the input (for example, keystroke, after date selection in the Calendar popup).

>caption Handle ValueChanged and provide initial value

````CSHTML
@result
<br />
model value: @thePickerValue
<br />

<TelerikDatePicker Value="@thePickerValue" ValueChanged="@( (DateTime inputDate) => MyValueChangeHandler(inputDate) )"></TelerikDatePicker>

@code {
    private string result = string.Empty;

    private DateTime thePickerValue { get; set; } = DateTime.Now;

    private void MyValueChangeHandler(DateTime theUserInput)
    {
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", theUserInput);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        thePickerValue = theUserInput;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The DatePicker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````CSHTML
@result
<br />
model value: @thePickerValue
<br />

<TelerikDatePicker @bind-Value="@thePickerValue" OnChange="@MyOnChangeHandler"></TelerikDatePicker>

@code {
    private string result = string.Empty;

    private DateTime? thePickerValue { get; set; } = DateTime.Now;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", ( (DateTime?)theUserInput).Value);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


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

@code {
    private DateTime? TheDate { get; set; } = DateTime.Now;

    private async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheDate}.");
    }

}
````

## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. The event allows you to:
* Find out the current view.
* Find out the cell date.
* Set a custom CSS class for the `<td>` element.

The event handler receives as an argument an `DatePickerCalendarCellRenderEventArgs` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

````CSHTML
@* Customize the calendar cells using the OnCalendarCellRender event. *@

<TelerikDatePicker OnCalendarCellRender="@OnCalendarCellRenderHandler"
                   @bind-Value="@DatePickerValue"
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
    private DateTime DatePickerValue { get; set; } = DateTime.Now;

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

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
