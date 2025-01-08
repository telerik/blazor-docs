---
title: Overview
page_title: Overview - ColorGradient for Blazor
description: Overview of the ColorGradient for Blazor.
slug: colorgradient-overview
tags: telerik,blazor,colorgradient,overview
published: True
position: 0
---

# Blazor ColorGradient Overview

The <a href = "https://www.telerik.com/blazor-ui/colorgradient" target="_blank">ColorGradient for Blazor</a> enables users to select a color from an [HSVA](https://en.wikipedia.org/wiki/HSL_and_HSV) canvas, or to type a specific RGB/HEX color value. Compared to our [ColorPalette component](slug://colorpalette-overview), the ColorGradient allows selection from unlimited number of colors. It may also be preferred by advanced users.


## Creating Blazor ColorGradient

1. Add the `TelerikColorGradient` tag.
1. Set its `Value` attribute to a [HEX/RGB](#supported-value-formats) `string` variable via [one-way](slug://colorgradient-events#valuechanged) or two-way binding.
1. (optional) Set the [`ValueFormat` and `Format` attributes](#colorgradient-parameters) to the desired color format.


>caption Blazor ColorGradient with initially selected color.

````RAZOR
@* Blazor ColorGradient *@

<TelerikColorGradient @bind-Value="@ColorGradientValue"
                      ValueFormat="@ColorFormat.Hex">
</TelerikColorGradient>

@code {
   private string ColorGradientValue { get; set; } = "#282f89";
}
````

## Events

The Blazor ColorGradient fires value change and format change events that you can handle and further customize its behavior. [Read more about the Blazor ColorGradient events](slug://colorgradient-events).

## Supported Value Formats

The ColorGradient accepts values by the application code in the following formats:

@[template](/_contentTemplates/common/coloreditors.md#value-formats)

Color keywords are not supported. If this is the preferred use case scenario, consider the [ColorPalette component](slug://colorpalette-overview).

## ColorGradient Parameters

The Blazor ColorGradient provides various parameters to configure the component. Also check the [ColorGradient public API](/blazor-ui/api/Telerik.Blazor.Components.TelerikColorGradient).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Class` | `string` | The class that will be rendered on the main wrapping elemnet of the component (`<div class="k-colorgradient">`). | 
| `Enabled`| `bool` | Whether the ColorGradient is enabled. |
| `Format` | `ColorFormat` enum <br/> (`ColorFormat.Rgb`) | The value format which the users sees initially. Supports two-way binding. The `Rgb` input format allows changing the textbox values with the Up/Down arrow keys.
| `Formats` | `IEnumerable<ColorFormat>` | The available color formats which the user can see, toggle, and edit by typing. Both `Hex` and `Rgb` formats are enabled by default, and the user can switch between them with a button.
| `ShowOpacityEditor` | `bool` <br/> (`true`) | Whether the opacity (transparency) slider will be rendered.
| `Value` | `string` | The ColorGradient value. Accepts [several different color formats](#supported-value-formats). Supports two-way binding.
| `ValueFormat` | `ColorFormat` enum <br/> (`ColorFormat.Rgb`)| The color format which the component will return in the application code.

## Next Steps

* [Handle the ColorGradient Events](slug://colorgradient-events)

## See Also

* [ColorGradient Events](slug://colorgradient-events)
* [ColorGradient Live Demo](https://demos.telerik.com/blazor-ui/colorgradient/overview)
