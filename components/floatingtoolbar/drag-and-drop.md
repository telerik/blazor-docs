---
title: Drag Support
page_title: Floating Toolbar Drag Support
description: Enable pointer drag and keyboard Move mode for the Blazor Floating Toolbar.
slug: floatingtoolbar-drag-and-drop
tags: telerik,blazor,floating toolbar,drag,keyboard navigation
published: True
position: 3
components: ["floatingtoolbar"]
---

# Floating Toolbar Drag Support

Set `Draggable` to `true` to allow users to move a Floating Toolbar in free-position mode. The component displays a drag handle and keeps the component inside the viewport while users move it.

````RAZOR
<TelerikFloatingToolBar Visible="@true"
                         Draggable="@true"
                         HorizontalAlign="@FloatingToolBarHorizontalAlign.Center"
                         VerticalAlign="@FloatingToolBarVerticalAlign.Top"
                         VerticalOffset="600"
                         HorizontalOffset="-650"
                         AriaLabel="Canvas tools"
                         OnMove="@OnToolbarMove">
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

Do not set `Draggable` when the Floating Toolbar uses an effective `AnchorSelector`. Anchored and draggable behavior cannot be combined.

## Tracking Position Changes

Handle `OnMove` to track updates from pointer drag, keyboard Move mode, and `SetPositionAsync`. Handle `OnDragEnd` to store a position after a user commits a drag operation. Refer to [Floating Toolbar events](slug:floatingtoolbar-events) for the available event arguments.

## See Also

* [Floating Toolbar Positioning](slug:floatingtoolbar-positioning)
* [Floating Toolbar Events](slug:floatingtoolbar-events)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)