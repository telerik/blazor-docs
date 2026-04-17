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
<TelerikButton OnClick="@OnSetButtonClick">Activate First Visible Tab</TelerikButton>
<TelerikButton OnClick="@OnSaveButtonClick">Save Current TabStrip State</TelerikButton>
<TelerikButton OnClick="@OnRestoreButtonClick">Restore Initial or Saved State</TelerikButton>

<TelerikTabStrip @ref="@TabStripRef"
                 @bind-ActiveTabId="@ActiveTabId"
                 EnableTabReorder="true"
                 OverflowMode="@TabStripOverflowMode.Menu"
                 Width="600px">
    @foreach (TabModel tab in TabStripTabs)
    {
        <TabStripTab @key="@tab"
                     Closeable="true"
                     Id="@tab.Id"
                     Pinnable="true"
                     @bind-Pinned="@tab.Pinned"
                     Title="@tab.Title"
                     @bind-Visible="@tab.Visible">
            <Content>
                <p>Content for tab <strong>@tab.Title</strong></p>
            </Content>
        </TabStripTab>
    }
</TelerikTabStrip>

@code {
    private TelerikTabStrip? TabStripRef;
    private string ActiveTabId { get; set; } = "tab1";
    private TabStripState? SavedTabStripState { get; set; }

    private List<TabModel> TabStripTabs { get; set; } = Enumerable.Range(1, 10)
        .Select(x => new TabModel
        {
            Id = $"tab{x}",
            Pinned = x % 7 == 0,
            Title = $"Tab {x}",
            Visible = x % 4 != 0
        }).ToList();

    private async Task OnSetButtonClick()
    {
        if (TabStripRef is null)
        {
            return;
        }

        TabStripState tabStripState = TabStripRef.GetState();

        TabStripTabState? newVisibleTabState = tabStripState.TabStates.FirstOrDefault(x => x.Visible);
        if (newVisibleTabState is not null)
        {
            tabStripState.ActiveTabId = newVisibleTabState.Id;
        }

        await TabStripRef.SetState(tabStripState);
    }

    private async Task OnRestoreButtonClick()
    {
        if (TabStripRef is not null)
        {
            await TabStripRef.SetState(SavedTabStripState);
        }
    }

    private async Task OnSaveButtonClick()
    {
        if (TabStripRef is not null)
        {
            SavedTabStripState = TabStripRef.GetState();
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender && TabStripRef is not null)
        {
            SavedTabStripState = TabStripRef.GetState();
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public class TabModel
    {
        public string Id { get; set; } = string.Empty;
        public bool Disabled { get; set; }
        public bool Pinned { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool Visible { get; set; } = true;
    }
}
````

## See Also

* [TabStrip Events](slug:tabstrip-events)
* [Tab Reordering](slug:tabstrip-tab-reorder)
* [Tabs Configuration](slug:tabstrip-tabs-configuration)
