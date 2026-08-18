---
title: State
page_title: DockManager - State
description: Save, load, change the DockManager for Blazor state - docking, undocking, resizing and so on.
slug: dockmanager-state
tags: telerik,blazor,dockmanager,state,save,load,layout,set,change,management
published: True
position: 15
components: ["dockmanager"]
---

# DockManager State

The DockManager lets you read, save, load, and change its state through code. The state includes the DockManager features that are controlled by the user, such as the pane resizing, orientation, pinning, docking, and many others.

This article describes:

* [The properties of the `DockManagerState` object](#information-in-the-dockmanager-state).
* [How to set initial DockManager configuration programmatically in `OnStateInit`](#onstateinit).
* [How to detect user changes in the DockManager state with `OnStateChanged`](#onstatechanged).
* [How to use DockManager methods to get and set the DockManager state](#methods).

## Information in the DockManager State

The `DockManagerState` object exposes a collection of all the floating panes including their [settings](slug:dockmanager-overview#dockmanager-parameters).

## Events

The DockManager features two events, which are related to its state.

* [OnStateInit](#onstateinit)
* [OnStateChanged](#onstatechanged)

### OnStateInit

The `OnStateInit` event fires when the DockManager is initializing. Use this event to:

* Define initial state, for example default initial panes position;
* Load and apply state that was previously saved in a database or in `localStorage`.

The event argument is of type `DockManagerStateEventArgs` and has a `DockManagerState` property. See [Information in the DockManager State](#information-in-the-dockmanager-state) for details.

### OnStateChanged

`OnStateChanged` fires when the user performs an action that changes the value of a [property in the DockManager state](#information-in-the-dockmanager-state). The event argument is of type `DockManagerStateEventArgs` and exposes the component current `DockManagerState`.

## Methods

The `GetState` and `SetState` methods of the [DockManager instance](slug:dockmanager-overview#dockmanager-reference) let you get and set the current DockManager state on demand at any time *after* [`OnStateInit`](#onstateinit).

* `GetState` returns the current DockManager state, so you can save it or [retrieve specific information](#information-in-the-dockmanager-state). For example, you can use `GetState` to get the current panes position. Or, you can get the current panes size.

* `SetStateAsync` receives an instance of a `DockManagerState` object and applies it to the DockManager. For example, you can have a button that puts the DockManager in a certain configuration programmatically, for example pane positioning, docking, etc.

If you want to make changes to the current DockManager state:

1. First, get the current state with the `GetState` method.
2. Apply the desired modifications to the obtained `DockManagerState` object.
3. Set the modified state object via the `SetState` method.

> Do not use `GetState()` in the [`OnStateInit`](#onstateinit) or [`OnStateChanged`](#onstatechanged) events. Do not use `SetState()` in `OnStateInit`. Instead, get or set the `DockManagerState` property of the event argument.

>tip To reset the DockManager state to its initial markup configuration, use the `GetState()` and `SetState()` methods. The [Reset DockManager State on Button Click in Blazor](slug:dockmanager-kb-reset-state) KB article demonstrates this approach.

## Example

The example below shows how to restore the previous state of the DockManager on page refresh.

>caption Using DockManager State Events and Methods

<demo metaUrl="client/dockmanager/state/" height="800"></demo>

## See Also

* [Live Demo: DockManager](https://demos.telerik.com/blazor-ui/dockmanager/overview)
* [DockManagerState API reference](slug:Telerik.Blazor.Components.TelerikDockManager)
* [Blazor DockManager](slug:dockmanager-overview)
* [Reset DockManager State on Button Click](slug:dockmanager-kb-reset-state)