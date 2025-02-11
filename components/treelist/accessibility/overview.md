---
title: Accessibility Overview
page_title: Telerik UI for Blazor TreeList Documentation | TreeList Accessibility Overview
description: "Get started with the Telerik UI for Blazor TreeList and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,treelist
slug: treelist-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor TreeList component is [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22) and [Section 508](https://www.section508.gov) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component [role](https://www.w3.org/TR/wai-aria/#roles), and is tested against the popular screen readers.

# Blazor TreeList Accessibility Example

WCAG 2.2 introduces the ["Dragging Movements"](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

In our illustrative example below, we've showcased the column reorder actions, achievable through our Column Menu functionality. We've demonstrated also the row reordering achievable through our [Context Menu](slug:contextmenu-integration#context-menu-for-a-grid-row). Our goal is to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the TreeList component](slug:grid-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug:accessibility-overview#color-contrast).

>caption TreeList accessibility compliance example

````RAZOR
@*Evaluate the example with Axe Core or other accessibility tools*@

@using System.Collections.Generic
@using System.Collections.ObjectModel
@using Telerik.SvgIcons

<TelerikContextMenu @ref="@ContextMenuRef"
                    Data="@MenuItems"
                    OnClick="@((MenuItem item) => ContextMenuClickHandler(item))">
    <ItemTemplate Context="item">
        @{
            <TelerikSvgIcon Icon="@item.Icon" />
            <div>@item.Text</div>

            @if (item.CommandName == "ReorderRow")
            {
                <div style="margin-left: 5px;">
                    <TelerikSvgIcon Icon="@SvgIcon.WindowRestore" />
                </div>
            }
        }
    </ItemTemplate>
</TelerikContextMenu>

<TelerikDialog @bind-Visible="@Visible"
               Class="dialog-btn-formatting"
               Width="300px"
               Title="Reorder Item">
    <DialogContent>
        Move row <strong>@($"{OriginIndex} {ReorderItem.Name}")</strong>:
        <TelerikRadioGroup Data="@RadioOptions"
                           @bind-Value="@RadioValue"
                           ValueField="@nameof(RadioModel.Id)"
                           TextField="@nameof(RadioModel.Text)">
            <ItemTemplate>
                @{
                    var item = context as RadioModel;
                }

                @if (item.Id == 1)
                {
                    <span>@item.Text</span>
                    <TelerikDropDownList Width="190px"
                                     Data="@RowsList"
                                     @bind-Value="@RowBefore"
                                     OnChange="@BeforeChangeHandler"
                                     AriaLabel="Select Row"
                                     DefaultText="-Select row-"
                                     TextField="MyTextField"
                                     ValueField="MyValueField">
                    </TelerikDropDownList>
                }
                else if (item.Id == 2)
                {
                    <span>@item.Text</span>
                    <TelerikDropDownList Width="190px"
                                     Data="@RowsList"
                                     @bind-Value="@RowAfter"
                                     OnChange="@AfterChangeHandler"
                                     DefaultText="-Select row-"
                                     AriaLabel="Select Row"
                                     TextField="MyTextField"
                                     ValueField="MyValueField">
                    </TelerikDropDownList>
                }
                else if (item.Id == 3)
                {
                    <span>@item.Text</span>
                    <TelerikDropDownList Width="170px"
                                     Data="@RowsList"
                                     @bind-Value="@RowParent"
                                     OnChange="@ParentChangeHandler"
                                     DefaultText="-Select parent-"
                                     AriaLabel="Select parent row"
                                     TextField="MyTextField"
                                     ValueField="MyValueField">
                    </TelerikDropDownList>
                }
                else
                {
                    <span>@item.Text</span>
                    <TelerikNumericTextBox @bind-Value="@DestinationIndex"
                                       Width="40%"
                                       AriaLabel="Select Destination Index" />
                }
            </ItemTemplate>
        </TelerikRadioGroup>
    </DialogContent>
    <DialogButtons>
        <TelerikButton AriaLabel="Confirm Reorder" OnClick="@OnApplyClick" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"><TelerikSvgIcon Icon="@SvgIcon.Check" /><span style="margin-left: 5px;">Reorder</span></TelerikButton>
        <TelerikButton AriaLabel="Cancel Reorder" OnClick="@(() => { Visible = false; })"><TelerikSvgIcon Icon="@SvgIcon.CancelOutline" /><span style="margin-left: 5px;">Cancel</span></TelerikButton>
    </DialogButtons>
</TelerikDialog>

<style>
    .dialog-btn-formatting .k-actions-stretched > * {
        flex: 0;
    }
</style>

<TelerikTreeList @ref="@TreeListRef"
                 Data="@TreeListData"
                 Navigable="true"
                 Reorderable="true"
                 ShowColumnMenu="true"
                 EditMode="@TreeListEditMode.Inline"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnCreate="@CreateItem"
                 OnEdit="@OnEditHandler"
                 OnCancel="@OnCancelHandler"
                 OnRowContextMenu="@OnContextMenu"
                 SelectionMode="@TreeListSelectionMode.Multiple"
                 @bind-SelectedItems="@SelectedItems"
                 Pageable="true" ItemsField="@(nameof(Employee.DirectReports))"
                 Width="850px">
    <TreeListSettings>
        <TreeListColumnMenuSettings Lockable="false"
                                    Reorderable="true"
                                    FilterMode="@ColumnMenuFilterMode.None">
        </TreeListColumnMenuSettings>
    </TreeListSettings>
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />

        <TreeListCommandColumn Width="280px">
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee> TreeListRef { get; set; }
    private List<RadioModel> RadioOptions { get; set; }
    private int RadioValue { get; set; }

    private List<MyDdlModel> RowsList { get; set; }
    private int? RowAfter { get; set; }
    private int? RowBefore { get; set; }
    private int? RowParent { get; set; }

    //data sources
    public List<Employee> TreeListData { get; set; }
    private List<MenuItem> MenuItems { get; set; }
    private IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();
    //metadata for the context menu actions
    private Employee SelectedPerson { get; set; }
    //component references so we can use their methods
    private TelerikContextMenu<MenuItem> ContextMenuRef { get; set; }

    private int DestinationIndex { get; set; }
    private int OriginIndex { get; set; }
    private bool Visible { get; set; }
    private Employee ReorderItem { get; set; }

    private void BeforeChangeHandler(object theUserInput)
    {
        if ((int)theUserInput == 0 || (int)theUserInput == OriginIndex)
        {
            RowBefore = default;
        }
    }

    private void AfterChangeHandler(object theUserInput)
    {
        if ((int)theUserInput == RowsList.Count - 1 || (int)theUserInput == OriginIndex)
        {
            RowAfter = default;
        }
    }

    private void ParentChangeHandler(object theUserInput)
    {
        if ((int)theUserInput == RowsList.Count - 1)
        {
            RowParent = default;
        }
    }

    private async Task OnApplyClick()
    {
        if (RadioValue == 1)
        {
            if (RowBefore != default)
            {
                int indexOfRowBefore = (RowBefore ?? 0);
                InsertItemAtDestination(TreeListData, indexOfRowBefore, ReorderItem);

                RefreshDropDownListData();
                TreeListRef.Rebind();

                DestinationIndex = default;
                ReorderItem = default;
                Visible = false;
            }
        }
        else if (RadioValue == 2)
        {
            if (RowAfter != default)
            {
                int indexOfRowAfter = (RowAfter ?? 0) + 1;
                InsertItemAtDestination(TreeListData, indexOfRowAfter, ReorderItem);

                RefreshDropDownListData();
                TreeListRef.Rebind();

                ResetAllIds(TreeListData, 1);

                DestinationIndex = default;
                ReorderItem = default;
                Visible = false;
            }
        }
        else if (RadioValue == 3)
        {
            if (RowParent != default)
            {
                Employee parent = FindEmployeeById(TreeListData, RowParent);
                RemoveItemAtOriginalPosition(TreeListData, ReorderItem);
                if (parent != null)
                {
                    if (parent.DirectReports != null)
                    {
                        parent.DirectReports.Add(ReorderItem);
                    }
                    else
                    {
                        parent.DirectReports = new List<Employee>();
                        parent.DirectReports.Add(ReorderItem);
                    }
                    parent.HasChildren = true;
                    ResetAllIds(TreeListData, 1);
                }

                RefreshDropDownListData();
                TreeListRef.Rebind();

                DestinationIndex = default;
                ReorderItem = default;
                Visible = false;
            }
        }
        else
        {
            if (DestinationIndex >= 0)
            {
                InsertItemAtDestination(TreeListData, DestinationIndex, ReorderItem);

                RefreshDropDownListData();
                TreeListRef.Rebind();

                DestinationIndex = default;
                ReorderItem = default;
                Visible = false;
            }
        }
    }

    // Helper method to find an employee by Id in the tree
    private Employee FindEmployeeById(List<Employee> employees, int? targetId)
    {
        foreach (var employee in employees)
        {
            if (employee.Id == targetId)
            {
                return employee;
            }

            if (employee.DirectReports != null)
            {
                // Recursively search in child employees
                var foundInChild = FindEmployeeById(employee.DirectReports, targetId);
                if (foundInChild != null)
                {
                    return foundInChild;
                }
            }
        }

        return null;
    }

    private bool RemoveItemAtOriginalPosition(List<Employee> employees, Employee item)
    {
        // Try to remove the item from the current list
        if (employees.Remove(item))
        {
            return true;
        }

        // If the item was not found in the current list, recursively search in child employees
        foreach (var employee in employees)
        {
            if (employee.DirectReports != null)
            {
                if (RemoveItemAtOriginalPosition(employee.DirectReports, item))
                {
                    return true;
                }
            }
        }

        return false;
    }

    private void InsertItemAtDestination(List<Employee> employees, int destinationId, Employee reorderItem)
    {
        for (int i = 0; i < employees.Count; i++)
        {
            if (employees[i].Id == destinationId)
            {
                RemoveItemAtOriginalPosition(TreeListData, reorderItem);
                employees.Insert(i, reorderItem);
                ResetAllIds(TreeListData, 1);
                return;
            }

            if (employees[i].DirectReports?.Count > 0)
            {
                InsertItemAtDestination(employees[i].DirectReports, destinationId, reorderItem);

                // If the item has been inserted in child reports, we need to refresh the IDs
                ResetAllIds(TreeListData, 1);

                return;
            }
        }

        // If the destination ID is not found, we add the item at the end
        employees.Add(reorderItem);
        RemoveItemAtOriginalPosition(TreeListData, reorderItem);
        ResetAllIds(TreeListData, 1);
    }

    private async Task OnContextMenu(TreeListRowClickEventArgs args)
    {
        var argsItem = args.Item as Employee;

        SelectedPerson = argsItem;

        if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            await ContextMenuRef.ShowAsync(mouseEventArgs.ClientX, mouseEventArgs.ClientY);
        }
    }

    // sample handling of the context menu click
    private async Task ContextMenuClickHandler(MenuItem item)
    {
        if (item.Action != null)
        {
            item.Action.Invoke();
        }
        else
        {
            ReorderItem = SelectedPerson;

            var state = TreeListRef.GetState();
            switch (item.CommandName)
            {
                case "Add":
                    state.InsertedItem = new Employee() { Name = "New Record" };
                    await TreeListRef.SetStateAsync(state);
                    break;
                case "Edit":
                    Employee originalEmployee = FindItemRecursive(TreeListData, SelectedPerson.Id);
                    Employee employeeToEdit = Employee.GetClonedInstance(originalEmployee);

                    state.EditItem = employeeToEdit;
                    state.OriginalEditItem = originalEmployee;
                    await TreeListRef.SetStateAsync(state);
                    break;
                case "Delete":
                    await MyService.Delete(SelectedPerson);
                    TreeListRef.Rebind();
                    break;
                case "ReorderRow":
                    Visible = true;
                    OriginIndex = SelectedPerson.Id;
                    break;
                default:
                    break;
            }
        }

        SelectedPerson = null; // clean up
    }

    private async Task GetTreeListData()
    {
        TreeListData = await MyService.Read();
    }

    // refresh treelist rows ids
    private int ResetAllIds(List<Employee> employees, int currentId)
    {
        foreach (var employee in employees)
        {
            employee.Id = currentId++;

            if (employee.DirectReports != null)
            {
                // Recursively reset ids for child employees
                currentId = ResetAllIds(employee.DirectReports, currentId);
            }
        }

        return currentId;
    }

    // refresh dropdownlist data
    private void RefreshDropDownListData()
    {
        RowsList = new List<MyDdlModel>();
        foreach (var employee in TreeListData)
        {
            AddEmployeeToRowsList(employee);
        }
    }

    // generate data
    protected override async Task OnInitializedAsync()
    {
        // context menu items
        MenuItems = new List<MenuItem>()
        {
            new MenuItem(){ Text = "Add", Icon = SvgIcon.Plus, CommandName = "Add" },
            new MenuItem(){ Text = "Edit", Icon = SvgIcon.Pencil, CommandName = "Edit" },
            new MenuItem(){ Text = "Delete", Icon = SvgIcon.Trash, CommandName = "Delete" },
            new MenuItem(){ Text = "Reorder row", Icon = SvgIcon.CaretAltExpand, CommandName = "ReorderRow" }
        };

        // radiogroup options
        RadioOptions = new List<RadioModel>()
        {
            new RadioModel { Id = 1, Text = "Before:" },
            new RadioModel { Id = 2, Text = "After:" },
            new RadioModel { Id = 3, Text = "As child of:" },
            new RadioModel { Id = 4, Text = "At position:" },
        };

        RadioValue = 1;

        // generate data for the TreeList
        await GetTreeListData();

        RowsList = new List<MyDdlModel>();
        foreach (var employee in TreeListData)
        {
            AddEmployeeToRowsList(employee);
        }
    }

    private void AddEmployeeToRowsList(Employee employee)
    {
        RowsList.Add(new MyDdlModel { MyValueField = employee.Id, MyTextField = $"{employee.Name}" });

        if (employee.DirectReports != null)
        {
            foreach (var directReport in employee.DirectReports)
            {
                AddEmployeeToRowsList(directReport);
            }
        }
    }

    private Employee FindItemRecursive(List<Employee> items, int? id)
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

    #region TreeList CUD
    private async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        await MyService.Update(item);

        await GetTreeListData();
    }

    private async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;
        var parentItem = args.ParentItem as Employee;

        await MyService.Create(item, parentItem);

        await GetTreeListData();
    }

    private async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        await MyService.Delete(item);

        await GetTreeListData();
    }

    private async Task OnEditHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Item as Employee;
    }

    private async Task OnCancelHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Item as Employee;
    }
    #endregion

    #region Models
    // sample menu item class
    public class MenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public Action Action { get; set; }
        public string CommandName { get; set; }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<Employee> DirectReports { get; set; }
        public bool HasChildren { get; set; }

        // Used for the editing so replacing the object in the view-model data
        // will treat it as the same object and keep its state - otherwise it will
        // collapse after editing is done, which is not what the user would expect
        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.Id == (obj as Employee).Id;
            }
            return false;
        }

        public Employee()
        {

        }

        public Employee(Employee itmToClone)
        {
            this.Id = itmToClone.Id;
            this.Name = itmToClone.Name;
        }

        public static Employee GetClonedInstance(Employee itmToClone)
        {
            return new Employee(itmToClone);
        }

        public override int GetHashCode() { return base.GetHashCode(); }
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();
        // used in this example for data generation and retrieval for CUD operations on the current view-model data
        private static int LastId { get; set; } = 1;

        public static async Task Create(Employee itemToInsert, Employee parentItem)
        {
            InsertItemRecursive(_data, itemToInsert, parentItem);
        }

        public static async Task<List<Employee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 15; i++)
                {
                    Employee root = new Employee
                        {
                            Id = LastId,
                            Name = $"root: {i}",
                            EmailAddress = $"{i}@example.com",
                            HireDate = DateTime.Now.AddYears(-i),
                            DirectReports = new List<Employee>(),
                            HasChildren = true
                        };
                    _data.Add(root);
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
                                    EmailAddress = $"{nestedId}@example.com",
                                    HireDate = DateTime.Now.AddMinutes(-nestedId)
                                }); ;
                            LastId++;
                        }
                    }
                }

                _data[0].Name += " (non-editable, see OnEdit)";
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            UpdateItemRecursive(_data, itemToUpdate);
        }

        public static async Task Delete(Employee itemToDelete)
        {
            RemoveChildRecursive(_data, itemToDelete);
        }

        // sample helper methods for handling the view-model data hierarchy
        static void UpdateItemRecursive(List<Employee> items, Employee itemToUpdate)
        {
            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Id.Equals(itemToUpdate.Id))
                {
                    items[i] = itemToUpdate;
                    return;
                }

                if (items[i].DirectReports?.Count > 0)
                {
                    UpdateItemRecursive(items[i].DirectReports, itemToUpdate);
                }
            }
        }

        static void RemoveChildRecursive(List<Employee> items, Employee item)
        {
            for (int i = 0; i < items.Count(); i++)
            {
                if (item.Equals(items[i]))
                {
                    items.Remove(item);

                    return;
                }
                else if (items[i].DirectReports?.Count > 0)
                {
                    RemoveChildRecursive(items[i].DirectReports, item);

                    if (items[i].DirectReports.Count == 0)
                    {
                        items[i].HasChildren = false;
                    }
                }
            }
        }

        static void InsertItemRecursive(List<Employee> Data, Employee insertedItem, Employee parentItem)
        {
            insertedItem.Id = LastId++;
            if (parentItem != null)
            {
                parentItem.HasChildren = true;
                if (parentItem.DirectReports == null)
                {
                    parentItem.DirectReports = new List<Employee>();
                }

                parentItem.DirectReports.Insert(0, insertedItem);
            }
            else
            {
                Data.Insert(0, insertedItem);
            }
        }
    }

    public class RadioModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }

    //in a real case, the model is usually in a separate file
    //the model type and value field type must be provided to the dropdpownlist
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
    #endregion
}
````

## See also
 * [Live demo: TreeList Accessibility](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation)