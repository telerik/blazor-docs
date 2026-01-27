---
title: Disabling Text Input and Opening Calendar Popup on Input Click for DatePicker in Blazor
description: Learn how to disable text input and ensure the calendar opens upon clicking the textbox area in the Telerik DatePicker for Blazor.
type: how-to
page_title: How to Disable Text Input and Trigger Calendar Popup on TextBox Click in Telerik DatePicker for Blazor
slug: disable-text-input-enable-calendar-popup-datepicker-blazor
tags: datepicker, blazor, input, calendar, disable, textbox, open, css
res_type: kb
ticketid: 1652620
components: ["general"]
---
## Environment

| Product |
| --- |
| Telerik UI for Blazor |

## Description

I want to disable the text input so that users can only enter dates through the calendar and not by typing in the text box. Additionally, I need the calendar to open when clicking anywhere on the text box, not just the calendar icon.

This KB article also answers the following questions:
- How can I disable typing in the Telerik DatePicker component?
- How do I open the DatePicker calendar by clicking on the textbox area?
- Is it possible to prevent text input in the DatePicker and still use the calendar for date selection?

## Solution

To disable text input in the [DatePicker](https://docs.telerik.com/blazor-ui/components/datepicker/overview) and ensure the calendar opens by clicking on the textbox area, follow these steps:

1. Disable pointer events on the DatePicker input element using CSS to prevent text input.
2. Wrap the `TelerikDatePicker` component in a `span` element and utilize its `onclick` event to call the `Open()` method of the DatePicker for opening the calendar.

````RAZOR
@* The CSS class `.my-datepicker` is used for targeting the specific DatePicker instance.*@

<style>
    .my-datepicker input {
        pointer-events: none;
    }
</style>

<span @onclick="@OpenCalendar">
    <TelerikDatePicker @ref="@DatePickerRef"
                       Class="my-datepicker"
                       Width="294px"
                       @bind-Value="datePickerValue"
                       Format="dd MMMM yyyy"
                       Min="@Min" Max="@Max">
    </TelerikDatePicker>
</span>

@code {
    private TelerikDatePicker<DateTime> DatePickerRef { get; set; }
    private DateTime datePickerValue { get; set; } = DateTime.Now;
    private DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    private DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);

    private void OpenCalendar()
    {
        DatePickerRef.Open();
    }
}
````

## See Also

- [Telerik DatePicker Overview](https://docs.telerik.com/blazor-ui/components/datepicker/overview)
- [Telerik DatePicker Methods](https://docs.telerik.com/blazor-ui/components/datepicker/overview#datepicker-reference-and-methods)
