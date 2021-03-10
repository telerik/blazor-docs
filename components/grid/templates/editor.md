---
title: Editor
page_title: Grid - Editor Template
description: Use custom editor templates in Grid for Blazor.
slug: grid-templates-editor
tags: telerik,blazor,grid,templates,editor
published: True
position: 15
---

# Editor Template

The column's `EditTemplate` defines the inline template or component that will be rendered when the user is [editing]({%slug components/grid/overview%}#editing) the field. It is also used when inserting a new item.

You can data bind components in it to the current context, which is an instance of the model the grid is bound to. You will need a global variable that is also an instance of the model to store those changes. The model the template receives is a copy of the original model, so that changes can be cancelled (the `Cancel` command).

If you need to perform logic more complex than simple data binding, use the change event of the custom editor component to perform it. You can also consider using a [custom edit form](https://demos.telerik.com/blazor-ui/grid/editing-custom-form).

You can find the following examples below:

* [Sample editor template for a field - limit the string input options through a select element](#sample-editor-template-for-a-field---limit-the-string-input-options-through-a-select-element)

* [Sample editor template that uses a foreign key](#sample-editor-template-that-uses-a-foreign-key)


### Sample editor template for a field - limit the string input options through a select element

````CSHTML
@* This example shows how to use a simple <select> to edit strings. You can implement any desired logic instead.
    If you have an enum, the grid can edit and filter it out-of-the-box without the need for an edit template *@

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="300px" OnUpdate="@UpdateHandler">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Editable="false" Title="ID" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridColumn Field=@nameof(SampleData.Role) Title="Position">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as SampleData;
                    <select @bind="@CurrentlyEditedEmployee.Role">
                        @foreach (var item in Roles)
                        {
                            <option value="@item">@item</option>
                        }
                    </select>
                }
            </EditorTemplate>
        </GridColumn>
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<SampleData> MyData { get; set; }
    List<string> Roles { get; set; }
    SampleData CurrentlyEditedEmployee { get; set; }

    public async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    //in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
    }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
        Roles = await MyService.GetRoles();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();
        private static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = "Name " + i.ToString(),
                        Role = Roles[i % Roles.Count]
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task<List<string>> GetRoles()
        {
            return await Task.FromResult(Roles);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }
    }
}
````

>caption The result from the snippet above after Edit was clicked for the first row and the select was expanded

![editor template for simple strings with a select element](images/edit-template-simple-string-select.png)

### Sample editor template that uses a foreign key

>tip This example uses the ID that represents the foreign for the grid column `Field`. You may want to use a text field that you can add to your model (or from a [nested model]({%slug grid-use-navigation-properties%})) instead - this will change what renders in the `Template` by default, and will change the rules and operators for filtering, sorting, and so using a field with human-readable information (like strings) might provide better UX.

````CSHTML
@* This example shows one way to use a dropdownlist to edit values with a foreign key. *@

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="500px" OnUpdate="@UpdateHandler">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) Editable="false" Title="ID" />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.RoleId) Title="Position">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as Employee;
                    <TelerikDropDownList Data="@Roles" DefaultText="Select Role"
                                         @bind-Value="@CurrentlyEditedEmployee.RoleId"
                                         TextField="@nameof(Role.RoleName)" ValueField="@nameof(Role.RoleId)"
                                         Width="100%" PopupHeight="auto">
                    </TelerikDropDownList>
                }
            </EditorTemplate>
            <Template>
                @{
                    // a Template is used to show the foreign key data that is user-friendly
                    int roleId = (context as Employee).RoleId;
                    Role matchingPos = Roles.FirstOrDefault(r => r.RoleId == roleId);
                    string textToRender = matchingPos != null ? matchingPos.RoleName : "Unknown";
                    <text>@textToRender</text>
                }
            </Template>
        </GridColumn>
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<Employee> MyData { get; set; }
    List<Role> Roles { get; set; }
    Employee CurrentlyEditedEmployee { get; set; }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int RoleId { get; set; }
    }

    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
        Roles = await MyService.GetRoles();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();
        private static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };

        public static async Task<List<Employee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 0; i < 50; i++)
                {
                    _data.Add(new Employee()
                    {
                        ID = i,
                        Name = "name " + i,
                        RoleId = i % 4 // every one in four is an unknown one that will not be present in the roles list
                                       // and will have an ID of 0 to match the DefaultText of the dropdownlist
                                       // you can perform more complicated checks as necessary in your app and/or in the templates
                                       // and/or in the view-model data to present it with suitable values and avoid exceptions
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task<List<Role>> GetRoles()
        {
            var data = new List<Role>
            {
                new Role { RoleId = 1, RoleName = "Manager" },
                new Role { RoleId = 2, RoleName = "Employee" },
                new Role { RoleId = 3, RoleName = "Contractor" },
            };

            return await Task.FromResult(data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }
    }
}
````

>caption The result from the code snippet above, after Edit was clicked on the second row and the user expanded the dropdown from the editor template

![Editor Template for a foreign key](images/edit-template-foreign-key.png)

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/customeditor)

