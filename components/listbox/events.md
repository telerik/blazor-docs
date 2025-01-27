---
title: Events
page_title: ListBox - Events
description: Description of the ListBox events and event arguments. Complete runnable example with all ListBox events.
slug: listbox-events
tags: telerik,blazor,listbox
published: True
position: 60
---

# ListBox Events

The Telerik Blazor ListBox fires events that are related to toolbar button clicks and drag and drop user actions. This article describes all events and event arguments.

* [How to define event handlers more easily](#using-titem)
* [`OnDrop`](#ondrop)
* [`OnRemove`](#onremove)
* [`OnReorder`](#onreorder)
* [`OnTransfer`](#ontransfer)
* [`SelectedItemsChanged`](#selecteditemschanged)


## Using TItem

All ListBox event arguments are generic and depend on the component model type `T`. There is a framework limitation related to generic Razor components, which prevents the .NET compiler from inferring the argument type in the event handler automatically. As a result, you can often see event handler declarations that look like this:

>caption Generic component event handlers

<div class="skip-repl"></div>

````RAZOR
@* Verbose event handler declaration *@

<TelerikListBox Data="@ListBoxData"
                OnRemove="@( (ListBoxRemoveEventArgs<ListBoxModel> args) => OnListBoxRemove(args) )" />

@code {
    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private void OnListBoxRemove(ListBoxRemoveEventArgs<ListBoxModel> args)
    {

    }
}
````

The above syntax prevents [`Compiler Error CS1503`](https://learn.microsoft.com/en-us/dotnet/csharp/misc/cs1503) "Cannot convert from 'method group' to Microsoft.AspNetCore.Components.EventCallback".

However, you can set the `TItem` parameter and then use simpler syntax in the event handler declarations:

>caption Using TItem with ListBox events

<div class="skip-repl"></div>

````RAZOR
@* Short event handler declaration *@

<TelerikListBox Data="@ListBoxData"
                TItem="@ListBoxModel"
                OnRemove="@OnListBoxRemove" />

@code {
    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private void OnListBoxRemove(ListBoxRemoveEventArgs<ListBoxModel> args)
    {

    }
}
````

This technique is used in the [example at the end of this article](#example). Of course, if you need to pass custom arguments to an event handler, you can use the more verbose approach with a lambda expression. The `OnDrop` handler below receives custom arguments.


## OnDrop

The `OnDrop` event fires when the user releases the currently dragged ListBox item. The event fires from the originating (source) ListBox instance.

The event handler receives an argument of type [`ListBoxDropEventArgs<T>`](slug://Telerik.Blazor.Components.ListBoxDropEventArgs-1). See the [example below](#example) and the [example in article Drag and Drop](slug://listbox-dragdrop#example).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `DestinationIndex` | `int?` | The index of the item in the destination ListBox instance, over which the user has dropped the dragged items. A value of `-1` means that the user has dropped in the empty area below the last destination ListBox item. |
| `DestinationListBoxId` | `string` | The `Id` parameter value of the destination ListBox instance. |
| `Items` | `List<T>` | The dropped item object. Currently the ListView supports dragging of a single item. |


## OnRemove

The `OnRemove` event fires when the user clicks on the Remove button in the [ListBox toolbar](slug://listbox-toolbar).

The event handler receives an argument of type [`ListBoxRemoveEventArgs<T>`](slug://Telerik.Blazor.Components.ListBoxRemoveEventArgs-1). See the [example below](#example) and the [example in article ListBox Templates](slug://listbox-templates#example).

| Property | Type | Description |
| --- | --- | --- |
| `Items` | `List<T>` | The selected item object(s) to be removed. |


## OnReorder

The `OnReorder` event fires when the user clicks on a Reorder button in the [ListBox toolbar](slug://listbox-toolbar) (Move Up or Move Down).

The event handler receives an argument of type [`ListBoxReorderEventArgs<T>`](slug://Telerik.Blazor.Components.ListBoxReorderEventArgs-1). See the [example below](#example) and the example at [Creating Blazor ListBox](slug://listbox-overview#creating-blazor-listbox).

| Property | Type | Description |
| --- | --- | --- |
| `FromIndex` | `int` | The index of the first item in the `args.Items` collection. |
| `Items` | `List<T>` | The selected item object(s) to be reordered. |
| `ToIndex` | `int` | The index after the last item in the `args.Items` collection. |


## OnTransfer

The `OnTransfer` event fires when the user clicks on any of the Transfer buttons in the [ListBox toolbar](slug://listbox-toolbar) (Transfer To, Transfer From, Transfer All To, and Transfer All From).

The event handler receives an argument of type [`ListBoxTransferEventArgs<T>`](slug://Telerik.Blazor.Components.ListBoxTransferEventArgs-1). See the [example below](#example) and the [example in article Connect ListBoxes](slug://listbox-connect#example).

| Property | Type | Description |
| --- | --- | --- |
| `DestinationListBoxId` | `string` | The `Id` parameter value of the destination ListBox instance. |
| `Items` | `List<T>` | The selected item object(s) to be moved. The object references do not match the object references in the `Data` collection of the source ListBox. To remove items from the source ListBox, search for them by some unique identifier. |


## SelectedItemsChanged

The `SelectedItemsChanged` event fires when the user selects or deselects ListBox item(s). Use the event to update the ListBox selection when the `SelectedItems` parameter is set with one-way binding, otherwise the user action will be ignored.

The event argument is of type `IEnumerable<T>`. See the example below.


## Example

All events in the example below are fired by the first ListBox, except `OnDrop`, which is fired by the originating (source) ListBox instance.

Always [`Rebind()`](slug://listbox-overview#listbox-reference-and-methods) the ListBox after making programmatic changes to its `Data`.

>caption Using ListBox events

````RAZOR
@* All ListBox events *@

<TelerikListBox @ref="@ListBoxRef1"
                Data="@ListBoxData1"
                TItem="@ListBoxModel"
                TextField="@nameof(ListBoxModel.Name)"
                Id="listbox1"
                ConnectedListBoxId="listbox2"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                SelectedItems="@ListBoxSelectedItems1"
                SelectedItemsChanged="@OnListBoxSelectedItemsChanged"
                Draggable="true"
                DropSources="@ListBoxDropSources"
                OnDrop="( (ListBoxDropEventArgs<ListBoxModel> args) =>
                        OnListBoxDrop(args, ListBoxId1, ListBoxData1) )"
                OnRemove="@OnListBoxRemove"
                OnReorder="@OnListBoxReorder"
                OnTransfer="@OnListBoxTransfer"
                Height="300px">
</TelerikListBox>

<TelerikListBox @ref="@ListBoxRef2"
                Data="@ListBoxData2"
                TItem="@ListBoxModel"
                TextField="@nameof(ListBoxModel.Name)"
                Id="listbox2"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems2"
                Draggable="true"
                DropSources="@ListBoxDropSources"
                OnDrop="( (ListBoxDropEventArgs<ListBoxModel> args) =>
                        OnListBoxDrop(args, ListBoxId2, ListBoxData2) )"
                Height="300px">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

<h2>Last Fired Event</h2>

<p>@( new MarkupString(LastEventLog) )</p>

@code {
    private TelerikListBox<ListBoxModel> ListBoxRef1 { get; set; } = null!;
    private TelerikListBox<ListBoxModel> ListBoxRef2 { get; set; } = null!;

    private const string ListBoxId1 = "listbox1";
    private const string ListBoxId2 = "listbox2";

    private List<ListBoxModel> ListBoxData1 { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData2 { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems1 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems2 { get; set; } = new List<ListBoxModel>();

    private List<string> ListBoxDropSources => new List<string>() { ListBoxId1, ListBoxId2 };

    private string LastEventLog { get; set; } = string.Empty;

    private void OnListBoxDrop(
        ListBoxDropEventArgs<ListBoxModel> args,
        string sourceListBoxId,
        List<ListBoxModel> sourceData)
    {
        var destinationIndex = args.DestinationIndex ?? 0;
        var destinationData = GetListBoxDataFromId(args.DestinationListBoxId);

        if (args.DestinationListBoxId == sourceListBoxId)
        {
            ReorderItems(args.Items, sourceData, destinationIndex);
        }
        else
        {
            MoveItems(args.Items, sourceData, destinationData, destinationIndex);
        }

        ListBoxRef1.Rebind();
        ListBoxRef2.Rebind();

        LastEventLog = $"<strong>OnDrop</strong> fired at {DateTime.Now.ToLongTimeString()}. " +
            $"Moved <strong>{args.Items.Count}</strong> item(s) " +
            $"to index <strong>{args.DestinationIndex}</strong> " +
            $"in ListBox <strong>{args.DestinationListBoxId}</strong>.";
    }

    private void OnListBoxRemove(ListBoxRemoveEventArgs<ListBoxModel> args)
    {
        foreach (var item in args.Items)
        {
            ListBoxData1.Remove(item);
        }

        ListBoxRef1.Rebind();

        LastEventLog = $"<strong>OnRemove</strong> fired at {DateTime.Now.ToLongTimeString()}. " +
            $"Removed <strong>{args.Items.Count}</strong> item(s).";
    }

    private void OnListBoxReorder(ListBoxReorderEventArgs<ListBoxModel> args)
    {
        ListBoxData1.RemoveAll(x => args.Items.Contains(x));
        ListBoxData1.InsertRange(args.ToIndex, args.Items);

        ListBoxRef1.Rebind();

        LastEventLog = $"<strong>OnReorder</strong> fired at {DateTime.Now.ToLongTimeString()}. " +
            $"Reordered <strong>{args.Items.Count}</strong> item(s) " +
            $"from index <strong>{args.FromIndex}</strong> to index <strong>{args.ToIndex}</strong>.";
    }

    private void OnListBoxTransfer(ListBoxTransferEventArgs<ListBoxModel> args)
    {
        if (args.DestinationListBoxId == ListBoxId1)
        {
            foreach (var item in args.Items)
            {
                ListBoxData2.RemoveAll(x => args.Items.Any(y => y.Id == x.Id));
                ListBoxData1.Add(item);
            }
        }
        else
        {
            foreach (var item in args.Items)
            {
                ListBoxData1.RemoveAll(x => args.Items.Any(y => y.Id == x.Id));
                ListBoxData2.Add(item);
            }
        }

        ListBoxRef1.Rebind();
        ListBoxRef2.Rebind();

        LastEventLog = $"<strong>OnTransfer</strong> fired at {DateTime.Now.ToLongTimeString()}. " +
            $"Moved <strong>{args.Items.Count}</strong> item(s)" +
            $"to ListBox <strong>{args.DestinationListBoxId}</strong>.";
    }

    private void OnListBoxSelectedItemsChanged(IEnumerable<ListBoxModel> newSelected)
    {
        ListBoxSelectedItems1 = newSelected;

        LastEventLog = $"<strong>SelectedItemsChanged</strong> fired at {DateTime.Now.ToLongTimeString()}." +
            $"The selected items count is <strong>{newSelected.Count()}</strong>";
    }

    private void ReorderItems(
    List<ListBoxModel> items,
    List<ListBoxModel> collection,
    int destinationIndex)
    {
        collection.RemoveAll(x => items.Contains(x));

        if (destinationIndex >= 0)
        {
            collection.InsertRange(destinationIndex, items);
        }
        else
        {
            collection.AddRange(items);
        }
    }

    private void MoveItems(
        List<ListBoxModel> items,
        List<ListBoxModel> sourceData,
        List<ListBoxModel> destinationData,
        int destinationIndex)
    {
        foreach (var item in items)
        {
            sourceData.RemoveAll(x => items.Any(y => y.Id == x.Id));

            if (destinationIndex >= 0)
            {
                destinationData.Insert(destinationIndex, item);
            }
            else
            {
                destinationData.Add(item);
            }
        }
    }

    private List<ListBoxModel> GetListBoxDataFromId(string listBoxId)
    {
        var collection = new List<ListBoxModel>();

        switch (listBoxId)
        {
            case ListBoxId1:
                collection = ListBoxData1;
                break;
            case ListBoxId2:
                collection = ListBoxData2;
                break;
            default:
                break;
        }

        return collection;
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 7; i++)
        {
            ListBoxData1.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"Item {i}",
            });
        }

        base.OnInitialized();
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````


## See Also

* [Live Demo: ListBox Events](https://demos.telerik.com/blazor-ui/listbox/events)
