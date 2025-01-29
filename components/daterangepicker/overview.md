---
title: Overview
page_title: DateRange Picker Overview
description: Overview of the Date Range Picker for Blazor.
slug: daterangepicker-overview
tags: telerik,blazor,date,range,picker,daterangepicker,overview
published: True
position: 0
---

# Blazor DateRange Picker Component Overview

The <a href="https://www.telerik.com/blazor-ui/daterange-picker" target="_blank">Blazor DateRange Picker component</a> allows the user to select a date range (start and end date) - both from a visual list ([Telerik UI for Blazor Calendar](slug://components/calendar/overview)) or to type it into a [date input](slug://components/dateinput/overview) that can accept only dates. You can control the format shown in the input, and dates the user cannot select, as well as implement validation and respond to events.

## Creating Blazor Date Range Picker

1. Use the `TelerikDateRangePicker` tag to add the component to your razor page.
1. Bind its `StartValue` and `EndValue` parameters to `DateTime` objects.
1. (optional) Provide custom `Format`, `Min` and `Max` values.
1. (optional) Set the `AllowReverse` parameter and define if the range is valid and highlighed when the end date preceeds the start date.


>caption Basic Date Range Picker with custom format, min and max and reverse range

````RAZOR
@StartValue?.ToString("dd MMM yyyy")
<br />
@EndValue?.ToString("dd MMM yyyy")
<br />
<TelerikDateRangePicker @bind-StartValue="@StartValue"
                        @bind-EndValue="@EndValue"
                        Format="dd MMMM yyyy"
                        Min="@Min" Max="@Max"
                        AllowReverse="true">
</TelerikDateRangePicker>

@code {
    public DateTime? StartValue { get; set; } = DateTime.Now;
    public DateTime? EndValue { get; set; } = DateTime.Now.AddDays(10);
    public DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    public DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);
}
````

## Date Input Typing Settings

The DateRangePicker
@[template](/_contentTemplates/date-inputs/general.md#dateinput-typing-settings)
DateRangePicker.

## Events

The Blazor Date Range Picker generates events that you can handle and further customize its behavior. [Read more about the Blazor Date Range Picker events...](slug://daterangepicker-events ).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...](slug://common-features/input-validation).

By default, a valid date range is when the start date is before the end date. When a valid range is selected the Calendar popup closes. To set a range where the start date is after the end date as valid you can use the [`AllowReverse` parameter](#daterangepicker-parameters). When you set `AllowReverse` to `true` the Calendar popup closes on each date selection.

## Header Template

The DateRangePicker allows you to customize the rendering of the Calendar popup header. Learn more from the [Header Template article](slug://daterangepicker-header-template).

## Adaptive Rendering

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## DateRangePicker Parameters

The Blazor Date Range Picker provides various parameters that allow you to configure the component. Also check the [DateRangePicker's public API](slug://Telerik.Blazor.Components.TelerikDateRangePicker-1).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `AdaptiveMode` | `AdaptiveMode` <br /> (`None`) | The [adaptive mode](slug://adaptive-rendering) of the component. |
| `AllowReverse` | `bool` | Defines if the range is valid when the selected end date is a date before the start date. |
| `BottomView` | ` CalendarView` enum <br/> (`Month`) | Defines the bottommost view in the popup calendar to which the user can navigate to. |
| `DebounceDelay` | `int` <br/> (`150`) | Time in milliseconds between the last typed symbol and the value update. Use it to balance between client-side performance and number of database queries. |
| `DisabledDates` | `List<DateTime>` | A list of dates that can not be selected as the start or end of the range. See the <a href="https://demos.telerik.com/blazor-ui/daterangepicker/disabled-dates" target="_blank">Live Demo: Date Range Picker Disabled Dates</a>. |
| `Enabled` | `bool` | Whether typing in the inputs is allowed. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `EndId` and `StartId` | `string` | The `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input. |
| `Format` | `string` <br /> (`ShortDatePattern`) | The format of the DateRangePicker DateInputs. The default value depends on `CultureInfo.CurrentCulture`. Read more at [Supported date formats by the DateInput](slug://components/dateinput/supported-formats). |
| `Max` | `DateTime`  <br /> (`DateTime(2099, 12, 31)`) | The latest date that the user can select. |
| `Min` | `DateTime`  <br /> (`DateTime(1900, 1, 1)`)| The earliest date that the user can select. |
| `InputMode` | `string` | The [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the `<input />` element. |
| `Orientation` | `CalendarOrientation`enum <br /> (`Horizontal`) | The orientation of the calendar popup. The available options are `Horizontal` and `Vertical`. |
| `Placeholder` |`string` | The `placeholder` attribute of the two `<input />` elements. The `Placeholder` will appear if the component is bound to **nullable** DateTime objects - `DateTime?`, but will not be rendered if the component is bound to the default value of a non-nullable DateTime objects. The Placeholder value will be displayed when the input is not focused. Once the user focuses it to start typing, the Format Placeholder (default or [customized one](#format-placeholder)) will override the Placeholder to indicate the format the date should be entered in. |
| `ShowClearButton` | `bool` | Defines if the user can clear the component value through an **x** button rendered inside the input. |
| `ShowWeekNumbers` | `bool` | Sets if the popup Calendars will display week numbers according to the [ISO-8601 format](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.isoweek.getweekofyear). Note that the [ISO week number may differ from the conventional .NET week number](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.calendar.getweekofyear). |
| `ShowOtherMonthDays` | `bool` | Defines whether the leading and trailing days from other months in the Calendar popup are visible in the current month view. |
| `StartValue` and `EndValue` | `T` | The current values of the inputs for start and end of the range. Can be used for two-way binding. |
| `TabIndex` | `int?` | The `tabindex` attribute of both `input` HTML elements in the component. They both will have the same `tabindex`. Use it to customize the tabbing (focus) order of the inputs on your page. |
| `Title` | `string` | The title text rendered in the header of the popup(action sheet). Applicable only when [`AdaptiveMode` is set to `Auto`](slug://adaptive-rendering). |
| `View` | ` CalendarView` enum <br/> (`Month`) | The current view that will be displayed in the popup calendar. |

The date range picker is, essentially, two [DateInputs](slug://components/dateinput/overview) and a [Calendar](slug://components/calendar/overview) and the properties it exposes are mapped to the corresponding properties of these two components. You can read more about their behavior in the respective components' documentation.

@[template](/_contentTemplates/date-inputs/general.md#typing-parameters)

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Date Range Picker:

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Date Range Picker.
| `PopupClass` | `string` | additional CSS class to customize the appearance of the Date Range Picker's dropdown.

You can find more options for customizing the Date Range Picker styling in the [Appearance article](slug://daterangepicker-appearance).

@[template](/_contentTemplates/date-inputs/general.md#format-placeholder)

## DateRangePicker Reference and Methods

Add a reference to the component instance to use the [Date Range Picker's methods](slug://Telerik.Blazor.Components.TelerikDateRangePicker-1).

| Method | Description |
| --- | --- |
| `Close` | Closes the Calendar popup. |
| `FocusStartAsync` | Focuses the Date Range Picker start value textbox. Always `await` this call, as it relies on `JSInterop`. @[template](/_contentTemplates/common/inputs.md#focus-kb) |
| `FocusEndAsync` | Focuses the Date Range Picker end value textbox. Always `await` this call, as it relies on `JSInterop`.|
| `NavigateTo` | Navigates to a specified date and view. The method expects a `DateTime` and `CalendarView` arguments. |
| `Open` | Opens the Calendar popup. |
| `Refresh` | Re-renders the Calendar popup. |


````RAZOR
<TelerikButton OnClick="@FocusStart">Focus Start TextBox</TelerikButton>
<TelerikButton OnClick="@FocusEnd">Focus End TextBox</TelerikButton>
<TelerikButton OnClick="@OpenPicker">Open DateRangePicker</TelerikButton>

<TelerikDateRangePicker @ref="@DateRangePickerRef"
                        @bind-StartValue="@DateRangePickerStartValue"
                        @bind-EndValue="@DateRangePickerEndValue" />

@code {
    // the component type depends on the value type, could be also DateTime?
    private TelerikDateRangePicker<DateTime> DateRangePickerRef { get; set; }

    private DateTime DateRangePickerStartValue { get; set; } = DateTime.Now;

    private DateTime DateRangePickerEndValue { get; set; } = DateTime.Now.AddDays(10);

    private async Task FocusStart()
    {
        await DateRangePickerRef.FocusStartAsync();
    }

    async Task FocusEnd()
    {
        await DateRangePickerRef.FocusEndAsync();
    }

    void OpenPicker()
    {
        DateRangePickerRef.Open();
    }
}
````

## Next Steps

* [Using the Date Range Picker Events](slug://daterangepicker-events)

## See Also

* [Live Demo: Date Range Picker](https://demos.telerik.com/blazor-ui/daterangepicker/overview)
* [Input Validation](slug://common-features/input-validation)
* [Supported Input Date Formats](slug://components/dateinput/supported-formats)
* [DateRangePicker API Reference](slug://Telerik.Blazor.Components.TelerikDateRangePicker-1)
