---
title: Overview
page_title: Overview - ColorPicker for Blazor
description: Overview of the ColorPicker for Blazor.
slug: colorpicker-overview
tags: telerik,blazor,colorpicker,overview
published: True
position: 0
---

# Blazor ColorPicker Overview

The <a href = "https://www.telerik.com/blazor-ui/colorpicker" target="_blank">ColorPicker for Blazor</a> is an interactive component that allows color selection from a popup palette or a [HSVA](https://en.wikipedia.org/wiki/HSL_and_HSV) canvas. Users can also type a specific RGB/HEX color value manually. The ColorPicker is practically identical to the [FlatColorPicker component]({%slug flatcolorpicker-overview%}) with the only difference that the ColorPicker takes up less space and displays the color selection UI in a popup.

## Creating Blazor ColorPicker

1. Add the `TelerikColorPicker` tag.
1. Set its `Value` attribute to any of the [supported HEX/RGB formats](#supported-value-formats). Use a `string` property with [one-way]({%slug colorpicker-events%}#valuechanged) or [two-way](#example) binding.
1. (optional) Set the `ValueFormat` to `ColorFormat.Hex` or `ColorFormat.Rgb` if the app expects a specific color format.

>caption Basic color picker with two-way value binding.

```CSHTML
<TelerikColorPicker @bind-Value="@MyColor" ValueFormat="ColorFormat.Hex"/>

<p>Selected color: <span style="color: @MyColor">@MyColor</span></p>

@code {
    string MyColor { get; set; }
}
```

## Views

The ColorPicker component comes with Palette and Gradient views. They allow users to select a color from an interface that matches their preferences. [Read more about the available ColorPicker views.]({%slug colorpicker-views%})

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

## Events

The Blazor ColorPicker fires a few events that you can handle and further customize its behavior. [Read more about the Blazor ColorPicker events]({%slug colorpicker-events%}).

## Supported Value Formats

The ColorPicker accepts values by the application code in the following formats:

@[template](/_contentTemplates/common/coloreditors.md#value-formats)

Color keywords are not supported.

## ColorPicker Parameters

The Blazor ColorPicker provides various parameters to configure the component. Also check the [ColorPicker public API](/blazor-ui/api/Telerik.Blazor.Components.TelerikColorPicker).

The ColorPicker tag exposes the following features via its attributes:

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Value` | `string` | Sets the ColorPicker value in a few [different color formats](#supported-value-formats). Supports two-way binding. |
| `ValueFormat` | `ColorFormat` | Sets the color format, which the component will return in the application code. By default, the `ValueFormat` is set to `Rgb`, but it can be changed to `Hex`. |
| `ColorPickerViews` | `RenderFragment` | A nested container to list the [ColorPicker views]({%slug colorpicker-views%}). All views are enabled by default and the user can switch between them with buttons. Each view tag has its own configuration attributes. |
| `View` | `ColorPickerView` | Sets the default selected [view]({%slug colorpicker-views%}) (`ColorPickerView.Gradient` by default). Supports two-way binding. |
| `ShowPreview` | `bool` | Toggles the [current color box and the color preview box](#interface) in the popup (`true` by default). |
| `Class` | `string` | Renders a custom CSS class to the `span.k-colorpicker` element. |
| `Enabled` | `bool` | Determines if the user can open the popup and change the value (`true` by default).
| `ShowButtons` | `bool` | Sets the visibility of the Apply and Cancel buttons (`true` by default).
| `ShowClearButton` | `bool` | Sets the visibility of the Clear button.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor ColorPicker:

| Parameter | Type | Description |
| --- | --- | --- |
| `Size` | `Telerik.Blazor.ThemeConstants.ColorPicker.Size` | Adjust the size of the ColorPicker |
| `Rounded` | `Telerik.Blazor.ThemeConstants.ColorPicker.Rounded` | Affects the `border-radius` of the ColorPicker |
| `FillMode` | `Telerik.Blazor.ThemeConstants.ColorPicker.FillMode` | Controls how the ColorPicker is filled |

You can find more information for customizing the ColorPicker styling in the [ColorPicker article]({%slug colorpicker-appearance%}).

### Custom Icon

The ColorPicker provides attributes to render an icon inside the [main component button](#interface). This icon can be used to visually distinguish different ColorPickers on the page. In such cases, the selected color is displayed below the icon.

Use one attribute at a time:

* `Icon` - `object` - specifies a [built-in Font or SVG icon]({%slug general-information/font-icons%}).

## ColorPicker Reference and Methods

Add a reference to the component instance to use the [ColorPicker's methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikColorPicker).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `Close` | Closes the component popup. |
| `FocusAsync` | Focuses the main element of the component. Always `await` this call, as it relies on `JSInterop`. |
| `Open` | Opens the component popup. |

````CSHTML
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

* [Explore the ColorPicker Views]({%slug colorpicker-views%})
* [Handle the ColorPicker events]({%slug colorpicker-events%})

## See Also

* [ColorPicker Live Demo](https://demos.telerik.com/blazor-ui/colorpicker/overview)
* [ColorPicker API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikColorPicker)
