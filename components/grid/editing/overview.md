---
title: Overview
page_title: Grid for Blazor | CRUD Overview
description: CRUD basics for the Grid for Blazor
slug: components/grid/editing/overview
tags: telerik,blazor,grid,editing,overview
published: True
position: 0
---

# Grid CRUD Operations Overview

CRUD operations with the Grid for Blazor are done through the dedicated CRUD events it exposes for data editing.

The CRUD operations are performed on the collection that is provided to its `Data` property unless the corresponding event is cancelled.

You can use the events to trasfer the changes from the current collection to the actual data source (for example, call a service, or use the `SaveChanges()` method of your context).

List of the available events:

* `OnCreate` - fires when the `Create` [toolbar]({%slug components/grid/features/toolbar%}) button is clicked and an item is about to be inserted into the grid. There is no new item yet in this event, you can cancel it to prevent the user from adding records.
* `OnUpdate` - fires when the `Update`/`Save` [command button]({%slug components/grid/columns/command%}) is clicked and the data is updated in the local collection. Cancellable.
* `OnDelete` - fires when the `Delete` command button is clicked. Cancellable.
* `OnEdit` - fires when the user is about to enter edit mode for an exising row. Cancellable.
* `OnCancel` - fires when the user clicks the `Cancel` command button. Allows you to undo the changes to the data in the context. Cancellable.

The event handlers receive an argument of type `GridCommandEventArgs` that exposes the following fields:

* `IsCancelled` - a boolean field indicating whether the grid operation is to be prevented (for example, prevent a row from opening for edit, or from updating).
* `IsNew` - a boolean field idicating whether the item was just added through the grid. Lets you differentiate a data source Create operation from Update operation in the `OnUpdate` event.
* `Item` - an object you can cast to you model class to obtain the current data item. Not available for the `Create` operation.
* `Field` - specific to [InCell editing]({%slug components/grid/editing/incell%}) - indicates which is the model field the user changed when updating data.
* `Value` - specific to [InCell editing]({%slug components/grid/editing/incell%}) - indicates what is the new value the user changed when updating data.

>caption Handling the CRUD events of the grid to save data to the actual data source

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Grid

<strong>Double click a cell in the Name column, edit the name and click outside of the cell to see the change. Editing is cancelled for the first two records.</strong>

<TelerikGrid Data=@MyData EditMode="inline" Pageable="true">
	<TelerikGridEvents>
		<EventsManager OnUpdate="@UpdateHandler" OnEdit="@EditHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler" OnCancel="@CancelHandler"></EventsManager>
	</TelerikGridEvents>
	<TelerikGridToolBar>
		<TelerikGridCommandButton Command="Create" Icon="add">Add Employee</TelerikGridCommandButton>
	</TelerikGridToolBar>
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
		<TelerikGridColumn Field=@nameof(SampleData.Name) Title="Name" />
		<TelerikGridCommandColumn>
			<TelerikGridCommandButton Command="Update" Icon="save" ShowInEdit="true">Update</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Edit" Icon="edit">Edit</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Delete" Icon="delete">Delete</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</TelerikGridCommandButton>
		</TelerikGridCommandColumn>
	</TelerikGridColumns>
</TelerikGrid>
@logger

@functions {
	public void EditHandler(GridCommandEventArgs args)
	{
		SampleData item = (SampleData)args.Item;

		//prevent opening for edit based on condition
		if (item.ID < 3)
		{
			args.IsCancelled = true;//the general approach for cancelling an event
		}

		AppendToLog("Edit", args);
	}

	public void UpdateHandler(GridCommandEventArgs args)
	{
		AppendToLog("Update", args);

		SampleData item = (SampleData)args.Item;

		bool isInsert = args.IsNew;//insert or update operation
		
		//perform actual data source operations here
		//if you have a context added through an @inject statement, you could call its SaveChanges() method
		//myContext.SaveChanges();
	}

	public void DeleteHandler(GridCommandEventArgs args)
	{
		AppendToLog("Delete", args);

		SampleData item = (SampleData)args.Item;

		//perform actual data source operation here
		
		//if you have a context added through an @inject statement, you could call its SaveChanges() method
		//myContext.SaveChanges();
	}


	public void CreateHandler(GridCommandEventArgs args)
	{
		AppendToLog("Create", args);

		//there is no Item associated with this event handler
	}

	public void CancelHandler(GridCommandEventArgs args)
	{
		AppendToLog("Cancel", args);

		SampleData item = (SampleData)args.Item;

		//perform actual data source operation here (like cancel changes on a context)
		//if you have a context added through an @inject statement, you could use something like this to abort changes
		//foreach (var entry in myContext.ChangeTracker.Entries().Where(entry => entry.State == EntityState.Modified))
		//{
		//	entry.State = EntityState.Unchanged;
		//}
	}

	MarkupString logger;
	private void AppendToLog(string commandName, GridCommandEventArgs args)
	{
		string currAction = string.Format(
			"<br />Command: <strong>{0}</strong>; is cancelled: <strong>{1}</strong>; is the item new: <strong>{2}</strong>",
				commandName,
				args.IsCancelled,
				args.IsNew
			);
		logger = new MarkupString(logger + currAction);
	}
	

	//in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
	public class SampleData
	{
		public int ID { get; set; }
		public string Name { get; set; }
	}


	public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
	{
		ID = x,
		Name = "name " + x
	});
}
````


>note It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

## See Also

  * [Live Demo: Grid PopUp Editing](https://demos.telerik.com/blazor/grid/popupediting)
  * [Live Demo: Grid Inline Editing](https://demos.telerik.com/blazor/grid/inlineediting)
  * [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor/grid/incellediting)
  * [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor/grid/customeditor)
  * [Live Demo: Grid Custom Edit Form](https://demos.telerik.com/blazor/grid/customformedit)
  
  