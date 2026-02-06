---
title: Hierarchical Data
page_title: DropDownTree - Data Binding to Hierarchical Data
description: Learn how to bind the Telerik DropDownTree for Blazor to hierarchical data of nested collections.
slug: dropdowntree-data-binding-hierarchical-data
tags: telerik,blazor,dropdowntree,databinding
published: True
position: 10
---

# DropDownTree Binding to Hierarchical Data

This article explains how to bind the DropDownTree for Blazor to hierarchical data.
@[template](/_contentTemplates/dropdowntree/general.md#data-binding-basics-link)

Hierarchical data means that the child items exist in a property of the parent item. By default, the DropDownTree expects this property to be called `Items`, otherwise set the property name in the `ItemsField` parameter.

The DropDownTree renders an expand icon for all items that:

* Have a non-`null` child items collection.
* Have a `HasChildren` model property and its value is `true`. If a `HasChildren` property exists, it takes precedence over the child items collection.

Hierarchical data binding allows you to have [different model types at each DropDownTree level](#different-type-at-each-level). Note that the [data binding settings are per level](slug:dropdowntree-data-binding-overview#dropdowntree-bindings), so a certain level always uses the same bindings, regardless of the model they represent and their parent.

## Same Model Type on All Levels

The following example uses [default property names in the model](slug:dropdowntree-data-binding-overview#item-features), so there is no need to set field parameters in the DropDownTree configuration.

>caption Bind DropDownTree to hierarchical data with the same model type on all levels

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
        DropDownTreeData = LoadHierarchicalData();

        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.Items is not null);
    }

    private int TreeLevels { get; set; } = 3;
    private int RootItems { get; set; } = 2;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; }

    private List<TreeItem> LoadHierarchicalData()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateItems(items, 1);

        return items;
    }

    private void PopulateItems(List<TreeItem> items, int level)
    {
        for (int i = 1; i <= (level == 1 ? RootItems : ItemsPerLevel); i++)
        {
            TreeItem newItem = new()
            {
                Id = ++IdCounter,
                Text = $"Level {level} Item {i} Id {IdCounter}",
                Value = IdCounter
            };

            items.Add(newItem);
        }

        if (level < TreeLevels)
        {
            PopulateChildren(items, level + 1);
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
        public List<TreeItem>? Items { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
````

## Different Type at Each Level

The following example below uses two levels of hierarchy, but the same idea applies to any number of levels. You will likely need a separate `TreeViewBinding` tag for each level with its own field name configuration.

>caption Bind DropDownTree to hierarchical data with a different model type at each levels

````RAZOR
<TelerikDropDownTree Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@DropDownTreeExpandedItems"
                     Width="300px">
    <DropDownTreeBindings>
        <DropDownTreeBinding Level="0" ItemsField="@nameof(Category.Products)" />
        <DropDownTreeBinding Level="1" ItemsField="@nameof(Product.Parts)" />
        <DropDownTreeBinding Level="2" />
    </DropDownTreeBindings>
</TelerikDropDownTree>

@code {
    private List<Category> DropDownTreeData { get; set; } = new();

    private int DropDownTreeValue { get; set; } = 1;
    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<object>();

    private int IdCounter { get; set; }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 3; i++)
        {
            Category newCategory = new()
            {
                Id = ++IdCounter,
                Text = $"Category {i} Id {IdCounter}",
                Value = IdCounter,
                Products = new List<Product>()
            };

            DropDownTreeData.Add(newCategory);

            for (int j = 1; j <= 2; j++)
            {

                Product newProduct = new ()
                {
                    Id = ++IdCounter,
                    Text = $"Product {i}-{j} Id {IdCounter}",
                    Value = IdCounter,
                    Parts = new List<Part>()
                };

                newCategory.Products.Add(newProduct);

                for (int k = 1; k <= 3; k++)
                {
                    newProduct.Parts.Add(new Part()
                    {
                        Id = ++IdCounter,
                        Text = $"Part {i}-{j}-{k} Id {IdCounter}",
                        Value = IdCounter
                    });
                }
            }
        }

        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.Products is not null);
    }

    public class Category
    {
        public int Id { get; set; }
        public List<Product>? Products { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }

    public class Product
    {
        public int Id { get; set; }
        public List<Part>? Parts { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }

    public class Part
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }
}
````

## See Also

* [DropDownTree Data Binding Basics](slug:dropdowntree-data-binding-overview)
* [Live Demo: DropDownTree Hierarchical Data](https://demos.telerik.com/blazor-ui/dropdowntree/hierarchical-data)
* [DropDownTree Binding to Flat Data](slug:dropdowntree-data-binding-flat-data)
* [Loading DropDownTree Items on Demand](slug:dropdowntree-data-binding-load-on-demand)
