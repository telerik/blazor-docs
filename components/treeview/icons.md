---
title: Icons
page_title: TreeView for Blazor | Icon
description: Icons and images in the TreeView for Blazor
slug: treeview-icons
tags: telerik,blazor,treeview,icon,iconclass,image
published: True
position: 2
---

# TreeView Icons

You can put an image, icon class or a font icon for each item in the TreeView to illustrate its purpose for your end users. To apply them, use the following properties:

* for a font icon, populate the `IconField` parameter of the component or provide an `Icon` property in the data model.
* for an image, populate the `ImageUrlField` parameter of the component or provide an `ImageUrl` property in the data model. This is rendered as `<img src="" />` tag.
* for a icon class, populate the `IconClassField` parameter of the component or provide an `IconClass` property in the data model.

You can see how to use the built-in icons in the [Font Icons]({%slug  general-information/font-icons%}) article.

For a custom font icon, define the font and glyph in your `Icon` CSS class.

>caption How to use icons in Telerik TreeView

````CSHTML
@* This example shows how to add icons or images to the TreeView items properties of the model *@

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
            HasChildren = true,
            Icon = "home"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 2,
            Text = "Contact us",
            ParentId = 1,
            HasChildren = false,
            IconClass = "oi oi-envelope-closed"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 3,
            Text = "Audio",
            ParentId = null,
            ImageUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/16/speaker.png"
        });
    }

    public class TreeViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
        public int? ParentId { get; set; }
        public string Icon { get; set; }
        public string IconClass { get; set; }
        public string ImageUrl { get; set; }
    }
}
````

>caption The result from the code snippet above

![icons](images/icons.jpg)

>note The `IconField` and `IconClassField` are rendered as `<span class="" />`, whereas the `ImageUrlField` is rendered as `<img src="" />`

## See Also

  * [TreeView Overview]({%slug components/treeview/overview%})
