---
title: Percentage Format Range
description: How to change the percentage display to show 10% instead of 100% when value is 1
type: troubleshooting
page_title: Show 10% instead of 100% when value is 1
slug: numerictextbox-kb-percentage-range
position: 
tags: 
ticketid: 1483526
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>NumericTextBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When I use percentage and input 1 to the numeric text box it shows 100%, when i input 0.10 it shows 10%

I want that inputting 1 will show 1% and inputting 10 will show 10%

## Cause\Possible Cause(s)

The `Format` of the numeric textbox is just a string format over the actual value. In .NET, the percentage format has a range of [0%, 100%] for values between [0, 1]. Therefore, the value of 1 is 100%, the value of 0.1 is 10%.

Determining whether the actual intent of the user is to input 20 as 20% or 20 as 2000% is up to the application - this is a heuristic task from the perspective of the Numeric Textbox component and it cannot make that decision. Thus, it keeps the user input as is, and when it loses focus it applies the designated Format.

>caption Simple way to see what values correspond to what percentage format

````CSHTML
Actual value: @thePercentage, formatted value @thePercentage.ToString("P2")

<br />

<TelerikNumericTextBox @bind-Value="@thePercentage" Format="P2" />

@code{
    double thePercentage { get; set; } = 12;
}
````

## Solution

You can use the [component events]({%slug components/numerictextbox/events%}) to change the value. For example, if your application knows the range of values it expects to be always between 0-100%, divide values larger than 1 by 1000. 

If you want precision to the decimal places of the percentage values, this means that you need to also set `Decimals="4"` to the numeric textbox because the first two decimal places correspond to the two-digit percentages.

>caption Change the Value in the app code to make 10% come from input "10"

````OnChange
Actual value: @thePercentage, formatted value @thePercentage.ToString("P2")

<br />

<TelerikNumericTextBox @bind-Value="@thePercentage" Format="P2" Decimals="4" OnChange="@ChangePercentage" />

@code{
    double thePercentage { get; set; } = 12;

    void ChangePercentage(object currValue)
    {
        // implement the desired logic here - it depends on the values you expect
        // for example, this app expects percentages between 0% and 100%, so it divides by 100
        // note that this is a heuristic task because 1000% may be a valid value
        // and it is usually up to the user to determine what they need and want
        if (thePercentage >= 1)
        {
            thePercentage = thePercentage / 100;
        }
    }
}
````
````ValueChanged
Actual value: @thePercentage, formatted value @thePercentage.ToString("P2")

<br />

<TelerikNumericTextBox Value="@thePercentage" Format="P2" Decimals="4" ValueChanged="@( (double v) => ChangePercentage(v) )" />

@code{
    double thePercentage { get; set; } = 12;

    void ChangePercentage(double currValue)
    {
        // implement the desired logic here - it depends on the values you expect
        // for example, this app expects percentages between 0% and 100%, so it divides by 100
        // note that this is a heuristic task because 1000% may be a valid value
        // and it is usually up to the user to determine what they need and want
        // note 2: ValueChanged fires on every keystroke and is more invasive to the UX
        if (currValue >= 1)
        {
            thePercentage = currValue / 100;
        }
        else
        {
            thePercentage = currValue;
        }
    }
}
````

