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
1. provide a collection of models to its `Data` property (read more in the [Data Binding article]({%slug components/treeview/data-binding/overview%}))
1. match the fields in the models with the binding schema for the nodes

>caption Basic treeview with flat data binding and built-in icons 

@[template](/_contentTemplates/treeview/basic-example.md#basic-example)

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

  * [Data Binding a TreeView]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/treeview/index)

