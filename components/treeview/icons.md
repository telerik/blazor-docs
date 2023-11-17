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

You can add [Telerik Font or SVG icons]({%slug common-features-icons%}) to the TreeView items. The component also supports custom icons.

To use TreeView item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the respective `TreeViewBinding`. The model property can hold a `FontIcon` enum, an `ISvgIcon`, or a `string` that signifies a CSS class.

If the icon property name in the TreeView model is `Icon`, there is no need to set the `IconField` parameter.

>caption How to use icons in the Telerik TreeView

````CSHTML
<TelerikTreeView Data="@TreeViewData">
    <TreeViewBindings>
        <TreeViewBinding IconField="@nameof(TreeItem.Icon)" />
    </TreeViewBindings>
</TelerikTreeView>

<style>
    /* Third-party icon libraries should provide these styles out-of-the-box. */

    /* base styles for all custom icons */
    .my-icon {
        /* Define size, position and font styles here. */
        display: inline-block;
        width: 1em;
        height: 1em;
        font-size: 16px;
    }

    /* styles for specific custom icons */
    .my-icon-purple {
        /* define a background image or a font icon glyph here */
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
            Icon = SvgIcon.Home
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 2,
            Text = "SVG Icon",
            ParentId = 1,
            HasChildren = false,
            Icon = SvgIcon.Envelope
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 3,
            Text = "Custom Icon",
            ParentId = 1,
            Icon = "my-icon my-icon-purple"
        });

        TreeViewData.Add(new TreeItem()
        {
            Id = 4,
            Text = "Empty Icon",
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
