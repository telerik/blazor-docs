---
title: Connect ListBoxes
page_title: ListBox - Connect Multiple Instances
description: How to connect (link) several ListBoxes and move items from one to another with the ListBox toolbar buttons.
slug: listbox-connect
tags: telerik,blazor,listbox
published: True
position: 30
---

# Connect ListBox Instances

One of the main benefits of the Telerik Blazor ListBox is the ability to move items from one component instance to another. This article explains how to link multiple ListBoxes to transfer items.

The ListBox component allows connecting unlimited number of instances. However, the connecting always works in pairs:

* There is one primary ListBox instance and one secondary.
* The primary ListBox is the one that shows toolbar buttons and fires `OnTransfer` events.
* The secondary ListBox can be primary to a third ListBox component, and so on.


## Configuration

To connect ListBox components:

1. Set the `Id` parameter of all ListBox instances.
1. Set the `ConnectedListBoxId` parameter of the primary instance to the `Id` value of the secondary instance.
1. [Hide the transfer buttons](slug:listbox-toolbar) from the secondary instance, unless it's a primary one for another ListBox.
1. Subscribe to the [`OnTransfer` event handler](slug:listbox-events#ontransfer) of all primary ListBoxes.
1. [`Rebind()`](slug:listbox-overview#listbox-reference-and-methods) each ListBox after making programmatic changes to its `Data`.

> The object references in `args.Items` in the [`OnTransfer` handler](slug:listbox-events#ontransfer) do not match the object references in the `Data` collection of the source ListBox. To remove items from the source ListBox, search for them by some unique identifier.


## Example

>caption Connect and move items between ListBoxes

````RAZOR
@* Connect and move items between ListBoxes *@

<TelerikListBox @ref="@ListBoxRef1"
                Data="@ListBoxData1"
                TextField="@nameof(ListBoxModel.Name)"
                Id="@ListBoxId1"
                ConnectedListBoxId="@ListBoxId2"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems1"
                OnTransfer="@( (ListBoxTransferEventArgs<ListBoxModel> args) => OnListBoxTransfer1(args) )">
    <ListBoxToolBarSettings>
        <ListBoxToolBar>
            <ListBoxToolBarTransferToTool />
            <ListBoxToolBarTransferFromTool />
            <ListBoxToolBarTransferAllToTool />
            <ListBoxToolBarTransferAllFromTool />
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
</TelerikListBox>

<TelerikListBox @ref="@ListBoxRef2"
                Data="@ListBoxData2"
                TextField="@nameof(ListBoxModel.Name)"
                Id="@ListBoxId2"
                ConnectedListBoxId="@ListBoxId3"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems2"
                OnTransfer="@( (ListBoxTransferEventArgs<ListBoxModel> args) => OnListBoxTransfer2(args) )">
    <ListBoxToolBarSettings>
        <ListBoxToolBar>
            <ListBoxToolBarTransferToTool />
            <ListBoxToolBarTransferFromTool />
            <ListBoxToolBarTransferAllToTool />
            <ListBoxToolBarTransferAllFromTool />
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
</TelerikListBox>

<TelerikListBox @ref="@ListBoxRef3"
                Data="@ListBoxData3"
                TextField="@nameof(ListBoxModel.Name)"
                Id="@ListBoxId3"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems3">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

<br />
<br />

<label><TelerikCheckBox @bind-Value="@SelectItemsInDestination" /> Select Moved Items in Destination ListBox</label>

@code {
    private TelerikListBox<ListBoxModel> ListBoxRef1 { get; set; } = null!;
    private TelerikListBox<ListBoxModel> ListBoxRef2 { get; set; } = null!;
    private TelerikListBox<ListBoxModel> ListBoxRef3 { get; set; } = null!;

    private const string ListBoxId1 = "listbox1";
    private const string ListBoxId2 = "listbox2";
    private const string ListBoxId3 = "listbox3";

    private List<ListBoxModel> ListBoxData1 { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData2 { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData3 { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems1 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems2 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems3 { get; set; } = new List<ListBoxModel>();

    private bool SelectItemsInDestination { get; set; } = true;

    private void OnListBoxTransfer1(ListBoxTransferEventArgs<ListBoxModel> args)
    {
        if (args.DestinationListBoxId == ListBoxId1)
        {
            foreach (var item in args.Items)
            {
                ListBoxData2.RemoveAll(x => args.Items.Any(y => y.Id == x.Id));
                ListBoxData1.Add(item);
                if (SelectItemsInDestination)
                {
                    ListBoxSelectedItems1 = ListBoxSelectedItems1.Append(item);
                }
            }
        }
        else
        {
            foreach (var item in args.Items)
            {
                ListBoxData1.RemoveAll(x => args.Items.Any(y => y.Id == x.Id));
                ListBoxData2.Add(item);
                if (SelectItemsInDestination)
                {
                    ListBoxSelectedItems2 = ListBoxSelectedItems2.Append(item);
                }
            }
        }

        ListBoxRef1.Rebind();
        ListBoxRef2.Rebind();
    }

    private void OnListBoxTransfer2(ListBoxTransferEventArgs<ListBoxModel> args)
    {
        if (args.DestinationListBoxId == ListBoxId2)
        {
            foreach (var item in args.Items)
            {
                ListBoxData3.RemoveAll(x => args.Items.Any(y => y.Id == x.Id));
                ListBoxData2.Add(item);
                if (SelectItemsInDestination)
                {
                    ListBoxSelectedItems2 = ListBoxSelectedItems2.Append(item);
                }
            }
        }
        else
        {
            foreach (var item in args.Items)
            {
                ListBoxData2.RemoveAll(x => args.Items.Any(y => y.Id == x.Id));
                ListBoxData3.Add(item);
                if (SelectItemsInDestination)
                {
                    ListBoxSelectedItems3 = ListBoxSelectedItems3.Append(item);
                }
            }
        }

        ListBoxRef2.Rebind();
        ListBoxRef3.Rebind();
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

* [Enable ListBox drag-and-drop](slug:listbox-dragdrop)
* [Implement ListBox templates](slug:listbox-templates)
* [Handle ListBox events](slug:listbox-events)


## See Also

* [Live Demo: ListBox](https://demos.telerik.com/blazor-ui/listbox/overview)
