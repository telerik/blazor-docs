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
* [OnItemClick](#onitemclick)
* [SelectedItemsChanged](#selecteditemschanged)

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

## OnItemClick

The `OnItemClick` event fires when the user clicks (or presses `Enter`) on an node (item) of the TreeView. You can use this event to react on user clicking on a node and load data on demand for another component.

 >caption Handle OnItemClick to load data on demand for another component based on user click

 ````CSHTML
@* Load data on demand based on user click action *@

 <div>
     <TelerikTreeView Data="@FlatData" OnItemClick="@OnItemClickHandler">
         <TreeViewBindings>
             <TreeViewBinding IdField="Id" ParentIdField="ParentIdValue" ExpandedField="Expanded" TextField="Text" HasChildrenField="HasChildren" IconField="Icon" />
         </TreeViewBindings>
     </TelerikTreeView>
 </div>

 @if (ChosenItem != null)
 {
     <TelerikGrid Data="@GridData"
                  Width="500px">
         <GridColumns>
             <GridColumn Field="@nameof(GridDataModel.Id)" Title="Id"></GridColumn>
             <GridColumn Field="@nameof(GridDataModel.Name)" Title="Name"></GridColumn>
         </GridColumns>
     </TelerikGrid>
 }


 @code {
     TreeItem ChosenItem { get; set; }

     void OnItemClickHandler(TreeViewItemClickEventArgs e)
     {
         var item = e.Item as TreeItem;
         ChosenItem = item;

         //perform actual database operations here
         LoadGridDataOnDemand(ChosenItem.Id);
     }

     public IEnumerable<GridDataModel> GridData { get; set; }

     public List<TreeItem> FlatData { get; set; }

     protected override void OnInitialized()
     {
         LoadFlatData();
         GridData = Data;
     }

     private void LoadGridDataOnDemand(int id)
     {
         GridData = Data.Where(x => x.Id == id);
     }

     #region Data Generation
     public IEnumerable<GridDataModel> Data { get; set; } = Enumerable.Range(1, 20).Select(x => new GridDataModel()
     {
         Id = x,
         Name = $"Name {x}"
     });

     private void LoadFlatData()
     {
         List<TreeItem> items = new List<TreeItem>();

         items.Add(new TreeItem()
         {
             Id = 1,
             Text = "Project",
             ParentIdValue = null,
             HasChildren = true,
             Icon = "folder",
             Expanded = true
         });

         items.Add(new TreeItem()
         {
             Id = 2,
             Text = "Design",
             ParentIdValue = 1,
             HasChildren = true,
             Icon = "brush",
             Expanded = true
         });
         items.Add(new TreeItem()
         {
             Id = 3,
             Text = "Implementation",
             ParentIdValue = 1,
             HasChildren = true,
             Icon = "folder",
             Expanded = true
         });

         items.Add(new TreeItem()
         {
             Id = 4,
             Text = "site.psd",
             ParentIdValue = 2,
             HasChildren = false,
             Icon = "psd",
             Expanded = true
         });
         items.Add(new TreeItem()
         {
             Id = 5,
             Text = "index.js",
             ParentIdValue = 3,
             HasChildren = false,
             Icon = "js"
         });
         items.Add(new TreeItem()
         {
             Id = 6,
             Text = "index.html",
             ParentIdValue = 3,
             HasChildren = false,
             Icon = "html"
         });
         items.Add(new TreeItem()
         {
             Id = 7,
             Text = "styles.css",
             ParentIdValue = 3,
             HasChildren = false,
             Icon = "css"
         });

         FlatData = items;
     }
     #endregion

     #region Data Models
     public class GridDataModel
     {
         public int Id { get; set; }
         public string Name { get; set; }
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
     #endregion
 }
 ````

## SelectedItemsChanged

Fires when the item selection is enabled and the user changes the selected [item]({%slug treeview-selection-single%}) or [items]({%slug treeview-selection-multiple%}).

## See Also

  * [TreeView Overview]({%slug components/treeview/overview%})
