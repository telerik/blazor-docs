---
title: Overflow
page_title: Floating Toolbar Overflow
description: Configure overflow behavior for the Blazor Floating Toolbar.
slug: floatingtoolbar-overflow
tags: telerik,blazor,floating toolbar,toolbar,overflow
published: True
position: 20
components: ["floatingtoolbar"]
---

# Floating Toolbar Overflow

The Floating Toolbar uses the same overflow behavior as the [Telerik ToolBar](slug:toolbar-overview). Configure the `OverflowMode` parameter to control how the component reacts when its tools do not fit on one row.

> `ToolBarOverflowMode.Section` is not supported by the Floating Toolbar.

## Using an Overflow Menu

Set `OverflowMode` to `ToolBarOverflowMode.Menu` to move tools that do not fit into an overflow menu. Use this option for desktop interfaces and toolbars with mixed controls.

The component recalculates visible and overflowed items as the available width changes.

````RAZOR
<div id="anchor-2" aria-label="anchor-2"></div>

<TelerikFloatingToolBar Visible="@true"
                        OverflowMode="@ToolBarOverflowMode.Menu"
                        AriaLabel="Document tools"
                        AnchorSelector="#anchor-2">
    <ToolBarButton>Save</ToolBarButton>
    <ToolBarButton>Download</ToolBarButton>
    <ToolBarButton>Share</ToolBarButton>
    <ToolBarButton>Print</ToolBarButton>
    <ToolBarButton>Archive</ToolBarButton>
</TelerikFloatingToolBar>
````

## Using Horizontal Scrolling

Set `OverflowMode` to `ToolBarOverflowMode.Scroll` to keep all tools on one row and allow horizontal scrolling. This option is useful on mobile devices and narrow viewports where vertical space is limited.

````RAZOR
<div id="anchor-4" aria-label="anchor-4"></div>

<TelerikFloatingToolBar Visible="@true"
                        OverflowMode="@ToolBarOverflowMode.Scroll"
                        ScrollButtonsVisibility="@ToolBarScrollButtonsVisibility.Auto"
                        ScrollButtonsPosition="@ToolBarScrollButtonsPosition.Split"
                        AriaLabel="Mobile formatting tools"
                        AnchorSelector="#anchor-4">
    <ToolBarButton>Bold</ToolBarButton>
    <ToolBarButton>Italic</ToolBarButton>
    <ToolBarButton>Underline</ToolBarButton>
    <ToolBarButton>Align left</ToolBarButton>
    <ToolBarButton>Align center</ToolBarButton>
    <ToolBarButton>Align right</ToolBarButton>
</TelerikFloatingToolBar>
````

Scroll mode supports touch and mouse scrolling. Set `ScrollButtonsVisibility` and `ScrollButtonsPosition` to configure its navigation buttons. These settings have no effect unless `OverflowMode` is set to `Scroll`.

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [ToolBar Built-in Tools](slug:toolbar-built-in-tools)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)