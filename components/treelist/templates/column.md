---
title: Column (Cell)
page_title: TreeList - Column (Cell) Template
description: Use custom column and cell templates in treelist for Blazor.
slug: treelist-templates-column
tags: telerik,blazor,treelist,templates,column,cell
published: True
position: 5
---

# Column Template

By default, the TreeList renders the value of the field in the column, as it is provided from the data source. You can change this behavior by using the `Template` of the column and add your own content and/or logic to make a string out of the object.

Using a template will keep the `Expandable="true"` feature in a column - the expand/collapse arrows that the treelist renders for you. Your template will render after the arrow.

>tip If you only want to format numbers, dates, enums, you can do so with the [DisplayFormat feature]({%slug treelist-columns-displayformat%}) without the need to declare a template.

The example below shows how to:

* set the `Template` (make sure to use the capital `T`, at the time of writing the Visual Studio autocomplete tends to use the lowercase `t` which breaks the template logic and does not allow you to access the context)
* access the `context` of the model item so you can employ your own logic
* set HTML in the column
* take an arbitrary field from the model

>caption Using cell (column) template

````CSHTML
Cell template that renders an image based on model data

<TelerikTreeList Data="@Data" Pageable="true" IdField="Id" ParentIdField="ParentId" Width="650px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Title="Photo" Width="250px">
            <Template>
                @{
                    Employee empl = context as Employee;
                    <img src="@( $"images/employees/{empl.Id}.png" )" />
                    <strong>@empl.Name</strong>
                }
            </Template>
        </TreeListColumn>
        <TreeListColumn Title="Manager" Width="200px">
            <Template Context="item">
                @{
                    var manager = Data.FirstOrDefault(d => d.Id.Equals(((Employee)item).ParentId));
                    <strong>"Manager: "</strong>
                    @(manager == null ? "none" : manager.Name)
                }
            </Template>
        </TreeListColumn>
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
                Name = $"root: {i}"
            });

            for (int j = 1; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child {j} of {i}"
                });

                for (int k = 1; k < 5; k++)
                {
                    data.Add(new Employee
                    {
                        Id = currId * 1000 + k,
                        ParentId = currId,
                        Name = $"second level child {k} of {i} and {currId}"
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
 
