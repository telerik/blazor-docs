---
title: Reusable Grid Columns with Templates
description: Learn how to encapsulate GridColumn, including templates, into a reusable component for Telerik UI for Blazor Grid.
type: how-to
page_title: How to Make Reusable GridColumn Components with Templates in Blazor
slug: grid-kb-create-reusable-columns
tags: grid, blazor, gridcolumn, reusable component, templates, editor template
res_type: kb
ticketid: 1671641
---

## Description
This knowledge base article answers the following questions:
- How can I create a reusable `GridColumn` component in Blazor?
- What is the best way to encapsulate `GridColumn` templates in a reusable component?

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Grid for Blazor</td>
	    </tr>
    </tbody>
</table>

## Solution
To create a reusable `GridColumn` component with templates, follow these steps:

1. Define a custom column component that accepts parameters for the field, title, whether it uses templates, and the currently edited item.

2. Within the custom component, conditionally render a `GridColumn` with or without templates based on the provided parameters.

<div class="skip-repl"></div>
````Index.razor
<TelerikGrid Data="@MyData" EditMode="@GridEditMode.Incell" Pageable="true" OnUpdate="@UpdateHandler">
    <GridColumns>
        <CustomColumn TItem="@Employee" Field="@(nameof(Employee.ID))"></CustomColumn>
        <CustomColumn TItem="@Employee" Field="@(nameof(Employee.Name))"></CustomColumn>
        <CustomColumn TItem="@Employee" EditedEmployee="@CurrentlyEditedEmployee" IsTemplate="@true" Field=@nameof(Employee.RoleId) Title="Position"></CustomColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> MyData { get; set; }
    private Employee CurrentlyEditedEmployee { get; set; }

    private async Task UpdateHandler(GridCommandEventArgs args)
    {
        Employee item = (Employee)args.Item;

        await MyService.Update(item);

        await GetGridData();
    }

    private async Task GetGridData()
    {
        MyData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();

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
                        RoleId = i % 4
                    });
                }
            }

            return await Task.FromResult(_data);
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
````CustomColumn.razor
@typeparam TItem

@if (IsTemplate)
{
    <GridColumn Field="@Field" Title="@Title">
        <Template>
            @{
                int roleId = (context as Employee).RoleId;
                Role matchingPos = Roles.FirstOrDefault(r => r.RoleId == roleId);
                string textToRender = matchingPos != null ? matchingPos.RoleName : "Unknown";
                <text>@textToRender</text>
            }
        </Template>
        <EditorTemplate>
            @{
                EditedEmployee = context as Employee;
                <TelerikDropDownList Data="@Roles"
                                     @bind-Value="@EditedEmployee.RoleId"
                                     TextField="@nameof(Role.RoleName)"
                                     ValueField="@nameof(Role.RoleId)"
                                     DefaultText="Select Role">
                    <DropDownListSettings>
                        <DropDownListPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>
            }
        </EditorTemplate>
    </GridColumn>
}
else
{
    <GridColumn Field="@Field"></GridColumn>
}

@code {
    [Parameter]
    public string Field { get; set; }
    
    [Parameter]
    public string Title { get; set; }

    [Parameter]
    public bool IsTemplate { get; set; }

    [Parameter]
    public Employee EditedEmployee { get; set; }

    private List<Role> Roles { get; set; } = new List<Role>
    {
        new Role { RoleId = 1, RoleName = "Manager" },
        new Role { RoleId = 2, RoleName = "Employee" },
        new Role { RoleId = 3, RoleName = "Contractor" },
    };
}
````
````Employee.cs
public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int RoleId { get; set; }
    }
````
````Role.cs
public class Role
{
    public int RoleId { get; set; }
    public string RoleName { get; set; }
}
````

## See Also

- [Grid Columns]({%slug components/grid/columns/bound%})
- [Grid Templates]({%slug components/grid/features/templates%})
