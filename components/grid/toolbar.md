---
title: Toolbar
page_title: Grid for Blazor | Toolbar
description: Use toolbar and custom actions in Grid for Blazor
slug: components/grid/features/toolbar
tags: telerik,blazor,grid,toolbar
published: True
position: 22
---

# Grid Toolbar

The grid provides a toolbar where you can add a variety of actions that are not tied to a concrete row:

* [Built-in Commands](#built-in-commands)
* [Custom Commands](#custom-commands)

To use a toolbar, define `TelerikGridCommandButton` instances in the `TelerikGridToolBar` tag of the grid. You can read more about the features available in those buttons in the [Command Column]({%slug components/grid/columns/command%}) article.

>note The toolbar is not associated with an item from the data source. The `Item` field on the click event handler argument will always be `null` and the `Edit`, `Update`, `Cancel` commands do not work with it.

## Built-in Commands

The grid offers built-in commands that you can invoke through its toolbar. To use them, set the `Command` property of the button to the command name. The built-in command names are:

* `Create` - startes inserting a new item in the grid.

>caption How to insert a new item in the grid

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data=@MyData Pageable="true" PageSize="15" EditMode="inline">
	<TelerikGridToolBar>
		<TelerikGridCommandButton Command="Create" Icon="add">Add Employee</TelerikGridCommandButton>
	</TelerikGridToolBar>
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
		<TelerikGridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
		<TelerikGridCommandColumn>
			<TelerikGridCommandButton Command="Edit" Icon="edit">Edit</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Update" Icon="save" ShowInEdit="true" OnClick="@UpdateItem">Update</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</TelerikGridCommandButton>
		</TelerikGridCommandColumn>
	</TelerikGridColumns>
</TelerikGrid>

@result

@functions {
	string result;

	private void UpdateItem(GridCommandEventArgs args)
	{
		SampleData alteredItem = args.Item as SampleData;
		if (alteredItem.ID == 0)//one way to tell inserted item in this scenario
		{
			result = string.Format("On {2} you added the employee {0} who was hired on {1}.", alteredItem.Name, alteredItem.HireDate, DateTime.Now);
		}
		else
		{
			result = string.Format("Employee with ID {0} now has name {1} and hire date {2}", alteredItem.ID, alteredItem.Name, alteredItem.HireDate);
		}
		StateHasChanged();
	}

	//in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
	public class SampleData
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public DateTime HireDate { get; set; }
	}

	public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
	{
		ID = x,
		Name = "name " + x,
		HireDate = DateTime.Now.AddDays(-x)
	});
}
````

>caption The result from the code snippet above, after built-in Create button in the toolbar was clicked

![](images/create-toolbar-button.jpg)

## Custom Commands

You can use the toolbar to add buttons that invoke actions specific to your application.

>caption How to define a custom command in the grid toolbar

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data=@MyData Pageable="true" PageSize="15">
	<TelerikGridToolBar>
		<TelerikGridCommandButton Command="MyToolbarCommand" OnClick="@MyCommandFromToolbar" Icon="info">Fire My Command</TelerikGridCommandButton>
	</TelerikGridToolBar>
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
		<TelerikGridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
	</TelerikGridColumns>
</TelerikGrid>

@result

@functions {
	string result;

	private void MyCommandFromToolbar(GridCommandEventArgs args)
	{
		//note - the args.Item object is null because the command item is not associated with an item

		result = "my custom toolbar command fired at " + DateTime.Now.ToString();

		StateHasChanged();
	}

	//in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
	public class SampleData
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public DateTime HireDate { get; set; }
	}

	public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
	{
		ID = x,
		Name = "name " + x,
		HireDate = DateTime.Now.AddDays(-x)
	});
}
````

>caption The result from the code snippet above, after the custom command button in the toolbar was clicked

![](images/custom-command-toolbar.png)

## See Also

  * [Live Demo: Grid Toolbar](https://demos.telerik.com/blazor/grid/inlineediting)