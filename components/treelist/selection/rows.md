---
title: Row Selection
page_title: TreeList - Rows Selection
description: Learn how to select row in Blazor TreeList component. Explore the selected rows. Discover row selection bevahior when combined with other TreeList features. Try the practical sample code for row selection.
slug: treelist-selection-rows
tags: telerik,blazor,treelist,selection,rows
previous_url: /treelist-selection-single,/treelist-selection-multiple
position: 3
---

# Row Selection

The TreeList component offers support for single or multiple row selection. You can select a row with mouse click and through checkbox column. You can access the collection of selected rows, use this collection and manipulate it. You can follow and respond to the event of selection.

In this article:

* [Rows Selection Options](#rows-selection-options)
	* [Click Selection](#click-selection)
	* [Checkbox Selection](#checkbox-selection)
* [Selected Rows](#selected-rows)
	* [Selected Rows When Data Changes](#selected-rows-when-data-changes)
	* [Selected Rows Equals Comparison](#selected-rows-equals-comparison)
* [SelectedItemsChanged](#selecteditemschanged)
	* [SelectedItemsChanged and Asynchronous Operations](#selecteditemschanged-and-asynchronous-operations)
* [Row Selection and Other TreeList Features](#row-selection-and-other-treelist-features)
    * [Selection with Editing Modes](#selection-with-editing-modes)
    * [Selection in TreeList with virtualized rows](#selection-in-treelist-with-virtualized-rows)
    * [Selection and TreeList Paging](#selection-and-treelist-paging)
    * [Selection in Template](#selection-in-template)
    * [Selection and Row Drag and Drop](#selection-and-row-drag-and-drop)

## Rows Selection Options

By default you can [click](#click-selection) on the row to select it. Additionally, you can have a [checkbox selection](#checkbox-selection). The checkbox selection allows the user to select the row through a dedicated on the row checkbox. You can combine click and checkbox selection or use only one selection option.

You can use row selection with both [selection modes]({%slug treelist-selection-overview%}#selection-mode)—single and multiple.

### Click Selection

By default, users can select rows by clicking anywhere in the row, except on the command buttons.

To select multiple rows, hold down the `Ctrl` or `Shift` key to extend the selection:
* Press and hold `Ctrl` and click the desired rows to select or deselect them.
* Click on the starting row in a range of rows that you want to select, press and hold `Shift`, and click on the last row in the range. The first selected row is the starting point of the range and the last selected row is the end of the selection.

If you release the `Ctrl` or the `Shift` keys and click to start new multiple selection, the previously selected rows will be deselected.

>caption Click selection and single selection mode

````CSHTML
Click on one row to select it.

<TelerikTreeList Data="@Data"
                 SelectionMode="@TreeListSelectionMode.Single"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="Name" />
        <TreeListColumn Field="Id" />
        <TreeListColumn Field="EmailAddress" />
        <TreeListColumn Field="HireDate" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<Employee>();
        for (int i = 1; i < 15; i++)
        {
            Data.Add(new Employee()
                {
                    Id = i,
                    Name = "Employee " + i.ToString(),
                    EmailAddress = $"{i}@example.com",
                    HireDate = DateTime.Now.AddYears(-i),
                });
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

### Checkbox Selection

You can also render a checkbox column that allows users to select and deselect rows. To use checkbox selection, add a [`TreeListCheckboxColumn`]({%slug treelist-columns-checkbox%}) in the `TreeListColumns` collection of the TreeList. The `TreeListCheckboxColumn` provides [additional configuration settings related to selection]({%slug treelist-columns-checkbox%}#parameters).

To deselect the row, click its checkbox again.

>caption Checkbox selection and multiple selection mode

````CSHTML
@if (CheckBoxOnlySelection)
{
    <div>You can <strong>click only the checkbox itself</strong> to select or deselect the row. You cannot click the entire row.</div>
}
else
{
    <div>You can <strong>click both the checkbox or the row</strong> to select or deselect the row.</div>
}
<br />
<TelerikCheckBox @bind-Value="@CheckBoxOnlySelection"
                 Id="@CheckboxId" />
<label for="@CheckboxId">Toggle checkbox only selection</label>
<br />
<br />
<TelerikTreeList Data=@Data
                 SelectionMode="@TreeListSelectionMode.Multiple"
                 Pageable="true">
    <TreeListColumns>
        <TreeListCheckboxColumn SelectAll="@ShouldSelectAll" CheckBoxOnlySelection="@CheckBoxOnlySelection"></TreeListCheckboxColumn>
        <TreeListColumn Field="EmployeeId" />
        <TreeListColumn Field="Name" />
        <TreeListColumn Field="Team" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee> Data { get; set; }

    private bool ShouldSelectAll { get; set; } = true;
    private bool CheckBoxOnlySelection { get; set; }

    private string CheckboxId { get; set; } = "checkboxOnlySelection";

    protected override void OnInitialized()
    {
        Data = new List<Employee>();
        for (int i = 0; i < 15; i++)
        {
            Data.Add(new Employee()
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
    }
}
````

## Selected Rows

* You can get or set the selected rows through the `SelectedItems` property. It is a collection of the [TreeList's `Data`]({%slug treelist-data-binding-overview%}) model.
* You can use the `SelectedItems` collection in two-way binding. You can predefine the selected item for your users through the two-way binding of the `SelectedItems` property. The collection will be updated by the TreeList when the selection changes.

### Selected Rows When Data Changes

When the TreeList `Data` collection changes, the `SelectedItems` collection has the following behavior:

* When you update a selected item in the TreeList, you have to make the same update in the `SelectedItems` collection through the TreeList [editing events]({%slug treelist-editing-overview%}).
* When you delete a selected item in the TreeList, it will automatically delete from the `SelectedItems` collection. If you are using one-way binding for the `SelectedItems` collection and the [`SelectedItemsChanged` event](#selecteditemschanged), when you delete a selected item, the event fires. When you delete all selected items, the `SelectedItemsChanged` event fires with an empty collection.
* When you create an item in the TreeList, and you want to select it at the same time, use the TreeList [editing events]({%slug treelist-editing-overview%}).

## SelectedItemsChanged

You can respond to the user action of selecting a new row through the `SelectedItemsChanged` event. The `SelectedItemsChanged` event receives a collection of the TreeList data model. It may have no items in it. It may have only one member (the last selected item) when the `SelectionMode` is `Single`.

>caption Single selection with one-way binding for SelectedItems and using the SelectedItemsChanged event

````CSHTML
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
    private List<Employee> Data { get; set; }
    private IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();
    private Employee SelectedEmployee { get; set; }

    protected void OnSelect(IEnumerable<Employee> employees)
    {
        SelectedEmployee = employees.FirstOrDefault();
        // update the collection so that the treelist can highlight the correct item
        // when two-way binding is used this happens automatically, but the framework does not allow two-way binding and the event at the same time
        SelectedItems = new List<Employee> { SelectedEmployee };
        // note: an async operation here can break the selection and may not even render its results in the view
    }
    // data generation

    // used in this example for data generation
    private int LastId { get; set; } = 1;

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

    // sample model

    public class Employee
    {
        public int Id { get; set; }
        public List<Employee> DirectReports { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

### SelectedItemsChanged and Asynchronous Operations

To execute asynchronous operations, such as loading data on demand, when the user selects a row, handle these operations in the [`OnExpand`]({%slug treelist-data-binding-load-on-demand%}), [`OnRowClick`]({%slug treelist-events%}#onrowclick) or [`OnRowDoubleClick`]({%slug treelist-events%}#onrowdoubleclick) events, rather than in the [`SelectedItemsChanged`]({%slug treelist-events%}#selecteditemschanged) event.

## Row Selection and Other TreeList Features

The selection feature behavior may vary when the TreeList configuration combines row selection and other TreeList features, such as editing, virtualization, paging, templates, row drag and drop. In such cases you need to consider certain limitation or include some modications.

### Selection with Editing Modes

When you want to edit a row, the row selection has the following behavior:

* In the [Incell EditMode]({%slug treelist-editing-incell%}) the row selection can be applied only through a [checkbox column](#checkbox-selection) (`<TreeListCheckboxColumn />`). This applies for both selection modes—single and multiple. This is required due to the overlapping action that triggers selection and InCell editing (clicking in the row). Otherwise, if the row click selection is enabled with InCell editing, each attempt to select a row would put a cell in edit mode; and each attempt to edit a cell would select a new row. Such user experience is confusing, and so the row selection can be applied only through checkbox column when there is InCell editing mode. To see how to select the row that is being edited in InCell edit mode without using a `<TreeListCheckboxColumn />` check out the [Grid Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article - it is for the Grid component, but the concept is the same.
* In [Inline EditMode]({%slug treelist-editing-inline%}) and [Popup EditMode]({%slug treelist-editing-popup%}) the row selection can be done by clicking on the desired row or by using a `<TreeListCheckboxColumn />`.

### Selection in TreeList with Virtual Scrolling

When the TreeList has [virtual scrolling]({%slug treelist-virtual-scrolling%}) and the `SelectionMode` is set to [`Multiple`](#selection-mode) the selectable rows will be the one in the current set of items (page). If you select a row and scroll down to some of the ones that are not rendered yet (virtualization kicks in) and you want to select that range with the `Shift` button, the selection will start from the position of the first item of the current set (page) to the last selected row.

### Selection and TreeList Paging

The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the collection.

### Selection in Template

When your TreeList configuration contains [TreeList templates]({%slug treelist-templates-overview%}) and row selection:

* If you are using a [TreeList Column Template]({%slug treelist-templates-column%}) and you have a clickable component as content of the TreeList Column Template, you can check the knowledge base article on [how to stop the row selection from being triggered when the user clicks another component in the Grid Column Template]({%slug grid-kb-row-selection-in-column-template%}) - it is for the Grid component, but the concept is the same.
* If you are using the [TreeList Row Template]({%slug treelist-templates-row%}) and you want to select a row via a [checkbox column](#checkbox-selection) (`<TreeListCheckboxColumn />`) the TreeList cannot render selection checkboxes for you. You have to bind them yourself to a field in the model, and handle their selection changed event to populate the `SelectedItems` collection of the TreeList. You can find an example to get started in the following thread (it is for the Grid component, but the concept is identical): [Grid Row Template with Selection - Unsure how to Bind to Selected Item](https://feedback.telerik.com/blazor/1463819-grid-row-template-with-selection-unsure-how-to-bind-to-selected-item).

### Selection and Row Drag and Drop

If the user drags selected rows, the current selection will be cleared on row drop.

## See Also

  * [Live Demo: TreeList Row Selection](https://demos.telerik.com/blazor-ui/treelist/row-selection)
