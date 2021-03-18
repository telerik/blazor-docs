---
title: Refresh Data
page_title: TreeList Refresh Data
description: Refresh TreeList Data using Observable Data or creating a new Collection reference.
slug: treelist-refresh-data
tags: telerik,blazor,treelist,observable,data,new,collection
published: True
position: 60
---

# TreeList - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the TreeList to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove item to see how the Treelist reacts to that change.*@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddRootItem">Add root item at the end of the collection</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove last item</TelerikButton>

<br />

<TelerikTreeList Data="@Data"
                 IdField="EmployeeId"
                 ParentIdField="ReportsTo"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="FirstName" Expandable="true"></TreeListColumn>
        <TreeListColumn Field="EmployeeId"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public ObservableCollection<Employee> Data { get; set; }

    void AddRootItem()
    {
        var i = Data.Count + 1;
        Data.Add(new Employee()
        {
            EmployeeId = i,
            ReportsTo = null,
            FirstName = "Employee  " + i.ToString()
        });
    }

    void RemoveItem()
    {
        if (Data.Count > 0)
        {
            Data.RemoveAt(Data.IndexOf(Data.Last()));
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public int? ReportsTo { get; set; }
    }

    protected override void OnInitialized()
    {
        Data = new ObservableCollection<Employee>();
        var rand = new Random();
        int currentId = 1;

        for (int i = 1; i < 6; i++)
        {
            Data.Add(new Employee()
            {
                EmployeeId = currentId,
                ReportsTo = null,
                FirstName = "Employee  " + i.ToString()
            });

            currentId++;
        }
        for (int i = 1; i < 6; i++)
        {
            for (int j = 0; j < 5; j++)
            {
                Data.Add(new Employee()
                {
                    EmployeeId = currentId,
                    ReportsTo = i,
                    FirstName = "    Employee " + i + " : " + j.ToString()
                });

                currentId++;
            }
        }
    }
}
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the TreeList data.

````CSHTML
@* Add/remove item or change the collection to see how the Treelist reacts to that change. *@

<TelerikButton OnClick="@AddRootItem">Add root item at the end of the collection</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove last item</TelerikButton>

<TelerikButton OnClick="@ClearData">Clear Data</TelerikButton>

<TelerikButton OnClick="@LoadNewData">Load new data</TelerikButton>

<br />

<TelerikTreeList Data="@Data"
                 IdField="EmployeeId"
                 ParentIdField="ReportsTo"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="FirstName" Expandable="true"></TreeListColumn>
        <TreeListColumn Field="EmployeeId"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    void AddRootItem()
    {
        var i = Data.Count + 10;
        Data.Add(new Employee()
        {
            EmployeeId = i,
            ReportsTo = null,
            FirstName = "Employee  " + i.ToString()
        });
        Data = new List<Employee>(Data);
    }

    void RemoveItem()
    {
        if (Data.Count > 0)
        {
            Data.RemoveAt(Data.IndexOf(Data.Last()));
            Data = new List<Employee>(Data);
        }
    }

    void ClearData()
    {
        Data.Clear();
        Data = new List<Employee>(Data);
    }

    void LoadNewData()
    {
        var newData = new List<Employee>();
        var rand = new Random();
        int currentId = 6;

        for (int i = 6; i < 11; i++)
        {
            newData.Add(new Employee()
            {
                EmployeeId = currentId,
                ReportsTo = null,
                FirstName = "Employee  " + i.ToString()
            });

            currentId++;
        }
        for (int i = 6; i < 11; i++)
        {
            for (int j = 12; j < 16; j++)
            {
                newData.Add(new Employee()
                {
                    EmployeeId = currentId,
                    ReportsTo = i,
                    FirstName = "    Employee " + i + " : " + j.ToString()
                });

                currentId++;
            }
        }

        Data = new List<Employee>(newData);

        Console.WriteLine("New data collection loaded.");
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public int? ReportsTo { get; set; }
    }

    protected override void OnInitialized()
    {
        Data = new List<Employee>();
        var rand = new Random();
        int currentId = 1;

        for (int i = 1; i < 6; i++)
        {
            Data.Add(new Employee()
            {
                EmployeeId = currentId,
                ReportsTo = null,
                FirstName = "Employee  " + i.ToString()
            });

            currentId++;
        }
        for (int i = 1; i < 6; i++)
        {
            for (int j = 0; j < 5; j++)
            {
                Data.Add(new Employee()
                {
                    EmployeeId = currentId,
                    ReportsTo = i,
                    FirstName = "    Employee " + i + " : " + j.ToString()
                });

                currentId++;
            }
        }
    }
}
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)