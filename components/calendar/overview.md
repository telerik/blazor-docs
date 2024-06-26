---
title: Overview
page_title: Calendar Overview
description: The Blazor Calendar facilitates date selection and display in web apps, improving UX for date-related tasks.
slug: components/calendar/overview
tags: telerik,blazor,calendar,overview
published: True
position: 0
---

# Blazor Calendar Overview

The <a href="https://www.telerik.com/blazor-ui/calendar" target="_blank">Blazor Calendar component</a> allows the user to scroll through a Gregorian calendar and select one or more dates. You can control to what level the user can zoom the calendar (for example, up to months or years), what are the minimum and maximum date the user can navigate to, and whether they can select one or more dates.

## Creating Blazor Calendar

1. Use the `TelerikCalendar` tag to add the component to a razor page.

1. Configure the minimum and maximum allowed dates by setting the `Min` and `Max` parameters.

1. Handle the `ValueChanged` event.

1. Set the value binding.

>caption Basic Calendar with its key features and ValueChanged event handling

````CSHTML
@* Main Calendar features, ValueChanged event handling. *@
<br />

<TelerikCalendar Min="@min" Max="@max" ValueChanged="@MyValueChangeHandler" @bind-Date="@theDate">
</TelerikCalendar>

<br />
The selected date is: @selectedDate

@code {

    private DateTime min = new DateTime(2015, 1, 1);
    private DateTime max = new DateTime(2025, 12, 31);
    private DateTime theDate { get; set; } = DateTime.Now;
    private string selectedDate = "";

    private void MyValueChangeHandler(DateTime newValue)
    {
        selectedDate = newValue.ToString("dd MMM yyyy");
    }
}

````

## Navigation

The Blazor Calendar navigation allows the user to navigate through several views that represent different periods of time, for example, a month or a year. You can control the calendar level (view) at which the user starts, to what detail (view) they can go, the min, max, and current date. To make the Calendar display a specific date programmatically, you can use the `Date` and `View` parameters that support two-way binding. [Read more about the Calendar navigation...]({%slug components/calendar/navigation%}) 

## Selection

The Calendar allows you to configure every aspect of the date selection. You can control whether the user can select only one or more dates. You can create a collection of disabled dates so that the user cannot select from them or define selectable ranges of days. [Read more about the Calendar selection...]({%slug components/calendar/selection%})

## Templates

The Blazor Calendar provides different types of templates to customize the component's content and styling. These include [month cell, year cell, decade cell, century cell and header templates]({%slug calendar-templates-overview%}).

## Multiple Views

You can display a wider range of dates by rendering multiple instances of the Calendar so that the users can find the desired date easier. [Read more about the multiple views in the Calendar...]({%slug components/calendar/multiview%})

## Events

The Blazor Calendar generates events that you can handle and further customize ist behavior. [Read more about the Blazor Calendar events...]({%slug components/calendar/events%}).


## Appearance

