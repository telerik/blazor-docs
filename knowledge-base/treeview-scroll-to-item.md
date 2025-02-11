---
title: Scroll to TreeView Item
description: How to scroll to a specific TreeView node programmatically with JavaScript.
type: how-to
page_title: Scroll to TreeView Item
slug: treeview-kb-scroll-to-item
position: 
tags: treeview, scroll, item, node, scrollintoview, javascript
ticketid: 1650374, 1552684, 1552385, 1549637, 1545970
res_type: kb
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

This KB article discusses the following scenarios and questions:

* I expand a TreeView parent item and select a child item. The child item may be outside the visible part of the page viewport. How to find and automatically scroll to the selected TreeView node, even if it is not visible on the screen?
* Sometimes I may load additional TreeView data and refresh the TreeView. Then, I need to scroll to a specific TreeView item automatically and without a need for manual user interaction.
* How to implement behavior like `scrollIntoView` in Javascript, or `BringIntoView` in WPF, or `EnsureVisible` in Windows UI?
* How to focus a TreeView node, so that the user doesn't have to scroll to it?

## Solution

Use the [`scrollIntoView` JavaScript method](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView), which all DOM elements have.

The whole process involves these steps:

1. Get the TreeView item from the data.
1. [Load additional items on demand](slug:components/treeview/data-binding/load-on-demand), if necessary.
1. Expand parent(s) via [`ExpandedItems`](slug:components/treeview/data-binding/overview), if necessary. Older **UI for Blazor** versions (up to 2.30) require a [different implementation with an `Expanded` property of the TreeView items](slug:changes-in-3-0-0).
1. [Select the item](slug:treeview-selection-overview) or implement some way to find it in the DOM.
1. Set a boolean flag and use it in `OnAfterRenderAsync` to execute the JavaScript.
1. Execute the JavaScript code with [some timeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) to ensure that the new HTML markup has been rendered by the browser. The timeout value will depend on the server-client latency and number of newly rendered items.
1. (Optional) Focus the TreeView item element (`<li class="k-treeview-item">`) to continue the keyboard navigation from that item.

Here are two examples:

