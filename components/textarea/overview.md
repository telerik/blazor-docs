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

The Telerik <a href ="https://www.telerik.com/blazor-ui/textarea" target="_blank">Blazor TextArea component</a> is a highly customizable multi-line text input area. It provides features like auto resizing based on the user input and [events]({%slug textarea-events%}) to respond to user actions.

## Creating Blazor TextArea

1. Add the `<TelerikTextArea>` tag to a Razor file.
2. Set the `Value` parameter to a `string` object. It supports one-way and two-way binding.
3. (optional) Set the `AutoSize` property to adjust the TextArea height based on the user input.

>caption Basic TextArea with two-way value binding

````CSHTML
<TelerikTextArea @bind-Value="@TextAreaValue" 
                 AutoSize="true" />

<p>TextArea value: @TextAreaValue</p>

@code {
    public string TextAreaValue { get; set; }
}
````

## Appearance

The TextArea component provides settings to control its appearance. [Read more about the Blazor TextArea appearance settings]({%slug TextArea-appearance%}).

## Events

The Blazor TextArea fires **blur** and value **change** events to respond to user actions. [Read more about the Blazor TextArea events]({%slug textarea-events%}).

## TextArea Parameters

The Blazor TextArea provides various parameters to configure the component:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Value` | `string` | Get/set the value of the input, can be used for binding. |
| `AutoComplete` | `bool` | Maps to the autocomplete attribute of the HTML `<textarea>`. |
| `Class` | `string` | The custom CSS class to be rendered on the `<span class="k-textarea">` element. |
| `AutoSize` | `bool` | Specifies if the TextArea will adjust its height based on the user input. |
| `DebounceDelay` | `int` | Specifies the time in milliseconds between the last typed symbol and the updating of the value. The default value is 150ms. |
| `Enabled` | `bool` <br /> `true` | Whether the TextArea is enabled. |
| `Id` | `string` | Renders as the `id` attribute on the `<textarea>` element, so you can attach a `<label for="">`. |
| `Label` | `string` | The `label` element rendered next to the `<textarea>` to provide the user with information on its purpose. It covers the input in a fashion similar to a placeholder, and floating animation upwards on focus. If you don't want this effect or the height increase it causes, use the `Id` parameter to attach your own `<label>` tag. |
| `Name` | `string` | The `name` attribute of the HTML element. It is usually required so the `AutoComplete` will be honored by the browser. |
| `PlaceHolder` | `string` | A `string` that maps to the `placeholder` attribute of the HTML element. If a `Label` is defined, it will be shown instead of the placeholder when the input is not focused. |
| `TabIndex` | `Nullable<int>` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `Title` | `string` | Maps to the `title` attribute of the HTML element. You can use it to add a [tooltip]({%slug tooltip-overview%}). |
| `ValidateOn` | `ValidationEvent` enum <br /> (`Input`) | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs). |
| `Width` | `string` | The component width. See [Dimensions]({%slug common-features/dimensions%}). The `Width` parameter has no default value, but the theme applies a `width: 100%` style. |

See the [Input Validation]({%slug common-features/input-validation%}) article.

## Next Steps

* [Handle the TextArea Events]({%slug textarea-events%})
* [Explore the TextArea Appearance Settings]({%slug TextArea-appearance%})

## See Also

  * [Live TextArea Demos](https://demos.telerik.com/blazor-ui/textarea/index)
  * [TextArea API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTextArea)
