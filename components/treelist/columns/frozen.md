---
title: Frozen
page_title: TreeList - Frozen Columns
description: How to freeze treelist columns so they are always visible in a scrollable treelist.
slug: treelist-columns-frozen
tags: telerik,blazor,treelist,column,freeze,frozen
published: true
position: 5
---

# Frozen Columns

The treelist lets you freeze one or more columns. This will allow the user to scroll horizontally through the treelist, but still be able to keep some important columns visible at all times (such as ID or command column).

To enable the column freezing, set the `Locked` parameter of the column to `true`.

If the column you want to freeze is not the first in the list, the treelist must be scrollable. This requires that there are enough columns with their `Width` set so that the treelist has a horizontal scrollbar (the sum of the Widths of the columns exceeds the Width of the treelist). You can read more about the scrolling behavior of the treelist in the [TreeList Column Width Behavior]({%slug treelist-columns-width%}) article.

>caption Frozen columns in the beginning, middle and at the end of the treelist

````CSHTML
@* Explore how locked (frozen) columns behave when scrolling. For brevity, editing is not implemented *@

<TelerikTreeList Data="@Data" Pageable="true" IdField="Id" ParentIdField="ParentId"
                 Width="850px" Height="400px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" Locked="true" />
        <TreeListColumn Field="Id"  Width="120px" />
        <TreeListColumn Field="ParentId" Locked="true" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="320px" />
        <TreeListColumn Field="HireDate"  Width="220px" />
        <TreeListCommandColumn Locked="true" Width="100px">
            <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample model

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

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


## See also
 * [Live demo: Frozen Columns](https://demos.telerik.com/blazor-ui/treelist/frozen-columns)
