---
title: Drag and Drop
page_title: ListBox - Drag and Drop
description:
slug: listbox-dragdrop
tags: telerik,blazor,listbox
published: True
position: 40
---

# ListBox Item Drag and Drop


## Example

>caption Using ListBox drag and drop

````CSHTML
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

    private string ListBoxId1 { get; set; } = "listbox1";
    private string ListBoxId2 { get; set; } = "listbox2";
    private string ListBoxId3 { get; set; } = "listbox3";

    private List<string> ListBoxDropSources => new List<string>() { ListBoxId1, ListBoxId2, ListBoxId3 };

    private List<ListBoxModel> ListBoxData1 { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData2 { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData3 { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems1 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems2 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems3 { get; set; } = new List<ListBoxModel>();

    private void OnListBoxDrop(ListBoxDropEventArgs<ListBoxModel> args,
        string sourceId,
        List<ListBoxModel> sourceCollection)
    {
        var newIndex = args.DestinationIndex ?? 0;

        if (args.DestinationListBoxId == sourceId)
        {
            ReorderItems(args.Items, ListBoxData1, newIndex);
        }
        else
        {
            switch (args.DestinationListBoxId)
            {
                case var value when value == ListBoxId1:
                    MoveItems(args.Items, sourceCollection, ListBoxData1, newIndex);
                    break;
                case var value when value == ListBoxId2:
                    MoveItems(args.Items, sourceCollection, ListBoxData2, newIndex);
                    break;
                case var value when value == ListBoxId3:
                    MoveItems(args.Items, sourceCollection, ListBoxData3, newIndex);
                    break;
                default:
                    break;
            }
        }

        ListBoxRef1.Rebind();
        ListBoxRef2.Rebind();
        ListBoxRef3.Rebind();
    }

    private void ReorderItems(List<ListBoxModel> items, List<ListBoxModel> collection, int destinationIndex)
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

    private void MoveItems(List<ListBoxModel> items,
        List<ListBoxModel> sourceCollection,
        List<ListBoxModel> destinationCollection,
        int destinationIndex)
    {
        foreach (var item in items)
        {
            sourceCollection.RemoveAll(x => items.Any(y => y.Id == x.Id));

            if (destinationIndex >= 0)
            {
                destinationCollection.Insert(destinationIndex, item);
            }
            else
            {
                destinationCollection.Add(item);
            }
        }
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

* [Implement ListBox templates]({%slug listbox-templates%})
* [Handle ListBox events]({%slug listbox-events%})


## See Also

* [Live Demo: ListBox Selection](https://demos.telerik.com/blazor-ui/listbox/drag-drop)
