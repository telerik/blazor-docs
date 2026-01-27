---
title: Expand and collapse TreeView items on click
description: How to expand and collapse the parent TreeView items when clicking on them?
type: how-to
page_title: Expand and collapse TreeView items on click
slug: treeview-kb-expand-collapse-on-item-click
position: 
tags: treeview, item, expand, collapse, click, onclick
ticketid: 1583333
res_type: kb
components: ["treeview"]
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

Currently, I am able to expand or collapse the parent TreeView items only when I click on their arrow buttons.

How can I expand the items when I click on their text? Is it also possible to collapse an item when I click it?

## Solution

By design, the parent TreeView items are expanded or collapsed on click of the expand/collapse icon that is rendered next to the item.

To expand a TreeView item when you click on it:

* Handle the [TreeView `OnItemClick` event](slug:treeview-events#onitemclick).
* Verify if the clicked item is a parent, so it can be expanded:
	* For [flat data](slug:components/treeview/data-binding/flat-data) check if `HasChildren` field equals `true`.
	* For [hierarchical data](slug:components/treeview/data-binding/hierarchical-data) check if the `Items` field (or your custom field name) contains any child items.
* Check if the clicked item exists in the [`ExpandedItems`](slug:treeview-expand-items)  collection:	
	* If the clicked item is not part of the collection, you may add it to programmatically expand it.
	* If the clicked item is already part of the collection, this means the item is currently expanded. You may programmatically collapse it by removing it from the `ExpandedItems`.

>caption Expand and collapse TreeView items on click

````RAZOR
@*Expand and collapse items on click in TreeView with flat data.*@

<TelerikTreeView Data="@FlatData"
                 OnItemClick="@OnItemClickHandler"
                 @bind-ExpandedItems="@ExpandedItems">
</TelerikTreeView>


@code {
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    private List<TreeItem> FlatData { get; set; }

    private async Task OnItemClickHandler(TreeViewItemClickEventArgs args)
    {
        var currItem = args.Item as TreeItem;

        //verify if the clicked item is a parent one
        if (currItem.HasChildren)
        {
            //if the clicked item is currently cointained in the ExpandedItems,
            //you might need to collapse it on subsequent click
            if (ExpandedItems.Any(x => x.Equals(currItem)))
            {
                ExpandedItems = ExpandedItems.Where(x => x != currItem);
            }
            //add the item to the ExpandedItems collection
            else
            {
                ExpandedItems = ExpandedItems.Concat(new[] { currItem });
            }
        }
    }

    #region Data Generation

    protected override void OnInitialized()
    {
        LoadFlatData();
    }

    private void LoadFlatData()
    {
        List<TreeItem> items = new List<TreeItem>();

        items.Add(new TreeItem()
            {
                Id = 1,
                Text = "Project",
                ParentId = null,
                HasChildren = true,
                Icon = SvgIcon.Folder
            });

        items.Add(new TreeItem()
            {
                Id = 2,
                Text = "Design",
                ParentId = 1,
                HasChildren = true,
                Icon = SvgIcon.Brush
            });
        items.Add(new TreeItem()
            {
                Id = 3,
                Text = "Implementation",
                ParentId = 1,
                HasChildren = true,
                Icon = SvgIcon.Folder
            });

        items.Add(new TreeItem()
            {
                Id = 4,
                Text = "site.psd",
                ParentId = 2,
                HasChildren = false,
                Icon = SvgIcon.FilePsd
            });
        items.Add(new TreeItem()
            {
                Id = 5,
                Text = "index.js",
                ParentId = 3,
                HasChildren = false,
                Icon = SvgIcon.Js
            });
        items.Add(new TreeItem()
            {
                Id = 6,
                Text = "index.html",
                ParentId = 3,
                HasChildren = false,
                Icon = SvgIcon.Html5
            });
        items.Add(new TreeItem()
            {
                Id = 7,
                Text = "styles.css",
                ParentId = 3,
                HasChildren = false,
                Icon = SvgIcon.Css
            });

        FlatData = items;
    }
    #endregion

    #region Data Models
    public class GridDataModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int WorkingOn { get; set; }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
    }
    #endregion
}
````

