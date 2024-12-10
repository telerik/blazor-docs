---
title: Customize Month Headers in MultiView Calendar
description: Learn how to display the month name above each view in a MultiView Calendar using a custom header template and CSS in Telerik UI for Blazor.
type: how-to
page_title: How to Customize Month Headers in Telerik UI for Blazor MultiView Calendar
slug: calendar-kb-customize-multiview-header
tags: telerik, ui, blazor, calendar, multiview, customization, header, template
res_type: kb
ticketid: 1672888
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

I want to customize the header of a MultiView Calendar to display the month name above each view.

## Solution

To display the month name above each view in a MultiView Calendar, use the [`HeaderTemplate`]({%slug calendar-templates-header%}) of the TelerikCalendar and apply custom CSS for styling for label positioning. The following example demonstrates how to achieve this customization:

>caption MultiView Calendar with Header Template.

````CSHTML
@using System.Globalization;

<style>
    .my-header {
        inline-size: var(--INTERNAL--kendo-calendar-view-width, 256px);
        display: flex;
        justify-content: center;
    }
</style>

<TelerikCalendar @bind-Date="@StartDate" Views="@ViewCount"
                 @bind-Value="@Value"
                 @bind-View="@View"
                 SelectionMode="@CalendarSelectionMode.Single"
                 @ref="CalendarRef">
    <HeaderTemplate>
        @for (int i = 0; i < ViewCount; i++)
        {
            var monthNumber = Value.Month + i > 12 ? (Value.Month + i) % 12 : Value.Month + i;
            var month = CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(monthNumber);
            <div class="my-header">@month</div>
        }
    </HeaderTemplate>
</TelerikCalendar>

@code {
    private int ViewCount = 4;
    private DateTime StartDate = DateTime.Today;
    private DateTime Value = DateTime.Today;
    private CalendarView View = CalendarView.Month;
    private TelerikCalendar CalendarRef { get; set; }

    private string GetMeetingClass(DateTime date)
    {
        if (date.Day % 5 == 0)
        {
            return "meeting";
        }
        else if (date.Day % 9 == 0)
        {
            return "cocktail";
        }
        else
        {
            return "";
        }
    }

    private void NavigateToCurrentMonth()
    {
        CalendarRef.NavigateTo(DateTime.Today, CalendarView.Month);
    }

    private void GoToCenturyView()
    {
        View = CalendarView.Century;
    }
}
````

## See Also

- [Calendar Overview](https://docs.telerik.com/blazor-ui/components/calendar/overview)
- [Calendar Header Template](https://docs.telerik.com/blazor-ui/components/calendar/templates/header-template)
- [Calendar Views](https://docs.telerik.com/blazor-ui/components/calendar/views)
