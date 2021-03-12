---
title: Increment Steps
page_title: Date Picker - Increment Steps
description: Steps for changing the value in the Date Picker for Blazor.
slug: datepicker-steps
tags: telerik,blazor,Datepicker,step
published: true
position: 15
---

# Steps

The Date Picker for Blazor can increment or decrement the values for each segment of the date with a different step when the Up or Down arrows are pressed.

To set the steps for the date input, use its nested `<DatePickerSteps>` tag and its parameters:

* `Year` - every n-th year will be incremented from the keyboard.
* `Month` - every n-th month will be incremented from the keyboard.
* `Day` - every n-th day will be incremented from the keyboard.


All values default to `1` to provide every possible option. If you set a value larger than the available options in the time portion (such as Minute=70) the component will increment the date with the designated value (1 hour and 10 minutes in this example).

>caption Change the steps (intervals) in the date picker

````CSHTML
@selectedDateTime.ToString("yyyy MMM dd, HH:mm:ss tt")

<TelerikDatePicker Format="yyyy MMM dd" @bind-Value="@selectedDate" Width="250px">
    <DatePickerSteps Year="10" Month="6" Day="3" />
</TelerikDateInput>

@code {
    DateTime selectedDate { get; set; } = DateTime.Now;
}
````



## See Also

* [Live Demo: Date Picker Incremental Steps](https://demos.telerik.com/blazor-ui/datepicker/incremental-steps)
* [DatePicker Overview]({%slug components/datepicker/overview%})

