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

The Grid allows you to setup a menu for its columns. It enables you to perform high-level customization like [sorting]({%slug components/grid/features/sorting%}), [filtering]({%slug components/grid/filtering%}), [showing or hiding]({%slug grid-columns-visible%}) columns and [freezing or unfreezing]({%slug grid-columns-frozen%}) them.

>caption Telerik Column Menu for the Grid

![column menu basic example screenshot](images/column-menu-basic-example.png)

In this article:
* [Basics](#basics)
* [Features](#features)
    * [Sorting](#sorting)
    * [Filtering](#filtering)
    * [Frozen Columns](#frozen-columns)
    * [Column Chooser](#column-chooser)
* [Notes](#notes)

## Basics

To enable the column menu set the `ShowColumnMenu` parameter of the `<TelerikGrid>` tag to `true`. This will enable the menu for each column of the Grid.

To disable the Column Menu for a specific column in the Grid set the `ShowColumnMenu` parameter of the column to `false`.

You can see the what the column menu can do and how to control its settings in the [Features](#features) section. By default, all of them are enabled.

>caption Enable the column menu for all Grid columns. Results in the screnshot above.

````CSHTML
@* Set the ShowColumnMenu parameter to true *@

<TelerikGrid Data="@MyData"
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

## Features

To control the common features of the `Column Menu` use the `<GridColumnMenuSettings>`, nested inside the `<GridSettings>`:

* [Sorting](#sorting)
* [Filtering](#filtering)
* [Frozen Columns](#frozen-columns)
* [Column Chooser](#column-chooser)

### Sorting

To remove the sorting option from the Column Menu set the `Sortable` parameter of the `GridColumnMenuSettings` tag to `false`.


### Filtering

To control whether filtering is possible from the Column Menu set the `FilterMode` parameter of the `GridColumnMenuSettings` tag to a member of the `ColumnMenuFilterMode` enum:

* `None` - disables the filtering from the Column Menu.
* `FilterMenu` - enables a filter menu to apply filtering.


### Frozen Columns

To disable locking and unlocking of a column from the Column Menu, set the `Lockable` parameter of the column to `false`.


### Column Chooser

The Column Chooser in the Column Menu and allows you to toggle the visiblity of Grid columns from the Column Menu. By the default all columns are visible under the `Columns` section of the Column Menu (click the Columns item to expand it).

![column chooser screenshot](images/column-menu-chooser-in-action.gif)

To disable the column chooser, set the `ShowColumnChooser` paramter of the `<GridColumnMenuSettings>` to `false`.

To hide a column from the Column Chooser set the `VisibleInColumnChooser` property of the column to `false`.

### Example of Column Menu Features Settings

>caption Use the GridColumnMenuSettings tag to control the common features of the Column Menu, use column parameters to affect its relationship with the column menu

````CSHTML
@* Disable filtering and locking columns, hide a column from the chooser (Team), disable the menu for a column (Name). *@

<TelerikGrid Data="@MyData"
             Pageable="true"
             PageSize="5"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true"
             ShowColumnMenu="true">
    <GridSettings>
        <GridColumnMenuSettings Lockable="false"
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

>caption Column menu with filtering, locking and sorting, but without a column chooser

![column menu common settings example](images/column-menu-settings-example.gif)

## Notes

* Applying settings to a Grid column like `Filterable="false"`, `Sortable="false"`, `Lockable="false"` will take precendense over the common settings applied in the `<GridColumnMenuSettings>` and disable the above-mentioned functionalities for the corresponding column.

* An exception will be thrown if the `FilterMode` of the Grid is set to `FilterRow` and a column menu is used - the filter descriptors of the two features are not compatible.

* If the Grid has a [frozen]({%slug grid-columns-frozen%}) column (`Locked="true"`), that column cannot be unfrozen from the column menu.

## See Also

  * [Live Demo: Visible Columns](https://demos.telerik.com/blazor-ui/grid/columns)
