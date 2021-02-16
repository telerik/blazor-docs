---
title: Overview
page_title: Date-Time Picker Overview
description: Overview of the DateTime Picker for Blazor.
slug: components/datetimepicker/overview
tags: telerik,blazor,datetime,picker,datetimepicker,overview
published: True
position: 0
---

# DateTime Picker Overview

The <a href="https://www.telerik.com/blazor-ui/datetimepicker" target="_blank">Blazor DateTime Picker component</a> allows the user to choose both a date and a time from a visual list in a dropdown, or to type it into a [date input]({%slug components/dateinput/overview%}) that can accept only DateTime values. You can control the format shown in the input and respond to [events]({%slug components/datetimepicker/events %}).

#### To use a Telerik DateTime Picker for Blazor, add the `TelerikDateTimePicker` tag.

>caption Basic datetime picker with custom format, min and max

````CSHTML
Selected time: @selectedTime
<br />

<TelerikDateTimePicker Min="@Min" Max="@Max" @bind-Value="@selectedTime"
                       Format="dd MMM yyyy HH:mm:ss" Width="250px"></TelerikDateTimePicker>

@code {
    private DateTime? selectedTime = DateTime.Now;
    public DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    public DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);
}
````

>caption The result of the snippet above and the behavior of the component

![](images/date-time-picker-overview.gif)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikDateTimePicker @ref="@theDateTimePickerRef" @bind-Value="@selectedTime"></TelerikDateTimePicker>

@code  {
    private DateTime? selectedTime = DateTime.Now;
    // the datetime picker is a generic component and its type comes from the value field type
    Telerik.Blazor.Components.TelerikDateTimePicker<DateTime?> theDateTimePickerRef { get; set; }
}
````

The DateTimePicker component exposes the following features:

* `Class` - the custom CSS class rendered on the wrapping element.

* `PopupClass` - additional CSS class to customize the appearance of the DateTimePicker's dropdown.

* `Enabled` - Specifies whether typing in the input and opening the dropdown are allowed.

* `Format` - Specifies the format of the DateInput of the DateTimePicker. Read more in the [Supported Formats]({%slug components/dateinput/supported-formats%}) article.

* `Id` - renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.

* `Min` - The earliest date and time that the user can select.

* `Max` - The latest date and time that the user can select.

* `Value` - The current value of the input. Can be used for binding.

* `Width` - Defines the width of the DateTimePicker.

* `TabIndex` - maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.

* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.



When using the dropdown to edit dates, you must click the "Set" button to commit the date. It is located in the Time portion of the dropdown (you will be navigated to it automatically upon selecting a date). Clicking "Cancel", or outside of the dropdown without clicking "Set", will revert the time to the original value. You can also commit a date by clicking the "NOW" button which will choose the current time.

The time format specifiers in the `Format` control the tumblers available in the dropdown. For example, the `HH` specifier will result in a hour selector in a 24 hour format. If you also add the `tt` specifier, you will also get the AM/PM tumbler, but the 24 hour format will still be used. This means that you can also add several tumblers for the same time portion if the format string repeats them.


## See Also

  * [Live Demo: DateTime Picker](https://demos.telerik.com/blazor-ui/datetimepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Input Date Formats]({%slug components/dateinput/supported-formats%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDateTimePicker-1)
