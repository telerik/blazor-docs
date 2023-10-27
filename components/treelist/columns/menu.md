---
title: Column Menu
page_title: TreeList - Column Menu
description: Use the Column Menu for the TreeList
slug: treelist-column-menu
tags: telerik,blazor,treelist,column,columns,menu
published: True
position: 20
---

# Column Menu

The TreeList enables you to show a menu with quick actions for its columns. It enables you to perform high-level customization like [sorting]({%slug treelist-sorting%}), [filtering]({%slug treelist-filtering%}), [showing or hiding]({%slug treelist-columns-visible%}) columns and [freezing or unfreezing]({%slug treelist-columns-frozen%}) them.

>caption In this article:
* [Basics](#basics)
* [Features](#features)
    * [Column Chooser](#column-chooser)
    * [Filtering](#filtering)
    * [Groupable](#groupable)
    * [Frozen Columns](#frozen-columns)
    * [Sections](#sections)
    * [Sorting](#sorting)
    * [Reorderable](#reorderable)
* [Example](#example)
* [Notes](#notes)

## Basics

To enable the Column Menu, set the `ShowColumnMenu` parameter of the `<TelerikTreeList>` tag to `true`. This will enable the menu for each column of the TreeList.

To disable the Column Menu for a specific column in the TreeList, set the `ShowColumnMenu` parameter of the column to `false`.

You can see what the column menu can do and how to control its settings in the [Features](#features) section. By default, all of them are enabled.

>caption Enable the column menu for all TreeList columns.

````CSHTML
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
        <TreeListColumn Field="@nameof(Employee.ParentId)"/>
        <TreeListColumn Field="@nameof(Employee.HireDate)"/>
        <TreeListColumn Field="@nameof(Employee.Salary)" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> TreeListData { get; set; }

    async Task<List<Employee>> GetTreeListData()
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

To control the common features of the `Column Menu` use the `<TreeListColumnMenuSettings>` tag, nested inside the `<TreeListSettings>` tag:

* [Column Chooser](#column-chooser)
* [Filtering](#filtering)
* [Frozen Columns](#frozen-columns)
* [Sections](#sections)
* [Sorting](#sorting)
* [Reorderable](#reorderable)

### Column Chooser

The Column Chooser in the Column Menu allows you to toggle the visibility of TreeLis columns. By default, all columns are visible under the **Columns** section of the Column Menu. To expand the menu, click the **Columns** item.

The **Apply** button sets the column visibility according to the current checkbox values and closes the column menu. The **Reset** button reverts the checkbox values to their state when the column menu was opened. At this point, the user can start over, click **Apply**, or click outside the column menu to close it.

* To disable the column chooser, set the `ShowColumnChooser` parameter of the `<TreeLisColumnMenuSettings>` to `false`.
* To hide a column from the Column Chooser, set the `VisibleInColumnChooser` property of the column to `false`.

### Filtering

To control whether filtering is possible from the Column Menu set the `FilterMode` parameter of the `TreeListColumnMenuSettings` tag to a member of the `ColumnMenuFilterMode` enum:

* `None`—disables the filtering from the Column Menu. This is the recommended option if you use the [`FilterRow` mode]({%slug treelist-filter-row%}).
* `FilterMenu`—enables a filter menu to apply filtering.

### Frozen Columns

To disable the locking and unlocking of a column from the Column Menu, set the `Lockable` parameter of the column to `false`.

### Sorting

To remove the sorting option from the Column Menu, set the `Sortable` parameter of the `TreeListColumnMenuSettings` tag to `false`.

### Reorderable

To allow column reordering from the Column Column, set the `Reorderable` parameter of the `TreeListColumnMenuSettings` tag to `true`.

### Sections

You can organize the columns in the [Column Chooser](#column-chooser) in different sections. To group the columns in different sections:

1. Use the `TreeListColumnMenuChooser` tag (child to the `TreeListColumnMenuSettings`)

1. Add the [Template]({%slug treelist-templates-column-chooser%}) tag

1. Provide `TreeListColumnMenuChooserGroup` which is a collection of the columns that should be in the section
    
    * You can use the `Title` parameter to render a Title for the section

1. Use the `TreeListColumnMenuChooserItem` to denote the columns that should be in the group

    * You must use set the `ColumnId` parameter of the `TreeListColumnMenuChooserItem` to the value of the `Id` parameter of the corresponding TreeList Column.
    
    * If you set the `Title` parameter of the `TreeListColumnMenuChooserItem` it will override the value of the `Title` parameter of the corresponding TreeList Column. 


### Column Menu Configuration Example

The following example shows the basic configuration of the `ColumnMenuSettings`.

The columns in the Column Chooser are divided into sections. The Lockable option is disabled from the Column Menu. Filtering in the Column Menu is disabled, so the TreeList can use a `FilterRow`. The `Id` column has no Column Menu and the `HireDate` column is not visible in Column Chooser.

````CSHTML
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Pageable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 ShowColumnMenu="true">
    <TreeListSettings>
        <TreeListColumnMenuSettings Lockable="false"
                                    FilterMode="@ColumnMenuFilterMode.None">
            <TreeListColumnMenuChooser>
                <Template>
                    <TreeListColumnMenuChooserGroup Title="Personal Information">
                        <TreeListColumnMenuChooserItem ColumnId="firstname-column-id" />
                        <TreeListColumnMenuChooserItem ColumnId="lastname-column-id" />
                    </TreeListColumnMenuChooserGroup>
                    <TreeListColumnMenuChooserGroup Title="Employee Information">
                        <TreeListColumnMenuChooserItem ColumnId="position-column-id" />
                    </TreeListColumnMenuChooserGroup>
                </Template>
            </TreeListColumnMenuChooser>
        </TreeListColumnMenuSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Expandable="true" Field="@nameof(Employee.FirstName)" Title="First Name" Id="firstname-column-id" />
        <TreeListColumn Field="@nameof(Employee.LastName)" Title="Last Name" Id="lastname-column-id" />
        <TreeListColumn Field="@nameof(Employee.Position)" Id="position-column-id" />
    </TreeListColumns>
</TelerikTreeList>

@code {

    List<Employee> TreeListData { get; set; }

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
                    Position = i <= 3 ? "Team Lead" : "Software Engineer"
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
    }
}
````

### Column Menu Features Example

>caption Use the TreeListColumnMenuSettings tag to control the common features of the Column Menu, use column parameters to affect its relationship with the column menu

````CSHTML
@* Disable filtering and locking columns, enable sorting, hide a column from the chooser (Team), disable the menu for a column (Name). *@

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Pageable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 ShowColumnMenu="true">
    <TreeListSettings>
        <TreeListColumnMenuSettings Lockable="false"
                                    Reorderable="true"
                                    Sortable="true"
                                    FilterMode="@ColumnMenuFilterMode.None">
        </TreeListColumnMenuSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Expandable="true" Field="@nameof(Employee.FirstName)" Title="First Name"/>
        <TreeListColumn Field="@nameof(Employee.LastName)" Title="Last Name" ShowColumnMenu="false" />
        <TreeListColumn Field="@nameof(Employee.Position)" VisibleInColumnChooser="false"/>
        <TreeListColumn Field="@nameof(Employee.HireDate)" />
    </TreeListColumns>
</TelerikTreeList>

@code {

    List<Employee> TreeListData { get; set; }

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();

        for (int i = 1; i <= 9; i++)
        {
            TreeListData.Add(new Employee()
                {
                    Id = i,
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

* Applying settings to a TreeList column like `Filterable="false"`, `Sortable="false"`, `Lockable="false"` will take precedence over the common settings applied in the `<TreeListColumnMenuSettings>` and disable the above-mentioned functionalities for the corresponding column.

* If you are using the [Column Chooser Template]({%slug treelist-templates-column-chooser%}) or you are grouping the columns into [sections](#sections), it is recommended to add the `Title` parameter to all TreeList Columns.

## See Also
  * [Live Demo: TreeList Column Menu](https://demos.telerik.com/blazor-ui/treelist/column-menu)
  * [Live Demo: TreeList Custom Column Menu](https://demos.telerik.com/blazor-ui/treelist/custom-column-menu)