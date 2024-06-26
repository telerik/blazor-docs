---
title: Selection
page_title: Calendar - Selection
description: Selection in the Calendar for Blazor.
slug: components/calendar/selection
tags: telerik,blazor,calendar,selection,select date,multiple selection
published: True
position: 2
---

# Date Selection

The user can select one or mode dates depending on the Calendar configuration set by the developer. They may also be forbidden selection of certain disabled dates.

This article contains the following sections:

* [Selection Mode](#selection-mode)
* [Receive User Selection](#receive-user-selection)
	* [Single Selection Mode](#single-selection-mode)
	* [Multiple Selection Mode](#multiple-selection-mode)
	* [Range Selection Mode](#range-selection-mode)
* [Disabled Dates](#disabled-dates)

## Selection Mode

To control how many dates the user can select, use the `SelectionMode` property. It takes a member of the `Telerik.Blazor.CalendarSelectionMode` enum and can be:
* `Single`
* `Multiple`
* `Range`

You can pre-select a date in `Single` selection mode by setting the `Value` property of the calendar to the desired date.

To pre-select dates in the `Multiple` selection mode, use the `SelectedDates` property which is of type `List<DateTime>`.

In `Range` selection mode you can get the start and end dates of the range the user selected through the `RangeStart` and `RangeEnd` parameters of type `DateTime`. You also get events `RangeStartChanged` and `RangeEndChanged`. You can read more about them and see an example in the [Events]({%slug components/calendar/events%}) article.

## Receive User Selection

The way you can get the user selection depends on the selection mode you use:

* [Single Selection Mode](#single-selection-mode)
* [Multiple Selection Mode](#multiple-selection-mode)
* [Range Selection Mode](#range-selection-mode)

### Single Selection Mode

When using single selection mode, you can get the selected date through:

* two-way binding of the `Value` parameter
* the `ValueChanged` event - the event handler receives a `DateTime` object as parameter which represents the new selected date.

You can find examples of both below.

>caption Two-way binding for the selected date

````CSHTML
<TelerikCalendar @bind-Date="@startDate"
                 @bind-Value="@SelectedDate"
                 SelectionMode="@CalendarSelectionMode.Single">
</TelerikCalendar>

<p>
    Selected Date: @SelectedDate
</p>

@code {
    private DateTime SelectedDate { get; set; } = DateTime.Now.Date;
    private DateTime startDate = DateTime.Now.Date;
}
````

>caption Handle Single selection in the Calendar through an event

````CSHTML
<TelerikCalendar @bind-Date="@StartDate"
                 SelectionMode="@CalendarSelectionMode.Single"
                 Value="@SelectedDate"
                 ValueChanged="SelectionHandler">
</TelerikCalendar>

<p>
    Selected Date: @SelectedDate.ToShortDateString()
</p>

@code {
    private DateTime SelectedDate { get; set; } = DateTime.Today;

    private DateTime StartDate = DateTime.Today;

    private void SelectionHandler(DateTime newDate)
    {
        SelectedDate = newDate;
    }
}
````


### Multiple Selection Mode

With multiple selection mode, to get the user selection, use the `SelectedDates` property of the component reference in the `ValueChanged` handler.

>caption Handle Multiple selection in the Calendar

````CSHTML
<TelerikCalendar @ref="@CalendarRef"
                 SelectionMode="@CalendarSelectionMode.Multiple"
                 ValueChanged="@OnCalendarValueChanged">
</TelerikCalendar>

@if (SelectedDates.Any())
{
    <ul>
        @foreach (var date in SelectedDates)
        {
            <li>
                @date.ToShortDateString()
            </li>
        }
    </ul>
}

@code {
    private List<DateTime> SelectedDates { get; set; } = new List<DateTime>();

    private TelerikCalendar CalendarRef { get; set; }

    private void OnCalendarValueChanged()
    {
        SelectedDates = CalendarRef.SelectedDates;
    }
}
````

### Range Selection Mode

With range selection mode, you have two options to get the user choice:

* Two-way binding for the `RangeStart` (representing the first date of the selection) and the `RangeEnd` (the last date of the selection) parameters.
* Handling the [RangeStartChanged and RangeEndChanged events]({%slug components/calendar/events%}#rangestartchanged-and-rangeendchanged).

(Optional) You can set the `AllowReverse` parameter and define if the end date can be selected before the start date.


>caption Range selection with two-way binding and AllowReverse

````CSHTML
@* This example shows how to handle Range selection through two-way binding *@

<TelerikCheckBox Id="myCheckBox" @bind-Value="@AllowReverse" />
<label for="myCheckBox">@(AllowReverse ? "Allowed reverse selection" : "Not allowed reverse selection")</label>

<br/>

<TelerikCalendar Views="2"
                 Date="@Date"
                 @bind-RangeStart="@RangeStart"
                 @bind-RangeEnd="@RangeEnd"
                 SelectionMode="@CalendarSelectionMode.Range"
                 AllowReverse="@AllowReverse">
</TelerikCalendar>

<p>
    Start: @RangeStart
    <br />
    End: @RangeEnd
</p>

@code {
    public DateTime Date { get; set; } = DateTime.Now.AddDays(-5);
    public DateTime RangeStart { get; set; } = DateTime.Now.Date;
    public DateTime RangeEnd { get; set; } = DateTime.Now.AddDays(15).Date;
    public bool AllowReverse { get; set; }

    // the RangeEnd value will be the default(DateTime) while the user is selecting a range
    // that is, while they have clicked only once in the calendar
}
````


## Disabled Dates

To prevent the user from selecting certain dates (for example, holidays), add those dates to the `DisabledDates` collection.

With `Single` and `Multiple` selection, the user can't select these dates. With `Range` selection, these dates cannot be the start or end of a range, but can be included in the range.

>caption Add Disabled dates to a Calendar with Multiple selection

````CSHTML
@* The user will not be able to select the first and second of April 2019. *@

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
