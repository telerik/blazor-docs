---
title: Save and Load the Splitter State
description: How to save the Splitter state in Local Storage and set it when the page reloads.
type: how-to
page_title: Save and Load the Splitter State
slug: splitter-kb-save-and-load-state
position: 
tags: splitter, state, save, load, reload
ticketid: 1546809
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Splitter for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want to save the Splitter state when it is expanded or collapsed, and then automatically load it when the page is reloaded.

## Solution

Implement this scenario in two steps:


### Save the Splitter state

Handle the Splitter events to save its state in the LocalStorage when the user changes the component layout:

* [OnCollapse]({%slug splitter-events%}#oncollapse)
* [OnExpand]({%slug splitter-events%}#onexpand)
* [OnResize]({%slug splitter-events%}#onresize)

### Load the Splitter state

You can then set the saved state from the local storage. It is important that this action is performed in the OnAfterRender(Async) event since typically the component references are populated then by the framework and not in OnInitialized(Async). So, if you try setting the state in OnInitialized(Async) the Splitter reference used for that purpose might still be null.


The example below demonstrates the described approach.

````Component
@inject LocalStorage LocalStorage
@inject IJSRuntime JsRuntine

<div style="width: 500px; height: 200px;">
    <TelerikSplitter @ref="@Splitter"
                     Width="100%"
                     Height="100%"
                     OnCollapse="@SaveStateToJson"
                     OnExpand="@SaveStateToJson"
                     OnResize="@SaveStateToJson">
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

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        var state = await LocalStorage.GetItem<SplitterState>(SplitterStateKey);
        if (state != null)
        {
            Splitter.SetState(state);
        }
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