---
title: Drag TreeView Items to a Custom Target
description: How to support draging and reordering items inside the TreeView but also allow dragging and dropping items outside the component to a custom target
type: how-to
page_title: How to Drag TreeView Items to a Custom Target
slug: treeview-kb-drag-to-custom-target
position: 
tags: 
ticketid: 1592132
res_type: kb
components: ["treeview"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeView for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I have a TreeView that allows dragging and reordering items inside the component. I want to also allow dragging items outside the TreeView, so the users can drop them on custom target. How to achieve that?

## Solution

To allow dragging outside the TreeView and dropping on a custom target, follow these steps:

1. Handle the [`OnDragStart`](slug:treeview-events#drag-events) event of the TreeView to get the item that the user started dragging.
1. Handle the [`@onpointerup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event) event of your custom target to add the TreeView inside as needed. Based on product specifics, the TreeView internally does not use draggable events, it uses pointer events to handle the dragging. Therefore, `@ondrop` of your custom target will not fire when dragging a TreeView item in it as the component expects a subsequent pointer event. Use the `@onpointerup` instead of `@ondrop`.
1. Change the icon in the drag clue when the user drags over the custom target to indicate it is an allowed target. Once the [Drag Clue Template](https://feedback.telerik.com/blazor/1501043-drag-clue-template) is available, you may use it to change the rendering as needed. At the time of writing, changing the icon is only possible with CSS. For that purpose:
   1. Handle [`@onpointerenter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter_event) and [`@onpointerout`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event) events of the custom target to detect when the user drags the item over it.
   1. Raise and drop a flag based on the pointer position.
   1. Conditionally apply custom CSS to change the drop clue icon based on the flag.

>caption Draggable Treeview that allows dropping items in a custom target

````RAZOR
<TelerikTreeView Data="@Data"
                 @bind-ExpandedItems="@ExpandedItems"
                 Draggable="true"
                 OnDragStart="@OnDragStart"
                 OnDrop="@TreeViewDropHandler">
</TelerikTreeView>

@* <TelerikSvgIcon Icon="@SvgIcon.Plus"></TelerikSvgIcon> - Render the desired icon to get its path. *@

<div class="custom-drop-target"
     @onpointerup="@CustomTargetDropHandler"
     @onpointerenter="@((PointerEventArgs args) => IsPointerOverCustomTarget = true)"
     @onpointerout="@((PointerEventArgs args) => IsPointerOverCustomTarget = false)">

    @foreach (var item in DroppedItems)
    {
        @item.Text
        <br />
    }
</div>

<style>
    .custom-drop-target {
        width: 300px;
        height: 300px;
        border: 1px solid black;
        overflow: auto;
    }
</style>

@if (IsPointerOverCustomTarget && !IsItemAlreadyInCustomTarget)
{
    <style>
        .k-drag-clue .k-svg-icon.k-svg-i-cancel svg path {
            d: path("M288 224V96h-64v128H96v64h128v128h64V288h128v-64z");
        }
    </style>
}

@code {
    private TreeItem DraggedtItem { get; set; }
    private List<TreeItem> Data { get; set; } = new List<TreeItem>();
    private IEnumerable<object> ExpandedItems { get; set; } = Enumerable.Empty<object>();
    private List<TreeItem> DroppedItems { get; set; } = new List<TreeItem>();
    private bool IsPointerOverCustomTarget { get; set; }
    private bool IsItemAlreadyInCustomTarget { get; set; }


    private void OnDragStart(TreeViewDragStartEventArgs args)
    {
        DraggedtItem = (TreeItem)args.Item;

        IsItemAlreadyInCustomTarget = DroppedItems.Any(x => x.Id == DraggedtItem.Id);
    }

    private void CustomTargetDropHandler()
    {
        if (DraggedtItem != null && !IsItemAlreadyInCustomTarget)
        {
            DroppedItems.Add(DraggedtItem);
        }
    }

    private void TreeViewDropHandler(TreeViewDropEventArgs args)
    {
        var item = args.Item as TreeItem;
        var destinationItem = args.DestinationItem as TreeItem;

        if (destinationItem != null && IsChild(item, destinationItem))
        {
            return;
        }

        Data.Remove(item);

        if (item.ParentId != null && !Data.Any(x => item.ParentId == x.ParentId))
        {
            Data.FirstOrDefault(x => x.Id == item.ParentId).HasChildren = false;
        }

        if (args.DropPosition == TreeViewDropPosition.Over)
        {
            item.ParentId = destinationItem.Id;
            destinationItem.HasChildren = true;

            Data.Add(item);
        }
        else
        {
            var index = Data.IndexOf(destinationItem);

            item.ParentId = destinationItem.ParentId;

            if (args.DropPosition == TreeViewDropPosition.After)
            {
                index++;
            }

            Data.Insert(index, item);
        }

        // Refresh data
        Data = new List<TreeItem>(Data);
    }

    private bool IsChild(TreeItem item, TreeItem destinationItem)
    {
        if (destinationItem?.ParentId == null || item == null)
        {
            return false;
        }
        else if (destinationItem.ParentId?.Equals(item.Id) == true)
        {
            return true;
        }

        var parentDestinationItem = Data.FirstOrDefault(e => e.Id.Equals(destinationItem.ParentId));

        return IsChild(item, parentDestinationItem);
    }

    protected override void OnInitialized()
    {
        LoadData();

        base.OnInitialized();
    }

    private void LoadData()
    {
        Data = new List<TreeItem>()
        {
            new TreeItem(1, null, "Documents", SvgIcon.Folder, true),
                new TreeItem(2, 1, "report.xlsx", SvgIcon.FileExcel, false),
                new TreeItem(3, 1, "status.docx", SvgIcon.FileWord, false),
                new TreeItem(4, 1, "conferences.xlsx", SvgIcon.FileExcel, false),
                new TreeItem(5, 1, "performance.pdf", SvgIcon.FilePdf, false),
            new TreeItem(6, null, "Pictures", SvgIcon.Folder, true),
                new TreeItem(7, 6, "Camera Roll", SvgIcon.Folder, true),
                    new TreeItem(8, 7, "team.png", SvgIcon.FileImage, false),
                    new TreeItem(9, 7, "team-building.png", SvgIcon.FileImage, false),
                    new TreeItem(10, 7, "friends.png", SvgIcon.FileImage, false),
        };
        ExpandedItems = Data.ToList();
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool HasChildren { get; set; }

        public TreeItem(int id, int? parent, string text, ISvgIcon icon, bool hasChildren)
        {
            Id = id;
            ParentId = parent;
            Text = text;
            Icon = icon;
            HasChildren = hasChildren;
        }
    }
}
````