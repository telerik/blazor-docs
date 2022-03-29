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

The <a href="https://www.telerik.com/blazor-ui/date-input" target="_blank">Blazor Date Input component</a> allows the user to enter a date. The developer can control the format of the date. If the user input does not match the desired pattern, the value is not accepted. If the input can be parsed, it will be corrected automatically.

## Creating Blazor DateInput

1. Add the `TelerikDateInput` tag to your razor page.
1. Bind a `DateTime` object to the component
1. Optionally, provide custom `Format`, `Min` and `Max` values

>caption Basic DateInput with custom format, min and max

````CSHTML
@dateInputValue
<br />

<TelerikDateInput @bind-Value="@dateInputValue" Format="dd MMMM yyyy"
                  Min="@Min" Max="@Max">
</TelerikDateInput>

@code {
    DateTime dateInputValue { get; set; } = DateTime.Now;
    public DateTime Min = new DateTime(1990, 1, 1, 8, 15, 0);
    public DateTime Max = new DateTime(2025, 1, 1, 19, 30, 45);
}
````

## Increment Steps

The Date Input enables the end users to change the selected value by clicking the rendered arrows. You can set the increment and decrement steps through the nested `DateInputSteps` tag and its parameters. [Read more about the Blazor Date Input increment steps...]({%slug dateinput-steps%})

## Events

The Blazor Date Input generates events that you can handle and further customize its behavior. [Read more about the Blazor Date Input events...]({%slug components/dateinput/events%}).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...]({%slug common-features/input-validation%}).

## Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `DebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol and the firing of the internal oninput event.
|`Enabled`| `bool` |Defines if the `DateInput` is enabled|
|`Format`|`string`|The date format that the user input must match. Read more in the [Supported Formats]({%slug components/dateinput/supported-formats%}) article.|
|`Id`|`string`|Maps to the `id` HTML attribute of the `input`|
|`Value`|`T` - expects a `DateTime` object|The value of the `DateInput`|
|`TabIndex`|`int`|maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.|
|`Placeholder`|`string`|maps to the `placeholder` attribute of the HTML element. The `Placeholder` will appear if the component is bound to nullable DateTime object - `DateTime?`, but will not be rendered if the component is bound to the default value of a non-nullable DateTime object. The Placeholder value will be displayed when the input is not focused. Once the user focuses it to start typing, the Format Placeholder (default or [customized one](#format-placeholder)) will override the Placeholder to indicate the format the date should be entered in|
|`ValidateOn`|`ValidationEvent` enum <br/> `ValidationEvent.Input` | configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs)|


### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DateInput:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
|`Class`| `string` |The CSS class that will be rendered on the `input` element|
|`Width`|`string`|The width of the `DateInput`|

You can find more options for customizing the Date Input styling in the [Appearance article]({%slug dateinput-appearance%}).

@[template](/_contentTemplates/date-inputs/format-placeholders.md#format-placeholder)


## DateTime and Nullable DateTime

The behavior of the component will depend on the type of field it is bound to, and this can result in different user experience and values that it will output:

##### Bound to a Nullabe DateTime

* When value is `null` - the `Format` is displayed as a placeholder.
* When modifying a part, if some parts are not defined, the value remains `null`.
* When all values are provided, the value changes.
* Upon deleting any part, the whole value changes to `null`, and the entire input returns to the format placeholder. When one or more segments are deleted the value is no longer a valid date and thus defaults to `null`.
* When inside an `EditForm`, if no attributes are present on the field, and the value is deleted, no validation error is shown.


##### Bound to a Non-Nullabe DateTime

* When the value is undefined, it defaults to `0001-01-01`, so the component has it as a value.
* When modifying a part, if some parts are not defined, the bound value does not change.
* When all values are provided, the value changes.
* Upon deleting a focused segment of the input, only that part switches to the format placeholder and not the entire value.
* When inside an `EditForm`, if no attributes are present on the field, and the value is deleted, a validation error is shown.


## Component Reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikDateInput @ref="theDateInput" @bind-Value="@dateInputValue"></TelerikDateInput>

@code {
    DateTime dateInputValue { get; set; } = DateTime.Now;

    // the type of the component depends on the type of the value
    // in this case it is DateTime, but it could be DateTime?
    Telerik.Blazor.Components.TelerikDateInput<DateTime> theDateInput;
}
````

## Next Steps

* [Efficient Keyboard Input]({%slug dateinput-efficient-keyboard-input%})
* [DateTimeInput Events]({%slug components/dateinput/events%})


## See Also

  * [Live Demo: Date Input](https://demos.telerik.com/blazor-ui/dateinput/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Date Formats]({%slug components/dateinput/supported-formats%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDateInput-1)
