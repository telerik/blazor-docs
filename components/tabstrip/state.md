---
title: State Management
page_title: TabStrip - State Management
description: Learn how to save, restore, and manipulate the state of the Telerik TabStrip for Blazor.
slug: tabstrip-state
tags: telerik,blazor,tabstrip,state
published: True
position: 18
components: ["tabstrip"]
---

# TabStrip State Management

The Telerik TabStrip for Blazor exposes state management capabilities through events and methods. Use them to save, restore, and programmatically manipulate the component state—for example, to persist it across page visits or to respond to state changes.

## TabStrip State

The `TabStripState` object describes the current state of the TabStrip:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `ActiveTabId` | `string` | The ID of the currently active tab. |
| `TabStates` | `List<TabStripTabState>` | A collection of individual tab states. The tab states are returned in the same order as the tabs currently appear in the TabStrip. To reorder tabs programmatically, change the order of the objects in this collection and pass the new state via `SetState`. |

Each `TabStripTabState` object represents the state of a single tab:

| Property | Type | Description |
| --- | --- | --- |
| `Id` | `string` | The ID of the tab. |
| `Visible` | `bool` | Whether the tab is visible. |
| `Pinned` | `bool` | Whether the tab is pinned. |

## Events

### OnStateInit

The `OnStateInit` event fires once when the TabStrip initializes its state, before it starts raising regular state change notifications. Use this event to inspect, customize, or restore the initial state—for example, from browser storage or a database.

The event handler receives a `TabStripStateEventArgs` argument with a `TabStripState` property.

>caption Restore the TabStrip state on initialization

````RAZOR
<TelerikTabStrip OnStateInit="@OnTabStripStateInit">
    <TabStripTab Title="First" Id="tab1">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second" Id="tab2">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third" Id="tab3">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    private void OnTabStripStateInit(TabStripStateEventArgs args)
    {
        // Restore a saved state, for example from local storage or a service.
        args.TabStripState.ActiveTabId = "tab2";
    }
}
````

### OnStateChanged

The `OnStateChanged` event fires after initialization whenever the TabStrip state changes. This includes changes to the active tab, tab visibility, tab pinned state, and tab order (after a reorder operation).

The event handler receives a `TabStripStateEventArgs` argument with a `TabStripState` property.

>caption Save the TabStrip state when it changes

````RAZOR
<TelerikTabStrip OnStateChanged="@OnTabStripStateChanged">
    <TabStripTab Title="First" Id="tab1">
        <p>First tab content.</p>
    </TabStripTab>
    <TabStripTab Title="Second" Id="tab2">
        <p>Second tab content.</p>
    </TabStripTab>
    <TabStripTab Title="Third" Id="tab3">
        <p>Third tab content.</p>
    </TabStripTab>
</TelerikTabStrip>

<div class="mt-3">
    <strong>Active tab ID:</strong> @ActiveTabId
</div>

<div class="mt-2">
    <strong>Last state change:</strong> @LastStateChange
</div>

@code {
    private string? ActiveTabId { get; set; }
    private string? LastStateChange { get; set; }

    private void OnTabStripStateChanged(TabStripStateEventArgs args)
    {
        ActiveTabId = args.TabStripState.ActiveTabId;
        LastStateChange = DateTime.Now.ToString("HH:mm:ss");

        Console.WriteLine($"Active tab changed to: {ActiveTabId}");
        // Save the state, for example to local storage or a service.
    }
}
````

## Methods

Access the TabStrip state at any time through its reference and methods:

| Method | Return Type | Description |
| --- | --- | --- |
| `GetState` | `TabStripState` | Returns the current state of the TabStrip. |
| `SetState` | `void` | Accepts a `TabStripState` object and applies it to the TabStrip. |

>caption Get and set the TabStrip state programmatically

````RAZOR
<TelerikButton OnClick="@SetActiveTab">Activate Second Tab</TelerikButton>

<TelerikTabStrip @ref="@TabStripRef">
    <TabStripTab Title="First" Id="tab1">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second" Id="tab2">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third" Id="tab3">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    private TelerikTabStrip TabStripRef { get; set; }

    private void SetActiveTab()
    {
        var state = TabStripRef.GetState();
        state.ActiveTabId = "tab2";
        TabStripRef.SetState(state);
    }
}
````

>tip To reorder tabs programmatically, get the current state, reorder the items in the `TabStates` collection, and pass the modified state back with `SetState`.

## See Also

* [TabStrip Events](slug:tabstrip-events)
* [Tab Reordering](slug:tabstrip-tab-reorder)
* [Tabs Configuration](slug:tabstrip-tabs-configuration)
