---
title: Overview
page_title: Overview - ColorPicker for Blazor
description: Try out the Telerik UI for Blazor ColorPicker and learn more about its features and how to initialize the component and start using it in your application.  
slug: colorpicker-overview
tags: telerik,blazor,colorpicker,overview
published: True
position: 0
---

# Blazor ColorPicker Overview

The <a href="https://www.telerik.com/blazor-ui/colorpicker" target="_blank">Telerik UI ColorPicker for Blazor</a> is an interactive component that allows users to select colors from a popup palette or a [Hue, Saturation, Value (HSV) canvas](https://en.wikipedia.org/wiki/HSL_and_HSV), and also manually type a specific RGB or HEX color value.

Practically, the ColorPicker is identical to the [Telerik UI for Blazor FlatColorPicker component](slug://flatcolorpicker-overview) with the only difference that the ColorPicker takes up less space and displays the color selection UI in a popup.

## Creating Blazor ColorPicker


1. Add the `TelerikColorPicker` tag.
1. Set its `string` `Value` parameter to any of the [supported HEX or RGB formats](#supported-value-formats). The parameter supports two-way binding or [one-way binding with a `ValueChanged` handler](slug://colorpicker-events#valuechanged).
1. (optional) If your app expects a specific color format, set the `ValueFormat` to `ColorFormat.Hex` or `ColorFormat.Rgb`.

>caption A basic ColorPicker with two-way value binding

```CSHTML
<TelerikColorPicker @bind-Value="@MyColor" ValueFormat="ColorFormat.Hex"/>

<p>Selected color: <span style="color: @MyColor">@MyColor</span></p>

@code {
    string MyColor { get; set; }
}
```

## Views

The Blazor [ColorPicker component comes with the Palette and Gradient views](slug://colorpicker-views) which allow users to select a color from an interface that matches their preferences.

## Interface

The image below shows the supported Blazor ColorPicker interface elements, including:

* (Outside the popup) Main component button with the current value and a drop-down arrow.
* (Top left) View selectors.
* (Top right) Color preview box.
* (Below the color preview) Current color box.
* (Top) **Clear** button.
* (Middle) Palette tiles or HSV canvas with hue and opacity sliders.
* (Bottom) RGBA or HEX value textboxes with a **Toggle** button.
* (Bottom) **Apply** and **Cancel** buttons.

Clicking outside the ColorPicker popup applies an **Apply** button behavior.

![ColorPicker component](images/colorpicker-overview.gif)

## Events

The Blazor ColorPicker fires a set of events that you can handle to further customize its behavior. [Read more about the Telerik UI for Blazor ColorPicker events](slug://colorpicker-events).

## Supported Value Formats

The Blazor ColorPicker accepts values by the application code in the following formats:

@[template](/_contentTemplates/common/coloreditors.md#value-formats)

The ColorPicker does not support color keywords.

## ColorPicker Parameters

The Blazor ColorPicker provides various parameters to configure the component. For more configuration options, see the [public Telerik UI for Blazor ColorPicker API](slug://Telerik.Blazor.Components.TelerikColorPicker).

The ColorPicker tag exposes the following features through its attributes:

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `AdaptiveMode` | `AdaptiveMode` <br /> (`None`) | The [adaptive mode](slug://adaptive-rendering) of the component. |
| `Value` | `string` | The ColorPicker value in a few [different color formats](#supported-value-formats). Supports two-way binding. |
| `ValueFormat` | `ColorFormat` enum <br /> (`Rgb`) | Sets the color format, which the component will return in the application code - `Rgb` or `Hex`. |
| `ColorPickerViews` | `RenderFragment` | A nested container to list the [ColorPicker views](slug://colorpicker-views). All views are enabled by default and the user can switch between them with the buttons. Each view tag has its own configuration attributes. |
| `View` | `ColorPickerView` enum <br /> (`Gradient`) | The default selected [view](slug://colorpicker-views). Supports two-way binding. |
| `ShowPreview` | `bool` <br /> (`true`) | Toggles the visibility of the [current color box and the color preview box](#interface) in the popup. |
| `Class` | `string` | A custom CSS class for the `span.k-colorpicker` element. |
| `Enabled` | `bool` <br /> (`true`) | Determines if the user can open the popup and change the value. |
| `ShowButtons` | `bool` <br /> (`true`) | Controls the visibility of the **Apply** and **Cancel** buttons. |
| `ShowClearButton` | `bool` <br /> (`true`) | Sets the visibility of the **Clear** button. |
| `Icon` | `object` | Adds a font icon inside the [main component button](#interface). You can find more information on adding a font icon to a Telerik Component in the [Telerik Font and Svg Icons article](slug://common-features-icons#icon-namespaces). |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor ColorPicker:

| Parameter | Type | Description |
| --- | --- | --- |
| `Size` | `Telerik.Blazor.ThemeConstants.ColorPicker.Size` | Adjusts the size of the ColorPicker. |
| `Rounded` | `Telerik.Blazor.ThemeConstants.ColorPicker.Rounded` | Affects the `border-radius` of the ColorPicker. |
| `FillMode` | `Telerik.Blazor.ThemeConstants.ColorPicker.FillMode` | Controls how the ColorPicker is filled. |

For more information on customizing the ColorPicker styling, see the article about [setting the appearance of the ColorPicker](slug://colorpicker-appearance).

## ColorPicker Reference and Methods

To use the [methods of the Blazor ColorPicker](slug://Telerik.Blazor.Components.TelerikColorPicker), add a reference to the component instance.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `Close` | Closes the component popup. |
| `FocusAsync` | Focuses the main element of the component. Always `await` this call, as it relies on `JSInterop`. |
| `Open` | Opens the component popup. |

````RAZOR
<TelerikColorPicker @ref="@ColorPickerRef"
                    @bind-Value="@Color" />

<TelerikButton OnClick="@OpenPopup">Open Popup</TelerikButton>


@code {
    private TelerikColorPicker ColorPickerRef { get; set; }

    private string Color { get; set; } = "rgb(40, 47, 137)";

    private void OpenPopup()
    {
        ColorPickerRef.Open();
    }
}
````

## Next Steps

* [Explore the Telerik UI for Blazor ColorPicker Views](slug://colorpicker-views)
* [Handle the Blazor ColorPicker Events](slug://colorpicker-events)

## See Also

* [Blazor ColorPicker Overview (Live Demo)](https://demos.telerik.com/blazor-ui/colorpicker/overview)
* [Blazor ColorPicker API Reference](slug://Telerik.Blazor.Components.TelerikColorPicker)
