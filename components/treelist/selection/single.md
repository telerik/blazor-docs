---
title: Single Row
page_title: TreeList - Single Selection
description: Single row selection in the treelist for Blazor.
slug: treelist-selection-single
tags: telerik,blazor,treelist,selection,single
published: True
position: 1
---

# Single Row Selection

The treelist component can allow the user to select only a single row at a time, or to select [multiple]({%slug treelist-selection-multiple %}).

In this article:


* [Basics](#basics)
* [Checkbox Selection](#checkbox-selection)
* [Selected Items](#selected-items)
* [Examples](#examples)
	* [Single Row Selection and Checkbox](#single-row-selection-and-checkbox)
	* [SelectedItemsChanged Event](#selecteditemschanged-event)
	* [Two-way Binding of SelectedItems](#two-way-binding-of-selecteditems)


## Basics

To use **single** row selection, set the `SelectionMode` property to `Telerik.Blazor.TreeListSelectionMode.Single`.

To un-select the item, click its checkbox again, or hold the `Ctrl` key and click/tap the row.

>tip The [Examples](#examples) section showcases how you can use the treelist features together.

## Checkbox Selection

In Single SelectionMode, selection is applied with a click on a row, or by clicking a checkbox if the `TreeListCheckboxColumn` is present in the `TreeListColumns` collection of the treelist.

Only one row can be selected at a time, even with checkboxes enabled, so the last one that is clicked will be selected.

If you add a checkbox column, you should set its `SelectAll` parameter to `false` to disable the header checkbox that will select all rows.

## Selected Items

The `SelectedItemsChanged` event receives a collection of the treelist data model that has one member only.

You can use the `SelectedItems` collection in two-way binding. You can use this to pre-select a row for your users.

The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated.

If the collection has more than one item in it, the treelist will use the last item to select the row in single selection mode.

## Examples

### Single Row Selection and Checkbox

You can add a checkbox column for single selection. It is required if the `InCell` edit mode is used. Otherwise, it is optional.

>caption Single Selection and a checkbox column.

````CSHTML
@* Single selection can be done by clicking a row or through a checkbox *@

<TelerikTreeList Data="@Data"

                 SelectionMode="@TreeListSelectionMode.Single"

                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px">
    <TreeListColumns>
    
        <TreeListCheckboxColumn SelectAll="false" Title="Select" />
        
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
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

    // used in this example for data generation
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

The example below shows how to handle the `SelectedItemsChanged` event to extract information about the selected item and use it to populate a second treelist with details about the selected record.

>caption Single Selection and handling the SelectedItemsChanged event

````CSHTML
@* Use the selection change event to show detail data *@

<TelerikTreeList Data="@Data"

                 SelectionMode="@TreeListSelectionMode.Single"
                 SelectedItems="@SelectedItems"
                 SelectedItemsChanged="@( (IEnumerable<Employee> items) => OnSelect(items) )"

                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px">
    <TreeListColumns>
        <TreeListCheckboxColumn SelectAll="false" />
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="200px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@if (SelectedEmployee != null)
{
    <p>
        Send private message to:
        @SelectedItems.ToList()[0].Name
    </p>
}

@code {
    public List<Employee> Data { get; set; }
    public IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();

    Employee SelectedEmployee { get; set; }

    protected void OnSelect(IEnumerable<Employee> employees)
    {
        SelectedEmployee = employees.FirstOrDefault();
        // update the collection so that the treelist can highlight the correct item
        // when two-way binding is used this happens automatically, but the framework does not allow two-way binding and the event at the same time
        SelectedItems = new List<Employee> { SelectedEmployee };
        
        // note: an async operation here can break the selection and may not even render its results in the view
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

    // used in this example for data generation
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();

        // preselect an item
        SelectedEmployee = Data[0].DirectReports[1];
        SelectedItems = new List<Employee> { SelectedEmployee };
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

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

### Two-way Binding of SelectedItems

You can predefine the selected item for your users through the two-way binding of the `SelectedItems` property. The collection will be updated by the treelist when the selection changes. Note that both binding to the property and using its event cannot be used at the same time, as Blazor only allows one.

>caption Single Selection and two-way binding of the `SelectedItems` property

````CSHTML
@*Use the selected items collection*@

<TelerikTreeList Data="@Data"

                 SelectionMode="@TreeListSelectionMode.Single"
                 @bind-SelectedItems="@SelectedItems"

                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px">
    <TreeListColumns>
        <TreeListCheckboxColumn SelectAll="false" />
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="200px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@if (SelectedItems.Any())
{
    <p>
        Send private message to:
        @SelectedItems.ToList()[0].Name
    </p>
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

    // used in this example for data generation
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();

        // preselect an item
        SelectedItems = Data[0].DirectReports.Take(1).ToList();
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
  * [Multiple Selection]({%slug treelist-selection-multiple%})
