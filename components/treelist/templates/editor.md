---
title: Editor
page_title: TreeList - Editor Template
description: Use custom editor templates in treelist for Blazor.
slug: treelist-templates-editor
tags: telerik,blazor,treelist,templates,editor
published: True
position: 15
---

# Edit Template

The column's `EditTemplate` defines the inline template or component that will be rendered when the user is [editing]({%slug treelist-overview%}#editing) the field. It is also used when inserting a new item.

You can data bind components in it to the current context, which is an instance of the model the treelist is bound to. You will need a global variable that is also an instance of the model to store those changes. The model the template receives is a copy of the original model, so that changes can be cancelled (the `Cancel` command).

If you need to perform logic more complex than simple data binding, use the change event of the custom editor component to perform it. You can also consider using a custom edit form outside of the treelist.

>caption Sample edit template

````CSHTML
@* This example shows how to use a dropdownlist to edit strings. You can implement any desired logic instead.
If you have an enum, the treelist can edit and filter it out-of-the-box without the need for an edit template *@
@* For brevity, only Editing is implemented in this sample *@

<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Inline"
                 OnUpdate="@UpdateItem"
                 Pageable="true" ItemsField="@(nameof(Employee.DirectReports))"
                 Width="850px">
    <TreeListColumns>
        <TreeListCommandColumn Width="100px">
            <TreeListCommandButton Command="Edit" Icon="@IconName.Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@IconName.Save" ShowInEdit="true">Update</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@IconName.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Role" Width="150px" Title="Position">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as Employee;
                    <TelerikDropDownList Data="@Roles" @bind-Value="@CurrentlyEditedEmployee.Role"
                                         Width="100%" PopupHeight="auto" DefaultText="Select Role...">
                    </TelerikDropDownList>
                }
            </EditorTemplate>
        </TreeListColumn>
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }
    public static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };
    public Employee CurrentlyEditedEmployee { get; set; }

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    // Sample CUD operations for the local data
    async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee; // you can also use the entire model

        // perform actual data source operations here through your service

        // if the treelist Data is not tied to the service, you may need to update the local view data too
        var foundItem = FindItemRecursive(Data, item.Id);
        if (foundItem != null)
        {
            foundItem.Name = item.Name;
            foundItem.Role = item.Role;
            foundItem.HireDate = item.HireDate;
            foundItem.EmailAddress = item.EmailAddress;
            // for simplicity, this copies all fields, consider altering only the needed field
        }
    }


    // sample helper methods for handling the view-model data hierarchy

    private Employee FindItemRecursive(List<Employee> items, int id)
    {
        foreach (var item in items)
        {
            if (item.Id.Equals(id))
            {
                return item;
            }

            if (item.DirectReports?.Count > 0)
            {
                var childItem = FindItemRecursive(item.DirectReports, id);

                if (childItem != null)
                {
                    return childItem;
                }
            }
        }

        return null;
    }

    // sample model

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<Employee> DirectReports { get; set; }
        public bool HasChildren { get; set; }
    }

    // data generation

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
                Role = Roles[i % Roles.Count],
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i),
                DirectReports = new List<Employee>(),
                HasChildren = true
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
                    Role = Roles[j % Roles.Count],
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(),
                    HasChildren = true
                };
                root.DirectReports.Add(firstLevelChild);
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        Role = Roles[k % Roles.Count],
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

>caption The result from the code snippet above, after Edit was clicked on the row with ID 4, and the user expanded the dropdown from the template

![](images/edit-template.png)

## See Also

 * [TreeList Editing]({%slug treelist-editing-overview%})
 * [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)
 * [Live Demo: TreeList Custom Editor Template](https://demos.telerik.com/blazor-ui/treelist/customeditor)

