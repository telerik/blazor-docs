---
title: State
page_title: Splitter - State
description: Save, restore and control the state of the Splitter for Blazor.
slug: splitter-state
tags: telerik,blazor,splitter,state
published: true
position: 10
---

# State

This article explains how to save, restore and programmatically control the state of the Telerik Splitter for Blazor.

The splitter instance (`@ref`) exposes the `GetState()` and `SetState(SplitterState updatedState)` methods to let you obtain and update the state.

The `SplitterState` object that describes the state contains a `List<SplitterPaneState> Panes` object that describes each pane.

Each `SplitterPaneState` object has the following information:

* `Size` - `string` - the size of the pane
* `Collapsed` - `bool` - whether the pane is collapsed

>caption How to save and load the state to/from JSON and the browser local storage, and how to manually change the state of the splitter on a button click

````Component
@inject LocalStorage LocalStorage
@inject IJSRuntime JsRuntine

<div>
    <TelerikButton OnClick="@SaveStateToJson">Save State to JSON</TelerikButton>
    <TelerikButton OnClick="@ReloadPage">Reload the Page</TelerikButton>
    <TelerikButton OnClick="@LoadStateFromJson">Load State from JSON</TelerikButton>
    <TelerikButton OnClick="@SetCustomState">Set custom state</TelerikButton>
</div>

<div style="width: 500px; height: 200px;">
    <TelerikSplitter @ref="@Splitter"
                     Width="100%"
                     Height="100%">
        <SplitterPanes>
            <SplitterPane Size="200px" Collapsible="true">
                <div>pane 0</div>
            </SplitterPane>

            <SplitterPane Size="250px" Collapsible="true">
                <div>pane 1</div>
            </SplitterPane>

            <SplitterPane Collapsible="true">
                <div>pane 2</div>
            </SplitterPane>
        </SplitterPanes>
    </TelerikSplitter>
</div>

@code {
    const string SplitterStateKey = "SplitterStorageStateKey";
    TelerikSplitter Splitter { get; set; }

    async Task SaveStateToJson()
    {
        var state = Splitter.GetState();
        await LocalStorage.SetItem(SplitterStateKey, state);
    }

    async Task LoadStateFromJson()
    {
        var state = await LocalStorage.GetItem<SplitterState>(SplitterStateKey);
        if (state != null)
        {
            Splitter.SetState(state);
        }
    }

    async Task ReloadPage()
    {
        await JsRuntine.InvokeVoidAsync("window.location.reload");
    }

    void SetCustomState()
    {
        SplitterState desiredState = new SplitterState()
        {
            Panes = new List<SplitterPaneState>()
            {
                new SplitterPaneState{ Collapsed = true, Size = "30px" },
                new SplitterPaneState{ Collapsed = false }, // you should always have at least one pane without a size to absorb differences
                new SplitterPaneState{ Collapsed = false, Size = "123px" },
            }
        };

        Splitter.SetState(desiredState);
    }
}

````
````Service
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

>tip You can use the [splitter events]({%slug splitter-events%}) to save its state for your users.

## See Also

* [Splitter Overview]({%slug splitter-overview%})
* [Splitter Events]({%slug splitter-events%})
