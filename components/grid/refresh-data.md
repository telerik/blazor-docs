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

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
  * [Knowledge Base: Force a Grid to Refresh]({%slug grid-force-refresh%})
