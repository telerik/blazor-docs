---
title: Refresh Data
page_title: TreeList Refresh Data
description: Refresh TreeList Data using the Rebind method, Observable Data or creating a new Collection reference.
slug: treelist-refresh-data
tags: telerik,blazor,treelist,observable,data,new,collection
published: True
position: 60
components: ["treelist"]
---
# TreeList - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Rebind Method](#rebind-method)
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)


## Rebind Method

@[template](/_contentTemplates/common/rebind-method.md#intro)

````RAZOR
@* Add/remove item and rebind the Treelist to react to that change. *@

<TelerikButton OnClick="@AddRootItem">Add root item at the end of the collection</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove last item</TelerikButton>

<TelerikTreeList @ref="@TreeListRef"
                 Data="@TreeListData"
                 IdField="EmployeeId"
                 ParentIdField="ReportsTo"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="FirstName" Expandable="true" />
        <TreeListColumn Field="EmployeeId" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee> TreeListRef;

    private List<Employee> TreeListData { get; set; }

    private void AddRootItem()
    {
        var i = TreeListData.Count + 1;

        TreeListData.Add(new Employee()
        {
            EmployeeId = i,
            ReportsTo = null,
            FirstName = "Employee  " + i.ToString()
        });

        TreeListRef.Rebind();
    }

    private void RemoveItem()
    {
        if (TreeListData.Count > 0)
        {
            TreeListData.RemoveAt(TreeListData.IndexOf(TreeListData.Last()));
        }

        TreeListRef.Rebind();
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public int? ReportsTo { get; set; }
    }

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();
        var rand = new Random();
        int currentId = 1;

        for (int i = 1; i < 6; i++)
        {
            TreeListData.Add(new Employee()
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
                TreeListData.Add(new Employee()
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

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the TreeList to an ObservableCollection, so it can react to collection changes.

````RAZOR
@* Add/remove item to see how the Treelist reacts to that change. *@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddRootItem">Add root item at the end of the collection</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove last item</TelerikButton>

<TelerikTreeList Data="@TreeListData"
                 IdField="EmployeeId"
                 ParentIdField="ReportsTo"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="FirstName" Expandable="true"/>
        <TreeListColumn Field="EmployeeId"/>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private ObservableCollection<Employee> TreeListData { get; set; }

    private void AddRootItem()
    {
        var i = TreeListData.Count + 1;
        TreeListData.Add(new Employee()
        {
            EmployeeId = i,
            ReportsTo = null,
            FirstName = "Employee  " + i.ToString()
        });
    }

    private void RemoveItem()
    {
        if (TreeListData.Count > 0)
        {
            TreeListData.RemoveAt(TreeListData.IndexOf(TreeListData.Last()));
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
        TreeListData = new ObservableCollection<Employee>();
        var rand = new Random();
        int currentId = 1;

        for (int i = 1; i < 6; i++)
        {
            TreeListData.Add(new Employee()
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
                TreeListData.Add(new Employee()
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

````RAZOR
@* Add/remove item or change the collection to see how the Treelist reacts to that change. *@

<TelerikButton OnClick="@AddRootItem">Add root item at the end of the collection</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove last item</TelerikButton>

<TelerikButton OnClick="@ClearData">Clear Data</TelerikButton>

<TelerikButton OnClick="@LoadNewData">Load new data</TelerikButton>

<TelerikTreeList Data="@TreeListData"
                 IdField="EmployeeId"
                 ParentIdField="ReportsTo"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="FirstName" Expandable="true"/>
        <TreeListColumn Field="EmployeeId"/>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee> TreeListData { get; set; }

    private void AddRootItem()
    {
        var i = TreeListData.Count + 10;
        TreeListData.Add(new Employee()
        {
            EmployeeId = i,
            ReportsTo = null,
            FirstName = "Employee  " + i.ToString()
        });
        TreeListData = new List<Employee>(TreeListData);
    }

    private void RemoveItem()
    {
        if (TreeListData.Count > 0)
        {
            TreeListData.RemoveAt(TreeListData.IndexOf(TreeListData.Last()));
            TreeListData = new List<Employee>(TreeListData);
        }
    }

    private void ClearData()
    {
        TreeListData.Clear();
        TreeListData = new List<Employee>(TreeListData);
    }

    private void LoadNewData()
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

        TreeListData = new List<Employee>(newData);

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
        TreeListData = new List<Employee>();
        var rand = new Random();
        int currentId = 1;

        for (int i = 1; i < 6; i++)
        {
            TreeListData.Add(new Employee()
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
                TreeListData.Add(new Employee()
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

  * [ObservableCollection](slug:common-features-observable-data)
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui)