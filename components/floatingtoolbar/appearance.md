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

````RAZOR
<div class="floating-toolbar-settings">
    <fieldset>
        <legend>Size</legend>
        <TelerikRadioGroup Data="@Sizes" @bind-Value="@SelectedSize" />
    </fieldset>

    <fieldset>
        <legend>Fill mode</legend>
        <TelerikRadioGroup Data="@FillModes" @bind-Value="@SelectedFillMode" />
    </fieldset>

    <div class="floating-toolbar-wrapper">
        <TelerikFloatingToolBar Visible="@true"
                                AnchorSelector="#appearance-toolbar-anchor"
                                Position="@PopoverPosition.Bottom"
                                OverflowMode="@ToolBarOverflowMode.None"
                                Size="@SelectedSize"
                                FillMode="@SelectedFillMode"
                                AriaLabel="Formatting tools">
            <ToolBarButton Icon="@SvgIcon.Bold" FillMode="@SelectedFillMode">Bold</ToolBarButton>
            <ToolBarToggleButton Icon="@SvgIcon.Italic" FillMode="@SelectedFillMode">Italic</ToolBarToggleButton>
        </TelerikFloatingToolBar>
        <span id="appearance-toolbar-anchor" class="floating-toolbar-anchor">Formatting tools</span>
    </div>
</div>

<style>
    .floating-toolbar-settings {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }

    .floating-toolbar-wrapper {
        position: relative;
        min-height: 60px;
        min-width: 220px;
        border: 1px dashed #ccc;
        padding: 8px;
    }

    .floating-toolbar-anchor {
        font-size: 12px;
        color: #666;
    }
</style>

@code {
    private static readonly string[] Sizes =
    {
        ThemeConstants.ToolBar.Size.Small,
        ThemeConstants.ToolBar.Size.Medium,
        ThemeConstants.ToolBar.Size.Large
    };

    private static readonly string[] FillModes =
    {
        ThemeConstants.ToolBar.FillMode.Solid,
        ThemeConstants.ToolBar.FillMode.Outline,
        ThemeConstants.ToolBar.FillMode.Flat
    };

    private string SelectedSize { get; set; } = ThemeConstants.ToolBar.Size.Medium;

    private string SelectedFillMode { get; set; } = ThemeConstants.ToolBar.FillMode.Solid;
}
````

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [ToolBar Appearance](slug:toolbar-appearance)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)