---
title: Multiple Nodes
page_title: TreeView for Blazor | Multiple Selection
description: Multiple nodes selection in the TreeView for Blazor
slug: treeview-selection-multiple
tags: telerik,blazor,treeview,selection,multiple
published: True
position: 10
---

# Multiple Selection in TreeView

The TreeView lets the user select multiple nodes.

In this article:

* [Basics](#basics)
* [Examples](#examples)
	* [Multiple selection using one-way data binding](#multiple-selection-using-one-way-data-binding)
	* [Multiple selection using two-way data binding](#multiple-selection-using-two-way-data-binding)
	* [Handle multiple selection from different data models](#handle-multiple-selection-from-different-data-models)


## Basics

To use **multiple** node selection, set the `SelectionMode` parameter to `Telerik.Blazor.TreeViewSelectionMode.Multiple`.

To select a range of nodes hold the `Shift` key and click on two nodes. All the items in-between will be selected. If there is a focused node, range selection starts from that node.

To select multiple nodes that are not next to each other hold the `Ctrl` key and click on the desired items.

To deselect a node hold the `Ctrl` key and click on it.

## Examples

This section contains the following examples:

* [One-way binding](#multiple-selection-using-one-way-data-binding)
* [Two-way binding](#multiple-selection-using-two-way-data-binding)
* [Different data models](#handle-multiple-selection-from-different-data-models)

### Multiple selection using one-way data binding

You can use one-way binding to provide an initial node selection, and respond to the `SelectedItemsChanged` to update the view-model when user selection occurs. If you don't update the model, selection is effectively cancelled. If you want to load async data on demand based on the chosen node, use the [`OnItemClick`]({%slug treeview-events%}#onitemclick) event.


````CSHTML
@* Handle multiple node selection with one-way data binding *@

<TelerikTreeView Data="@Data"
                 SelectionMode="@TreeViewSelectionMode.Multiple"
                 SelectedItems="@SelectedItems"
                 SelectedItemsChanged="((IEnumerable<object> items) => SelectedItemsChangedHandler(items))">
</TelerikTreeView>

@if (SelectedItems.Any())
{
    <div>
        <strong>Selected items:</strong>
    </div>

    foreach (var item in SelectedItems)
    {
        <div class="card" style="width: 15rem">
            <span><strong>Icon:</strong> <TelerikIcon Icon="@((item as TreeItem).Icon)" /></span>
            <span><strong>Title:</strong> @((item as TreeItem).Text)</span>
            <span><strong>Id:</strong> @((item as TreeItem).Id) </span>
        </div>
    }
}

@code {
    public IEnumerable<object> SelectedItems { get; set; } = new List<object>();

    public IEnumerable<TreeItem> Data { get; set; }

    void SelectedItemsChangedHandler(IEnumerable<object> items)
    {
        SelectedItems = items;
    }

    protected override void OnInitialized()
    {
        LoadData();
    }

    private void LoadData()
    {
        List<TreeItem> items = new List<TreeItem>();
        items.Add(new TreeItem()
        {
            Id = 1,
            Text = "Project",
            ParentId = null,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        });
        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "Design",
            ParentId = 1,
            HasChildren = true,
            Icon = "brush",
            Expanded = true
        });
        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "Implementation",
            ParentId = 1,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        });

        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "site.psd",
            ParentId = 2,
            HasChildren = false,
            Icon = "psd",
            Expanded = true
        });

        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "index.js",
            ParentId = 3,
            HasChildren = false,
            Icon = "js"
        });
        items.Add(new TreeItem()
        {
            Id = 6,
            Text = "index.html",
            ParentId = 3,
            HasChildren = false,
            Icon = "html"
        });

        items.Add(new TreeItem()
        {
            Id = 7,
            Text = "styles.css",
            ParentId = 3,
            HasChildren = false,
            Icon = "css"
        });

        Data = items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Icon { get; set; }
        public bool Expanded { get; set; }
    }
}
````

>caption The result of the code snippet above

![selection multiple example](images/treeview-selection-multiple.png)


### Multiple selection using two-way data binding

You can use two-way binding to get the node the user has selected. This can be useful if the node model already contains all the information you need to show based on the selection.

````CSHTML
@* Handle multiple node selection with two-way data binding *@

<TelerikTreeView Data="@Data"
                 SelectionMode="@TreeViewSelectionMode.Multiple"
                 @bind-SelectedItems="@SelectedItems">
</TelerikTreeView>

