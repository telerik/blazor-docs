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

The <a href = "https://www.telerik.com/blazor-ui/colorpalette" target="_blank">Blazor Color Palette component</a> provides a list of color tiles for the user to pick a color from by clicking or tapping. You can choose a [predefined list of colors]({%slug colorpalette-presets%}), or [create your own]({%slug colorpalette-custom-colors%}). Two-way binding and [events]({%slug colorpalette-events%}) let you react to the user choice.

If unlimited choice of colors is preferred, consider the [ColorGradient component]({%slug colorgradient-overview%}) instead.

## Creating Blazor RadioGroup

1. Add the `<TelerikColorPalette>` tag to add the component to your razor page.

1. Bind its `Value` to the `string` you want to get out of it.

1. Optionally, choose a list of `Colors` to show the user (one of the [presets we provide]({%slug colorpalette-presets%}), or a set of [custom colors]({%slug colorpalette-custom-colors%})).
    * If you do not provide a value for the `Colors`, it will default to the `Office` [preset]({%slug colorpalette-presets%}).

>caption Basic color palette with two-way value binding and a default predefined palette.

````CSHTML
<span style="color: @MyColor">@MyColor</span>
<br />

<TelerikColorPalette @bind-Value="@MyColor">
</TelerikColorPalette>

@code {
    public string MyColor { get; set; }
}
````

## Predefined Colors

The ColorPalette component comes with a set of predefined color sets that you can show to the users. [Read more about the available ColorPallete predefined colors]({%slug colorpalette-presets%}).

## Custom Colors

You can provide your own set of colors to the Blazor Color Palette component. [Read more about the Blazor ColorPallete custom colors setup]({%slug colorpalette-custom-colors%}).

## Appearance

You can control the appearane of the component not only through the lists of `Colors` you provide to it, but also its size through the `Columns`, `TileWidth` and `TileHeight` parameters.

>caption Make a large color palette with few columns

````CSHTML
@SelectedColor
<TelerikColorPalette Colors="@ColorPalettePresets.Basic" @bind-Value="@SelectedColor"
                     Columns="5" TileHeight="3em" TileWidth="3em">
</TelerikColorPalette>
@code{
    string SelectedColor { get; set; }
}
````

## Events

The Blazor ColorPalette generates events that you can handle and further customize its behavior. [Read more about the Blazor Dialog events]({%slug colorpalette-events%}).

## Parameters

The Blazor ColorPalette provides various parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Value` | `string` | Get/set the value of the input, can be used for binding. Can take any string that can be a [CSS background-color string](https://css-tricks.com/almanac/properties/b/background-color/). The presets we provide use hex format (`#123abc`). |
| `Class` | `string` | The CSS class that will be rendered on the wrapping element of the component. |
| `Colors` | `IEnumerable<string>` <br /> `Office` | The collection of colors the user can choose from. Can be one of the [presets that come with the component]({%slug colorpalette-presets%}), or [a custom list]({%slug colorpalette-custom-colors%}). |
| `Columns` | `int` <br /> `10` | The number of columns to use when rendering the Colors list. Determines the size of the component together with the `TileHeight` and `TileWidth`. |
| `Enabled` | `bool` | Whether the component is enabled. |
| `Id` | `string` | Renders as the `id` attribute on the wrapping element of the component. |
| `TabIndex` | `Nullable<int>` | Maps to the `tabindex` attribute of the main HTML element. You can use it to customize the order in which the elements in your page focus with the `Tab` key. |
| `TileHeight` | `string` | The height of each individual color item. Determines the size of the component together with the `Columns` and `TileWidth`. Can take CSS [dimensions]({%slug common-features/dimensions%}) strings  |
| `TileWidth` | `string` | The width of each individual color item. Determines the size of the component together with the `Columns` and `TileHeight`. Can take CSS [dimensions]({%slug common-features/dimensions%}) strings  |

## ColorPallete Reference and Validation

>caption Example of the component reference.

````CSHTML
<TelerikColorPalette @ref="@TheColorPaletteRef"></TelerikColorPalette>

@code{
    Telerik.Blazor.Components.TelerikColorPalette TheColorPaletteRef { get; set; }
}
````

See the [Input Validation]({%slug common-features/input-validation%}) article.

## Next Steps

[Explore the ColorPallete Predefined Colors]({%slug colorpalette-presets%})

[Explore the ColorPallete Events]({%slug colorpalette-events%})

## See Also

  * [Live Demo: Color Palette](https://demos.telerik.com/blazor-ui/colorpalette/overview)
  * [Color Presets]({%slug colorpalette-presets%})
  * [Custom Color Collections]({%slug colorpalette-custom-colors%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikColorPalette)
