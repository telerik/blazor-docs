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
1. under its `TelerikGridColumns` tag, set the desired [`TelerikGridColumn`]({%slug components/grid/columns/bound%}) instances whose `Field` property points to the name of the model field

>caption Get started with a grid by providing it with a data collection

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@MyData" Height="300px"
        Pageable="true" Sortable="true"
        FilterMode="Telerik.Blazor.FilterMode.FilterRow">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@(nameof(SampleData.Id))" />
		<TelerikGridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
		<TelerikGridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
	</TelerikGridColumns>
</TelerikGrid>

@code {
	public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
	{
		Id = x,
		Name = "name " + x,
		HireDate = DateTime.Now.AddDays(-x)
	});

	public class SampleData
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public DateTime HireDate { get; set; }
	}

	//in a real case, consider fetching the data in an appropriate event like OnInitializedAsync
	//also, consider keeping the models in dedicated locations like a shared library
	//this is just an example that is easy to copy and run
}
````

>caption The result from the code snippet above

![](images/basic-grid.png)

>tip You can also use a string for the field name, using the `nameof` operator is not necessary. For example, the ID column can be defined like this: `<TelerikGridColumn Field="Id" />`.

## Reference

The grid is a generic component, and to store a reference, you must use the model type that you pass to its `Data` when declaring the variable.

>caption Store a reference to a Telerik Grid

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@MyData" @ref:suppressField @ref="theGridReference">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@(nameof(SampleData.ID))">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
		</TelerikGridColumn>
	</TelerikGridColumns>
</TelerikGrid>

@code {
	TelerikGrid<SampleData> theGridReference;

	public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
	{
		ID = x,
		Name = "name " + x
	});

	//in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
	public class SampleData
	{
		public int ID { get; set; }
		public string Name { get; set; }
	}
}
````


## Paging

The grid supports paging of the data out of the box. You can read more about it in the [Paging]({%slug components/grid/features/paging%}) article.

## Sorting

The grid can sort data automatically. You can read more about this feature in the [Sorting]({%slug components/grid/features/sorting%}) article.

## Filtering

The grid can filter data automatically. You can read more about thsi feature in the [Filtering]({%slug components/grid/filtering%}) article.

## Grouping

The grid can group data automatically. You can read more about this feature in the [Grouping]({%slug components/grid/features/grouping%}) article.

## Selection

The grid offers single or multiple selection modes. You can read more about this feature in the [Selection]({%slug components/grid/selection/overview%}) article.

## Toolbar

You can define user actions in a [dedicated toolbar]({%slug components/grid/features/toolbar%}). For the moment, they are mostly custom actions, but in future versions you will be able to add features like exporting there.

## Editing

The grid can perfom CRUD operations on its current data collection and exposes events that let you control the operations and transfer changes to the actual data source. The [CRUD Operations Overview]({%slug components/grid/editing/overview%}) article offers more details on this.

The grid offers several editing modes with different user experience through the `EditMode` property that takes a string value which can be one of the following:

* `incell` - editing is done [in the current cell]({%slug components/grid/editing/incell%}) with a double click
* `inline` - editing is done for the [entire row]({%slug components/grid/editing/inline%}) with an [Edit Command Button]({%slug components/grid/columns/command%})
* `popup` - editing is done in a [popup]({%slug components/grid/editing/popup%}) for the entire row with an [Edit Command Button]({%slug components/grid/columns/command%})

## Styling

You can define your own content for column cells or even the entire row through [Templates]({%slug components/grid/features/templates%}).

You can also set the [`Height` of the grid]({%slug common-features/dimensions%}), and you can use the `Class` to provide more complex CSS rules (like ones that will be inherited in a template).

For example, you can benefit from the elastic design the components expose to change their font size so they change dimensions.

>caption Change font size and dimensions of a grid

````CSHTML
@using Telerik.Blazor.Components.Grid

<style>
    div.smallerFont,
    div.smallerFont .k-filtercell * {
        font-size: 10px;
    }

    div.smallerFont .k-dropdown.k-header.k-dropdown-operator {
        width: calc(8px + 2em) !important;
    }
</style>

<TelerikGrid Data="@MyData" Class="smallerFont"
			  Pageable="true" FilterMode="Telerik.Blazor.FilterMode.FilterRow"
			  Sortable="true" Height="200px">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@(nameof(SampleData.ID))">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date">
		</TelerikGridColumn>
	</TelerikGridColumns>
</TelerikGrid>

original:

<TelerikGrid Data="@MyData"
			  Pageable="true" FilterMode="Telerik.Blazor.FilterMode.FilterRow"
			  Sortable="true" Height="200px">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@(nameof(SampleData.ID))">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
		</TelerikGridColumn>
		<TelerikGridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date">
		</TelerikGridColumn>
	</TelerikGridColumns>
</TelerikGrid>

@code {
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

>caption The result from the reduced font size is a reduction in the overall size of the grid elements

![](images/grid-reduced-font-size.png)

## See Also

  * [Live Demos: Grid](https://demos.telerik.com/blazor-ui/grid/index)

