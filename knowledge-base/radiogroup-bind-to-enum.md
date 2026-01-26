---
title: Bind RadioGroup to an Enum
description: Is there a way to bind the Data source for a Blazor UI RadioGroup to an Enum?
type: how-to
page_title: Bind RadioGroup to an Enum
slug: radiogroup-kb-enum-binding
position: 
tags: radiogroup, binding, enum
ticketid: 1557229
res_type: kb
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

Is there a way to bind the data source for a Blazor UI RadioGroup to an enum?

## Solution
To achieve this, prepare a list of items that correspond to the enum values that can be shown to the user. Here is an example:

````RAZOR
<TelerikRadioGroup @bind-Value="@Value" Data="@Subscriptions"></TelerikRadioGroup>

@code {
    private Subscription Value { get; set; }

    public enum Subscription
    {
        Day = 0,
        Week = 1,
        Month = 2,
        Year = 3
    }

    public List<Subscription> Subscriptions
    {
        get
        {
            var subscriptionsAsArray = (Subscription[])Enum.GetValues(typeof(Subscription));
            List<Subscription> subscriptions = new List<Subscription>(subscriptionsAsArray);

            return subscriptions;
        }
    }
}
````