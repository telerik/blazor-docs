---
title: Edit the Selected Item From the ToolBar
description: How to edit the Selected Item from the toolbar.
type: how-to
page_title: Edit the Selected Item From the ToolBar
slug: grid-edit-selected-item
position: 
tags: 
ticketid: 1499119
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I would like to edit the selected item in the Grid when the `GridSelectionMode` is set to `Single`. The buttons for editing, deleting, saving and canceling the operation should be located in the `GridToolBar` rather than on each row.

## Solution

You can use the regular [TelerikButton]({%slug components/button/overview%}) and the [Grid State]({%slug grid-state%}). Below you can see a detailed step by step explanation and a sample implementation.

### Step by Step Explanation

1. Create a new instance of the class you bound the Grid to in order to contain the information for the selected item.

1. Use one-way data binding for the [SelectedItems]({%slug components/grid/selection/single%}) parameter and in the handler for the [SelectedItemsChanged]({%slug grid-events%}#selecteditemschanged) populate the instance of the class created in the previous point.

1. Enable the `Edit` and `Delete` buttons when the selected item is not `null` by using the `Enabled` parameter for the `TelerikButton`.

1. Add a `bool` flag that would allow you to determine if the Grid is in Edit mode.

1. Based on the flag created in the previous point conditionally show the `Save` and `Cancel` buttons.

1. Toggle the value of the `bool` flag in the respective methods.


### Sample Implementation

````CSHTML
@*Edit the SelectedItem with buttons located in the GridToolBar*@

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             SelectedItemsChanged="@((IEnumerable<Employee> employeeList) => OnSelect(employeeList))"
             SelectedItems="@SelectedItems"
             OnRowClick="@OnRowClickHandler"
             Pageable="true"
             Height="300px"
             @ref="@GridRef">
    <GridToolBar>
        <TelerikButton Enabled="@(SelectedEmployee != null)" OnClick="@EditEmployee">Edit</TelerikButton>
        <TelerikButton Enabled="@(SelectedEmployee != null)" OnClick="@DeleteEmployee">Delete</TelerikButton>
        @if (isInEdit)
        {
            <TelerikButton OnClick="@SaveEmployee">Save</TelerikButton>
            <TelerikButton OnClick="@CancelEdit">Cancel</TelerikButton>
        }
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }
    public IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();
    public bool isInEdit { get; set; }
    TelerikGrid<Employee> GridRef { get; set; }

    public Employee SelectedEmployee { get; set; }

    async Task OnRowClickHandler(GridRowClickEventArgs args)
    {
        await CancelEdit();
    }

    protected void OnSelect(IEnumerable<Employee> employees)
    {
        SelectedEmployee = employees.FirstOrDefault();

        SelectedItems = new List<Employee> { SelectedEmployee };
    }

    async Task EditEmployee()
    {
        isInEdit = true;
        var currentState = GridRef.GetState();
        currentState.InsertedItem = null;

        Employee itemToEdit = Employee.GetClonedInstance(GridData.Where(itm => itm.EmployeeId == SelectedEmployee.EmployeeId).FirstOrDefault());

        currentState.OriginalEditItem = itemToEdit;

        await GridRef.SetState(currentState);
    }

    async Task SaveEmployee()
    {
        var currentState = GridRef.GetState();

        int indexOfEditedItem = GridData.IndexOf(SelectedEmployee);

        // perform database operation here

        GridData[indexOfEditedItem] = currentState.OriginalEditItem;

        currentState.OriginalEditItem = default;
        currentState.EditItem = default;

        await GridRef.SetState(currentState);

        isInEdit = false;
    }

    async Task DeleteEmployee()
    {
        GridData.Remove(SelectedEmployee); // call your database delete method here

        GridData = new List<Employee>(GridData); // changing the reference of the collection so that the Grid renders with the new data
    }

    async Task CancelEdit()
    {
        var currentState = GridRef.GetState();

        currentState.OriginalEditItem = default;
        currentState.EditItem = default;

        await GridRef.SetState(currentState);

        isInEdit = false;
    }

    protected override async Task OnInitializedAsync()
    {

        GridData = new List<Employee>();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        
        // example of comparing stored items (from editing or selection)
        // with items from the current data source - IDs are used instead of the default references

        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.EmployeeId == (obj as Employee).EmployeeId;
            }
            return false;
        }


        // define constructors and a static method so we can deep clone instances
        // we use that to define the edited item - otherwise the references will point
        // to the item in the grid data sources and all changes will happen immediately on
        // the Data collection, and we don't want that - so we need a deep clone with its own reference
        // this is just one way to implement this, you can do it in a different way
        
        public Employee()
        {

        }

        public Employee(Employee itmToClone)
        {
            this.EmployeeId = itmToClone.EmployeeId;
            this.Name = itmToClone.Name;
            this.Team = itmToClone.Team;
        }

        public static Employee GetClonedInstance(Employee itmToClone)
        {
            return new Employee(itmToClone);
        }
    }
}
````
