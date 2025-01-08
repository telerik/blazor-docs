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

The column's `EditorTemplate` defines the inline template or component that will be rendered when the user is [editing](slug://components/grid/editing/overview) the field. It is also used when inserting a new item.

You can data bind components in the editor template to the current `context`. This is the data item instance, which is bound to the currently edited Grid row. Cast `context` to the data item type and store it in a global or local variable. Then, use this variable for one-way or two-way binding in the `EditorTemplate`.

The template receives a **copy** of the original model, so that changes can be canceled with the `Cancel` command. See the [**Notes** section in the Grid Editing Overview](slug://components/grid/editing/overview#notes) for more details on how and when that copy is created.

If you need more complex logic inside the editor template, compared to simple data binding, use the `change` event of the custom editor component. You can also use a [custom Grid edit form](slug://grid-kb-custom-edit-form).

>tip The Editor Template works in all edit modes (Inline, Popup, InCell). Before using it with InCell mode, review the [pertinent notes](slug://components/grid/editing/incell#editor-template).

**In this article:**

* [Notes](#notes)
* [Examples](#examples)
    * [Multi-line text with HTML Editor or TextArea](#multi-line-text-with-html-editor-or-textarea)
    * [How to limit the input options with a select element](#limit-the-input-options-with-a-select-element)
    * [Editor template for a foreign key column](#editor-template-for-a-foreign-key-column)

## Notes

* @[template](/_contentTemplates/common/inputs.md#edit-debouncedelay)

* The Grid row creates an `EditContext` and passes it to the `EditorTemplate`. You can read more about it in the [**Notes** section of the Editing Overview](slug://components/grid/editing/overview#notes) article.

* We recommend casting the Editor Template context to your model and storing it in a local or a dedicated global variable. Do not share a global variable within multiple templates, like column (cell) template and editor template. Variable sharing can lead to unexpected behavior.

* Direct casting of the `context` can make the data binding not work properly.


>caption Not recommended: direct casting. Binding does not work properly.

<div class="skip-repl"></div>

````RAZOR
<EditorTemplate>
    <TelerikTextArea @bind-Value="@((Product)context).Description" />
</EditorTemplate>
````

>caption Recommended: cast the context to your model type and store it in a variable. Binding works as expected.

<div class="skip-repl"></div>

````RAZOR
<EditorTemplate>
    @{
        EditedProduct = context as Product;

        <TelerikTextArea @bind-Value="@EditedProduct.Description" />
    }
</EditorTemplate>

@code{
    private Product EditedProduct { get; set; }
}
````

## Examples

This section demonstrates different scenarios with the Editor Template:

## Multi-line text with HTML Editor or TextArea

The Grid will save changes and close the current edit row (or edit cell) when the user hits Enter. To prevent this inside HTML Editor or TextArea components, stop the propagation of the `keydown` event:

````RAZOR
<TelerikGrid Data="@Products"
             EditMode="@GridEditMode.Inline"
             OnUpdate="@OnGridUpdate">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Width="200px" />
        <GridColumn Field="@nameof(Product.Description)" Width="200px">
            <EditorTemplate>
                @{
                    var item = (Product)context;

                    <div @onkeydown:stopPropagation>
                        <TelerikTextArea @bind-Value="@item.Description"
                                         DebounceDelay="0" />
                    </div>
                }
            </EditorTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Product.HTMLDescription)">
            <Template>
                @{
                    var item = (Product)context;

                    @(new MarkupString(item.HTMLDescription))
                }
            </Template>
            <EditorTemplate>
                @{
                    var item = (Product)context;

                    <div @onkeydown:stopPropagation>
                        <TelerikEditor @bind-Value="@item.HTMLDescription"></TelerikEditor>
                    </div>
                }
            </EditorTemplate>
        </GridColumn>
        <GridCommandColumn Width="200px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {

    private List<Product> Products { get; set; }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var item = (Product)args.Item;
        var index = Products.FindIndex(x => x.Id == item.Id);

        Products[index] = item;
    }

    protected override void OnInitialized()
    {
        Products = new List<Product>() {
            new Product()
            {
                Name = "Product Name",
                Description = "Description line 1\nsecond line in textarea only",
                HTMLDescription = "<p>Description.</p><p>Second paragraph.</p>"
            }
        };

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string HTMLDescription { get; set; }
    }
}
````

## Limit the input options with a select element

````RAZOR
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
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
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

## Editor template for a foreign key column

This example uses an ID that represents the foreign key for the grid column `Field`. You may want to use a text field that you can add to your model (or from a [nested model](slug://grid-use-navigation-properties)) instead - this will change what renders in the `Template` by default, and will change the rules and operators for filtering, sorting, and so using a field with human-readable information (like strings) might provide better UX.

Also check the [Grid Foreign Key Column](slug://grids-foreign-key) knowledge base article.

````RAZOR
@* This example shows one way to use a dropdownlist to edit values with a foreign key. *@

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="500px" OnUpdate="@UpdateHandler">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) Editable="false" Title="ID" />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.RoleId) Title="Position">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as Employee;
                    <TelerikDropDownList Data="@Roles"
                                         @bind-Value="@CurrentlyEditedEmployee.RoleId"
                                         TextField="@nameof(Role.RoleName)"
                                         ValueField="@nameof(Role.RoleId)"
                                         DefaultText="Select Role">
                        <DropDownListSettings>
                            <DropDownListPopupSettings Height="auto" />
                        </DropDownListSettings>
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
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
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
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
* [Blazor Grid](slug://grid-overview)
