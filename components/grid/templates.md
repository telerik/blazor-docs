---
title: Templates
page_title: Grid for Blazor | Templates
description: Use custom templates in Grid for Blazor
slug: components/grid/features/templates
tags: telerik,blazor,grid,templates
published: True
position: 35
---

# Grid Templates

The Grid component can use templates for: 
* [columns (cells)](#column-template)
* [rows](#row-template)
* [editing of a field](#edit-template)

Like other Blazor content, they can receive a `context` argument that is the type of the model. To use templates, you must bind the grid to a named model.

You must make sure to provide valid HTML in the templates.

You can also use templates to [bind to navigation properties in complex objects]({%slug grid-use-navigation-properties%}).

## Column Template

By default, the grid renders the value of the field in the column, as it is provided from the data source. You can change this behavior by using the `Template` of the column and add your own content and/or logic to make a string out of the object.

The example below shows how to:

* set the `Template` (make sure to use the capital `T`, at the time of writing the Visual Studio autocomplete tends to use the lowercase `t` which breaks the template logic and does not allow you to access the context)
* access the `context` of the model item so you can employ your own logic
* set HTML in the column
* use inline or multi-line template
* take the field name from the model

>caption Using cell (column) template

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@MyData" Height="500px">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@(nameof(SampleData.ID))" Title="Photo">
			<Template>
				@{
					var employee = context as SampleData;
					<img class="rounded" src="@($"/images/{employee.ID}.jpg")" alt="employee photo" />
				}
			</Template>
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
			<Template>
				Employee name is:
				<br />
				@((context as SampleData).Name)
			</Template>
		</TelerikGridColumn>
		<TelerikGridColumn Field="HireDate" Title="Hire Date - Default string">
		</TelerikGridColumn>
		<TelerikGridColumn Field="HireDate" Title="Hire Date - Custom string">
			<Template>
				@((context as SampleData).HireDate.ToString("dd MMM yyyy"))
			</Template>
		</TelerikGridColumn>
	</TelerikGridColumns>
</TelerikGrid>

@code {
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

>caption The result from the code snippet above

![](images/cell-template.png)

## Row Template

The row template allows you to define in your own code the entire contents of the `<tr>` element the grid will render for each record. To set it, provide contents to the `<RowTemplate>` inner tag of the grid.

It can be convenient if you want to use templates for most or all of the columns, as it requires less markup than setting individual templates for many columns.

The contents of the row template must be `<td>` elements and their number (or total `colspan`) must match the number of columns defined in the grid.

You can use the `Context` attribute of the `<RowTemplate>` tag of the grid to set the name of the context variable. Its type is the model type to which the grid is bound.

>caption Using a row template

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data=@MyData Height="500px">
	<RowTemplate Context="employee">
		<td>
			<img class="rounded-circle" src="@($"/images/{employee.ID}.jpg")" alt="employee photo" />
			<strong>@employee.Name</strong>
		</td>
		<td>
			Hired on: @(String.Format("{0:dd MMM yyyy}", employee.HireDate))
		</td>
	</RowTemplate>
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
		<TelerikGridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
	</TelerikGridColumns>
</TelerikGrid>

@code {
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

>caption The result from the code snippet above

![](images/row-template.png)

## Edit Template

The column's `EditTemplate` defines the inline template or component that will be rendered when the user is [editing]({%slug components/grid/overview%}#editing) the field.

You can data bind components in it to the current context, which is an instance of the model the grid is bound to. You will need a global variable that is also an instance of the model to store those changes.

If you need to perform logic more complex than simple data binding, use the change event of the custom editor component to perform it. You can also consider using a [custom edit form](https://demos.telerik.com/blazor-ui/grid/editing-custom-form).

>caption Sample edit template

````CSHTML
@using Telerik.Blazor.Components.Grid
@using Telerik.Blazor.Components.DropDownList

<TelerikGrid Data=@MyData EditMode="inline" Pageable="true" Height="500px">
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(SampleData.ID) Title="ID" />
		<TelerikGridColumn Field=@nameof(SampleData.Name) Title="Name" />
		<TelerikGridColumn Field=@nameof(SampleData.Role) Title="Position">
			<EditorTemplate>
				@{
					CurrentlyEditedEmployee = context as SampleData;
					<TelerikDropDownList Data="@Roles" @bind-Value="CurrentlyEditedEmployee.Role" Width="120px" PopupHeight="auto"></TelerikDropDownList>
				}
			</EditorTemplate>
		</TelerikGridColumn>
		<TelerikGridCommandColumn>
			<TelerikGridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Edit" Icon="edit">Edit</TelerikGridCommandButton>
		</TelerikGridCommandColumn>
	</TelerikGridColumns>
	<TelerikGridEvents>
		<EventsManager OnUpdate="@UpdateHandler"></EventsManager>
	</TelerikGridEvents>
</TelerikGrid>

@code {
	public SampleData CurrentlyEditedEmployee { get; set; }

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
			matchingItem.Role = item.Role;
		}
	}

	protected override void OnInitialized()
	{
		MyData = new List<SampleData>();

		for (int i = 0; i < 50; i++)
		{
			MyData.Add(new SampleData()
			{
				ID = i,
				Name = "name " + i,
				Role = Roles[i % Roles.Count]
			});
		}
	}

	//in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
	public class SampleData
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Role { get; set; }
	}

	public List<SampleData> MyData { get; set; }

	public static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };
}
````

>caption The result from the code snippet above, after Edit was clicked on the first row and the user expanded the dropdown from the template

![](images/edit-template.png)

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/customeditor)

