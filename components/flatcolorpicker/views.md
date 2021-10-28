---
title: Views
page_title: Views | FlatColorPicker for Blazor
description: Views of the FlatColorPicker for Blazor.
slug: flatcolorpicker-views
tags: telerik,blazor,flatcolorpicker,views,overview
published: True
position: 0
---

# FlatColorPicker Views

The FlatColorPicker can display different views. They allow users to select a color from an interface that matches their preferences. The supported views are:

* [FlatColorPickerGradientView](#flatcolorpickergradientview) - allows unlimited color selection from an [HSVA](https://en.wikipedia.org/wiki/HSL_and_HSV) canvas. This view also renders textboxes for typing a color in [RGB or HEX format]({%slug colorpicker-overview%}#supported-value-formats).
* [FlatColorPickerPaletteView](#flatcolorpickerpaletteview) - allows color selection from a predefined collection of colors.

By default, both views are enabled and the gradient view is displayed first. Both behaviors can be configured via the FlatColorPicker [`FlatColorPickerViews` container and `View` attribute]({%slug flatcolorpicker-overview%}#features).

## FlatColorPickerGradientView

The GradientView uses a [`TelerikColorGradient` component]({%slug colorgradient-overview%}). The following [ColorGradient attributes]({%slug colorgradient-overview%}#features) are exposed in the `FlatColorPickerGradientView` tag:

* `Format`
* `Formats`
* `ShowOpacityEditor`

## FlatColorPickerPaletteView

The PaletteView uses a [`TelerikColorPalette` component]({%slug colorpalette-overview%}). The following [ColorPalette attributes]({%slug colorpalette-overview%}#features) are exposed in the `FlatColorPickerPaletteView` tag:

* `Columns`
* `Colors`
* `TileWidth`
* `TileHeight`

## Example

````CSHTML
@* Blazor FlatColorPicker Views *@

<TelerikFlatColorPicker @bind-Value="@Color">
    <FlatColorPickerViews>
        <FlatColorPickerGradientView Format="ColorFormat.Hex"
                                 ShowOpacityEditor="true" />
        <FlatColorPickerPaletteView Colors="ColorPalettePresets.Basic"
                                Columns="5"
                                TileWidth="40px"
                                TileHeight="40px" />
    </FlatColorPickerViews>
</TelerikFlatColorPicker>

@code {
    string Color { get; set; }
}
````


## See Also

* [FlatColorPicker Events]({%slug flatcolorpicker-events%})
* [FlatColorPicker Views Demo](https://demos.telerik.com/blazor-ui/flatcolorpicker/views)
