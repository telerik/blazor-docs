---
title: Overview
page_title: Grid Overview
description: Overview of the Grid for Blazor.
slug: components/grid/overview
tags: telerik,blazor,grid,datagrid,overview
published: True
position: 0
---

# Blazor Grid Component Overview

This article provides a quick introduction so you can get your first <a href="https://www.telerik.com/blazor-ui/grid" target="_blank">Blazor data grid component</a> up and running in a few seconds, a video tutorial, and a list of the key features it provides.

The Telerik Blazor Data Grid provides a comprehensive set of ready-to-use features covering everything from paging, sorting, filtering, editing, and grouping to row virtualization, optimized data reading, keyboard navigation and accessibility support.

The Telerik Blazor grid is built on native Blazor from the ground up, by a company with a long history of making enterprise-ready Grids. This results in a Blazor data grid that delivers lighting fast performance and is highly customizable.

#### To create a basic Telerik Grid:

1. use the `TelerikGrid` tag
1. set its `Data` attribute to the variable that will hold your collection of data
1. under its `GridColumns` tag, set the desired [`GridColumn`]({%slug components/grid/columns/bound%}) instances whose `Field` property points to the name of the model field

>caption Get started with the grid by providing it with a data collection and enabling its key features

````CSHTML
General grid with its most common features

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true" Groupable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

>caption The result from the code snippet above

![Blazor DataGrid Component Example](images/basic-grid.png)

>caption Video tutorial - Get started with Telerik Data Grid for Blazor

<iframe width="560" height="315" src="https://www.youtube.com/embed/NW2hHtmM2Gk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Data Binding

