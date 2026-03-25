---
title: Tab Reordering
page_title: TabStrip - Tab Reordering
description: Learn how to enable drag-and-drop tab reordering in the Telerik TabStrip for Blazor.
slug: tabstrip-tab-reorder
tags: telerik,blazor,tabstrip,reorder,drag,drop
published: True
position: 10
tag: new
components: ["tabstrip"]
---

# TabStrip Tab Reordering

The Telerik TabStrip for Blazor allows users to reorder tabs by dragging and dropping them to new positions.

## Enable Tab Reordering

To let users reorder tabs, set the `EnableTabReorder` parameter to `true`.

>caption TabStrip with drag-and-drop tab reordering

````RAZOR
<TelerikTabStrip EnableTabReorder="true"
                 OnTabReorder="@OnTabReorder">
    <TabStripTab Title="First" Id="tab1">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second" Id="tab2">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third" Id="tab3">
        Third tab content.
    </TabStripTab>
    <TabStripTab Title="Fourth" Id="tab4">
        Fourth tab content.
    </TabStripTab>
</TelerikTabStrip>

<p>Last reorder: @ReorderLog</p>

@code {
    private string ReorderLog { get; set; } = "No reorder yet.";

    private void OnTabReorder(TabStripTabReorderEventArgs args)
    {
        ReorderLog = $"Tab moved from index {args.OldIndex} to index {args.NewIndex}.";
    }
}
````

## Reorder Rules

Observe the following rules when using tab reordering:

* [Pinned tabs](#pinned-tabs) can only be reordered among other pinned tabs.
* Unpinned tabs can only be reordered among other unpinned tabs. A pinned tab cannot be dropped into the unpinned tab area.
* [Disabled tabs](slug:tabstrip-tabs-configuration#disabled) cannot be reordered.

## Pinned Tabs

When [tab pinning](slug:tabstrip-tabs-configuration#pinnable-and-pinned) is enabled, pinned tabs are grouped at the start of the tab list. The [reorder constraints](#reorder-rules) prevent mixing of pinned and unpinned tabs.

## See Also

* [Tabs Configuration](slug:tabstrip-tabs-configuration)
* [TabStrip State](slug:tabstrip-state)
* [TabStrip Events](slug:tabstrip-events)
