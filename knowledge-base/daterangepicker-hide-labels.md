---
title: Hide Start and End labels of the DateRangePicker
description: How to hide Start and End labels of the DateRangePicker.
type: how-to
page_title: Hide Start and End labels of the DateRangePicker
slug: daterangepicker-kb-hide-labels
position: 
tags: 
ticketid: 1504745
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DateRangePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
Is there a way to disable/hide the labels for start and end? I'm having issues fitting this control in another vendor's Form Layout.

## Solution
You can use some custom CSS rules to hide the `Start` and `End` labels. You can also remove the top padding of the k-floating-label-container, so that there is no gap left above the component.

To make sure you are only styling the desired instance of the DateRangePicker (and not all instances on the page/app) use its `Class` parameter to add your custom CSS class to the component and use it to specify the selector.

````RAZOR
<style>
    /* version 5.1.1 and below */
    .daterangepicker-no-labels .k-label,
    /* version 6.0.0 and above */
    .daterangepicker-no-labels .k-floating-label {
        display: none;
    }

    .daterangepicker-no-labels .k-floating-label-container{
        padding: 0;
    }
</style>

<TelerikDateRangePicker Class="daterangepicker-no-labels"
                        @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue">
</TelerikDateRangePicker>

@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
}
````

