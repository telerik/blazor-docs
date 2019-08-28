---
title: Grouping
page_title: Grid for Blazor | Grouping
description: Enable and configure grouping in Grid for Blazor
slug: components/grid/features/grouping
tags: telerik,blazor,grid,grouping
published: True
position: 22
---

# Grid Grouping

The Grid component offers support for grouping.

To enable grouping, set the grid's `Groupable` property to `true`.

Drag a column header to the group panel and the grid will create groups in the data rows based on the available values for that field. An indicator will be shown for the column that is used for grouping. The group header shows the value for the field by which it is grouping.

You can also group by multiple fields and groups for subsequent fields will be nested within their parent groups. When adding a group, you can drag it in the desired position in the list of current groups.

To remove a group setting, click the `[x]` button on its indicator in the group panel.

To prevent grouping by a field, set `Groupable="false"` for on its column. This can be useful for fields with unique values like IDs or names.

>caption Enable grouping in Telerik Grid

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data=@GridData Groupable="true" Pageable="true" Height="400px">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(Employee.Name) Groupable="false" />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
        <TelerikGridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
    </TelerikGridColumns>
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

>caption How grouping works in the Telerik grid

![](images/grouping-overview.gif)


## See Also

  * [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
   
  
