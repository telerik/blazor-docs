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
        new TreeItem { Text = "Engineering Department", Id = 1, HasChildren = true },
        new TreeItem { Text = "Human Resources", Id = 2, HasChildren = true },
        new TreeItem { Text = "Marketing", Id = 3, HasChildren = true }
    };

        // Engineering Team
        roots[0].Items.Add(new TreeItem
            {
                Text = "Software Development",
                Id = 4,
                HasChildren = true
            });
        roots[0].Items.Add(new TreeItem
            {
                Text = "QA and Testing",
                Id = 5,
                HasChildren = true
            });

        roots[0].Items[0].Items.Add(new TreeItem
            {
                Text = "Alice Johnson (Senior Developer)",
                Id = 6
            });
        roots[0].Items[0].Items.Add(new TreeItem
            {
                Text = "Bob Smith (Frontend Developer)",
                Id = 7
            });

        roots[0].Items[1].Items.Add(new TreeItem
            {
                Text = "Charlie Kim (QA Engineer)",
                Id = 8
            });

        // HR Team
        roots[1].Items.Add(new TreeItem
            {
                Text = "Diana Lee (HR Manager)",
                Id = 9
            });
        roots[1].Items.Add(new TreeItem
            {
                Text = "Ethan Green (Recruiter)",
                Id = 10
            });

        // Marketing Team
        roots[2].Items.Add(new TreeItem
            {
                Text = "Content Strategy",
                Id = 11,
                HasChildren = true
            });

        roots[2].Items[0].Items.Add(new TreeItem
            {
                Text = "Fiona White (Content Lead)",
                Id = 12
            });
        roots[2].Items[0].Items.Add(new TreeItem
            {
                Text = "George Brown (Copywriter)",
                Id = 13
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
