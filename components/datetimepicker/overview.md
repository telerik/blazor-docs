---
title: Overview
page_title: Date-Time Picker Overview
description: Overview of the DateTime Picker for Blazor.
slug: components/datetimepicker/overview
tags: telerik,blazor,datetime,picker,datetimepicker,overview
published: True
position: 0
---

# Blazor DateTime Picker Overview

The <a href="https://www.telerik.com/blazor-ui/datetimepicker" target="_blank">Blazor DateTime Picker component</a> allows the user to choose both a date and a time from a visual list in a dropdown, or to type it into a [date input]({%slug components/dateinput/overview%}) that can accept only DateTime values. You can control the date and time format of the input, and respond to [events]({%slug components/datetimepicker/events %}).

## Creating Blazor DateTimePicker

1. Add the `TelerikDateTimePicker` tag to your razor page.
1. Bind a `DateTime` object to the component
1. Optionally, provide custom `Format`, `Min` and `Max` values

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

## Increment Steps

The DateTime Picker enables the end users to change the selected value by clicking the rendered arrows. You can set the increment and decrement steps through the nested `DateTimePickerSteps` tag and its parameters. [Read more about the Blazor DateTime Picker increment steps...]({%slug datetimepicker-steps%})

## Events

The Blazor DateTime Picker generates events that you can handle and further customize its behavior. [Read more about the Blazor DateTime Picker events...]({%slug components/datetimepicker/events%}).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...]({%slug common-features/input-validation%}).

## Action Buttons

When using the dropdown to edit dates, you must click the "Set" button to commit the date. It is located in the Time portion of the dropdown (you will be navigated to it automatically upon selecting a date). Clicking "Cancel", or outside of the dropdown without clicking "Set", will revert the time to the original value. You can also commit a date by clicking the "NOW" button which will choose the current time.

## Format

The time format specifiers in the `Format` control the tumblers available in the dropdown. For example, the `HH` specifier will result in a hour selector in a 24 hour format. If you also add the `tt` specifier, you will also get the AM/PM tumbler, but the 24 hour format will still be used. This means that you can also add several tumblers for the same time portion if the format string repeats them.

## Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `DebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol and the firing of the internal oninput event.
|`Enabled`| `bool` |Defines if the `DateTimePicker` is enabled|
|`Format`|`string`|The date format that the user input must match. Read more in the [Supported Formats]({%slug components/dateinput/supported-formats%}) article.|
|`Id`|`string`|Maps to the `id` HTML attribute of the `input`|
|`Value`|`T` | expects a `DateTime` object|The value of the `DateTimePicker`|
|`Min`|`DateTime`|The earliest date and time that the user can select|
|`Max`|`DateTime`|The latest date and time that the user can select|
|`TabIndex`|`int?`|maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.|
|`Placeholder`|`string`|maps to the `placeholder` attribute of the HTML element. The `Placeholder` will appear if the component is bound to nullable DateTime object - `DateTime?`, but will not be rendered if the component is bound to the default value of a non-nullable DateTime object. The Placeholder value will be displayed when the input is not focused. Once the user focuses it to start typing, the Format Placeholder (default or [customized one](#format-placeholder)) will override the Placeholder to indicate the format the date should be entered in|
|`ValidateOn`|`ValidationEvent` enum <br/> `ValidationEvent.Input` |`ValidateOn` - configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs)|

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DateTimePicker:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
|`Class`| `string` |The CSS class that will be rendered on the `input` element|
|`PopupClass`|`string`|Additional CSS class to customize the appearance of the DateTimePicker's dropdown|
|`Width`|`string`|The width of the `DateTimePicker`|

You can find more options for customizing the DateTimePicker styling in the [Appearance article]({%slug datetimepicker-appearance%}).

@[template](/_contentTemplates/date-inputs/format-placeholders.md#format-placeholder)

## Component Reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikDateTimePicker @ref="@theDateTimePickerRef" @bind-Value="@selectedTime"></TelerikDateTimePicker>

@code  {
    private DateTime? selectedTime = DateTime.Now;
    // the datetime picker is a generic component and its type comes from the value field type
    Telerik.Blazor.Components.TelerikDateTimePicker<DateTime?> theDateTimePickerRef { get; set; }
}
````

## Next Steps

* [DateTimePicker Events]({%slug components/datetimepicker/events%})


## See Also

  * [Live Demo: DateTime Picker](https://demos.telerik.com/blazor-ui/datetimepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Input Date Formats]({%slug components/dateinput/supported-formats%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDateTimePicker-1)
