---
title: Events
page_title: TabStrip - Events
description: Learn about the events and event arguments of the Telerik TabStrip for Blazor.
slug: tabstrip-events
tags: telerik, blazor, tabstrip, events
published: True
position: 100
components: ["tabstrip"]
---

# TabStrip Events

This article explains the events available in the Telerik TabStrip for Blazor:

* [`ActiveTabIdChanged`](#activetabidchanged)
* [`OnStateChanged`](#onstatechanged)
* [`OnStateInit`](#onstateinit)
* [`OnTabDrop`](#ontabdrop)
* [`OnTabReorder`](#ontabreorder)
* [`PinnedChanged`](#pinnedchanged)
* [`VisibleChanged`](#visiblechanged)

## ActiveTabIdChanged

The `ActiveTabIdChanged` event was added in [version 9.0.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/telerik-ui-for-blazor-9-0-0-(2025-q2)). It fires when the user changes the active tab. The event handler receives the new tab `Id` as a `string` argument. If the `Id` parameter of the `TabStripTab` is not set, the component generates a `Guid` automatically during initialization.

The `ActiveTabIdChanged` event is designed to work with the `ActiveTabId` parameter. Update the `ActiveTabId` parameter value manually in the `ActiveTabIdChanged` handler.

>caption Using the TabStrip ActiveTabIdChanged event

<demo metaUrl="client/tabstrip/events/example-7/" height="420"></demo>

## OnStateChanged

The `OnStateChanged` event fires whenever the user interacts with the TabStrip and changes the active tab, visible tabs, pinned tabs, or tab order.

The event handler receives a [`TabStripStateEventArgs`](slug:Telerik.Blazor.Components.TabStripStateEventArgs) argument with a `TabStripState` property. Read more details in the [State Management](slug:tabstrip-state) article.

>caption Using the TabStrip OnStateChanged event

<demo metaUrl="client/tabstrip/events/example-6/" height="420"></demo>

## OnStateInit

The `OnStateInit` event fires once when the TabStrip initializes. Unlike other Telerik Blazor components where `OnStateInit` fires early in the component lifecycle, the TabStrip fires it during `OnAfterRenderAsync` on the first render. This later timing is required by the component to detect which tabs are overflowing before the initial state is reported.

Use this event to inspect, customize, or restore the initial state of the TabStrip, for example, from a persistent storage.

When setting the active tab through the TabStrip state, also set the `ActiveTabId` parameter.

The event handler receives a [`TabStripStateEventArgs`](slug:Telerik.Blazor.Components.TabStripStateEventArgs) argument with a `TabStripState` property. Read more details in the [State Management](slug:tabstrip-state) article.

>caption Using the TabStrip OnStateInit event

<demo metaUrl="client/tabstrip/events/example-5/" height="420"></demo>

## OnTabDrop

The `OnTabDrop` event fires when the user completes a tab reorder and releases the dragged tab. Unlike the [`OnTabReorder`](#ontabreorder) event, `OnTabDrop` always fires once per reorder operation.

The `OnTabDrop` event handler receives a [`TabStripTabDropEventArgs`](slug:Telerik.Blazor.Components.TabStripTabDropEventArgs) argument.

To [enable tab reordering](slug:tabstrip-reordering-pinning), set the TabStrip `EnableTabReorder` parameter to `true`.

>caption Using the TabStrip OnTabDrop event

<demo metaUrl="client/tabstrip/events/example-4/" height="420"></demo>

## OnTabReorder

The `OnTabReorder` event fires when a tab changes its order index during user dragging. The event can fire multiple times during a single user reorder operation. Compare with [`OnTabDrop`](#ontabdrop), which fires only once per reorder operation.

The `OnTabReorder` event handler receives a [`TabStripTabReorderEventArgs`](slug:Telerik.Blazor.Components.TabStripTabReorderEventArgs) argument.

To [enable tab reordering](slug:tabstrip-reordering-pinning), set the TabStrip `EnableTabReorder` parameter to `true`.

Tab reordering also triggers the [`OnStateChanged` event](#onstatechanged), which fires before `OnTabReorder`.

>caption Using the TabStrip OnTabReorder event

<demo metaUrl="client/tabstrip/events/example-3/" height="420"></demo>

## PinnedChanged

The Tab `PinnedChanged` event fires when the user [pins or unpins a tab](slug:tabstrip-reordering-pinning). The event handler receives a boolean value with the new tab pinned state.

Update the `Pinned` parameter value in the `PinnedChanged` handler.

>caption Using the TabStripTab PinnedChanged event

<demo metaUrl="client/tabstrip/events/example-2/" height="420"></demo>

## VisibleChanged

The Tab `VisibleChanged` event fires when the user [closes a tab](slug:tabstrip-dynamic-tabs#hiding-and-showing-tabs). The event handler receives a boolean value with the new tab visibility.

Update the `Visible` parameter value in the `VisibleChanged` handler. You can also [display a confirmation prompt](slug:tabstrip-dynamic-tabs#hiding-and-showing-tabs) before hiding a tab or [reuse a single handler for multiple tabs](slug:tabstrip-dynamic-tabs#example).

>caption Using the TabStripTab VisibleChanged event

<demo metaUrl="client/tabstrip/events/example-1/" height="420"></demo>

## See Also

* [TabStrip Overview](slug:tabstrip-overview)
* [Dynamic Tabs](slug:tabstrip-dynamic-tabs)
* [Tab Reordering](slug:tabstrip-reordering-pinning)
* [State Management](slug:tabstrip-state)
