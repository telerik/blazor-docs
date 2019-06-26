---
title: Overview
page_title: Treeview for Blazor Overview
description: Overview of the Treeview for Blazor
slug: components/treeview/overview
tags: telerik,blazor,treeview,overview
published: True
position: 0
---

# Treeview Overview

The Treeview component displays data (flat or hierarchical) in a traditional tree-like structure. You can navigate through the items and their children, define templates for the individual nodes, render text and icons/images, and respond to events.

To use a Telerik TreeView for Blazor:

1. add the `TelerikTreeView` tag
1. provide a collection of models to its `Data` property (read more in the Data Binding article)
1. match the fields in the models with the binding schema for the nodes

>caption Basic treeview with flat data binding and built-in icons 

````CSHTML
@using Telerik.Blazor.Components.TreeView

<TelerikTreeView Data="@FlatData">
	<TelerikTreeViewBindings>
		<TelerikTreeViewBinding IdField="Id" ParentIdField="ParentIdValue" ExpandedField="Expanded" TextField="Text" HasChildrenField="HasChildren" IconField="Icon"></TelerikTreeViewBinding>
	</TelerikTreeViewBindings>
</TelerikTreeView>

@code {
	public class TreeItem
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public int? ParentIdValue { get; set; }
		public bool HasChildren { get; set; }
		public string Icon { get; set; }
		public bool Expanded { get; set; }

		public TreeItem()
		{
		}
	}
	public IEnumerable<TreeItem> FlatData { get; set; }

	protected override void OnInit()
	{
		LoadFlatData();
	}

	private void LoadFlatData()
	{
		List<TreeItem> items = new List<TreeItem>();

		items.Add(new TreeItem()
		{
			Id = 1,
			Text = "Project",
			ParentIdValue = null,
			HasChildren = true,
			Icon = "folder",
			Expanded = true
		});

			items.Add(new TreeItem()
			{
				Id = 2,
				Text = "Design",
				ParentIdValue = 1,
				HasChildren = true,
				Icon = "brush",
				Expanded = true
			});
			items.Add(new TreeItem()
			{
				Id = 3,
				Text = "Implementation",
				ParentIdValue = 1,
				HasChildren = true,
				Icon = "folder",
				Expanded = true
			});

				items.Add(new TreeItem()
				{
					Id = 4,
					Text = "site.psd",
					ParentIdValue = 2,
					HasChildren = false,
					Icon = "psd",
					Expanded = true
				});
				items.Add(new TreeItem()
				{
					Id = 5,
					Text = "index.js",
					ParentIdValue = 3,
					HasChildren = false,
					Icon = "js"
				});
				items.Add(new TreeItem()
				{
					Id = 6,
					Text = "index.html",
					ParentIdValue = 3,
					HasChildren = false,
					Icon = "html"
				});
				items.Add(new TreeItem()
				{
					Id = 7,
					Text = "styles.css",
					ParentIdValue = 3,
					HasChildren = false,
					Icon = "css"
				});

		FlatData = items;
	}
}
````

>caption The result from the snippet above

![](images/treeview-overview.png)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.TreeView

<TelerikTreeView @ref="theTreeView">
</TelerikTreeView>

@code {
    Telerik.Blazor.Components.TreeView.TelerikTreeView theTreeView;
}
````

The treeview items provide the following features that you control through the corresponding fields in their data binding:

* `Id` - a unique identifier for the item. Required.
* `ParentId` - identifies the parent to whom the item belongs. Needed only when binding to flat data.
* `Text` - the text that will be shown on the item.
* `Icon` / `IconClass` / `ImageUrl` - the [Telerik icon]({%slug general-information/font-icons%}), a class for a custom font icon, or the URL to a raster image that will be rendered in the item. They have the listed order of precedence in case more than one is present in the data (that is, an `Icon` will have the highest importance).
* `Expanded` - whether the item is expanded when it renders, or the user has to expand it manually.
* `HasChildren` - whether the item has children. Determines whether an expand arrow is rendered next to the item.
* `Items` - the collection of child items that will be rendered under the current item. Needed only when binding to hierarchical data.



## Navigate Views

A treeview is often used to list pages, views or sections in an application so the user can navigate through them. In Blazor, navigation is accomplished through a `NavLink` element, and to use it in a treeview, you must use its `ItemTemplate`:

>caption Navigation with treeview

````CSHTML
@using Telerik.Blazor.Components.TreeView

<TelerikTreeView Data="@TreeData">
	<TelerikTreeViewBindings>
		<TelerikTreeViewBinding IdField="Id" ParentIdField="ParentIdValue" ExpandedField="Expanded" HasChildrenField="HasChildren">
			<ItemTemplate>
				<NavLink Match="NavLinkMatch.All" href="@((context as TreeItem).Page)">
					@((context as TreeItem).Text)
				</NavLink>
			</ItemTemplate>
		</TelerikTreeViewBinding>
	</TelerikTreeViewBindings>
</TelerikTreeView>

@code {
	public class TreeItem
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public int? ParentIdValue { get; set; }
		public bool HasChildren { get; set; }
		public string Page { get; set; }
		public bool Expanded { get; set; }
	}

	public IEnumerable<TreeItem> TreeData { get; set; }

	protected override void OnInit()
	{
		LoadTreeData();
	}

	private void LoadTreeData()
	{
		List<TreeItem> items = new List<TreeItem>();

		items.Add(new TreeItem()
		{
			Id = 1,
			Text = "Project",
			ParentIdValue = null,
			HasChildren = true,
			Page = "one",
			Expanded = true
		});

		items.Add(new TreeItem()
		{
			Id = 2,
			Text = "Design",
			ParentIdValue = 1,
			HasChildren = false,
			Page = "two",
			Expanded = true
		});
		items.Add(new TreeItem()
		{
			Id = 3,
			Text = "Implementation",
			ParentIdValue = 1,
			HasChildren = false,
			Page = "three",
			Expanded = true
		});

		TreeData = items;
	}
}
````

## See Also

  * [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/treeview/index)

