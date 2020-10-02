---
title: Column Events
page_title: TreeList - Column Events
description: Events of the TreeList Column for Blazor.
slug: treelist-column-events
tags: telerik,blazor,treelist,column,columns,events
published: True
position: 100
---

# TreeList Column Events

This article explains the events available for the Columns of the Telerik TreeList for Blazor.

* [OnCellRender](#oncellrender)

## OnCellRender

This event fires upon the rendering of the TreeLists columns. It receives an argument of type `TreeListCellRenderEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the current data item.
* `Value` - an object that contains the value that is rendered in the TreeList cell. You can cast it to its data type, for example to a `string`, `DateTime` or a number.
* `Class` - the CSS class that will be applied to the cells.

>caption Use the OnCellRender event to apply custom format to TreeList cells based on certain value

````CSHTML
<style>
    .myCustomTreeListCellFormatting {
        background-color: red;
        color: white;
        font-size: 10px;
        font-weight: bolder;
    }
</style>

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="750px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" OnCellRender="@OnCellRenderHandler" />
        <TreeListColumn Field="Id" Width="120px" Visible="false" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    void OnCellRenderHandler(TreeListCellRenderEventArgs args)
    {
        var item = args.Item as Employee;

        if (args.Value.ToString().Contains("first level"))
        {
            args.Class = "myCustomTreeListCellFormatting";
        }
    }

    public List<Employee> Data { get; set; }

    public class Employee
    {
        public List<Employee> DirectReports { get; set; }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            Employee root = new Employee
            {
                Id = LastId,
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i),
                DirectReports = new List<Employee>()
            };
            data.Add(root);
            LastId++;

            for (int j = 1; j < 4; j++)
            {
                int currId = LastId;
                Employee firstLevelChild = new Employee
                {
                    Id = currId,
                    Name = $"first level child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(),
                };
                root.DirectReports.Add(firstLevelChild);
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    // populate the parent's collection
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                    LastId++;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

## See Also

  * [TreeList Overview]({%slug treelist-overview%})
  * [TreeList Events]({%slug treelist-events%})
