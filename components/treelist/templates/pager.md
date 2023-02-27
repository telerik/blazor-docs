---
title: Pager Template
page_title: TreeList - Pager Template
description: Use custom pager templates in TreeList for Blazor.
slug: treelist-templates-pager
tags: telerik,blazor,treelist,templates,pager
published: True
position: 40
---


# Pager Template

The `TreeListPagerTemplate` allows you to modify the pager layout, content, and functionality. To paginate the data you can use any set of Blazor components and DOM elements instead of the default treelist [Pager]({%slug pager-overview%}).


>caption use the Telerik UI for Blazor Slider to paginate the TreeList data.

````CSHTML
@page "/treelist/pager-template"
@inject TreeListService TreeListService
@using System.Collections.ObjectModel
@using Telerik.Blazor.Components.TreeList;
@using Telerik.DataSource.Extensions

<div class="mr-5">
    <TelerikTreeList Data="@TreeListData"
                     IdField="@nameof(Employee.Id)"
                     ParentIdField="@nameof(Employee.ParentId)"
                     @bind-Page="CurrentPage"
                     PageSize="@PageSize"
                     Pageable="true"
                     Sortable="true"
                     FilterMode="@TreeListFilterMode.FilterMenu">
        <TreeListColumns>
            <TreeListColumn Expandable="true" Field="FirstName" Title="First Name" />
            <TreeListColumn Field="LastName" Title="Last Name" />
            <TreeListColumn Field="Position" />
        </TreeListColumns>
        <TreeListPagerTemplate>
            @{
                var pages = (int)Math.Ceiling((decimal)Total / (decimal)PageSize);
                if (pages == 0) pages = CurrentPage;
            }
            <TelerikSlider @bind-Value="@CurrentPage"
                           Min="1"
                           Max="@pages">
            </TelerikSlider>
        </TreeListPagerTemplate>
    </TelerikTreeList>
</div>

@code {
    List<Employee> TreeListData { get; set; }
    int CurrentPage { get; set; } = 1;
    int PageSize = 3;
    int Total;

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();
        for (int i = 1; i <= 9; i++)
        {
            int? parentId = i % 3 + 1;
            string position = "Software Engineer";
            if (i <= 3)
            {
                position = "Team Lead";
                parentId = null;
            }
            TreeListData.Add(new Employee()
            {
                Id = i,
                ParentId = parentId,
                FirstName = "First " + i,
                LastName = "Last " + i,
                Position = position
            });
        }
        Total = TreeListData.Count();
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

 * [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)

