---
title: How to Change the Default Starting Day of the Week
description: Learn how to set a first day of the week that's different from the default one in the Telerik Blazor DatePicker component by modifying the current culture settings.
type: how-to
page_title: How to Change the Default Starting Day of the Week 
slug: datepicker-kb-change-starting-day-of-week
tags: datepicker, blazor, cultureinfo, firstdayofweek
res_type: kb
ticketid: 1665695
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DatePicker for Blazor, Calendar for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

This KB article answers the following questions:
* How can I change the first day of the week in the DatePicker?
* Is it possible to set a different day as the start of the week from the default one in the Telerik DatePicker for Blazor?
* What steps should I follow to modify the start of the week in a DatePicker component?

## Solution

To set the start of the week to a different one in the Telerik DatePicker for Blazor, override the `FirstDayOfWeek` property of the current culture in your application. Follow the steps below to implement this solution:

1. Include the necessary namespaces for [globalization](slug://globalization-formats) in your component.
2. Add the Telerik DatePicker component to your razor page.
3. Override the `OnInitialized` method to change the current culture's `FirstDayOfWeek` to the desired one.

````RAZOR

@using System.Globalization

<TelerikDatePicker @bind-Value="@Date"/>

@code {
    private DateTime Date { get; set; } = DateTime.Now;

    protected override void OnInitialized()
    {
        var cultureInfo = new CultureInfo("en-US");
        cultureInfo.DateTimeFormat.FirstDayOfWeek = DayOfWeek.Monday;
        CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
        CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
    }
}
````

By setting the `FirstDayOfWeek` property to `DayOfWeek.Monday`, the DatePicker will start the week with Monday based on the modified culture settings.

## See Also

- [DatePicker Overview Documentation](slug://components/datepicker/overview)
