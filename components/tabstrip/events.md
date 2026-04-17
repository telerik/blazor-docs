---
title: Events
page_title: TabStrip - Events
description: Learn about the events and event arguments of the Telerik TabStrip for Blazor.
slug: tabstrip-events
tags: telerik, blazor, tabstrip, events
published: True
position: 20
tag: updated
components: ["tabstrip"]
---
# TabStrip Events

This article explains the events available in the Telerik TabStrip for Blazor:

* [ActiveTabIdChanged](#activetabidchanged)
* [ActiveTabIndexChanged](#activetabindexchanged)
* [OnStateChanged](#onstatechanged)
* [OnStateInit](#onstateinit)
* [OnTabReorder](#ontabreorder)
* [PinnedChanged](#pinnedchanged)

## ActiveTabIdChanged

The `ActiveTabIdChanged` event was added in [version 9.0.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/telerik-ui-for-blazor-9-0-0-(2025-q2)). It fires when the user changes the active tab. The event handler receives the new tab ID of type `string` as an argument. If the `Id` parameter of the `TabStripTab` is not set, the component will generate one automatically.

The `ActiveTabIdChanged` event is designed to work with the new [`ActiveTabId` parameter](slug:tabstrip-tabs-collection). Update the `ActiveTabId` parameter value manually in the `ActiveTabIdChanged` handler.

>caption Handle the TabStrip ActiveTabIdChanged event

````RAZOR
<TelerikTabStrip ActiveTabId="@TabStripActiveTabId"
                 ActiveTabIdChanged="@TabStripActiveTabIdChanged">
    <TabStripTab Title="First" Id="tab1">
        First tab content. Click through the tabs.
    </TabStripTab>
    <TabStripTab Title="Second" Id="tab2">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third" Id="tab3">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

<p>The current active tab is <code>@TabStripActiveTabId</code></p>

@code {
    private string TabStripActiveTabId { get; set; } = "tab1";

    private void TabStripActiveTabIdChanged(string newTabId)
    {
        TabStripActiveTabId = newTabId;
    }
}
````

## ActiveTabIndexChanged 

The `ActiveTabIndexChanged` event fires when the user selects another tab. The event handler receives the new zero-based index as an argument. Update the `ActiveTabIndex` parameter value manually in the `ActiveTabIndexChanged` handler.

If you programmatically remove the currently active tab, the `ActiveTabIndexChanged` event fires with index `-1` as there is no selected tab anymore.

> The `ActiveTabIndexChanged` event and `ActiveTabIndex` parameter will be deprecated in a future product version. Use the [`ActiveTabId`](slug:tabstrip-tabs-collection) parameter with [`ActiveTabIdChanged`](slug:tabstrip-events#activetabidchanged) event instead.

>caption Handle the TabStrip ActiveTabIndexChanged event

````RAZOR
<TelerikTabStrip ActiveTabIndex="@TabStripActiveTabIndex"
                 ActiveTabIndexChanged="@TabStripActiveTabIndexChanged">
    <TabStripTab Title="First">
        First tab content. Click through the tabs.
    </TabStripTab>
    <TabStripTab Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

<p>The current tab index is <code>@TabStripActiveTabIndex</code></p>

@code {
    private int TabStripActiveTabIndex { get; set; }

    private void TabStripActiveTabIndexChanged(int newTabIndex)
    {
        TabStripActiveTabIndex = newTabIndex;
    }
}
````

If you do not update the `ActiveTabIndex` parameter value in the `ActiveTabIndexChanged` handler, the selected tab will not change, so the event will be cancelled.

>caption Cancel the ActiveTabIndexChanged event

````RAZOR
<TelerikTabStrip ActiveTabIndex="@TabStripActiveTabIndex"
                 ActiveTabIndexChanged="@TabStripActiveTabIndexChanged">
    <TabStripTab Title="First">
        First tab content. Click through the tabs.
    </TabStripTab>
    <TabStripTab Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

<p>The current tab index is <code>@TabStripActiveTabIndex</code></p>

@code {
    private int TabStripActiveTabIndex { get; set; }

    private void TabStripActiveTabIndexChanged(int newTabIndex)
    {
        if (newTabIndex != 2)
        {
            TabStripActiveTabIndex = newTabIndex;
        }
    }
}
````

## OnStateChanged

The `OnStateChanged` event fires whenever the user interacts with the TabStrip and changes the active tab, visible tabs, pinned tabs, and tab order.

The event handler receives a `TabStripStateEventArgs` argument with a `TabStripState` property. Read more details in the [State Management](slug:tabstrip-state) article.

>caption Handle the TabStrip OnStateChanged event

````RAZOR
<TelerikTabStrip @bind-ActiveTabId="@ActiveTabId"
                 OnStateChanged="@OnTabStripStateChanged">
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

<p><strong>Active tab ID:</strong> @ActiveTabId</p>

<h4>Tab change history:</h4>
<ul>
    @foreach (var item in TabHistory)
    {
        <li>@item</li>
    }
</ul>

@code {
    private string ActiveTabId { get; set; } = string.Empty;
    private List<string> TabHistory { get; set; } = new();

    private void OnTabStripStateChanged(TabStripStateEventArgs args)
    {
        ActiveTabId = args.TabStripState.ActiveTabId;

        TabHistory.Insert(0, $"{DateTime.Now:HH:mm:ss} → {ActiveTabId}");
    }
}
````

## OnStateInit

The `OnStateInit` event fires once when the TabStrip initializes. Unlike other Telerik Blazor components where `OnStateInit` fires early in the component lifecycle, the TabStrip fires it during `OnAfterRenderAsync` on the first render. This later timing is required so the component can detect which tabs are overflowing before the initial state is reported.

Use this event to inspect, customize, or restore the initial state of the TabStrip—for example, from a persistent storage.

The event handler receives a `TabStripStateEventArgs` argument with a `TabStripState` property. Read more details in the [State Management](slug:tabstrip-state) article.

>caption Handle the TabStrip OnStateInit event

````RAZOR
<TelerikTabStrip ActiveTabId="@TabStripActiveTabId"
                 ActiveTabIdChanged="@OnActiveTabIdChanged"
                 OnStateInit="@OnTabStripStateInit">
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
    private string TabStripActiveTabId { get; set; } = "tab1";

    private void OnActiveTabIdChanged(string newTabId)
    {
        TabStripActiveTabId = newTabId;
    }

    private void OnTabStripStateInit(TabStripStateEventArgs args)
    {
        // For example, restore the active tab from a persistence storage.
        string restoredTabId = RestoreActiveTabIdFromStorage();

        // Update both the state and the bound parameter to keep them in sync.
        args.TabStripState.ActiveTabId = restoredTabId;
        TabStripActiveTabId = restoredTabId;
    }

    private string RestoreActiveTabIdFromStorage()
    {
        // Replace with actual persistence logic.
        return "tab2";
    }
}
````

## OnTabReorder

The `OnTabReorder` event fires when the user completes a drag-and-drop tab reorder. To enable tab reordering, set the `EnableTabReorder` parameter on the TabStrip to `true`. The event handler receives a [`TabStripTabReorderEventArgs`](slug:Telerik.Blazor.Components.TabStripTabReorderEventArgs) argument.

>caption Handle the TabStrip OnTabReorder event

````RAZOR
<TelerikTabStrip ActiveTabId="@TabStripActiveTabId"
                 ActiveTabIdChanged="@OnActiveTabIdChanged"
                 EnableTabReorder="true"
                 OnTabReorder="@OnTabReorder">
    <TabStripTab Title="First" Id="1">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second" Id="2">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third" Id="3">
        Third tab content.
    </TabStripTab>
    <TabStripTab Title="Fourth" Id="4">
        Fourth tab content.
    </TabStripTab>
</TelerikTabStrip>

<p>Active tab: <code>@TabStripActiveTabId</code></p>
<p>Last reorder: @ReorderLog</p>

@code {
    private string TabStripActiveTabId { get; set; } = "tab1";
    private string ReorderLog { get; set; } = string.Empty;

    private void OnActiveTabIdChanged(string newTabId)
    {
        TabStripActiveTabId = newTabId;
    }

    private void OnTabReorder(TabStripTabReorderEventArgs args)
    {
        ReorderLog = $"Tab {args.Id} moved to index {args.Position}.";
    }
}
````

> The `OnStateChanged` event also fires after a tab reorder. Read more in the [State Management](slug:tabstrip-state) article.

## PinnedChanged

The `PinnedChanged` event fires when the user [pins or unpins a tab](slug:tabstrip-tabs-configuration#pinnable-and-pinned). The event handler receives a boolean value with the new tab pinned state.

>caption Handle the TabStripTab PinnedChanged event

````RAZOR
<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 EnableTabReorder="true">
    <TabStripTab Id="alpha"
                 Pinnable="true"
                 Pinned="@AlphaPinned"
                 PinnedChanged="@AlphaPinnedChanged"
                 Title="Alpha">
        Alpha tab content.
    </TabStripTab>
    <TabStripTab Id="beta"
                 Pinnable="true"
                 Pinned="@BetaPinned"
                 PinnedChanged="@BetaPinnedChanged"
                 Title="Beta">
        Beta tab content.
    </TabStripTab>
    <TabStripTab Id="gamma"
                 Title="Gamma">
        Gamma tab content.
    </TabStripTab>
</TelerikTabStrip>

<p>Last <code>PinnedChanged</code> event: @PinnedChangedEventLog</p>

@code {
    private string TabStripActiveTabId { get; set; } = "alpha";

    private bool AlphaPinned { get; set; }
    private bool BetaPinned { get; set; } = true;

    private string PinnedChangedEventLog { get; set; } = string.Empty;

    private void AlphaPinnedChanged(bool newPinned)
    {
        AlphaPinned = newPinned;
        PinnedChangedEventLog = $"Alpha tab pinned state changed to {newPinned}";
    }

    private void BetaPinnedChanged(bool newPinned)
    {
        BetaPinned = newPinned;
        PinnedChangedEventLog = $"Beta tab pinned state changed to {newPinned}";
    }
}
````

## See Also

* [TabStrip Overview](slug:components/tabstrip/overview)
* [Dynamic Tabs](slug:tabstrip-tabs-collection)
* [Tab Reordering](slug:tabstrip-tab-reorder)
* [State Management](slug:tabstrip-state)
