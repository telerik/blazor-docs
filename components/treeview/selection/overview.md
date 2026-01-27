---
title: Overview
page_title: TreeView - Selection Overview
description: Node selection in the TreeView for Blazor.
slug: treeview-selection-overview
tags: telerik,blazor,treeview,selection,overview
published: True
position: 1
components: ["treeview"]
---
# TreeView Selection

The TreeView lets the user select one or more nodes. You can also pre-select them with your own code.

You can configure the node selection behavior by setting the `SelectionMode` parameter to a member of the `TreeViewSelectionMode` enum:
* `None` - disable the node selection. This is the default setting.
* [`Single`](slug:treeview-selection-single)
* [`Multiple`](slug:treeview-selection-single)

You get or set the selected items through the `SelectedItems` parameter. It is an `IEnumerable<object>` collection. The selection allows two-way binding (`@bind-SelectedItems`) and one-way binding + [`SelectedItemsChanged`](slug:treeview-events#selecteditemschanged) event.

If you want to extract details for the selection from `SelectedItems`, you need to cast the collection to the correct model type. This is required because you can [bind the treeview](slug:components/treeview/data-binding/overview) to different model types at each level. The example below demonstrates this approach - we cast the selected item to the specific model in order to get its details and display them outside of the TreeView.

>caption Enable node selection

````RAZOR
@* Observe how the node selection works and preselect the second node. *@

<TelerikTreeView Data="@TreeData"
                 @bind-ExpandedItems="@ExpandedItems"
                 SelectionMode="@TreeViewSelectionMode.Single"
                 @bind-SelectedItems="@SelectedItems">
</TelerikTreeView>

@if (SelectedItems.Any())
{
    TreeItem selectedItem = SelectedItems.FirstOrDefault() as TreeItem;
    <div>
        Selected item: <strong> <TelerikSvgIcon Icon="@selectedItem.Icon" /> @selectedItem.Text</strong>
    </div>
}

@code {
    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
    }

    public IEnumerable<object> SelectedItems { get; set; } = new List<object>();

    public IEnumerable<TreeItem> TreeData { get; set; }

    public IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    protected override void OnInitialized()
    {
        LoadData();
        ExpandedItems = TreeData.Where(x => x.HasChildren == true).ToList();
        
        // Preselection of the second node (not required)
        SelectedItems = new List<object>() { TreeData.Skip(1).FirstOrDefault() };
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
            Icon = SvgIcon.Folder
        });
        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "Design",
            ParentId = 1,
            HasChildren = true,
            Icon = SvgIcon.Brush
        });
        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "Implementation",
            ParentId = 1,
            HasChildren = true,
            Icon = SvgIcon.Folder
        });

        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "site.psd",
            ParentId = 2,
            HasChildren = false,
            Icon = SvgIcon.FilePsd
        });

        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "index.js",
            ParentId = 3,
            HasChildren = false,
            Icon = SvgIcon.Js
        });
        items.Add(new TreeItem()
        {
            Id = 6,
            Text = "index.html",
            ParentId = 3,
            HasChildren = false,
            Icon = SvgIcon.Html5
        });

        items.Add(new TreeItem()
        {
            Id = 7,
            Text = "styles.css",
            ParentId = 3,
            HasChildren = false,
            Icon = SvgIcon.Css
        });

        TreeData = items;
    }
}
````

>caption The result of the code snippet above

![selection overview example](images/treeview-selection-single.png)


## See Also

  * [Live Demo: TreeView Selection](https://demos.telerik.com/blazor-ui/treeview/selection)
  * [Single Selection](slug:treeview-selection-single)
  * [Multiple Selection](slug:treeview-selection-multiple)
