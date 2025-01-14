---
title: How to Display Currency Format Without Decimals
description: Learn how to display a currency value without decimal places in a Blazor NumericTextBox by adjusting the Format and Decimals parameters.
type: how-to
page_title: How to Display Currency Format Without Decimals
slug: numeric-textbox-kb-zero-decimals
tags: numeric-textbox, blazor, format, decimals, currency
res_type: kb
ticketid: 1661907
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

When using the [NumericTextBox](slug://components/numerictextbox/overview) with a currency format, setting the `Decimals` parameter to 0 does not prevent decimal places from being displayed. This occurs because the `Format="C"` parameter, which specifies currency formatting, overrides the `Decimals` parameter by adding two decimal places by default, according to the local currency settings (e.g., £).

This KB article also answers the following questions:
- How to display currency values without decimals in a NumericTextBox?
- How to use the Format parameter to control decimal places in NumericTextBox?
- What is the effect of the Decimals parameter in NumericTextBox when using currency format?

## Solution

To display a currency value without decimal places in the NumericTextBox while using the currency format (`C`), set the `Format` parameter to `"C0"`. This explicitly sets the number of decimal places to zero in the formatted currency value.

````RAZOR

<TelerikNumericTextBox @bind-Value="@BoundAmountTo" Decimals="0" Format="C0" Step="1m" />

@code {
        private decimal BoundAmountTo { get; set; } = 20.00m;
}

````

It is crucial to understand that the `Decimals` parameter only affects the allowed decimal places during typing (when the input is focused). Conversely, the `Format` parameter determines how the value is displayed when the input is not focused, including the number of decimal places shown in the formatted output.

## See Also

- [NumericTextBox Parameters](slug://components/numerictextbox/overview#numeric-textbox-parameters)
- [Standard Numeric Format Strings - Currency Format Specifier (C)](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings#currency-format-specifier-c)
