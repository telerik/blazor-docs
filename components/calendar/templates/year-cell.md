---
title: Year Cell
page_title: Calendar - Year Cell Template
description: Use custom Year cell template in the Calendar for Blazor.
slug: calendar-templates-year
tags: telerik,blazor,calendar,templates,Year
published: True
position: 3
components: ["calendar"]
---
# Year Cell Template

The Year Cell Template controls what the calendar will render in the `<td>` element for each month in the Year view that lists the months.

The template receives the `DateTime` corresponding to its cell.

>caption Mark some months on the calendar year view

![calendar year cell template](images/calendar-year-template.png)

````RAZOR
@* This example adds an icon for certain months *@

<TelerikCalendar @bind-Date="@startDate" @bind-View="@theView">
    <YearCellTemplate>
        @if (monthsWithEvents.Contains(context.Month))
        {
            <TelerikSvgIcon Icon="@SvgIcon.RoundCorners"></TelerikSvgIcon>
        }
        @context.ToString("MMM")
    </YearCellTemplate>
</TelerikCalendar>

@code{
    DateTime startDate { get; set; } = new DateTime(2021, 4, 1);
    CalendarView theView { get; set; } = CalendarView.Year;
    
    List<int> monthsWithEvents { get; set; } = new List<int>() { 3, 4, 12 };
}
````


## See Also

 * [Calendar Templates Overview](slug:calendar-templates-overview)
 * [Live Demo: Calendar Templates](https://demos.telerik.com/blazor-ui/calendar/templates)
 

