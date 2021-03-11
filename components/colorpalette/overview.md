---
title: Overview
page_title: Color Palette Overview
description: Overview of the Color Palette for Blazor.
slug: colorpalette-overview
tags: telerik,blazor,masked,Color,Palette,overview
published: True
position: 0
---

# Color Palette Overview

The <a href = "https://www.telerik.com/blazor-ui/colorpalette" target="_blank">Blazor Color Palette component</a> provides a list of color tiles for the user to pick a color from by clicking or tapping. You can choose a predefined list of colors, or create your own. Two-way binding and events let you react to the user choice.

## Basics

To use a Telerik Color Palette for Blazor:

1. Add the `<TelerikColorPalette>` tag.
1. Bind its `Value` to the `string` you want to get out of it.
1. Choose a set of colors (the example below uses one of the predefined options).

>caption Basic color palette with two-way value binding and a predefined palette

````CSHTML
@MyColor
<br />

<TelerikColorPalette Palette="@PalettePresets.Austin" @bind-Value="@MyColor">
</TelerikColorPalette>

@code {
    public string MyColor { get; set; }
}
````

>caption The result from the code snippet above before you start writing

![Color Palette first look](images/color-palette-first-look.png)


## Features

>caption The Masked Textbox provides the following features:

* `Class` - the CSS class that will be rendered on the wrapping element of the component.

* `Enabled` - whether the `input` is enabled.

* `Id` - renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.

* `IncludeLiterals` (defaults to `false`) - whether the literal characters from the mask (those characters that don't carry a special meaning such as brackets or dashes) are included in the `Value`. Read more in the [Mask and Prompt]({%slug maskedtextbox-mask-prompt%}) article.

* `Label` - the `label` element rendered next to the `input` to provide the user with information on its purpose. It covers the input in a fashion similar to a placeholder, and animates up on focus. If you don't want this effect or the height increase it causes, use the `Id` parameter to attach your own `<label>` tag. See also the `MaskOnFocus` parameter.

* `Mask` - the mask (pattern) that the user has to follow. Shown by default. Read more about its features in the [Mask and Prompt]({%slug maskedtextbox-mask-prompt%}) article.

* `MaskOnFocus` (defaults to `false`) - whether the mask will be shown to the user only while the input is focused. When set to `true`, the user will see the `Label` or `Placeholder` instead of the mask in case the textbox is empty. When there is some value in the input, the mask and input will be shown.

* `Name` - the `name` attribute of the HTML element.

* `PlaceHolder` - a `string` that maps to the `placeholder` attribute of the HTML element. If a `Label` is defined, it will be shown instead of the placeholder when the input is not focused. See also the `MaskOnFocus` parameter.

* `Prompt` - (`char`) - the prompt character the user will see in the mask where there is no user value already. Defaults to an underscore `_`. Read more in the [Mask and Prompt]({%slug maskedtextbox-mask-prompt%}) article.

* `PromptPlaceholder` (`char?`) - the character that is added to the raw `Value` for places where there is no user input yet. Defaults to an empty space ` ` so the string length matches the mask length. Read more in the [Mask and Prompt]({%slug maskedtextbox-mask-prompt%}) article.

* `TabIndex` - maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.

* `Title` - maps to the `title` attribute of the HTML element. You can use it to add a [tooltip]({%slug tooltip-overview%}).

* `Value` - get/set the value of the input, can be used for binding.

* `Width` - the width of the `input`. See the [Dimensions]({%slug common-features/dimensions%}) article.

* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.





## See Also

  * [Live Demo: MaskedTextbox](https://demos.telerik.com/blazor-ui/maskedtextbox/overview)
  * [Live Demo: MaskedTextbox Validation](https://demos.telerik.com/blazor-ui/maskedtextbox/validation)
  * [Input Validation]({%slug common-features/input-validation%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikMaskedTextBox)
