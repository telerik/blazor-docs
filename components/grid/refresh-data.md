---
title: Refresh Data
page_title: Grid Refresh Data
description: Refresh Grid Data using Observable Data or creating a new Collection reference.
slug: grid-refresh-data
tags: telerik,blazor,grid,observable,data,new,collection
published: True
position: 53
---

# Grid - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)
- [Call OnRead](#call-onread)
- [Entity Framework Data](#entity-framework-data)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the Grid to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove employee to see how the Grid reacts to that change. *@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddEmployee">Add employee</TelerikButton>

<TelerikButton OnClick="@RemoveEmployee">Remove last employee</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    void AddEmployee()
    {
        var x = MyData.Count + 1;
        MyData.Add(new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        });
    }

    void RemoveEmployee()
    {
        if (MyData.Count>0)
        {
        MyData.RemoveAt(MyData.Count - 1);
        }
    } 

    public ObservableCollection<SampleData> MyData = new ObservableCollection<SampleData>(Enumerable.Range(1, 5).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }));

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

>note If you are using the [OnRead event to implement the data operations manually](manual-operations), you must not use the `.Add()`, `.Remove()` or `.Clear()` method of an observable collection - the grid monitors that collection and it fires the `OnRead` event when it changes, so calling those methods will result in an infinte loop. Either create a new collection, or use a simple List, or do not use OnRead with observable data.

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Grid data.

````CSHTML
@* Add/remove employee to see how the Grid reacts to that change. *@

<TelerikButton OnClick="@AddEmployee">Add employee</TelerikButton>

<TelerikButton OnClick="@RemoveEmployee">Remove last employee</TelerikButton>

<TelerikButton OnClick="@LoadNewData">Load new data</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    void AddEmployee()
    {
        var x = MyData.Count + 1;
        MyData.Add(new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        });
        MyData = new List<SampleData>(MyData);
    }

    void RemoveEmployee()
    {
        if (MyData.Count > 0)
        {
            MyData.RemoveAt(MyData.Count - 1);
            MyData = new List<SampleData>(MyData);
        }
    }

    void LoadNewData()
    {
        var newData = Enumerable.Range(6, 5).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        }).ToList();

        MyData = new List<SampleData>(newData);

        Console.WriteLine("New data collection loaded.");
    }

    public List<SampleData> MyData = Enumerable.Range(1, 5).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

>note You can find some more explanations and examples for the Grid component in the [Force a Grid to Refresh]({%slug grid-force-refresh%}) Knowledge Base article.


## Call OnRead

If you are [using the `OnRead` event to optimize the data requests]({%slug components/grid/manual-operations%}), you may want to call that to fetch fresh data from the server. The grid does that automatically after the [edit operations]({%slug components/grid/editing/overview%}), yet you may need to do it on your own.

For cases when directly modifying the data collection with the new information as described above is not possible, you have two options:

* Make the grid call `OnRead` on its own by calling its [`SetState` method]({%slug grid-state%})

* [Cache the `DataSourceRequest` object from the grid]({%slug components/grid/manual-operations%}#cache-data-request), extract the data retrieval logic into your own method, and call that method when needed.

>caption Make the grid call OnRead by using its state

````CSHTML
@using Telerik.DataSource.Extensions

<TelerikButton OnClick="@RefreshThroughState">Make grid request fresh data and call OnRead</TelerikButton>
<br />Monitor the <code>GeneratedAtMilliseconds</code> column values when you click the button

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems 
             @ref="@GridRef"
             AutoGenerateColumns="true"
             FilterMode=@GridFilterMode.FilterRow Sortable="true" Pageable="true">
</TelerikGrid>

@code {
    //make the grid call OnRead to request data again
    TelerikGrid<Employee> GridRef { get; set; }
    async Task RefreshThroughState()
    {
        await GridRef.SetState(GridRef.GetState());
    }

    //basic data generation follows
    public List<Employee> SourceData { get; set; }
    public List<Employee> GridData { get; set; }
    public int Total { get; set; } = 0;

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        Console.WriteLine($"Fresh data requested at {DateTime.Now}");

        // this is the standard data retrieval. Replace with your actual service
        // see more at https://docs.telerik.com/blazor-ui/components/grid/manual-operations

        // here we will just generate the data again to clearly showcase the grid got new data
        SourceData = GenerateData();

        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        GridData = (datasourceResult.Data as IEnumerable<Employee>).ToList();
        Total = datasourceResult.Total;

        StateHasChanged();
    }

    //This sample implements only reading of the data. To add the rest of the CRUD operations see
    //https://docs.telerik.com/blazor-ui/components/grid/editing/overview

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            result.Add(new Employee()
            {
                GeneratedAtMilliseconds = DateTime.Now.Millisecond,
                ID = i,
                Name = "Name " + i,
                HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20))
            });
        }

        return result;
    }

    public class Employee
    {
        public int GeneratedAtMilliseconds { get; set; }
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## Entity Framework Data

When you use EF contexts to update your data, you may update or insert an item through the entity, but you may not see it updated in the grid. Code similar to the following may cause such behavior:

>caption Updating an entity alone may not update the data in the grid

````CSHTML
async Task UpdateHandler(GridCommandEventArgs args)
{
    using var dbContext = contextFactory.CreateDbContext();
    MyModel item = (MyModel)args.Item;
    var original = await dbContext.MyTable.FindAsync(item.Id);
    dbContext.Entry(original).CurrentValues.SetValues(item);
    await dbContext.SaveChangesAsync();
}
````

The reason for such behavior is that the `Data` collection of the grid is a separate in-memory copy of the database data, and the context will update only the database, not all in-memory copies.

This means that you need to ensure that the view-model will be updated as well, so that the `Data` parameter of the grid changes too. There are, generally, two ways to do this:

* Use the [`OnRead` event to perform the grid data operations]({%slug components/grid/manual-operations%}) - the grid will call it after the [CUD events like `OnUpdate`, `OnDelete`, `OnCreate`]({%slug components/grid/editing/overview%}#notes) and it will let you query the database that was already update (which will also bring in other updates that other uses may have made).

* Update the local view-model data yourself with the information the grid event gives you (e.g., insert the new item in it, or remove a deleted item, or update the fields of an edited item). You can find similar code used in the [Grid - Inline Editing Live Demo](https://demos.telerik.com/blazor-ui/grid/editing-inline).

    * It is important to ensure the change happens on the object the grid uses. Methods like `.FirstOrDefault()` may return a new reference and thus changing them may not trigger are UI update.


## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
  * [Knowledge Base: Force a Grid to Refresh]({%slug grid-force-refresh%})
