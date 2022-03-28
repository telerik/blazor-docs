---
title: Overview
page_title: Textbox Overview
description: Overview of the Textbox for Blazor.
slug: components/textbox/overview
tags: telerik,blazor,textbox,overview
published: True
position: 0
---

# Blazor Textbox Overview

The <a href="https://www.telerik.com/blazor-ui/textbox" target="_blank">Blazor Textbox component</a> allows the user to enter a generic plain text message. 

You can control [various attributes](#features) of the `input` element and turn the Textbox into a password box, for example. You can also configure this component to respond to [events]({%slug components/textbox/events%}).

## Creating Blazor TextBox

1. Add the `<TelerikTextBox>` tag to a Razor file.
<<<<<<< HEAD

2. Set the `Value` parameter to the desired `string`. It supports one-way and two-way binding.
=======
>>>>>>> 2d916e71 (docs(textbox): changed sections)

2. Set the `Value` parameter to the desired `string`. It supports one-way and two-way binding.

>caption Basic textbox with two-way value binding

````CSHTML
@theTbValue
<br />

<TelerikTextBox @bind-Value="theTbValue"></TelerikTextBox>

@code {
    string theTbValue { get; set; } = "lorem ipsum";
}
````

## Appearance

The TextBox component provides settings to control its appearance. [Read more about the Blazor TextBox appearance settings]({%slug textbox-appearance%}).

## Events

The Blazor TextBox generates blur and value change events for further customizing its behavior. [Read more about the Blazor TextBox events]({%slug components/textbox/events%}).

## TextBox Parameters

The Blazor TextBox provides various parameters to configure the component:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Value` | `string` | Get/set the value of the input, can be used for binding. |
| `AutoComplete` | `string` | A `string` that maps to the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute of the HTML element. You can use it to instruct the browser to turn `off` its autocompletion or to use specific settings for it (such as `new-password`). Make sure to use values that make sense for a text input. For example, if you need a numerical input, use the TelerikNumericTextBox component, or the TelerikDatePicker for dates. |
| `Class` | `string` | The CSS class that will be rendered on the `input` element. |
| `DebounceDelay` | `int` | Specifies the time in milliseconds between the last typed symbol and the updating of the value. The default value is 150ms. |
| `Enabled` | `bool` <br /> `true` | Whether the `input` is enabled. |
| `Id` | `string` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input. |
| `InputMode` | `string` | A `string` that maps to the [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) attribute of the HTML element. You can use it to instruct the rendering device to show a suitable virtual keyboard (for example, one optimized for entering an URL or an email). Make sure to use values that make sense for a text input. For example, if you need a numerical input, use the TelerikNumericTextBox component, or the TelerikDatePicker for dates. |
| `Name` | `string` | The `name` attribute of the HTML element. It is usually required so the `AutoComplete` will be honored by the browser. |
| `Password` | `bool` | When set to `true`, the HTML element renders `type="password"` so that the user input is hidden. You can find examples of validation and reveal buttons in the [Live Demo: Password Textbox](https://demos.telerik.com/blazor-ui/textbox/password) |
| `PlaceHolder` | `string` | A `string` that maps to the `placeholder` attribute of the HTML element. If a `Label` is defined, it will be shown instead of the placeholder when the input is not focused. |
| `TabIndex` | ``Nullable<int>`` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Title` | `string` | Maps to the `title` attribute of the HTML element. You can use it to add a [tooltip]({%slug tooltip-overview%}). |
| `ValidateOn` | `ValidationEvent` enum <br /> (`Input`) | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs). |
| `Width` | `string` | The width of the `input`. See the [Dimensions]({%slug common-features/dimensions%}) article. |

See also the [Input Validation]({%slug common-features/input-validation%}) article.

## Examples

>caption Customized textbox with input attributes

````CSHTML
<label for="email">Email</label>
<TelerikTextBox PlaceHolder="john@smith.com" Title="write your email here"
                TabIndex="3" Width="180px"
                InputMode="email" Id="email" AutoComplete="email" Name="email">
</TelerikTextBox>
````