The Calendar component can display the ISO week number on each row of date cells. See the [`ShowWeekNumbers` parameter](#calendar-parameters) below.

The Calendar component can hide the days from other months within the current month. See the [`ShowOtherMonthDays` parameter](#calendar-parameters) below.

[Read more about the Blazor Calendar appearance settings...]({%slug calendar-appearance%}).

## Calendar Parameters

The Blazor Calendar provides various parameters that allow you to configure the component. Also check the [Calendar's public API](/blazor-ui/api/Telerik.Blazor.Components.TelerikCalendar).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `AllowReverse` | `bool` | Defines if the end date can be selected before the start date when [range selection]({%slug components/calendar/selection%}#range-selection-mode) is enabled. |
| `BottomView` | `CalendarView` enum <br /> (`Month`) | The most detailed view of the Calendar to which the user can navigate to. |
| `Date` | `DateTime` | The date that indicates the view the user is currently in. Supports two-way binding. |
| `DisabledDates` | `List<DateTime>` | A list of dates that cannot be selected as the start or end of the range. See the <a href="https://demos.telerik.com/blazor-ui/calendar/disabled-dates" target="_blank">Live Demo: Calendar - Disabled Dates</a>. |
| `Max` | `DateTime` | The latest date that the user can select. |
| `Min` | `DateTime` | The earliest date that the user can select. |
| `Orientation` | `CalendarOrientation` enum <br /> (`Horizontal`) | The orientation of the Calendar. The available options are `Horizontal` and `Vertical`. Applicable when using [more than one view]({%slug components/calendar/multiview%}). |
| `RangeStart` | `DateTime` | The selected start date when [range selection]({%slug components/calendar/selection%}#range-selection-mode) is enabled. Supports two-way binding. |
| `RangeEnd` | `DateTime` | The selected end date when [range selection]({%slug components/calendar/selection%}#range-selection-mode) is enabled. Supports two-way binding. |
| `SelectedDates` | `List<DateTime>` | The selected dates when [multiple selection]({%slug components/calendar/selection%}#multiple-selection-mode) is used. |
| `SelectionMode` | `CalendarSelectionMode` enum <br /> (`Single`) | The [selection mode]({%slug components/calendar/selection%}) of the calendar. |
| `ShowWeekNumbers` | `bool` | Sets if the Calendar will display week numbers according to the [ISO-8601 format](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.isoweek.getweekofyear). Note that the [ISO week number may differ from the conventional .NET week number](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.calendar.getweekofyear). |
| `ShowOtherMonthDays` | `bool` | Defines whether the days from other months are visible within the current month. |
| `TopView` | `CalendarView` enum <br /> (`Century`) | The most aggregated view of the Calendar to which the user can navigate. |
| `Value` | `DateTime` or `DateTime?` | The current value of the component when [single selection]({%slug components/calendar/selection%}#single-selection-mode) is used. Supports two-way binding. |
| `View` | ` CalendarView` enum <br /> (`Month`)| The current view that will be displayed in the Calendar. Supports two-way binding. |
| `Views` | ` int` <br/> (`1`) | The [number of views]({%slug components/calendar/multiview%}) that will be rendered to each other. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Calendar:

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Calendar (`<div class="k-calendar>`). |

## Calendar Reference and Methods

Add a reference to the component instance to use the [Blazor Calendar methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikCalendar).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `NavigateTo` | Navigates to a specified date and view. The method expects a `DateTime` and `CalendarView` arguments. |
| `Refresh` | Re-renders the Calendar. |

````CSHTML
<p>
    <TelerikButton OnClick="@GoToPreviousMonth">Go To Previous Month</TelerikButton>
    <TelerikButton OnClick="@GoToNextMonth">Go To Next Month</TelerikButton>
</p>

<TelerikCalendar @ref="@Calendar"
                 @bind-Value="@CalendarValue"
                 @bind-Date="@CalendarDate" />

@code {
    TelerikCalendar Calendar { get; set; }
    DateTime CalendarValue { get; set; } = DateTime.Now;
    DateTime CalendarDate { get; set; } = DateTime.Now;

    void GoToPreviousMonth()
    {
        Calendar.NavigateTo(CalendarDate.AddMonths(-1), CalendarView.Month);
    }

    void GoToNextMonth()
    {
        Calendar.NavigateTo(CalendarDate.AddMonths(1), CalendarView.Month);
    }
}
````

## Next Steps

* [Configuring the Date Selection]({%slug components/calendar/selection%})

* [Using the Calendar Events]({%slug components/calendar/events%})

## See Also

* [Navigation]({%slug components/calendar/navigation%})
* [Selection]({%slug components/calendar/selection%})
* [Multiple Views]({%slug components/calendar/multiview%})
* [Live Demo: Calendar](https://demos.telerik.com/blazor-ui/calendar/index)
* [Calendar API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikCalendar)
