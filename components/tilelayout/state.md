---
title: State
page_title: TileLayout - State
description: Control, save and load the state of the TileLayout for Blazor.
slug: tilelayout-state
tags: telerik,blazor,tile,layout,dashboard,state
published: True
position: 15
---

# TileLayout State

You can save, load and control the state of the tile layout dashboard through code. The state management includes the order of the tiles and their size (`RowSpan` and `ColSpan`).

You can see this feature in the [Live Demo: TileLayout State](https://demos.telerik.com/blazor-ui/tilelayout/persist-state).

The state is an object of type `TileLayoutState` that has a single field - an `IList` collection of `TileLayoutItemState` items that represent the individual tiles. 

You can get and set the state object through the `GetState()` and `SetState(newState)` methods the component reference exposes.

The `TileLayoutItemState` object has the following fields:
* `Order` - the sequential order of the tile in the layout
* `ColSpan` - the number of columns the width of the tile takes
* `RowSpan` - the number of rows the height of the tile takes

The TileLayout component reads the state collection and applies the information from it to each tile that is declared in the markup sequentially. Thus, changing the tiles collection between a save and a load of the state might alter the results.

You can consider saving the current state of the component in events that it exposes (such as [OnReorder and OnResize]({%slug tilelayout-events%})) or on an event specific to your app (such as a button click or the `Dispose` method from `IDisposable` from its parent component). You can consider loading the state in events like `OnAfterRender` of its parent component, or events specific to your app such as button click.

>caption Save, Load, Persist and Manage the State of a TileLayout. Uses a sample LocalStorage in the browser.

````Component
@* You can see this code in action in our live demos *@

@inject LocalStorage LocalStorage
@inject IJSRuntime JsInterop

<TelerikButton OnClick="@SaveState" Icon="@IconName.Save" Class="mr-sm">Save State</TelerikButton>
<TelerikButton OnClick="@ReloadPage" Icon="@IconName.Reload" Class="mr-sm">Reload the page</TelerikButton>
<TelerikButton OnClick="@LoadState" Icon="@IconName.Download" Class="mr-sm">Load last State</TelerikButton>
<TelerikButton OnClick="@SetExplicitState" Icon="@IconName.Gear" Class="mr-sm">Configure State</TelerikButton>

<TelerikTileLayout @ref="@TileLayoutInstance"
                   Columns="3"
                   Resizable="true"
                   Reorderable="true">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Panel 1"></TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 2"></TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 3" RowSpan="2">
            <Content>The tiles in this demo have little content intentionally so you can focus on the state. You can put any content and components in them.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 4" ColSpan="2" RowSpan="2">
            <Content>Try resizing and moving me around, for example, then click the buttons above.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 5"></TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>


@code {
    TelerikTileLayout TileLayoutInstance { get; set; }
    TileLayoutState SavedState { get; set; }
    
    string stateStorageKey = "TelerikBlazorTileLayoutStateDocsKey";

    async Task SaveState()
    {
        // Get state through the GetState method
        var state = TileLayoutInstance.GetState();
        
        await LocalStorage.SetItem(stateStorageKey, state);
    }

    async Task LoadState()
    {
        TileLayoutState storedState = await LocalStorage.GetItem<TileLayoutState>(stateStorageKey);
        
        // Set State through the SetState method
        TileLayoutInstance.SetState(storedState);
    }

    void ReloadPage()
    {
        JsInterop.InvokeVoidAsync("window.location.reload");
    }

    async void SetExplicitState()
    {
        await LocalStorage.RemoveItem(stateStorageKey);
        TileLayoutState desiredState = GetDefaultDemoState();
        
        // set state through the SetState method
        TileLayoutInstance.SetState(desiredState);
    }

    // Loading state when the component renders
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        var state = await LocalStorage.GetItem<TileLayoutState>(stateStorageKey);
        if (state != null && TileLayoutInstance != null)
        {
            TileLayoutInstance.SetState(state);
        }
    }

    TileLayoutState GetDefaultDemoState()
    {
        // Sample state object you can use as reference
        TileLayoutState defaultDemoState = new TileLayoutState()
        {
            ItemStates = new List<TileLayoutItemState>()
             {
                 new TileLayoutItemState { Order = 1, ColSpan = 1, RowSpan = 1 },
                 new TileLayoutItemState { Order = 2, ColSpan = 1, RowSpan = 1 },
                 new TileLayoutItemState { Order = 3, ColSpan = 1, RowSpan = 2 },
                 new TileLayoutItemState { Order = 4, ColSpan = 2, RowSpan = 2 },
                 new TileLayoutItemState { Order = 5, ColSpan = 1, RowSpan = 1 },
             }
        };
        return defaultDemoState;
    }
}
````
````Service
using Microsoft.JSInterop;
using System;
using System.Text.Json;
using System.Threading.Tasks;

public class LocalStorage
{
    protected IJSRuntime JSRuntimeInstance { get; set; }

    public LocalStorage(IJSRuntime jsRuntime)
    {
        JSRuntimeInstance = jsRuntime;
    }

    public ValueTask SetItem(string key, object data)
    {
        return JSRuntimeInstance.InvokeVoidAsync(
            "localStorage.setItem",
            new object[] {
                key,
                JsonSerializer.Serialize(data)
            });
    }

    public async Task<T> GetItem<T>(string key)
    {
        var data = await JSRuntimeInstance.InvokeAsync<string>("localStorage.getItem", key);
        if (!string.IsNullOrEmpty(data))
        {
            return JsonSerializer.Deserialize<T>(data);
        }

        return default;
    }

    public ValueTask RemoveItem(string key)
    {
        return JSRuntimeInstance.InvokeVoidAsync("localStorage.removeItem", key);
    }
}
````

## See Also

  * [TileLayout Overview]({%slug tilelayout-overview%})
  * [TileLayout Reorder]({%slug tilelayout-reorder%})
  * [TileLayout Resize]({%slug tilelayout-resize%})
  * [Live Demo: TileLayout State](https://demos.telerik.com/blazor-ui/tilelayout/persist-state)
