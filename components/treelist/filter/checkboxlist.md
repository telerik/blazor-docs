---
title: CheckBoxList
page_title: TreeList - Filtering CheckBoxList
description: Enable and configure filtering CheckBoxList in TreeList for Blazor.
slug: treelist-checklist-filter
tags: telerik,blazor,TreeList,filtering,filter,CheckBoxList
published: True
position: 15
---

# TreeList CheckBoxList Filtering

You can change the [filter menu]({%slug treelist-filter-menu%}) to show a list of checkboxes with the distinct values from the data source. This lets your users filter records by a commonly found value quickly, and select multiple values with ease. The behavior is similar to Excel filtering.

To enable the checkbox list filtering in the treelist:

1. Set the `FilterMode` parameter of the grid to `Telerik.Blazor.TreeListFilterMode.FilterMenu`
1. Set the `FilterMenuType` parameter of the grid to `Telerik.Blazor.FilterMenuType.CheckBoxList`. It defaults to `Menu` for the default behavior.

You can also change the filter menu behavior for a particular column - its own `FilterMenuType` parameter can be either `Menu` or `CheckBoxList` regardless of the main treelist parameter. This lets you mix both modes as necessary for your application - you can either have all columns use the same mode with a single setting, or override it for a few columns that need the less common mode.

>caption CheckList filter in the treelist

````CSHTML
@* Checkbox List Filter for the Name, Team and Vacation columns, the ID column overrides it to Menu *@

<TelerikTreeList Data="@Data" FilterMode="@TreeListFilterMode.FilterMenu" FilterMenuType="@FilterMenuType.CheckBoxList"
                 Pageable="true" IdField="Id" ParentIdField="ParentId" Width="650px">
    <TreeListColumns>
        <TreeListColumn Field="Id" FilterMenuType="@FilterMenuType.Menu" />
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="@nameof(Employee.Team)" />
        <TreeListColumn Field="@nameof(Employee.IsOnLeave)" Title="OnVacation" />
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
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
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
                Name = $"root: {i}",
                Team = $"Team {i}",
                IsOnLeave = i % 3 == 0
            });

            for (int j = 2; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child of {i}",
                    Team = $"Team {i}",
                    IsOnLeave = currId % 4 == 0
                });

                for (int k = 3; k < 5; k++)
                {
                    data.Add(new Employee
                    {
                        Id = currId * 1000 + k,
                        ParentId = currId,
                        Name = $"second level child {k} of {i} and {currId}",
                        Team = $"Team {i}",
                        IsOnLeave = currId % 2 == 0
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

>caption The result from the snippet above

![checbox list filter in action](images/checklist-filter-overview.gif)



## See Also

  * [Treelist Filtering Overview]({%slug treelist-filtering%})
  * [Live Demo: Treelist CheckBox List Filter](https://demos.telerik.com/blazor-ui/treelist/filter-checkboxlist)
  