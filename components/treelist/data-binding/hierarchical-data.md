---
title: Hierarchical Data
page_title: Treeview - Data Binding to Hierarchical Data
description: Data Binding the Treeview for Blazor to hierarchical data.
slug: treelist-data-binding-hierarchical-data
tags: telerik,blazor,treeview,data,bind,databind,databinding,hierarchical
published: True
position: 2
---

# Treeview Data Binding to Hierarchical Data

This article explains how to bind the TreeView for Blazor to hierarchical data. 
@[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)


Hierarchical data means that the collection child items is provided in a field of its parent's model. By default, this is the `Items` field. If there are items for a certain node, it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for hierarchical data binding.

This approach of providing nodes lets you gather separate collections of data and/or use different models at each different level. Note that the data binding settings are per level, so a certain level will always use the same bindings, regardless of the model they represent and their parent.

>caption Example of hierarchical data that uses different models for the parent and the child. Using different models is not required.

````CSHTML
Hierarchical data hold collections of the child items

<TelerikTreeView Data="@HierarchicalData">
	<TreeViewBindings>
		<TreeViewBinding TextField="Category" ItemsField="Products" />
		<TreeViewBinding Level="1" TextField="ProductName" />
	</TreeViewBindings>
</TelerikTreeView>

@code {
	public IEnumerable<ProductCategoryItem> HierarchicalData { get; set; }

	public class ProductCategoryItem
	{
		public string Category { get; set; }
		public List<ProductItem> Products { get; set; }
		public bool Expanded { get; set; }
	}

	public class ProductItem
	{
		public string ProductName { get; set; }
		// the following fields are to denote you can keep having hierarchy further down. They are not required
		// they are not really used in this example and you would have a collection of child items too
		// see the information about multiple data bindings earlier in this article on using them
		public bool Expanded { get; set; }
	}


	protected override void OnInitialized()
	{
		LoadHierarchical();
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
			Expanded = true,
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


## See Also

  * [TreeView Data Binding Basics]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView Hierarchical Data](https://demos.telerik.com/blazor-ui/treeview/hierarchical-data)
  * [Binding to Flat Data]({%slug components/treeview/data-binding/flat-data%})
  * [Load on Demand]({%slug components/treeview/data-binding/load-on-demand%})

