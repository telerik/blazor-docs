---
title: How to Show Tooltip for TreeView Parent Items in Blazor
description: Learn how to create tooltip for Telerik TreeView items in Blazor using the ItemTemplate and Tooltip components.
type: how-to
page_title: How to Show Tooltip for TreeView Parent Items in Blazor
slug: treeview-kb-show-tooltip-on-parent
tags: treeview, blazor, tooltip, item template
res_type: kb
ticketid: 1684449
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeView for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This knowledge base article answers the following questions:

- How to display Tooltip for Telerik TreeView items in Blazor?
- How to customize Tooltip for parent items in Telerik TreeView?
- How to use ItemTemplate in Telerik TreeView to show Tooltip?

## Solution

To show Tooltip for Telerik TreeView parent items, use the [`ItemTemplate`](slug:components/treeview/templates) to include the Tooltip functionality. Below is an example of how to achieve this:

````RAZOR
<TelerikTooltip TargetSelector=".parent-item" />

<TelerikTreeView Data="@TreeData">
    <TreeViewBindings>
        <TreeViewBinding>
            <ItemTemplate>
                @{
                    TreeItem itm = context as TreeItem;
                    if (itm.HasChildren)
                    {
                        <span class="parent-item" title="Click the Arrow to the left">@itm.Text</span>
                    }
                    else
                    {
                        <span>
                            <strong>@itm.Text</strong>
                        </span>
                    }
                }
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

@code {
    private IEnumerable<TreeItem>? TreeData { get; set; }

    protected override void OnInitialized()
    {
        LoadHierarchical();
    }

    private void LoadHierarchical()
    {
        List<TreeItem> roots = new List<TreeItem>() {
            new TreeItem { Text = "Item 1", Id = 1, HasChildren = true },
            new TreeItem { Text = "Item 2", Id = 2, HasChildren = true }
        };

        roots[0].Items.Add(new TreeItem
            {
                Text = "Item 1 first child",
                Id = 3

            });

        roots[0].Items.Add(new TreeItem
            {
                Text = "Item 1 second child",
                Id = 4

            });

        roots[1].Items.Add(new TreeItem
            {
                Text = "Item 2 first child",
                Id = 5

            });

        roots[1].Items.Add(new TreeItem
            {
                Text = "Item 2 second child",
                Id = 6

            });

        TreeData = roots;
    }

    public class TreeItem
    {
        public string Text { get; set; } = string.Empty;
        public int Id { get; set; }
        public List<TreeItem> Items { get; set; } = new List<TreeItem>();
        public bool HasChildren { get; set; }
    }
}
````

## See Also

- [TreeView Templates Documentation](slug:components/treeview/templates)
- [Telerik Tooltip Overview](slug:tooltip-overview)
- [TreeView Component Overview](slug:treeview-overview)
