---
title: Enable TreeList Checkbox Selection Only in Edit Mode
description: Learn how to show the Checkbox Column in the Telerik Blazor TreeList only in edit mode and hide it in display mode.
type: how-to
page_title: How to Enable Checkbox Selection Only in Edit Mode in Blazor TreeList
slug: treelist-kb-enable-checkbox-selection-only-edit-mode
tags: treelist, blazor, checkbox, selection, edit mode, visibility, checkboxcolumn
res_type: kb
ticketid: 1657252
components: ["treelist"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeList for Blazor, <br/ > Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:
- How to disable the Checkbox selection in display mode and allow the user to select items only when editing?
- How can I toggle the visibility of the Checkbox Column in the Blazor TreeList?
- Is it possible to enable Checkbox selection only during edit mode in TreeList?
- Can I hide the TreeList Checkbox Column in display mode and only show it in the edit mode?

## Solution

This article suggests two options to disable the TreeList Checkbox selection in display mode and enable it only in edit mode:

* [Solution 1: Toggle the visibility of the CheckboxColumn](#solution-1-toggle-the-visibility-of-the-checkboxcolumn)
* [Solution 2: Disable the CheckboxColumn with CSS](#solution-2-disable-the-checkboxcolumn-with-css)



### Solution 1: Toggle the visibility of the CheckboxColumn

1. Enable the [`CheckBoxOnlySelection` parameter](slug:treelist-columns-checkbox#parameters) of the `TreeListCheckboxColumn` to prevent users from selecting rows with a click outside of edit mode.
2. Bind the [`Visible` parameter](slug:treelist-columns-checkbox#parameters) of the `TreeListCheckboxColumn` to a variable. This allows toggling its visibility based on whether the TreeList is in edit mode.
3. Handle the CUD (Create, Update, Delete) events to manage the visibility of the `TreeListCheckboxColumn`.
    - For [`Inline`](slug:treelist-editing-inline) and [`Popup`](slug:treelist-editing-popup) edit modes, this approach works directly. In the [`Incell` edit mode the events flow is a bit different](slug:treelist-editing-incell), so you may need to adjust the logic.

Below is an example implementation that toggles the visibility of the Checkbox Column:

```CSHTML
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
        <TreeListCheckboxColumn Visible="@SelectionEnabled" CheckBoxOnlySelection="true" />

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
    private List<Employee> Data { get; set; }
    private IEnumerable<Employee> SelectedItems { get; set; } = new List<Employee>();

    private bool SelectionEnabled { get; set; }
    private bool ItemAlreadySelected { get; set; }

    #region CUD operations
    private async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        await MyService.Update(item);

        await GetTreeListData();

        //Hide CheckboxColumn
        SelectionEnabled = false;
    }

    private async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;
        var parentItem = args.ParentItem as Employee;

        await MyService.Create(item, parentItem);

        await GetTreeListData();

        //Hide CheckboxColumn
        SelectionEnabled = false;
    }

    private async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        await MyService.Delete(item);

        await GetTreeListData();
    }

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

    private async Task AddItem(TreeListCommandEventArgs args)
    {
        //Show CheckboxColumn
        SelectionEnabled = true;
    }

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

    #endregion CUD operations
    
    #region Model
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
    }

    #endregion Model

    #region Data generation

    private async Task GetTreeListData()
    {
        Data = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetTreeListData();
    }

    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();

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

        public static void UpdateItemRecursive(List<Employee> items, Employee itemToUpdate)
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

        public static void RemoveChildRecursive(List<Employee> items, Employee item)
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

        public static void InsertItemRecursive(List<Employee> Data, Employee insertedItem, Employee parentItem)
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
    #endregion Data generation
}
```

### Solution 2: Disable the CheckboxColumn with CSS

Alternatively, if you prefer not to toggle the `CheckboxColumn` visibility but just disable it, you can apply conditional custom CSS based on the flag that you set in the `OnEdit`/`OnAdd` handlers.

<div class="skip-repl"></div>
````RAZOR
@if (!SelectionEnabled)
{
    <style>
        .checkbox-in-edit-treelist .k-table-thead th:first-of-type input,
        .checkbox-in-edit-treelist .k-table-row td:first-of-type input {
            pointer-events:none !important;
            opacity: 0.6;
        }
    </style>
}

<TelerikTreeList Data="@Data"
                 Class="checkbox-in-edit-treelist">
    @* Your TreeList configuration here *@
</TelerikTreeList>
````

## See Also

- [TreeList Overview](slug:treelist-overview)
- [TreeList Editing](slug:treelist-editing-overview)
- [TreeList Selection](slug:treelist-selection-overview)
