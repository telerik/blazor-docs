---
title: Overview
page_title: Window Overview
description: Overview of the Window for Blazor.
slug: window-overview
tags: telerik,blazor,window,overview
published: True
position: 0
---

# Blazor Window Overview

This article provides basic information about the <a href="https://www.telerik.com/blazor-ui/window" target="_blank">Blazor Window component</a> and its core features.

The Window component displays a popup window, which shows users custom content. The component provides predefined titlebar actions such as close, minimize and maximize. Custom actions are also supported. Other Window features include modality, resizing, and position control.

#### In this article:

* [Creating a Window](#creating-blazor-window)
* [Responsive example](#responsiveness)
* [Parameters](#window-parameters)
* [Important notes](#important-notes)

## Creating Blazor Window

1. Use the `TelerikWindow` tag.
1. Bind the `Visible` parameter to a `bool` property. It supports one-way and two-way binding.
1. Add content to the `WindowContent` child tag.
1. (optional) Add some title inside a `WindowTitle` tag. HTML markup and child components are supported, too.
1. (optional) Add a [`Close` action]({%slug components/window/actions%}) inside a `<WindowActions>` tag.

>caption Basic Blazor Window

````CSHTML
<TelerikWindow @bind-Visible="@WindowIsVisible">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        Window Content ...
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

<TelerikButton OnClick="@( () => WindowIsVisible = !WindowIsVisible )">Toggle window</TelerikButton>

@code {
    bool WindowIsVisible { get; set; }
}
````

## Size

The Window can occupy a predefined size on the screen, or expand automatically, based on the content. By default, users can resize the Window. Learn more about the [Window features, related to size and resizing]({%slug components/window/size%}).


## Dragging

By default, users can move the Window on the page by dragging its titlebar. Learn more about how to use the [Window's `Draggable` feature]({%slug window-draggable%}).


## Responsiveness

The Window component can be responsive when the browser window size changes. Here is an [example how to achieve responsive Window behavior]({%slug window-kb-responsive%}). One way is to use the `Width` and `Height` parameters of the Window. Another option is to apply CSS styles.


## Window Parameters

The following table lists the Window parameters, which are not discussed elsewhere in the component documentation. Also check the [Window API](/blazor-ui/api/Telerik.Blazor.Components.TelerikWindow) for a full list of parameters and events.

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-window">` element. Use it to [override theme styles]({%slug themes-override%}). Here is a [custom Window styling example]({%slug window-kb-custom-css-styling%}). |
| `Size` | `string` | Sets a predefined Window **width**. Use the string members of the static class `ThemeConstants.Window.Size` - `Small`, `Medium`, and `Large`. They translate to widths of `300px`, `800px` and `1200px`, respectively. If set, the `Width` parameter will take precedence over `Size`. |
| `Visible` | `bool` | Defines if the Window is rendered and visible on the page. |


## Important Notes

The Telerik Window component renders as a child of the `TelerikRootComponent` at the root of the Blazor app. This is required, so it can show over the other page content, and have correct position.

In Blazor, however, the render tree structure may be important. In some cases, the special Window placement may put you in one of the following situations:

* [Returning data from a Window does not update the parent]({%slug window-does-not-update-parent%})
* [CascadingParameter Value is null in the Window]({%slug window-cascading-parameter-null%})
* [Using an EditContext for a form holding a Window requires updating the EditContext]({%slug window-in-form-edit-context%})
* [Block all content with a Window]({%slug window-kb-block-all-content%})


## See Also

* [Live Demos: Window](https://demos.telerik.com/blazor-ui/window/index)
* [Window Size, Maximize, Minimize]({%slug components/window/size%})
* [Window Actions]({%slug components/window/actions%})
* [Window Events]({%slug window-events%})
* [Window Position]({%slug components/window/position%})
* [Modal Window]({%slug components/window/modal%})
