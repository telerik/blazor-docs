---
title: Add ContextMenu to the TreeView items
description: How add ContextMenu to the TreeView items.
type: how-to
page_title: Add ContextMenu to the TreeView items
slug: contextmenu-kb-treeview-item
position: 
tags: 
ticketid: 1508692
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ContextMenu for Blazor, TreeView for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I would like to add the ContextMenu component to every item (node) in the TreeView.

## Solution

The ContextMenu exposes an API to associate the component to any DOM element through the [ShowAsync]({%slug contextmenu-integration%}) method. You can use the [oncontextmenu](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oncontextmenu) event of an HTML element in the [treeview item template]({%slug components/treeview/templates%}) to show the context menu by using the `MouseEventArgs`. 



````CSHTML
@* Use the oncontextmenu event of the HTML element to show the ContextMenu for the TreeView items *@

<TelerikContextMenu Data="@ContextMenuData"
                    @ref="ContextMenu"
                    SeparatorField="Separator"
                    TextField="Text"
                    IconField="Icon"
                    OnClick="@((ContextMenuItem item) => ClickHandler(item))">
</TelerikContextMenu>

<TelerikTreeView Data="@TreeData">
    <TreeViewBindings>
        <TreeViewBinding>
            <ItemTemplate>
                @{
                    TreeItem itm = context as TreeItem;
                    <div @oncontextmenu:preventDefault="true"
                          @oncontextmenu="@((MouseEventArgs e) => ShowContextMenu(e, itm))">
                        Node:
                        <strong>@itm.Text</strong>
                    </div>
                }
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

@code {
    private TelerikContextMenu<ContextMenuItem> ContextMenu { get; set; }
    TreeItem LastClickedItem { get; set; }

    private async Task ShowContextMenu(MouseEventArgs e, TreeItem item)
    {
        LastClickedItem = item;

        await ContextMenu.ShowAsync(e.ClientX, e.ClientY);
    }

    private void ClickHandler(ContextMenuItem item)
    {
        if (!string.IsNullOrEmpty(item.Text) && LastClickedItem != null)
        {
            Console.WriteLine($"Clicked on {item.CommandName} for {LastClickedItem.Text}");
        }

        LastClickedItem = null;
    }

    async Task NodeClick(TreeItem clickeNode)
    {
        //custom code here
    }

    // sample data

    public IEnumerable<TreeItem> TreeData { get; set; }
    public List<ContextMenuItem> ContextMenuData { get; set; }


    public class ContextMenuItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public bool Separator { get; set; }
        public string CommandName { get; set; }
    }

    public class TreeItem
    {
        public string Text { get; set; }
        public int Id { get; set; }
        public List<TreeItem> Items { get; set; } = new List<TreeItem>();
        public bool Expanded { get; set; }
        public bool HasChildren { get; set; }
    }

    protected override void OnInitialized()
    {
        LoadHierarchical();

        ContextMenuData = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "Info",
                Icon = "information",
                CommandName = "info"
            },
            new ContextMenuItem
            {
                Separator = true
            },
            new ContextMenuItem
            {
                Text = "Delete",
                Icon = "delete",
                CommandName = "delete"
            }
        };
    }

    private void LoadHierarchical()
    {
        List<TreeItem> roots = new List<TreeItem>() {
            new TreeItem { Text = "Item 1", Id = 1, Expanded = true, HasChildren = true },
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
}
````

## Notes

At the time of writing, when you are using a template you cannot trigger a close of the ContextMenu, you can only close it if you click outside of it (there is an opened feature request for that in our [public feedback portal](https://feedback.telerik.com/blazor/1497622-add-hide-and-or-hideasync-method-to-contextmenu)) that contains a workaround.