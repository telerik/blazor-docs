---
title: Load on Demand
page_title: DropDownTree - Data Binding on Demand
description: Lazy load child items on demand with the Telerik DropDownTree for Blazor.
slug: dropdowntree-data-binding-load-on-demand
tags: telerik,blazor,dropdowntree,databinding
components: ["dropdowntree"]
published: True
position: 15
---

# DropDownTree Load on Demand

This article explains how to load flat and hierarchical data on demand in the DropDownTree for Blazor.
@[template](/_contentTemplates/dropdowntree/general.md#data-binding-basics-link)

You can bind the DropDownTree to just one or two levels on initial display for efficiency. To show an expand icon for parent items and enable loading of children on demand, set the `HasChildren` property of the parent item to `true`. Then, use the [`OnExpand` event](slug:dropdowntree-events#onexpand) to load the child items of the expanded node. Loading data on demand can improve the performance of your application by requesting less data at any given time.

## Flat Data

>caption Load DropDownTree items on demand with flat data

````RAZOR
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@DropDownTreeExpandedItems"
                     OnExpand="@OnDropDownTreeExpand"
                     Width="300px">
</TelerikDropDownTree>

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; }

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    private int IdCounter { get; set; }

    private async Task OnDropDownTreeExpand(DropDownTreeExpandEventArgs args)
    {
        TreeItem expandedItem = (TreeItem)args.Item;

        if (args.Expanded && DropDownTreeData.Where(x => x.ParentId == expandedItem.Id).Count() == 0)
        {
            await LoadChildren(expandedItem);
        }
    }

    private async Task LoadChildren(TreeItem item)
    {
        // Simulate async operation.
        await Task.Delay(500);

        for (int i = 1; i <= 2; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                ParentId = item.Id,
                Text = $"Tree Item {IdCounter}",
                HasChildren = true
            });
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 3; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                Text = $"Tree Item {IdCounter}",
                HasChildren = true
            });
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
````

## Hierarchical Data

>caption Load DropDownTree items on demand with hierarchical data

````RAZOR
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@DropDownTreeExpandedItems"
                     OnExpand="@OnDropDownTreeExpand"
                     Width="300px">
</TelerikDropDownTree>

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    private int IdCounter { get; set; }

    private async Task OnDropDownTreeExpand(DropDownTreeExpandEventArgs args)
    {
        TreeItem expandedItem = (TreeItem)args.Item;

        if (args.Expanded && expandedItem.Items is null)
        {
            await LoadChildren(expandedItem);
        }
    }

    private async Task LoadChildren(TreeItem item)
    {
        // Simulate async operation.
        await Task.Delay(500);

        item.Items = new List<TreeItem>();

        for (int i = 1; i <= 2; i++)
        {
            item.Items.Add(new TreeItem()
            {
                Id = ++IdCounter,
                HasChildren = true,
                Text = $"Tree Item {IdCounter}",
                Value = IdCounter
            });
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 3; i++)
        {
            DropDownTreeData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                HasChildren = true,
                Text = $"Tree Item {IdCounter}",
                Value = IdCounter
            });
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public List<TreeItem>? Items { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
````

## See Also

* [DropDownTree Data Binding Basics](slug:dropdowntree-data-binding-overview)
* [DropDownTree Binding to Flat Data](slug:dropdowntree-data-binding-flat-data)
* [DropDownTree Binding to Hierarchical Data](slug:dropdowntree-data-binding-hierarchical-data)
* [Live Demo: DropDownTree Demos](https://demos.telerik.com/blazor-ui/dropdowntree)
