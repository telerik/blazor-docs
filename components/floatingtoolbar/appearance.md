---
title: Appearance
page_title: Floating Toolbar Appearance
description: Configure the size and fill mode of the Blazor Floating Toolbar.
slug: floatingtoolbar-appearance
tags: telerik,blazor,floating toolbar,appearance,styling
published: True
position: 40
components: ["floatingtoolbar"]
---

# Floating Toolbar Appearance

Use `Size` and `FillMode` to configure the appearance of the Floating Toolbar and its hosted ToolBar. Use the `ThemeConstants.ToolBar` constants to keep the component consistent with the active Telerik theme.

## Size

Set `Size` to a `ThemeConstants.ToolBar.Size` value:

| Constant | Description |
| --- | --- |
| `Small` | Renders a compact toolbar. |
| `Medium` | Renders the default toolbar size. |
| `Large` | Renders a larger toolbar. |

## Fill Mode

Set `FillMode` to a `ThemeConstants.ToolBar.FillMode` value:

| Constant | Description |
| --- | --- |
| `Solid` | Renders the default filled appearance. |
| `Outline` | Renders an outlined toolbar. |
| `Flat` | Renders a flat toolbar. |

## Custom CSS Class

Set `Class` to apply a custom CSS class to the Floating Toolbar. Use the class in your application stylesheet to implement [theme overrides](slug:themes-override).

## Example

<demo metaUrl="client/floatingtoolbar/appearance/example-1/" height="420"></demo>

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [ToolBar Appearance](slug:toolbar-appearance)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)