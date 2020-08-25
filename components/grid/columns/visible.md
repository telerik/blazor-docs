---
title: Visible
page_title: Grid - Visible Columns
description: Hide Grid columns.
slug: grid-columns-visible
tags: telerik,blazor,grid,column,visible
published: True
position: 15
---

# Visible Columns

You can programatically hide some of the columns of the Grid. 

In this article:
* [Basics](#basics)
* [Notes](#notes)
* [Examples](#examples)

## Basics

To hide a Grid column set the `Visible` parameter to `false`. To hide a column based on a certain condition you can pass a ternary operator or a method that returns a `bool`.

>caption Hide a column from the Grid. Basic example.

````CSHTML
@* Hide the Hire Date Grid column by setting the Visible parameter to false *@

<TelerikGrid Data="@MyData" 
             Pageable="true"
             PageSize="10">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" Visible="false" />
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

>caption The result from the code snippet above

![visible parameter basic example screenshot](images/visible-parameter-basic-example.png)

## Notes

Non-visible columns (`Visible="false"`) will have the following behavior:

* Will not be [editable]({%slug components/grid/editing/overview%}).
* Will not be exported in [excel export]({%slug grid-export-excel%}).
* Will not be visible when the data is [grouped]({%slug components/grid/features/grouping%}).
* [Templates]({%slug components/grid/features/templates%}) will not be rendered.
    * When using [Row Template]({%slug grid-templates-row%}) the visiblity of the column should be implemented by the application.
* You can control the visibility of the column through the [Grid State]({%slug grid-state%}).


## Examples

## See Also

  * [Live Demo: Visible Columns](https://demos.telerik.com/blazor-ui/grid/visible-columns)
