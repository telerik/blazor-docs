---
title: Enabling Checkbox Selection Only in Edit Mode for Blazor TreeList
description: Learn how to show the Checkbox Column in the Telerik Blazor TreeList only during the edit mode and hide it in display mode.
type: how-to
page_title: How to Enable Checkbox Selection Only in Edit Mode in Blazor TreeList
slug: treelist-enable-checkbox-selection-only-edit-mode
tags: treelist, blazor, checkbox, selection, edit mode, visibility, checkboxcolumn
res_type: kb
ticketid: 1657252
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to disable the Checkbox selection in display mode and allow the user to select items only when editing. Is it possible to hide the Checkbox Column in display mode and only show it in the edit mode?

This KB article also answers the following questions:
- How can I toggle the visibility of the Checkbox Column in the Blazor TreeList?
- Is it possible to enable Checkbox selection only during edit mode in TreeList?
- Can I hide the Checkbox Column in display mode for the TreeList?

## Solution

To enable the Checkbox selection only in edit mode in the TreeList component, follow these steps:

1. Enable the [`CheckBoxOnlySelection` parameter]({%slug treelist-columns-checkbox%}#parameters) of the `TreeListCheckboxColumn` to prevent users from selecting rows with a click outside of edit mode.
2. Bind the [`Visible` parameter]({%slug treelist-columns-checkbox%}#parameters) of the `TreeListCheckboxColumn` to a variable. This allows toggling its visibility based on whether the TreeList is in edit mode.
3. Handle the CUD (Create, Update, Delete) events to manage the visibility of the `TreeListCheckboxColumn`.
    - For [`Inline`]({%slug treelist-editing-inline%}) and [`Popup`]({%slug treelist-editing-popup%}) edit modes, this approach works directly. In the [`Incell` edit mode the events flow is a bit different]({%slug treelist-editing-incell%}), so you may need to adjust the logic.

Below is an example implementation that toggles the visibility of the CheckboxColumn:

```CSHTML
@using System.ComponentModel.DataAnnotations @* for the validation attributes *@

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 EditMode="@TreeListEditMode.Inline"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnAdd="@AddItem"
                 OnCreate="@CreateItem"
                 OnEdit="@OnEditHandler"
                 OnCancel="@OnCancelHandler"
                 SelectionMode="@TreeListSelectionMode.Multiple"
                 @bind-SelectedItems="SelectedItems"
                 Pageable="true">
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListCheckboxColumn Visible="@SelectionEnabled" CheckBoxOnlySelection="true"/>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />

        <TreeListCommandColumn Width="280px">
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Update</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

    </TreeListColumns>
</TelerikTreeList>


@code {
    private List<Employee> Data { get; set; }
    private IEnumerable<Employee> SelectedItems { get; set; } = new List<Employee>();

    private bool SelectionEnabled { get; set; }    
    private bool ItemAlreadySelected { get; set; }    

    // Sample CUD operations for the local data
    private async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetTreeListData();

        //Hide CheckboxColumn
        SelectionEnabled = false;
    }

    private async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;
        var parentItem = args.ParentItem as Employee;

        // perform actual data source operations here through your service
        await MyService.Create(item, parentItem);

        // update the local view-model data with the service data
        await GetTreeListData();

        //Hide CheckboxColumn
        SelectionEnabled = false;
    }

    private async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    // OnEdit handler
    private async Task OnEditHandler(TreeListCommandEventArgs args)
    {
        //Show CheckboxColumn
        SelectionEnabled = true;

        Employee empl = args.Item as Employee;

        //Check if the item is already selected, so you do not clear its selection in the OnCancel
        if (SelectedItems.Any(x => x.Id == empl.Id))
        {
            ItemAlreadySelected = true;
        }
        else
        {
            ItemAlreadySelected = false;
        }
    }

    // OnAdd handler
    private async Task AddItem(TreeListCommandEventArgs args)
    {
        //Show CheckboxColumn
        SelectionEnabled = true;
    }

    // OnCancel handler

    private async Task OnCancelHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Item as Employee;

        //Check if the user selected the item during the last edit and cancel it. Leave the selection if the item was previously selected
        if (!ItemAlreadySelected && SelectedItems.Any(x => x.Id == empl.Id))
        {
            SelectedItems = SelectedItems.Where(x => x.Id != empl.Id);
        }

        //Hide CheckboxColumn
        SelectionEnabled = false;
    }

    // sample model

    public class Employee
    {
        public int Id { get; set; }
        [Required]
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
    }

    // data generation

    private async Task GetTreeListData()
    {
        Data = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetTreeListData();
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
}
```

Alternatively, if you prefer not to toggle the `CheckboxColumn` visibility but just disable it, you can apply conditional custom CSS based on the flag that you set in the `OnEdit`/`OnAdd` handlers.

## See Also

- [TreeList Overview]({%slug treelist-overview%})
- [TreeList Editing]({%slug treelist-editing-overview%})
- [TreeList Selection]({%slug treelist-selection-overview%})
