---
title: Overview
page_title: Date Picker Overview
description: Learn more about the Date Picker component for Blazor by checking the examples and its key features.
slug: components/datepicker/overview
tags: telerik,blazor,date,picker,datepicker,overview
published: True
position: 0
---

# Blazor Date Picker Overview

The <a href="https://www.telerik.com/blazor-ui/datepicker" target="_blank">Blazor Date Picker component</a> allows the user to choose a date from a visual Gregorian [calendar]({%slug components/calendar/overview%}) or type it into a [date input]({%slug components/dateinput/overview%}) that can accept only dates. You can control the date format of the input, how the user navigates through the calendar, and which dates the user cannot select.


## Creating Blazor Date Picker

1. Use the `TelerikDatePicker` tag to add the component to your razor page.

1. Bind a `DateTime` object to the component

1. Optionally, provide custom `Format`, `Min` and `Max` values 

>caption Basic Date Picker with custom format, min and max

````CSHTML
The selected date is: @datePickerValue.ToShortDateString()
<br />

<TelerikDatePicker @bind-Value="datePickerValue"
                   Format="dd MMMM yyyy"
                   Min="@Min" Max="@Max">
</TelerikDatePicker>

@code {
    DateTime datePickerValue { get; set; } = DateTime.Now;
    public DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    public DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);
}
````

## Increment Steps

The Date Picker enables the end users to change the selected value by clicking the rendered arrows. You can set the increment and decrement steps through the nested `DatePickerSteps` tag and its parameters. [Read more about the Blazor Date Picker increment steps...]({%slug datepicker-steps%})

## Events

The Blazor Date Picker generates events that you can handle and further customize its behavior. [Read more about the Blazor Date Picker events...]({%slug components/datepicker/events%}).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...]({%slug common-features/input-validation%}).

## Parameters

The Blazor Date Picker provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `BottomView` | ` CalendarView` <br/> `CalendarView.Month` | Defines the bottommost view in the popup calendar to which the user can navigate to. |
| `DisabledDates` | `List<DateTime>` | Specifies a list of dates that can not be selected. |
| `Enabled` | `bool` | Specifies whether typing in the input is allowed. |
| `Format` | `string` | Specifies the format of the DateInput of the DatePicker. [Read more about supported data formats in Telerik DateInput for Blazor UI]({%slug components/dateinput/supported-formats%}) article. |
| `Id` | `string`| Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input. |
| `Min` | `DateTime` | The earliest date that the user can select. |
| `Max` | `DateTime`| The latest date that the user can select. |
| `Value` | `T` | The current value of the input. Can be used for binding. |
| `View` | ` CalendarView` | Specifies the current view that will be displayed in the popup calendar. |
| `TabIndex` | `int?` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Placeholder` | `string` | Maps to the `placeholder` attribute of the HTML element. The `Placeholder` will appear if the component is bound to a **nullable** DateTime object - `DateTime?`. It will not be rendered if the component is bound to the default value of a non-nullable DateTime object. The Placeholder value will be displayed when the input is not focused. Once the user focuses it to start typing, the Format Placeholder (default or [customized one](#format-placeholder)) will override the Placeholder to indicate the format the date should be entered in. |
| `ValidateOn` |`ValidationEvent` enum <br/> `ValidationEvent.Input` | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs). |

The date picker is, essentially, a [date input]({%slug components/dateinput/overview%}) and a [calendar]({%slug components/calendar/overview%}) and the properties it exposes are mapped to the corresponding properties of these two components. You can read more about their behavior in the respective components' documentation.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Date Picker:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | The custom CSS class rendered on the wrapping element. |
| `PopupClass` | `string` | An additional CSS class to customize the appearance of the Date Picker's dropdown.|
| `PopupHeight` | `string` | Defines the height of the DatePicker's Popup. Defaults to `auto`. |
| `PopupWidth` | `string` | Defines the width of the DatePicker's Popup. Defaults to `auto`. |
| `Width` | `string` | Defines the width of the DatePicker. Defaults to `280px`. |

You can find more options for customizing the Date Picker styling in the [Appearance article]({%slug datepicker-appearance%}).

@[template](/_contentTemplates/date-inputs/format-placeholders.md#format-placeholder)

## Component Reference

Add a reference to the Date Picker instance to use its methods.

````CSHTML
@using Telerik.Blazor.Components

<TelerikDatePicker @ref="theDatePicker" @bind-Value="datePickerValue"></TelerikDatePicker>

@code  {
    DateTime datePickerValue { get; set; } = DateTime.Now;

    Telerik.Blazor.Components.TelerikDatePicker<DateTime> theDatePicker;
    // The type of the component depends on the type of the value.
}
````

## Next Steps

* [Using the Date Picker Events]({%slug components/datepicker/events%})

* [Configuring the Date Picker Increment Steps]({%slug datepicker-steps%})

## See Also

  * [Live Demo: Date Picker](https://demos.telerik.com/blazor-ui/datepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Input Date Formats]({%slug components/dateinput/supported-formats%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDatePicker-1)
