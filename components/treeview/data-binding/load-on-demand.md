---
title: Load on Demand
page_title: Treeview for Blazor | Data Binding on Demand
description: Load on Demand in the Treeview for Blazor
slug: components/treeview/data-binding/load-on-demand
tags: telerik,blazor,treeview,data,bind,databind,databinding,load,demand
published: True
position: 3
---

# Treeview Load on Demand

This article explains how to load nodes on demand the TreeView for Blazor. 
@[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)


You don't have to provide all the data the treeview will render at once - the root nodes are sufficient for an initial display. You can then use the `OnExpand` event of the treeview to provide [hierarchical data]({%slug components/treeview/data-binding/hierarchical-data%}) to the node that was just expanded. Loading nodes on demand can improve the performance of your application by requesting less data at any given time.

The **example** below shows how you can handle load on demand in detail. It uses two different models for the two different [levels of data bindings]({%slug components/treeview/data-binding/overview%}#multiple-level-bindings) it showcases. You do not have to use different models and/or different bindings.

>caption Load on Demand in a TreeView with sample handling of the various cases. Review the code comments for details.

````CSHTML
@using Telerik.Blazor.Components.TreeView

<TelerikTreeView Data="@HierarchicalData" OnExpand="@LoadChildren">
	<TelerikTreeViewBindings>
		<TelerikTreeViewBinding TextField="Category" ItemsField="Products"></TelerikTreeViewBinding>
		<TelerikTreeViewBinding Level="1" TextField="ProductName"></TelerikTreeViewBinding>
	</TelerikTreeViewBindings>
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

	protected override void OnInit()
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

	private async void LoadChildren(TreeViewExpandEventArgs args)
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

