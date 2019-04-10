---
title: Overview
page_title: Calendar for Blazor Overview
description: Overview of the Calendar for Blazor
slug: components/calendar/overview
tags: telerik,blazor,calendar,overview
published: True
position: 0
---

# Calendar Overview

The Calendar component allows the user to scroll through a calendar and select one or more dates. You can control to what level the user can zoom the calendar (for example, up to months or years), what are the minimum and maximum date the user can navigate to, and whether they can select one or more dates.

To use a Telerik Calendar for Blazor, add the `TelerikCalendar` tag.

>caption Basic calendar with its key features, and ValueChanged event handling

````CSHTML
@using Telerik.Blazor.Components.Calendar
@using Telerik.Blazor

<TelerikCalendar Min="@min" Max="@max" ValueChanged="@MyValueChangeHandler" Date="@DateTime.Now">
</TelerikCalendar>

<br />
The selected date is: @selectedDate

@functions {

    private DateTime min = new DateTime(2015, 1, 1);
    private DateTime max = new DateTime(2025, 12, 31);
    private string selectedDate = "";

    private void MyValueChangeHandler(DateTime newValue)
    {
        selectedDate = newValue.ToString("dd MMM yyyy");
        StateHasChanged();
    }
}

````

>caption The result from the code snippet above

![](images/basic-calendar.png)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.Calendar

<TelerikCalendar ref="@myCalendarReference">
</TelerikCalendar>

@functions {
	Telerik.Blazor.Components.Calendar.TelerikCalendar myCalendarReference;
}
````
The calendar provides a number of features that allow you to control the user experience:

* [Navigation]({%slug components/calendar/navigation%}) - the calendar level (view) at which the user starts, to what detail (view) they can go, the min, max and current date.
* [Selection]({%slug components/calendar/selection%}) - whether the user can select only one ore more dates, and also a collection of dates they cannot select.

## See Also

  * [Navigation]({%slug components/calendar/navigation%})
  * [Selection]({%slug components/calendar/selection%})
  * [Live Demo: Calendar](https://demos.telerik.com/blazor/calendar/index)
