---
title: Data Binding
page_title: Treeview for Blazor Overview | Data Binding
description: Data Binding the Treeview for Blazor
slug: components/treeview/data-bind
tags: telerik,blazor,treeview,data,bind,databind,databinding
published: True
position: 1
---

# Treeview Data Binding

This article explains the different ways to provide data to a TreeView component, the properties related to data binding and their results.

First, review:

* The available (bindable) [features of a treeview item](#treeview-item-features).
* How to match fields in the model with the treeview item [data bindings](#data-bindings).

There are three modes of providing data to a treeview, and they all use the items' features:

* [Flat data](#flat-data) - a single collection of items with defined parent-child relationships.
* [Hierarchical data](#hierarchical-data) - separate collections of items and their child items.
* [Load on demand](#load-on-demand) or lazy loading - providing children to a node when it expands through an event.

## Treeview Item Features

The treeview items provide the following features that you control through the corresponding fields in their data binding:

* `Id` - a unique identifier for the item. Required.
* `ParentId` - identifies the parent to whom the item belongs. Needed only when binding to flat data. All items with the same `ParentId` will be rendered at the same level. For a root level item, this must be `null`.
* `Text` - the text that will be shown on the item.
* `Icon` / `IconClass` / `ImageUrl` - the [Telerik icon]({%slug general-information/font-icons%}), a class for a custom font icon, or the URL to a raster image that will be rendered in the item. They have the listed order of precedence in case more than one is present in the data (that is, an `Icon` will have the highest importance).
* `Expanded` - whether the item is expanded when it renders, or the user has to expand it manually.
* `HasChildren` - whether the item has children. Determines whether an expand arrow is rendered next to the item. Required.
* `Items` - the collection of child items that will be rendered under the current item. Needed only when binding to hierarchical data.

## Data Bindings

The properties of a treeview item match directly to a field of the model the treeview is bound to. You provide that relationship by providing the name of the field from which the corresponding information is present. To do this, under the `TelerikTreeViewBindings` tag, use the `TelerikTreeViewBinding` tag properties.

Each `TelerikTreeViewBinding` tag exposes the following properties that refer to item properties:

* IdField => Id
* ParentIdField => ParentId
* TextField => Text
* IconClassField => IconClass
* IconField => Icon
* ImageUrlField => ImageUrl
* ExpandedField => Expanded
* HasChildrenField => HasChildren
* ItemsField => Items
* Level - this is used for defining [different bindings for different levels](#multiple-level-bindings). If no level is set, the bindings are taken as default for any level that does not have explicit settings. You should have one `TelerikTreeViewBinding` without a level.

>tip There are default values for the field names. If your model names match the defaults, you don't have to define them in the bindings settings.

>caption Default field names for treeview item bindings. If you use these, you don't have to specify them in the `TelerikTreeViewBinding` tag explicitly.

````CSHTML
public class TreeItem
{
	public int Id { get; set; }
	public string Text { get; set; }
	public int? ParentId { get; set; }
	public bool HasChildren { get; set; }
	public string Icon { get; set; }
	public bool Expanded { get; set; }
}
````

The following **Example** shows how to define simple binding to match item fields to a model so a tree renders the provided flat data source.

>caption Sample binding on a flat data source. Showcases how to set the properties to match the model. With this model, the only field name you must explicitly specify is `ParentIdField`, the others match the defaults.

@[template](/_contentTemplates/treeview/basic-example.md#basic-example-with-screenshot)

### Multiple Level Bindings

You can define different binding settings for the different levels of nodes in a treeview. With this, the children of a node can consume a different field than their parent, and this may make your application more flexible. If you use [hierarchical data binding](#hierarchical-data), the children can even use a different model from their parent.

This also allows you to define a different `ItemTemplate` for different levels.

To define multiple bindings, add multiple `TelerikTreeViewBinding` tags and define their `Level`.

If a certain level does not have an explicit data bindings tag, it will use the default one that has no level.

>caption How to use per-level data binding settings to change model fields

````CSHTML
@using Telerik.Blazor.Components.TreeView

 The third level will use the main data bindings settings that do not have a level specified 

<TelerikTreeView Data="@FlatData">
	<TelerikTreeViewBindings>
		<TelerikTreeViewBinding ParentIdField="Parent" ExpandedField="IsExpanded"></TelerikTreeViewBinding>
		<TelerikTreeViewBinding Level="1" TextField="SecondText" ParentIdField="Parent" ExpandedField="IsExpanded"></TelerikTreeViewBinding>
	</TelerikTreeViewBindings>
</TelerikTreeView>

@code {
	public IEnumerable<TreeItem> FlatData { get; set; }

	public class TreeItem
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string SecondText { get; set; }
		public int? Parent { get; set; }
		public bool HasChildren { get; set; }
		public bool IsExpanded { get; set; }
	}

	protected override void OnInit()
	{
		LoadFlat();
	}

	private void LoadFlat()
	{
		List<TreeItem> items = new List<TreeItem>();

		for (int i = 1; i <= 4; i++)
		{
			items.Add(new TreeItem()
			{
				Id = i,
				Text = "Parent " + i,
				Parent = null,
				HasChildren = i < 3,
				IsExpanded = i == 1
			});
		}

		for (int i = 5; i < 15; i++)
		{
			items.Add(new TreeItem()
			{
				Id = i,
				SecondText = "Child " + i, //this is the field used at level 1 - it is a different field than at levels 0 and 2
				Parent = i < 10 ? 1 : 2,
				HasChildren = i == 5,
				IsExpanded = i == 5
			});
		}

		for (int i = 16; i < 20; i++)
		{
			items.Add(new TreeItem()
			{
				Id = i,
				Text = "Second Child " + i,
				Parent = 5
			});
		}

		FlatData = items;
	}
}
````

>caption The result from the snippet above

![](images/treeview-multiple-databindings-result.png)

## Flat Data

Flat data means that the entire collection of treeview items is available at one level, for example `List<MyTreeItemModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`.

>caption Example of flat data in a treeview

````CSHTML
@using Telerik.Blazor.Components.TreeView

<TelerikTreeView Data="@FlatData">
	<TelerikTreeViewBindings>
		<TelerikTreeViewBinding ParentIdField="Parent" ExpandedField="IsExpanded"></TelerikTreeViewBinding>
	</TelerikTreeViewBindings>
</TelerikTreeView>

@code {
	public IEnumerable<TreeItem> FlatData { get; set; }

	public class TreeItem //most fields use the default names and will bind automatically in this example
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public int? Parent { get; set; } //this is a non-default field name
		public bool HasChildren { get; set; }
		public bool IsExpanded { get; set; } //this is a non-default field name
	}

	protected override void OnInit()
	{
		FlatData = LoadFlat();
	}

	private List<TreeItem> LoadFlat()
	{
		List<TreeItem> items = new List<TreeItem>();

		items.Add(new TreeItem()
		{
			Id = 1,
			Text = "Parent 1",
			Parent = null, // indicates a root (zero-level) item
			HasChildren = true, // informs the treeview there are children so it renders the expand option
			IsExpanded = true // an item can be expanded by default
		});

		items.Add(new TreeItem()
		{
			Id = 2,
			Text = "Parent 2",
			Parent = null, //  indicates a root item
			HasChildren = true, 
			IsExpanded = false
		});

			items.Add(new TreeItem()
		{
			Id = 3,
			Text = "Parent 3",
			Parent = null, // indicates a root item
			HasChildren = false, //there will be no children in this item
			IsExpanded = true // will not have an effect if there are no children
		});

		items.Add(new TreeItem()
		{
			Id = 4,
			Text = "Child 1 of Parent 1",
			Parent = 1, // the parent will be the first item
			HasChildren = false,
			IsExpanded = false
		});

		items.Add(new TreeItem()
		{
			Id = 5,
			Text = "Child 2 of Parent 1",
			Parent = 1, // the parent will be the first item
			HasChildren = true,
			IsExpanded = true
		});

		items.Add(new TreeItem()
		{
			Id = 6,
			Text = "Child 1 of Child 2",
			Parent = 5, // the parent will be the first child of the first root item
			HasChildren = false,
			IsExpanded = false
		});

		items.Add(new TreeItem()
		{
			Id = 7,
			Text = "Child 1 of Parent 2",
			Parent = 2, // the parent will be the second root item
			HasChildren = false,
			IsExpanded = false
		});

		return items;
	}
}
````

## Hierarchical Data

Hierarchical data means that the collection child items is provided in a field of its parent's model. By default, this is the `Items` field.

This lets you gather separate collections of data and/or use different models at each different level. Note that the data binding settings are per level, so a certain level will always use the same bindings, regardless of the model they represent and their parent.

>caption Example of hierarchical data that uses different models for the parent and the child. Using different models is not required.

````CSHTML
@using Telerik.Blazor.Components.TreeView

<TelerikTreeView Data="@HierarchicalData">
	<TelerikTreeViewBindings>
		<TelerikTreeViewBinding TextField="Category" ItemsField="Products"></TelerikTreeViewBinding>
		<TelerikTreeViewBinding Level="1" TextField="ProductName"></TelerikTreeViewBinding>
	</TelerikTreeViewBindings>
</TelerikTreeView>

@code {
	public IEnumerable<ProductCategoryItem> HierarchicalData { get; set; }

	public class ProductCategoryItem
	{
		public string Category { get; set; }
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
			Products = firstCategoryProducts, // this is how child items are provided
			HasChildren = firstCategoryProducts?.Count > 0, // set this depending on the presence of items in the child items collection

		});

		roots.Add(new ProductCategoryItem
		{
			Category = "Category 2" // we will set no other properties and it will not have children, nor will it be expanded
		});

		HierarchicalData = roots;
	}
}
````

## Load On Demand

You don't have to provide all the data the treeview will render at once - the root nodes are sufficient for an initial display. You can then use the `OnExpand` event of the treeview to provide [hierarchical data](#hierarchical-data) to the node that was just expanded. Loading nodes on demand can improve the performance of your application by requesting less data at any given time.

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

  * [Live Demo: TreeView Flat Data](https://demos.telerik.com/blazor-ui/treeview/flat-data)
  * [Live Demo: TreeView Hierarchical Data](https://demos.telerik.com/blazor-ui/treeview/hierarchical-data)
  * [Live Demo: TreeView Per-Level Data Bindings](https://demos.telerik.com/blazor-ui/treeview/bindings)
  * [Live Demo: TreeView Load on Demand](https://demos.telerik.com/blazor-ui/treeview/lazy-loading)

