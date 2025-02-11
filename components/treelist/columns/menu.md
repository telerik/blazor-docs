---
title: Column Menu
page_title: TreeList - Column Menu
description: Use the Column Menu for the TreeList to show a menu that allows you to perform column customization.
slug: treelist-column-menu
tags: telerik,blazor,treelist,column,columns,menu
published: True
position: 20
---

# Column Menu

The TreeList enables you to show a menu with quick actions for its columns. The Column Menu enables you to perform high-level customization like [sorting](slug:treelist-sorting), [filtering](slug:treelist-filtering), [showing or hiding](slug:treelist-columns-visible) columns and [freezing or unfreezing](slug:treelist-columns-frozen) them.

>caption In this article:
* [Basics](#basics)
* [Features](#features)
    * [Column Chooser](#column-chooser)
    * [Filtering](#filtering)
    * [Frozen Columns](#frozen-columns)
    * [Column Sections](#column-sections)
    * [Sorting](#sorting)
    * [Reordering](#reordering)
* [Example](#example)
* [Notes](#notes)

## Basics

To enable the Column Menu, set the `ShowColumnMenu` parameter of the `<TelerikTreeList>` tag to `true`. This will enable the menu for each column of the TreeList.

To disable the Column Menu for a specific column in the TreeList, set the `ShowColumnMenu` parameter of the column to `false`.

>caption Enable the column menu for all TreeList columns.

````RAZOR
@* Set the ShowColumnMenu parameter to true *@

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Pageable="true"
                 Reorderable="true"
                 Sortable="true"
                 Resizable="true"
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 ShowColumnMenu="true">    
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" Width="320px" />
        <TreeListColumn Field="@nameof(Employee.Id)" Lockable="true"/>
        <TreeListColumn Field="@nameof(Employee.ParentId)" ShowColumnMenu="false"/>
        <TreeListColumn Field="@nameof(Employee.HireDate)"/>
        <TreeListColumn Field="@nameof(Employee.Salary)" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee> TreeListData { get; set; }

    private async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
                {
                    Id = i,
                    ParentId = null,
                    Name = $"root: {i}",
                    HireDate = DateTime.Now.AddYears(-i),
                    Salary = 3000 + i * 100
                }); ;

            for (int j = 1; j < 4; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                    {
                        Id = currId,
                        ParentId = i,
                        Name = $"first level child {j} of {i}",
                        HireDate = DateTime.Now.AddDays(-currId),
                        Salary = 2000 + i * 200
                    });

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = currId * 1000 + k;
                    data.Add(new Employee
                        {
                            Id = nestedId,
                            ParentId = currId,
                            Name = $"second level child {k} of {i} and {currId}",
                            HireDate = DateTime.Now.AddMinutes(-nestedId),
                            Salary = 1000 + i * 200
                        }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await GetTreeListData();
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
        public int Salary { get; set; }
    }
}
````

## Features

To control the features of the Column Menu, use the `<TreeListColumnMenuSettings>` tag, nested inside the `<TreeListSettings>` tag. By default, all Column Menu features are enabled.

### Column Chooser

The Column Chooser in the Column Menu allows you to toggle the visibility of TreeList columns. By default, all columns are visible under the **Columns** section of the Column Menu. To expand the menu, click the **Columns** item.

The **Apply** button sets the column visibility according to the current checkbox values and closes the column menu. The **Reset** button reverts the checkbox values to their state when the column menu was opened. At this point, the user can start over, click **Apply**, or click outside the column menu to close it.

* To disable the column chooser, set the `ShowColumnChooser` parameter of the `<TreeLisColumnMenuSettings>` to `false`.
* To hide a column from the Column Chooser, set the `VisibleInColumnChooser` property of the column to `false`.

### Filtering

To control whether filtering is possible from the Column Menu, set the `FilterMode` parameter of the `TreeListColumnMenuSettings` tag to a member of the `ColumnMenuFilterMode` enum:

* `None`—disables the filtering from the Column Menu. This is the recommended option if you use the [`FilterRow` mode](slug:treelist-filter-row).
* `FilterMenu`—enables filtering from a filter menu.

### Frozen Columns

To disable the locking and unlocking of a column from the Column Menu, set the `Lockable` parameter of the column to `false`.

### Sorting

To remove the sorting option from the Column Menu, set the `Sortable` parameter of the `TreeListColumnMenuSettings` tag to `false`.

### Reordering

To allow column reordering from the Column Menu, set the `Reorderable` parameter of the `TreeListColumnMenuSettings` tag to `true`.

### Column Sections

The TreeList Column Menu lets you group the columns in the [Column Chooser](#column-chooser) into different sections:

1. Use the `TreeListColumnMenuChooser` tag (child to the `TreeListColumnMenuSettings`).

1. Add the [Template](slug:treelist-templates-column-chooser) tag.

1. Provide a `TreeListColumnMenuChooserGroup` which is a collection of the columns that will be in the section. To render a title for the section, use the `Title` parameter.

1. Use the `TreeListColumnMenuChooserItem` to denote the columns that belong to the group.

    * You must set the `ColumnId` parameter of the `TreeListColumnMenuChooserItem` to the value of the `Id` parameter of the corresponding TreeList Column.
    
    * If you set the `Title` parameter of the `TreeListColumnMenuChooserItem`, it will override the value of the `Title` parameter of the corresponding TreeList Column. 

## Example 

The example shows the following things: 
* A custom `TreeListColumnChooser`
* How to use the `TreeListColumnMenuSettings` tag to control the features of the Column Menu.
* How to use column parameters to affect the column's relationship with the column menu.

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Pageable="true"
                 Sortable="true"
                 Reorderable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 ShowColumnMenu="true">
    <TreeListSettings>
        <TreeListColumnMenuSettings Lockable="false"
                                    Reorderable="true"
                                    Sortable="true"
                                    FilterMode="@ColumnMenuFilterMode.None">
            <TreeListColumnMenuChooser>
                <Template>
                    <TreeListColumnMenuChooserGroup Title="Personal Information">
                        <TreeListColumnMenuChooserItem ColumnId="first-name-column-id" />
                        <TreeListColumnMenuChooserItem ColumnId="last-name-column-id" />
                    </TreeListColumnMenuChooserGroup>
                    <TreeListColumnMenuChooserGroup Title="Employee Information">
                        <TreeListColumnMenuChooserItem ColumnId="position-column-id" />
                        <TreeListColumnMenuChooserItem ColumnId="hire-date-column-id" />
                    </TreeListColumnMenuChooserGroup>
                </Template>
            </TreeListColumnMenuChooser>
        </TreeListColumnMenuSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Id)" Title="Id" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.FirstName)" Title="First Name" Id="first-name-column-id" />
        <TreeListColumn Field="@nameof(Employee.LastName)" Title="Last Name" Id="last-name-column-id" ShowColumnMenu="false" />
        <TreeListColumn Field="@nameof(Employee.Position)" Id="position-column-id" Reorderable="false" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" Id="hire-date-column-id" Sortable="false"/>
    </TreeListColumns>
</TelerikTreeList>

@code {

    private List<Employee> TreeListData { get; set; }

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();

        for (int i = 1; i <= 9; i++)
        {
            TreeListData.Add(new Employee()
                {
                    Id = i,
                    ParentId = i <= 3 ? null : i % 3 + 1,
                    FirstName = "First " + i,
                    LastName = "Last " + i,
                    Position = i <= 3 ? "Team Lead" : "Software Engineer",
                    HireDate = DateTime.Now.AddDays(-i).Date
                });
        }

        base.OnInitialized();
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## Notes

* Settings applied to a TreeList column take precedence over the settings applied to the Column Menu through the `<TreeListColumnMenuSettings>` tag. For example, if you set `Filterable="false"` to a TreeList column and `Filterable="true"` to a TreeList Column Menu, the filtering functionality will be disabled.

* When using the [Column Chooser Template](slug:treelist-templates-column-chooser) or grouping the columns into [sections](#column-sections), add the `Title` parameter to all TreeList Columns.

## See Also
  * [Live Demo: TreeList Column Menu](https://demos.telerik.com/blazor-ui/treelist/column-menu)
  * [Live Demo: TreeList Custom Column Menu](https://demos.telerik.com/blazor-ui/treelist/custom-column-menu)