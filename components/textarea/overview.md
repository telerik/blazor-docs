---
title: Overview
page_title: TextArea Overview
description: Overview of the TextAre for Blazor.
slug: textarea-overview
tags: telerik,blazor,textarea,multiline,text,overview
published: True
position: 0
---

# Blazor TextArea Overview

The Telerik <a href ="https://www.telerik.com/blazor-ui/textarea" target="_blank">Blazor TextArea component</a> is a highly customizable multi-line text input area. It provides features like auto resizing based on the user input, floating label functionality and [events]({%slug textarea-events%}) to respond to user actions.

## Creating Blazor TextArea

1. Add the `<TelerikTextArea>` tag to add the component to your razor page.

2. Set the `Value` (one and two-way data binding applicable) property.

>caption Basic TextArea with two-way value binding.

````CSHTML
<TelerikTextArea @bind-Value="@TextAreaValue" 
                 Label="Enter Information" 
                 AutoSize="true">
</TelerikTextArea>

<br />

@TextAreaValue

@code {
    public string TextAreaValue { get; set; }
}
````

## Appearance

The TextArea component provides settings to control its appearance. [Read more about the Blazor TextArea appearance settings]({%slug TextArea-appearance%}).

## Events

The Blazor TextArea generates events that you can handle and further customize its behavior. [Read more about the Blazor TextArea events]({%slug textarea-events%}).

## Parameters

The Blazor TextArea provides various parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Value` | `string` | Get/set the value of the input, can be used for binding. |
| `AutoComplete` | `bool` | Maps to the autocomplete attribute of the HTML `<textarea>`. |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element. |
| `AutoSize` | `bool` | Specifies if the TextArea will adjust its height based on the user input. |
| `DebounceDelay` | `int` | Specifies the time in milliseconds between the last typed symbol and the updating of the value. The default value is 150ms. |
| `Enabled` | `bool` <br /> `true` | Whether the TextArea is enabled. |
| `Id` | `string` | Renders as the `id` attribute on the `<textarea>` element, so you can attach a `<label for="">`. |
| `Label` | `string` | The `label` element rendered next to the `<textarea>` to provide the user with information on its purpose. It covers the input in a fashion similar to a placeholder, and floating animation upwards on focus. If you don't want this effect or the height increase it causes, use the `Id` parameter to attach your own `<label>` tag. |
| `Name` | `string` | The `name` attribute of the HTML element. It is usually required so the `AutoComplete` will be honored by the browser. |
| `PlaceHolder` | `string` | A `string` that maps to the `placeholder` attribute of the HTML element. If a `Label` is defined, it will be shown instead of the placeholder when the input is not focused. |
| `TabIndex` | `Nullable<int>` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Title` | `string` | Maps to the `title` attribute of the HTML element. You can use it to add a [tooltip]({%slug tooltip-overview%}). |
| `ValidateOn` | `ValidationEvent` | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs). |
| `Width` | `string` | The width of the component. See the [Dimensions]({%slug common-features/dimensions%}) article for more information. |

## TextArea Reference and Validation

>caption Component namespace and reference.

````CSHTML
<TelerikTextArea @bind-Value="@TextAreaValue" @ref="@TextAreaRef"></TelerikTextArea>

@code {
    public Telerik.Blazor.Components.TelerikTextArea TextAreaRef { get; set; }
    public string TextAreaValue { get; set; }
}
````

See the [Input Validation]({%slug common-features/input-validation%}) article.

## Next Steps

[Explore the TextArea Appearance Settings]({%slug TextArea-appearance%})

[Explore the TextArea Events]({%slug textarea-events%})

## See Also

  * [Live Demo: TextArea](https://demos.telerik.com/blazor-ui/textarea/index)
  * [Live Demo: TextArea Validation](https://demos.telerik.com/blazor-ui/textarea/validation)
  * [Input Validation]({%slug common-features/input-validation%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTextArea)
