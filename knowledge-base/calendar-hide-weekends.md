---
title: Hide Weekends in the Calendar
description: How to hide weekend days in the Blazor Calendar?
type: how-to
page_title: Hide Weekends in the Calendar
slug: calendar-kb-hide-weekends
position: 
tags: hide, weekends, calendar, datepicker, datetimepicker
ticketid: 1543661
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Calendar for Blazor, DatePicker for Blazor, DateTimePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I want to hide the weekends in the Calendar Month view, so only the week days are visible.

## Solution

If you want to hide the weekends and have only the week days displayed in the Month view of the Calendar, you can achieve that with some custom CSS. By default, the first column of the view contains Sundays and the last one contains Saturdays. You can use that to target the specific n-th child of the table rows and hide them. In addition, you can expand the width of the visible cells to fill the layout of the view.

>caption Add some custom CSS to hide the weekends in Calendar Month view.

````CSHTML
<style>
/* Hide the first and the last cell of every row. By default, Sunday is first and Saturday is last (seventh). 
If needed, you can configure the selectors to target and customize other specific n-th child.*/

    .k-calendar-monthview .k-calendar-th:nth-child(1),
    .k-calendar-monthview .k-calendar-th:nth-child(7),
    .k-calendar-monthview .k-calendar-td:nth-child(1),
    .k-calendar-monthview .k-calendar-td:nth-child(7),
    .k-calendar-monthview .k-other-month:nth-child(1),
    .k-calendar-monthview .k-other-month:nth-child(7) {
        display: none;
    }

    .k-calendar-monthview .k-calendar-th,
    .k-calendar-monthview .k-calendar-td,
    .k-calendar-monthview .k-other-month,
    .k-calendar-monthview .k-link {
        width: 46px;
    }        
</style>

<TelerikCalendar Min="@min"
                 Max="@max"
                 View="@View"
                 @bind-Date="@theDate" >
</TelerikCalendar>

@code {

    public CalendarView View { get; set; } = CalendarView.Month;

    private DateTime min = new DateTime(2020, 1, 1);

    private DateTime max = new DateTime(2025, 12, 31);

    private DateTime theDate { get; set; } = DateTime.Now;

}
```
