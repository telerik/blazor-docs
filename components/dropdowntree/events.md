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

## OnChange

The `OnChange` event represents a user confirmation of the current value. It fires when the user selects an item from the dropdown.

`OnChange` is a custom event that allows you to use two-way binding for the `Value` parameter.

>caption Handle the OnChange event and use two-way binding

````RAZOR.skip-repl
<TelerikDropDownTree @bind-Value="@DropDownTreeValue"
                     OnChange="@OnDropDownTreeChange" />

@code {
    private int DropDownTreeValue { get; set; }

    private void OnDropDownTreeChange(object currentValue)
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

The `OnItemClick` event fires when the user clicks or taps an item in the DropDownTree popup. The event handler receives a [`DropDownTreeItemClickEventArgs`](slug:Telerik.Blazor.Components.DropDownTreeItemClickEventArgs) argument that exposes the clicked item as an `object`. Cast it to your model type to access the properties.

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

The `OnItemRender` event fires once for each item in the DropDownTree popup on each open. The event handler receives a [`DropDownTreeItemRenderEventArgs`](slug:Telerik.Blazor.Components.DropDownTreeItemRenderEventArgs) argument that exposes the currently rendered item as an `object`. Cast it to your model type to access the properties. The event allows you to set a custom CSS class to the rendered item.

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

<demo metaUrl="client/dropdowntree/events/" height="700"></demo>

## See Also

* [DropDownTree Data Binding](slug:dropdowntree-data-binding-overview)
* [DropDownTree Templates](slug:dropdowntree-templates)
