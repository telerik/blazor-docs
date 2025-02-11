---
title: Disable NumericTextBox Arrows at Min or Max Value in Blazor
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

In a NumericTextBox with enabled arrows, I want to disable the down arrow programmatically at the component's minimum value to prevent looping to the maximum value. 

This KB article answers the following questions:

- How can I disable the NumericTextBox increment and decrement buttons based on the value?
- How can I conditionally disable the NumericTextBox arrows when reaching specified value limits?

## Solution

To prevent your end users from looping through the minimum and maximum values with the icnrease/decrease arrows of the NumericTextBox, apply a conditional CSS class to disable the buttons. 

The example below demonstrates how to conditionally render CSS styles to disable the increase or decrease arrows based on the current value of the NumericTextBox.

>caption The Min and Max values should not match the default minimum and maximum values of the Value type.

````RAZOR
<style>
    .disable-increase .k-spinner-increase,
    .disable-decrease .k-spinner-decrease {
        pointer-events: none;
        opacity: 0.5;
    }
</style>

<TelerikNumericTextBox @bind-Value="@NumericValue"
                       Min="@MinValue"
                       Max="@MaxValue"
                       Class="@NumericClass"
                       Width="300px">
</TelerikNumericTextBox>

@code {
    private int NumericValue { get; set; } = 3;
    private int MinValue { get; set; } = 1;
    private int MaxValue { get; set; } = 10;

    private string NumericClass => $"{(NumericValue == MaxValue ? "disable-increase" : "")} {(NumericValue == MinValue ? "disable-decrease" : "")}";
}
````

## See Also

* [NumericTextBox Overview](https://docs.telerik.com/blazor-ui/components/numerictextbox/overview)
* [Override the Theme or Apply Custom CSS Styles](slug:themes-override)
