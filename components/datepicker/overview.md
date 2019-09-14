---
title: Overview
page_title: Date Picker for Blazor Overview
description: Overview of the Date Picker for Blazor
slug: components/datepicker/overview
tags: telerik,blazor,date,picker,datepicker,overview
published: True
position: 0
---

# Date Picker Overview

The Date Picker component allows the user to choose a date from a visual list ([calendar]({%slug components/calendar/overview%})) or to type it into a [date input]({%slug components/dateinput/overview%}) that can accept only dates. You can control the format shown in the input, how the user navigates through the calendar, and dates the user cannot select.

To use a Telerik Date Picker for Blazor, add the `TelerikDatePicker` tag.

>caption Basic date picker with namespace and reference

````CSHTML
The selected date is: @datePickerValue.ToShortDateString()
<br />

<TelerikDatePicker @bind-Value="datePickerValue" @ref="theDatePicker"></TelerikDatePicker>

@code  {
    DateTime datePickerValue { get; set; } = DateTime.Now;

    Telerik.Blazor.Components.TelerikDatePicker<DateTime> theDatePicker;
    // the type of the component depends on the type of the value
    // in this case it is DateTime, but it could be DateTime?
}
````

![](images/datepicker-first-look.png)


The Date Picker component exposes the following features:

*  `BottomView` - Defines the bottommost view in the popup calendar to which the user can navigate to. Defaults to `CalendarView.Month`.
* `DisabledDates` - Specifies a list of dates that can not be selected.
* `Enabled` - Specifies whether typing in the input is allowed.
* `Format` - Specifies the format of the DateInput of the DatePicker. Defaults to `yyyy-MM-dd`. Read more in the [Supported Formats]({%slug components/dateinput/supported-formats%}) article.
* `PopupHeight` - Defines the height of the DatePicker's Popup. Defaults to `280px`.
* `PopupWidth` - Defines the width of the DatePicker's Popup. Defaults to `320px`.
* `Value` - The current value of the input. Can be used for binding.
* `View` - Specifies the current view that will be displayed in the popup calendar.
* `Width` - Defines the width of the DatePicker. Defaults to `280px`.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.

The date picker is, essentially, a [date input]({%slug components/dateinput/overview%}) and a [calendar]({%slug components/calendar/overview%}) and the properties it exposes are mapped to the corresponding properties of these two components. You can read more about their behavior in the respective components' documentation.



## See Also

  * [Live Demo: Date Picker](https://demos.telerik.com/blazor-ui/datepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Input Date Formats]({%slug components/dateinput/supported-formats%})
