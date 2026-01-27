---
title: TreeView Not Showing Horizontal Scrollbar
description: How to enable horizontal and vertical scrolling for the Telerik Blazor TreeeView
type: troubleshooting
page_title: TreeView Doesn't Display Horizontal Scrollbar
slug: treeview-kb-horizontal-scrollbar
position: 
tags: telerik,blazor,treeview,scrolling
ticketid: 1585834, 1558530, 1557541
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

The TreeView control is not showing a horizontal scroll bar, even though the TreeView items overflow their container. Some items are not fully visible.

The TreeView does not allow horizontal scrolling when some items extend past the viewport. Long items get cut off and can't be scrolled to. This also happens when the browser is zoomed in.

How to force a scroll bar to appear in the Blazor TreeView component?

## Possible Cause

The TreeView renders `div.k-animation-container` elements with an `overflow: hidden` CSS style. These elements wrap nested items and prohibit overflowing content during expand and collapse animations.

## Solution

1. Set a custom CSS class to the TreeView via the `Class` parameter. Alternatively, you can use the default `.k-treeview` class to target all TreeView instances on the page or in the app.
1. Override the `overflow: hidden` style of the `div.k-animation-container` elements **inside** the TreeView. Set it to the default value of `overflow: visible`.
1. Apply dimensions to trigger scrolling:
    * If you want the TreeView itself to show scrollbars, set `width` or `height` styles to it.
    * If you want the TreeView container to show scrollbars, set `width`, `height` and `overflow` styles to the container.

The example below shows how to implement both options - scroll the TreeView and scroll its parent container.

>caption Enable TreeView horizontal and vertical scrolling

````RAZOR
<h2>TreeView Component Scrolling</h2>

<TelerikTreeView Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems"
                 Class="scrollable-treeview" />

<style>
    /* the TreeView has overflow:auto by default, so just set dimensions */
    .scrollable-treeview {
        width: 300px;
        height: 300px;
    }
        /* allow the TreeView CONTENT to overflow and trigger scrolling */
        .scrollable-treeview .k-animation-container {
            overflow: visible;
        }
</style>

<h2>TreeView Parent Scrolling</h2>

<div class="scrollable-parent">
    <TelerikTreeView Data="@FlatData"
                     @bind-ExpandedItems="@ExpandedItems" />
</div>

<style>
    /* set dimensions and enable scrollability */
    .scrollable-parent {
        width: 300px;
        height: 300px;
        overflow: auto;
    }

        /* allow the TreeView AND its content to overflow and trigger scrolling */
        .scrollable-parent .k-treeview,
        .scrollable-parent .k-animation-container {
            overflow: visible;
        }
</style>

@code {
    private IEnumerable<TreeItem> FlatData { get; set; }

    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    protected override void OnInitialized()
    {
        FlatData = LoadTreeViewData();

        ExpandedItems = FlatData.Where(x => x.HasChildren == true);
    }

    #region TreeView data generation

    private List<TreeItem> LoadTreeViewData()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateChildren(items, null, 1);

        return items;
    }

    private int TreeLevels { get; set; } = 3;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; } = 1;

    private void PopulateChildren(List<TreeItem> items, int? parentId, int level)
    {
        for (int i = 1; i <= ItemsPerLevel; i++)
        {
            var itemId = IdCounter++;
            items.Add(new TreeItem()
            {
                Id = itemId,
                Text = $"Level {level} Item {i} with some additional long text that requires a scrollbar",
                ParentId = parentId,
                HasChildren = level < TreeLevels
            });

            if (level < TreeLevels)
            {
                PopulateChildren(items, itemId, level + 1);
            }
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }

    #endregion
}
````
