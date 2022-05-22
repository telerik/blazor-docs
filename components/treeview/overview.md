---
title: Overview
page_title: Treeview Overview
description: Overview of the Treeview for Blazor, with feature description.
slug: treeview-overview
tags: telerik,blazor,treeview,overview
published: True
position: 0
---

# Blazor Treeview Overview

The <a href="https://www.telerik.com/blazor-ui/treeview" target="_blank">Blazor Treeview component</a> displays data in a traditional tree-like structure. The data itself can be flat or hierarchical. In addition to built-in navigation capabilities, you can navigate through the items and their children, define [templates]({%slug components/treeview/templates%}) for the individual nodes, render text, checkboxes and icons, and respond to events.

## Creating Blazor TreeView

1. Use the `TelerikTreeView` tag.
1. Set the TreeView `Data` attribute to an `IEnumerable<T>`. The TreeView will automatically recognize property names like `Id`, `ParentId`, `Text` and a few others. Otherwise, [use bindings to configure custom property names]({%slug components/treeview/data-binding/overview%}#treeview-bindings).
1. (optional) Set the `ExpandedItems` attribute to a **non-null** `IEnumerable<object>`. Use it expand or collapse items programmatically.

>caption TreeView with flat self-referencing data and icons

````CSHTML
<TelerikTreeView Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems" />

@code {
    IEnumerable<TreeItem> FlatData { get; set; }
    IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    protected override void OnInitialized()
    {
        FlatData = GetFlatData();

        ExpandedItems = FlatData.Where(x => x.HasChildren == true).ToList();
    }

    List<TreeItem> GetFlatData()
    {
        List<TreeItem> items = new List<TreeItem>();

        items.Add(new TreeItem()
        {
            Id = 1,
            Text = "wwwroot",
            ParentId = null,
            HasChildren = true,
            Icon = "folder"
        });
        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "css",
            ParentId = 1,
            HasChildren = true,
            Icon = "folder"
        });
        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "js",
            ParentId = 1,
            HasChildren = true,
            Icon = "folder"
        });
        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "site.css",
            ParentId = 2,
            Icon = "css"
        });
        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "scripts.js",
            ParentId = 3,
            Icon = "js"
        });

        return items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Icon { get; set; }
    }
}
````
>caption Expand nodes programmatically

````CSHTML
@*To expand a specific node, the parent of this node needs to be expanded as well.*@

<p>
    <label>Item Id: <TelerikNumericTextBox @bind-Value="@ItemToExpand" Width="80px" /></label>
    <TelerikButton OnClick="@ExpandItem">Expand Item @ItemToExpand</TelerikButton>
</p>
<p>
    <TelerikButton OnClick="@ExpandRoot">Expand Root Items</TelerikButton>
    <TelerikButton OnClick="@ExpandAll">Expand All</TelerikButton>
    <TelerikButton OnClick="@CollapseAll">Collapse All</TelerikButton>
</p>

<TelerikTreeView Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems"
                 @bind-SelectedItems="@SelectedItems"
                 SelectionMode="@TreeViewSelectionMode.Single" />

@code {
    public IEnumerable<TreeItem> FlatData { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();
    public IEnumerable<object> SelectedItems { get; set; } = new List<TreeItem>();

    int ItemToExpand { get; set; }
    Random rnd { get; set; } = new Random();

    void ExpandItem()
    {
        var allItemsToExpand = new List<TreeItem>();
        var leafItem = FlatData.Where(x => x.Id == ItemToExpand).FirstOrDefault();
        int? parentId = null;

        if (leafItem != null)
        {
            // item selection is not required for expanding
            SelectedItems = new List<TreeItem>() { leafItem };

            allItemsToExpand.Add(leafItem);
            parentId = leafItem.ParentId;
            while (parentId != null)
            {
                var parentItem = FlatData.Where(x => x.Id == parentId).FirstOrDefault();
                allItemsToExpand.Add(parentItem);
                parentId = parentItem.ParentId;
            }
        }

        ExpandedItems = allItemsToExpand;
    }

    void ExpandRoot()
    {
        ExpandedItems = FlatData.Where(x => x.ParentId == null && x.HasChildren == true);
    }

    void ExpandAll()
    {
        ExpandedItems = FlatData.Where(x => x.HasChildren == true);
    }

    void CollapseAll()
    {
        ExpandedItems = new List<TreeItem>();
        SelectedItems = new List<TreeItem>();
    }

    protected override void OnInitialized()
    {
        FlatData = LoadFlat();

        ItemToExpand = rnd.Next(1, FlatData.Count() + 1);
    }

    int TreeLevels { get; set; } = 3;
    int ItemsPerLevel { get; set; } = 3;
    int IdCounter { get; set; } = 1;

    List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateTreeItems(items, null, 1);

        return items;
    }

    void PopulateTreeItems(List<TreeItem> items, int? parentId, int level)
    {
        for (int i = 1; i <= ItemsPerLevel; i++)
        {
            var itemId = IdCounter++;
            items.Add(new TreeItem()
                {
                    Id = itemId,
                    Text = $"Level {level} Item {i} Id {itemId}",
                    ParentId = parentId,
                    HasChildren = level < TreeLevels
                });

            if (level < TreeLevels)
            {
                PopulateTreeItems(items, itemId, level + 1);
            }
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }
}
````

## Data Binding

The [TreeView provides flexible data binding]({%slug components/treeview/data-binding/overview%}) with the following capabilities:

* [Binding to flat data]({%slug components/treeview/data-binding/flat-data%}) (self-referencing data)
* [Binding to hierarchical data]({%slug components/treeview/data-binding/hierarchical-data%}). It is possible to use different types for the items at different levels.
* [Loading child items on demand]({%slug components/treeview/data-binding/load-on-demand%}) to improve performance
* [Setting property names]({%slug components/treeview/data-binding/overview%}#treeview-bindings) for item IDs, text, parent IDs, icons, links, etc.


## Selection

The TreeView supports two selection modes:

* [Standard selection]({%slug treeview-selection-overview%}) via item clicks
* [Checkbox selection]({%slug treeview-checkboxes-overview%}) that allows selecting all child items at once


## Templates

Use [templates to customize the TreeView item rendering]({%slug components/treeview/templates%}). Define a single template for all levels, or a [different template for each level]({%slug components/treeview/templates%}#different-templates-for-different-node-levels).


## Drag and Drop

Users can [drag and drop TreeView items]({%slug treeview-drag-drop-overview%}) within the same TreeView or between different ones.


## Navigate Views

The TreeView can [display links to app views and external pages]({%slug treeview-navigation%}).


## TreeView Parameters

The following table lists TreeView parameters, which are not related to other features on this page. Check the [TreeView API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeView) for a full list of properties, methods and events.

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders additional CSS class to the `div.k-treeview` element. Use it to apply custom styles or [override the theme]({%slug themes-override%}). |
| `Size` | `string` <br /> `"md"` | Affects the TreeView layout, for example the amount of space between items. The possible valid values are `"lg"` (large), `"md"` (medium) and `"sm"` (small). For easier setting, use the predefined string properties in class [`Telerik.Blazor.ThemeConstants.TreeView.Size`](/blazor-ui/api/Telerik.Blazor.ThemeConstants.TreeView.Size). |


## Next Steps

* [Review TreeView data binding]({%slug components/treeview/data-binding/overview%})
* [Experiment with TreeView Checkboxes]({%slug treeview-checkboxes-overview%})


## See Also

* [Live TreeView Demos](https://demos.telerik.com/blazor-ui/treeview/index)
* [TreeVew API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeView)
