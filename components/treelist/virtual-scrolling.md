---
title: Virtual Scrolling
page_title: TreeList - Sorting
description: Enable and configure the virtual scrolling of rows in the TreeList for Blazor.
slug: treelist-virtual-scrolling
tags: telerik,blazor,treelist,virtual,rows,scrolling
published: True
position: 25
---

# TreeList Virtual Scrolling


Virtual scrolling provides an alternative to paging. Instead of utilizing a pager, the user vertically scrolls through all records in the data source.

To enhance rendering performance, the TreeList reuses the same set of HTML elements. As the next data loads, a loading indicator appears on the cells. If the user scrolls back up after scrolling down to the next set of rows, the previous data reloads from the data source, similar to regular paging, with the scroll distance determining the data to be loaded.

## Enabling Virtual Scrolling

* Set the `ScrollMode` parameter to `TreeListScrollMode.Virtual` (the default value is `Scrollable`).
* Set the `Height` and `RowHeight` parameters.

>caption Enable Sorting in Telerik TreeList

````CSHTML
<TelerikTreeList Data="@TreeListData"
                 ScrollMode="@TreeListScrollMode.Virtual"
                 Height="500px"
                 RowHeight="50"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterMenu">
    <TreeListColumns>
        <TreeListColumn Expandable="true" Field="FirstName" Title="First Name" />
        <TreeListColumn Field="LastName" Title="Last Name" />
        <TreeListColumn Field="Position" />
    </TreeListColumns>
</TelerikTreeList>

@code {

    private List<Employee> TreeListData { get; set; }

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();

        for (int i = 1; i <= 1000; i++)
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



## See Also

  * [Live Demo: TreeList Virtual Scrolling](https://demos.telerik.com/blazor-ui/treelist/virtual-scrolling)
   
