---
title: Header Template
page_title: DateRangePicker - Header Template
description: Use custom rendering in the calendar header of the Blazor DateRangePicker.
slug: daterangepicker-header-template
tags: telerik,blazor,daterangepicker,template
published: True
position: 15
---

# Header Template

The `<HeaderTemplate>` allows you to customize the header of the calendar popup. If the application defines this template, the component will not render any of the built-in buttons and labels in the calendar header area.

The example below is using a [DateRangePicker reference and methods](slug:daterangepicker-overview#daterangepicker-reference-and-methods).

>caption Header template with custom content in the DateRangePicker Calendar header

````RAZOR
<TelerikDateRangePicker StartValue="@StartDate"
                        EndValue="@EndDate"
                        Format="dd MMMM yyyy"
                        StartValueChanged="@( (DateTime? newStart) => StartChanged(newStart) )"
                        EndValueChanged="@( (DateTime? newEnd) => EndChanged(newEnd) )"
                        Min="@MinDate" Max="@MaxDate"
                        @ref="@Picker">
    <HeaderTemplate>
        <span>
            <TelerikButton OnClick="@GoToPrevious" Icon="@SvgIcon.ArrowLeft" Title="Go to Previous Month"></TelerikButton>
            <TelerikButton OnClick="@SelectToday">Today</TelerikButton>
            <TelerikButton OnClick="@GoToNext" Icon="@SvgIcon.ArrowRight" Title="Go to Next Month"></TelerikButton>
        </span>
        <span style="padding-right: .6em;">
            <TelerikSvgIcon Icon="@SvgIcon.ParameterDateTime" /> Showing
            <strong>
                @ViewDate.Month/@ViewDate.Year - @ViewDate.AddMonths(1).Month/@ViewDate.AddMonths(1).Year
            </strong>
        </span>
    </HeaderTemplate>
</TelerikDateRangePicker>

@code {
    TelerikDateRangePicker<DateTime?> Picker { get; set; }

    DateTime? StartDate { get; set; } = DateTime.Now;
    DateTime? EndDate { get; set; } = DateTime.Now.AddDays(10);

    DateTime MinDate = new DateTime(1990, 1, 1, 0, 0, 0);
    DateTime MaxDate = new DateTime(2029, 12, 31, 0, 0, 0);

    DateTime ViewDate { get; set; } = DateTime.Now;

    void StartChanged(DateTime? newStart)
    {
        StartDate = newStart;

        if (newStart.HasValue)
        {
            ViewDate = newStart.Value;
        }
        else
        {
            ViewDate = DateTime.Now;
        }
    }

    void EndChanged(DateTime? newEnd)
    {
        EndDate = newEnd;
    }

    void GoToPrevious()
    {
        ViewDate = ViewDate.AddMonths(-1);
        Picker.NavigateTo(ViewDate, CalendarView.Month);
    }

    void SelectToday()
    {
        ViewDate = DateTime.Now;
        Picker.NavigateTo(ViewDate, CalendarView.Month);
    }

    void GoToNext()
    {
        ViewDate = ViewDate.AddMonths(1);
        Picker.NavigateTo(ViewDate, CalendarView.Month);
    }
}
````
