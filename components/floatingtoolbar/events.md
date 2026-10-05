---
title: Events
page_title: Floating Toolbar Events
description: Handle visibility and drag events in the Blazor Floating Toolbar.
slug: floatingtoolbar-events
tags: telerik,blazor,floating toolbar,events
published: True
position: 5
components: ["floatingtoolbar"]
---

# Floating Toolbar Events

The Floating Toolbar provides visibility and drag events. The [ToolBar tools](slug:toolbar-events) that you add to the Floating Toolbar expose their own events.

| Event | Event arguments | Description |
| --- | --- | --- |
| `VisibleChanged` | `bool` | Fires after the effective visibility changes. Supports `@bind-Visible`. |
| `OnDragStart` | `FloatingToolBarDragStartEventArgs` | Fires before pointer drag or keyboard Move mode starts. Set `IsCancelled` to `true` to prevent movement. |
| `OnMove` | `FloatingToolBarMoveEventArgs` | Fires when pointer drag, keyboard Move mode, or `SetPositionAsync` changes the component position. |
| `OnDragEnd` | `FloatingToolBarDragEndEventArgs` | Fires when a pointer drag ends or keyboard Move mode commits its position. |

## Visibility Changes

Handle `VisibleChanged` to synchronize application state with the Floating Toolbar visibility.

````RAZOR
<div id="product-tools-anchor" aria-label="Product tools anchor"></div>

<TelerikFloatingToolBar Visible="@IsToolbarVisible"
                        VisibleChanged="@OnToolbarVisibleChanged"
                        AnchorSelector="#product-tools-anchor"
                        AriaLabel="Product tools">
    <ToolBarButton>Edit</ToolBarButton>
    <ToolBarButton>Delete</ToolBarButton>
</TelerikFloatingToolBar>

<label>
    <TelerikCheckBox @bind-Value="@IsToolbarClosable" />
    Users can hide the Floating Toolbar:
</label>

<TelerikButton OnClick="@(() => IsToolbarVisible = !IsToolbarVisible)">Toggle tools</TelerikButton>

<p>Toolbar Visible: @IsToolbarVisible</p>

@code {
    private bool IsToolbarVisible;

    private bool IsToolbarClosable { get; set; } = true;

    private void OnToolbarVisibleChanged(bool newValue)
    {
        if (IsToolbarClosable)
        {
            IsToolbarVisible = newValue;
        }
    }
}
````

`VisibleChanged` also fires after `ShowAsync()` or `HideAsync()` changes the effective visibility. Calling `ShowAsync()` while the component is already visible does not raise `VisibleChanged`.

## Drag Events

Use drag events to validate a move and persist the final location.

````RAZOR
<TelerikFloatingToolBar Visible="@true"
                        Draggable="@true"
                        AriaLabel="Map tools"
                        OnDragStart="@OnDragStart"
                        OnMove="@OnMove"
                        OnDragEnd="@OnDragEnd">
    <ToolBarButton>Zoom in</ToolBarButton>
    <ToolBarButton>Zoom out</ToolBarButton>
</TelerikFloatingToolBar>

@code {
    private void OnDragStart(FloatingToolBarDragStartEventArgs args)
    {
        if (args.Top < 0)
        {
            args.IsCancelled = true;
        }
    }

    private void OnMove(FloatingToolBarMoveEventArgs args)
    {
        Console.WriteLine($"Toolbar moved to {args.Left}, {args.Top}.");
    }

    private void OnDragEnd(FloatingToolBarDragEndEventArgs args)
    {
        Console.WriteLine($"Toolbar position: {args.Left}, {args.Top}.");
    }
}
````

`FloatingToolBarDragStartEventArgs`, `FloatingToolBarMoveEventArgs`, and `FloatingToolBarDragEndEventArgs` expose `Top` and `Left` viewport-relative coordinates in CSS pixels. Only `FloatingToolBarDragStartEventArgs` exposes `IsCancelled`.

## See Also

* [Enable Floating Toolbar Drag Support](slug:floatingtoolbar-drag-and-drop)
* [Floating Toolbar Positioning](slug:floatingtoolbar-positioning)
* [ToolBar Events](slug:toolbar-events)