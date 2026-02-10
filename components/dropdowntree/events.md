---
title: Events
page_title: DropDownTree Events
description: The article describes the Telerik Blazor DropDownTree component events and event arguments.
slug: dropdowntree-events
tags: blazor,dropdowntree,events
components: ["dropdowntree"]
published: True
position: 200
---

# DropDownTree Events

This article describes the available events in the Telerik DropDownTree for Blazor:

* [`ExpandedItemsChanged`](#expandeditemschanged)
* [`OnBlur`](#onblur)
* [`OnChange`](#onchange)
* [`OnClose`](#onclose)
* [`OnExpand`](#onexpand)
* [`OnFocus`](#onfocus)
* [`OnItemClick`](#onitemclick)
* [`OnItemRender`](#onitemrender)
* [`OnOpen`](#onopen)
* [`ValueChanged`](#valuechanged)

## ExpandedItemsChanged

The DropDownTree `ExpandedItemsChanged` event fires when the user expands or collapses an item in the dropdown. Use the event if you need to execute related custom logic. Make sure to update the value of the `ExpandedItems` collection in the event handler.

To load child items on demand, use the [`OnExpand` event](#onexpand) instead.

Also see the [runnable example below](#example).

````RAZOR.skip-repl
<TelerikDropDownTree ExpandedItems="@DropDownTreeExpandedItems"
                     ExpandedItemsChanged="@DropDownTreeExpandedItemsChanged" />

@code {
    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    private void DropDownTreeExpandedItemsChanged(IEnumerable<object> newExpandedItems)
    {
        DropDownTreeExpandedItems = newExpandedItems;
    }
}
````

## OnBlur

The DropDownTree `OnBlur` event fires when the component loses focus.

`OnBlur` and `OnClose` can fire at the same time, but in different order, depending on what exactly the user is doing.

Also see the [runnable example below](#example).

>caption Using the DropDownTree OnBlur event

````RAZOR.skip-repl
<TelerikDropDownTree OnBlur="@OnDropDownTreeBlur" />

@code {
    private void OnDropDownTreeBlur()
    {

    }
}
````

## OnClose

The DropDownTree `OnClose` event fires when the component popup closes. The event is cancellable and in this case the popup remains open.

`OnClose` and `OnBlur` can fire at the same time, but in different order, depending on what exactly the user is doing.

Also see the [runnable example below](#example).

>caption Using the DropDownTree OnClose event

````RAZOR.skip-repl
<TelerikDropDownTree OnClose="@OnDropDownTreeClose" />

@code {
    private void OnDropDownTreeClose(DropDownTreeCloseEventArgs args)
    {
        //args.IsCancelled = true;
    }
}
````

## OnExpand

The DropDownTree `OnExpand` event fires when the user expands a TreeView item. The event handler receives a [`DropDownTreeExpandEventArgs`](slug:Telerik.Blazor.Components.DropDownTreeExpandEventArgs) argument that contains the item and whether it is currently expanding or collapsing. Use the `OnExpand` event to [load child items on demand](slug:dropdowntree-data-binding-load-on-demand) or for custom business logic.

Before loading child items on demand, check if they were loaded on a previous expansion.

See [Load DropDownTree Data on Demand](slug:dropdowntree-data-binding-load-on-demand) for more information and example.

>caption Using the DropDownTree OnExpand event with flat data

````RAZOR.skip-repl
<TelerikDropDownTree Data="@DropDownTreeData"
                     OnExpand="@OnDropDownTreeExpand" />

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private async Task OnDropDownTreeExpand(DropDownTreeExpandEventArgs args)
    {
        TreeItem expandedItem = (TreeItem)args.Item;

        if (args.Expanded && DropDownTreeData.FirstOrDefault(x => x.ParentId == expandedItem.Id) is null)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                ParentId = expandedItem.Id
            });
        }
    }
}
````

>caption Using the DropDownTree OnExpand event with hierarchical data

````RAZOR.skip-repl
<TelerikDropDownTree Data="@DropDownTreeData"
                     OnExpand="@OnDropDownTreeExpand" />

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private async Task OnDropDownTreeExpand(DropDownTreeExpandEventArgs args)
    {
        TreeItem expandedItem = (TreeItem)args.Item;

        if (args.Expanded && expandedItem.Items is null)
        {
            expandedItem.Items = new List<TreeItem>();

            expandedItem.Items.Add(new TreeItem()
            {

            });
        }
    }
}
````

## OnFocus

The DropDownTree `OnFocus` event fires when the component gains focus as a result of tabbing or clicking.

When the user clicks on a non-focused DropDownTree, `OnFocus` fires before `OnOpen`.

Also see the [runnable example below](#example).

>caption Using the DropDownTree OnFocus event

````RAZOR.skip-repl
<TelerikDropDownTree OnFocus="@OnDropDownTreeFocus" />

@code {
    private void OnDropDownTreeFocus()
    {

    }
}
````

## OnItemClick

The `OnItemClick` event fires when the user clicks or taps an item in the DropDownTree popup. The event handler receives a [`DropDownListItemClickEventArgs`](slug:Telerik.Blazor.Components.DropDownListItemClickEventArgs) argument that exposes the clicked item as an `object`. Cast it to your model type to access the properties.

Also see the [runnable example below](#example).

>caption Using the DropDownTree OnItemClick event

````RAZOR.skip-repl
<TelerikDropDownTree OnItemClick="@OnDropDownTreeItemClick" />

@code {
    private void OnDropDownTreeItemClick(DropDownTreeItemClickEventArgs args)
    {
        TreeItem clickedItem = (TreeItem)args.Item;
    }
}
````

## OnItemRender

The `OnItemRender` event fires once for each item in the DropDownTree popup on each open. The event handler receives a [`DropDownListItemRenderEventArgs`](slug:Telerik.Blazor.Components.DropDownListItemRenderEventArgs) argument that exposes the currently rendered item as an `object`. Cast it to your model type to access the properties. The event allows you to set a custom CSS class to the rendered item.

Also see the [runnable example below](#example).

>caption Using the DropDownTree OnItemRender event

````RAZOR.skip-repl
<TelerikDropDownTree OnItemRender="@OnDropDownTreeItemRender" />

@code {
    private void OnDropDownTreeItemRender(DropDownTreeItemRenderEventArgs args)
    {
        TreeItem renderedItem = (TreeItem)args.Item;

        if (renderedItem.ParentId is null)
        {
            args.Class = "root-class";
        }
    }
}
````

## OnOpen

The DropDownTree `OnOpen` event fires when user tries to open the component popup. The event is cancellable and in this case the popup remains closed.

When the user clicks on a non-focused DropDownTree, `OnOpen` fires after `OnFocus`.

Also see the [runnable example below](#example).

>caption Using the DropDownTree OnOpen event

````RAZOR.skip-repl
<TelerikDropDownTree OnOpen="@OnDropDownTreeOpen" />

@code {
    private void OnDropDownTreeOpen(DropDownTreeOpenEventArgs args)
    {
        //args.IsCancelled = true;
    }
}
````

## ValueChanged

The DropDownTree `ValueChanged` event fires when the user selects a different item from the component data. Make sure to update the `Value` parameter in the event handler. When using `ValueChanged` inside a Form, also [set a `ValueExpression` to avoid runtime exceptions](slug:common-kb-requires-valueexpression).

The DropDownTree is a generic component. As a result, you either need to specify the argument type in the `ValueChanged` definition, or set `TItem` and `TValue` explicitly.

>caption Using the DropDownTree ValueChanged event

````RAZOR.skip-repl
<TelerikDropDownTree Value="@DropDownTreeValue"
                     ValueChanged="@DropDownTreeValueChanged"
                     ValueExpression="@(() => DropDownTreeValue)"
                     TItem="@TreeItem"
                     TValue="@int">
</TelerikDropDownTree>

<TelerikDropDownTree Value="@DropDownTreeValue"
                     ValueChanged="@(async (int newValue) => await DropDownTreeValueChanged(newValue))"
                     ValueExpression="@(() => DropDownTreeValue)">
</TelerikDropDownTree>

@code {
    private async Task DropDownTreeValueChanged(int newValue)
    {
        DropDownTreeValue = newValue;
    }
}
````

## Example

>caption Using the DropDownTree events

````C#
<div style="display: flex; gap: 2em; justify-content: space-between;">
    <div>
        <TelerikDropDownTree Data="@DropDownTreeData"
                            TItem="@TreeItem"
                            TValue="@int"
                            Value="@DropDownTreeValue"
                            ValueChanged="@DropDownTreeValueChanged"
                            ExpandedItems="@DropDownTreeExpandedItems"
                            ExpandedItemsChanged="@DropDownTreeExpandedItemsChanged"
                            OnBlur="@OnDropDownTreeBlur"
                            OnClose="@OnDropDownTreeClose"
                            OnExpand="@OnDropDownTreeExpand"
                            OnFocus="@OnDropDownTreeFocus"
                            OnItemClick="@OnDropDownTreeItemClick"
                            OnItemRender="@OnDropDownTreeItemRender"
                            OnOpen="@OnDropDownTreeOpen"
                            Width="240px">
        </TelerikDropDownTree>
    </div>
    <div style="max-height: 90vh; overflow: auto; flex: 0 0 50%;">
        <p><label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ShowOnItemRender"/> Show OnItemRender events</label></p>
        <TelerikButton OnClick="@(() => DropDownTreeEventLog.Clear())">Clear Log</TelerikButton>
        <ul>
            @foreach (string ev in DropDownTreeEventLog)
            {
                <li>@ev</li>
            }
        </ul>
    </div>
</div>

<style>
    .root-class {
        color: var(--kendo-color-info);
    }
</style>

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    private int IdCounter { get; set; }

    private List<string> DropDownTreeEventLog { get; set; } = new();
    private bool ShowOnItemRender { get; set; }

    private void DropDownTreeExpandedItemsChanged(IEnumerable<object> newExpandedItems)
    {
        DropDownTreeExpandedItems = newExpandedItems;

        DropDownTreeEventLog.Add($"ExpandedItemsChanged fired for {newExpandedItems.Count()} items at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private void OnDropDownTreeBlur()
    {
        DropDownTreeEventLog.Add($"OnBlur fired at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private void OnDropDownTreeClose(DropDownTreeCloseEventArgs args)
    {
        //args.IsCancelled = true;

        DropDownTreeEventLog.Add($"OnClose fired at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private async Task OnDropDownTreeExpand(DropDownTreeExpandEventArgs args)
    {
        TreeItem expandedItem = (TreeItem)args.Item;

        if (args.Expanded && DropDownTreeData.FirstOrDefault(x => x.ParentId == expandedItem.Id) is null)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                ParentId = expandedItem.Id,
                Text = $"Tree Item on demand {expandedItem.Id}-{IdCounter}",
                Value = IdCounter,
                HasChildren = true
            });
        }

        DropDownTreeEventLog.Add($"OnExpand fired for item {expandedItem.Text} with ID {expandedItem.Id} at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private void OnDropDownTreeFocus()
    {
        DropDownTreeEventLog.Add($"OnFocus fired at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private void OnDropDownTreeItemClick(DropDownTreeItemClickEventArgs args)
    {
        var clickedItem = (TreeItem)args.Item;

        DropDownTreeEventLog.Add($"OnItemClick fired for item {clickedItem.Text} with ID {clickedItem.Id} at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private void OnDropDownTreeItemRender(DropDownTreeItemRenderEventArgs args)
    {
        var renderedItem = (TreeItem)args.Item;

        if (renderedItem.ParentId is null)
        {
            args.Class = "root-class";
        }

        if (ShowOnItemRender)
        {
            DropDownTreeEventLog.Add($"OnItemRender fired for item {renderedItem.Text} with ID {renderedItem.Id}");
            StateHasChanged();
        }
    }

    private void OnDropDownTreeOpen(DropDownTreeOpenEventArgs args)
    {
        //args.IsCancelled = true;

        DropDownTreeEventLog.Add($"OnOpen fired at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    private void DropDownTreeValueChanged(int newValue)
    {
        DropDownTreeValue = newValue;

        DropDownTreeEventLog.Add($"ValueChanged fired with value {newValue} at {DateTime.Now.ToString("HH:mm:ss.fff")}");
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                Text = $"Tree Item {i}",
                Value = IdCounter,
                HasChildren = true
            });

            int parentId = IdCounter;

            for (int j = 1; j <= 3; j++)
            {
                DropDownTreeData.Add(new TreeItem()
                {
                    Id = ++IdCounter,
                    ParentId = parentId,
                    Value = IdCounter,
                    Text = $"Tree Item {i}-{j}",
                    HasChildren = true
                });
            }
        }

        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.ParentId is null).ToList();
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
````

## See Also

* [DropDownTree Data Binding](slug:dropdowntree-data-binding-overview)
* [DropDownTree Templates](slug:dropdowntree-templates)
