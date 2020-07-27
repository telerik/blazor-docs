---
title: Resize
page_title: TreeList - Resize Columns
description: Drag to resize columns in the treelist for Blazor.
slug: treelist-columns-resize
tags: telerik,blazor,treelist,column,resize,drag
published: True
position: 3
---

# Resize Columns

The treelist lets the user resize its columns by dragging the borders between their headers.

To enable the column resizing, set the `Resizable` parameter of the treelist to `true`.

To prevent the user from resizing a certain column, set its own parameter `Resizable="false"`. Note that the user can still resize other columns around it.

>caption Enable column resizing in Telerik treelist

````CSHTML
@* Drag the border between column headers to change the column size. You cannot resize the ID column itself. *@

<TelerikTreeList Data="@Data" Resizable="true"
                 Pageable="true" IdField="Id" ParentIdField="ParentId" Width="650px" Height="400px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Resizable="false" />
        <TreeListColumn Field="ParentId" />
        <TreeListColumn Field="HireDate" />
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
        public DateTime HireDate { get; set; }
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
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````


>caption How column resizing works in the Telerik treelist

![](images/column-resize-preview.gif)

## See Also

  * [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/treelist/column-resizing)
