#basic-example

````CSHTML
Sample treeview bound to self-referencing flat data. Also uses the built-in icons from the Telerik suite

<TelerikTreeView Data="@FlatData">
	<TreeViewBindings>
		<TreeViewBinding IdField="Id" ParentIdField="ParentIdValue" ExpandedField="Expanded" TextField="Text" HasChildrenField="HasChildren" IconField="Icon" />
	</TreeViewBindings>
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
	}
	
	public IEnumerable<TreeItem> FlatData { get; set; }

	protected override void OnInitialized()
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

#end

#data-binding-basics-link
Before continuing, make sure you are familiar with the [treeview data binding basics]({%slug components/treeview/data-binding/overview%}).
#end

