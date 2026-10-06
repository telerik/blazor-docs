---
title: Events
page_title: Floating Toolbar Events
description: Handle visibility and drag events in the Blazor Floating Toolbar.
slug: floatingtoolbar-events
tags: telerik,blazor,floating toolbar,events
published: True
position: 50
components: ["floatingtoolbar"]
---

# Floating Toolbar Events

This article explains the events available in the Telerik Floating Toolbar for Blazor:

* [`OnDragEnd`](#ondragend)
* [`OnDragStart`](#ondragstart)
* [`OnMove`](#onmove)
* [`VisibleChanged`](#visiblechanged)

The [ToolBar tools](slug:toolbar-events) that you add to the Floating Toolbar expose their own events.

## OnDragEnd

The `OnDragEnd` event fires when a pointer drag ends or keyboard Move mode commits the toolbar position. The event handler receives a [`FloatingToolBarDragEndEventArgs`](slug:Telerik.Blazor.Components.FloatingToolBarDragEndEventArgs) argument with the final `Top` and `Left` viewport-relative coordinates in CSS pixels.

````RAZOR.skip-repl
<TelerikFloatingToolBar Draggable="@true"
                        OnDragEnd="@OnFloatingToolBarDragEnd" />

@code {
    private void OnFloatingToolBarDragEnd(FloatingToolBarDragEndEventArgs args)
    {
        Console.WriteLine($"Toolbar position: {args.Left}, {args.Top}.");
    }
}
````

## OnDragStart

The `OnDragStart` event fires before pointer drag or keyboard Move mode starts. The event handler receives a [`FloatingToolBarDragStartEventArgs`](slug:Telerik.Blazor.Components.FloatingToolBarDragStartEventArgs) argument with the initial `Top` and `Left` viewport-relative coordinates in CSS pixels. Set `IsCancelled` to `true` to prevent movement.

````RAZOR.skip-repl
<TelerikFloatingToolBar Draggable="@true"
                        OnDragStart="@OnFloatingToolBarDragStart" />

@code {
    private void OnFloatingToolBarDragStart(FloatingToolBarDragStartEventArgs args)
    {
        Console.WriteLine($"Toolbar drag started at {args.Left}, {args.Top}.");
    }
}
````

## OnMove

The `OnMove` event fires when pointer drag, keyboard Move mode, or `SetPositionAsync` changes the Floating Toolbar position. The event handler receives a [`FloatingToolBarMoveEventArgs`](slug:Telerik.Blazor.Components.FloatingToolBarMoveEventArgs) argument with the current `Top` and `Left` viewport-relative coordinates in CSS pixels. `OnMove` and `OnDragEnd` do not support cancellation. The component keeps a draggable Floating Toolbar inside the viewport.

````RAZOR.skip-repl
<TelerikFloatingToolBar Draggable="@true"
                        OnMove="@OnFloatingToolBarMove" />

@code {
    private void OnFloatingToolBarMove(FloatingToolBarMoveEventArgs args)
    {
        Console.WriteLine($"Toolbar moved to {args.Left}, {args.Top}.");
    }
}
````

## VisibleChanged

The `VisibleChanged` event fires after the effective visibility changes. It receives a `bool` argument with the new visibility state. Handle the event to synchronize the `Visible` parameter with application state.

`VisibleChanged` also fires after `ShowAsync()` or `HideAsync()` changes the effective visibility. Calling `ShowAsync()` while the component is already visible does not raise `VisibleChanged`.

````RAZOR.skip-repl
<TelerikFloatingToolBar Visible="@IsToolbarVisible"
                        VisibleChanged="@OnFloatingToolBarVisibleChanged" />

@code {
    private bool IsToolbarVisible;

    private void OnFloatingToolBarVisibleChanged(bool newValue)
    {
        IsToolbarVisible = newValue;
    }
}
````

## Example

The following example demonstrates all Floating Toolbar events.

````RAZOR
<TelerikFloatingToolBar Visible="@IsToolbarVisible"
                        VisibleChanged="@OnFloatingToolBarVisibleChanged"
                        Draggable="@true"
                        AriaLabel="Map tools"
                        OnDragStart="@OnFloatingToolBarDragStart"
                        OnMove="@OnFloatingToolBarMove"
                        OnDragEnd="@OnFloatingToolBarDragEnd">
    <ToolBarButton>Zoom In</ToolBarButton>
    <ToolBarButton>Zoom Out</ToolBarButton>
</TelerikFloatingToolBar>

<label>
    <TelerikCheckBox @bind-Value="@IsToolbarClosable" />
    Users can hide the Floating Toolbar:
</label>

<TelerikButton OnClick="@(() => IsToolbarVisible = !IsToolbarVisible)">Toggle tools</TelerikButton>

<p>Toolbar Visible: @IsToolbarVisible</p>

@code {
    private bool IsToolbarVisible { get; set; }

    private bool IsToolbarClosable { get; set; } = true;

    private void OnFloatingToolBarDragEnd(FloatingToolBarDragEndEventArgs args)
    {
        Console.WriteLine($"Toolbar position: {args.Left}, {args.Top}.");
    }

    private void OnFloatingToolBarDragStart(FloatingToolBarDragStartEventArgs args)
    {
        Console.WriteLine($"Toolbar drag started at {args.Left}, {args.Top}.");
    }

    private void OnFloatingToolBarMove(FloatingToolBarMoveEventArgs args)
    {
        Console.WriteLine($"Toolbar moved to {args.Left}, {args.Top}.");
    }

    private void OnFloatingToolBarVisibleChanged(bool newValue)
    {
        if (IsToolbarClosable)
        {
            IsToolbarVisible = newValue;
        }
    }
}
````

## See Also

* [Enable Floating Toolbar Drag Support](slug:floatingtoolbar-drag-and-drop)
* [Floating Toolbar Positioning](slug:floatingtoolbar-positioning)
* [ToolBar Events](slug:toolbar-events)