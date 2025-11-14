---
title: Events
page_title: TabStrip - Events
description: Learn about the events and event arguments of the Telerik TabStrip for Blazor.
slug: tabstrip-events
tags: telerik, blazor, tabstrip, events
published: True
position: 20
---

# TabStrip Events

This article explains the events available in the Telerik TabStrip for Blazor:

* [ActiveTabIdChanged](#activetabidchanged)
* [ActiveTabIndexChanged](#activetabindexchanged)

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

## See Also

* [TabStrip Overview](slug:components/tabstrip/overview)
* [Dynamic Tabs](slug:tabstrip-tabs-collection)
