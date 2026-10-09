---
title: State Management
page_title: TabStrip - State Management
description: Learn how to save, restore, and manipulate the state of the Telerik TabStrip for Blazor.
slug: tabstrip-state
tags: telerik,blazor,tabstrip,state
published: True
position: 70
components: ["tabstrip"]
---

# TabStrip State Management

The Telerik TabStrip for Blazor exposes state management capabilities through events and methods. Use them to save, restore, and programmatically manipulate the component state, for example, to persist it across page visits or to respond to state changes.

## Objects

The TabStrip stores its state in the following objects:

* [`TabStripState`](slug:Telerik.Blazor.Components.TabStripState)&mdash;the state of the TabStrip component and all tabs
* [`TabStripTabState`](slug:Telerik.Blazor.Components.TabStripTabState)&mdash;the state of a specific tab

## Events

The TabStrip fires two events that enable you to monitor the component state or set it initially:

* [`OnStateChanged`](slug:tabstrip-events#onstatechanged)
* [`OnStateInit`](slug:tabstrip-events#onstateinit)

Also see the [example](#example) below.

## Methods

The [`GetState` and `SetState` methods](slug:telerik.blazor.components.teleriktabstrip#methods) of the [TabStrip instance](slug:tabstrip-overview#tabstrip-reference-and-methods) let you obtain and define the current TabStrip state on demand at any time after `OnStateInit`.

To make changes to the TabStrip state:

1. Get the current state with the `GetState` method.
1. Apply the desired modifications to the obtained `TabStripState` object.
1. Set the modified state object through the `SetState` method.

> Do not use `GetState()` in the `OnStateInit` or `OnStateChanged` events. Do not use `SetState()` in `OnStateInit`. Instead, get or set the `TabStripState` property of the event argument.

## Example

The following sample demonstrates the TabStrip state-related events and methods in action.

<demo metaUrl="client/tabstrip/state/example-1/" height="620"></demo>

## Next Steps

* [Handle TabStrip events](slug:tabstrip-events)

## See Also

* [TabStrip Tab Position and Alignment](slug:tabstrip-position-alignment)
* [TabStrip Tab Scrolling or Overflow Menu](slug:tabstrip-scrolling-overflow)
