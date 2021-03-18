---
title: Refresh Data
page_title: TreeView Refresh Data
description: Refresh TreeView Data using Observable Data or creating a new Collection reference.
slug: treeview-refresh-data
tags: telerik,blazor,treeview,observable,data,new,collection
published: True
position: 17
---

# TreeView - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the TreeView to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove item to see how the TreeView reacts to that change. *@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikTreeView Data="@Items">
    <TreeViewBindings>
        <TreeViewBinding IdField="Id" ParentIdField="ParentIdValue" ExpandedField="Expanded" TextField="Text" HasChildrenField="HasChildren" IconField="Icon" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    void AddItem() {
        Items.Add(
            new TreeItem
            {
                Id = Items.Count + 1,
                Text = "Testing",
                ParentIdValue = 1,
                HasChildren = false,
                Icon = "gears",
                Expanded = false
            });
    }

    void RemoveItem()
    {
        if (Items.Count > 0)
        {
           Items.RemoveAt(Items.IndexOf(Items.Last()));
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentIdValue { get; set; }
        public bool HasChildren { get; set; }
        public string Icon { get; set; }
        public bool Expanded { get; set; }
    }

    public ObservableCollection<TreeItem> Items { get; set; } = new ObservableCollection<TreeItem>() {

        new TreeItem()
        {
            Id = 1,
            Text = "Project",
            ParentIdValue = null,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        },
       new TreeItem()
       {
            Id = 2,
            Text = "Design",
            ParentIdValue = 1,
            HasChildren = true,
            Icon = "brush",
            Expanded = true
        },
        new TreeItem()
        {
            Id = 3,
            Text = "Implementation",
            ParentIdValue = 1,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        },
        new TreeItem()
        {
            Id = 4,
            Text = "site.psd",
            ParentIdValue = 2,
            HasChildren = false,
            Icon = "psd",
            Expanded = true
        },
        new TreeItem()
        {
            Id = 5,
            Text = "index.js",
            ParentIdValue = 3,
            HasChildren = false,
            Icon = "js"
        },
        new TreeItem()
        {
            Id = 6,
            Text = "index.html",
            ParentIdValue = 3,
            HasChildren = false,
            Icon = "html"
        },
        new TreeItem()
        {
            Id = 7,
            Text = "styles.css",
            ParentIdValue = 3,
            HasChildren = false,
            Icon = "css"
        }
    };
}
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the TreeView data.

````CSHTML
@* Add/remove item or change the collection to see how the TreeView reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikButton OnClick="@ChangeItems">Change items data</TelerikButton>

<TelerikTreeView Data="@Items">
    <TreeViewBindings>
        <TreeViewBinding IdField="Id" ParentIdField="ParentIdValue" ExpandedField="Expanded" TextField="Text" HasChildrenField="HasChildren" IconField="Icon" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    void AddItem()
    {
        Items.Add(
            new TreeItem
            {
                Id = Items.Count + 1,
                Text = "Testing",
                ParentIdValue = 1,
                HasChildren = false,
                Icon = "gears",
                Expanded = false
            });
        Items = new List<TreeItem>(Items);
    }

    void RemoveItem()
    {
        if (Items.Count > 0)
        {
            Items.RemoveAt(Items.IndexOf(Items.Last()));
            Items = new List<TreeItem>(Items);
        }
    }

    void ChangeItems()
    {
        Items = new List<TreeItem>()
        {
            new TreeItem()
        {
            Id = 1,
            Text = "New root item",
            ParentIdValue = null,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        },
            new TreeItem()
        {
            Id = 2,
            Text = "New child item 1",
            ParentIdValue = 1,
            HasChildren = true,
            Icon = "brush",
            Expanded = true
        },
            new TreeItem()
        {
            Id = 3,
            Text = "New child item 2",
            ParentIdValue = 1,
            HasChildren = false,
            Icon = "folder",
            Expanded = true
        },
            new TreeItem()
        {
            Id = 4,
            Text = "Child of item 1",
            ParentIdValue = 2,
            HasChildren = false,
            Icon = "gears",
            Expanded = true
        }
        };
        Items = new List<TreeItem>(Items);
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentIdValue { get; set; }
        public bool HasChildren { get; set; }
        public string Icon { get; set; }
        public bool Expanded { get; set; }
    }

    public List<TreeItem> Items { get; set; } = new List<TreeItem>() {

        new TreeItem()
        {
            Id = 1,
            Text = "Project",
            ParentIdValue = null,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        },
       new TreeItem()
       {
            Id = 2,
            Text = "Design",
            ParentIdValue = 1,
            HasChildren = true,
            Icon = "brush",
            Expanded = true
        },
        new TreeItem()
        {
            Id = 3,
            Text = "Implementation",
            ParentIdValue = 1,
            HasChildren = true,
            Icon = "folder",
            Expanded = true
        },
        new TreeItem()
        {
            Id = 4,
            Text = "site.psd",
            ParentIdValue = 2,
            HasChildren = false,
            Icon = "psd",
            Expanded = true
        },
        new TreeItem()
        {
            Id = 5,
            Text = "index.js",
            ParentIdValue = 3,
            HasChildren = false,
            Icon = "js"
        },
        new TreeItem()
        {
            Id = 6,
            Text = "index.html",
            ParentIdValue = 3,
            HasChildren = false,
            Icon = "html"
        },
        new TreeItem()
        {
            Id = 7,
            Text = "styles.css",
            ParentIdValue = 3,
            HasChildren = false,
            Icon = "css"
        }
    };
}
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)