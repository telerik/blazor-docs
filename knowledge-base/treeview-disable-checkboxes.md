---
title: How to Disable Checkboxes for Certain TreeView Items
description: Learn how to disable checkboxes for certain items in the TreeView component based on a condition
type: how-to
page_title: How to Disable Checkboxes for Certain TreeView Items
slug: treeview-kb-disable-checkboxes
tags: blazor, treeview, checkbox, disabled
res_type: kb
ticketid: 1681641
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

This knowledge base article answers the following questions:

- How can I apply custom CSS to TreeView items conditionally?
- How to use the [`OnItemRender` event](slug:treeview-events#onitemrender) in the TreeView for Blazor?
- Is it possible to disable checkboxes for certain TreeView items?

## Solution

To disable checkboxes for specific TreeView items based on a condition, use the `OnItemRender` event to apply a custom class to those items. Then, use CSS to style these items and their checkboxes as disabled. The following steps outline how to achieve this:

1. Use the [`OnItemRender` event](slug:treeview-events#onitemrender) of the TreeView component to conditionally apply a custom CSS class.

2. Define CSS styles that mimic the disabled state for the checkboxes and the items.

3. Ensure your TreeView model includes a property (e.g., `IsActive`, `IsDisabled`)that you'll use to determine if an item's checkbox should be disabled.

### Implementation

````RAZOR
<TelerikTreeView Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems"
                 CheckBoxMode="@TreeViewCheckBoxMode.Multiple"
                 @bind-CheckedItems="@CheckedItems"
                 OnItemRender="@HandleOnItemRender">
    <TreeViewBindings>
        <TreeViewBinding IdField="Id" ParentIdField="ParentIdValue" TextField="Text" HasChildrenField="HasChildren" IconField="Icon" />
    </TreeViewBindings>
</TelerikTreeView>

<style>
    .disabled-checkbox .k-checkbox {
        opacity: 0.7;
        pointer-events: none;
    }

    .disabled-checkbox .k-treeview-leaf {
        opacity: 0.7;
        pointer-events: none;
    }
</style>

@code {
    private IEnumerable<TreeViewItem> FlatData { get; set; }
    private IEnumerable<object> CheckedItems { get; set; } = new List<object>();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeViewItem>();

    private void HandleOnItemRender(TreeViewItemRenderEventArgs args)
    {
        var item = args.Item as TreeViewItem;
        if (!item.IsActive)
        {
            args.Class = "disabled-checkbox";
        }
    }
    protected override void OnInitialized()
    {
        LoadFlatData();
        ExpandedItems = FlatData.Where(x => x.HasChildren).ToList();
    }

    private void LoadFlatData()
    {
        List<TreeViewItem> items = new List<TreeViewItem>();

        items.Add(new TreeViewItem()
        {
            Id = 1,
            Text = "Root",
            ParentIdValue = null,
            HasChildren = true,
            Icon = SvgIcon.Folder,
            IsChecked = false,
            IsActive = true
        });

        Random rnd = new Random();
        for (int i = 2; i <= 5; i++)
        {
            bool hasChildren = rnd.Next(0, 2) == 1;
            items.Add(new TreeViewItem()
            {
                Id = i,
                Text = $"Folder {i}",
                ParentIdValue = 1,
                HasChildren = hasChildren,
                Icon = hasChildren ? SvgIcon.Folder : SvgIcon.File,
                IsChecked = false,
                IsActive = rnd.Next(0, 2) == 1
            });

            if (hasChildren)
            {
                for (int j = 1; j <= rnd.Next(1, 4); j++)
                {
                    int childId = i * 10 + j;
                    items.Add(new TreeViewItem()
                    {
                        Id = childId,
                        Text = $"File {childId}",
                        ParentIdValue = i,
                        HasChildren = false,
                        Icon = SvgIcon.File,
                        IsChecked = false,
                        IsActive = rnd.Next(0, 2) == 1
                    });
                }
            }
        }

        FlatData = items;
    }

    public class TreeViewItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentIdValue { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool IsChecked { get; set; }
        public bool IsActive { get; set; }
    }
}
````

## See Also

- [TreeView Overview](slug:treeview-overview)
- [TreeView OnItemRender Event](slug:treeview-events#onitemrender)
