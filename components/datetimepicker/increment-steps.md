---
title: Increment Steps
page_title: DateTimePicker - Increment Steps
description: Steps for changing the value in the DateTimePicker for Blazor.
slug: datetimepicker-steps
tags: telerik,blazor,DateTimePicker,step
published: true
position: 5
---

# Steps

The DateTimePicker for Blazor can display intervals larger than one second or minute, or hour. You could make the step for incrementing or decrementing the values vary for each segment of the date.

The steps you define control the list of options in the dropdown element and the value change from the keyboard when the user presses the Up or Down arrows.

To set the steps for the time picker, use its nested `<DateTimePickerSteps>` tag and its parameters:

* `Year` - every n-th year will be incremented from the keyboard.
* `Month` - every n-th month will be incremented from the keyboard.
* `Day` - every n-th day will be incremented from the keyboard.
* `Hour` - every n-th hour will be available.
* `Minute` - every n-th minute will be available.
* `Second` - every n-th second will be available.

All values default to `1` to provide every possible option. If you set a value larger than the available options in the time portion (such as Minute=70) the tumblers in the dropdown will show the `0` option and the component will increment the date with the designated value (1 hour and 10 minutes in this example).

>caption Chang the steps (intervals) in the date time picker

````CSHTML
@* Show every 4th hour, every 10th minute, every 15th second *@

@selectedDateTime.ToString("yyyy MMM dd, HH:mm:ss tt")

<TelerikDateTimePicker Format="yyyy MMM dd, HH:mm:ss tt" @bind-Value="@selectedDateTime" Width="250px">
    <DateTimePickerSteps Year="10" Month="6" Day="3" Hour="4" Minute="10" Second="15" />
</TelerikDateTimePicker>

@code {
    DateTime selectedDateTime { get; set; } = DateTime.Now;
}
````

>caption Show only every 4th hour, every 10th minute, every 15th second in the time picker

![Intervals (steps) in the date time picker](images/date-time-picker-intevals.png)



## See Also

* [DateTimePicker Overview]({%slug components/datetimepicker/overview%})

