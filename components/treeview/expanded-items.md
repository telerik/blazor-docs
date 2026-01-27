---
title: Expanded Items
page_title: TreeView - Expanded Items
description: Expand Items in the Telerik TreeView.
slug: treeview-expand-items
tags: telerik,blazor,treeview,expand,items
published: True
position: 4
components: ["treeview"]
---
# TreeView Expanded Items

TreeView lets the user expand multiple items. It also gives the option to pre-expand a specific item.

To use the item expansion, set the `ExpandedItems` parameter. It allows two-way binding (`@bind-ExpandedItems`) and one-way binding + [ExpandedItemsChanged](slug:treeview-events#expandeditemschanged) event.

The `ExpandedItems` collection is of type `IEnumerable<object>`.

## Programmatically Expand and Collapse Items

>caption Programmatically expand and collapse items on button click.

````RAZOR
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
    int? ItemToExpand { get; set; }
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

## See Also

* [TreeView Overview](slug:treeview-overview)
* [TreeView Data Binding](slug:components/treeview/data-binding/overview)
* [TreeView Events](slug:treeview-events)
* [Expand and collapse TreeView items on click](slug:treeview-kb-expand-collapse-on-item-click)
