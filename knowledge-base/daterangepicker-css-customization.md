---
title: How to Customize the DateRangePicker
description: Learn how to enhance the Blazor DateRangePicker by customizing its styling, disabling weekends, reducing the width of DateInputs, preventing horizontal expansion, hiding Start and End labels, and making the component more compact for better user experience and design consistency in your application.
type: how-to
page_title: How to Customize the DateRangePicker
slug: daterangepicker-kb-css-customization
tags: daterangepicker, styling
ticketid: 1633582
res_type: kb
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

* How to customize the styling of the Blazor DateRangePicker?
* How to disable the weekends in the DateRangePicker component?
* How to reduce the width of the two DateInputs?
* How to prevent horizontal expansion of the DateRangePicker?
* How to hide the Start and End labels of the DateRangePicker?
* How to make the DateRangePicker more compact?

## Solution

1. Use a `Class` parameter and custom CSS to override the theme and hide the labels (`.k-floating-label`). Note that using `display: none`, violates the accessibility compliance. Instead, use `font-size: 0`, for example.
2. Override the default width of `10em` of the two DateInputs (`.k-dateinput`).
3. Change the display of the element to inline by using `display:inline-flex` to prevent the horizontal expansion of the component.
4. Set the `padding-top: 0` of the `.k-floating-label-container` to remove reserved space and make the DateRangePicker more compact.

>caption Customized Blazor DateRangePicker

````RAZOR
<span style="display:inline-block;border: 1px solid red;">
    <TelerikDateRangePicker @bind-StartValue="@StartValue"
                            @bind-EndValue="@EndValue"
                            Format="yyyy-MM-dd"
                            Min="@Min" Max="@Max"
                            Class="no-labels smaller-width"
                            PopupClass="no-weekends">
    </TelerikDateRangePicker>
</span>

<style>
    /* remove reserved space for labels */
    .no-labels .k-floating-label-container {
        padding-top: 0;
    }

    /* hide labels */
    .no-labels .k-floating-label {
        font-size: 0;
        color: transparent;
    }

    /* prevent horizontal expansion */
    span.smaller-width {
        display: inline-flex;
        width: min-content;
    }

        /* reduce textbox width */
        span.smaller-width .k-dateinput {
            width: 7em;
        }

    /* make weekends disabled */
    .no-weekends .k-calendar-td[title*="Saturday"],
    .no-weekends .k-calendar-td[title*="Sunday"] {
        color: #424242;
        opacity: .6;
        pointer-events: none;
    }

</style>

@code {
    private DateTime? StartValue { get; set; }
    private DateTime? EndValue { get; set; }

    private DateTime Min = DateTime.Today.AddYears(-200);
    private DateTime Max = DateTime.Today.AddYears(100);
}
````

## See Also

* [DateRangePicker Overview](slug://daterangepicker-overview)