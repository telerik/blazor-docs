---
title:  Drag And Drop
page_title: Floating Toolbar Drag And Drop
description: Enable pointer drag and keyboard Move mode for the Blazor Floating Toolbar.
slug: floatingtoolbar-drag-and-drop
tags: telerik,blazor,floating toolbar,drag,keyboard navigation
published: True
position: 30
components: ["floatingtoolbar"]
---

# Floating Toolbar Drag And Drop

Set `Draggable` to `true` to allow users to move a Floating Toolbar in free-position mode. The component displays a drag handle and keeps the component inside the viewport while users move it.

Do not set `Draggable` when the Floating Toolbar uses an effective `AnchorSelector`. Anchored and draggable behavior cannot be combined.

````RAZOR
<TelerikFloatingToolBar AriaLabel="Canvas tools"
                        Draggable="@true"
                        HorizontalAlign="@FloatingToolBarHorizontalAlign.Center"
                        HorizontalOffset="-650"
                        OnMove="@OnToolbarMove"
                        VerticalAlign="@FloatingToolBarVerticalAlign.Top"
                        VerticalOffset="600"
                        Visible="@true">
    <ToolBarButton>Select</ToolBarButton>
    <ToolBarButton>Pan</ToolBarButton>
    <ToolBarButton>Zoom</ToolBarButton>
</TelerikFloatingToolBar>

@code {
    private void OnToolbarMove(FloatingToolBarMoveEventArgs args)
    {
        Console.WriteLine($"Toolbar moved to {args.Left}, {args.Top}.");
    }
}
````

The component supports pointer drag and keyboard Move mode:

| Key | Behavior |
| --- | --- |
| `M` | Requests `OnDragStart` and enters Move mode when the focused drag handle allows the operation. |
| Arrow keys | Moves the component in the selected direction while Move mode is active. |
| `Enter` | Commits the position, raises `OnDragEnd`, and exits Move mode. |


## Tracking Position Changes

Handle `OnMove` to track updates from pointer drag, keyboard Move mode, and `SetPositionAsync`. Handle `OnDragEnd` to store a position after a user commits a drag operation. Refer to [Floating Toolbar events](slug:floatingtoolbar-events) for the available event arguments.

## See Also

* [Floating Toolbar Positioning](slug:floatingtoolbar-positioning)
* [Floating Toolbar Events](slug:floatingtoolbar-events)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)