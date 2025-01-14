---
title: Column Menu
page_title: Grid - Column Menu
description: Use the Column Menu for the Grid
slug: grid-column-menu
tags: telerik,blazor,grid,column,columns,menu
published: True
position: 20
---

# Column Menu

The Grid allows you to set up a menu for its columns. It enables you to perform high-level customization like [sorting](slug://components/grid/features/sorting), [filtering](slug://components/grid/filtering), [showing or hiding](slug://grid-columns-visible) columns and [freezing or unfreezing](slug://grid-columns-frozen) them.

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
* [Column Menu Configuration Example](#column-menu-configuration-example)
* [Column Menu Features Example](#column-menu-features-example)
* [Notes](#notes)

## Basics

To enable the Column Menu, set the `ShowColumnMenu` parameter of the `<TelerikGrid>` tag to `true`. This will enable the menu for each column of the Grid.

To disable the Column Menu for a specific column in the Grid, set the `ShowColumnMenu` parameter of the column to `false`.

You can see what the column menu can do and how to control its settings in the [Features](#features) section. By default, all of them are enabled.

>caption Enable the column menu for all Grid columns.

````RAZOR
@* Set the ShowColumnMenu parameter to true *@

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="5"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true"
             ShowColumnMenu="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private IEnumerable<SampleData> GridData = Enumerable.Range(1, 30).Select(x => new SampleData
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

## Features

To control the common features of the `Column Menu` use the `<GridColumnMenuSettings>` tag, nested inside the `<GridSettings>` tag:

* [Column Chooser](#column-chooser)
* [Filtering](#filtering)
* [Groupable](#groupable)
* [Frozen Columns](#frozen-columns)
* [Sections](#sections)
* [Sorting](#sorting)
* [Reorderable](#reorderable)

### Column Chooser

The Column Chooser in the Column Menu allows you to toggle the visibility of Grid columns. By default, all columns are visible under the **Columns** section of the Column Menu. To expand the menu, click the **Columns** item.

The **Apply** button sets the column visibility according to the current checkbox values and closes the column menu. The **Reset** button reverts the checkbox values to their state when the column menu was opened. At this point, the user can start over, click **Apply**, or click outside the column menu to close it.

* To disable the column chooser, set the `ShowColumnChooser` parameter of the `<GridColumnMenuSettings>` to `false`.
* To hide a column from the Column Chooser, set the `VisibleInColumnChooser` property of the column to `false`.

### Filtering

To control whether filtering is possible from the Column Menu set the `FilterMode` parameter of the `GridColumnMenuSettings` tag to a member of the `ColumnMenuFilterMode` enum:

* `None`—disables the filtering from the Column Menu. This is the recommended option if you use the [`FilterRow` mode](slug://grid-filter-row).
* `FilterMenu`—enables a filter menu to apply filtering.

### Groupable

To group the Grid from the Column Menu, set the `Groupable` parameter of the `GridColumnMenuSettings` tag to `true`. This feature will group the component by the column you have opened the Column Menu from.

### Frozen Columns

To disable the locking and unlocking of a column from the Column Menu, set the `Lockable` parameter of the column to `false`.

### Sorting

To remove the sorting option from the Column Menu, set the `Sortable` parameter of the `GridColumnMenuSettings` tag to `false`.

### Reorderable

To allow column reordering from the Column Column, set the `Reorderable` parameter of the `GridColumnMenuSettings` tag to `true`.

### Sections

You can organize the columns in the [Column Chooser](#column-chooser) in different sections. To group the columns in different sections:

1. Use the `GridColumnMenuChooser` tag (child to the `GridColumnMenuSettings`)

1. Add the [Template](slug://grid-templates-column-chooser) tag

1. Provide `GridColumnMenuChooserGroup` which is a collection of the columns that should be in the section
    
    * You can use the `Title` parameter to render a Title for the section

1. Use the `GridColumnMenuChooserItem` to denote the columns that should be in the group

    * You must use set the `ColumnId` parameter of the `GridColumnMenuChooserItem` to the value of the [`Id`](slug://components/grid/columns/bound#grid-bound-column-parameters) parameter of the corresponding Grid Column.
    
    * If you set the `Title` parameter of the `GridColumnMenuChooserItem` it will override the value of the `Title` parameter of the corresponding Grid Column. 


### Column Menu Configuration Example

The following example shows the basic configuration of the `ColumnMenuSettings`.

The columns in the Column Chooser are divided into sections. The Lockable option is disabled from the Column Menu. Filtering in the Column Menu is disabled, so the Grid can use a `FilterRow`. The `Id` column has no Column Menu and the `HireDate` column is not visible in Column Chooser.

````RAZOR
<TelerikGrid Data="@GridData"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true"
             ShowColumnMenu="true">
    <GridSettings>
        <GridColumnMenuSettings Lockable="false"
                                FilterMode="@ColumnMenuFilterMode.None">
            <GridColumnMenuChooser>
                <Template>
                    <GridColumnMenuChooserGroup Title="Personal Information">
                        <GridColumnMenuChooserItem ColumnId="firstname-column-id" />
                        <GridColumnMenuChooserItem ColumnId="lastname-column-id" />
                    </GridColumnMenuChooserGroup>
                    <GridColumnMenuChooserGroup Title="Employee Information">
                        <GridColumnMenuChooserItem ColumnId="companyname-column-id" />
                        <GridColumnMenuChooserItem ColumnId="team-column-id" />
                    </GridColumnMenuChooserGroup>
                </Template>
            </GridColumnMenuChooser>
        </GridColumnMenuSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" ShowColumnMenu="false" />
        <GridColumn Field="@(nameof(SampleData.FirstName))" Title="First Name" Id="firstname-column-id" />
        <GridColumn Field="@(nameof(SampleData.LastName))" Title="Last Name" Id="lastname-column-id" />
        <GridColumn Field="@(nameof(SampleData.CompanyName))" Title="Company" Id="companyname-column-id" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" Id="team-column-id" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" VisibleInColumnChooser="false" />
    </GridColumns>
</TelerikGrid>

@code {
    private IEnumerable<SampleData> GridData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            FirstName = $"FirstName {x}",
            LastName = $"LastName {x}",
            CompanyName = $"Company {x}",
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        });

    public class SampleData
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

### Column Menu Features Example

>caption Use the GridColumnMenuSettings tag to control the common features of the Column Menu, use column parameters to affect its relationship with the column menu

````RAZOR
@* Disable filtering and locking columns, hide a column from the chooser (Team), disable the menu for a column (Name). *@

<TelerikGrid Data="@MyData"
             Pageable="true"
             PageSize="5"
             Groupable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true"
             Reorderable="true"
             ShowColumnMenu="true">
    <GridSettings>
        <GridColumnMenuSettings Lockable="false"
                                Groupable="true"
                                Reorderable="true"
                                FilterMode="@ColumnMenuFilterMode.None">
        </GridColumnMenuSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" ShowColumnMenu="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" VisibleInColumnChooser="false" />
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

## Notes

* Applying settings to a Grid column like `Filterable="false"`, `Sortable="false"`, `Lockable="false"` will take precedence over the common settings applied in the `<GridColumnMenuSettings>` and disable the above-mentioned functionalities for the corresponding column.

* If the Grid has a [frozen](slug://grid-columns-frozen) column (`Locked="true"`), that column cannot be unfrozen from the column menu.

* If you are using the [Column Chooser Template](slug://grid-templates-column-chooser) or you are grouping the columns into [sections](#sections), it is recommended to add the `Title` parameter to all Grid Columns.

## See Also
  * [Live Demo: Grid Column Menu](https://demos.telerik.com/blazor-ui/grid/column-menu)
  * [Live Demo: Grid Custom Column Menu](https://demos.telerik.com/blazor-ui/grid/custom-column-menu)
  * [Blazor Grid](slug://grid-overview)
