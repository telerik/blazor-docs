---
title: Overview
page_title: Overview | ColorPicker for Blazor
description: Overview of the ColorPicker for Blazor.
slug: colorpicker-overview
tags: telerik,blazor,colorpicker,overview
published: True
position: 0
---

# ColorPicker Overview

The <a href = "https://www.telerik.com/blazor-ui/colorpicker" target="_blank">ColorPicker for Blazor</a> is an interactive component that allows color selection from a popup palette or a [HSVA](https://en.wikipedia.org/wiki/HSL_and_HSV) canvas. Users can also type a specific RGB/HEX color value manually. The ColorPicker is practically identical to the [FlatColorPicker component]({%slug flatcolorpicker-overview%}) with the only difference that the ColorPicker takes up less space and displays the color selection UI in a popup.

#### In this article:
   * [Basics](#basics)
   * [Example](#example)
   * [Interface](#interface)
   * [Features](#features)
   * [Supported Value Formats](#supported-value-formats)

## Basics

To use a Telerik ColorPicker for Blazor:

1. Add the `TelerikColorPicker` tag.
1. Set its `Value` attribute to any of the [supported HEX/RGB formats](#supported-value-formats). Use a `string` property with [one-way]({%slug colorpicker-events%}#valuechanged) or [two-way](#example) binding.
1. (optional) Set the `ValueFormat` to `ColorFormat.Hex` or `ColorFormat.Rgb` if the app expects a specific color format.

## Example

Here is a simple ColorPicker declaration and the resulting UI.

````CSHTML
@* Blazor ColorPicker *@

<TelerikColorPicker @bind-Value="@Color" />

@code {
    string Color { get; set; } = "rgb(40, 47, 137)";
}
````

## Interface

The image below reveals all ColorPicker interface elements:

* Main component button with the current value and a dropdown arrow (outside the popup)
* View selectors (top left)
* Color preview box (top right)
* Current color box (below the color preview)
* Clear button (top)
* Palette tiles or HSV canvas with hue and opacity sliders (middle)
* RGBA or HEX value textboxes with a toggle button (bottom)
* Apply and Cancel buttons (bottom)

Clicking outside the ColorPicker popup acts as an **Apply** action.

![ColorPicker component](images/colorpicker-overview.gif)

## Features

The ColorPicker tag exposes the following features via its attributes:

* `Value` - `string` - sets the ColorPicker value in a few [different color formats](#supported-value-formats). Supports two-way binding.
* `ValueFormat` - `ColorFormat` - sets the color format, which the component will return in the application code. By default, the property is not set and the value format will change depending on the used view: `Rgb` when selecting a color from the GradientView, and `Hex` when selecting a color from the PaletteView.
* `ColorPickerViews` - `RenderFragment` - a nested container to list the [ColorPicker views]({%slug colorpicker-views%}). All views are enabled by default and the user can switch between them with buttons. Each view tag has its own configuration attributes.
* `View` - `ColorPickerView` - sets the default selected [view]({%slug colorpicker-views%}) (`ColorPickerView.Gradient` by default). Supports two-way binding.
* `ShowPreview` - `bool` - toggles the [current color box and the color preview box](#interface) in the popup (`true` by default).

* `Class` - `string` - renders a custom CSS class to the `span.k-colorpicker` element.
* `Enabled` - `bool` - determines if the user can open the popup and change the value (`true` by default).

### Buttons

* `ShowButtons` - `bool` - sets the visibility of the Apply and Cancel buttons (`true` by default).
* `ShowClearButton` - `bool` - sets the visibility of the Clear button.

### Custom Icon

The ColorPicker provides attributes to render an icon or image inside the [main component button](#interface). This icon can be used to visually distinguish different ColorPickers on the page. In such cases, the selected color is displayed below the icon.

Use one attribute at a time:

* `Icon` - `string` - specifies a [built-in font icon class]({%slug general-information/font-icons%}).
* `ImageUrl` - `string` - specifies an URL for an image.
* `IconClass` - `string` - sets a custom icon class.


## Supported Value Formats

The ColorPicker accepts values by the application code in the following formats:

@[template](/_contentTemplates/common/coloreditors.md#value-formats)

Color keywords are not supported.

## See Also

* [ColorPicker Views]({%slug colorpicker-views%})
* [ColorPicker Events]({%slug colorpicker-events%})
* [ColorPicker Live Demo](https://demos.telerik.com/blazor-ui/colorpicker/overview)
