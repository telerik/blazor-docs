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

When I use percentage and input 1 in the numeric textbox, it shows 100%, and when I input 0.10 it shows 10%.

I want input of `1` to show `1%` and inputting `10` to show `10%`.

## Possible Cause

The `Format` of the numeric textbox is just a string format over the actual value. In .NET, the percentage format has a range of [0%, 100%] for values between [0, 1]. Therefore, the value of `1` is `100%`, the value of `0.1` is `10%`.

Determining whether the actual intent of the user is to input `20` as `20%` or `20` as `2000%` is up to the application. This is a heuristic task from the perspective of the NumericTextbox component and it cannot make that decision. Thus, it keeps the user input as is, and when it loses focus it applies the designated Format.

>caption Simple way to see what values correspond to what percentage format

````RAZOR
<p>NumericTextBox component <code>Value</code>: @NumericValue</p>
<p>Formatted value: @NumericValue.ToString("P2")</p>

<TelerikNumericTextBox @bind-Value="@NumericValue"
                       Format="P2"
                       Width="120px" />

@code {
    private double NumericValue { get; set; } = 12;
}
````

## Solution

Set the [NumericTextBox `Format` parameter](slug:components/numerictextbox/overview#numeric-textbox-parameters) to a [custom format string with a '%' literal](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings#character-literals):

>caption NumericTextBox custom format and '%' literal

````RAZOR
<TelerikNumericTextBox @bind-Value="@PctValue"
                       Max="100" Min="0"
                       Decimals="0"
                       Format="# '%'"
                       Step="1"
                       Width="120px" />
@code{
    private double PctValue { get; set; } = 12;
}
````

## Notes

You can achieve similar behavior with a [MaskedTextbox component](slug:maskedtextbox-overview). Prepare a proper mask and parse the string to a double for later logic. The example below also shows how to use a culture-aware decimal separator:

>caption Using the MaskedTextBox component for percent values

````RAZOR
@using System.Globalization

<p><code>MaskedTextBoxValue</code>: @MaskedTextBoxValue</p>

<p><code>PctValue</code>: @PctValue</p>

<TelerikMaskedTextBox Mask="@PctMask"
                      IncludeLiterals="true"
                      @bind-Value="@MaskedTextBoxValue"
                      Width="120px">
</TelerikMaskedTextBox>

@code {
    private string PctMask { get; set; } = string.Format("00{0}00%", CultureInfo.CurrentCulture.NumberFormat.NumberDecimalSeparator);

    private string MaskedTextBoxValue { get; set; } = "12.34";

    private double PctValue => ParseDouble(MaskedTextBoxValue);

    private double ParseDouble(string stringValue)
    {
        if (string.IsNullOrEmpty(stringValue))
        {
            return 0d;
        }

        double parsedValue;

        // This custom logic can vary, depending on the business requirements.
        stringValue = stringValue.Replace("%", "").Replace(" ", "");

        if (Double.TryParse(stringValue, out parsedValue))
        {
            return parsedValue;
        }

        return 0d;
    }
}
````

## See Also

* [NumericTextBox overview](slug:components/numerictextbox/overview)
* [MaskedTextbox overview](slug:maskedtextbox-overview)
