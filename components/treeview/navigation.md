---
title: Navigation
page_title: TreeView Navigation
description: How to use the Blazor TreeView to navigate between pages.
slug: treeview-navigation
tags: telerik,blazor,treeview,navigation
published: True
position: 5
---

# TreeView for Navigation

The TreeView can navigate between different pages in the application.

* Use a `Url` property in the model, or set the `UrlField` attribute in a [`TreeViewBinding`](slug:components/treeview/data-binding/overview#treeview-bindings). Thus the TreeView will generate navigation links.
* It is possible to add the TreeView to the `MainLayout.razor`, outside the app `@Body`.

> External links should include a protocol, for example `https://`.
>
> Blazor doesn't support [navigation to page sections](https://www.meziantou.net/anchor-navigation-in-a-blazor-application.htm) out-of-the-box.

For specific scenarios, use a [Template](slug:components/treeview/templates) to generate the desired links manually (e.g. `NavLink` components) to enable fine-tuning.

>caption TreeView for page navigation

````RAZOR
<TelerikTreeView Data="@TreeViewData"
                 @bind-ExpandedItems="@ExpandedItems"/>

@code {
    List<TreeItem> TreeViewData { get; set; }
    IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    protected override void OnInitialized()
    {
        GenerateData();

        ExpandedItems = TreeViewData.Where(x => x.HasChildren == true).ToList();
    }

    void GenerateData()
    {
        TreeViewData = new List<TreeItem>();

        TreeViewData.Add(new TreeItem()
        {
            Id = 1,
            Text = "App Pages",
            ParentId = null,
            HasChildren = true
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 2,
            Text = "Home",
            ParentId = 1,
            Url = "/"
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 3,
            Text = "Counter",
            ParentId = 1,
            Url = "/counter"
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 4,
            Text = "Fetch Data",
            ParentId = 1,
            Url = "/fetchdata"
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 5,
            Text = "External Pages",
            ParentId = null,
            HasChildren = true
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 6,
            Text = "Telerik",
            ParentId = 5,
            Url = "https://www.telerik.com/"
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 7,
            Text = "UI for Blazor Demos",
            ParentId = 5,
            Url = "https://demos.telerik.com/blazor-ui/"
        });
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Text { get; set; }
        public string Url { get; set; }
        public bool HasChildren { get; set; }
    }
}
````


## Notes

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)


## See Also

* [TreeView Overview](slug:treeview-overview)
* [TreeView Data Binding](slug:components/treeview/data-binding/overview)
* [TreeView Templates](slug:components/treeview/templates)
