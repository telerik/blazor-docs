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

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)
* [OnCalendarCellRender](#oncalendarcellrender)


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus.

The datetime picker is a generic component, so you must provide either a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange

````CSHTML
@result
<br />

<TelerikDateTimePicker T="DateTime" OnChange="@MyOnChangeHandler"></TelerikDateTimePicker>

@code {
    string result;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (DateTime)theUserInput);
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

<TelerikDateTimePicker @bind-Value="@thePickerValue" OnChange="@MyOnChangeHandler"></TelerikDateTimePicker>

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


## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input, and upon clicking the `Set` or `Now` buttons in the time dropdown.

>caption Handle ValueChanged

````CSHTML
@result
<br />

<TelerikDateTimePicker ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDateTimePicker>

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

<TelerikDateTimePicker Value="@thePickerValue" ValueChanged="@( (DateTime d) => MyValueChangeHandler(d) )"></TelerikDateTimePicker>

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

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

<TelerikDateTimePicker @bind-Value="@TheDate"
                       OnBlur="@OnBlurHandler">
</TelerikDateTimePicker>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheDate}.");
    }

    DateTime? TheDate { get; set; } = DateTime.Now;
}
````

## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. It allows you to see which view it is in, what its date, and you can set the Class for the `<td>` element based on your business logic.

The event handler receives as an argument an `DateTimePickerCalendarCellRenderEventArgs` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | Lets you set a custom CSS class to the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> `Month` | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

````CSHTML
@* Customize the calendar cells using the OnCalendarCellRender event. *@

<TelerikDateTimePicker OnCalendarCellRender="@OnCalendarCellRenderHandler"
                   @bind-Value="dateTimePickerValue"
                   Width="295px">
</TelerikDateTimePicker>

@code {
    DateTime dateTimePickerValue { get; set; } = DateTime.Now;

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

<style>
    .special {
        color: white;
        background-color: greenyellow;
        font-weight: bold;
    }
    /* You can inspect the built-in rendering with the browser dev tools
        to see how to apply heavier selectors and to also use classes the DateTimePicker
        calendar provides such as focus and selection states */
</style>
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
