---
title: Appearance
page_title: Floating Toolbar Appearance
description: Configure the size and fill mode of the Blazor Floating Toolbar.
slug: floatingtoolbar-appearance
tags: telerik,blazor,floating toolbar,appearance,styling
published: True
position: 4
components: ["floatingtoolbar"]
---

# Floating Toolbar Appearance

Use `Size` and `FillMode` to configure the appearance of the Floating Toolbar and its hosted ToolBar. Use the `ThemeConstants.ToolBar` constants to keep the component consistent with the active Telerik theme.

````RAZOR
@foreach (var size in Sizes)
{
    <h3>Size: @size</h3>
    <div class="floating-toolbar-container">
        @foreach (var fillMode in FillModes)
        {
            <div class="floating-toolbar-wrapper">
                <TelerikFloatingToolBar Visible="true"
                                        AnchorSelector="@($"#anchor-{size}-{fillMode}")"
                                        Position="@PopoverPosition.Bottom"
                                        OverflowMode="@ToolBarOverflowMode.None"
                                        Size="@size"
                                        FillMode="@fillMode"
                                        AriaLabel="@($"{size} {fillMode} tools")">
                    <ToolBarButton Icon="@SvgIcon.Bold">Bold</ToolBarButton>
                    <ToolBarToggleButton Icon="@SvgIcon.Italic">Italic</ToolBarToggleButton>
                </TelerikFloatingToolBar>
                <span class="floating-toolbar-anchor" id="@($"anchor-{size}-{fillMode}")">@fillMode anchor</span>
            </div>
        }
    </div>
}

<style>
    .floating-toolbar-container {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        margin-left: 60px;
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
}
````

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

The Floating Toolbar does not expose `Rounded` or `ThemeColor` parameters.

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [ToolBar Appearance](slug:toolbar-appearance)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)