---
title: Overview
page_title: Color Palette Overview
description: Overview of the Color Palette for Blazor.
slug: colorpalette-overview
tags: telerik,blazor,masked,Color,Palette,overview
published: True
position: 0
---

# Blazor Color Palette Overview

The <a href = "https://www.telerik.com/blazor-ui/colorpalette" target="_blank">Blazor Color Palette component</a> provides a list of color tiles for the user to pick a color by clicking or tapping. You can choose a [predefined list of colors](slug://colorpalette-presets), or [create your own](slug://colorpalette-custom-colors). Two-way binding and [events](slug://colorpalette-events) let you react to the user choice.

If unlimited choice of colors is preferred, consider the [ColorGradient component](slug://colorgradient-overview) instead.

## Creating Blazor ColorPalette

1. Add the `<TelerikColorPalette>` tag to a Razor file.
1. Set the `Value` parameter to a `string` object. It supports one-way and two-way binding.

>caption Basic color palette with two-way value binding and a default predefined palette.

````RAZOR
<TelerikColorPalette @bind-Value="@MyColor" />

<p>Selected color: <span style="color: @MyColor">@MyColor</span></p>

@code {
    string MyColor { get; set; }
}
````

## Predefined Colors

The ColorPalette component comes with multiple sets of predefined colors that are shown to the users. [Read more about the available predefined ColorPallete colors](slug://colorpalette-presets).

## Custom Colors

The ColorPallete can work with your own set of colors. [Read more about the Blazor ColorPallete custom colors setup](slug://colorpalette-custom-colors).

## Events

The Blazor ColorPalette fires value change and blur events that you can handle and further customize its behavior. [Read more about the Blazor ColorPalette events](slug://colorpalette-events).

## ColorPalette Parameters

The Blazor ColorPalette provides various parameters to configure the component. Also check the [ColorPalette public API](slug://Telerik.Blazor.Components.TelerikColorPalette).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-colorpalette">` element. |
| `Colors` | `IEnumerable<string>` <br /> (`Office`) | The collection of colors for the user to choose from. Can be one of the [built-in preset palettes](slug://colorpalette-presets), or [a custom list of colors](slug://colorpalette-custom-colors). |
| `Columns` | `int` <br /> (`10`) | The number of columns to use when rendering the Colors list. Determines the size of the component together with the `TileHeight` and `TileWidth`. |
| `Enabled` | `bool` <br /> (`true`) | Whether the component is enabled. |
| `Id` | `string` | Renders as an `id` attribute of the `<div class="k-colorpalette">` element. |
| `TabIndex` | `Nullable<int>` | Maps to the `tabindex` attribute of the `<div class="k-colorpalette">` element. Use it to customize the tabbing focus order on the page. |
| `TileHeight` | `string` | The height of each individual color item. Determines the size of the component together with the `Columns` and `TileWidth`. Accepts [CSS dimension](slug://common-features/dimensions) strings.  |
| `TileWidth` | `string` | The width of each individual color item. Determines the size of the component together with the `Columns` and `TileHeight`. Accepts [CSS dimension](slug://common-features/dimensions) strings. |
| `Value` | `string` | Sets the value of the input, can be used for binding. Accepts any valid [CSS `background-color` string](https://css-tricks.com/almanac/properties/b/background-color/). The preset palettes use HEX format (`#123abc`). |

See the [Input Validation](slug://common-features/input-validation) article.

## Example

The Blazor ColorPallete provides appearance settings. Control the size of the component through the `Columns`, `TileWidth` and `TileHeight` parameters.

>caption Make a large color palette with few columns

````RAZOR
@SelectedColor
<TelerikColorPalette Colors="@ColorPalettePresets.Basic" @bind-Value="@SelectedColor"
                     Columns="5" TileHeight="3em" TileWidth="3em">
</TelerikColorPalette>
@code{
    string SelectedColor { get; set; }
}
````

## Next Steps

* [Explore the ColorPallete predefined colors](slug://colorpalette-presets)
* [Handle the ColorPallete events](slug://colorpalette-events)

## See Also

* [Live ColorPalette Demos](https://demos.telerik.com/blazor-ui/colorpalette/overview)
* [ColorPalette API Reference](slug://Telerik.Blazor.Components.TelerikColorPalette)
