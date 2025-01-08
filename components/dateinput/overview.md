---
title: Overview
page_title: Date Input Overview
description: Overview of the Date Input for Blazor.
slug: components/dateinput/overview
tags: telerik,blazor,date,input,dateinput,overview
published: True
position: 0
---

# Blazor DateInput Overview

The <a href="https://www.telerik.com/blazor-ui/date-input" target="_blank">Blazor Date Input component</a> allows the user to type a date in a more convenient and user-friendly way, compared to a regular textbox. The DateInput can display its value with a specific date format and hint the user to follow it during typing. The component also provides multiple settings that are related to the typing and auto-correction user experience. The DateInput is a base for other components such as the [DatePicker](slug://components/datepicker/overview), [DateTimePicker](slug://components/datetimepicker/overview) and [DateRangePicker](slug://daterangepicker-overview).


## Creating Blazor DateInput

1. Add a `TelerikDateInput` tag to your razor page.
1. Bind the `Value` parameter to a [`DateTime` or `DateTime?` object](#nullable-datetime). The parameter supports two-way binding.
1. (optional) Set the [`Format`, `Min` and `Max` parameters](#dateinput-parameters).
1. (optional) Configure the [typing user experience](#typing-settings) related to automatic value correction or navigation across the different parts of the date format. For example, let's set `AutoSwitchKeys`, so that users can move from one date segment to the next with more keys and not just the arrows.

>caption Basic Telerik Blazor DateInput

````RAZOR
<TelerikDateInput @bind-Value="@DateValue"
                  Format="dd MMMM yyyy"
                  Min="@MinDate"
                  Max="@MaxDate"
                  AutoSwitchKeys="@AutoSwitchKeys"
                  Width="200px">
</TelerikDateInput>

<p>DateValue is: @DateValue</p>

@code {
    private DateTime DateValue { get; set; } = DateTime.Now;

    private DateTime MinDate { get; set; } = DateTime.Now.AddYears(-50);

    private DateTime MaxDate { get; set; } = DateTime.Now.AddYears(50);

    private List<object> AutoSwitchKeys { get; set; } = new List<object>() { ".", "/", " " };
}
````


## Nullable DateTime

The Date Input behavior differs, depend on the type of field it is bound to, and this can result in different user experience:

| DateInput&nbsp;Scenario | Behavior with DateTime | Behavior with Nullable DateTime? |
|---|---|---|
| No set value | The value defaults to `0001-01-01`. | The value is `null`. The component displays its `Format` or `FormatPlaceHolder`. |
| Empty date format segments | The `Value` does not change. The component displays its `Format` or `FormatPlaceHolder` only for the missing segment. | The `Value` remains or becomes `null`. The component displays its full `Format` or `FormatPlaceHolder`. |
| Deleted value inside a Form | A validation error will appear. | No validation error (unless some other validation attributes are set). |


## Typing Settings

The Date Input provides various [options to configure the Date Input keyboard typing](slug://dateinput-keyboard-typing) and user experience. They are related to the caret movement, two-digit years, and automatic correction of invalid values.


## Increment Steps

The Date Input enables users to change the value by pressing the arrow keys. Use the `<DateInputSteps>` nested tag to [set the increment and decrement steps for each part of the date format](slug://dateinput-steps).


## Validation

The [built-in Date Input validation](slug://common-features/input-validation) ensures that the component value is acceptable for the application business logic.


## Events

The [Blazor Date Input fires events](slug://components/dateinput/events) such as `change` and `blur`. Handle these events to react to user actions and customize the component behavior.


## Appearance

The [DateInput exposes a few parameters for its styling](slug://dateinput-appearance). Use them to change the component appearance declaratively and without custom CSS.


## DateInput Parameters

The following section lists some Date Input parameters and links to other pages that provide information for more parameters. Also check the [DateInput API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikDateInput-1) for all parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
|---|---|---|
| `AriaDescribedBy` | `string` | The [`aria-describedby` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) of the `input`. |
| `AriaLabel` | `string` | The [`aria-label` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) of the `input`. |
| `AriaLabelledBy` | `string` | The [`aria-labelledby` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) of the `input`. |
| `AutoComplete` | `string` | The [`autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) of the `input`. |
| `DebounceDelay` | `int` <br/> (`150`) | The time in milliseconds between the last typed symbol and the value update. Use it to balance between client-side performance and number of database queries. |
| `Enabled` | `bool` | Defines if the Date Input is enabled and accepts new values. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `Format` | `string` <br /> (`ShortDatePattern`) | The textbox mask and date format that the user input must match. The default value depends on `CultureInfo.CurrentCulture`. Read more in the [Supported Formats](slug://components/dateinput/supported-formats) article. |
| `Id` | `string` | The `id` attribute of the `input`. |
| `Max` | `DateTime` <br /> (`new DateTime(2099, 12, 31)`)| The latest allowed date that the user can type. |
| `Min` | `DateTime` <br /> (`DateTime(1900, 1, 1)`)| The earliest allowed date that the user can type. |
| `Placeholder` | `string` | The [`placeholder` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder) of the `input`. The placeholder will appear only if the component is bound to nullable `DateTime?` object, the `Value` is `null` and the component is not focused. Once the user focuses it to start typing, the `FormatPlaceholder` (default or [custom one](#format-placeholder)) will override the `Placeholder` to indicate the expected date format. |
| `ShowClearButton` | `bool` | Defines if the user can clear the component value through an **x** button rendered inside the input. |
| `TabIndex` | `int` | The `tabindex` attribute of the `input`. Use it to control the tabbing order of the inputs on the page. |
| `ValidateOn` | `ValidationEvent` enum <br/> (`Input`) | The event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs](slug://common-features/input-validation#validation-modes-for-simple-inputs) |
| `Value` | `DateTime` or `DateTime?` | The component value. Use with two-way binding or [`ValueChanged` event handler](slug://components/dateinput/events#valuechanged). |

### Typing User Experience

The component provides multiple parameters, which control the [caret placement, two-digit year values and the auto-correct behavior of the Date Input](slug://dateinput-keyboard-typing).

### Styling and Appearance

| Parameter | Type and Default Value | Description |
|---|---|---|
| `Class` | `string` | A custom CSS class to be rendered on the `<span class="k-dateinput">` element. Use it for [custom CSS styling and theme overrides](slug://themes-override). |
| `Width` | `string` | The width of the Date Input. |

The [Date Input Appearance article lists more parameters, which configure the component styling](slug://dateinput-appearance).

@[template](/_contentTemplates/date-inputs/general.md#format-placeholder)


## DateInput Reference and Methods

The Date Input exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `FocusAsync` | Focuses the DateInput component to be ready for typing. Always call with `await`. @[template](/_contentTemplates/common/inputs.md#focus-kb) |

>caption Date Input reference and FocusAsync method usage

````RAZOR
<TelerikDateInput @ref="@DateInputRef"
                  @bind-Value="@DateValue"
                  Width="200px">
</TelerikDateInput>

<TelerikButton OnClick="@OnButtonClick">Focus DateInput</TelerikButton>

@code {
    private TelerikDateInput<DateTime> DateInputRef { get; set; }

    private DateTime DateValue { get; set; } = DateTime.Now;

    private async Task OnButtonClick()
    {
        await DateInputRef.FocusAsync();
    }
}
````


## Next Steps

* [Learn about the flexible Date Input typing user experience](slug://dateinput-keyboard-typing)
* [Set Date Input format](slug://components/dateinput/supported-formats)
* [Customize the Date Input appearance](slug://dateinput-appearance)
* [Handle Date Input events](slug://components/dateinput/events)


## See Also

* [Live Demo: Date Input](https://demos.telerik.com/blazor-ui/dateinput/overview)
* [Input Validation](slug://common-features/input-validation)
* [Date Input API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikDateInput-1)
