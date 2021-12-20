---
title: Overview
page_title: Calendar Overview
description: Discover the Calendar component for Blazor by checking the examples, and learn about its key features.
slug: components/calendar/overview
tags: telerik,blazor,calendar,overview
published: True
position: 0
---

# Calendar Overview

The <a href="https://www.telerik.com/blazor-ui/calendar" target="_blank">Blazor Calendar component</a> allows the user to scroll through a Gregorian calendar and select one or more dates. You can control to what level the user can zoom the calendar (for example, up to months or years), what are the minimum and maximum date the user can navigate to, and whether they can select one or more dates.

## Creating Blazor Calendar

1. Use the `TelerikCalendar` tag to add the component to a view, for example, `~/Pages/Index.razor`.

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

To see the result from the code snippet above, select the **PREVIEW** tab in the code snippet toolbar.

>tip The `Date` parameter indicates the view the user is in. You can use its `DateChanged` event to know when the user browses through the Calendar.

## Navigation

The Calendar navigation allows the user to navigate through several views that represent different periods of time, for example, a month or a year. You can control the calendar level (view) at which the user starts, to what detail (view) they can go, the min, max, and current date. To make the Calendar display a specific date programmatically, you can use the `Date` and `View` parameters that support two-way binding. [Read more about the Calendar navigation...]({%slug components/calendar/navigation%}) 

## Selection

The Calendar allows you to configure every aspect of the date selection. You can control whether the user can select only one or more dates. You can create a collection of disabled dates so that the user cannot select from them or define selectable ranges of days. [Read more about the Calendar selection...]({%slug components/calendar/selection%})

## Multiple Views

You can display a wider range of dates by rendering multiple instances of the Calendar so that the users can find the desired date easier. [Read more about the multiple views in the Calendar...]({%slug components/calendar/multiview%})

## Events

The Calendar generates events that you can handle and further customize ist behavior. [Read more about the Blazor Calendar events...]({%slug components/calendar/events%}).

## Using Blazor Calendar Reference

You can create a reference to an instance of the Blazor Calendar and use its methods. To declare a reference to the Calendar component, you must provide the component's namespace. 

````CSHTML
@using Telerik.Blazor.Components

<TelerikCalendar @ref="myCalendarReference">
</TelerikCalendar>

@code {
    Telerik.Blazor.Components.TelerikCalendar myCalendarReference;
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
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikCalendar)
