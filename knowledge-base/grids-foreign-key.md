---
title: ForeignKey column
description: How to use a Foreign Key in Telerik Blazor components
type: how-to
page_title: Foreign Key Column
slug: grids-foreign-key
position: 
tags: 
ticketid: 1436233
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor, TreeList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I have foreign keys in my grid data and I want to show data from related tables that is more user friendly (for example, a State name instead of a State ID).

## Solution
There are two approaches you can take:

* Flatten the data so each model has all fields you will need (move fields from the foreign key table to the current grid data source) - this will let the grid show all those fields easily, and also to apply data source operations on them based on their field types (like boolean, date, etc.). 
    * Whether this is feasible, whether it is performant enough and how it will be done is up to the business logic of the application. You may find useful [this article on using nested models]({%slug grid-use-navigation-properties%}), however, so you may be able to add entire model references instead of fully flattening the data.

* Use the various [grid templates]({%slug components/grid/features/templates%}) to show the corresponding information from the foreign key table. You need to fetch that data in the view-model and provide fast synchronous operations for it. One example of this is available below.

>caption Use Foreign Key data in grid columns and templates

````CSHTML
@using Telerik.DataSource
@* using for the custom filters *@

Templates let you extract the data from the foreign key data sources and render it out as desired.
<strong>This extraction should be fast and synchronous, otherwise rendering speed will suffer</strong>.
<br />
You can even group by such a field and you can use the text value too. Note that the grid can calculate
aggregates on the main data source field, so if you want something specific you should calculate it in your
own data source and return it from a service to render in the corresponding header/footer/group template.

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Groupable="true" 
             FilterMode="@GridFilterMode.FilterRow" Sortable="true" OnUpdate="@UpdateHandler">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) Editable="false" Title="ID" Groupable="false" />
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
                    int roleId = (context as Employee).RoleId;
                    <text>@GetRoleNameFromId(roleId)</text>
                }
            </Template>
            <FooterTemplate>
                Total employees: @context.Count
            </FooterTemplate>
            <GroupFooterTemplate>
                Total employees in group: @context.Count
            </GroupFooterTemplate>
            <GroupHeaderTemplate>
                Employees with role @GetRoleNameFromId(int.Parse(context.Value.ToString())) : @context.Count
            </GroupHeaderTemplate>
            <FilterCellTemplate>
                @{
                    theFilterContext = context;
                }

                <TelerikMultiSelect Data="@Roles" @bind-Value="@FilteredRoles" Placeholder="Choose Roles to show" Class="no-x-button"
                                    TextField="@nameof(Role.RoleName)" ValueField="@nameof(Role.RoleId)" AutoClose="false">
                </TelerikMultiSelect>
                <TelerikButton ButtonType="ButtonType.Button"
                               Class="k-clear-button-visible ml-2"
                               Icon="filter"
                               Enabled="@( FilteredRoles.Any() )"
                               OnClick="@(async () =>
                                          {
                                              UpdateFilterDescriptor();
                                              await context.FilterAsync();
                                          })">
                </TelerikButton>
                <TelerikButton ButtonType="ButtonType.Button"
                               Class="k-clear-button-visible ml-2"
                               Icon="filter-clear"
                               Enabled="@( FilteredRoles.Any() )"
                               OnClick="@(async () =>
                                          {
                                              FilteredRoles = new List<int>();
                                              await context.ClearFilterAsync();
                                          })">
                </TelerikButton>
            </FilterCellTemplate>
        </GridColumn>
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <GridAggregates>
        <GridAggregate Field="@nameof(Employee.RoleId)" Aggregate="@GridAggregateType.Count"></GridAggregate>
    </GridAggregates>
</TelerikGrid>

@code {
    List<Employee> MyData { get; set; }
    List<Role> Roles { get; set; } = new List<Role>();
    Employee CurrentlyEditedEmployee { get; set; }
    FilterCellTemplateContext theFilterContext { get; set; }
    List<int> FilteredRoles { get; set; } = new List<int>();

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

    // a helper method to extract the foreign key data that we want to render
    // this needs to be fast and synchronous because each render needs it many times
    string GetRoleNameFromId(int roleId)
    {
        Role matchingPos = Roles.FirstOrDefault(r => r.RoleId == roleId);
        return matchingPos != null ? matchingPos.RoleName : "Unknown";
    }

    // custom filtering - we use a filter template to get the current field values based on the text
    // from the foreign key - the grid only has the current field so it can filter on that only
    // for customized filtering, handle the OnRead event, add the desired descriptors there before
    // sending them to your data service that can handle the special filtering scenario
    void UpdateFilterDescriptor()
    {
        var filterDescriptor = theFilterContext.FilterDescriptor;
        filterDescriptor.FilterDescriptors.Clear();
        filterDescriptor.LogicalOperator = FilterCompositionLogicalOperator.Or;
        foreach (int item in FilteredRoles)
        {
            var descr = new FilterDescriptor("RoleId", FilterOperator.IsEqualTo, item);
            descr.MemberType = typeof(int);
            filterDescriptor.FilterDescriptors.Add(descr);
        }

        //ensure there is at least one blank filter to avoid null reference exceptions
        if (!filterDescriptor.FilterDescriptors.Any())
        {
            filterDescriptor.FilterDescriptors.Add(new FilterDescriptor());
        }
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
                for (int i = 0; i < 30; i++)
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

<style>
    .no-x-button .k-select .k-icon.k-i-close {
        display: none;
    }
</style>
````

## Notes

This article and approach are applicable to the TreeList component as well, its functionality and API are very similar to the Grid component.
