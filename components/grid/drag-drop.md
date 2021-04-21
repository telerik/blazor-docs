---
title: Drag and Drop
page_title: Grid Drag and Drop
description: Overview of the Drag and Drop functionality for Grid for Blazor.
slug: grid-drag-drop-overview
tags: telerik,blazor,grid,drap,drop,dragdrop,row,rows,overview
published: True
position: 11
---

# Drag and Drop

The Drag and Drop functionality for the Grid allows you to move a row or a multitude of rows between different parents in the same Grid or between different Telerik Grid instances.

This article will be separated in the following sections:

* [Basics](#basics)
* [OnDrop Event](#ondrop-event)
* [Examples](#examples)
    * [Flat Data](#flat-data)
    * [Hierarchical Data](#hierarchical-data)
    * [Between Different TreeViews](#between-different-treeviews)

## Basics

To enable the Drag and Drop functionality:

1. Set the `Draggable` parameter of the `<TelerikTreeView>` to `true`

1. Use the `OnDrop` event to handle the drag and drop operations and modify the data source as per your business logic.


## OnDrop Event

The `OnDrop` event fires when the user drops a node into a new location. It allows you to manipulate your data collection based on where the user dropped the element. 

### Event Arguments

The `OnDrop` event provides an object of type `TreeViewDropEventArgs` to its event handler which exposes the following fields:

* `Item` - an `object` that represents the dragged node. You can cast this object to your model class.

* `DestinationItem` - an `object` that represents the node over which the `Item` is dropped to. You can cast this object to your model class.

* `DropPosition` - an `enum` - its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`:
    * `After`
    * `Below`
    * `Over`
    
* `DestinationTreeView` - the reference of the TreeView in which the node is dropped. This is applicable when you drag and drop nodes between different instances of the component. 

## Examples

* [Flat Data](#flat-data)
* [Hierarchical Data](#hierarchical-data)
* [Between Different TreeViews](#between-different-treeviews)

### Flat Data

````Component
@inject TreeViewFlatDataService TreeViewFlatDataService

    <TelerikTreeView Data="@FlatData"
                     Draggable="@Draggable"
                     OnDrop="@OnDrop">
        <TreeViewBindings>
            <TreeViewBinding TextField="Text" ParentIdField="ParentId" />
        </TreeViewBindings>
    </TelerikTreeView>

@code {
    public bool Draggable { get; set; } = true;
    public List<BaseFlatItem> FlatData { get; set; }

    protected override void OnInitialized()
    {
        FlatData = TreeViewFlatDataService.GetFlatItems();
    }

    private void OnDrop(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseFlatItem;
        var destinationItem = args.DestinationItem as BaseFlatItem;

        FlatData = TreeViewFlatDataService.ReorderItems(args.DropPosition, item, destinationItem);
    }
}
````
````Service
using System;
using System.Collections.Generic;
using System.Linq;
using Telerik.Blazor;
using TelerikBlazorAppSource.Models;

    public class TreeViewFlatDataService
    {
        private string ItemText { get; set; }

        private List<BaseFlatItem> _flatItems;

        private List<BaseFlatItem> FlatItems
        {
            get
            {
                if (_flatItems == null)
                {
                    _flatItems = GenerateFlatItems(null, 0, ItemText);
                }

                return _flatItems;
            }
        }

        public TreeViewFlatDataService()
        {
            ItemText = "Item";
        }

        public TreeViewFlatDataService(string text)
        {
            ItemText = text;
        }

        public List<BaseFlatItem> GetFlatItems()
        {
            return FlatItems;
        }

        private List<BaseFlatItem> GenerateFlatItems(Guid? parentId, int level, string parentName)
        {
            var items = new List<BaseFlatItem>();

            for (var i = 1; i <= 4; i++)
            {
                var id = Guid.NewGuid();
                var name = $"{parentName}{i}";

                var item = new BaseFlatItem()
                {
                    Id = id,
                    ParentId = parentId,
                    HasChildren = level < 3,
                    Text = name
                };

                items.Add(item);

                if (level < 3)
                {
                    items.AddRange(GenerateFlatItems(id, level + 1, name + "."));
                }
            }

            return items;
        }

        public List<BaseFlatItem> ReorderItems(TreeViewDropPosition position, BaseFlatItem sourceItem, BaseFlatItem destinationItem)
        {
            // remove the source item from the current position
            Remove(sourceItem);

            // insert in the right place according to the dropposition
            ReorderCollection(position, sourceItem, destinationItem);

            return new List<BaseFlatItem>(FlatItems);
        }

        public void SetExpanded(BaseFlatItem item, bool expanded)
        {
            item.Expanded = expanded;
        }

        private void Remove(BaseFlatItem sourceItem)
        {
            // update the hasChildren state of the parent item of the source flat item that is dragged

            var parentFlatItem = FlatItems.FirstOrDefault(f => f.Id == sourceItem.ParentId);

            if (parentFlatItem != null)
            {
                var childItemsCount = FlatItems.Count(child => child.ParentId == parentFlatItem.Id);

                parentFlatItem.HasChildren = childItemsCount > 1;
            }

            FlatItems.Remove(sourceItem);
        }

        private void ReorderCollection(TreeViewDropPosition position, BaseFlatItem sourceItem, BaseFlatItem destinationItem)
        {
            if (position == TreeViewDropPosition.Over)
            {
                // simply change the parent id and add it in the collection, so that the item will be placed on last position
                sourceItem.ParentId = destinationItem.Id;

                FlatItems.Add(sourceItem);
            }
            else if (position == TreeViewDropPosition.Before)
            {
                // handle movement in other parent
                sourceItem.ParentId = destinationItem.ParentId;

                FlatItems.Insert(FlatItems.IndexOf(destinationItem), sourceItem);
            }
            else if (position == TreeViewDropPosition.After)
            {
                // handle movement in other parent
                sourceItem.ParentId = destinationItem.ParentId;

                FlatItems.Insert(FlatItems.IndexOf(destinationItem), sourceItem);
            }
        }
    }
````
````Model
    public class BaseFlatItem
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
        public bool Expanded { get; set; }
    }
````

### Hierarchical Data

````Component
@inject TreeViewHierarchicalDataService TreeViewHierarchicalDataService

<TelerikTreeView Data="@HierarchicalData"
                 Draggable="@Draggable"
                 OnDrop="@OnDrop">
    <TreeViewBindings>
        <TreeViewBinding ItemsField="Items" HasChildrenField="HasItems"></TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>


@code {
    public bool Draggable { get; set; } = true;
    public List<BaseHierarchicalItem> HierarchicalData { get; set; }

    protected override void OnInitialized()
    {
        HierarchicalData = TreeViewHierarchicalDataService.GetHierarchicalItems();
    }

    private void OnDrop(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseHierarchicalItem;
        var destinationItem = args.DestinationItem as BaseHierarchicalItem;

        HierarchicalData = TreeViewHierarchicalDataService.ReorderHierarchicalItems(args.DropPosition, item, destinationItem);
    }
}
````
````Service
using System.Collections.Generic;
using Telerik.Blazor;

    public class TreeViewHierarchicalDataService
    {
        private string ItemText { get; set; }

        private List<BaseHierarchicalItem> _hierarchicalItems;

        private List<BaseHierarchicalItem> HierarchicalItems
        {
            get
            {
                if (_hierarchicalItems == null)
                {
                    _hierarchicalItems = GenerateHierarchicalItems(ItemText);
                }

                return _hierarchicalItems;
            }
        }

        public TreeViewHierarchicalDataService()
        {
            ItemText = "Item";
        }

        public TreeViewHierarchicalDataService(string text)
        {
            ItemText = text;
        }

        public List<BaseHierarchicalItem> GetHierarchicalItems()
        {
            return HierarchicalItems;
        }

        private List<BaseHierarchicalItem> GenerateHierarchicalItems(string parentName, int level = 0)
        {
            var items = new List<BaseHierarchicalItem>();

            for (var i = 1; i <= 4; i++)
            {
                var name = $"{parentName}{i}";

                var item = new BaseHierarchicalItem()
                {
                    HasChildren = level < 2,
                    Text = name
                };

                if (level < 2)
                {
                    item.Items = GenerateHierarchicalItems(name + ".", level + 1);
                }

                items.Add(item);
            }

            return items;
        }

        public List<BaseHierarchicalItem> ReorderHierarchicalItems(TreeViewDropPosition position, BaseHierarchicalItem sourceItem, BaseHierarchicalItem destinationItem)
        {
            // remove the item from its current place in the collection
            RemoveItem(sourceItem);

            // insert in the right place according to the dropposition
            ReorderCollection(position, sourceItem, destinationItem);

            return new List<BaseHierarchicalItem>(HierarchicalItems);
        }

        public void SetExpanded(BaseHierarchicalItem item, bool expanded)
        {
            item.Expanded = expanded;
        }

        private void RemoveItem(BaseHierarchicalItem item)
        {
            // locate the parent of the source item
            var sourceParentItem = HierarchicalItems.FindRecursive(it => it.Items?.Contains(item) ?? false);
            var sourceCollection = sourceParentItem?.Items ?? HierarchicalItems;

            sourceCollection.Remove(item);
        }

        private void ReorderCollection(TreeViewDropPosition position, BaseHierarchicalItem sourceItem, BaseHierarchicalItem destinationItem)
        {
            var destinationParentItem = HierarchicalItems.FindRecursive(item => item.Items?.Contains(destinationItem) ?? false);

            if (destinationParentItem != null)
            {
                destinationParentItem.Items = destinationParentItem.Items ?? new List<BaseHierarchicalItem>();
            }

            var itemsCollection = destinationParentItem?.Items ?? HierarchicalItems;
            var destinationItemIndex = itemsCollection.IndexOf(destinationItem);

            if (position == TreeViewDropPosition.Over)
            {
                destinationItem.Items = destinationItem.Items ?? new List<BaseHierarchicalItem>();

                destinationItem.Items.Add(sourceItem);
            }
            else if (position == TreeViewDropPosition.Before)
            {
                itemsCollection.Insert(destinationItemIndex, sourceItem);
            }
            else if (position == TreeViewDropPosition.After)
            {
                itemsCollection.Insert(destinationItemIndex + 1, sourceItem);
            }
        }
    }
````
````Extensions
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

    public static class BaseHierarchicalItemExtensions
    {
        public static BaseHierarchicalItem FindRecursive(this List<BaseHierarchicalItem> storageItems, Func<BaseHierarchicalItem, bool> condition)
        {
            for (int i = 0; i < storageItems?.Count; i++)
            {
                var storageItem = storageItems[i];
                var matchedItem = storageItem.FindRecursive(condition);

                if (matchedItem != null)
                {
                    return matchedItem;
                }
            }

            return default;
        }

        public static BaseHierarchicalItem FindRecursive(this BaseHierarchicalItem storageItem, Func<BaseHierarchicalItem, bool> selector)
        {
            if (selector(storageItem) == true)
            {
                return storageItem;
            }

            for (int i = 0; i < storageItem.Items?.Count; i++)
            {
                var item = storageItem.Items[i];

                if (selector(item))
                {
                    return item;
                }
                else
                {
                    var childItem = item.Items.FindRecursive(selector);

                    if (childItem != null)
                    {
                        return childItem;
                    }
                }
            }

            return default;
        }
    }
````
````Model
    public class BaseHierarchicalItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<BaseHierarchicalItem> Items { get; set; }
        public bool HasChildren { get; set; }
        public bool HasItems => Items?.Count > 0;
        public bool Expanded { get; set; }
    }
````

### Between Different TreeViews

When you drap and drop items from one instance of the TreeView to another, the `OnDrop` event fires for the TreeView where the item originally was.

````Component
@using System.Collections.ObjectModel

<TelerikTreeView @ref="@FirstTree"
                 Data="@FirstFlatData"
                 Draggable="true"
                 OnDrop="@OnDropFirst">
    <TreeViewBindings>
        <TreeViewBinding TextField="Text" ParentIdField="ParentId" />
    </TreeViewBindings>
</TelerikTreeView>

<TelerikTreeView @ref="@SecondTree"
                 Data="@SecondFlatData"
                 OnDrop="@OnDropSecond"
                 Draggable="true">
    <TreeViewBindings>
        <TreeViewBinding TextField="Text" ParentIdField="ParentId" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    public TelerikTreeView FirstTree { get; set; }
    public TelerikTreeView SecondTree { get; set; }

    public TreeViewObservableFlatDataService FirstTreeService { get; set; }
    public TreeViewObservableFlatDataService SecondTreeService { get; set; }

    public ObservableCollection<BaseFlatItem> FirstFlatData { get; set; }
    public ObservableCollection<BaseFlatItem> SecondFlatData { get; set; }

    protected override Task OnInitializedAsync()
    {
        FirstTreeService = new TreeViewObservableFlatDataService("Item");
        SecondTreeService = new TreeViewObservableFlatDataService("Node");

        FirstFlatData = FirstTreeService.GetFlatItems();
        SecondFlatData = SecondTreeService.GetFlatItems();

        return base.OnInitializedAsync();
    }

    private void OnDropFirst(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseFlatItem;
        var destinationItem = args.DestinationItem as BaseFlatItem;

        if (args.DestinationTreeView != FirstTree)
        {
            FirstTreeService.Remove(item);

            UpdateSecondTree(item, destinationItem, args.DropPosition);
        }
        else
        {
            UpdateFirstTree(item, destinationItem, args.DropPosition);
        }
    }

    private void OnDropSecond(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseFlatItem;
        var destinationItem = args.DestinationItem as BaseFlatItem;

        if (args.DestinationTreeView != SecondTree)
        {
            SecondTreeService.Remove(item);

            UpdateFirstTree(item, destinationItem, args.DropPosition);
        }
        else
        {
            UpdateSecondTree(item, destinationItem, args.DropPosition);
        }
    }

    private void UpdateFirstTree(BaseFlatItem item, BaseFlatItem destinationItem, TreeViewDropPosition dropPosition)
    {
        if (dropPosition == TreeViewDropPosition.Over)
        {
            SecondTreeService.AddChild(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.After)
        {
            FirstTreeService.AddNextSibling(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.Before)
        {
            FirstTreeService.AddPrevSibling(item, destinationItem);
        }
    }

    private void UpdateSecondTree(BaseFlatItem item, BaseFlatItem destinationItem, TreeViewDropPosition dropPosition)
    {
        if (dropPosition == TreeViewDropPosition.Over)
        {
            SecondTreeService.AddChild(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.After)
        {
            SecondTreeService.AddNextSibling(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.Before)
        {
            SecondTreeService.AddPrevSibling(item, destinationItem);
        }
    }
}
````
````Service
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.ObjectModel;

    public class TreeViewObservableFlatDataService
    {
        private string ItemText { get; set; }

        private ObservableCollection<BaseFlatItem> _observableFlatItems;

        public TreeViewObservableFlatDataService()
        {
            ItemText = "Item";
        }

        public TreeViewObservableFlatDataService(string text)
        {
            ItemText = text;
        }

        private ObservableCollection<BaseFlatItem> ObservableFlatItems
        {
            get
            {
                if (_observableFlatItems == null)
                {
                    _observableFlatItems = GenerateFlatItems(null, 0, ItemText);
                }

                return _observableFlatItems;
            }
        }

        public ObservableCollection<BaseFlatItem> GetFlatItems()
        {
            return ObservableFlatItems;
        }

        public async Task<ObservableCollection<BaseFlatItem>> GetFlatItemsAsync()
        {
            await Task.Delay(50);

            return GetFlatItems();
        }

        private ObservableCollection<BaseFlatItem> GenerateFlatItems(Guid? parentId, int level, string parentName)
        {
            var items = new ObservableCollection<BaseFlatItem>();

            for (var i = 1; i <= 4; i++)
            {
                var id = Guid.NewGuid();
                var name = $"{parentName}{i}";

                var item = new BaseFlatItem()
                {
                    Id = id,
                    ParentId = parentId,
                    HasChildren = level < 3,
                    Text = name
                };

                items.Add(item);

                if (level < 3)
                {
                    foreach (var childItem in GenerateFlatItems(id, level + 1, name + "."))
                    {
                        items.Add(childItem);
                    }
                }
            }

            return items;
        }

        public void AddChild(BaseFlatItem flatItem, BaseFlatItem parentFlatItem)
        {
            // remove from the collection to assure last place in the collection
            Remove(flatItem);

            flatItem.ParentId = parentFlatItem?.Id;

            // locate previous parent to toggle haschildren property
            if (parentFlatItem != null)
            {
                parentFlatItem.HasChildren = true;
            }

            ObservableFlatItems.Add(flatItem);
        }

        public void AddPrevSibling(BaseFlatItem flatItem, BaseFlatItem siblingFlatItem)
        {
            // remove node
            Remove(flatItem);

            // add the node at the position of the sibling node
            AddSibling(flatItem, siblingFlatItem, 0);
        }

        public void AddNextSibling(BaseFlatItem flatItem, BaseFlatItem siblingFlatItem)
        {
            // remove node
            Remove(flatItem);

            // add the node at the next position of the sibling node
            AddSibling(flatItem, siblingFlatItem, 1);
        }

        private void AddSibling(
            BaseFlatItem flatItem,
            BaseFlatItem siblingFlatItem,
            int direction)
        {
            // get parent of the sibling node
            var parentItem = ObservableFlatItems.FirstOrDefault(f => f.Id == siblingFlatItem.ParentId);

            // handle movement from another parent
            flatItem.ParentId = siblingFlatItem.ParentId;

            // insert the node at the place of the sibling item
            ObservableFlatItems.Insert(ObservableFlatItems.IndexOf(siblingFlatItem) + direction, flatItem);
        }

        public void Remove(BaseFlatItem flatItem)
        {
            // update the hasChildren state of the parent item of the source flat item that is dragged

            var parentFlatItem = ObservableFlatItems.FirstOrDefault(f => f.Id == flatItem.ParentId);

            if (parentFlatItem != null)
            {
                var childItemsCount = ObservableFlatItems.Count(child => child.ParentId == parentFlatItem.Id);

                parentFlatItem.HasChildren = childItemsCount > 1;
            }

            ObservableFlatItems.Remove(flatItem);
        }
    }
````
````Model
    public class BaseFlatItem
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
        public bool Expanded { get; set; }
    }
````


## See Also

  * [Data Binding a TreeView]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/treeview/drag-drop)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeView)

