---
title: Reposition the labels of the DateRangePicker
description: How to reposition the labels of the DateRangePicker
type: how-to
page_title: Reposition the labels of the DateRangePicker
slug: daterangepicker-kb-reposition-labels
position:
tags:
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

I would like to reposition the labels of the DateRangePicker so that they are on the same line as the date inputs.


## Solution

By design the labels of the DateRangePicker are placed above the date inputs. If you would like to reposition them you could use CSS. A sample implementation of that can be seen in the example below.

>note In the example, the component is wrapped in a `<div>` with a custom CSS class so that you can cascade those styles to a single instance of the DateRangePicker. In our 2.21.0 release, this div will be redundant since the component will expose the `Class` parameter which will add a custom CSS class to the main wrapping element of the DateRangePicker.

````CSHTML
@*Reposition the labels of the DateRangePicker so that they are on the same line as the date inputs*@

<style>
    .reposition-labels .k-floating-label-container {
        padding-top: 0;
        width: auto;
        flex-direction: row-reverse;
        align-items: center;
    }

        .reposition-labels .k-floating-label-container > .k-label {
            position: static;
            margin: 0 .5em;
        }
</style>

<div class="reposition-labels">
    <TelerikDateRangePicker @bind-StartValue="@StartValue"
                            @bind-EndValue="@EndValue">
    </TelerikDateRangePicker>
</div>


@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
}
````
