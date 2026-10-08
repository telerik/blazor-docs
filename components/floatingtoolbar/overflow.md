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

The `FloatingToolBarOverflowMode` enum supports `None`, `Menu`, and `Scroll`.

## Using an Overflow Menu

Set `OverflowMode` to `FloatingToolBarOverflowMode.Menu` to move tools that do not fit into an overflow menu. Use this option for desktop interfaces and toolbars with mixed controls.

The component recalculates visible and overflowed items as the available width changes.

<demo metaUrl="client/floatingtoolbar/overflow/menu/example-1/" height="340"></demo>

## Using Horizontal Scrolling

Set `OverflowMode` to `FloatingToolBarOverflowMode.Scroll` to keep all tools on one row and allow horizontal scrolling. This option is useful on mobile devices and narrow viewports where vertical space is limited.

<demo metaUrl="client/floatingtoolbar/overflow/scroll/example-1/" height="340"></demo>

Scroll mode supports touch and mouse scrolling. Set `ScrollButtonsVisibility` and `ScrollButtonsPosition` to configure its navigation buttons. These settings have no effect unless `OverflowMode` is set to `Scroll`.

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [ToolBar Built-in Tools](slug:toolbar-built-in-tools)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)