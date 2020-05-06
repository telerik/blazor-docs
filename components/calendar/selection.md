---
title: Selection
page_title: Calendar for Blazor | Selection
description: Selection in the Calendar for Blazor
slug: components/calendar/selection
tags: telerik,blazor,calendar,selection,select date,multiple selection
published: True
position: 2
---

# Date Selection

The user can select one or mode dates depending on the Calendar configuration set by the developer. They may also be forbidden selection of certain disabled dates.

## Selection Mode

To control how many dates the user can select, use the `SelectionMode` property. It takes a member of the `Telerik.Blazor.CalendarSelectionMode` enum and can be:
* `Single`
* `Multiple`
* `Range`

You can pre-select a date in Single selection mode by setting the `Value` property of the calendar to the desired date.

To pre-select dates in the Multiple selection mode, use the `SelectedDates` property which is of type `List<DateTime>`.

In `Range` selection mode you can get the start and end dates of a selected range, by the user, through the `RangeStart` and `RangeEnd` parameters of type `DateTime`. You also get events `RangeStartChanged` and `RangeEndChanged`. You can read more about them and see an example in the [Events]({%slug components/calendar/events%}) article.

## Receive User Selection

### Single Selection Mode

Use the `ValueChanged` event. The handler receives a `DateTime` object as parameter which represents the new selected date.

>caption Handle Single selection in the Calendar

````CSHTML
@* This example shows how to handle Single selection *@

<TelerikCalendar Date="@startDate"
                 View="CalendarView.Month"
                 SelectionMode="@CalendarSelectionMode.Single"
                 ValueChanged="SelectionHandler">
</TelerikCalendar>

<p>
    Selected Date: @SelectedDate
</p>

@code {
    private DateTime SelectedDate { get; set; }
    private DateTime startDate = new DateTime(2019, 5, 2);
    private TelerikCalendar CalendarRef { get; set; }

    public void SelectionHandler(DateTime selectedDate)
    {
        SelectedDate = selectedDate;
    }
}
````

### Multiple Selection Mode

Use the `SelectedDates` property of the component reference in the `ValueChanged` handler.

>caption Handle Multiple selection in the Calendar

````CSHTML
@* This example shows how to handle Multiple selection *@

<TelerikCalendar Date="@startDate"
                 View="@CalendarView.Month"
                 SelectionMode="@CalendarSelectionMode.Multiple"
                 ValueChanged="@SelectionHandler"
                 @ref="@CalendarRef">
</TelerikCalendar>

@if (SelectedDates.Any())
{
    <ul>
        @foreach (var date in SelectedDates)
        {
            <li>
                @date
            </li>
        }
    </ul>
}

@code {
    public List<DateTime> SelectedDates { get; set; } = new List<DateTime>();
    private DateTime startDate = new DateTime(2019, 5, 2);
    private TelerikCalendar CalendarRef { get; set; }

    public void SelectionHandler()
    {
        SelectedDates = CalendarRef.SelectedDates;
    }
}
````
### Range Selection Mode

Use the `RangeStart`, representing the first date of the selection, and the `RangeEnd` - the last date of the selection.

>caption Handle Range selection

````CSHTML
@* This example shows how to handle Range selection *@

<TelerikCalendar Views="2"
                 Date="@Date"
                 RangeStart="@RangeStart"
                 RangeEnd="@RangeEnd"
                 SelectionMode="@CalendarSelectionMode.Range">
</TelerikCalendar>

@code {
    public static DateTime dateTimeNow { get; set; } = DateTime.Now;
    public DateTime Date { get; set; } = dateTimeNow.AddDays(-5);
    public DateTime RangeStart { get; set; } = dateTimeNow;
    public DateTime RangeEnd { get; set; } = dateTimeNow.AddDays(15);
}
````

### Disabled Dates

To prevent the user from selecting certain dates (for example, holidays), add those dates to the `DisabledDates` collection.

>caption Handle Disabled dates with Calendar Multiple selection

````CSHTML
The user will not be able to select the first and second of April 2019.

<TelerikCalendar SelectionMode="@CalendarSelectionMode.Multiple"
                 ValueChanged="@MultipleSelectionChangeHandler"
                 DisabledDates="@DisabledDates"
                 @bind-Date="@startDate"
                 @ref="multipleSelCalendar">
</TelerikCalendar>
<br />
@if (chosenDates != null && chosenDates.Count > 0)
{
    <ul>
        @foreach (DateTime date in chosenDates)
        {
            <li>@date.ToString("dd MMM yyyy")</li>
        }
    </ul>
}

@code {
    private DateTime startDate = new DateTime(2019, 4, 1); // set the initial date of the calendar

    // set dates the user can't select
    private List<DateTime> DisabledDates = new List<DateTime>() { new DateTime(2019, 4, 1), new DateTime(2019, 4, 2) };

    // fields to store and render the user selection
    private List<DateTime> chosenDates { get; set; }

    // reference used to obtain the selected dates from a multiple selection calendar
    private Telerik.Blazor.Components.TelerikCalendar multipleSelCalendar;
    private void MultipleSelectionChangeHandler()
    {
        //with multiple selection, get the selected dates from a component reference
        chosenDates = multipleSelCalendar.SelectedDates;
    }
}

````

## See Also

  * [Live Demo: Calendar Selection](https://demos.telerik.com/blazor-ui/calendar/selection)
