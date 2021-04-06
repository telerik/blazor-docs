---
title: Load on Demand
page_title: Treeview - Data Binding on Demand
description: Load on Demand in the Treeview for Blazor.
slug: components/treeview/data-binding/load-on-demand
tags: telerik,blazor,treeview,data,bind,databind,databinding,load,demand
published: True
position: 3
---

# Treeview Load on Demand

This article explains how to load nodes on demand the TreeView for Blazor. 
@[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)


You don't have to provide all the data the treeview will render at once - the root nodes are sufficient for an initial display. You can then use the `OnExpand` event of the treeview to provide [flat]({%slug components/treeview/data-binding/flat-data%}) or [hierarchical]({%slug components/treeview/data-binding/hierarchical-data%}) data to the node that was just expanded. Loading nodes on demand can improve the performance of your application by requesting less data at any given time.

In this article:

* [Hierarchical Data Load on Demand - One Model](#hierarchical-data-load-on-demand---one-model)

* [Flat Data Load on Demand](#flat-data-load-on-demand)

* [Hierarchical Data Load on Demand - Different Models](#hierarchical-data-load-on-demand---different-models)

## Hierarchical Data Load on Demand - One Model

The **example** below shows how you can handle hierarchical data load on demand in detail. It uses the same model for the two different [levels of data bindings]({%slug components/treeview/data-binding/overview%}#multiple-level-bindings) it showcases.

>caption One Model Hierarchical Data Load on Demand in a TreeView with sample handling of the various cases. Review the code comments for details.

````CSHTML
@using Telerik.DataSource.Extensions
@* used for the .AddRange() extension method *@

<TelerikTreeView Data="@HierarchicalData" OnExpand="@LoadChildren">
    <TreeViewBindings>
        <TreeViewBinding TextField="ProductName" ItemsField="SubProducts" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    public List<ProductItem> HierarchicalData { get; set; }

    public class ProductItem
    {
        public string ProductName { get; set; }
        public int Id { get; set; } //will be used to identify the node, not for rendering in this example
        public List<ProductItem> SubProducts { get; set; }
        public bool Expanded { get; set; }
        public bool HasChildren { get; set; }
    }    

    protected override void OnInitialized()
    {
        LoadRootHierarchical();
    }

    private void LoadRootHierarchical()
    {
        HierarchicalData = new List<ProductItem>();

        HierarchicalData.Add(new ProductItem
        {
            ProductName = "Product 1",
            HasChildren = true, // allow the user to expand the item and load children on demand
            Id = 1 // an identifier for use in the service call for child items
        });

        HierarchicalData.Add(new ProductItem
        {
            ProductName = "Product 2",
            HasChildren = true,
            Id = 2
        });
    }

    private async Task LoadChildren(TreeViewExpandEventArgs args)
    {
        // check if the item is expanding, we don't need to do anything if it is collapsing
        if (args.Expanded)
        {
            ProductItem currProduct = args.Item as ProductItem;

            if (currProduct.SubProducts?.Count > 0)
            {
                return; // item has been expanded before so it has data, don't load data again
                        // alternatively, load it again but make sure to handle the child items correctly
                        // either overwrite the entire collection, or use some other logic to append/merge
            }

            int itemIdentifier = currProduct.Id;
            // in a similar fashion, you can identify the item that was just expanded through its properties
            // in this example, we will hardcode some data and logic for brevity
            // in a real case, you would probably await a remote endpoint/service

            if (itemIdentifier == 2) // simulate no data for a certain node - the second in our example
            {
                currProduct.HasChildren = false; // remove the expand icon from the node

                StateHasChanged(); // inform the UI that the data is changed

                return;
            }

            // data requested and received for a certain node
            List<ProductItem> theSubProducts = new List<ProductItem>() {
                new ProductItem { ProductName= $"Product {itemIdentifier} - SubProduct 1" },
                new ProductItem { ProductName= $"Product {itemIdentifier} - SubProduct 2" }
            };

            // one way to add child elements to a collection
            currProduct.SubProducts = new List<ProductItem>();
            currProduct.SubProducts.AddRange<ProductItem>(theSubProducts);
            // the AddRange() method comes from the Telerik.DataSource.Extensions

            StateHasChanged(); // inform the UI that the data is changed
        }
    }
}
````

## Flat Data Load on Demand

The **example** below shows how you can handle flat data load on demand in detail.

>caption Flat Data Load on Demand in a TreeView. Review the code comments for details.

````CSHTML
@* Load child nodes on demand *@

<TelerikTreeView Data="@FlatData" OnExpand="@LoadChildren">
    <TreeViewBindings>
        <TreeViewBinding ParentIdField="Parent" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    public List<TreeItem> FlatData { get; set; } = new List<TreeItem>();

    async Task LoadChildren(TreeViewExpandEventArgs args)
    {
        TreeItem currItem = args.Item as TreeItem;

        // check if the item is expanding, we don't need to do anything if it is collapsing
        // check if the current node already has data in order not to load it again
        if (args.Expanded && !FlatData.Any(x => x.Parent == currItem.Id))
        {
            if (currItem.Id == 1)
            {
                FlatData.Add(new TreeItem()
                {
                    Id = 4,
                    Text = "Child 1 of Parent 1",
                    Parent = 1, // the parent will be the first root item
                    HasChildren = false
                });

                FlatData.Add(new TreeItem()
                {
                    Id = 5,
                    Text = "Child 2 of Parent 1",
                    Parent = 1, // the parent will be the first root item
                    HasChildren = true
                });
            }
            else if (currItem.Id == 5)
            {
                FlatData.Add(new TreeItem()
                {
                    Id = 6,
                    Text = "Child 1 of Child 2",
                    Parent = 5, // the parent will be the second child of the first root item
                    HasChildren = false
                });
            }
            else if (currItem.Id == 2)
            {
                FlatData.Add(new TreeItem()
                {
                    Id = 7,
                    Text = "Child 1 of Parent 2",
                    Parent = 2, // the parent will be the second root item
                    HasChildren = false
                });
            }
        }
    }

    public class TreeItem //most fields use the default names and will bind automatically in this example
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? Parent { get; set; } //this is a non-default field name
        public bool HasChildren { get; set; }
    }

    //Root level items generation when the component initializes 

    protected override void OnInitialized()
    {
        FlatData = LoadFlat();
    }

    private List<TreeItem> LoadFlat()
    {
        FlatData.Add(new TreeItem()
        {
            Id = 1,
            Text = "Parent 1",
            Parent = null, // indicates a root (zero-level) item
            HasChildren = true // informs the treeview there are children so it renders the expand option
        });

        FlatData.Add(new TreeItem()
        {
            Id = 2,
            Text = "Parent 2",
            Parent = null, //  indicates a root item
            HasChildren = true
        });

        FlatData.Add(new TreeItem()
        {
            Id = 3,
            Text = "Parent 3",
            Parent = null, // indicates a root item
            HasChildren = false //there will be no children in this item
        });

        return FlatData;
    }
}
````

## Hierarchical Data Load on Demand - Different Models

The **example** below shows how you can handle hierarchical data load on demand in detail. It uses two different models for the two different [levels of data bindings]({%slug components/treeview/data-binding/overview%}#multiple-level-bindings) it showcases. You do not have to use different models and/or different bindings ( see [Hierarchical Data Load on Demand - One Model](#hierarchical-data-load-on-demand---one-model) ).

>caption Different Models Hierarchical Data Load on Demand in a TreeView with sample handling of the various cases. Review the code comments for details.

````CSHTML
@using Telerik.DataSource.Extensions
@* used for the .AddRange() extension method *@

<TelerikTreeView Data="@HierarchicalData" OnExpand="@LoadChildren">
    <TreeViewBindings>
        <TreeViewBinding TextField="Category" ItemsField="Products" />
        <TreeViewBinding Level="1" TextField="ProductName" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    public List<ProductCategoryItem> HierarchicalData { get; set; }

    public class ProductCategoryItem
    {
        public string Category { get; set; }
        public int CategoryId { get; set; } //will be used to identify the node, not for rendering in this example
        public List<ProductItem> Products { get; set; }
        public bool Expanded { get; set; }
        public bool HasChildren { get; set; }
    }

    public class ProductItem
    {
        public string ProductName { get; set; }
        // the following fields are to denote you can keep having hierarchy further down. They are not required
        // they are not really used in this example and you would have a collection of child items too
        // see the information about multiple data bindings earlier in this article on using them
        public bool Expanded { get; set; }
        public bool HasChildren { get; set; }
    }

    protected override void OnInitialized()
    {
        LoadRootHierarchical();
    }

    private void LoadRootHierarchical()
    {
        HierarchicalData = new List<ProductCategoryItem>();

        HierarchicalData.Add(new ProductCategoryItem
        {
            Category = "Category 1",
            HasChildren = true, // allow the user to expand the item and load children on demand
            CategoryId = 1 // an identifier for use in the service call for child items
        });

        HierarchicalData.Add(new ProductCategoryItem
        {
            Category = "Category 2",
            HasChildren = true,
            CategoryId = 2
        });
    }

    private async Task LoadChildren(TreeViewExpandEventArgs args)
    {
        // check if the item is expanding, we don't need to do anything if it is collapsing
        // in this example we will also check the type of the model to know how to identify the node and what data to load. If you use only one model for all levels, you don't have to do this
        if (args.Expanded && args.Item is ProductCategoryItem)
        {
            ProductCategoryItem currCategory = args.Item as ProductCategoryItem;
            if (currCategory.Products?.Count > 0)
            {
                return; // item has been expanded before so it has data, don't load data again
                        // alternatively, load it again but make sure to handle the child items correctly
                        // either overwrite the entire collection, or use some other logic to append/merge
            }
            int itemIdentifier = currCategory.CategoryId;
            // in a similar fashion, you can identify the item that was just expanded through its properties
            // in this example, we will hardcode some data and logic for brevity
            // in a real case, you would probably await a remote endpoint/service

            if (itemIdentifier == 2) // simulate no data for a certain node - the second in our example
            {
                currCategory.HasChildren = false; // remove the expand icon from the node

                StateHasChanged(); // inform the UI that the data is changed

                return;
            }

            // data requested and received for a certain node
            List<ProductItem> theProducts = new List<ProductItem>() {
                new ProductItem { ProductName= $"Category {itemIdentifier} - Product 1" },
                new ProductItem { ProductName= $"Category {itemIdentifier} - Product 2" }
            };

            // one way to add child elements to a collection
            currCategory.Products = new List<ProductItem>();
            currCategory.Products.AddRange<ProductItem>(theProducts);
            // the AddRange() method comes from the Telerik.DataSource.Extensions

            StateHasChanged(); // inform the UI that the data is changed
        }
    }
}
````

## See Also

  * [TreeView Data Binding Basics]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView Load on Demand](https://demos.telerik.com/blazor-ui/treeview/lazy-loading)
  * [Binding to Flat Data]({%slug components/treeview/data-binding/flat-data%})
  * [Binding to Hierarchical Data]({%slug components/treeview/data-binding/hierarchical-data%})

