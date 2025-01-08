---
title: Validate Drop Target in TreeView
description: How to validate drop target in Telerik TreeView for Blazor and prevent drop for invalid target.
type: how-to
page_title: How to Validate Drop Target in TreeView
slug: treeview-kb-validate-drop-target
tags: treeview, item, node, drop target, draggable, validate, invalid, prevent drop
ticketid: 1592132
res_type: kb
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

I have a draggable TreeView and I want to prevent the user from dropping items in specific locations or folders. How can I achieve this? 

How to validate the drop target, so I don't allow the user to drop the file if the target is invalid?

## Solution

To validate the drop target and prevent the user from dropping on an invalid target, follow these steps:

1. Handle the [`OnDrag`](slug://treeview-events#drag-events) event of the TreeView to validate the target based on your requirements. In the example below, we are checking it the user tries to drop an item from the **Documents** folder into the **Pictures** folder - the **Pictures** folder is not a valid target in this case.
1. Raise a flag if the target is not valid.
1. Change the icon in the drag clue to indicate the target is not valid. Once the [Drag Clue Template](https://feedback.telerik.com/blazor/1501043-drag-clue-template) is available, you may use it to change the rendering as needed. At the time of writing, changing the icon is only possible with CSS as per the example below.
1. Include a conditional logic in your [`OnDrop`](slug://treeview-events#drag-events) handler to not perform any action if the target is invalid.
1. Use CSS to hide the build-in drop hint for the invalid target.


>caption Validate TreeView drop target and prevent drop for invalid target

````RAZOR
This TreeView does not allow the user to drop items from the Documents folder into the Pictures folder.

<TelerikTreeView Data="@Data"
                 @bind-ExpandedItems="@ExpandedItems"
                 Draggable="true"
                 DragThrottleInterval="150"
                 OnDrag="@OnDrag"
                 OnDrop="@OnItemDrop">
</TelerikTreeView>

@if (IsPointerOverInvalidTarget)
{
    <style>
        .k-drag-clue .k-svg-icon svg path {
            d: path("M256 32c-50.3 0-96.8 16.6-134.1 44.6-17.2 12.8-32.4 28.1-45.3 45.3C48.6 159.2 32 205.7 32 256c0 123.7 100.3 224 224 224 50.3 0 96.8-16.6 134.1-44.6 17.2-12.8 32.4-28.1 45.3-45.3 28-37.4 44.6-83.8 44.6-134.1 0-123.7-100.3-224-224-224m0 384c-88.2 0-160-71.8-160-160 0-32.6 9.8-62.9 26.6-88.2l221.6 221.6C318.9 406.2 288.6 416 256 416m133.4-71.8L167.8 122.6C193.1 105.8 223.4 96 256 96c88.2 0 160 71.8 160 160 0 32.6-9.8 62.9-26.6 88.2");
        }

        .k-drop-hint {
            display: none;
        }
    </style>
}

@code {
    private TreeItem DestinationItem { get; set; }
    private List<TreeItem> Data { get; set; } = new List<TreeItem>();
    private IEnumerable<object> ExpandedItems { get; set; } = Enumerable.Empty<object>();
    private bool IsPointerOverInvalidTarget { get; set; }

    private void OnDrag(TreeViewDragEventArgs args)
    {
        if (args.DestinationItem != null)
        {
            var draggedItem = args.Item as TreeItem;
            var destinationItem = args.DestinationItem as TreeItem;

            if (draggedItem.ParentId == 1 && (destinationItem.ParentId == 7 || destinationItem.Id == 6 || destinationItem.Id == 7))
            {
                IsPointerOverInvalidTarget = true;
            }
            else
            {
                IsPointerOverInvalidTarget = false;
            }
        }
    }

    private void OnItemDrop(TreeViewDropEventArgs args)
    {
        if (IsPointerOverInvalidTarget)
        {
            return;
        }
        else
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
