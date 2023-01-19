---
title: Icons
page_title: TreeView Icons
description: Icons and images in the TreeView for Blazor.
slug: treeview-icons
tags: telerik,blazor,treeview,icon,iconclass,image
published: True
position: 15
---

# TreeView Icons

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the TreeView item to illustrate its purpose by using the `IconField` parameter. The TreeView also supports custom icons.

If the icon property name in the TreeView model is `Icon`, there is no need to define the `IconField` parameter.

>caption How to use icons in the Telerik TreeView

````CSHTML
<TelerikTreeView Data="@TreeViewData">
    <TreeViewBindings>
        <TreeViewBinding IconField="@nameof(TreeItem.Icon)" />
    </TreeViewBindings>
</TelerikTreeView>

<style>
    .my-icon {
        /* define a background image or a custom font icon here */
        background: purple;
    }
</style>

@code {
    private List<TreeItem> TreeViewData { get; set; }

    protected override void OnInitialized()
    {
        TreeViewData = new List<TreeItem>();

        TreeViewData.Add(new TreeItem()
        {
            Id = 1,
            Text = "Font Icon",
            ParentId = null,
            HasChildren = true,
            Icon = FontIcon.Home
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 2,
            Text = "SVG Icon",
            ParentId = 1,
            HasChildren = false,
            Icon = FontIcon.Envelop
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 3,
            Text = "Custom Icon",
            ParentId = 1,
            Icon = "my-icon"
        });
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
        public int? ParentId { get; set; }
        public object Icon { get; set; }
    }
}
````

## See Also

* [TreeView Overview]({%slug treeview-overview%})