To show data in a grid, you need to define [GridColumn]({%slug components/grid/columns/bound%}) instances - they take a model `Field` and expose settings for [templates]({%slug components/grid/features/templates%}), [grouping](#grouping) and [reordering]({%slug components/grid/columns/reorder%}). To [edit](#editing) data or invoke custom logic, you define a [CommandColumn]({%slug components/grid/columns/command%}).

>tip The Telerik Blazor Grid is data source agnostic - you can use any database and service according to your project, you only need to get the collection of data models to the grid in the view-model of the component hosting it.

The following list of resources provides examples for data binding a grid in various scenarios:

* Basic **example**, tutorial **video** and **notes** - [Grid Data Binding Overview]({%slug components/grid/columns/bound%}). Also lists the features (parameters) of a bound column.

* **Optimizing the data source queries** - see the [Notes]({%slug components/grid/columns/bound%}#notes) section in the article above. In a server-side app, an `IQueriable` that ties to an appropriate context (such as EntityFramework) that can optimize the LINQ queries the grid generates is a quick option. For full control, use the [OnRead event]({%slug components/grid/manual-operations%}).

* **SQL** (or any other) **database** - you can find examples in our [online demos](https://demos.telerik.com/blazor-ui/grid/overview). You can see an offline version of the demos project in the `demos` folder of your installation ([automated]({%slug installation/msi%}) or [archive]({%slug installation/zip%})). They showcase an EntityFramework context using an SQL database that provides data to a grid through a service, which is a common architecture for decouping the front-end from the actual data source that you can apply to any database.

    * The **CRUD sample project** our extensions for [Visual Studio]({%slug getting-started-vs-integration-new-project%}) and [Visual Studio Code]({%slug getting-started-vs-code-integration-overview%}) can generate for you showcases a similar architecture that you can use as a starting point.
    
    * The [Blazing Coffee sample application](https://github.com/telerik/blazor-ui/tree/master/sample-applications/blazing-coffee) shows how to provide data from a SQL (uses SQLite) database to the Grid using Entity Framework Core services.

* **WebAPI** data source - you can see how to send an appropriate request for data and return an optimized query in the following sample projects: [Grid DataSourceRequest on the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server). This is a flexible approach that you can use for any type of service you have - serializing and deserializing the data according to the application logic and needs, and optimizing the database queries on the backend.

* **OData** data source - an extension method we provide lets you make OData v4 queries as shown in the following example: [Grid and OData](https://github.com/telerik/blazor-ui/tree/master/grid/odata).

* **DataTable**, **ExpandoObject** collection - If you don't have actual strongly typed models (yet) and you use `ExpandoObject`, or your backend comes from an older technology and still returns `DataTable`s, the grid can accommodate such dynamic data types. You can get started from our examples on how to bind the grid to a [ExpandoObject collection](https://github.com/telerik/blazor-ui/tree/master/grid/binding-to-expando-object) and to a [DataTable](https://demos.telerik.com/blazor-ui/grid/data-table) which also support [editing](#editing).

* **gRPC** - the gRPC tooling supports .NET Core, and as of mid-June 2020, there is a package that brings it to WebAssembly. You can find a basic example and more resources to get you started with gRPC in Blazor in the [Grid Data from gRPC Sample Project](https://github.com/telerik/blazor-ui/tree/master/common/grpc-example).

* **Foreign Keys** - using foreign tables and keys is usually done through the grid templates. You can read more and find examples in the [Grid - Foreign Key]({%slug grids-foreign-key%}) KnowledgeBase article.


### Loading Animation

When the user performs data operations in the grid, the grid will display a loading sign over itself when it detects a long-running operation (over 600ms). This improves the user experience so they know they have to wait for the action to complete, and also prevents repeated actions.

The operations include paging, filtering, sorting, grouping, expanding groups with load-on-demand; editing, inserting and deleting records.

The grid will not, however, display a loading animation during its initial rendering. It cannot know when or even if data will be provided to it, and having an automatic loading sign appear can either make it show up indefinitely, or it could prevent the user from altering any saved grid state (such as changing filters). If you want a loading animation on the initial load, you can add a [LoaderContainer component]({%slug loadercontainer-overview%}#basic-loadercontainer) with the desired `Visible` logic.

When using the [`OnRead` event]({%slug components/grid/manual-operations%}), the loading sign will display every time its event handler is called, which will include the initial load of data - the grid will raise that request every time.

You can see both scenarios in action in the [Live Demo: Grid Loading Animation](https://demos.telerik.com/blazor-ui/grid/loading-animation).



## Blazor Grid Reference

The grid is a generic component, and to store a reference, you must use the model type that you pass to its `Data` when declaring the variable.

>caption Store a reference to a Telerik Grid

````CSHTML
@using Telerik.Blazor.Components

<TelerikGrid Data="@MyData" @ref="theGridReference">
	<GridColumns>
		<GridColumn Field="@(nameof(SampleData.ID))">
		</GridColumn>
		<GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
		</GridColumn>
	</GridColumns>
</TelerikGrid>

@code {
	Telerik.Blazor.Components.TelerikGrid<SampleData> theGridReference;

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


## Autogenerated Columns

You can autogenerate columns in a Grid for each public property in its model. For more information about this feature you can read the [Autogenerated Columns]({%slug grid-columns-automatically-generated%}) article.

## Editing

The grid can perform CRUD operations on its current data collection and exposes events that let you control the operations and transfer changes to the actual data source. The [CRUD Operations Overview]({%slug components/grid/editing/overview%}) article offers more details on this.

The grid offers several editing modes with different user experience through the `EditMode` property that is a member of the `GridEditMode` enum:

* `Incell` - editing is done [in the current cell]({%slug components/grid/editing/incell%}) with a double click
* `Inline` - editing is done for the [entire row]({%slug components/grid/editing/inline%}) with an [Edit Command Button]({%slug components/grid/columns/command%})
* `Popup` - editing is done in a [popup]({%slug components/grid/editing/popup%}) for the entire row with an [Edit Command Button]({%slug components/grid/columns/command%})


## Paging

The grid supports paging of the data out of the box. You can read more about it in the [Paging]({%slug components/grid/features/paging%}) article. An alternative to standard paging is [Virtual Scrolling]({%slug components/grid/virtual-scrolling%}) that provides a different user experience.

## Sorting

The grid can sort data automatically. You can read more about this feature in the [Sorting]({%slug components/grid/features/sorting%}) article.

## Filtering

The grid can filter data automatically. You can read more about this feature in the [Filtering]({%slug components/grid/filtering%}) article.


## Grouping

The grid can group data automatically. You can read more about this feature in the [Grouping]({%slug components/grid/features/grouping%}) article.

## Column Features

The columns of the Grid are one of its main building blocks and they offer a rich set of functionality to enable immense flexibility for your application scenarios.

>caption Column features include

* [Autogenerated Columns]({%slug grid-columns-automatically-generated%})

* [Freezing columns]({%slug grid-columns-frozen%})

* [Column Menu]({%slug grid-column-menu%})

* [Display Format]({%slug grid-columns-displayformat%})

* [Column Reodering]({%slug components/grid/columns/reorder%})

* [Column Resizing]({%slug components/grid/columns/resize%})

* [UI Virtualization]({%slug grid-columns-virtual%})

* [Visibility]({%slug grid-columns-visible%})

* [Multi-column Headers]({%slug grid-columns-multiple-column-headers%})

* [Events]({%slug grid-column-events%})


## Selection

The grid offers single or multiple selection modes. You can read more about this feature in the [Selection]({%slug components/grid/selection/overview%}) article.

## Toolbar

You can define user actions in a [dedicated toolbar]({%slug components/grid/features/toolbar%}). For the moment, they are mostly custom actions, but in future versions you will be able to add features like exporting there.

## Column Menu

The Grid allows you to setup a menu for it's columns. It enables you to perform high-level customization like [sorting]({%slug components/grid/features/sorting%}), [filtering]({%slug components/grid/filtering%}), [showing or hiding]({%slug grid-columns-visible%}) columns and [freezing or unfreezing]({%slug grid-columns-frozen%}) them. You can read more about this feature in the [column menu]({%slug grid-column-menu%}) article.

## Scrolling

The grid offers two modes of scrolling through its `ScrollMode` parameter that takes a member of the `Telerik.Blazor.GridScrollMode` enum:

* `Scrollable` - the default setting - the scrollbars are controlled by the grid's `Width` and `Height` parameters and the data shown in it. If the rendered rows are taller than the height, there will be a vertical scrollbar. If the sum of the column widths is larger than the width, there will be a horizontal scrollbar (read more in the [Column Width]({%slug grid-columns-width%}) article).
* `Virtual` - this enables [Virtual Scrolling]({%slug components/grid/virtual-scrolling%}).

The Grid offers Virtual horizontal scrolling. You can read more about this feature in the [Column Virtualization]({%slug grid-columns-virtual%}) article.

## Frozen Columns

The grid lets you freeze one or more columns. You can read more about this feature in the [Frozen columns]({%slug grid-columns-frozen%}) article.

## State

The grid provides its current state (such as filtering, sorting, grouping, selection and so on) through methods and events so you can store the grid layout for your end users - this lets them continue where they left off. You can read more about this in the [Grid State]({%slug grid-state%}) article.


## Styling

You can define your own content for column cells or even the entire row through [Templates]({%slug components/grid/features/templates%}).

You can also set the [`Height` of the grid]({%slug common-features/dimensions%}), and you can use the `Class` to provide more complex CSS rules (like ones that will be inherited in a template).

Below, you can see examples on how to [format the cells and the rows of the Grid based on certain conditions](#conditional-formatting) and how to take advantage of the [elastic design](#elastic-design).

### Conditional Formatting

You can format the cells and rows of the Grid based on certain condition in the logic of the application. 

To do so, use the [OnCellRender]({%slug grid-column-events%}#oncellrender) and [OnRowRender]({%slug grid-events%}#onrowrender) events and set the desired CSS class through the event handlers arguments.

>caption Use the OnCellRender and OnRowRender events to customize the formatting of the Grid rows and cells based on conditions.

@[template](/_contentTemplates/grid/common-link.md#conditional-style-row-and-cell-render)

>caption The result from the code snippet above

![conditional formatting of the grid](images/grid-styling-conditional-formatting-example.png)

### Elastic Design

You can benefit from the elastic design the components expose to change their font size so they change dimensions.

>caption Change font size and dimensions of a grid

````CSHTML
The grid offers elastic design capabilities

<style>
    div.smallerFont,
    div.smallerFont .k-filtercell * {
        font-size: 10px;
    }

        div.smallerFont .k-dropdown.k-header.k-dropdown-operator {
            width: calc(8px + 2em) !important;
        }

        /* One example for altering content inside the cells - the inputs in InCell editing mode here 
        You can create similar rules as needed by inspecting the rendered HTML. This blog can help you do that
        https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools
        */
        div.smallerFont .k-grid-edit-cell input{
            font-size: 10px;
        }
</style>

<TelerikGrid Data="@MyData" Class="smallerFont"
             Pageable="true" FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Sortable="true" Height="200px">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.ID))">
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date">
        </GridColumn>
    </GridColumns>
</TelerikGrid>

original:

<TelerikGrid Data="@MyData"
             Pageable="true" FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Sortable="true" Height="200px">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.ID))">
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date">
        </GridColumn>
    </GridColumns>
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

![Blazor Grid Component Reduced Font Size Example](images/grid-reduced-font-size.png)

## See Also

  * [Live Demos: Grid](https://demos.telerik.com/blazor-ui/grid/index)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikGrid-1)
