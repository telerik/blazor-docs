---
title: Aligning DateRangePicker Inputs Vertically
description: Learn how to modify the layout of the DateRangePicker in Blazor to display its inputs vertically using custom CSS.
type: how-to
page_title: How to Display DateRangePicker Inputs Vertically
slug: date-range-picker-vertical-input-alignment
tags: datarangepicker, blazor, css, customization, layout
res_type: kb
ticketid: 1656293
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>DateRangePicker for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to place the inputs of the DateRangePicker vertically. How to achieve that? 
Is it possible to adjust the DateRangePicker so the inputs appear on two lines, one on top of each other?

This KB article also answers the following questions:
- How to change the layout of DateRangePicker inputs in Blazor?
- Can I display DateRangePicker inputs vertically in Blazor?
- Is there a way to align DateRangePicker inputs on top of each other in Blazor?

## Solution

To align the inputs of the DateRangePicker vertically, apply custom CSS to adjust the component's layout. Follow these steps:

1. Add a custom CSS class to the DateRangePicker through the `Class` parameter.
2. Use the custom class to target the wrapping element of the DateRangePicker and apply the necessary styles.
3. (Optional) Adjust the popup calendar orientation if needed.

Here is an example implementation:

```CSHTML
<style>
    .vertical-picker {
        flex-direction: column;
        align-items: baseline;
        width: 140px;
    }
</style>

<TelerikDateRangePicker @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        Class="vertical-picker" 
                        Orientation="CalendarOrientation.Vertical">
</TelerikDateRangePicker>

@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
}
```

This CSS ensures that the labels and inputs of the DateRangePicker are displayed vertically. Adjust the styles as needed to fit your design requirements better. Additionally, consider [repositioning the labels so they appear on the side and not on top of the inputs]({%slug daterangepicker-kb-reposition-labels%}).

## See Also

- [Repositioning Labels in DateRangePicker](https://docs.telerik.com/blazor-ui/knowledge-base/daterangepicker-reposition-labels)
- [DateRangePicker Overview](https://docs.telerik.com/blazor-ui/components/daterangepicker/overview)
