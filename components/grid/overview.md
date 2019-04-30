---
title: Overview
page_title: Grid for Blazor Overview
description: Overview of the Grid for Blazor
slug: components/grid/overview
tags: telerik,blazor,grid,overview
published: True
position: 0
---

# Grid Overview

This article provides basic information about the Grid component.

To create a basic Telerik Grid:

1. use the `TelerikGrid` tag
1. set its `Data` attribute to the variable that will hold your collection of data
1. under its `TelerikGridColumns` tag, set the desired [`TelerikGridColumn`]({%slug components/grid/columns/bound%}) instances whose `Field` property points to the name of the model

>caption Basic example of binding a grid to some data

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@MyData">
	<TelerikGridColumns>
		<TelerikGridColumn Field="ID"></TelerikGridColumn>
		<TelerikGridColumn Field="TheName" Title="Employee Name"></TelerikGridColumn>
	</TelerikGridColumns>
</TelerikGrid>

@functions {
	public IEnumerable<object> MyData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
````

>caption The result from the code snippet above

![](images/basic-grid.png)

>tip In a real case, you will probably be binding the grid to an actual model. You can use the `nameof` C# operator to provide the names of the fields to the `Field` property of the column.

>caption Example of populating the `Field` from the model name to ensure type-safety:

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@MyData">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@(nameof(SampleData.ID))">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date">
		</TelerikGridColumn>
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

	public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
	{
		ID = x,
		Name = "name " + x,
		HireDate = DateTime.Now.AddDays(-x)
	});
}
````

## Reference

The grid is a generic component, and to store a reference, you must use the model type that you pass to its `Data` when declaring the variable.

>caption Store a reference to a Telerik Grid

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@MyData" ref="theGridReference">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@(nameof(SampleData.ID))">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
		</TelerikGridColumn>
	</TelerikGridColumns>
</TelerikGrid>

@functions {
    TelerikGrid<SampleData> theGridReference;

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


## Paging

The grid supports paging of the data out of the box. You can read more about it in the [Paging]({%slug components/grid/features/paging%}) article.

## Sorting

The grid can sort data automatically. You can read more about this feature in the [Sorting]({%slug components/grid/features/sorting%}) article.

## Styling

You can define your own content for column cells or even the entire row through [Templates]({%slug components/grid/features/templates%}).

You can also set the `Height` of the grid in pixels, and you can use the `Class` to provide more complex CSS rules (like ones that will be inherited in a template).

## Toolbar

You can define user actions in a [dedicated toolbar]({%slug components/grid/features/toolbar%}). For the moment, they are mostly custom actions, but in future versions you will be able to add features like exporting there.

## Editing

The grid can perfom CRUD operations on its current data collection and exposes events that let you control the operations and transfer changes to the actual data source. The [CRUD Operations Overview]({%slug components/grid/editing/overview%}) article offers more details on this.

The grid offers several editing modes with different user experience through the `EditMode` property that takes a string value which can be one of the following:

* `incell` - editing is done [in the current cell]({%slug components/grid/editing/incell%}) with a double click
* `inline` - editing is done for the [entire row]({%slug components/grid/editing/inline%}) with an [Edit Command Button]({%slug components/grid/columns/command%})
* `popup` - editing is done in a [popup]({%slug components/grid/editing/popup%}) for the entire row with an [Edit Command Button]({%slug components/grid/columns/command%})

## See Also

  * [Live Demos: Grid](https://demos.telerik.com/blazor/grid/index)

