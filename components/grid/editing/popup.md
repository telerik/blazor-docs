---
title: PopUp Editing
page_title: Grid for Blazor | PopUp Editing
description: Popup editing of data in Grid for Blazor
slug: components/grid/editing/popup
tags: telerik,blazor,grid,PopUp,editing
published: True
position: 2
---

# Grid PopUp Editing

Popup editing lets the user click an [Edit command button]({%slug components/grid/columns/command%}) on the row, and a popup shows up with all its editable columns open up for changes. They can then click the `Save` button in the dialog to submit the changes to the model. This fires the `OnUpdate` event of the grid where your code receives the updated model so you can work with the data (for example, to call the `SaveChanges()` method of your context).

In a similar fashion, the `Cancel`, `Delete` command buttons and the `Add` toolbar button fire events on the grid to let you handle the data source operations.

You can also cancel the events by setting the `IsCancelled` property of the event arguments to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.


To enable PopUp editing in the grid, set its `EditMode` property to `popup`, then handle the CRUD events as shown in the example below.

>caption The Command buttons and the grid events let you handle data operations in PopUp edit mode

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Grid

<strong>Editing is cancelled for the first two records.</strong>

<TelerikGrid Data=@MyData EditMode="popup" Pageable="true">
	<TelerikGridEvents>
		<EventsManager OnUpdate="@UpdateHandler" OnEdit="@EditHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler" OnCancel="@CancelHandler"></EventsManager>
	</TelerikGridEvents>
	<TelerikGridToolBar>
		<TelerikGridCommandButton Command="Add" Icon="add">Add Employee</TelerikGridCommandButton>
	</TelerikGridToolBar>
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
		<TelerikGridColumn Field=@nameof(SampleData.Name) Title="Name" />
		<TelerikGridCommandColumn>
			<TelerikGridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Edit" Icon="edit">Edit</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Delete" Icon="delete">Delete</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</TelerikGridCommandButton>
		</TelerikGridCommandColumn>
	</TelerikGridColumns>
</TelerikGrid>

@functions {
	public void EditHandler(GridCommandEventArgs args)
	{
		SampleData item = (SampleData)args.Item;

		//prevent opening for edit based on condition
		if (item.ID < 3)
		{
			args.IsCancelled = true;//the general approach for cancelling an event
		}
		
		Console.WriteLine("Edit event is fired.");
	}

	public void UpdateHandler(GridCommandEventArgs args)
	{
		SampleData item = (SampleData)args.Item;

		//perform actual data source operations here

		//if you have a context added through an @inject statement, you could call its SaveChanges() method
		//myContext.SaveChanges();

		var matchingItem = MyData.FirstOrDefault(c => c.ID == item.ID);
		if (matchingItem != null)
		{
			matchingItem.Name = item.Name;
		}
		
		Console.WriteLine("Update event is fired.");
	}

	public void DeleteHandler(GridCommandEventArgs args)
	{
		SampleData item = (SampleData)args.Item;

		//perform actual data source operation here

		//if you have a context added through an @inject statement, you could call its SaveChanges() method
		//myContext.SaveChanges();

		MyData.Remove(item);
		
		Console.WriteLine("Delete event is fired.");
	}

	public void CreateHandler(GridCommandEventArgs args)
	{
		SampleData item = (SampleData)args.Item;

		//perform actual data source operation here

		//if you have a context added through an @inject statement, you could call its SaveChanges() method
		//myContext.SaveChanges();

		item.ID = MyData.Count;
		MyData.Add(item);
		
		Console.WriteLine("Create event is fired.");
	}

	public void CancelHandler(GridCommandEventArgs args)
	{
		SampleData item = (SampleData)args.Item;

		//if necessary, perform actual data source operation here (like cancel changes on a context)

		//if you have a context added through an @inject statement, you could use something like this to abort changes
		//foreach (var entry in myContext.ChangeTracker.Entries().Where(entry => entry.State == EntityState.Modified))
		//{
		//  entry.State = EntityState.Unchanged;
		//}
		
		Console.WriteLine("Cancel event is fired.");
	}
	

	//in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
	public class SampleData
	{
		public int ID { get; set; }
		public string Name { get; set; }
	}

	public List<SampleData> MyData { get; set; }

	protected override void OnInit()
	{
		MyData = new List<SampleData>();

		for (int i = 0; i < 50; i++)
		{
			MyData.Add(new SampleData()
			{
				ID = i,
				Name = "Name " + i.ToString()
			});
		}
	}
}
````

>caption The result from the code snippet above, after the Edit button was clicked on the third row

![](images/popup-editing.png)

>note It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

## See Also

  * [Live Demo: Grid PopUp Editing](https://demos.telerik.com/blazor-ui/grid/popupediting)
   
  