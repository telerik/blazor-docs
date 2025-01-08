---
title: Events
page_title: DateRangePicker - Events
description: Events in the DateRangePicker for Blazor.
slug: daterangepicker-events
tags: telerik,blazor,DateRangePicker,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DateRangePicker for Blazor:


* [StartValueChanged and EndValueChanged](#startvaluechanged-and-endvaluechanged)
* [OnChange](#onchange)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [ViewChanged](#viewchanged)
* [OnCalendarCellRender](#oncalendarcellrender)


## StartValueChanged and EndValueChanged

The two `ValueChanged` events (`StartValueChanged` and `EndValueChanged`) fire when the user selects a new range.

When the user types in the inputs, they fire independently - only the event for the corresponding input fires.

When the user selects a range from the calendar popup, the first click always fires the start change with the selected date, and then clears the end of the range, so the end change event fires as well, with the `default` value for the model field.

>note The user can only type in the inputs and that will fire the corresponding event. Selecting from the calendar popup also fires the event. There is no way to know what the user intent is when they start modifying the values - whether they will modify one or both, so there is no definitive way to know when the user has finished using the component. Such logic is heuristic and is up to the application.

> If [`AdaptiveRendering`](slug://adaptive-rendering) is enabled, on small and medium devices `StartValueChanged` and `EndValueChanged` will fire only when the user clicks the confirmation button in the action sheet.

>caption Handle StartValueChanged and EndValueChanged

````RAZOR
@StartValue?.ToString("dd MMM yyyy")
<br />
@EndValue?.ToString("dd MMM yyyy")
<br />
<TelerikDateRangePicker StartValue="@StartValue"
                        EndValue="@EndValue"
                        StartValueChanged="@( (DateTime? sV) => StartValueChangedHandler(sV) )"
                        EndValueChanged="@( (DateTime? eV) => EndValueChangedHandler(eV) )">
</TelerikDateRangePicker>

@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);

    async Task StartValueChangedHandler(DateTime? currStart)
    {
        //you have to update the model manually because handling the <Parameter>Changed event does not let you use @bind-<Parameter>
        //not updating the model will effectively cancel the event
        StartValue = currStart;

        Console.WriteLine($"start changed to: {currStart}");
    }

    async Task EndValueChangedHandler(DateTime? currEnd)
    {
        // you have to update the model manually because handling the <Parameter>Changed event does not let you use @bind-<Parameter>
        // not updating the model will effectively cancel the event
        EndValue = currEnd;

        // sample check to execute logic only after the user has selected both ends of the range
        // if this does not pass, the user has only clicked once in the calendar popup
        if (currEnd != default(DateTime?))
        {
            Console.WriteLine($"end changed to: {currEnd}. The range is from {StartValue} to {EndValue}");
        }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus. The focus will also be lost when the user starts clicking in the calendar popup.

>caption Handle OnChange

````RAZOR
@StartValue?.ToString("dd MMM yyyy")
<br />
@EndValue?.ToString("dd MMM yyyy")
<br />
<TelerikDateRangePicker @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        OnChange="@OnChangeHandler">
</TelerikDateRangePicker>

@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);

    async Task OnChangeHandler(DateRangePickerChangeEventArgs e)
    {
        Console.WriteLine($"The range is from {e.StartValue} to {e.EndValue}");

        // the fields are of type object because you can use nullable or non-nullable DateTime
        // so you may need to cast them if you want to use the actual DateTime objects
    }
}
````

## OnOpen

The `OnOpen` event fires before the DateRangePicker popup renders. 

The event handler receives as an argument an `DateRangePickerOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````RAZOR
<TelerikDateRangePicker @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        OnOpen="@OnDateRangePickerPopupOpen"
                        Format="dd MMMM yyyy"
                        Min="@Min" Max="@Max">
</TelerikDateRangePicker>

@code {
    private DateTime? StartValue { get; set; } = DateTime.Now;
    private DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

    private void OnDateRangePickerPopupOpen(DateRangePickerOpenEventArgs args)
    {
        //set the IsCancelled to true to cancel the OnOpen event
        args.IsCancelled = false;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

## OnClose

The `OnClose` event fires before the DateRangePicker popup closes.

The event handler receives as an argument an `DateRangePickerCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

````RAZOR
@* Cancel the OnClose event based on a condition *@

<TelerikDateRangePicker @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        OnClose="@OnDateRangePickerPopupClose"
                        Format="dd MMMM yyyy"
                        Min="@Min" Max="@Max">
</TelerikDateRangePicker>

@code {
    private DateTime? StartValue { get; set; } = DateTime.Now;
    private DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

    private void OnDateRangePickerPopupClose(DateRangePickerCloseEventArgs args)
    {
        //cancel the OnClose event based on a condition
        if (EndValue > DateTime.Today.AddDays(15))
        {
            args.IsCancelled = true;
        }
    }
}
````

## ViewChanged

The `ViewChanged` event fires when the user changes the view they are seeing in the calendar popup (for example, goes up from the days in the month to the months in the year).

>caption Handle the ViewChanged event

````RAZOR
@StartValue?.ToString("dd MMM yyyy")
<br />
@EndValue?.ToString("dd MMM yyyy")
<br />
<TelerikDateRangePicker @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        ViewChanged="@ViewChangeHandler">
</TelerikDateRangePicker>

@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);

    async Task ViewChangeHandler(CalendarView currView)
    {
        Console.WriteLine($"The user is now looking at the {currView} calendar view");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. The event allows you to find out the current view and cell date. You can also set a custom CSS class for the `<td>` element.

The event handler receives as an argument an `DateRangePickerCalendarCellRenderEventArgs` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

````RAZOR
@* Customize the calendar cells using the OnCalendarCellRender event. *@

<TelerikDateRangePicker OnCalendarCellRender="@OnCalendarCellRenderHandler"
                        @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        Format="dd MMMM yyyy"
                        Min="@Min" Max="@Max">
</TelerikDateRangePicker>

@code {
    private DateTime? StartValue { get; set; } = DateTime.Now;
    private DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

    private void OnCalendarCellRenderHandler(DateRangePickerCalendarCellRenderEventArgs args)
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

<style>
    .special {
        color: white;
        background-color: greenyellow;
        font-weight: bold;
    }
</style>
````

## See Also

* [ValueChanged and Validation](slug://value-changed-validation-model)
* [Fire OnChange Only Once](slug://ddl-kb-onchange-fires-twice)
