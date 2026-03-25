---
title: State Management
page_title: TabStrip - State Management
description: Learn how to save, restore, and manipulate the state of the Telerik TabStrip for Blazor.
slug: tabstrip-state
tags: telerik,blazor,tabstrip,state
published: True
position: 18
tag: new
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

* [OnStateChanged](slug:tabstrip-events#onstatechanged)
* [OnStateInit](slug:tabstrip-events#onstateinit)

## Methods

Access the TabStrip state at any time through its reference and methods:

| Method | Return Type | Description |
| --- | --- | --- |
| `GetState` | `TabStripState` | Returns the current state of the TabStrip. |
| `SetState` | `void` | Accepts a `TabStripState` object and applies it to the TabStrip. |

>tip To reorder tabs programmatically, get the current state, reorder the items in the `TabStates` collection, and pass the modified state back with `SetState`.

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
    private TelerikTabStrip? TabStripRef;

    private async Task SetActiveTab()
    {
        var state = TabStripRef!.GetState();
        state.ActiveTabId = "tab2";
        await TabStripRef.SetState(state);
    }
}
````

## See Also

* [TabStrip Events](slug:tabstrip-events)
* [Tab Reordering](slug:tabstrip-tab-reorder)
* [Tabs Configuration](slug:tabstrip-tabs-configuration)
