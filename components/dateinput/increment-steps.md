---
title: Increment Steps
page_title: DateInput - Increment Steps
description: Steps for changing the value in the DateInput for Blazor.
slug: dateinput-steps
tags: telerik,blazor,DateInput,step
published: true
position: 15
components: ["dateinput"]
---

# Steps

The DateInput for Blazor can increment or decrement the values for each segment of the date with a different step when the Up or Down arrows are pressed.

To set the steps for the date input, use its nested `<DateInputSteps>` tag and its parameters:

* `Year` - every n-th year will be incremented from the keyboard.
* `Month` - every n-th month will be incremented from the keyboard.
* `Day` - every n-th day will be incremented from the keyboard.
* `Hour` - every n-th hour will be incremented from the keyboard.
* `Minute` - every n-th minute will be incremented from the keyboard.
* `Second` - every n-th second will be incremented from the keyboard.

All values default to `1` to provide every possible option. If you set a value larger than the available options in the time portion (such as Minute=70) the tumblers in the dropdown will show the `0` option and the component will increment the date with the designated value (1 hour and 10 minutes in this example).

>caption Change the steps (intervals) in the date input

<demo metaUrl="client/dateinput/increment-steps/"></demo>



## See Also

* [Live Demo: Date Input Incremental Steps](https://demos.telerik.com/blazor-ui/dateinput/incremental-steps)
* [DateInput Overview](slug:components/dateinput/overview)

