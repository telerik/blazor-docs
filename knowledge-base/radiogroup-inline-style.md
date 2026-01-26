---
title: Display RadioGroup Items on One Line
description: How to prevent RadioGroup items breaking on new lines and display them all on a single line.
type: how-to
page_title: Display RadioGroup Items on a Single Line
slug: radiogroup-kb-inline-style
position: 
tags: radiogroup, style, inline
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

How can I add a RadioGroup component on the same line as other elements? By default the RadioGroup breaks on a new line.

## Solution

The RadioGroup renders an `<ul>` element which is block-level by default and falls on a new line. Here is how to override the styling and make the RadioGroup remain on the same line:

1. Set a [CSS Class](slug:radiogroup-overview#radiogroup-parameters) to the RadioGroup.
1. Override the `display: flex` style of the `<ul class="k-radio-list">` element to `inline-flex`.
1. Optionally, apply a `vertical-align` style to line up the component with the other elements next to it.

>caption Inline RadioGroup

````RAZOR
Before RadioGroup ...

<TelerikRadioGroup Data="@RadioItems"
                   Value="@SelectedItem"
                   Layout="RadioGroupLayout.Horizontal"
                   Class="inline-radiogroup" />

... After RadioGroup

<style>
    .k-radio-list.inline-radiogroup {
        display: inline-flex;
        vertical-align: middle;
    }
</style>

@code {
    List<string> RadioItems { get; set; } = new List<string> { "Phone", "Email", "Post" };

    string SelectedItem { get; set; } = "Email";
}
````
