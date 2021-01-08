---
title: CheckBoxList
page_title: Grid - Filtering CheckBoxList
description: Enable and configure filtering CheckBoxList in Grid for Blazor.
slug: grid-checklist-filter
tags: telerik,blazor,grid,filtering,filter,CheckBoxList
published: True
position: 15
---

# Grid CheckBoxList Filtering

You can change the [filter menu]({%slug grid-filter-menu%}) to show a list of checkboxes with the distinct values from the data source. This lets your users filter records by a commonly found value quickly, and select multiple values with east. The behavior is similar to Excel filtering.

To enable the checkbox list filtering in the grid:

1. Set the `FilterMode` parameter of the grid to `Telerik.Blazor.GridFilterMode.FilterMenu`
1. Set the `FilterMenuType` parameter of the grid to `Telerik.Blazor.FilterMenuType.CheckBoxList`. It defaults to `Menu` for the default behavior.

You can also change the filter menu behavior for a particular column - its own `FilterMenuType` parameter can be either `Menu` or `CheckBoxList` regardless of the main grid parameter. This lets you mix both modes as necessary for your application - you can either have all grid columns use the same mode with a single setting, or override it for a few columns that need the less common mode.

>caption CheckList filter in the grid

````CSHTML
@* Checkbox List Filter for the Name, Team and Vacation columns, the ID column overrides it to Menu *@

<TelerikGrid Data=@GridData Pageable="true" Height="400px"
             FilterMode="@GridFilterMode.FilterMenu" FilterMenuType="@FilterMenuType.CheckBoxList">
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.EmployeeId))" FilterMenuType="@FilterMenuType.Menu" />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
        <GridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
````

>caption The result from the snippet above

![checbox list filter in action](images/checklist-filter-overview.gif)



## See Also

  * [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
  * [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
