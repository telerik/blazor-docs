---
title: Align DateRangePicker Inputs Vertically
description: Learn how to modify the layout of the DateRangePicker in Blazor to display its inputs vertically using custom CSS.
type: how-to
page_title: How to Display DateRangePicker Inputs Vertically
slug: daterangepicker-kb-vertical-input-alignment
tags: datarangepicker, blazor, css, layout, vertical, align
res_type: kb
ticketid: 1656293
components: ["daterangepicker"]
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

This KB article answers the following questions:
- How to change the layout of DateRangePicker inputs in Blazor, so they appear vertically oriented?
- Can I display DateRangePicker inputs vertically in Blazor?
- Is there a way to adjust the DateRangePicker so the inputs appear on two lines, one on top of each other?

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
    private DateTime? StartValue { get; set; } = DateTime.Today;
    private DateTime? EndValue { get; set; } = DateTime.Today.AddDays(10);
}
```

This CSS ensures that the labels and inputs of the DateRangePicker display one below the other. Adjust the styles as needed to fit your design requirements better. Additionally, consider [repositioning the labels so they appear on the side and not on top of the inputs](slug:daterangepicker-kb-reposition-labels).

## See Also

- [Repositioning Labels in DateRangePicker](https://docs.telerik.com/blazor-ui/knowledge-base/daterangepicker-reposition-labels)
- [DateRangePicker Overview](https://docs.telerik.com/blazor-ui/components/daterangepicker/overview)
