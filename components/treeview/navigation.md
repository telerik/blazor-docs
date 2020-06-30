---
title: Navigation
page_title: TreeView | Navigation
description: Using the Blazor TreeView for navigating between pages
slug: treeview-navigation
tags: telerik,blazor,treeview,navigation
published: True
position: 5
---

# TreeView for Navigation

The TreeView can be used to navigate between different pages in the applicaiton. It can generate the needed links for you through its `UrlField` when [data binding]({%slug components/treeview/data-binding/overview%}).

To use the TreeView for navigating between pages:

* Add the TreeView to your application.
    * You may want to add it in the `MainLayout.razor` outside of the @Body, for example, in the sidebar section of your app.
* Provide a collection of models that describe the pages you want the user to navigate to.
* Populate its `UrlField` with the corresponding data from the model or provide a `Url` property in the model.

>caption Use the TreeView to navigate between pages

````CSHTML
@* This a basic example of a TreeView used as Navigation. *@
@* The items that does not have a set Url are not navigation links *@

<TelerikTreeView Data="@TreeViewData"></TelerikTreeView>

@code {
    public List<TreeViewModel> TreeViewData { get; set; }

    protected override void OnInitialized()
    {
        GenerateData();
    }

    public void GenerateData()
    {
        TreeViewData = new List<TreeViewModel>();

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 1,
            Text = "Company",
            ParentId = null,
            HasChildren = true
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 2,
            Text = "Overview",
            ParentId = 1,
            HasChildren = false,
            Url = "/company/overview"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 3,
            Text = "Contact us",
            ParentId = 1,
            HasChildren = false,
            Url = "/company/contacts"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 4,
            Text = "Our mission",
            ParentId = 1,
            HasChildren = false,
            Url = "/company/mission"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 5,
            Text = "Products",
            ParentId = null,
            HasChildren = true
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 6,
            Text = "Core product",
            ParentId = 5,
            HasChildren = true,
            Url = "/producs/core"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 7,
            Text = "Main product",
            ParentId = 6,
            HasChildren = false,
            Url = "/producs/core/main"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 8,
            Text = "Other products",
            ParentId = 5,
            HasChildren = false,
            Url = "/producs/other"
        });
    }

    public class TreeViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Url { get; set; }
        public bool HasChildren { get; set; }
        public int? ParentId { get; set; }
    }
}
````

## See Also

* [TreeView Overview]({%slug components/treeview/overview%})
* [TreeView Data Binding]({%slug components/treeview/data-binding/overview%})
* [TreeView Templates]({%slug components/treeview/templates%})
