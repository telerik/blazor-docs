---
title: Shows Days from Current Calendar Month Only
description: How to hide days from the next and previous Calendar month and only show the days from the current month.
type: how-to
page_title: Shows Days from Current Calendar Month Only
slug: calendar-kb-show-days-from-current-month
position: 
tags: telerik, blazor, calendar, datepicker, datetimepicker, daterangepicker
ticketid: 1628589, 1604089, 1586468, 1562312, 1562104, 1551940
res_type: kb
components: ["calendar"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Calendar for Blazor, <br />
                DatePicker for Blazor, <br />
                DateRangePicker for Blazor, <br />
                DateTimePicker for Blazor
            </td>
        </tr>
        <tr>
            <td>Product Version</td>
            <td>2.26 +</td>
        </tr>
    </tbody>
</table>


## Description

This knowledge base article answers the following questions:

* How to make the Calendar show only days from the current selected month? In previous releases, the DatePicker showed the current month's days for selection in the Calendar popup. The latest DatePicker shows days from the next and previous months as well. How do I get the picker to display the current month's days only?
* The Calendar should not show days from the "overhang" month. How to disable the display of overflow from the next or previous month?
* How to remove the overview of the next month days in the left side month of the DateRangePicker? Same for the right side month, it shouldn't start with the last days of the previous month.
* How to prevent display and selection of "overlap" days from different months in the DatePicker Calendar? 


## Solution

Use [custom CSS to override the component theme](slug:themes-override) and hide the days from next and previous months in the Calendar month view. There are two options:

* Apply a custom CSS class and target specific Calendar components.
* Use Telerik CSS classes and target all Calendar components.

>caption Hide other month days from all Calendar and Picker instances

<div class="skip-repl"></div>

````CSS
.k-calendar .k-other-month {
    visibility: hidden;
}
````

>caption Target specific Calendar and Picker instances with custom CSS class

<div class="skip-repl"></div>

````CSS
.my-custom-calendar-class .k-other-month {
    visibility: hidden;
}
````


## Example

>caption Hide days from other months in the Calendar

````RAZOR
<p>
    <label>
        <TelerikCheckBox @bind-Value="@TargetAllCalendars" />
        Target all Calendars (no need for custom CSS class)
    </label>
</p>

<h2>No Days From Other Months</h2>

<TelerikCalendar Class="no-other-month" />

<TelerikCalendar Class="no-other-month" Views="2" />

<TelerikDatePicker @bind-Value="@DateValue"
                   PopupClass="no-other-month"
                   Width="200px" />

<TelerikDateRangePicker @bind-StartValue="@StartDateValue"
                        @bind-EndValue="@EndDateValue"
                        PopupClass="no-other-month" />

<h2>Default Behavior</h2>

<TelerikCalendar />

<TelerikCalendar Views="2" />

<TelerikDatePicker @bind-Value="@DateValue"
                   Width="200px" />

<TelerikDateRangePicker @bind-StartValue="@StartDateValue"
                        @bind-EndValue="@EndDateValue" />

@if (TargetAllCalendars)
{
    <style>
        .k-calendar .k-other-month {
            visibility: hidden;
        }
    </style>
}
else
{
    <style>
        .no-other-month .k-other-month {
            visibility: hidden;
        }
    </style>
}

@code {
    private DateTime DateValue { get; set; } = DateTime.Now;
    private DateTime StartDateValue { get; set; } = DateTime.Now;
    private DateTime EndDateValue { get; set; } = DateTime.Now;

    private bool TargetAllCalendars { get; set; }
}
````


## Notes

The Calendar behavior changed in 2.26 and this is when the component started showing days from the next and previous month by design.


## See Also

* [Feature request to hide other month days](https://feedback.telerik.com/blazor/1562492-customize-the-rendering-of-other-month-dates-in-the-calendar)
