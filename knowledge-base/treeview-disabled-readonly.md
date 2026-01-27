---
title: How to Disable TreeView
description: How to disable the Telerik Blazor TreeView, and restrict the ability to expand, collapse, select and check items.
type: how-to
page_title: Disable TreeView Checkboxes and Prevent Item Expand, Collapse and Selection
slug: treeview-kb-disabled-readonly
position: 
tags: 
ticketid: 1593374
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

How to disable a TreeView with checkboxes and selection? The goal is to restrict the users' ability to:

* Expand and collapse items;
* Check and uncheck item checkboxes;
* Select and deselect items.

How to enable and disable the TreeView conditionally and programmatically?

How to make the TreeView read-only?

## Solution

1\. Use one-way binding for these TreeView parameters:

* `ExpandedItems`
* `CheckedItems`
* `SelectedItems`

2\. Handle these TreeView events:

* [`ExpandedItemsChanged`](slug:treeview-events#expandeditemschanged)
* [`CheckedItemsChanged`](slug:treeview-events#checkeditemschanged)
* [`SelectedItemsChanged`](slug:treeview-events#selecteditemschanged)

Normally, the event handlers should update the expanded, checked and selected items, as the [documentation examples](slug:treeview-events) show. In this case, if the TreeView is "disabled", the event handlers will not update the TreeView parameter values. In this way, the TreeView state and nodes will remain the same.

3\. Disable [`pointer-events`](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) with a CSS rule. This will prevent client-side collapse animations in the TreeView, which may be visible to users, even though the TreeView will ignore the collapse action.

4\. Optionally, apply `opacity` CSS style to make the TreeView **look** disabled. If you need item-specific visual customizations, use the [`OnItemRender` event](slug:treeview-events#onitemrender).

>caption Disable and enable TreeView to prevent user actions

````RAZOR
<p><label> <TelerikCheckBox @bind-Value="@EnableTreeView" /> Enable TreeView </label></p>

<TelerikTreeView Data="@FlatData"
                 CheckBoxMode="@TreeViewCheckBoxMode.Multiple"
                 SelectionMode="@TreeViewSelectionMode.Multiple"
                 ExpandedItems="@TreeViewExpandedItems"
                 ExpandedItemsChanged="@TreeViewExpandedItemsChanged"
                 SelectedItems="@TreeViewSelectedItems"
                 SelectedItemsChanged="@TreeViewSelectedItemsChanged"
                 CheckedItems="@TreeViewCheckedItems"
                 CheckedItemsChanged="@TreeViewCheckedItemsChanged"
                 Class="@TreeViewClass">
</TelerikTreeView>

<style>
    .disabled-treeview {
        pointer-events: none;

        /* optional */
        /*opacity: .8;*/
    }
</style>

@code {
    private IEnumerable<TreeItem> FlatData { get; set; }

    private IEnumerable<object> TreeViewExpandedItems { get; set; } = new List<TreeItem>();

    private IEnumerable<object> TreeViewCheckedItems { get; set; } = new List<TreeItem>();

    private IEnumerable<object> TreeViewSelectedItems { get; set; } = new List<TreeItem>();

    private bool EnableTreeView { get; set; }

    private string TreeViewClass => EnableTreeView ? string.Empty : "disabled-treeview";

    private async Task TreeViewExpandedItemsChanged(IEnumerable<object> newExpandedItems)
    {
        if (EnableTreeView)
        {
            TreeViewExpandedItems = newExpandedItems;
        }
    }

    private async Task TreeViewSelectedItemsChanged(IEnumerable<object> newSelectedItems)
    {
        if (EnableTreeView)
        {
            TreeViewSelectedItems = newSelectedItems;
        }
    }

    private async Task TreeViewCheckedItemsChanged(IEnumerable<object> newCheckedItems)
    {
        if (EnableTreeView)
        {
            TreeViewCheckedItems = newCheckedItems;
        }
    }

    protected override void OnInitialized()
    {
        FlatData = LoadFlat();

        TreeViewExpandedItems = FlatData.Where(x => x.ParentId == null);
        TreeViewCheckedItems = FlatData.Where(x => x.ParentId == null);
        TreeViewSelectedItems = FlatData.Where(x => x.ParentId == null);
    }

    #region TreeView data generation and model

    List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateChildren(items, null, 1);

        return items;
    }

    private int TreeLevels { get; set; } = 3;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; } = 1;

    void PopulateChildren(List<TreeItem> items, int? parentId, int level)
    {
        for (int i = 1; i <= ItemsPerLevel; i++)
        {
            var itemId = IdCounter++;
            items.Add(new TreeItem()
            {
                Id = itemId,
                ParentId = parentId,
                HasChildren = level < TreeLevels,
                Text = $"Level {level} Item {i}"
            });

            if (level < TreeLevels)
            {
                PopulateChildren(items, itemId, level + 1);
            }
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; }
    }

    #endregion
}
````

## See Also

* [TreeView Events](slug:treeview-events)
* [TreeView CheckBoxes](slug:treeview-checkboxes-overview)
* [TreeView Expanded Items](slug:treeview-expand-items)
* [TreeView Selection](slug:treeview-selection-overview)
