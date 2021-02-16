---
title: Multiple Rows
page_title: TreeList - Multiple Selection
description: Single row selection in the treelist for Blazor.
slug: treelist-selection-multiple
tags: telerik,blazor,treelist,selection,multiple
published: True
position: 2
---

# Multiple Row Selection

The treelist component can allow the user to select many rows at a time, or to select [only one]({%slug treelist-selection-single %}).

In this article:

* [Basics](#basics)
* [Checkbox Selection](#checkbox-selection)
* [Selected Items](#selected-items)
* [Examples](#examples)
	* [Multiple Row Selection and Checkbox](#multiple-row-selection-and-checkbox)
	* [SelectedItemsChanged Event](#selecteditemschanged-event)
	* [Two-way Binding of SelectedItems](#two-way-binding-of-selecteditems)


## Basics

To use **multiple** row selection, set the `SelectionMode` property to `Telerik.Blazor.TreeListSelectionMode.Multiple`.

In Multiple SelectionMode, selection could be made using the following approaches:

* Click on a row to select only that row (and deselect any others)
* Press and hold `Ctrl` and click the desired rows to select or deselect them.
* Click on the starting row of a range of rows you want selected, press and hold `Shift`, and click on the last row of the range. The last selected item is the start point of the range and the current target row is the end of the selection.
* Select the checkbox of each desired row.

>tip The [Examples](#examples) section showcases how you can use the treelist features together.

## Checkbox Selection

To add checkboxes in each row that the user can use for selection, add a `TreeListCheckboxColumn` in the `TreeListColumns` collection of the treelist.

You can force selection to happen only through the checkboxes by setting the `CheckBoxOnlySelection` parameter of the `TreeListCheckboxColumn` to `true`.

The treelist allows selection and deselection via the `SelectAll` property. Setting this property to `true` (its default value) will render a checkbox in the treelist header.

You can add a `SelectAllMode` parameter, which supports the following options:
* `Current` - selects all rows on the current page. This also applies to filtered, sorted, etc. This is the default value of the `SelectAllMode`. Will not select the children of collapsed items - they are not part of the [current Page]({%slug treelist-paging%}) data.
* `All` - selects all the data in the treelist.
  * If IQueriable collections are used, using the header checkbox with in this mode will immediately execute the query over all the data which may be a performance hit.


The selection column also exposes the `SelectChildren` parameter. It controls whether selecting a row with the checkbox will also select its child items. It defaults to `false`

**Usage:**

````CSHTML
<TreeListCheckboxColumn SelectAll="true" SelectAllMode="TreeListSelectAllMode.Current" SelectChildren="true">
</TreeListCheckboxColumn>
````

## Selected Items

The `SelectedItemsChanged` event receives a collection of the treelist data model. It may have no items in it.

You can use the `SelectedItems` collection in two-way binding. You can use this to pre-select rows for your users.

The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the selection.

## Examples

### Multiple Row Selection and Checkbox

You can add a checkbox column for selection. It is required if the `InCell` edit mode is used. Otherwise, it is optional.

>caption Multiple Selection and a checkbox column.

````CSHTML
You can select items by clicking a checkbox, or by clicking the rows. The Ctrl and Shift keys let you select more than one row when clicking it.
<br />
In this example, there is only visual indication of the selection, see the next examples for using the selection data.

<TelerikTreeList Data="@Data"

                 SelectionMode="@TreeListSelectionMode.Multiple"

                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px">
    <TreeListColumns>
    
        <TreeListCheckboxColumn />
        
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="200px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    // sample model

    public class Employee
    {
        public int Id { get; set; }
        public List<Employee> DirectReports { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
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
                DirectReports = new List<Employee>(),
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

### SelectedItemsChanged Event

You can respond to the user action of selecting a new item through the `SelectedItemsChanged` event.

>caption Multiple Selection and handling the SelectedItemsChanged event

````CSHTML
@*Show details for selected items via the selection changed event*@

<TelerikTreeList Data="@Data"

                 SelectionMode="@TreeListSelectionMode.Multiple"
                 SelectedItems="@SelectedItems"
                 SelectedItemsChanged="@( (IEnumerable<Employee> items) => OnSelect(items) )"

                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px">
    <TreeListColumns>
        <TreeListCheckboxColumn />
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="200px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@if (SelectedItems.Any())
{
    <p>Send email to:</p>
    <ul>
    @foreach (Employee item in SelectedItems)
    {
        <li>@item.EmailAddress</li>
    }
    </ul>
}

@code {
    public List<Employee> Data { get; set; }
    public IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();

    protected void OnSelect(IEnumerable<Employee> employees)
    {
        SelectedItems = employees;
    }

    // sample model

    public class Employee
    {
        public int Id { get; set; }
        public List<Employee> DirectReports { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();

        // pre-select some items. Note that this will not automatically select their children
        // regardless of the SelectChildren parameter of the select column
        SelectedItems = Data[0].DirectReports.Take(2).ToList();
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
                DirectReports = new List<Employee>(),
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

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

### Two-way Binding of SelectedItems

You can predefine the selected items for your users through the two-way binding of the `SelectedItems` property. The collection will be updated by the treelist when the selection changes. Note that both binding to the property and using its event cannot be used at the same time, as Blazor only allows one.

>caption Multiple Selection and two-way binding of the `SelectedItems` property

````CSHTML
@*Use the selected items collection*@

<TelerikTreeList Data="@Data"

                 SelectionMode="@TreeListSelectionMode.Multiple"
                 @bind-SelectedItems="@SelectedItems"

                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px">
    <TreeListColumns>
        <TreeListCheckboxColumn SelectChildren="true" />
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="200px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@if (SelectedItems.Any())
{
    <p>Send email to:</p>
    <ul>
    @foreach (Employee item in SelectedItems)
    {
        <li>@item.EmailAddress</li>
    }
    </ul>
}

@code {
    public List<Employee> Data { get; set; }
    public IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();

    // sample model

    public class Employee
    {
        public int Id { get; set; }
        public List<Employee> DirectReports { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();

        // preselect some items. Note that this will not automatically select their children
        // regardless of the SelectChildren parameter of the select column
        SelectedItems = Data[0].DirectReports.Take(2).ToList();
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
                DirectReports = new List<Employee>(),
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

  * [Live Demo: TreeList Selection](https://demos.telerik.com/blazor-ui/treelist/selection)
  * [Live Demo: TreeList Checkbox Selection](https://demos.telerik.com/blazor-ui/treelist/checkbox-selection)
  * [Single Selection]({%slug treelist-selection-single%})
 
