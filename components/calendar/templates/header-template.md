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

@[template](/_contentTemplates/common/calendar-header-template.md#header-template)

>caption Use custom rendering in the Calendar header


````CSHTML
@* This example uses custom rendering in the Calendar header *@

<TelerikCalendar @bind-View="@theView" @bind-Date="@theDate">
    <HeaderTemplate>
        <TelerikButton OnClick="@OnClickHandler">Today</TelerikButton>
        <span style="padding-left: 10px;">
            <TelerikIcon Icon="calendar" /> View: @context.View
        </span>
        <span style="padding-left: 10px;">
            <TelerikIcon Icon="parameter-date-time" /> Bound date: @context.Date.ToShortDateString()
        </span>
    </HeaderTemplate>
</TelerikCalendar>

@code {

    private void OnClickHandler()
    {
        theView = CalendarView.Month;
        theDate = DateTime.Today;
    }

    private CalendarView theView { get; set; } = CalendarView.Year;
    private DateTime theDate { get; set; }
}
````


## See Also

 * [Calendar Templates Overview]({%slug calendar-templates-overview%})
 * [Live Demo: Calendar Templates](https://demos.telerik.com/blazor-ui/calendar/templates)
 

