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

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the TreeView item to illustrate its purpose by using the `IconField` parameter.


>caption How to use icons in Telerik TreeView

````CSHTML
@* This example shows how to add icons to the TreeView items *@

<TelerikTreeView Data="@TreeViewData">
    <TreeViewBindings>
        <TreeViewBinding IconField="@nameof(TreeViewModel.TelerikIcon)" />
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
                TelerikIcon = FontIcon.Home
            });

        TreeViewData.Add(new TreeViewModel()
            {
                Id = 2,
                Text = "Contact us",
                ParentId = 1,
                HasChildren = false,
                TelerikIcon = FontIcon.Envelop
            });

        TreeViewData.Add(new TreeViewModel()
            {
                Id = 3,
                Text = "Audio",
                ParentId = null,
                TelerikIcon = FontIcon.FileAudio
            });
    }

    public class TreeViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
        public int? ParentId { get; set; }
        public FontIcon? TelerikIcon { get; set; }
    }
}
````

## See Also

  * [TreeView Overview]({%slug treeview-overview%})
