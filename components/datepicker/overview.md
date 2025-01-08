---
title: Overview
page_title: DatePicker Overview
description: The Blazor DatePicker enables easy date selection in web applications with an interactive date input interface.
slug: components/datepicker/overview
tags: telerik,blazor,date,picker,datepicker,overview
published: True
position: 0
---

# Blazor DatePicker Overview

The <a href="https://www.telerik.com/blazor-ui/datepicker" target="_blank">Blazor Date Picker component</a> allows the user to choose a date from a visual Gregorian [Telerik UI for Blazor Calendar](slug://components/calendar/overview) or type it into a [date input](slug://components/dateinput/overview) that can accept only dates. You can control the date format of the input, how the user navigates through the calendar, and which dates the user cannot select.


## Creating Blazor Date Picker

1. Use the `TelerikDatePicker` tag to add the component to your Razor page.
1. Bind a `DateTime` or `DateTime?` object to the component `Value` parameter.
1. (optional) Set the `Format`, `Min`, `Max`, and `Width` parameters.

>caption Basic Date Picker with custom format, min and max

````RAZOR
<p> The DatePicker Value is: @DatePickerValue.ToShortDateString() </p>

<TelerikDatePicker @bind-Value="DatePickerValue"
                   Format="dd MMMM yyyy"
                   Min="@MinDate"
                   Max="@MaxDate"
                   Width="200px">
</TelerikDatePicker>

@code {
    private DateTime DatePickerValue { get; set; } = DateTime.Today;

    private DateTime MinDate = DateTime.Today.AddMonths(-1);

    private DateTime MaxDate = DateTime.Today.AddMonths(1);
}
````

## Date Input Typing Settings

The Blazor DatePicker
@[template](/_contentTemplates/date-inputs/general.md#dateinput-typing-settings)
DatePicker.

## Increment Steps

The Date Picker enables the end users to change the selected value by clicking the rendered arrows. You can set the increment and decrement steps through the nested `DatePickerSteps` tag and its parameters. [Read more about the Blazor Date Picker increment steps...](slug://datepicker-steps)

## Events

The Blazor Date Picker generates events that you can handle and further customize its behavior. [Read more about the Blazor Date Picker events...](slug://components/datepicker/events).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...](slug://common-features/input-validation).

## Header Template

The Blazor DatePicker allows you to customize the rendering of the Calendar popup header. Learn more from the [Header Template article](slug://datepicker-header-template).

## Adaptive Rendering

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## Date Picker Parameters

The Blazor Date Picker provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|---|---|---|
| `AdaptiveMode` | `AdaptiveMode` enum <br /> (`None`) | The [adaptive mode](slug://adaptive-rendering) of the component. |
| `AutoComplete` | `string` <br /> (`"off"`) | The `autocomplete` HTML attribute of the `input`. |
| `BottomView` | ` CalendarView` enum <br/> (`Month`) | Defines the bottommost view in the popup calendar to which the user can navigate to. |
| `DebounceDelay` | `int` <br/> (`150`) | Time in milliseconds between the last typed symbol and the value update. Use it to balance between client-side performance and number of database queries. |
| `DisabledDates` | `List<DateTime>` | A list of dates that cannot be selected. |
| `Enabled` | `bool` | Specifies whether typing in the input and clicking the button is allowed. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `Format` | `string` <br /> (`ShortDatePattern`) | The format of the DatePicker's DateInput. The default value depends on `CultureInfo.CurrentCulture`. Read more at [Supported date formats by the DateInput](slug://components/dateinput/supported-formats). |
| `Id` | `string` | The `id` attribute on the `<input />` element. Use it to attach a `<label for="">` to the input. |
| `Max` | `DateTime` <br /> (`DateTime(2099, 12, 31, 23, 59, 59)`)| The latest date that the user can select. |
| `Min` | `DateTime` <br /> (`DateTime(1900, 1, 1, 0, 0, 0)`)| The earliest date that the user can select. |
| `Placeholder` | `string` | Maps to the `placeholder` attribute of the HTML element. The `Placeholder` will appear if the component is bound to a **nullable** DateTime object - `DateTime?`. It will not be rendered if the component is bound to the default value of a non-nullable DateTime object. The Placeholder value will be displayed when the input is not focused. Once the user focuses it to start typing, the Format Placeholder (default or [customized one](#format-placeholder)) will override the Placeholder to indicate the format the date should be entered in. |
| `ShowClearButton` | `bool` | Defines if the user can clear the component value through an **x** button rendered inside the input. |
| `ShowWeekNumbers` | `bool` | Sets if the popup Calendar will display week numbers according to the [ISO-8601 format](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.isoweek.getweekofyear). Note that the [ISO week number may differ from the conventional .NET week number](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.calendar.getweekofyear). |
| `ShowOtherMonthDays` | `bool` <br /> (`true`) | Defines whether the leading and trailing days from other months in the Calendar popup are visible in the current month view. |
| `TabIndex` | `int?` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Title` | `string` | The title text rendered in the header of the popup(action sheet). Applicable only when [`AdaptiveMode` is set to `Auto`](slug://adaptive-rendering). |
| `ValidateOn` |`ValidationEvent` enum <br/> (`Input`) | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs](slug://common-features/input-validation#validation-modes-for-simple-inputs). |
| `Value` | `DateTime` or `DateTime?` | The current value of the component. Supports two-way binding. |
| `View` | ` CalendarView` enum <br/> (`Month`) | The current view that will be displayed in the popup calendar. |

The Date Picker is, essentially, a [DateInput](slug://components/dateinput/overview) and a [Calendar](slug://components/calendar/overview) and the properties it exposes are mapped to the corresponding properties of these two components. You can read more about their behavior in the respective components' documentation.

@[template](/_contentTemplates/date-inputs/general.md#typing-parameters)

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DatePicker:

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | The custom CSS class rendered on the wrapping element. |
| `PopupClass` | `string` | An additional CSS class to customize the appearance of the Date Picker's dropdown.|
| `PopupHeight` | `string` | Defines the height of the DatePicker's Popup. Defaults to `auto`. |
| `PopupWidth` | `string` | Defines the width of the DatePicker's Popup. Defaults to `auto`. |
| `Width` | `string` | Defines the width of the DatePicker. Defaults to `280px`. |

You can find more options for customizing the Date Picker styling in the [Appearance article](slug://datepicker-appearance).

@[template](/_contentTemplates/date-inputs/general.md#format-placeholder)

## DatePicker Reference and Methods

Add a reference to the component instance to use the [Date Picker's methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikDatePicker-1).

| Method | Description |
| --- | --- |
| `Close` | Closes the Calendar popup. |
| `FocusAsync` | Focuses the Date Picker textbox. Always `await` this call, as it relies on `JSInterop`. @[template](/_contentTemplates/common/inputs.md#focus-kb) |
| `NavigateTo` | Navigates to a specified date and view. The method expects a `DateTime` and `CalendarView` arguments. |
| `Open` | Opens the Calendar popup. |
| `Refresh` | Re-renders the Calendar popup. |

>caption Using Blazor DatePicker methods

````RAZOR
<TelerikDatePicker @ref="@DatePickerRef"
                   @bind-Value="@DatePickerValue"
                   Width="200px" />

<TelerikButton OnClick="@FocusPicker">Focus DatePicker</TelerikButton>
<TelerikButton OnClick="@OpenPicker">Open DatePicker Calendar</TelerikButton>

@code {
    // the component type depends on the value type
    private TelerikDatePicker<DateTime> DatePickerRef { get; set; }

    private DateTime DatePickerValue { get; set; } = DateTime.Now;

    private async Task FocusPicker()
    {
        await DatePickerRef.FocusAsync();
    }

    private void OpenPicker()
    {
        DatePickerRef.Open();
    }
}
````

## Next Steps

* [Using the Date Picker Events](slug://components/datepicker/events)

* [Configuring the Date Picker Increment Steps](slug://datepicker-steps)

## See Also

* [Live Demo: Date Picker](https://demos.telerik.com/blazor-ui/datepicker/overview)
* [Input Validation](slug://common-features/input-validation)
* [Supported Input Date Formats](slug://components/dateinput/supported-formats)
* [DatePicker API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikDatePicker-1)
