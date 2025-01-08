---
title: Drag and Drop
page_title: ListBox - Drag and Drop
description: How to enable ListBox drag and drop to move items between component instances. Example on how to configure the ListBox and handle the OnDrop event.
slug: listbox-dragdrop
tags: telerik,blazor,listbox
published: True
position: 40
---

# ListBox Item Drag and Drop

The Telerik Blazor ListBox allows users to drag and drop items within the same component instance or across different instances. This is a more flexible alternative to [reordering](slug://listbox-overview#creating-blazor-listbox) or [moving ListBox items](slug://listbox-connect) with toolbar buttons. As a result, dragging and dropping can be a lot faster and convenient to users when the number of related ListBoxes is three or more.


## Configuration

To enable drag and drop between ListBox components:

1. Set `Draggable="true"` to all of them.
1. Set [`DropSources` to the `Id` values](slug://listbox-overview#listbox-parameters) of the permitted source ListBoxes.
1. Subscribe to the [`OnDrop` event](slug://listbox-events#ondrop) of each ListBox that users can drag items from. The `OnDrop` event always fires from the source (origin) ListBox instance.
1. [`Rebind()`](slug://listbox-overview#listbox-reference-and-methods) each ListBox after making programmatic changes to its `Data`.


## Example

>caption Using ListBox drag and drop

````RAZOR
@* Drag and drop items between ListBoxes *@

<TelerikListBox @ref="@ListBoxRef1"
                Data="@ListBoxData1"
                TextField="@nameof(ListBoxModel.Name)"
                Id="@ListBoxId1"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems1"
                Draggable="true"
                DropSources="@ListBoxDropSources"
                OnDrop="( (ListBoxDropEventArgs<ListBoxModel> args) =>
                        OnListBoxDrop(args, ListBoxId1, ListBoxData1) )">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

<TelerikListBox @ref="@ListBoxRef2"
                Data="@ListBoxData2"
                TextField="@nameof(ListBoxModel.Name)"
                Id="@ListBoxId2"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems2"
                Draggable="true"
                DropSources="@ListBoxDropSources"
                OnDrop="( (ListBoxDropEventArgs<ListBoxModel> args) =>
                        OnListBoxDrop(args, ListBoxId2, ListBoxData2) )">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

<TelerikListBox @ref="@ListBoxRef3"
                Data="@ListBoxData3"
                TextField="@nameof(ListBoxModel.Name)"
                Id="@ListBoxId3"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems3"
                Draggable="true"
                DropSources="@ListBoxDropSources"
                OnDrop="( (ListBoxDropEventArgs<ListBoxModel> args) =>
                        OnListBoxDrop(args, ListBoxId3, ListBoxData3) )">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

@code {
    private TelerikListBox<ListBoxModel> ListBoxRef1 { get; set; } = null!;
    private TelerikListBox<ListBoxModel> ListBoxRef2 { get; set; } = null!;
    private TelerikListBox<ListBoxModel> ListBoxRef3 { get; set; } = null!;

    private const string ListBoxId1 = "listbox1";
    private const string ListBoxId2 = "listbox2";
    private const string ListBoxId3 = "listbox3";

    private List<string> ListBoxDropSources => new List<string>() { ListBoxId1, ListBoxId2, ListBoxId3 };

    private List<ListBoxModel> ListBoxData1 { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData2 { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData3 { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems1 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems2 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems3 { get; set; } = new List<ListBoxModel>();

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
        ListBoxRef3.Rebind();
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
            case ListBoxId3:
                collection = ListBoxData3;
                break;
            default:
                break;
        }

        return collection;
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            ListBoxData1.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"Foo {i}"
            });
        }

        for (int i = 101; i <= 103; i++)
        {
            ListBoxData2.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"Bar {i}"
            });
        }
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````


## Next Steps

* [Implement ListBox templates](slug://listbox-templates)
* [Handle ListBox events](slug://listbox-events)


## See Also

* [Live Demo: ListBox Drag and Drop](https://demos.telerik.com/blazor-ui/listbox/drag-drop)
