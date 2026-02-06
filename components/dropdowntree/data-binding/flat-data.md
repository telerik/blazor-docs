---
title: Flat Data
page_title: DropDownTree - Data Binding to Flat Data
description: Learn how to bind the Telerik DropDownTree for Blazor to flat self-referencing data collections.
slug: dropdowntree-data-binding-flat-data
tags: telerik,blazor,dropdowntree,databinding
components: ["dropdowntree"]
published: True
position: 5
---

# DropDownTree Binding to Flat Data

This article explains how to bind the DropDownTree for Blazor to flat self-referencing data.
@[template](/_contentTemplates/dropdowntree/general.md#data-binding-basics-link)

Flat data means that all DropDownTree items are available at one level in a single collection, for example, `List<MyTreeItem>`. The parent-child relationships are defined through properties in the model. For example, the `ParentId` property value of one item points to the `Id` property value of another parent item. The root level items have `null` values for `ParentId`. There must be at least one node with a `null` value so that the TreeView in the DropDownTree popup renders.

You must also provide the correct value for the `HasChildren` property of each item, so that expand arrows display where needed.

When using [multiple level bindings](slug:dropdowntree-data-binding-overview#multiple-level-bindings), define the same `ParentIdField` for all levels for better performance.

>caption Bind DropDownTree to flat data

````RAZOR
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@DropDownTreeExpandedItems"
                     Width="300px">
</TelerikDropDownTree>

@code {
    private List<TreeItem> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 3;

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<TreeItem>();

    protected override void OnInitialized()
    {
        DropDownTreeData = LoadFlatData();

        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.ParentId is null && x.HasChildren);
    }

    private int TreeLevels { get; set; } = 3;
    private int RootItems { get; set; } = 2;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; }

    private List<TreeItem> LoadFlatData()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateChildren(items, null, 1);

        return items;
    }

    private void PopulateChildren(List<TreeItem> items, int? parentId, int level)
    {
        var itemCount = level == 1 ? RootItems : ItemsPerLevel;
        for (int i = 1; i <= itemCount; i++)
        {
            var itemId = ++IdCounter;
            items.Add(new TreeItem()
            {
                Id = itemId,
                ParentId = parentId,
                HasChildren = level < TreeLevels,
                Text = $"Level {level} Item {i} Id {itemId}",
                Value = itemId
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
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
````

## See Also

* [DropDownTree Data Binding Basics](slug:dropdowntree-data-binding-overview)
* [Live Demo: DropDownTree Flat Data](https://demos.telerik.com/blazor-ui/dropdowntree/flat-data)
* [DropDownTree Binding to Hierarchical Data](slug:dropdowntree-data-binding-hierarchical-data)
* [Loading DropDownTree Items on Demand](slug:dropdowntree-data-binding-load-on-demand)
