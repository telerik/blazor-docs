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

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)
* [OnCalendarCellRender](#oncalendarcellrender)


## ValueChanged

The `ValueChanged` event fires upon:
* Every change in the input (for example, keystroke).
* Clicking the `Set` or `Now` buttons in the time dropdown.

>caption Handle ValueChanged and provide initial value

````CSHTML
@result
<br />
model value: @thePickerValue
<br />

<TelerikDateTimePicker Value="@thePickerValue" ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDateTimePicker>

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
## can be added that Clicking the `Set` or `Now` buttons in the time dropdown.

The datetime picker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

````CSHTML
@result
<br />
model value: @thePickerValue
<br />

<TelerikDateTimePicker @bind-Value="@thePickerValue" OnChange="@MyOnChangeHandler"></TelerikDateTimePicker>

@code {
    private string result = string.Empty;

    private DateTime? thePickerValue { get; set; } = DateTime.Now;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0:dd/MMM/yyyy}", (theUserInput as DateTime?).Value);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.



## OnOpen

The `OnOpen` event fires before the DateTimePicker popup renders. 

The event handler receives as an argument an `DateTimePickerOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

````CSHTML
<TelerikDateTimePicker OnOpen="@OnDateTimePickerPopupOpen"
                       Min="@Min"
                       Max="@Max"
                       @bind-Value="@DateTimePickerValue"
                       Format="dd MMM yyyy HH:mm:ss">
</TelerikDateTimePicker>

@code {
    private DateTime? DateTimePickerValue = DateTime.Now;
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

    private void OnDateTimePickerPopupOpen(DateTimePickerOpenEventArgs args)
    {
        //set the IsCancelled to true to cancel the OnOpen event
        args.IsCancelled = false;
    }
}
````

## OnClose

The `OnClose` event fires before the DateTimePicker popup closes.

The event handler receives as an argument an `DateTimePickerCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

## to do - the calednar does not close - why - should it works like this
````CSHTML
@* Cancel the OnClose event based on a condition *@

<TelerikDateTimePicker OnClose="@OnDateTimePickerPopupClose"
                       Min="@Min"
                       Max="@Max"
                       @bind-Value="@DateTimePickerValue"
                       Format="dd MMM yyyy HH:mm:ss">
</TelerikDateTimePicker>

@code {
    private DateTime? DateTimePickerValue = DateTime.Now;
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

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

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event
## is it ok to make it as a result to be render in the page - not to be writen in the console
````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

<TelerikDateTimePicker @bind-Value="@TheDate"
                       OnBlur="@OnBlurHandler">
</TelerikDateTimePicker>

@code{
    private DateTime? TheDate { get; set; } = DateTime.Now;

    private void OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheDate}.");
    }
}
````

## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. The event allows you to find out the current view and cell date. You can also set a custom CSS class for the `<td>` element.

The event handler receives as an argument an `DateTimePickerCalendarCellRenderEventArgs` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

````CSHTML
@* Customize the calendar cells using the OnCalendarCellRender event. *@

<TelerikDateTimePicker OnCalendarCellRender="@OnCalendarCellRenderHandler"
                   @bind-Value="DateTimePickerValue"
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
    private DateTime DateTimePickerValue { get; set; } = DateTime.Now;

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

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
