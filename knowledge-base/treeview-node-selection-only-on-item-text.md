---
title: TreeView Selection Styles Apply to Full Item Width
description: 
type: troubleshooting
page_title: How to Prevent the TreeView Selection and Hover Styles From Applying to the Full Item Width
meta_title: How to Prevent the TreeView Selection and Hover Styles From Applying to the Full Item Width
slug: treeview-kb-node-selection-only-on-item-text
tags: telerik, blazor, treeview, styles
ticketid: 1716441
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeView for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>14.0.0 and above</td>
        </tr>
    </tbody>
</table>

## Description

After upgrading Telerik UI for Blazor to version 14 and above, the focus, hover and selection styles span over the whole TreeView node. In older versions, these styles were applied only to the TreeView item text. This article shows how to restore the legacy component appearance.

## Cause

The change in the TreeView styling aims to improve the UX in the new [DropDownTree component](slug:dropdowntree-overview), which must support focus, hover and selection styles on the whole dropdown width, which means on the whole TreeView width.

## Solution

There are two ways to apply focus, hover, and selection styles on the TreeView item text only:

* [Automatically restrict the TreeView width, based on the node levels and node text length](#restrict-treeview-width).
* [Override the Telerik CSS theme, remove the selection, hover, and focus styles from their default TreeView element and apply them to a child element](#move-styles-to-child-element).

### Restrict TreeView Width

Set a custom `Class` to the TreeView and use the CSS class to apply a `width: max-content` style. As a result, the TreeView will automatically shrink horizontally, based on the number of node levels and the largest node text length. The approach is simpler, but the focus, hover, and selection styles will start from the left end of the TreeView.

>caption Restrict TreeView width and focus shadow, hover background, and selection background

````RAZOR
<TelerikTreeView Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems"
                 Class="treeview-width"
                 SelectionMode="@TreeViewSelectionMode.Multiple"
                 @bind-SelectedItems="@TreeViewSelectedItems" />

<style>
    .treeview-width {
        width: max-content;
    }
</style>

@code {
    private IEnumerable<TreeItem> FlatData { get; set; } = new List<TreeItem>();
    private IEnumerable<object> TreeViewSelectedItems { get; set; } = new List<TreeItem>();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    private int TreeLevels { get; set; } = 3;
    private int RootItems { get; set; } = 2;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; } = 1;

    protected override void OnInitialized()
    {
        FlatData = LoadFlat();

        ExpandedItems = FlatData.Where(x => x.HasChildren == true); // && x.ParentId == null
    }

    private List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateChildren(items, null, 1);

        return items;
    }

    private void PopulateChildren(List<TreeItem> items, int? parentId, int level)
    {
        var itemCount = level == 1 ? RootItems : ItemsPerLevel;
        for (int i = 1; i <= itemCount; i++)
        {
            var itemId = IdCounter++;
            items.Add(new TreeItem()
            {
                Id = itemId,
                Text = $"Level {level} Item {i}",
                ParentId = parentId,
                HasChildren = level < TreeLevels
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
        public string Text { get; set; } = string.Empty;
        public object? Icon { get; set; }

    }
}
````

### Move Styles to Child Element

[Override the Telerik CSS theme](slug:themes-override), remove the selection, hover, and focus styles from their default TreeView element and apply them to a child element. This approach is more complex to implement, but achieves the exact same TreeView styling from versions 13.x and before.

>caption Move TreeView focus, hover, and selection styles to a child element

````RAZOR
<TelerikTreeView Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems"
                 Class="treeview-selection-width"
                 SelectionMode="@TreeViewSelectionMode.Multiple"
                 @bind-SelectedItems="@TreeViewSelectedItems" />

<style>
    /* Selection */
    .treeview-selection-width .k-selected {
        color: inherit;
        background-color: transparent;
    }

    .treeview-selection-width .k-selected .k-treeview-leaf {
        color: var(--kendo-color-primary-on-subtle);
        background-color: color-mix(in srgb, var(--kendo-color-primary-subtle-active) 70%, transparent);
        border-radius: var(--kendo-border-radius-sm);
    }

    /* Hover */
    .treeview-selection-width .k-treeview-item-content:hover {
        color: inherit;
        background-color: transparent;
    }

    .treeview-selection-width .k-treeview-item-content:hover .k-treeview-leaf {
        background-color: color-mix(in srgb, var(--kendo-color-on-app-surface) 18%, transparent);
        border-radius: var(--kendo-border-radius-sm);
    }

    /* Focus */
    .treeview-selection-width .k-treeview-item-content.k-focus {
        box-shadow: none;
        outline: none;
    }

    .treeview-selection-width .k-treeview-item-content.k-focus .k-treeview-leaf {
        box-shadow: inset 0 0 0 2px var(--kendo-color-border-alt);
    }
</style>

@code {
    private IEnumerable<TreeItem> FlatData { get; set; } = new List<TreeItem>();
    private IEnumerable<object> TreeViewSelectedItems { get; set; } = new List<TreeItem>();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    private int TreeLevels { get; set; } = 3;
    private int RootItems { get; set; } = 2;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; } = 1;

    protected override void OnInitialized()
    {
        FlatData = LoadFlat();

        ExpandedItems = FlatData.Where(x => x.HasChildren == true); // && x.ParentId == null
    }

    private List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateChildren(items, null, 1);

        return items;
    }

    private void PopulateChildren(List<TreeItem> items, int? parentId, int level)
    {
        var itemCount = level == 1 ? RootItems : ItemsPerLevel;
        for (int i = 1; i <= itemCount; i++)
        {
            var itemId = IdCounter++;
            items.Add(new TreeItem()
            {
                Id = itemId,
                Text = $"Level {level} Item {i}",
                ParentId = parentId,
                HasChildren = level < TreeLevels
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
        public string Text { get; set; } = string.Empty;
        public object? Icon { get; set; }

    }
}
````

## See Also

* [Override Telerik CSS theme styles](slug:themes-override)
* [TreeView Selection](slug:treeview-selection-overview)
* [TreeView Overview](slug:treeview-overview)
