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

In `Range` selection mode you can get the start and end dates of a selected range, by the user, through the `RangeStart` and `RangeEnd` parameters of type `DateTime`. You also get events `RangeStartChanged` and `RangeEndChanged`. You can read more about them in the [Events]({%slug components/calendar/events%}) article.

## Receive User Selection

To receive the user selection, handle the `ValueChanged`. There are two ways of obtaining the user selection, depending on the chosen selection mode:

* for `Single` selection mode - the event handler received a `DateTime` object that is the new selected date
* for `Multiple` selection mode - access the `SelectedDates` property of the component reference in the `ValueChanged` handler.

## Disabled Dates

To prevent the user from selecting certain dates (for example, holidays), add those dates to the `DisabledDates` collection.

## Examples

>caption Handle calendar date selection and disable certain dates from being selected

````CSHTML
The user will not be able to select the first and second of April 2019.

<h4>Single Selection</h4>

<TelerikCalendar SelectionMode="@CalendarSelectionMode.Single" ValueChanged="@SingleSelectionChangeHandler"
                 DisabledDates="@DisabledDates" @bind-Date="@startDate">
</TelerikCalendar>
<br />
@if (selectedDate != null)
{
    @selectedDate.Value.ToString("dd MMM yyyy");
}


<h4>Multiple Selection</h4>

<TelerikCalendar SelectionMode="@CalendarSelectionMode.Multiple" ValueChanged="@MultipleSelectionChangeHandler"
                 DisabledDates="@DisabledDates" @bind-Date="@startDate" @ref="multipleSelCalendar">
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
    private DateTime? selectedDate { get; set; } = null;
    private List<DateTime> chosenDates { get; set; }

    private void SingleSelectionChangeHandler(DateTime newValue)
    {
        // with single selection, the argument is a single DateTime object with the new selection
        selectedDate = newValue;
    }

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
