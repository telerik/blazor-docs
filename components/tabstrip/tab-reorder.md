---
title: Reordering and Pinning
page_title: TabStrip Tab Reordering and Pinning
description: Learn how to enable drag-and-drop tab reordering in the Telerik TabStrip for Blazor.
slug: tabstrip-reordering-pinning
tags: telerik,blazor,tabstrip,reorder,drag,drop
published: True
position: 40
tag: new
components: ["tabstrip"]
---

# TabStrip Tab Pinning and Reordering

The Telerik TabStrip for Blazor allows users to change the tab order in two ways:

* [Reorder tabs by drag-and-drop](#reorder-tabs)
* [Pin tabs to a high-priority position](#pin-tabs)

## Reorder Tabs

To enable users reorder tabs with drag-and-drop, set the TabStrip `EnableTabReorder` parameter to `true`.

>caption TabStrip with drag-and-drop tab reordering

````RAZOR.skip-repl
<TelerikTabStrip EnableTabReorder="true" />
````

## Pin Tabs

Pinned tabs display at the start of the tab list, before all other unpinned tabs.

To allow a specific tab to be pinned, set the `TabStripTab` `Pinnable` parameter to `true`. Users can pin tabs through a context menu on the desired tab.

Use the tab's `Pinned` parameter to set the initial or runtime pinned state of a tab. Use two-way binding or the [`PinnedChanged` event](slug:tabstrip-events#pinnedchanged) to keep the `Pinned` value in sync when users toggle the pin state through the context menu.

````RAZOR.skip-repl
<TelerikTabStrip>
    <TabStripTab Pinnable="true"
                 @bind-Pinned="@TabPinned">
        Tab Content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    private bool TabPinned { get; set; }
}
````

## Reorder and Pin Rules

The tab reorder and tab pin fatures obey the following rules:

* [Pinned tabs](#pinn-tabs) can only be reordered among other pinned tabs.
* Unpinned tabs can only be reordered among other unpinned tabs. A pinned tab cannot be dragged and dropped on the unpinned tab area.
* [Disabled tabs](slug:tabstrip-tabs-configuration#disabled) cannot be reordered, pinned or unpinned. However, the order index of disabled tabs can change when users reorder the other tabs.

## Example

>caption Using TabStrip tab reordering and pinning

````RAZOR
<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 EnableTabReorder="true">
    <TabStripTab Id="tab1"
                 Pinnable="true"
                 @bind-Pinned="@Tab1Pinned"
                 Title="Tab 1">
        First tab content.
    </TabStripTab>
    <TabStripTab Id="tab2"
                 Pinnable="true"
                 @bind-Pinned="@Tab2Pinned"
                 Title="Tab 2">
        Second tab content.
    </TabStripTab>
    <TabStripTab Id="tab3"
                 Title="Tab 3 Not Pinnable">
        Third tab content.
    </TabStripTab>
    <TabStripTab Id="tab4"
                 Pinnable="true"
                 @bind-Pinned="@Tab4Pinned"
                 Title="Tab 4">
        Fourth tab content.
    </TabStripTab>
    <TabStripTab Id="tab5"
                 Disabled="true"
                 Title="Disabled Tab 5">
        Fifth tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    private string TabStripActiveTabId { get; set; } = "tab1";

    private bool Tab1Pinned { get; set; }
    private bool Tab2Pinned { get; set; }
    private bool Tab4Pinned { get; set; }
}
````

## Next Steps

* [Customize TabStrip UI with templates](slug:tabstrip-templates)
* [Change the number of tabs at runtime](slug:tabstrip-dynamic-tabs)
* [Manage TabStrip state](slug:tabstrip-state)
* [Handle TabStrip events](slug:tabstrip-events)

## See Also

* [Live Demo: TabStrip Tab Reordering](https://demos.telerik.com/blazor-ui/tabstrip/tab-reorder)
* [Live Demo: TabStrip Tab Pinning](https://demos.telerik.com/blazor-ui/tabstrip/tab-pinning)
