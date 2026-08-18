---
title: Events
page_title: DockManager - Events
description: Events in the DockManager for Blazor.
slug: dockmanager-events
tags: telerik,blazor,dockmanager,events
published: true
position: 20
components: ["dockmanager"]
---

# DockManager Events

This article explains the events available in the Telerik DockManager for Blazor:

* [OnDock](#ondock)
* [OnUndock](#ondock)
* [VisibleChanged](#visiblechanged)
* [SizeChanged](#sizechanged)
* [UnpinnedChanged](#unpinnedchanged)
* [UnpinnedSizeChanged](#unpinnedsizechanged)
* [OnPaneResize](#onpaneresize)
* [State Events](#state-events)
* [OnPin](#onpin)
* [OnUnpin](#onunpin)

## OnDock

The `OnDock` event fires when any pane is docked.

The event handler receives as an argument an `DockManagerDockEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `DockPosition` | `DockManagerDockPosition` | The position where the pane is being docked. The possible options are: `Left`, `Right`, `Top`, `Bottom`, `Middle`. |
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the floating pane that is being docked. |
| `TargetPaneId` | `string` | The Id of the target pane. |

## OnUndock

The `OnUndock` event fires when any pane is undocked.

The event handler receives as an argument an `DockManagerUndockEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the floating pane that is being undocked. |

## VisibleChanged

The `VisibleChanged` event fires when the user tries to hide a given pane. You can effectively cancel the event by not propagating the new visibility state to the variable the `Visible` property is bound to. This is the way to cancel the event and keep the pane visible.

## SizeChanged

The `SizeChanged` event fireswhen the `Size` parameter of the corresponding pane changes.

## UnpinnedChanged

The `UnpinnedChanged` event fireswhen the `Unpinned` parameter of the corresponding pane changes.

## UnpinnedSizeChanged

The `UnpinnedSizeChanged` event fires when the `UnpinnedSize` parameter of the corresponding pane changes.

## OnPaneResize

The `OnPaneResize` event fires when a pane is resized, except unpinned panes. It lets you respond to that change if needed - for example, call the `.Refresh()` method of a chart or otherwise repaint a child component in the content. You can also use it to, for example, update the saved [state](slug:dockmanager-state) for your users.

The event handler receives as an argument an `DockManagerPaneResizeEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `PaneId` | `string` | The Id of the pane that is being resized. |
| `Size` | `string` | The new size of the resized pane. |

## State Events

The DockManager state lets you control through code the aspects of the DockManager the user can control in the UI - such as docking, undocking, resizing panes and etc. The DockManager provides two events related to the state:

* `OnStateInit` - fires when the DockManager initializes so you can provide a stored version of the grid.

* `OnStateChanged` - fires when the user performs an action so you can see what area was changed and, if needed, alter the component state.

Review the [DockManager state](slug:dockmanager-state) article for more details and examples on how the grid state works and what you can do with it.

## OnPin

The `OnPin` event fires when any pane is pinned.

The event handler receives as an argument an `DockManagerPinEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the pane that is being pinned. |

## OnUnpin

The `OnUnpin` event fires when any pane is unpinned.

The event handler receives as an argument an `DockManagerUnpinEventArgs` object that contains:

| Property | Type | Description |
|---|---|---|
| `IsCancelled` | `bool` <br /> (`false`) | Set the `IsCancelled` property to `true` to cancel the event. |
| `PaneId` | `string` | The Id of the pane that is being unpinned. |

## Example

>caption DockManager with all available events.

<demo metaUrl="client/dockmanager/events/" height="850"></demo>

## Next Steps

* [Manage the Dock Manager state](slug:dockmanager-state).


## See Also

* [DockManager Overview](slug:dockmanager-overview)
