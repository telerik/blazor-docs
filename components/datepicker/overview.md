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

1. [Bind the value of the component]({%slug get-started-value-vs-data-binding %}#value-binding) to a collection of the same type as the collection that you bound through the `Data` property.

1. Optionally, create a reference to an instance of the Blazor Date Picker by providing the component's namespace. 

>caption Basic Date Picker with namespace and reference

````CSHTML
The selected date is: @datePickerValue.ToShortDateString()
<br />

<TelerikDatePicker @bind-Value="datePickerValue" @ref="theDatePicker"></TelerikDatePicker>

@code  {
    DateTime datePickerValue { get; set; } = DateTime.Now;

    Telerik.Blazor.Components.TelerikDatePicker<DateTime> theDatePicker;
    // The type of the component depends on the type of the value.
}
````

## Increment Steps

The Date Picker enables the end users to change the selected value by clicking the rendered arrows. You can set the increment and decrement steps through the nested `DatePickerSteps` tag and its parameters. [Read more about the Blazor Date Picker increment steps...]({%slug datepicker-steps%})
## Events

The Blazor Date Picker generates events that you can handle and further customize its behavior. [Read more about the Blazor Button events...]({%slug components/datepicker/events%}).
## Parameters

The Blazor Date Picker provides various parameters that allow you to configure the component:

| Parameter      | Description |
| ----------- | ----------- |
| `BottomView` | Defines the bottommost view in the popup calendar to which the user can navigate to. Defaults to `CalendarView.Month`. |
| `DisabledDates` | Specifies a list of dates that can not be selected. |
| `Enabled` | Specifies whether typing in the input is allowed. |
| `Format` | Specifies the format of the DateInput of the DatePicker. [Read more about supported data formats in Telerik DateInput for Blazor UI]({%slug components/dateinput/supported-formats%}) article. |
| `Id` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input. |
| `Min` | The earliest date that the user can select. |
| `Max` | The latest date that the user can select. |
| `PopupHeight` | Defines the height of the DatePicker's Popup. Defaults to `auto`. |
| `PopupWidth` | Defines the width of the DatePicker's Popup. Defaults to the width of the datepicker input. |
| `Value` | The current value of the input. Can be used for binding. |
| `View` | Specifies the current view that will be displayed in the popup calendar. |
| `TabIndex` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Placeholder` | Accepts `string` value and maps to the `placeholder` attribute of the HTML element. The `Placeholder` will appear if the component is bound to a **nullable** DateTime object - `DateTime?`. It will not be rendered if the component is bound to the default value of a non-nullable DateTime object. The Placeholder value will be displayed when the input is not focused. Once the user focuses it to start typing, the Format Placeholder (default or [customized one](#format-placeholder)) will override the Placeholder to indicate the format the date should be entered in. |
| Validation | See the [Input Validation]({%slug common-features/input-validation%}) article. |
| `ValidateOn` | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs). |

The date picker is, essentially, a [date input]({%slug components/dateinput/overview%}) and a [calendar]({%slug components/calendar/overview%}) and the properties it exposes are mapped to the corresponding properties of these two components. You can read more about their behavior in the respective components' documentation.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Date Picker:

| Parameter      | Description |
| ----------- | ----------- |
| `Class` | The custom CSS class rendered on the wrapping element. |
| `PopupClass` | An additional CSS class to customize the appearance of the Date Picker's dropdown. |
| `PopupHeight` | Defines the height of the DatePicker's Popup. Defaults to `auto`. |
| `PopupWidth` | Defines the width of the DatePicker's Popup. Defaults to `auto`. |
| `Width` | Defines the width of the DatePicker. Defaults to `280px`. |

@[template](/_contentTemplates/date-inputs/format-placeholders.md#format-placeholder)

## Date Picker Reference

Add a reference to the Date Picker instance to use its methods.

## Next Steps

* [Using the Date Picker Events]({%slug components/datepicker/events%})

* [Configuring the Date Picker Increment Steps]({%slug datepicker-steps%})

## See Also

  * [Live Demo: Date Picker](https://demos.telerik.com/blazor-ui/datepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Input Date Formats]({%slug components/dateinput/supported-formats%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDatePicker-1)
