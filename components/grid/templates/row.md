---
title: Row
page_title: Grid - Row Template
description: Use custom row templates in Grid for Blazor.
slug: grid-templates-row
tags: telerik,blazor,grid,templates,row
published: True
position: 10
---

# Row Template

The row template allows you to define in your own code the entire contents of the `<tr>` element the grid will render for each record. To set it, provide contents to the `<RowTemplate>` inner tag of the grid.

It can be convenient if you want to use templates for most or all of the columns, as it requires less markup than setting individual templates for many columns.

The contents of the row template must be `<td>` elements and their number (or total `colspan`) must match the number of columns defined in the grid.

You can use the `Context` attribute of the `<RowTemplate>` tag of the grid to set the name of the context variable. Its type is the model type to which the grid is bound.

>important Using the row template takes functionality away from the grid because it no longer controls its own rendering. For example, InCell and Inline editing could not render editors, detail templates will not be available, column resizing, locking and reordering cannot change the data cells anymore, only the headers, and row selection must be implemented by the app ([example](https://feedback.telerik.com/blazor/1463819)).

>caption Using a row template

````CSHTML
Render the entire row with your own code and logic

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
	<GridColumns>
		<GridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
		<GridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
	</GridColumns>
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


## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/customeditor)

