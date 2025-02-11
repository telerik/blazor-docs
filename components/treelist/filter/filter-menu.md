---
title: Filter Menu
page_title: TreeList - Filter Menu
description: Enable and configure Filter Menu in TreeList for Blazor.
slug: treelist-filter-menu
tags: telerik,blazor,TreeList,filtering,filter,menu
published: True
position: 10
---

# TreeList Filter Menu

One of the [filter modes of the treelist](slug:treelist-filtering) is a popup menu with filter options that you can open from the column headers.

In this article:

* [Basics](#basics)
* [Filter From Code](#filter-from-code)
* [Customization](#customization)

## Basics

To enable the filter menu, set the `FilterMode` property of the grid to `Telerik.Blazor.TreeListFilterMode.FilterMenu`.

The treelist will render a button in the column header that you click to get a popup with filtering options. The popup lets you choose filter operator, filter criteria, to apply and clear the filter.

A key difference in the behavior from the [filter row](slug:treelist-filter-row) is that the filter is now applied only upon a button click, not upon input change. This may improve performance with large data sets.

>caption Filter Menu in Telerik TreeList

````RAZOR
@* Filter menu in the column header *@

<TelerikTreeList Data="@Data" FilterMode="@TreeListFilterMode.FilterMenu"
                 Pageable="true" IdField="Id" ParentIdField="ParentId" Width="650px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px"></TreeListColumn>
        <TreeListColumn Field="Id"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample models and data generation

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null,
                Name = $"root: {i}"
            });

            for (int j = 2; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child of {i}"
                });

                for (int k = 3; k < 5; k++)
                {
                    data.Add(new Employee
                    {
                        Id = currId * 1000 + k,
                        ParentId = currId,
                        Name = $"second level child {k} of {i} and {currId}"
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

>caption The result from the code snippet above, after the "Name" column has been filtered with "does not contain" "1" operator.

![Blazor TreeList Filter Menu](images/filter-menu.png)


## Filter From Code

You can set the TreeList filters from your code through the component [state](slug:treelist-state).

@[template](/_contentTemplates/treelist/state.md#initial-state)

>caption Set filtering programmatically

````RAZOR
@[template](/_contentTemplates/treelist/state.md#filter-menu-from-code)
````

## Customization

The TreeList allows you to customize the default behavior of the Filter Row in a couple ways:

### Configuring the Filter Menu

You can override the default Filter Row behavior for each column through the following property the `TreeListColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-menu-customization-properties)

>caption Configure the Filter Menu

````RAZOR
@*Customize the Filter Menu*@

@using Telerik.DataSource

<TelerikTreeList Data="@Data"
                 IdField="Id"
                 ParentIdField="ParentId"
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 Pageable="true" Width="850px" Height="400px">
    <TreeListColumns>
        <TreeListColumn DefaultFilterOperator="FilterOperator.StartsWith"
                        Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn DefaultFilterOperator="FilterOperator.IsEqualTo"
                        Field="Id" Width="120px" />
        <TreeListColumn DefaultFilterOperator="FilterOperator.IsEqualTo"
                        Field="ParentId" Width="120px" />
        <TreeListColumn DefaultFilterOperator="FilterOperator.Contains"
                        Field="EmailAddress" Width="120px" />
        <TreeListColumn DefaultFilterOperator="FilterOperator.IsGreaterThanOrEqualTo"
                        Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample model

    public class Employee
    {
        // denote the parent-child relationship between items
        public int Id { get; set; }
        public int? ParentId { get; set; }

        // custom data fields for display
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
                {
                    Id = i,
                    ParentId = null, // indicates a root-level item
                    Name = $"root: {i}",
                    EmailAddress = $"{i}@example.com",
                    HireDate = DateTime.Now.AddYears(-i)
                }); ;

            for (int j = 1; j < 4; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                    {
                        Id = currId,
                        ParentId = i,
                        Name = $"first level child {j} of {i}",
                        EmailAddress = $"{currId}@example.com",
                        HireDate = DateTime.Now.AddDays(-currId)
                    });
            }
        }

        return await Task.FromResult(data);
    }
}
````

### Filter Menu Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter Row Template](slug:grid-templates-filter#filter-menu-template) article.


## See Also

  * [Treelist Filtering Overview](slug:treelist-filtering)
  * [Live Demo: TreeList Filter Menu](https://demos.telerik.com/blazor-ui/treelist/filter-menu)
