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

To use a Telerik Date Picker for Blazor:

1. @[template](/_contentTemplates/common/js-interop-file.md#add-blazor-js-file-to-list)

1. add the `TelerikDatePicker` tag

>caption Basic date picker with its key features, and ValueChanged event handling

@[template](/_contentTemplates/common/issues-and-warnings.md#generic-component-event-issue)

````CSHTML
@using Telerik.Blazor.Components.DatePicker

<TelerikDatePicker bind-Value="@datePickerValue" ValueChanged="@ValueChanged"></TelerikDatePicker>

<br />The selected date is: @selectedDate?.ToShortDateString()

@functions  {
    DateTime datePickerValue = DateTime.Now;
    private DateTime? selectedDate;

    protected void ValueChanged(DateTime newValue)
    {
        selectedDate = newValue;
        //you can, alternatively, use the datePickerValue variable because it is bound
    }
}
````

![](images/datepicker-first-look.png)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.DatePicker

<TelerikDatePicker ref="@theDatePicker">
</TelerikDatePicker>

@functions {
	Telerik.Blazor.Components.DatePicker.TelerikDatePicker theDatePicker;
}
````

The Date Picker component exposes the following features:

*  `BottomView` - Defines the bottommost view in the popup calendar to which the user can navigate to. Defaults to `CalendarView.Month`.
* `DisabledDates` - Specifies a list of dates that can not be selected.
* `Enabled` - Specifies whether typing in the input is allowed.
* `Height` - Defines the height of the DatePicker. Defaults to 28.
* `Format` - Specifies the format of the DateInput of the DatePicker. Defaults to `yyyy-MM-dd`.
* `PopupHeight` - Defines the height of the DatePicker's Popup. Defaults to 280;
* `PopupWidth` - Defines the width of the DatePicker's Popup. Defaults to 320.
* `Value` - The current value of the input. Can be used for binding.
* `View` - Specifies the current view that will be displayed in the popup calendar.
* `Width` - Defines the width of the DatePicker. Defaults to 280.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.

The date picker is, essentially, a [date input]({%slug components/dateinput/overview%}) and a [calendar]({%slug components/calendar/overview%}) and the properties it exposes are mapped to the corresponding properties of these two components. You can read more about their behavior in the respective components' documentation.



## See Also

  * [Live Demo: Date Picker](https://demos.telerik.com/blazor/datepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})