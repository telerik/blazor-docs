---
title: Refresh Data
page_title: ListView Refresh Data
description: Refresh ListView Data using Observable Data or creating a new Collection reference.
slug: listview-refresh-data
tags: telerik,blazor,listview,observable,data,new,collection
published: True
position: 53
---

# ListView Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the ListView to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove employee to see how the ListView reacts to that change. *@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddEmployee">Add employee</TelerikButton>

<TelerikButton OnClick="@RemoveEmployee">Remove employee</TelerikButton>

<TelerikListView Data="@ListViewData" Width="700px" Pageable="true">
    <HeaderTemplate>
        <h2>Employee List</h2>
    </HeaderTemplate>
    <Template>
        <div class="listview-item">
            <h4>@context.Name</h4>
            <h5>@context.Team</h5>
        </div>
    </Template>
</TelerikListView>

@code{
    void AddEmployee()
    {
        var x = ListViewData.Count + 1;
        ListViewData.Add(new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3}"
        });
    }

    void RemoveEmployee()
    {
        if (ListViewData.Count > 0)
        {
            ListViewData.RemoveAt(ListViewData.Count - 1);
        }
    }
        
    ObservableCollection<SampleData> ListViewData { get; set; } = new ObservableCollection<SampleData>(Enumerable.Range(1, 5).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}",
        Team = $"Team {x % 3}"
    }));

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}

@* Styles would usually go to to the site stylesheet *@

<style>
    .listview-item {
        height: 150px;
        width: 150px;
        display: inline-block;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    }
</style>
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the ListView data.

````CSHTML
@* Add/remove employee or change the collection to see how the ListView reacts to that change. *@

<TelerikButton OnClick="@AddEmployee">Add employee</TelerikButton>

<TelerikButton OnClick="@RemoveEmployee">Remove employee</TelerikButton>

<TelerikButton OnClick="@ChangeData">Change employee data</TelerikButton>

<TelerikListView Data="@ListViewData" Width="700px" Pageable="true">
    <HeaderTemplate>
        <h2>Employee List</h2>
    </HeaderTemplate>
    <Template>
        <div class="listview-item">
            <h4>@context.Name</h4>
            <h5>@context.Team</h5>
        </div>
    </Template>
</TelerikListView>

@code{
    void AddEmployee()
    {
        var x = ListViewData.Count + 1;
        ListViewData.Add(new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3}"
        });
        ListViewData = new List<SampleData>(ListViewData);
    }

    void RemoveEmployee()
    {
        if (ListViewData.Count > 0)
        {
            ListViewData.RemoveAt(ListViewData.Count - 1);
            ListViewData = new List<SampleData>(ListViewData);
        }
    }

    void ChangeData()
    {
        var newData = Enumerable.Range(6, 5).Select(x => new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3}"
        }).ToList();
        ListViewData = new List<SampleData>(newData);
    }

    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 5).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}",
        Team = $"Team {x % 3}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}

@* Styles would usually go to to the site stylesheet *@

<style>
    .listview-item {
        height: 150px;
        width: 150px;
        display: inline-block;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    }
</style>
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)