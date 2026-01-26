---
title: Readonly RadioGroup
description: Learn how to make the Telerik RadioGroup for Blazor readonly without graying out the text.
type: how-to
page_title: How to Customize Telerik RadioGroup for Blazor to Be Readonly Without Graying Out
meta_title: How to Customize Telerik RadioGroup for Blazor to Be Readonly Without Graying Out
slug: radiogroup-kb-readonly
tags: radiogroup, blazor, readonly
res_type: kb
ticketid: 1690650
components: ["radiogroup"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>RadioGroup for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to make the [RadioGroup](slug:radiogroup-overview) readonly but keep the text visually clear (not grayed out). Using the `Enabled` property disables the input entirely but also makes the text and radio buttons gray, which reduces readability.

## Solution

To make the TelerikRadioGroup readonly without graying out the text, use the following CSS approach:

````Razor
<style>
    .k-radio-list li .k-radio-wrap {
        pointer-events: none; /* Prevents mouse interactions */
        opacity: 0.5; /* Makes it look visually disabled */
        cursor: not-allowed;
    }

    .k-radio-list li label {
        pointer-events: none; /* Prevents mouse interactions */
        cursor: not-allowed;
    }
</style>

Chosen delivery method: @(ChosenDeliveryMethod == 0 ? "no selection yet" : ChosenDeliveryMethod.ToString())
<br />

<TelerikRadioGroup Data="@DeliveryOptions"
                   @bind-Value="@ChosenDeliveryMethod"
                   ValueField="@nameof(DeliveryMethodModel.MethodId)"
                   TextField="@nameof(DeliveryMethodModel.MethodText)">
</TelerikRadioGroup>

@code {
    private int ChosenDeliveryMethod { get; set; }

    private List<DeliveryMethodModel> DeliveryOptions { get; set; } = new List<DeliveryMethodModel>
    {
        new DeliveryMethodModel { MethodId = 1, MethodText = "Standard Shipping" },
        new DeliveryMethodModel { MethodId = 2, MethodText = "Express Shipping" },
        new DeliveryMethodModel { MethodId = 3, MethodText = "In-Store Pickup" },
        new DeliveryMethodModel { MethodId = 4, MethodText = "Curbside Pickup" },
    };

    public class DeliveryMethodModel
    {
        public int MethodId { get; set; }
        public string MethodText { get; set; }
    }
}
````

## See Also

* [RadioGroup Documentation](slug:radiogroup-overview)
* [CSS pointer-events Property](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
* [RadioGroup Binding](slug:radiogroup-databind)
