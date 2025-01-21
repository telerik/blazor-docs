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

The Window component displays a popup with a title bar and shows custom content. The component provides predefined title bar actions, such as Close, Minimize, Maximize, and Restore. The Window component also supports custom actions, modality, resizing, dragging, and position control.

## Creating Blazor Window

1. Use the `TelerikWindow` tag.
1. Bind the `Visible` parameter to a `bool` property. It supports one-way and two-way binding.
1. Add content to the `WindowContent` child tag.
1. (optional) Add some title inside a `WindowTitle` tag. HTML markup and child components are supported, too.
1. (optional) Add a [`Close` action](slug://components/window/actions) inside a `<WindowActions>` tag.
1. (optional) Add a `WindowFooter` tag to include custom content in the bottom section of the Window.

>caption Basic Blazor Window

````RAZOR
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

The Window can occupy a predefined size on the screen or expand automatically based on the content. By default, users can resize the Window. [Read more about the Blazor Window size...](slug://components/window/size)

You can make the Window component responsive and allow it to adapt to different screen sizes and changes in the browser window. Here is an [example that shows the two possible ways to achieve responsive Window behavior](slug://window-kb-responsive). The first method involves utilizing the `Width` and `Height` parameters of the component. The second method is to apply custom CSS styles.

## Position

You can set the position of the Window with the `Top` and `Left` parameters. The component features a boolean `Centered` parameter, which is `true` by default when `Top` and `Left` are not set. The Window component also provides a `ContainmentSelector` parameter that can limit resizing and dragging within the boundaries of a specified container.

Read more about the [Blazor Window position...](slug://components/window/position)

## Actions

You can maximize, minimize, or close the Window through the action buttons in its titlebar. [Read more about the Blazor Window action buttons...](slug://components/window/actions)

## Dragging

You can move the Window on the page by dragging its titlebar. [Read more about the Blazor Window dragging option...](slug://window-draggable)

## Modal

The Window can be modal and prevent interacting with the rest of the page until it closes. [Read more about the Blazor Window Modal...](slug://components/window/modal)

## Events

The Window component fires events for visibility, state, size, and position changes. Use these events to respond to user actions. [Read more about the Blazor Window Events...](slug://window-events)

## Window Parameters

The following table lists the Window parameters. Also check the [Window API](/blazor-ui/api/Telerik.Blazor.Components.TelerikWindow) for a full list of parameters, methods, and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Centered` | `bool` <br /> (`true`) | Determines if the Window displays in the middle of the viewport. This parameter is ignored if `Top` or `Left` is set to a non-empty string. |
| `Class` | `string` | The custom CSS class of the `<div class="k-window">` element. Use it to [override theme styles](slug://themes-override). Here is a [custom Window styling example](slug://window-kb-custom-css-styling). |
| `CloseOnOverlayClick` | `bool` | Sets if a modal Window will close when the user clicks on the modal overlay that covers the rest of the page content. |
| `ContainmentSelector` | `string` | A CSS selector that points to a unique HTML element on the page. The Window will render inside the specified container. Window resizing and dragging will be restricted by the boundaries of the specified container. Do not use `ContainmentSelector` with modal Windows. |
| `Draggable` | `bool` | Sets if the Window allows moving. |
| `FooterLayoutAlign` | `WindowFooterLayoutAlign` enum <br /> (`Stretch`) | The alignment of the HTML elements in the `WindowFooter`. The possible options are `Stretch`, `Start`, `End`, and `Center`. |
| `Height` | `string` | The `height` style of the `<div class="k-window">` element. The parameter supports two-way binding. |
| `Id` | `string` | The `id` attribute of the `<div class="k-window">` element. |
| `Left` | `string` | The `left` style of the Window relative to the browser viewport. The parameter supports two-way binding. If `ContainmentSelector` is set, the left position is with regard to the defined container. |
| `MaxHeight` | `string` | The maximum height of the Window during resizing or initial display. For example, if there is a lot of content and a fixed `Height` is not set. |
| `MaxWidth` | `string` | The maximum width of the Window during resizing or initial display. For example, if there is a lot of content and a fixed `Width` is not set. |
| `MinHeight` | `string` | The minimum height of the Window during resizing or initial display. |
| `MinWidth` | `string` | The maximum width of the Window during resizing or initial display. |
| `Modal` | `bool` | Determines if the Window covers the other page content with a semi-transparent overlay. Do not use modality with `ContainmentSelector`. |
| `PersistContent` | `bool` | Determines if a [minimized Window](slug://components/window/size#maximize-and-minimize) removes its content from the DOM (default) or hides it with CSS. |
| `Resizable` | `bool` <br /> (`true`) | Determines if the Window allows users to change its dimensions. |
| `Size` | `string` | A predefined Window width. Use the string members of the static class `ThemeConstants.Window.Size` - `Small`, `Medium`, and `Large`. They translate to widths of `300px`, `800px` and `1200px`, respectively. If set, the `Width` parameter will take precedence over `Size`. |
| `State` | `WindowState` enum <br /> (`Default`) | The Window state can be `Maximized`, `Minimized`, or `Default`. The parameter supports two-way binding. |
| `ThemeColor` | `string` | A predefined color scheme for the Window, especially the titlebar. Use the available members of the static class [`ThemeConstants.Window.ThemeColor`](/blazor-ui/api/Telerik.Blazor.ThemeConstants.Window.ThemeColor). |
| `Top` | `string` | The `top` style of the Window relative to the browser viewport. The parameter supports two-way binding. If `ContainmentSelector` is set, the top position is with regard to the defined container. |
| `Visible` | `bool` | Defines if the Window is rendered and visible on the page. The parameter supports two-way binding. |
| `Width` | `string` | The `width` style of the `<div class="k-window">` element. The parameter supports two-way binding. |

## Window Reference and Methods

The Window methods are accessible through its reference.

| Method | Description |
| --- | --- |
| `Refresh` | Redraws the component. |

>caption Get a reference to the Window and use its Refresh method.

````RAZOR
<TelerikButton OnClick="@OpenWindow">Open Window</TelerikButton>

<TelerikWindow @ref="WindowRef" @bind-Visible="@WindowVisible">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowContent>
        <p role="status">Current count: @CurrentCount</p>
        <TelerikButton OnClick="IncrementCount">Increment Count</TelerikButton>
    </WindowContent>
</TelerikWindow>

@code {
    private TelerikWindow? WindowRef { get; set; }

    private bool WindowVisible { get; set; }

    private int CurrentCount { get; set; }

    private void IncrementCount()
    {
        CurrentCount++;

        WindowRef?.Refresh();
    }

    private void OpenWindow()
    {
        WindowVisible = true;
    }
}
````

## Important Notes

When [`ContainmentSelector`](slug://components/window/position#containmentselector) is not set, the Telerik Window component renders as a child of the [`TelerikRootComponent`](slug://rootcomponent-overview) at the root of the Blazor app. This placement ensures that the Window can show over all the other page content in all scenarios and have a correct position.

In Blazor, however, the render tree structure may be important. In some cases, the special Window placement may put you in one of the following situations:

* [Block all content with a Window](slug://window-kb-block-all-content)
* [CascadingParameter Value is null in the Window](slug://window-cascading-parameter-null)
* [The Window does not display its child items data](slug://window-kb-does-not-display-child-items-data)
* [Returning data from a Window does not update the parent](slug://window-does-not-update-parent)
* [Using an EditContext for a form holding a Window requires updating the EditContext](slug://window-in-form-edit-context)

## Next Steps

* [Define Window actions](slug://components/window/actions)
* [Configure the Window position](slug://components/window/position)
* [Set the Window size, minimized, and maximized state](slug://components/window/size)
* [Handle Window events](slug://window-events)

## See Also

* [Live Demo: Window](https://demos.telerik.com/blazor-ui/window/overview)
* [Window API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikWindow)
* [Comparison between All Popup Components](slug://common-kb-popup-component-comparison)
