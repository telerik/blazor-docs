---
title: Reposition the labels of the DateRangePicker
description: How to reposition the labels of the DateRangePicker
type: how-to
page_title: Reposition the labels of the DateRangePicker
slug: daterangepicker-kb-reposition-labels
position:
tags:
res_type: kb
components: ["daterangepicker"]
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

I would like to reposition the labels of the DateRangePicker so that they are on the same line as the date inputs.


## Solution

By design the labels of the DateRangePicker are placed above the date inputs. If you would like to reposition them you could use CSS. A sample implementation of that can be seen in the example below.

````RAZOR
@*Reposition the labels of the DateRangePicker so that they are on the same line as the date inputs*@

<style>
    .reposition-labels .k-floating-label-container {
        padding-top: 0;
        width: auto;
        flex-direction: row-reverse;
        align-items: center;
    }

    .reposition-labels .k-floating-label-container > label {
        position: static;
        margin: 0 .5em;
    }
</style>

<TelerikDateRangePicker @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        Class="reposition-labels">
</TelerikDateRangePicker>

@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
}
````