* The first TreeView [receives all data initially](#load-all-data-initially).
* The second TreeView [loads child items on demand](#load-data-on-demand).

### Load All Data Initially

````RAZOR
@inject IJSRuntime js

<label>
    Item (1 - 50):
    <TelerikNumericTextBox @bind-Value="@TreeItemId" Min="1" Max="50" Decimals="0" Width="80px" />
</label>

<TelerikButton OnClick="@SelectAndScroll">Select and Scroll</TelerikButton>

<TelerikTreeView Data="@TreeData"
                 SelectionMode="@TreeViewSelectionMode.Single"
                 @bind-SelectedItems="@SelectedItems"
                 @bind-ExpandedItems="@ExpandedItems"
                 Class="scrollable-treeview">
    <TreeViewBindings>
        <TreeViewBinding />
    </TreeViewBindings>
</TelerikTreeView>

<style>
    .scrollable-treeview {
        height: 300px;
        overflow: auto;
        scroll-behavior: smooth;
        border: 1px solid #ccc;
        margin: 1em;
    }
</style>

@* Move the JavaScript to a separate JS file *@
<script suppress-error="BL9992">
    function scrollToItem(treeSelector) {
        setTimeout(function() {
            var item = document.querySelector(treeSelector + " .k-selected");
            if (item) {
                // scroll to item
                item.scrollIntoView({ block: "nearest" });
                // focus item for keyboard navigation
                item.closest(".k-treeview-item").focus();
            }
        });
    }
</script>

@code {
    private List<TreeItem> TreeData { get; set; } = new();
    private IEnumerable<object> SelectedItems { get; set; } = new List<TreeItem>();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    private int TreeItemId { get; set; } = 44;
    private bool ShouldScroll { get; set; }

    private void SelectAndScroll()
    {
        // get the item
        TreeItem? itemToSelect = TreeData.FirstOrDefault(x => x.Id == TreeItemId);

        if (itemToSelect != null)
        {
            if (itemToSelect?.ParentId != null)
            {
                // get and expand the parent
                var parentItem = TreeData.First(x => x.Id == itemToSelect.ParentId);
                ExpandedItems = ExpandedItems.Append(parentItem);
            }

            // select the item
            SelectedItems = new List<TreeItem>() { itemToSelect! };

            // raise flag for JavaScript scrolling
            ShouldScroll = true;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (ShouldScroll)
        {
            ShouldScroll = false;

            // wait for the TreeView item to select
            await Task.Delay(1);

            await js.InvokeVoidAsync("scrollToItem", ".scrollable-treeview");
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        TreeData = LoadFlat();
    }

    private List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        for (int i = 1; i <= 50; i++)
        {
            var rnd = new Random();
            items.Add(new TreeItem()
            {
                Id = i,
                Text = $"Item {i}",
                ParentId = i > 3 ? rnd.Next(1, 4) : null,
                HasChildren = i <= 3
            });
        }

        return items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }
}
````

### Load Data on Demand

The example uses simplified logic for parent-child item relationship. In production scenarios, you may need to find the correct parent item to expand.

````RAZOR
@inject IJSRuntime js

<p>
    <label>
        Root Item (1 - 5):
        <TelerikNumericTextBox @bind-Value="@RootItemId" Min="1" Max="5" Decimals="0" Width="80px" />
    </label>
</p>

<p>
    <label>
        Child Item (1 - 50):
        <TelerikNumericTextBox @bind-Value="@ChildItemId" Min="1" Max="30" Decimals="0" Width="80px" />
    </label>
</p>

<p>
    <label>
        Simulate item load delay (1 - 5000 ms):
        <TelerikNumericTextBox @bind-Value="@LoadingDelay" Min="1" Max="5000" Decimals="0" Width="100px" />
    </label>
</p>

<TelerikButton OnClick="@SelectAndScroll">Select and Scroll</TelerikButton>

<TelerikTreeView Data="@TreeData" OnExpand="@OnTreeViewExpand"
                 SelectionMode="@TreeViewSelectionMode.Single"
                 @bind-SelectedItems="@SelectedItems"
                 @bind-ExpandedItems="@ExpandedItems"
                 Class="scrollable-treeview">
    <TreeViewBindings>
        <TreeViewBinding />
    </TreeViewBindings>
</TelerikTreeView>

<style>
    .scrollable-treeview {
        height: 300px;
        overflow: auto;
        border: 1px solid #ccc;
        margin: 1em;
    }
</style>

@* ! Move the JavaScript code to its proper place ! *@
<script suppress-error="BL9992">
    function scrollToItem(treeSelector) {
        setTimeout(function() {
            var item = document.querySelector(treeSelector + " .k-selected");
            if (item) {
                // scroll to item
                item.scrollIntoView({ block: "nearest" });
                // focus item for keyboard navigation
                item.closest(".k-treeview-item").focus();
            }
        }, 300);
    }
</script>

@code {
    private List<TreeItem> TreeData { get; set; }
    private IEnumerable<object> SelectedItems { get; set; } = new List<TreeItem>();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    private int? RootItemId { get; set; } = 3;
    private int? ChildItemId { get; set; } = 25;
    private int LoadingDelay { get; set; } = 500;
    private bool ShouldScroll { get; set; }

    private async Task SelectAndScroll()
    {
        if (RootItemId.HasValue && ChildItemId.HasValue)
        {
            // get the item
            var parentItem = TreeData.First(x => x.Id == RootItemId);
            var itemId = RootItemId * 100 + ChildItemId;
            var itemToSelect = TreeData.FirstOrDefault(x => x.Id == itemId);

            // load data if necessary
            if (itemToSelect == null)
            {
                await LoadChildren(parentItem);
                itemToSelect = TreeData.FirstOrDefault(x => x.Id == itemId);
            }

            // expand the parent
            ExpandedItems = ExpandedItems.Append(parentItem);

            // refresh TreeView after loading children
            TreeData = new List<TreeItem>(TreeData);

            // select the item
            SelectedItems = new List<TreeItem>() { itemToSelect };

            // raise flag for JavaScript scrolling
            ShouldScroll = true;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (ShouldScroll)
        {
            ShouldScroll = false;
            await js.InvokeVoidAsync("scrollToItem", ".scrollable-treeview");
        }
        await base.OnAfterRenderAsync(firstRender);
    }

    private async Task OnTreeViewExpand(TreeViewExpandEventArgs args)
    {
        var item = args.Item as TreeItem;

        if (args.Expanded && !TreeData.Any(x => x.ParentId == item.Id))
        {
            await LoadChildren(item);
        }
    }

    private async Task LoadChildren(TreeItem item)
    {
        var parentId = item.Id;

        // simulate network delay
        await Task.Delay(LoadingDelay);

        for (int i = parentId * 100 + 1; i <= parentId * 100 + 30; i++)
        {
            TreeData.Add(new TreeItem()
            {
                Id = i,
                Text = $"Item {parentId} - {i}",
                ParentId = parentId
            });
        }
    }

    protected override void OnInitialized()
    {
        TreeData = LoadFlat();
    }

    private List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        for (int i = 1; i <= 5; i++)
        {
            items.Add(new TreeItem()
            {
                Id = i,
                Text = "Item " + i.ToString(),
                ParentId = null,
                HasChildren = true
            });
        }

        return items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }
}
````
