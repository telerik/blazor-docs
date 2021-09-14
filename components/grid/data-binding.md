---
title: Data Binding
page_title: Data Binding | Grid for Blazor
description: Data bind the Blazor Grid to any of the supported data sources.
slug: grid-data-binding
tags: telerik,blazor,grid,data,binding,databind,databinding
published: true
position: 10
---

# Grid Data Binding

Telerik Blazor Grid is data source agnostic - you can use any database and service according to your project. You only need to get the collection of data models to the Grid in the view-model of the component hosting it.

## Data Sources and Scenarios

The following list of resources provides examples for data binding a grid in various scenarios:

* Basic **example**, tutorial **video** and **notes** - [Grid Bound Columns Overview]({%slug components/grid/columns/bound%}). Also lists the features (parameters) of a bound column.

* **Optimizing the data source queries** - see the [Notes]({%slug components/grid/columns/bound%}#notes) section in the article above. In a server-side app, an `IQueriable` that ties to an appropriate context (such as EntityFramework) that can optimize the LINQ queries the grid generates is a quick option. For full control, use the [OnRead event]({%slug components/grid/manual-operations%}).

* **SQL** (or any other) **database** - you can find examples in our [online demos](https://demos.telerik.com/blazor-ui/grid/overview). You can see an offline version of the demos project in the `demos` folder of your installation ([automated]({%slug installation/msi%}) or [archive]({%slug installation/zip%})). They showcase an EntityFramework context using an SQL database that provides data to a grid through a service, which is a common architecture for decouping the front-end from the actual data source that you can apply to any database.

    * The **CRUD sample project** our extensions for [Visual Studio]({%slug getting-started-vs-integration-new-project%}) and [Visual Studio Code]({%slug getting-started-vs-code-integration-overview%}) can generate for you showcases a similar architecture that you can use as a starting point.
    
    * The [Blazing Coffee sample application](https://github.com/telerik/blazor-ui/tree/master/sample-applications/blazing-coffee) shows how to provide data from a SQL (uses SQLite) database to the Grid using Entity Framework Core services.

* **WebAPI** data source - you can see how to send an appropriate request for data and return an optimized query in the following sample projects: [Grid DataSourceRequest on the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server). This is a flexible approach that you can use for any type of service you have - serializing and deserializing the data according to the application logic and needs, and optimizing the database queries on the backend.

* **OData** data source - an extension method we provide lets you make OData v4 queries as shown in the following example: [Grid and OData](https://github.com/telerik/blazor-ui/tree/master/grid/odata).

* **DataTable**, **ExpandoObject** collection - If you don't have actual strongly typed models (yet) and you use `ExpandoObject`, or your backend comes from an older technology and still returns `DataTable`s, the grid can accommodate such dynamic data types. You can get started from our examples on how to bind the grid to a [ExpandoObject collection](https://github.com/telerik/blazor-ui/tree/master/grid/binding-to-expando-object) and to a [DataTable](https://demos.telerik.com/blazor-ui/grid/data-table) which also support [editing]({%slug components/grid/overview%}#editing).

* **gRPC** - the gRPC tooling supports .NET Core, and as of mid-June 2020, there is a package that brings it to WebAssembly. You can find a basic example and more resources to get you started with gRPC in Blazor in the [Grid Data from gRPC Sample Project](https://github.com/telerik/blazor-ui/tree/master/common/grpc-example).

* **Foreign Keys** - using foreign tables and keys is usually done through the grid templates. You can read more and find examples in the [Grid - Foreign Key]({%slug grids-foreign-key%}) KnowledgeBase article.

## Binding to Interface

Since version 2.27, the Grid supports binding to a collection of multiple model types that implement the same interface.

Note the usage of [`OnModelInit`]({%slug grid-events%}#onmodelinit) in the example below. The event handler sets the model type to be used for new items in the Grid. One-type model creation is supported out-of-the-box. If you need to support adding instances of different types:

* Use custom **Add** buttons in the [Grid Toolbar]({%slug components/grid/features/toolbar%}), one for each model type.
* In each button click handler, define an `InsertedItem` of the correct type in the [Grid State]({%slug grid-state%}).
* [Put the Grid in Insert mode]({%slug grid-state%}#initiate-editing-or-inserting-of-an-item) with the [SetState method]({%slug grid-state%}#methods).

>caption Data Binding the Grid to an Interface

````CSHTML
<TelerikGrid Data="@GridData"
             FilterMode="GridFilterMode.FilterRow"
             EditMode="GridEditMode.Inline"
             OnUpdate="@UpdateHandler"
             OnDelete="@DeleteHandler"
             OnCreate="@CreateHandler"
             OnModelInit="@(() => new Model1())">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add</GridCommandButton>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field="IntProperty" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public interface IModel
    {
        public int Id { get; set; }
        public int IntProperty { get; set; }
    }

    public class Model1 : IModel
    {
        public int Id { get; set; }
        public int IntProperty { get; set; }
    }

    public class Model2 : IModel
    {
        public int Id { get; set; }
        public int IntProperty { get; set; }
    }

    List<IModel> GridData { get; set; }

    protected override void OnInitialized()
    {
        var data = new List<IModel>();

        data.Add(new Model1()
        {
            Id = 1,
            IntProperty = 1
        });
        data.Add(new Model2()
        {
            Id = 2,
            IntProperty = 2
        });

       GridData = data;
    }

    public void UpdateHandler(GridCommandEventArgs args)
    {
        var model = (IModel)args.Item;

        var matchingItem = GridData.FirstOrDefault(c => c.Id == model.Id);

        if (matchingItem != null)
        {
            matchingItem.IntProperty = model.IntProperty;
        }
    }

    public void DeleteHandler(GridCommandEventArgs args)
    {
        var model = (IModel)args.Item;

        GridData.Remove(model);
    }

    public void CreateHandler(GridCommandEventArgs args)
    {
        var model = (IModel)args.Item;

        model.Id = GridData.Max(d => d.Id) + 1;

        GridData.Insert(0, model);
    }
}
````

>note Up to version 2.26, the `Data` collection of the Grid must contain instances of only one model type.

## See Also

  * [Live Demo: Bind Grid to Observable Data](https://demos.telerik.com/blazor-ui/grid/observable-data)
  * [Live Demo: Bind Grid to DataTable](https://demos.telerik.com/blazor-ui/grid/data-table)
  * [Live Demo: Manual Grid Data Operations](https://demos.telerik.com/blazor-ui/grid/manual-operations)
