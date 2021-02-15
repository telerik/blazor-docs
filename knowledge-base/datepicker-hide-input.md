---
title: Hide DatePicker input box
description: How to hide DatePicker input box.
type: how-to
page_title: Hide DatePicker input box
slug: datepicker-kb-hide-input
position: 
tags: 
ticketid: 1504648
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DatePicker for Blazor, DateTimePicker for Blazor, TimePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
Is there a way to hide the input portion of the DatePicker and leave only the Select/Icon?

## Solution
You can use some custom CSS to hide the input and leave only the select icon. 

To make sure you are styling only the desired instance of the DatePicker (and not all instances on the page/app) use the Class parameter to provide your custom CSS class to the component. 

You can also style the icon button as needed.

````CSHTML
<style>
    .date-picker-only-icon .k-picker-wrap {
        border: none;
    }

    .date-picker-only-icon .k-widget.k-dateinput {
        display: none;
    }

    .date-picker-only-icon .k-select {
        width: 30px;
        height: 30px;
    }
</style>

The selected date is: @datePickerValue.ToShortDateString()
<br />

<TelerikDatePicker Class="date-picker-only-icon" @bind-Value="datePickerValue"></TelerikDatePicker>

@code  {
    DateTime datePickerValue { get; set; } = DateTime.Now;

}
````

