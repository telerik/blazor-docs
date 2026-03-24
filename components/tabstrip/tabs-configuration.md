---
title: Tabs Configuration
page_title: TabStrip Tabs Configuration
description: Overview of the TabStrip for Blazor.
slug: tabstrip-tabs-configuration
tags: telerik,blazor,tab,strip,tabstrip,overview
published: True
position: 7
components: ["tabstrip"]
---
# TabStrip Tabs Configuration

You can configure the `TabStripTab` instances in a TabStrip through the following parameters:

* [Title](#title)
* [Visible](#visible)
* [Disabled](#disabled)
* [Closeable](#closeable)
* [Pinnable and Pinned](#pinnable-and-pinned)


## Title

The `Title` parameter allows you to define the desired text that will be rendered in the Tab heading. If not set, no text will be rendered in the Tab heading.

>caption Set the desired title for the tab heading.

````RAZOR
<TelerikTabStrip >
    <TabStripTab Title="First">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>
````

## Visible

Control tab visibility through the `Visible` parameter of the `TabStripTab`. If you toggle the visibility at runtime, the tab order will be preserved. This is in contrast with adding a tab at runtime with a conditional statement, which adds it at last position.

>caption Toggle the visibility of the second tab

````RAZOR
<TelerikButton OnClick="@ToggleVisible">Toggle Second Tab Visibility</TelerikButton>

<TelerikTabStrip>
    <TabStripTab Title="First" >
        First tab content.
    </TabStripTab>
    <TabStripTab Visible="@Visible" Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    public bool Visible { get; set; }

    public void ToggleVisible()
    {
        Visible = !Visible;
    }
}
````

## Disabled

The `Disabled` parameter allows you to mark a tab as disabled, so the user cannot select it.

>caption Disable the second tab

````RAZOR
<TelerikButton OnClick="@ToggleDisabled">Enable/Disable Second Tab</TelerikButton>

<TelerikTabStrip>
    <TabStripTab Title="First" >
        First tab content.
    </TabStripTab>
    <TabStripTab Disabled="@Disabled" Title="Second">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    public bool Disabled { get; set; } = true;

    public void ToggleDisabled()
    {
        Disabled = !Disabled;
    }
}
````

## Closeable

Set the `Closeable` parameter to `true` to render a close button in the tab. Users can also close the tab through a context menu action. Closing a tab sets its `Visible` parameter to `false`, which hides it from the tab list.

The `VisibleChanged` event fires when the tab is closed. Use this event to update your data or to intercept the close action—for example, to show a confirmation dialog before the tab is hidden.

> To show a confirmation dialog before closing a tab, use `VisibleChanged` to intercept the close request. Update the `Visible` parameter only if the user confirms the action.

````RAZOR
<TelerikTabStrip>
    <TabStripTab Title="First" Id="tab1"
                 Closeable="true"
                 Visible="@FirstTabVisible"
                 VisibleChanged="@( (bool newVisible) => OnTabVisibleChanged("tab1", newVisible) )">
        First tab content.
    </TabStripTab>
    <TabStripTab Title="Second" Id="tab2"
                 Closeable="true"
                 Visible="@SecondTabVisible"
                 VisibleChanged="@( (bool newVisible) => OnTabVisibleChanged("tab2", newVisible) )">
        Second tab content.
    </TabStripTab>
    <TabStripTab Title="Third">
        Third tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    private bool FirstTabVisible { get; set; } = true;
    private bool SecondTabVisible { get; set; } = true;

    private void OnTabVisibleChanged(string tabId, bool newVisible)
    {
        if (tabId == "tab1") FirstTabVisible = newVisible;
        if (tabId == "tab2") SecondTabVisible = newVisible;
    }
}
````

## Pinnable and Pinned

The `Pinnable` parameter specifies whether users can pin a tab. Pinned tabs are fixed to the start of the tab list and cannot be mixed with unpinned tabs during drag-and-drop [reordering](slug:tabstrip-tab-reorder).

Use the `Pinned` parameter to set the initial pinned state of a tab. Pair it with the `PinnedChanged` event to keep your data in sync when users toggle the pin state through the context menu.

>caption TabStrip with pinnable tabs

````RAZOR
<TelerikTabStrip EnableTabReorder="true">
    <TabStripTab Title="Alpha"
                 Pinnable="true"
                 @bind-Pinned="@AlphaPinned">
        Alpha tab content.
    </TabStripTab>
    <TabStripTab Title="Beta"
                 Pinnable="true"
                 @bind-Pinned="@BetaPinned">
        Beta tab content.
    </TabStripTab>
    <TabStripTab Title="Gamma">
        Gamma tab content.
    </TabStripTab>
</TelerikTabStrip>

@code {
    private bool AlphaPinned { get; set; } = true;
    private bool BetaPinned { get; set; }
}
````

## See Also

  * [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/overview)
  * [Live Demo: TabStrip - Tab Visibility](https://demos.telerik.com/blazor-ui/tabstrip/tab-visibility)
  * [Tab Reordering](slug:tabstrip-tab-reorder)
  * [TabStrip Events](slug:tabstrip-events)
