---
title: Icons
page_title: TreeView - Icon
description: Icons and images in the TreeView for Blazor.
slug: treeview-icons
tags: telerik,blazor,treeview,icon,iconclass,image
published: True
position: 15
---

# TreeView Icons

You can put an image, icon class or a font icon for each item in the TreeView to illustrate its purpose for your end users. To apply them, use the following properties:

* for a [Telerik font icon]({%slug general-information/font-icons%}), point the `IconField` parameter of the component to a string field of the model that contains the corresponding icon name.

* for a raster image, point the `ImageUrlField` parameter of the component to a `string` field of the model that contains the url to the icon (relative or absolute).

* for a custom font icon class, point the `IconClassField` parameter of the component to a `string` field of the model that contains the desired CSS class list which provides the required rules (like font name and glyph symbol). Make sure to also reference the desired font in your app and to use its own recommendations.

The `IconClassField` and `ImageUrlField` are rendered, respectively, as `<span class="the custom class" />` and as `<img src="the-image-src" />`

>caption How to use icons in Telerik TreeView

````CSHTML
@* This example shows how to add icons or images to the TreeView items
Make sure that you also refernce the OpenIconic font that comes with the Blazor App template to see the custom font icon *@

<TelerikTreeView Data="@TreeViewData">
    <TreeViewBindings>
        <TreeViewBinding IconClassField="@nameof(TreeViewModel.MyIconClass)"
                         ImageUrlField="@nameof(TreeViewModel.MyImageUrl)"
                         IconField="@nameof(TreeViewModel.TelerikIcon)" />
    </TreeViewBindings>
</TelerikTreeView>

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
            TelerikIcon = "home"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 2,
            Text = "Contact us",
            ParentId = 1,
            HasChildren = false,
            MyIconClass = "oi oi-envelope-closed"
        });

        TreeViewData.Add(new TreeViewModel()
        {
            Id = 3,
            Text = "Audio",
            ParentId = null,
            MyImageUrl = "https://docs.telerik.com/blazor-ui/images/speaker.png"
        });
    }

    public class TreeViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
        public int? ParentId { get; set; }
        public string TelerikIcon { get; set; }
        public string MyIconClass { get; set; }
        public string MyImageUrl { get; set; }
    }
}
````

>caption The result from the code snippet above, after expanding the first node

![icons](images/icons.png)

## See Also

  * [TreeView Overview]({%slug components/treeview/overview%})