>caption Password type textbox

````CSHTML
@* An example of enabling the Password mode of the textbox. Make sure to add a form and validation
for example: https://demos.telerik.com/blazor-ui/textbox/password
*@

<TelerikTextBox Password="true"
                @bind-Value="@ThePassword"
                AutoComplete="current-password" Name="password" Id="password">
</TelerikTextBox>
@code {
    // in a real case you should have a form, a model, and validation
    // the form may also need autocomplete attribute and other corresponding inputs to enable autocompletion
    string ThePassword { get; set; }
}
````

>caption Programmatically change the TextBox value

````CSHTML
TextBox value: @StringValue
<br />

<TelerikButton OnClick="@ChangeValue">Change TextBox Value</TelerikButton>

<br />

<TelerikTextBox @bind-Value="@StringValue" />

@code {
    string StringValue { get; set; } = "lorem ipsum";

    void ChangeValue()
    {
        StringValue = "New programmatic value";
    }
}
````

<<<<<<< HEAD
## Appearance

The TextBox component provides settings to control its appearance. [Read more about the Blazor TextBox appearance settings]({%slug textbox-appearance%}).

## Events

The Blazor TextBox generates events that you can handle and further customize its behavior. [Read more about the Blazor TextBox events]({%slug components/textbox/events%}).

* `PlaceHolder` - a `string` that maps to the `placeholder` attribute of the HTML element. If a [FloatingLabel]({%slug floatinglabel-overview%}) is used, it will be shown instead of the placeholder when the input is not focused.
## Parameters

The Blazor TextBox provides various parameters that allow you to configure the component:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Value` | `string` | Get/set the value of the input, can be used for binding. |
| `AutoComplete` | `string` | A `string` that maps to the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute of the HTML element. You can use it to instruct the browser to turn `off` its autocompletion or to use specific settings for it (such as `new-password`). Make sure to use values that make sense for a text input. For example, if you need a numerical input, use the TelerikNumericTextBox component, or the TelerikDatePicker for dates. |
| `Class` | `string` | The CSS class that will be rendered on the `input` element. |
| `DebounceDelay` | `int` | Specifies the time in milliseconds between the last typed symbol and the updating of the value. The default value is 150ms. |
| `Enabled` | `bool` <br /> `true` | Whether the `input` is enabled. |
| `Id` | `string` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input. |
| `InputMode` | `string` | A `string` that maps to the [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) attribute of the HTML element. You can use it to instruct the rendering device to show a suitable virtual keyboard (for example, one optimized for entering an URL or an email). Make sure to use values that make sense for a text input. For example, if you need a numerical input, use the TelerikNumericTextBox component, or the TelerikDatePicker for dates. |
| `Name` | `string` | The `name` attribute of the HTML element. It is usually required so the `AutoComplete` will be honored by the browser. |
| `Password` | `bool` | When set to `true`, the HTML element renders `type="password"` so that the user input is hidden. You can find examples of validation and reveal buttons in the [Live Demo: Password Textbox](https://demos.telerik.com/blazor-ui/textbox/password) |
| `PlaceHolder` | `string` | A `string` that maps to the `placeholder` attribute of the HTML element. If a `Label` is defined, it will be shown instead of the placeholder when the input is not focused. |
| `TabIndex` | ``Nullable<int>`` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Title` | `string` | Maps to the `title` attribute of the HTML element. You can use it to add a [tooltip]({%slug tooltip-overview%}). |
| `ValidateOn` | `ValidationEvent` | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs). |
| `Width` | `string` | The width of the `input`. See the [Dimensions]({%slug common-features/dimensions%}) article. |

See also the [Input Validation]({%slug common-features/input-validation%}) article.

=======
>>>>>>> 2d916e71 (docs(textbox): changed sections)
## Next Steps

* [Explore the TextBox Appearance Settings]({%slug textbox-appearance%})

* [Handle the TextBox Events]({%slug components/textbox/events%})

## See Also

  * [Live TextBox Demos](https://demos.telerik.com/blazor-ui/textbox/index)
  * [TextBox API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTextBox)
