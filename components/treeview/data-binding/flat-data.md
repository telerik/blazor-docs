---
title: Flat Data
page_title: Treeview for Blazor | Data Binding to Flat Data
description: Data Binding the Treeview for Blazor to flat data
slug: components/treeview/data-binding/flat-data
tags: telerik,blazor,treeview,data,bind,databind,databinding,flat
published: True
position: 1
---

# Treeview Data Binding to Flat Data

This article explains how to bind the TreeView for Blazor to flat data. 
@[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)


Flat data means that the entire collection of treeview items is available at one level, for example `List<MyTreeItemModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`.

You must also provide the correct value for the `HasChildren` field - for items that have children, you must set it to `true` so that the expand arrow is rendered.

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

	protected override void OnInitialized()
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


## See Also

  * [TreeView Data Binding Basics]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView Flat Data](https://demos.telerik.com/blazor-ui/treeview/flat-data)
  * [Binding to Hierarchical Data]({%slug components/treeview/data-binding/hierarchical-data%})
  * [Load on Demand]({%slug components/treeview/data-binding/load-on-demand%})

