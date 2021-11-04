---
title: Requires the Max parameter error in Slider
description: Blazor Slider requires a Max parameter and throws an error if zero is set.
type: troubleshooting
page_title: Requires the Max parameter error in Slider
slug: slider-kb-max-parameter-zero-error
position: 
tags: 
ticketid: 1541425
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Slider for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I'm using the Telerik Slider, and I can't set Max to 0. When I set the Max parameter to zero, the component throws an error.

## Error Message
>warning ArgumentException: Telerik.Blazor.Components.TelerikSlider`1[System.Int32] requires the Max parameter.

## Cause\Possible Cause(s)
The `Max` parameter is a required attribute and the component is checking if it is set. If the developer doesn't set any value for `Max` and the Slider `Value` type is `int`, then the `Max` parameter value will match the default value of the `int` type. This causes the observed error. The default value for the non-nullable `int` type is 0, and when you explicitly set `Max` to 0, the component acts like there is no parameter value set and still throws the error.

## Solution
You can avoid this exception by using a nullable type of the bound value.

>caption Set Max parameter to zero in the Slider

````CSHTML
@* Example with nullable type of the value  *@
@Volume
<br />
<TelerikSlider @bind-Value="@Volume"
               Min="-3"
               Max="0"
               SmallStep="1"
               LargeStep="1"
               Width="400px">
</TelerikSlider>

@code{
    int? Volume { get; set; }
}
````
