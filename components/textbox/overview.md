---
title: Overview
page_title: TextBox Overview
description: Overview of the TextBox for Blazor.
slug: components/textbox/overview
tags: telerik,blazor,textbox,overview
published: True
position: 0
---

# Blazor TextBox Overview

The <a href="https://www.telerik.com/blazor-ui/textbox" target="_blank">Blazor TextBox component</a> allows the user to enter a generic plain text message. 

You can control [various attributes](#textbox-parameters) of the `input` element and turn the TextBox into a password box, for example. You can also configure this component to respond to [events](slug:components/textbox/events).

## Creating Blazor TextBox

1. Add the `<TelerikTextBox>` tag to a Razor file.
2. Set the `Value` parameter to a `string` object. It supports one-way and two-way binding.

>caption Basic TextBox with two-way value binding

````RAZOR
<p>TextBox value: @StringValue</p>

<TelerikTextBox @bind-Value="@StringValue" />

@code {
    private string StringValue { get; set; }
}
````

## Appearance

The TextBox component provides settings to control its appearance. [Read more about the Blazor TextBox appearance settings](slug:textbox-appearance).

>tip To learn more about the appearance, anatomy, and accessibility of the TextBox, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/textbox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

@[template](/_contentTemplates/common/inputs.md#adornments)

## Events

The Blazor TextBox generates blur and value change events for further customizing its behavior. [Read more about the Blazor TextBox events](slug:components/textbox/events).

## TextBox Parameters

The Blazor TextBox provides various parameters to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `AutoCapitalize` | `string` | A `string` that maps to the [`autocapitalize`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize) attribute of the HTML element. It's applicable only for touch devices and virtual keyboards. |
| `AutoComplete` | `string` | A `string` that maps to the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute of the HTML element. You can use it to instruct the browser to turn `off` its autocompletion or to use specific settings for it (such as `new-password`). Make sure to use values that make sense for a text input. For example, if you need a numerical input, use the TelerikNumericTextBox component, or the TelerikDatePicker for dates. |
| `Class` | `string` | The custom CSS class to be rendered on the `<span class="k-textbox">` element. |
| `DebounceDelay` | `int` | Specifies the time in milliseconds between the last typed symbol and the updating of the value. The default value is 150ms. |
| `Enabled` | `bool` <br /> `true` | Whether the `input` is enabled. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `Id` | `string` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input. |
| `MaxLength` | `int?` | Maps to the `maxlength` attribute of the HTML `<input />` element. |
| `InputMode` | `string` | A `string` that maps to the [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) attribute of the HTML element. You can use it to instruct the rendering device to show a suitable virtual keyboard (for example, one optimized for entering an URL or an email). Make sure to use values that make sense for a text input. For example, if you need a numerical input, use the TelerikNumericTextBox component, or the TelerikDatePicker for dates. |
| `Name` | `string` | The `name` attribute of the HTML element. It is usually required so the `AutoComplete` will be honored by the browser. |
| `Password` | `bool` | When set to `true`, the HTML element renders `type="password"` so that the user input is hidden. You can find examples of validation and reveal buttons in the [Password Textbox demo](https://demos.telerik.com/blazor-ui/textbox/password) and the [Add Eye Icon to Reveal a TextBox Password](slug:textbox-kb-eye-reveal-password) article. |
| `Placeholder` | `string` | A `string` that maps to the `placeholder` attribute of the HTML element. If a `Label` is defined, it will be shown instead of the placeholder when the input is not focused. |
| `ShowClearButton` | `bool` | Defines if the user can clear the component value through an **x** button rendered inside the input. |
| `SpellCheck` | `string` | A `string` that maps to the [`spellcheck`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck) attribute of the HTML element. Use it to disable browser spellchecking if it's intrusive to the user or due to [privacy and security concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck#security_and_privacy_concerns). |
| `TabIndex` | ``Nullable<int>`` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Title` | `string` | Maps to the `title` attribute of the HTML element. You can use it to add a [Blazor Tooltip](slug:tooltip-overview). |
| `ValidateOn` | `ValidationEvent` enum <br /> (`Input`) | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs](slug:common-features/input-validation#validation-modes-for-simple-inputs). |
| `Value` | `string` | The value of the input. Supports two-way binding. |
| `Width` | `string` | The component width. See [Dimensions](slug:common-features/dimensions). The `Width` parameter has no default value, but the theme applies a `width: 100%` style. |

See also the [Input Validation](slug:common-features/input-validation) article.

## TextBox Reference and Methods

The TextBox provides a `FocusAsync` method that allows the application to focus the component programmatically. First, obtain reference to the component through its `@ref` attribute.
@[template](/_contentTemplates/common/inputs.md#focus-kb)

>caption Use TextBox methods

````RAZOR
<TelerikButton OnClick="@FocusTextBox">Focus TextBox</TelerikButton>

<TelerikTextBox @ref="@TextBoxRef"
                @bind-Value="@TextBoxValue"
                Width="200px" />

@code {
    private TelerikTextBox TextBoxRef { get; set; }

    private string TextBoxValue { get; set; }

    async Task FocusTextBox()
    {
        await TextBoxRef.FocusAsync();
    }
}
````

## Examples

>caption Customized text box with input attributes

````RAZOR
<label for="email">Email</label>
<TelerikTextBox Placeholder="john@smith.com" Title="write your email here"
                TabIndex="3" Width="180px"
                InputMode="email" Id="email" AutoComplete="email" Name="email">
</TelerikTextBox>
````

>caption Password type TextBox

See [Add Eye Icon to Reveal a TextBox Password](slug:textbox-kb-eye-reveal-password).

>caption Programmatically change the TextBox value

````RAZOR
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

## Next Steps

* [Explore the TextBox Appearance Settings](slug:textbox-appearance)
* [Handle the TextBox Events](slug:components/textbox/events)

## See Also

* [Live Demo: TextBox](https://demos.telerik.com/blazor-ui/textbox/overview)
* [TextBox API Reference](slug:Telerik.Blazor.Components.TelerikTextBox)
