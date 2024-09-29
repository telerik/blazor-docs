---
title: Disabling NumericTextBox Arrows at Min or Max Value in Blazor
description: Learn how to programmatically disable the increase or decrease arrows of a NumericTextBox in Blazor when the value reaches its minimum or maximum limit.
type: how-to
page_title: How to Disable NumericTextBox Arrows on Min or Max Value in Blazor
slug: numerictextbox-disable-arrows
tags: numerictextbox, blazor, disable arrows, conditional styling
res_type: kb
ticketid: 1665216
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

When using the NumericTextBox with arrows enabled, I want to disable the down arrow programmatically at the component's minimum value to prevent looping to the maximum value. 

This KB article answers the following questions:

- How can I disable the NumericTextBox increment and decrement buttons based on the value?
- How can I conditionally disable the NumericTextBox arrows when reaching specified value limits?

## Solution

To prevent the increase/decrease arrows of the NumericTextBox from being used when the numeric value reaches its minimum or maximum, apply a conditional CSS class to disable the buttons. 

The example below demonstrates how to conditionally render CSS styles to disable the increase or decrease arrows based on the current value of the NumericTextBox.

````CSHTML
<style>
    .disable-increase .k-spinner-increase,
    .disable-decrease .k-spinner-decrease {
        pointer-events: none;
        opacity: 0.5;
    }
</style>

<TelerikNumericTextBox @bind-Value="@theValue"
                       Min="@minValue"
                       Max="@maxValue"
                       Class="@numericClass"
                       Width="300px">
</TelerikNumericTextBox>

@code {
    private int theValue { get; set; } = 3;
    private int minValue { get; set; } = 1;
    private int maxValue { get; set; } = 10;

    private string numericClass => $"disable-arrows {(theValue == maxValue ? "disable-increase" : "")} {(theValue == minValue ? "disable-decrease" : "")}";
}
````

## See Also

* [NumericTextBox Overview](https://docs.telerik.com/blazor-ui/components/numerictextbox/overview)
* [Override the Theme or Apply Custom CSS Styles]({%slug themes-override%})
