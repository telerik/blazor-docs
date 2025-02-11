---
title: Pager Template
page_title: TreeList Pager Template
description: Learn how to use a custom pager template in the Blazor TreeList. The template allows you to customize the layout, content, and functionality of the TreeList UI component in Blazor apps.
slug: treelist-templates-pager
tags: telerik,blazor,treelist,templates,pager
published: True
position: 40
---


# Pager Template

The `TreeListPagerTemplate` allows you to modify the layout, content, and functionality of the Pager. To paginate the data, you can use any set of Blazor components and DOM elements instead of the default TreeList [Pager](slug:pager-overview).


>caption Using the Telerik UI for Blazor Slider to paginate the TreeList data

````RAZOR
@* Telerik Blazor TreeList with Pager Template *@

<TelerikTreeList Data="@TreeListData"
                 IdField="Id"
                 ParentIdField="ParentId"
                 Pageable="true"
                 @bind-Page="@CurrentPage"
                 PageSize="@PageSize">
    <TreeListPagerTemplate>
        <div style="padding:10px">
            <TelerikSlider @bind-Value="@CurrentPage"
                           Width="100%"
                           Min="1"
                           Max="@Total">
            </TelerikSlider>
        </div>
    </TreeListPagerTemplate>
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Width="120px" />
        <TreeListColumn Field="ParentId" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="120px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee> TreeListData { get; set; }

    private int CurrentPage { get; set; } = 1;

    private int PageSize { get; set; } = 10;

    private int Total { get; set; } = 10;

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await GetTreeListData();
    }

    // sample model

    public class Employee
    {
        // denote the parent-child relationship between items
        public int Id { get; set; }
        public int? ParentId { get; set; }

        // custom data fields for display
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    private async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 11; i++)
        {
            data.Add(new Employee
                {
                    Id = i,
                    ParentId = null, // indicates a root-level item
                    Name = $"root: {i}",
                    EmailAddress = $"{i}@example.com",
                    HireDate = DateTime.Now.AddYears(-i)
                }); ;

            for (int j = 1; j < 4; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                    {
                        Id = currId,
                        ParentId = i,
                        Name = $"first level child {j} of {i}",
                        EmailAddress = $"{currId}@example.com",
                        HireDate = DateTime.Now.AddDays(-currId)
                    });

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = currId * 1000 + k;
                    data.Add(new Employee
                        {
                            Id = nestedId,
                            ParentId = currId,
                            Name = $"second level child {k} of {i} and {currId}",
                            EmailAddress = $"{nestedId}@example.com",
                            HireDate = DateTime.Now.AddMinutes(-nestedId)
                        }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

## See Also

 * [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)

