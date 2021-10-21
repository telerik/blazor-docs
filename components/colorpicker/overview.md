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

The <a href = "https://www.telerik.com/blazor-ui/colorpicker" target="_blank">ColorPicker for Blazor</a> is an interactive component that allows color selection from a popup palette or a [HSVA](https://en.wikipedia.org/wiki/HSL_and_HSV) canvas. Users can also type a specific RGB/HEX color value manually.

#### In this article:
   * [Basics](#basics)
   * [Example](#example)
   * [Interface](#interface)
   * [Features](#features)
   * [Supported Value Formats](#supported-value-formats)

## Basics

To use a Telerik ColorPicker for Blazor:

1. Add the `TelerikColorPicker` tag.
1. Set its `Value` attribute to a [HEX/RGB](#supported-value-formats) `string` variable via [one-way]({%slug colorpicker-events%}#valuechanged) or [two-way](#example) binding.
<!-- 1. (optional) Set the [`ValueFormat` and `Format` attrbutes](#features) to the desired color format. -->

## Example

Here is a simple ColorPicker declaration and the resulting UI.

````CSHTML
@* Blazor ColorPicker *@

<TelerikColorPicker @bind-Value="@Value" />

@code {
    string Value { get; set; } = "rgb(40, 47, 137)";
}
````

![ColorPicker component](images/colorpicker-overview.gif)

## Interface

The above screen recording reveals all ColorPicker interface elements:

* Main component button with the current value and a dropdown arrow (outside the popup)
* View selectors (top left)
* Color preview box (top right)
* Current color box (below the color preview)
* Clear button (top)
* Palette tiles or HSV canvas with hue and opacity sliders (middle)
* RGBA or HEX value textboxes (bottom)
* Apply and Cancel buttons (bottom)

Clicking outside the ColorPicker acts as an Apply action.

## Features

The ColorPicker tag exposes the following features via its attributes:

* `Value` - `string` - sets the ColorPicker value in a few [different color formats](#supported-value-formats). Supports two-way binding.
* `ColorPickerViews` - `RenderFragment` - a nested container to list the [ColorPicker views]({%slug colorpicker-views%}). All views are enabled by default and the user can switch between them with buttons. Each view has its own configuration attributes.
* `View` - `ColorPickerView` - sets the default selected [view]({%slug colorpicker-views%}) (`ColorPickerView.Palette` by default).

* `Icon` - `string` - specifies a [built-in font icon class]({%slug general-information/font-icons%}) for the main ColorPicker button. This icon can be used to distinguish the purpose of different ColorPickers on the page.
* `ImageUrl` - `string` - specifies a URL for an image rendered in the main ColorPicker button.
* `IconClass` - `string` - sets the icon class rendered in the main ColorPicker button.

* `ShowButtons` - `bool` - specifies if the ColorPicker popup should display Apply and Cancel buttons (`true` by default).
* `ClearButton` - `bool` - specifies if the popup will render a Clear button for removing the value.

## Supported Value Formats

The ColorPicker accepts values by the application code in the following formats:

* Hexadecimal
    * 3 digits - `#f00`
    * 6 digits - `#ff0000`
    * 8 digits, including alpha opacity - `#ff000080`
* RGB or RGBA
    * integer color values - `rgb(255, 0, 0)`
    * percentage color values - `rgb(100%, 0%, 0%)`
    * the alpha opacity must always be a decimal number between 0 and 1 - `rgba(100%, 0%, 0%, 0.5)`. Note the `rgba()` notation, compared to `rgb()` above.

Users can type values in the following formats:

* All hexadecimal
* RGB and RGBA with integer color values

Color keywords are not supported.

## See Also

* [ColorPicker Views]({%slug colorpicker-views%})
* [ColorPicker Events]({%slug colorpicker-events%})
* [ColorPicker Live Demo](https://demos.telerik.com/blazor-ui/colorpicker/overview)
