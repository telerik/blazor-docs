---
title: Templates
page_title: Treeview for Blazor | Templates
description: Templates in the Treeview for Blazor
slug: components/treeview/templates
tags: telerik,blazor,treeview,templates
published: True
position: 5
---

# Treeview Templates

The Treeview component allows you to define a custom template for its nodes. This article explains how you can use it.

The `ItemTemplate` of a node is defined under the `TreeViewBinding` tag.

The template receives the model to which the item is bound as its `context`. You can use it to render the desired content.

You can also define different templates for the different levels in each `TreeViewBinding` tag.

You can use the template to render arbitrary content according to your application's data and logic. You can use components in it and thus provide rich content instead of plain text. You can also use it to add DOM event handlers like click, doubleclick, mouseover if you need to respond to them.

>caption Handle DOM events in a template - e.g., click on a node

````CSHTML
@result

<TelerikTreeView Data="@TreeData">
    <TreeViewBindings>
        <TreeViewBinding>
            <ItemTemplate>
                @{
                    TreeItem itm = context as TreeItem;
                    <span @onclick="@( _ => NodeClick(itm) )">
                        Node:
                        <strong>@itm.Text</strong>
                    </span>
                }
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

@code {
    string result { get; set; }
    async Task NodeClick(TreeItem clickeNode)
    {
        result = $"Last clicked node Id: {clickeNode.Id}";
    }

    // sample data

    public IEnumerable<TreeItem> TreeData { get; set; }

    public class TreeItem
    {
        public string Text { get; set; }
        public int Id { get; set; }
        public List<TreeItem> Items { get; set; } = new List<TreeItem>();
        public bool Expanded { get; set; }
        public bool HasChildren { get; set; }
    }

    protected override void OnInitialized()
    {
        LoadHierarchical();
    }

    private void LoadHierarchical()
    {
        List<TreeItem> roots = new List<TreeItem>() {
            new TreeItem { Text = "Item 1", Id = 1, Expanded = true, HasChildren = true },
            new TreeItem { Text = "Item 2", Id = 2, HasChildren = true }
        };

        roots[0].Items.Add(new TreeItem
        {
            Text = "Item 1 first child",
            Id = 3

        });

        roots[0].Items.Add(new TreeItem
        {
            Text = "Item 1 second child",
            Id = 4

        });

        roots[1].Items.Add(new TreeItem
        {
            Text = "Item 2 first child",
            Id = 5

        });

        roots[1].Items.Add(new TreeItem
        {
            Text = "Item 2 second child",
            Id = 6

        });

        TreeData = roots;
    }
}
````


>caption Use templates to implement navigation between views without the usage of the UrlField feature

````CSHTML
Implement your own navigation through NavLink elements, instead of using the built-in feature

<TelerikTreeView Data="@TreeData">
	<TreeViewBindings>
		<TreeViewBinding IdField="Id" ParentIdField="ParentIdValue" ExpandedField="Expanded" HasChildrenField="HasChildren">
			<ItemTemplate>
				<NavLink Match="NavLinkMatch.All" href="@((context as TreeItem).Page)">
					@((context as TreeItem).Text)
				</NavLink>
			</ItemTemplate>
		</TreeViewBinding>
	</TreeViewBindings>
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

	protected override void OnInitialized()
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


>caption Different templates for different node levels

````CSHTML
Multiple templates usage.

<TelerikTreeView Data="@HierarchicalData">
	<TreeViewBindings>
		<TreeViewBinding TextField="Category" ItemsField="Products">
			<ItemTemplate>
				Section: <strong>@((context as ProductCategoryItem).Category)</strong>
			</ItemTemplate>
		</TreeViewBinding>
		<TreeViewBinding Level="1" TextField="ProductName">
			<ItemTemplate>
				@{
					ProductItem currProduct = context as ProductItem;
					<img src="/images/products/@( currProduct.ProductId )" alt="@(currProduct.ProductName)" /> @(currProduct.ProductName)
				}
			</ItemTemplate>
		</TreeViewBinding>
	</TreeViewBindings>
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
		public int ProductId { get; set; }
		public string ProductName { get; set; }
	}

	protected override void OnInitialized()
	{
		LoadHierarchical();
	}

	private void LoadHierarchical()
	{
		List<ProductCategoryItem> roots = new List<ProductCategoryItem>();

		List<ProductItem> firstCategoryProducts = new List<ProductItem>() {
			new ProductItem { ProductName= "Product 1", ProductId = 1 },
			new ProductItem { ProductName= "Product 2", ProductId = 2 }
		};

		roots.Add(new ProductCategoryItem
		{
			Category = "Category 1",
			Expanded = true,
			Products = firstCategoryProducts,
			HasChildren = firstCategoryProducts?.Count > 0,

		});

		roots.Add(new ProductCategoryItem
		{
			Category = "Category 2"
		});

		HierarchicalData = roots;
	}
}
````


## See Also

  * [Data Binding a TreeView]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/treeview/index)

