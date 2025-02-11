---
title: Header Template
page_title: Calendar - Header Template
description: Use custom custom rendering in the header of the Calendar for Blazor.
slug: calendar-templates-header
tags: telerik,blazor,calendar,templates,header
published: True
position: 10
---

# Header Template

The `<HeaderTemplate>` allows you to customize the header of the calendar. If the application defines this template, the component will not render any of the built-in buttons and labels in the header area.

The example below is using a [Calendar reference and methods](slug:components/calendar/overview#calendar-reference-and-methods).

>caption Use custom rendering in the Calendar header

````RAZOR
<TelerikCalendar @bind-Value="@CalendarValue" @bind-Date="@CalendarDate">
    <HeaderTemplate>

        <TelerikButton OnClick="@GoToPrevious" Icon="@SvgIcon.ArrowLeft" Title="Go to Previous Month"></TelerikButton>
        <TelerikButton OnClick="@SelectToday">Today</TelerikButton>
        <TelerikButton OnClick="@GoToNext" Icon="@SvgIcon.ArrowRight" Title="Go to Next Month"></TelerikButton>

        <TelerikSvgIcon Icon="@SvgIcon.ParameterDateTime" /> @CalendarValue.ToShortDateString()

    </HeaderTemplate>
</TelerikCalendar>

@code {
    DateTime CalendarValue { get; set; } = DateTime.Now;
    DateTime CalendarDate { get; set; } = DateTime.Now;

    void GoToPrevious()
    {
        CalendarDate = CalendarDate.AddMonths(-1);
    }

    void SelectToday()
    {
        CalendarValue = DateTime.Today;
        CalendarDate = DateTime.Today;
    }

    void GoToNext()
    {
        CalendarDate = CalendarDate.AddMonths(1);
    }
}
````


## See Also

* [Calendar Templates Overview](slug:calendar-templates-overview)
* [Live Demo: Calendar Templates](https://demos.telerik.com/blazor-ui/calendar/templates)
