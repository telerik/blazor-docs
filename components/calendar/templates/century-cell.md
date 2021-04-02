---
title: Century Cell
page_title: Calendar - Century Cell Template
description: Use custom Century cell template in the Calendar for Blazor.
slug: calendar-templates-century
tags: telerik,blazor,calendar,templates,century
published: True
position: 5
---

# Century Cell Template

The Century Cell Template controls what the calendar will render in the `<td>` element for each decade in the Century view that lists the decades.

The template receives the `DateTime` corresponding to its cell start year.

>caption Mark some decades on the calendar century view

![calendar century cell template](images/calendar-century-template.png)

````CSHTML
@* This example highlights certain decades *@

<TelerikCalendar Date="@startDate" @bind-View="@theView">
    <CenturyCellTemplate>
        <span style="color: @( ShouldHighlight(context.Year) ? "red" : "inherit" )">
            @(context.Year)s
        </span>
    </CenturyCellTemplate>
</TelerikCalendar>

@code{
    DateTime startDate { get; set; } = new DateTime(2021, 4, 1);
    CalendarView theView { get; set; } = CalendarView.Century;

    List<int> yearsWithEvents { get; set; } = new List<int>() { 2020, 2021, 2055 };
    bool ShouldHighlight(int decadeStart)
    {
        for (int i = 0; i < 10; i++)
        {
            if(yearsWithEvents.Contains(decadeStart + i))
            {
                return true;
            }
        }
        return false;
    }
}
````


## See Also

 * [Calendar Templates Overview]({%slug calendar-templates-overview%})
 * [Live Demo: Calendar Templates](https://demos.telerik.com/blazor-ui/calendar/templates)
 

