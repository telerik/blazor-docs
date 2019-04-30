---
title: Command Column
page_title: Grid for Blazor | Command Column
description: Command buttons per row in Grid for Blazor
slug: components/grid/columns/command
tags: telerik,blazor,grid,column,command
published: True
position: 0
---

# Grid Command Column

The command column of a grid allows you to initiate [inline]({%slug components/grid/editing/inline%}) or [popup]({%slug components/grid/editing/popup%}) editing, or to execute your own commands.

To define it, add a `TelerikGridCommandColumn` in the `TelerikGridColumns` collection of a grid. The command column takes a collection of `TelerikGridCommandButton` instances that invoke the commands. It also offers the `Title` property so you can set its header text.

>tip The lists below showcase the available features and their use, and after them you can find a code example that shows declarations and handling.

The `TelerikGridCommandButton` tag offers the following features:

* `Command` - the command that will be invoked. Can be one of the built-in commands, or a custom command name.
* `OnClick` - the event handler that the button will fire.
* `ShowInEdit` - a boolean property indicating whether the button is only visible while the user is editing/inserting data.
* `ChildContent` - the text the button will render. You can also place it between the command button's opening and closing tags.
* Appearance properties like Icon, Class, Enabled that are come from the underlying [Button Component features]({%slug components/button/overview%}).

There are three built-in commands:

* `Edit` - initiates the inline or popup editing (depending on the EditMode configuration of the grid).
* `Update` - performs the actual update operation after the data has been changed. Allows you to trigger an event handler to perform the data source operation.
* `Cancel` - aborts the current operation (edit or insert).

The `OnClick` handler of the commands receives an argument of type `GridCommandEventArgs` that exposes the following properties:

* `IsCancelled` - set this to true to prevent the operation if the business logic requires it.
* `Item` - the model item the grid row is bound to. You can use it to access the model fields and methods in order to preform the actual data source operations.
* `Type` - the type of event (command).

>caption Example of adding and handling command columns for inline editing of a grid

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Grid

<span>Edit will cancelled for "name 2"</span>
<br />@CustomCommandResult

<TelerikGrid Data=@GridData EditMode="inline"
		   Pageable="true" PageSize="15">
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(SampleData.ID) Editable="false" Title="Employee ID" />
		<TelerikGridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
		<TelerikGridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
		<TelerikGridCommandColumn>
			<TelerikGridCommandButton Command="Edit" Icon="edit" OnClick="@TriggerEdit">Edit</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Update" Icon="save" ShowInEdit="true" OnClick="@UpdateItem">Update</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true" OnClick="@CancelItem">Cancel</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="MyOwnCommand" Icon="information" ShowInEdit="false" OnClick="@MyCustomCommand">My Command</TelerikGridCommandButton>
		</TelerikGridCommandColumn>
	</TelerikGridColumns>
</TelerikGrid>

@functions {
	//in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
	public class SampleData
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public DateTime HireDate { get; set; }
	}

	public IEnumerable<SampleData> GridData = Enumerable.Range(1, 50).Select(x => new SampleData
	{
		ID = x,
		Name = "name " + x,
		HireDate = DateTime.Now.AddDays(-x)
	});

	private void TriggerEdit(GridCommandEventArgs args)
	{
		int empId = (args.Item as SampleData).ID;

		//example of cancelling an event based on condition
		if (empId == 2)
		{
			args.IsCancelled = true;
		}
	}
	
	private void UpdateItem(GridCommandEventArgs args)
	{
		SampleData theUpdatedItem = args.Item as SampleData;
		//save changes, for example by using the model fields and/or methods

		//if you have a context added through an @inject statement, you could call its SaveChanges() method
		//myContext.SaveChanges();
	}
	
	private void CancelItem(GridCommandEventArgs args)
	{
		SampleData theUpdatedItem = args.Item as SampleData;
		//revert the changes

		//if you have a context added through an @inject statement, you could use something like this to abort changes
		//foreach (var entry in nwContext.ChangeTracker.Entries().Where(entry => entry.State == EntityState.Modified))
		//{
		//	entry.State = EntityState.Unchanged;
		//}

		//inform the view to update
		StateHasChanged();
	}
	
	private MarkupString CustomCommandResult;

	private void MyCustomCommand(GridCommandEventArgs args)
	{
		CustomCommandResult = new MarkupString(string.Format("Custom command triggered for item {0}", (args.Item as SampleData).ID));

		//inform the UI for changes because this sample implementation needs it
		StateHasChanged();
	}
}
````

>caption The result from the code snippet above, after Edit was clicked on the first row, and the custom command button on the third row was clicked.

![](images/command-column-result.png)

## See Also

  * [Live Demo: Grid Command Column](https://demos.telerik.com/blazor-ui/grid/inlineediting)