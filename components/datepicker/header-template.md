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

The DatePicker `<HeaderTemplate>` allows you to customize the header of the Calendar popup. If the application defines this template, the component will not render any of the built-in buttons and labels in the Calendar header area.

The example below is using a [Blazor DatePicker reference and methods](slug://components/datepicker/overview#datepicker-reference-and-methods).

>caption Using DatePicker header template with custom content in the Calendar header

````RAZOR
<TelerikDatePicker @ref="@PickerRef"
                   Value="@DatePickerValue"
                   ValueChanged="@DatePickerValueChanged"
                   T="@DateTime"
                   Min="@PickerMin"
                   Max="@PickerMax"
                   Width="200px">
    <HeaderTemplate>
        <span>
            <TelerikButton OnClick="@GoToPrevious"
                           Icon="@SvgIcon.ArrowLeft"
                           Title="Go to Previous Month"
                           Size="@ThemeConstants.Button.Size.Small" />
            <TelerikButton OnClick="@SelectToday" Size="@ThemeConstants.Button.Size.Small">Today</TelerikButton>
            <TelerikButton OnClick="@GoToNext"
                           Icon="@SvgIcon.ArrowRight"
                           Title="Go to Next Month"
                           Size="@ThemeConstants.Button.Size.Small"></TelerikButton>
        </span>
        <span style="padding-right: .6em;">
            @DatePickerViewDate.ToString("MMM")
            <TelerikNumericTextBox Value="@DatePickerViewDate.Year"
                                   ValueChanged="@NumericTextBoxValueChanged"
                                   T="@int"
                                   Min="@NumericTextBoxMin"
                                   Max="@NumericTextBoxMax"
                                   Width="6em"
                                   Size="@ThemeConstants.NumericTextBox.Size.Small" />
        </span>
    </HeaderTemplate>
</TelerikDatePicker>

@code {
    private TelerikDatePicker<DateTime>? PickerRef { get; set; }

    private DateTime DatePickerValue { get; set; } = DateTime.Today;
    private DateTime DatePickerViewDate { get; set; } = DateTime.Today;
    private DateTime PickerMin { get; set; } = DateTime.Today.AddYears(-10);
    private DateTime PickerMax { get; set; } = DateTime.Today.AddYears(10);

    private int NumericTextBoxMin => PickerMin.Year;
    private int NumericTextBoxMax => PickerMax.Year;

    private void DatePickerValueChanged(DateTime newValue)
    {
        DatePickerValue = DatePickerViewDate = newValue;
    }

    private void NumericTextBoxValueChanged(int newYear)
    {
        if (NumericTextBoxMin <= newYear && newYear <= NumericTextBoxMax)
        {
            DatePickerViewDate = new DateTime(newYear, DatePickerViewDate.Month, DatePickerViewDate.Day);
            PickerRef?.NavigateTo(DatePickerViewDate, CalendarView.Month);
        }
    }

    private void GoToPrevious()
    {
        DatePickerViewDate = DatePickerViewDate.AddMonths(-1);
        PickerRef?.NavigateTo(DatePickerViewDate, CalendarView.Month);
    }

    private void SelectToday()
    {
        DatePickerValue = DateTime.Today;
        PickerRef?.Close();
    }

    private void GoToNext()
    {
        DatePickerViewDate = DatePickerViewDate.AddMonths(1);
        PickerRef?.NavigateTo(DatePickerViewDate, CalendarView.Month);
    }
}
````
