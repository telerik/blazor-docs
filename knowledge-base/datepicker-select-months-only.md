---
title: Picking Only Months
description: How to select only months, not dates in the date picker
type: how-to
page_title: Pick Only Months
slug: datepicker-kb-select-months-only
position: 
tags: 
ticketid: 1513216
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DatePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
An app needs to process data for the month - is there a way to use DatePicker and choose only the Month/Year? Displaying it is quite easy with Format.

Is it possible to get a DatePicker that shows a popup with only month/year selection?

## Solution
You can use the `BottomView` to limit how far down the user can go to. If they can go down only to the Year view they will effectively select months.

You can also set a `Format` that shows the month and year only too.

Here is an example of both:

 
````CSHTML
@selectedDate
<br />
<TelerikDatePicker @bind-Value="@selectedDate"
                   BottomView="@CalendarView.Year"
                   Format="MMM yy">
</TelerikDatePicker>

@code{
    DateTime selectedDate { get; set; } = DateTime.Now;
}
````
