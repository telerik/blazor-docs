---
title: Add Multiple Labels in a Blazor ProgressBar
description: Learn how to display two or more labels in a ProgressBar for Blazor.
type: how-to
page_title: How to Add Multiple Labels in a Blazor ProgressBar
slug: progressbar-kb-add-multiple-labels
tags: progressbar, blazor, label, template, css
res_type: kb
ticketid: 1659413
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ProgressBar for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to display two labels on my ProgressBar component: one on the left side to show the current progress and another on the right side for the remaining value. 

This KB article also answers the following questions:

- How can I customize the label inside a ProgressBar in Blazor?
- Is it possible to display two or more labels in a ProgressBar?
- How do I use the label template feature in the ProgressBar for Blazor?

## Solution

To display two or more labels in a [ProgressBar](slug:progressbar-overview) for Blazor, use the [Label Template](slug:progressbar-label#template):
1. Declare the `Template` inside the `ProgressBarLabel` label tag.
1. Add your desired labels in separate HTML containers.
1. Use CSS to position them based on your preferences.

The code snippet below creates a ProgressBar with a custom label that includes two spans: one for the current value and another for the remaining value. The labels are positioned on the left and right sides of the ProgressBar, respectively, using CSS Flexbox for layout.

````RAZOR
<TelerikProgressBar Value="@PBValue"
                    Max="@MaxValue" 
                    Class="two-labels-progressbar">
    <ProgressBarLabel Visible="true" Position="@ProgressBarLabelPosition.Center">
        <Template>
            <div class="label-container">
                <span>Current value: @(context.Value)%</span>
                <span>Remaining: @(MaxValue - context.Value)%</span>
            </div>
        </Template>
    </ProgressBarLabel>
</TelerikProgressBar>

<style>
    .two-labels-progressbar {
        width: 700px;
    }

        .two-labels-progressbar .label-container {
            width: 680px;
            display: flex;
            justify-content: space-between;
        }
</style>

@code {
    private double MaxValue { get; set; } = 50;
    private double PBValue { get; set; } = 10;
}
````

## See Also

* [ProgressBar Label Documentation](slug:progressbar-label)
