---
title: Events
page_title: TreeView for Blazor | Events
description: Events of the TreeView for Blazor
slug: treeview-events
tags: telerik,blazor,treeview,events
published: True
position: 20
---

# TreeView Events

This article explains the events available in the Telerik TreeView for Blazor:

* [OnExpand](#onexpand)

## OnExpand

The `OnExpand` event fires when the user expands or collapses a node (either with the mouse, or with the keyboard). You can use it to know that the user performed that action, and/or to implement [load on demand]({%slug components/treeview/data-binding/load-on-demand%}).

>caption Handle the expand and collapse event to get the user's action

````CSHTML
@Logger

<TelerikTreeView Data="@FlatData" OnExpand="@ExpandCollapseHandler">
</TelerikTreeView>

@code {
    MarkupString Logger { get; set;}

    //event handler

    async Task ExpandCollapseHandler(TreeViewExpandEventArgs args)
    {
        TreeItem node = args.Item as TreeItem; // Use your actual model(s) for the cast

        string action = args.Expanded ? "expanded" : "collapsed";
        
        string lastAction = $"{node.Text} is now {action}, on {DateTime.Now}<br />";
        Logger = new MarkupString(Logger + lastAction);
    }

    // sample data
    public IEnumerable<TreeItem> FlatData { get; set; }

    public class TreeItem //most fields use the default names and will bind automatically in this example
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; } //this is a non-default field name
        public bool HasChildren { get; set; }
        public bool Expanded { get; set; } //this is a non-default field name
    }

    protected override void OnInitialized()
    {
        FlatData = LoadFlat();
    }

    private List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        items.Add(new TreeItem()
        {
            Id = 1,
            Text = "Parent 1",
            ParentId = null, // indicates a root (zero-level) item
            HasChildren = true, // informs the treeview there are children so it renders the expand option
            Expanded = true // an item can be expanded by default
        });

        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "Parent 2",
            ParentId = null, //  indicates a root item
            HasChildren = true,
            Expanded = false
        });

        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "Parent 3",
            ParentId = null, // indicates a root item
            HasChildren = false, //there will be no children in this item
            Expanded = true // will not have an effect if there are no children
        });

        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "Child 1 of Parent 1",
            ParentId = 1, // the parent will be the first item
            HasChildren = false,
            Expanded = false
        });

        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "Child 2 of Parent 1",
            ParentId = 1, // the parent will be the first item
            HasChildren = true,
            Expanded = true
        });

        items.Add(new TreeItem()
        {
            Id = 6,
            Text = "Child 1 of Child 2",
            ParentId = 5, // the parent will be the first child of the first root item
            HasChildren = false,
            Expanded = false
        });

        items.Add(new TreeItem()
        {
            Id = 7,
            Text = "Child 1 of Parent 2",
            ParentId = 2, // the parent will be the second root item
            HasChildren = false,
            Expanded = false
        });

        return items;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

  * [TreeView Overview]({%slug components/treeview/overview%})
