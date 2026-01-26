---
title: Customize Month Headers in MultiView Calendar
description: Learn how to display the month name above each view in a MultiView Calendar using a custom header template and CSS in Telerik UI for Blazor.
type: how-to
page_title: How to Customize Month Headers in Telerik UI for Blazor MultiView Calendar
slug: calendar-kb-customize-multiview-header
tags: telerik, blazor, calendar, multiview
res_type: kb
ticketid: 1672888
components: ["calendar"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Calendar for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to customize the header of a MultiView Calendar to display the month name above each month view?

## Solution

To display the month name above each view in a MultiView Calendar, use the [`HeaderTemplate`](slug:calendar-templates-header) of the TelerikCalendar and apply custom CSS for styling for label positioning. The following example demonstrates how to achieve this customization. Note that the suggested approach is applicable only for `Horizontal` Calendar `Orientation`.

>caption MultiView Calendar with Header Template.

````RAZOR
@using System.Globalization

<TelerikCalendar @bind-Date="@CalendarDate"
                 SelectionMode="@CalendarSelectionMode.Single"
                 @bind-Value="@CalendarValue"
                 @bind-View="@CalendarView"
                 Views="@ViewCount">
    <HeaderTemplate>
        <div class="month-names">
            @for (int i = 0; i < ViewCount; i++)
            {
                int monthNumber = CalendarValue.Month + i > 12 ? (CalendarValue.Month + i) % 12 : CalendarValue.Month + i;
                string month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(monthNumber);

                <div>@month</div>
            }
        </div>
    </HeaderTemplate>
</TelerikCalendar>

<style>
    .month-names {
        width: 100%;
        display: flex;
        justify-content: space-between;
        
    }
    .month-names > div {
        flex: 1 1 auto;
        text-align: center;
    }
</style>

@code {
    private int ViewCount { get; set; } = 3;
    private DateTime CalendarDate { get; set; } = DateTime.Today;
    private DateTime CalendarValue { get; set; } = DateTime.Today;
    private CalendarView CalendarView { get; set; } = CalendarView.Month;
}
````

## See Also

* [Calendar Header Template](slug:calendar-templates-header)
* [Calendar Views](slug:components/calendar/multiview)
