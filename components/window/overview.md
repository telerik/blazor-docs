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

## Creating Blazor Window

1. Use the `TelerikWindow` tag.
1. Bind the `Visible` parameter to a `bool` property. It supports one-way and two-way binding.
1. Add content to the `WindowContent` child tag.
1. (optional) Add some title inside a `WindowTitle` tag. HTML markup and child components are supported, too.
1. (optional) Add a [`Close` action]({%slug components/window/actions%}) inside a `<WindowActions>` tag.
1. (optional) Add a `WindowFooter` tag to include custom content in the bottom section of the Window.

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
    <WindowFooter>
        Window Footer Content ...
    </WindowFooter>
</TelerikWindow>

<TelerikButton OnClick="@( () => WindowIsVisible = !WindowIsVisible )">Toggle window</TelerikButton>

@code {
    bool WindowIsVisible { get; set; }
}
````

## Size

The Window can occupy a predefined size on the screen or expand automatically based on the content. By default, users can resize the Window. [Read more about the Blazor Window size...]({%slug components/window/size%})

## Position

You can offset the position of the component with the `Top` and `Left` parameters. [Read more about the Blazor Window position...]({%slug components/window/position%})

## Actions

You can maximize, minimize, or close the Window through the action buttons in its titlebar. [Read more about the Blazor Window action buttons...]({%slug components/window/actions%})

## Dragging

You can move the Window on the page by dragging its titlebar. [Read more about the Blazor Window dragging option...]({%slug window-draggable%})

## Modal

The Window can be modal and prevent interacting with the rest of the page until it closes. [Read more about the Blazor Window Modal...]({%slug components/window/modal%})

## Events

The Window component fires events for visibility, state, size, and position changes. Use these events to respond to user actions. [Read more about the Blazor Window Events...]({%slug window-events%})

## Window Parameters

The following table lists the Window parameters, which are not discussed elsewhere in the component documentation. Also check the [Window API](/blazor-ui/api/Telerik.Blazor.Components.TelerikWindow) for a full list of parameters and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class of the `<div class="k-window">` element. Use it to [override theme styles]({%slug themes-override%}). Here is a [custom Window styling example]({%slug window-kb-custom-css-styling%}). |
| `PersistContent` | `bool` | Determines if the Window content will be removed from the DOM (default) or hidden with CSS when the [Window is minimized]({%slug components/window/size%}#maximize-and-minimize). |
| `Size` | `string` | A predefined Window **width**. Use the string members of the static class `ThemeConstants.Window.Size` - `Small`, `Medium`, and `Large`. They translate to widths of `300px`, `800px` and `1200px`, respectively. If set, the `Width` parameter will take precedence over `Size`. |
| `ThemeColor` | `string` | A predefined color scheme for the Window, especially the titlebar. Use the available members of the static class [`ThemeConstants.Window.ThemeColor`](/blazor-ui/api/Telerik.Blazor.ThemeConstants.Window.ThemeColor). |
| `Visible` | `bool` | Defines if the Window is rendered and visible on the page. |
| `FooterLayoutAlign` | `WindowFooterLayoutAlign` enum <br /> (`Stretch`) | Controls the alignment of the HTML elements in the `WindowFooter`. Takes a member of the `WindowFooterLayoutAlign` enum. The possible options are `Stretch`, `Start`, `End`, and `Center`. |

## Window Reference and Methods

The Window methods are accessible through its reference.

| Method | Description |
| --- | --- |
| `Refresh` | Redraws the component. |

>caption Get a reference to the Window and use its methods.

````CSHTML
@* This code snippet showcases an example usage of the Refresh() method. *@

<TelerikButton OnClick="OpenWindow">Open Window</TelerikButton>

<TelerikWindow @ref="WindowRef" @bind-Visible="_windowVisible">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        <p role="status">Current count: @_currentCount</p>
        <TelerikButton OnClick="IncrementCount">Increment Count</TelerikButton>
        <TelerikButton OnClick="@(() => { _windowVisible = false; })">Close</TelerikButton>
    </WindowContent>
</TelerikWindow>

@code {
    TelerikWindow WindowRef;

    private bool _windowVisible;

    private int _currentCount = 0;

    private void IncrementCount()
    {
        _currentCount++;

        WindowRef.Refresh();
    }

    private void OpenWindow()
    {
        _windowVisible = true;
    }
}
````

### Responsiveness

The Window component can adapt to different screen sizes by making it responsive to changes in the browser window. Here is an [example that shows the two possible ways to achieve responsive Window behavior]({%slug window-kb-responsive%}). The first method involves utilizing the `Width` and `Height` parameters of the component. The second method is to apply custom CSS styles.

### Important Notes

The Telerik Window component renders as a child of the [`TelerikRootComponent`]({%slug rootcomponent-overview%}) at the root of the Blazor app. This is required, so it can show over the other page content, and have correct position.

In Blazor, however, the render tree structure may be important. In some cases, the special Window placement may put you in one of the following situations:

* [Block all content with a Window]({%slug window-kb-block-all-content%})
* [CascadingParameter Value is null in the Window]({%slug window-cascading-parameter-null%})
* [The Window does not display its child items data]({%slug window-kb-does-not-display-child-items-data%})
* [Returning data from a Window does not update the parent]({%slug window-does-not-update-parent%})
* [Using an EditContext for a form holding a Window requires updating the EditContext]({%slug window-in-form-edit-context%})

## Next Steps

* [Define Window actions]({%slug components/window/actions%})
* [Configure the Window position]({%slug components/window/position%})
* [Set the Window size, minimized, and maximized state]({%slug components/window/size%})
* [Handle Window events]({%slug window-events%})

## See Also

* [Live Demo: Window](https://demos.telerik.com/blazor-ui/window/index)
* [Window API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikWindow)
* [Comparison between All Popup Components]({%slug common-kb-popup-component-comparison%})
