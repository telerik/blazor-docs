---
title: Requires the Max parameter error in Slider
description: Max parameter of zero throws an error
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
I'm using the Telerik Slider, and I noticed that I can't set the Max to 0. When I set the Max parameter to zero, the component throws an error.

## Error Message
>warning ArgumentException: Telerik.Blazor.Components.TelerikSlider`1[System.Int32] requires the Max parameter.

## Cause\Possible Cause(s)
Since the max parameter is a required parameter, we are checking if the user has provided value. That being said, if the user doesn't set any value for the Max parameter, the parameter will stay with its default value and throw an error. The default value for a non-nullable type (like int) is 0, and when you manually set 0 to the Max parameter, the component acts like there is no Max parameter declared and throws an error again.

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
