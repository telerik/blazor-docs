---
title: Header Template
page_title: DateTimePicker - Header Template
description: Use custom custom rendering in the calendar header of the DateTimePicker for Blazor.
slug: datetimepicker-header-template
tags: telerik,blazor,datepicker,template
published: True
position: 15
---

# Header Template

@[template](/_contentTemplates/common/calendar-header-template.md#header-template)

>caption Use custom rendering in the DatePicker Calendar header


````CSHTML
@* This example uses custom rendering in the Calendar header *@

<TelerikDateTimePicker @bind-Value="@DateValue">
    <HeaderTemplate>
        <TelerikButton OnClick="@OnClickHandler">Today</TelerikButton>
        <span style="padding-right: .5em;">
            <TelerikIcon Icon="parameter-date-time" /> Date: @DateValue.ToShortDateString()
        </span>
    </HeaderTemplate>
</TelerikDateTimePicker>

@code {
    DateTime DateValue { get; set; } = DateTime.Now;

    private void OnClickHandler()
    {
        DateValue = DateTime.Today;
    }
}
````