@if (SelectedItems.Any())
{
    <div>
        <strong>Selected items:</strong>
    </div>

    foreach (var item in SelectedItems)
    {
        <div class="card" style="width: 15rem">
            <span><strong>Icon:</strong> <TelerikIcon Icon="@((item as TreeItem).Icon)" /></span>
            <span><strong>Title:</strong> @((item as TreeItem).Text)</span>
            <span><strong>Id:</strong> @((item as TreeItem).Id) </span>
        </div>
    }
}

@code {
    public IEnumerable<object> SelectedItems { get; set; } = new List<object>();

    public IEnumerable<TreeItem> Data { get; set; }

    protected override void OnInitialized()
    {
        LoadData();
    }

    private void LoadData()
    {
        List<TreeItem> items = new List<TreeItem>();
        items.Add(new TreeItem()
        {
            Id = 1,
            Text = "Project",
            ParentId = null,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        });
        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "Design",
            ParentId = 1,
            HasChildren = true,
            Icon = "brush",
            Expanded = true
        });
        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "Implementation",
            ParentId = 1,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        });

        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "site.psd",
            ParentId = 2,
            HasChildren = false,
            Icon = "psd",
            Expanded = true
        });

        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "index.js",
            ParentId = 3,
            HasChildren = false,
            Icon = "js"
        });
        items.Add(new TreeItem()
        {
            Id = 6,
            Text = "index.html",
            ParentId = 3,
            HasChildren = false,
            Icon = "html"
        });

        items.Add(new TreeItem()
        {
            Id = 7,
            Text = "styles.css",
            ParentId = 3,
            HasChildren = false,
            Icon = "css"
        });

        Data = items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Icon { get; set; }
        public bool Expanded { get; set; }
    }
}
````

>caption The result of the code snippet above

![selection multiple example](images/treeview-selection-multiple.png)


### Handle multiple selection from different data models

You can bind the treeview to different models at each level, and the selection accommodates that. You need to make sure that you cast the node to the correct type.

````CSHTML
@* Handle multiple selection of items from different data models *@

<TelerikTreeView Data="@Data"
                 SelectionMode="@TreeViewSelectionMode.Single"
                 SelectedItems="@SelectedItems"
                 SelectedItemsChanged="@((IEnumerable<object> item) => SelectedItemsHandler(item))">
</TelerikTreeView>

@if (SelectedItems.Any())
{
    TreeItem selectedItem = SelectedItems.FirstOrDefault() as TreeItem;
    <div>
        <strong>Selected item:</strong>
        <div class="card" style="width: 15rem">
            <span><strong>Icon:</strong> <TelerikIcon Icon="@selectedItem.Icon" /></span>
            <span><strong>Title:</strong> @selectedItem.Text</span>
            <span><strong>Id:</strong> @selectedItem.Id </span>
        </div>
    </div>
}

@code {
    void SelectedItemsHandler(IEnumerable<object> item)
    {
        SelectedItems = item;
    }

    public IEnumerable<object> SelectedItems { get; set; } = new List<object>();

    public IEnumerable<TreeItem> Data { get; set; }

    protected override void OnInitialized()
    {
        LoadData();
    }

    private void LoadData()
    {
        List<TreeItem> items = new List<TreeItem>();
        items.Add(new TreeItem()
        {
            Id = 1,
            Text = "Project",
            ParentId = null,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        });
        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "Design",
            ParentId = 1,
            HasChildren = true,
            Icon = "brush",
            Expanded = true
        });
        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "Implementation",
            ParentId = 1,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        });

        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "site.psd",
            ParentId = 2,
            HasChildren = false,
            Icon = "psd",
            Expanded = true
        });

        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "index.js",
            ParentId = 3,
            HasChildren = false,
            Icon = "js"
        });
        items.Add(new TreeItem()
        {
            Id = 6,
            Text = "index.html",
            ParentId = 3,
            HasChildren = false,
            Icon = "html"
        });

        items.Add(new TreeItem()
        {
            Id = 7,
            Text = "styles.css",
            ParentId = 3,
            HasChildren = false,
            Icon = "css"
        });

        Data = items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Icon { get; set; }
        public bool Expanded { get; set; }
    }
}
````

>caption The result of the code snippet above

![selection multiple example](images/treeview-selection-multiple-different-models.png)


## See Also

  * [Selection Overview]({%slug treeview-selection-overview%})
  * [Single Selection]({%slug treeview-selection-single%})
