---
title: Overview
page_title: Floating Toolbar Overview
description: Discover the Blazor Floating Toolbar. Learn how to add a contextual toolbar, configure its visibility, and use existing ToolBar tools.
slug: floatingtoolbar-overview
tags: telerik,blazor,floating toolbar,toolbar,popup
published: True
position: 0
components: ["floatingtoolbar"]
---

# Blazor Floating Toolbar Overview

The Telerik Floating Toolbar for Blazor displays toolbar actions close to the current application context. Use it to provide formatting tools in editors, document viewers, design tools, and similar interfaces. To add content to a Floating Toolbar, use the [ToolBar built-in tools](slug:toolbar-built-in-tools). The component supports the same tools as the [Telerik ToolBar](slug:toolbar-overview).

## Creating Blazor Floating Toolbar

1. Add a `<TelerikFloatingToolBar>` tag to a Razor file.
1. Add ToolBar child tags, such as `<ToolBarButton>`, `<ToolBarToggleButton>`, or `<ToolBarButtonGroup>`.
1. Set `Visible` to display the component. Use `@bind-Visible` or the [`VisibleChanged` event](slug:floatingtoolbar-events) to track its visibility.
1. Set `AnchorSelector` to position the component next to an element. Omit `AnchorSelector` to use free-position mode.
1. Set `AriaLabel` to provide an accessible name when the surrounding context does not provide one.

The following example displays formatting actions below a note field.

<demo metaUrl="client/floatingtoolbar/overview/example-1/" height="340"></demo>

## Positioning

Use `AnchorSelector` and `Position` to place the Floating Toolbar relative to an element. The component applies collision handling when the preferred side does not have enough viewport space.

Without `AnchorSelector`, the Floating Toolbar uses free-position mode. Configure its initial location with `HorizontalAlign`, `VerticalAlign`, `HorizontalOffset`, and `VerticalOffset`, or use its methods to provide viewport coordinates. Read more about [positioning the Floating Toolbar](slug:floatingtoolbar-positioning).

## Overflow Behavior

Set `OverflowMode` to control how tools react when horizontal space is limited. Use `ToolBarOverflowMode.Menu` to move tools to an overflow menu, or use `ToolBarOverflowMode.Scroll` to keep tools in one scrollable row. Read more about [Floating Toolbar overflow behavior](slug:floatingtoolbar-overflow).

## Drag Support

Set `Draggable` to `true` to allow users to move a free-position Floating Toolbar. Drag support includes a pointer drag handle and keyboard Move mode. A draggable Floating Toolbar cannot use an effective anchor. Read more about [moving the Floating Toolbar](slug:floatingtoolbar-drag-and-drop).

## Appearance

Set `Size`, `FillMode`, and `Class` to customize the hosted ToolBar appearance. Read more about [Floating Toolbar appearance](slug:floatingtoolbar-appearance).

## Events

The Floating Toolbar provides `VisibleChanged`, `OnDragStart`, `OnMove`, and `OnDragEnd` events. Handle these events to track visibility and a toolbar position. Read more about [Floating Toolbar events](slug:floatingtoolbar-events).

## Floating Toolbar API

Consult the [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar) to see all available component parameters, methods, and events.

Use `@ref` to add a reference to the component instance and use Floating Toolbar methods.

The earliest possible time to use Blazor component references is in `OnAfterRender` or `OnAfterRenderAsync`.

````RAZOR.skip-repl
<TelerikFloatingToolBar @ref="@FloatingToolBarRef">
    <ToolBarButton>Bold</ToolBarButton>
</TelerikFloatingToolBar>

@code {
    private TelerikFloatingToolBar? FloatingToolBarRef;
}
````

## Next Steps

* [Position the Floating Toolbar](slug:floatingtoolbar-positioning)
* [Configure Floating Toolbar Overflow](slug:floatingtoolbar-overflow)
* [Enable Floating Toolbar Drag Support](slug:floatingtoolbar-drag-and-drop)
* [Customize Floating Toolbar Appearance](slug:floatingtoolbar-appearance)

## See Also

* [ToolBar Overview](slug:toolbar-overview)
* [ToolBar Built-in Tools](slug:toolbar-built-in-tools)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)