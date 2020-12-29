---
title: TelerikDropDownList does not open when contained in TelerikTreeView
description: How to fix the dropdownlist not opening when inside a treeview
type: troubleshooting
page_title: DropdownList does not work in treeview
slug: treeview-kb-ddl-not-open
position: 
tags: 
ticketid: 1500437
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2.20.0 and later</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>DropDownList for Blazor, TreeView for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
The TelerikDropDownList does not open / dropdown when contained within TelerikTreeView.  This worked in previous versions before v2.20.0.

Other elements that rely on clicks and focus may not operate as expected.

## Cause\Possible Cause(s)
As for 2.20.0, the [drag-and-drop feature of the treeview](https://demos.telerik.com/blazor-ui/treeview/drag-drop) consumes mouse events and so the focus is lost from the dropdown, which causes it to close.

## Solution
Stop the mouse events propagation so that they don't reach the treeview, for example:

````CSHTML
<TelerikTreeView Data="@TreeData">
    <TreeViewBindings>
        <TreeViewBinding>
            <ItemTemplate>
                <div @onclick:stopPropagation="true">

                    <TelerikDropDownList Data="@AvailableValues"
                                         @bind-Value="@SelectedValue">
                    </TelerikDropDownList>

                </div>
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

@code {
    List<string> AvailableValues { get; set; } = new List<string> { "None", "One", "Two" };
    string SelectedValue { get; set; }

    List<TreeItem> TreeData { get; set; }

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

