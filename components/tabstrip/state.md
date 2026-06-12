---
title: State Management
page_title: TabStrip - State Management
description: Learn how to save, restore, and manipulate the state of the Telerik TabStrip for Blazor.
slug: tabstrip-state
tags: telerik,blazor,tabstrip,state
published: True
position: 70
tag: new
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

````RAZOR
@using System.Text.Json

<TelerikButton OnClick="@OnSetButtonClick">Activate First Visible Tab</TelerikButton>
<TelerikButton OnClick="@OnSaveButtonClick">Save Current TabStrip State</TelerikButton>
<TelerikButton OnClick="@OnRestoreButtonClick">Restore Initial or Saved State</TelerikButton>

<TelerikTabStrip @ref="@TabStripRef"
                 @bind-ActiveTabId="@ActiveTabId"
                 EnableTabReorder="true"
                 OverflowMode="@TabStripOverflowMode.Menu"
                 OnStateChanged="@OnTabStripStateChanged"
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

<div style="display: flex; gap: 2em; margin-top: 1em;">
    <div style="flex: 1 1 50%;">
        <h2 style="font-size: 1.2em;">Initial or Saved <code>TabStripState</code>:</h2>

        <TelerikTextArea Value="@SerializedSavedTabStripState" Rows="7" />
    </div>
    <div style="flex: 1 1 50%;">
        <h2 style="font-size: 1.2em;"><code>TabStripState</code> in last <code>OnStateChanged</code> event:</h2>

        <TelerikTextArea Value="@SerializedTabStripState" Rows="7" />
    </div>
</div>

@code {
    private TelerikTabStrip? TabStripRef;
    private string ActiveTabId { get; set; } = "tab1";
    private TabStripState? SavedTabStripState { get; set; }
    private string SerializedSavedTabStripState => SavedTabStripState is not null ? JsonSerializer.Serialize(SavedTabStripState, new JsonSerializerOptions { WriteIndented = true }) : string.Empty;

    private string SerializedTabStripState { get; set; } = string.Empty;

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

    private void OnTabStripStateChanged(TabStripStateEventArgs args)
    {
        SerializedTabStripState = JsonSerializer.Serialize(args.TabStripState, new JsonSerializerOptions { WriteIndented = true });
    }

    private void OnTabStripStateInit(TabStripStateEventArgs args)
    {
        args.TabStripState.TabStates.Find(x => !x.Visible)!.Visible = true;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender && TabStripRef is not null)
        {
            SavedTabStripState = TabStripRef.GetState();
            StateHasChanged();
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
* [Tab Reordering](slug:tabstrip-reordering-pinning)
* [Tabs Configuration](slug:tabstrip-tabs-configuration)
