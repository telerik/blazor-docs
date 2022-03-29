---
title: Overview
page_title: Time Picker Overview
description: Overview of the Time Picker for Blazor.
slug: components/timepicker/overview
tags: telerik,blazor,time,picker,timepicker,overview
published: True
position: 0
---

# Blazor Time Picker Overview

The <a href="https://www.telerik.com/blazor-ui/timepicker" target="_blank">Blazor Time Picker component</a> allows the user to choose a time from a visual list in a dropdown, or to type it into a [date input]({%slug components/dateinput/overview%}) that can accept only DateTime values. You can control the format shown in the input and respond to [events]({%slug components/timepicker/events %}).

The Time Picker component supports `DateTime`, `DateTime?`, `DateTimeOffset` and `DateTimeOffset?` types.

## Creating Blazor Time Picker

1. Add the `TelerikTimePicker` tag to your razor page.
1. Bind a `DateTime` object to the component
1. Optionally, provide custom `Format`, `Min` and `Max` values

>caption Basic Time Picker with custom format, min and max

````CSHTML
Selected time: @selectedTime?.ToLongTimeString()
<br />

<TelerikTimePicker Min="@Min" Max="@Max" Format="hh:mm:ss tt" @bind-Value="@selectedTime"></TelerikTimePicker>

@code  {
    private DateTime? selectedTime = DateTime.Now;

    // only the time portions are used
    public DateTime Min = new DateTime(1900, 1, 1, 8, 15, 0);
    public DateTime Max = new DateTime(1900, 1, 1, 19, 30, 45);
}
````

## Increment Steps

The Time Picker enables the end users to change the selected value by clicking the rendered arrows. You can set the increment and decrement steps through the nested `TimePickerSteps` tag and its parameters. [Read more about the Blazor Time Picker increment steps...]({%slug timepicker-steps%})

## Events

The Blazor Time Picker generates events that you can handle and further customize its behavior. [Read more about the Blazor Time Picker events...]({%slug components/timepicker/events%}).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...]({%slug common-features/input-validation%}).

## Action Buttons

When using the dropdown to edit dates, you must click the "Set" button to commit the date. Clicking "Cancel", or outside of the dropdown without clicking "Set", will revert the time to the original value. You can also commit a date by clicking the "NOW" button which will choose the current time.

## Format

The time format specifiers in the `Format` control the tumblers available in the dropdown. For example, the `HH` specifier will result in a hour selector in a 24 hour format. If you also add the `tt` specifier, you will also get the AM/PM tumbler, but the 24 hour format will still be used. This means that you can also add several tumblers for the same time portion if the format string repeats them.

## Min and Max

The `Min` and `Max` properties require a `DateTime` object, but will only use the time portion from it. Thus, the date itself is not important. The hours, minutes, seconds and AM/PM portions control the range of the tumblers in the time picker dropdown. They do not impose validation/limitations on the input editing.

## Parameters

The Blazor Time Picker component provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Enabled` | `bool` | Specifies whether typing in the input and opening the dropdown are allowed.
| `Format` | `string` | Specifies the format of the DateInput of the TimePicker. Read more in the [Supported Formats]({%slug components/dateinput/supported-formats%}) article. Note that format specifiers for non-time portions will only be editable in the input and will not have a representation in the time picker dropdown.
| `Id` | `string` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.
| `Min` | `DateTime` | The earliest time that the user can select.
| `Max` | `DateTime` | The latest time that the user can select.
| `Value` | `T` | The current value of the input. Can be used for binding.
| `TabIndex` | `int?` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.
| `Placeholder` | `string` | Maps to the `placeholder` attribute of the HTML element. The `Placeholder` will appear if the component is bound to **nullable** DateTime object - `DateTime?`, but will not be rendered if the component is bound to the default value of a non-nullable DateTime object. The Placeholder value will be displayed when the input is not focused. Once the user focuses it to start typing, the Format Placeholder (default or [customized one](#format-placeholder)) will override the Placeholder to indicate the format the date should be entered in.
| `ValidateOn` | `ValidationEvent` enum <br/> `ValidationEvent.Input` | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs).


### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Time Picker:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | The custom CSS class rendered on the wrapping element.
| `PopupClass` | `string` | additional CSS class to customize the appearance of the Time Picker's dropdown.
| `Width` | `string` | Defines the width of the TimePicker.

You can find more options for customizing the Time Picker styling in the [Appearance article]({%slug timepicker-appearance%}).

@[template](/_contentTemplates/date-inputs/format-placeholders.md#format-placeholder)

## Component Reference

Add a reference to the Time Picker instance to use its methods.

````CSHTML
@using Telerik.Blazor.Components

<TelerikTimePicker @bind-Value="@theTimePickerValue"></TelerikTimePicker>
@theTimePickerValue

@code {
    DateTime? theTimePickerValue { get; set; }
    
    // the time picker is a generic component and its type comes from the value field type
    Telerik.Blazor.Components.TelerikTimePicker<DateTime?> theTimePicker;
}
````

## Next Steps

* [Using the Time Picker Events]({%slug components/timepicker/events%})

* [Configuring the Time Picker Increment Steps]({%slug timepicker-steps%})

## See Also

  * [Live Demo: Time Picker](https://demos.telerik.com/blazor-ui/timepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Input Date Formats]({%slug components/dateinput/supported-formats%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTimePicker-1)
