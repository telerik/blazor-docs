---
title: Header Template
page_title: DatePicker - Header Template
description: Use custom rendering in the calendar header of the DatePicker for Blazor.
slug: datepicker-header-template
tags: telerik,blazor,datepicker,template
published: True
position: 15
---

# Header Template

The `<HeaderTemplate>` allows you to customize the header of the calendar popup. If the application defines this template, the component will not render any of the built-in buttons and labels in the calendar header area.

The example below is using a [DatePicker reference and methods]({%slug components/datepicker/overview%}#component-reference).

>caption Header template with custom content in the DatePicker Calendar header

````CSHTML
<TelerikDatePicker @bind-Value="@PickerValue" @ref="Picker">
    <HeaderTemplate>

        <span>
            <TelerikButton OnClick="@GoToPrevious" Icon="arrow-60-left" Title="Go to Previous Month"></TelerikButton>
            <TelerikButton OnClick="@SelectToday">Today</TelerikButton>
            <TelerikButton OnClick="@GoToNext" Icon="arrow-60-right" Title="Go to Next Month"></TelerikButton>
        </span>
        <span style="padding-right: .6em;">
            <TelerikIcon Icon="parameter-date-time" /> @ViewDate.Month / @ViewDate.Year
        </span>
    </HeaderTemplate>
</TelerikDatePicker>

@code {
    TelerikDatePicker<DateTime> Picker { get; set; }
    DateTime PickerValue { get; set; } = DateTime.Now.AddMonths(-2);
    DateTime ViewDate { get; set; } = DateTime.Now.AddMonths(-2);

    void GoToPrevious()
    {
        ViewDate = ViewDate.AddMonths(-1);
        Picker.NavigateTo(ViewDate, CalendarView.Month);
    }

    void SelectToday()
    {
        PickerValue = DateTime.Today;
        Picker.Close();
    }

    void GoToNext()
    {
        ViewDate = ViewDate.AddMonths(1);
        Picker.NavigateTo(ViewDate, CalendarView.Month);
    }
}
````
