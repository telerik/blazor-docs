---
title: Overview
page_title: TreeView - Selection Overview
description: Node selection in the TreeView for Blazor.
slug: treeview-selection-overview
tags: telerik,blazor,treeview,selection,overview
published: True
position: 1
---

# TreeView Selection

The TreeView lets the user select one or more nodes. You can also pre-select them with your own code.

You can configure the node selection behavior by setting the `SelectionMode` parameter to a member of the `TreeViewSelectionMode` enum:
* `None` - disable the node selection. This is the default setting.
* [`Single`]({%slug treeview-selection-single%})
* [`Multiple`]({%slug treeview-selection-single%})

You get or set the selected items through the `SelectedItems` parameter. It is an `IEnumerable<object>` collection that you need to cast to the correct model type. This is required because you can [bind the treeview]({%slug components/treeview/data-binding/overview%}) to different model types at each level. The selection allows two-way binding (`@bind-SelectedItems`) and one-way binding + [`SelectedItemsChanged`]({%slug treeview-events%}#selecteditemschanged) event.

>caption Enable node selection and preselect an item

````CSHTML
@* Observe how the node selection works and preselect the second node. *@

<TelerikTreeView Data="@Data"
                 SelectionMode="@TreeViewSelectionMode.Single"
                 @bind-SelectedItems="@SelectedItems">
</TelerikTreeView>

@if (SelectedItems.Any())
{
    TreeItem selectedItem = SelectedItems.FirstOrDefault() as TreeItem;
    <div>
        Selected item: <strong> <TelerikIcon Icon="@selectedItem.Icon" /> @selectedItem.Text</strong>
    </div>
}

@code {
    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Icon { get; set; }
        public bool Expanded { get; set; }
    }

    public IEnumerable<object> SelectedItems { get; set; } = new List<object>();

    public IEnumerable<TreeItem> Data { get; set; }

    protected override void OnInitialized()
    {
        LoadData();
        
        // Preselection of the second node (not required)
        SelectedItems = new List<object>() { Data.Skip(1).FirstOrDefault() };
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
}

````

>caption The result of the code snippet above

![selection overview example](images/treeview-selection-single.png)


## See Also

  * [Live Demo: TreeView Selection](https://demos.telerik.com/blazor-ui/treeview/selection)
  * [Single Selection]({%slug treeview-selection-single%})
  * [Multiple Selection]({%slug treeview-selection-multiple%})
