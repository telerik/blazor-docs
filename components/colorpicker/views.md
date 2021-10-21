---
title: Views
page_title: Views | ColorPicker for Blazor
description: Views of the ColorPicker for Blazor.
slug: colorpicker-views
tags: telerik,blazor,colorpicker,views,overview
published: True
position: 0
---

# ColorPicker Views

The ColorPicker can display different views in a popup. These views allow users to choose a color from an interface that matches their preferences and scenario. The supported views are:

* [PaletteView](#PaletteView) - allows color selection from a predefined collection of colors in tiles
* [GradientView](#GradientView) - allows color selection from a gradient rectangle

By default, both views are enabled and the PaletteView is displayed first.

## PaletteView

* `Columns` - `int` - sets the number of tiles in a row (10 by default).
* `Colors` - `IEnumerable<string>` - sets of collection of available colors in the palette.
* `TileWidth` - `string` - sets the width of each time in the palette (24px by default).
* `TileHeight` - `string` - sets the height of each time in the palette (24px by default).

## GradientView



## Example

````CSHTML
@* Blazor ColorPicker *@

<TelerikColorPicker />

@code {

}
````


## See Also

* [ColorPicker Events]({%slug colorpicker-events%})
* [ColorPicker Live Demo](https://demos.telerik.com/blazor-ui/colorpicker/overview)
