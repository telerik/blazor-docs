---
title: Hierarchical Data
page_title: Treeview - Data Binding to Hierarchical Data
description: Data Binding the Treeview for Blazor to hierarchical data.
slug: components/treeview/data-binding/hierarchical-data
tags: telerik,blazor,treeview,data,bind,databind,databinding,hierarchical
published: True
position: 2
components: ["treeview"]
---
# Treeview Data Binding to Hierarchical Data

This article explains how to bind the TreeView for Blazor to hierarchical data. 

@[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)

Hierarchical data means that the child items are provided in a property of the parent item. By default, the TreeView expects this property to be called `Items`, otherwise set the property name in the `ItemsField` parameter. If a certain node has non-`null` child items collection, it will render an expand icon. The `HasChildren` model property can override this, but it is not required for hierarchical data binding.

The hierarchical data binding approach allows you have separate collections of data or different model types at each TreeView level. Note that the data binding settings are per level, so a certain level will always use the same bindings, regardless of the model they represent and their parent.

Consider the following examples:

* [Hierarchical data with different types at each level](#different-types-at-each-level)
* [Hierarchical data with the same type at all levels](#same-model-type-on-all-levels)

## Different Types at Each Level

The example below uses two levels of hierarchy, but the same idea applies to any number of levels. You will likely need a separate `TreeViewBinding` tag for each level with its own field name configuration.

>caption TreeView with different model type at each all level

````RAZOR
Hierarchical data hold collections of the child items

<TelerikTreeView Data="@HierarchicalData" @bind-ExpandedItems="@ExpandedItems">
    <TreeViewBindings>
        <TreeViewBinding TextField="Category" ItemsField="Products" />
        <TreeViewBinding Level="1" TextField="ProductName" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    public IEnumerable<ProductCategoryItem> HierarchicalData { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    public class ProductCategoryItem
    {
        public string Category { get; set; }
        public List<ProductItem> Products { get; set; }
    }

    public class ProductItem
    {
        public string ProductName { get; set; }
    }


    protected override void OnInitialized()
    {
        LoadHierarchical();
        ExpandedItems = HierarchicalData.Where(x => x.Products != null && x.Products.Any()).ToList();
    }

    private void LoadHierarchical()
    {
        List<ProductCategoryItem> roots = new List<ProductCategoryItem>();

        List<ProductItem> firstCategoryProducts = new List<ProductItem>()
        {
            new ProductItem { ProductName= "Category 1 - Product 1" },
            new ProductItem { ProductName= "Category 1 - Product 2" }
        };

        roots.Add(new ProductCategoryItem
        {
            Category = "Category 1",
            Products = firstCategoryProducts // this is how child items are provided

        });

        roots.Add(new ProductCategoryItem
        {
            Category = "Category 2" // we will set no other properties and it will not have children, nor will it be expanded
        });

        HierarchicalData = roots;
    }
}
````

## Same Model Type on All Levels

The example below uses the default property names in the model (`Id`, `Text`, `Items`), so there is no need to set field parameters in the TreeView configuration.

Experiment with the `TreeLevels`, `RootItems` and `ItemsPerLevel` values below.

>caption TreeView with random number of levels and same model type on all levels

````RAZOR
<TelerikTreeView Data="@HierarchicalData"
                 CheckBoxMode="@TreeViewCheckBoxMode.Multiple"
                 CheckChildren="true"
                 CheckParents="true"
                 SelectionMode="@TreeViewSelectionMode.Multiple"
                 @bind-ExpandedItems="@ExpandedItems"
                 @bind-CheckedItems="@CheckedItems"
                 @bind-SelectedItems="@SelectedItems" />

@code {
    private List<TreeItem> HierarchicalData { get; set; } = new();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();
    private IEnumerable<object> CheckedItems { get; set; } = new List<TreeItem>();
    private IEnumerable<object> SelectedItems { get; set; } = new List<TreeItem>();

    private int TreeLevels { get; set; } = 4;
    private int RootItems { get; set; } = 3;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; }

    protected override void OnInitialized()
    {
        HierarchicalData = LoadHierarchical();

        // Select, check and expand the root items.
        ExpandedItems = new List<TreeItem>(HierarchicalData);
        // CheckChildren and CheckParents don't affect programmatic checking.
        CheckedItems = new List<TreeItem>(HierarchicalData);
        SelectedItems = new List<TreeItem>(HierarchicalData);
    }

    private List<TreeItem> LoadHierarchical()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateItems(items, 1);

        return items;
    }

    private void PopulateItems(List<TreeItem> items, int level)
    {
        for (int i = 1; i <= (level == 1 ? RootItems : ItemsPerLevel); i++)
        {
            var itemId = ++IdCounter;

            var newItem = new TreeItem()
            {
                Id = itemId,
                Text = $"Level {level} Item {i} Id {itemId}"
            };

            items.Add(newItem);

            if (level < TreeLevels)
            {
                PopulateChildren(items, level + 1);
            }
        }
    }

    private void PopulateChildren(List<TreeItem> items, int level)
    {
        foreach (var item in items)
        {
            item.Items = new List<TreeItem>();

            PopulateItems(item.Items, level);
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<TreeItem>? Items { get; set; }
    }
}
````


## See Also

  * [TreeView Data Binding Basics](slug:components/treeview/data-binding/overview)
  * [Live Demo: TreeView Hierarchical Data](https://demos.telerik.com/blazor-ui/treeview/hierarchical-data)
  * [Binding to Flat Data](slug:components/treeview/data-binding/flat-data)
  * [Load on Demand](slug:components/treeview/data-binding/load-on-demand)
