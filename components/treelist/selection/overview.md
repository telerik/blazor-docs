---
title: Overview
page_title: TreeList - Selection Overview
description: Selection basics in the treelist for Blazor.
slug: treelist-selection-overview
tags: telerik,blazor,treelist,selection,overview
published: True
position: 0
---

# TreeList Selection

The treelist component offers support for row selection.

In this article:

* [Selection Basics](#selection-basics)
	* [Example - Enable Row Selection](#example---enable-row-selection-multiple)
* [Notes](#notes)
	* [Editing Modes](#editing-modes)
	* [Selection in Template](#selection-in-template)
	* [Asynchronous Operations](#asynchronous-operations)
	* [Handle Data Changes](#handle-data-changes)



## Selection Basics

You can configure the selection behavior by setting `SelectionMode` to a member of the `Telerik.Blazor.TreeListSelectionMode` enum. The row selection can be:

* [Single]({%slug treelist-selection-single%})
* [Multiple]({%slug treelist-selection-multiple%})
* `None` - to disable row selection

To select a row, click on it. To select multiple rows, hold down the `Ctrl` or `Shift` key to extend the selection.

You can also use a checkbox column to select rows. To use it, add a `TreeListCheckboxColumn` in the `TreeListColumns` collection of the treelist. It works with both selection modes. The checkbox in the header selects all items in the current page or throughout the entire treelist (if its `SelectAll` parameter is set to `true` and the [SelectAllMode]({%slug treelist-selection-multiple%}#checkbox-selection) is set to `All`). You can also control whether selecting an item selects child nodes through the [SelectChildren]({%slug treelist-selection-multiple%}#checkbox-selection)
 parameter.

You can get or set the selected items through the `SelectedItems` property. It is a collection of items from the treelist's `Data`.

The [single selection]({%slug treelist-selection-single%}) and [multiple selection]({%slug treelist-selection-multiple%}) articles provide more examples and details on using the treelist features.

### Example - Enable Row Selection (multiple)

````CSHTML
@* See how to enable selection and use the SelectedItems the TreeList provides *@

<TelerikTreeList Data="@Data"

                 SelectionMode="@TreeListSelectionMode.Multiple"
                 @bind-SelectedItems="@SelectedItems"

                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px">
    <TreeListColumns>
        <TreeListCheckboxColumn />
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="200px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@if (SelectedItems.Any())
{
    <ul>
    @foreach (Employee item in SelectedItems)
    {
        <li>@item.Id</li>
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

## Notes

### Editing Modes

#### InCell Edit Mode

In the [Incell EditMode]({%slug treelist-editing-incell%}) selection can be applied only via a checkbox column (`<TreeListCheckboxColumn />`). This is required due to the overlapping action that triggers selection and InCell editing (clicking in the row) - if row click selection was enabled with InCell editing, each attempt to select a row would put a cell in edit mode; and each attempt to edit a cell would select a new row. Such user experience is confusing, and so selection will only work through the row selection checkbox.

To see how to select the row that is being edited in InCell edit mode without using a `<TreeListCheckboxColumn />` check out the [Grid Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article - it is for the Grid component, but the concept is the same.

#### Inline and PopUp Edit Modes

In [Inline EditMode]({%slug treelist-editing-inline%}) and [PopUp EditMode]({%slug treelist-editing-popup%}) selection can be done by clicking on the desired row or by using a `< TreeListCheckboxColumn />`.

### Selection in Template

When using the treelist [Template]({%slug treelist-templates-overview%}) and you want to stop the Selection from being triggered when the user clicks in it, you should add the `@onclick:stopPropagation` directive to the element.

>caption Prevent row selection from happening when the user clicks inside a template

````CSHTML
<TreeListColumn Field=@nameof(Product.ProductId) Title="Id">
    <Template>
        <span @onclick:stopPropagation>
            <TelerikNumericTextBox Value="@((context as Product).ProductId)"></TelerikNumericTextBox>
        </span>
    </Template>
</treelistColumn>
````

If you are using the [Row Template]({%slug treelist-templates-row%}), the treelist cannot render selection checkboxes for you, so you have to bind them yourself to a field in the model, and handle their selection changed event to populate the `SelectedItems` collection of the treelist. You can find an example to get started in the following thread (it is for the grid, but the concept is identical): [Grid Row Template with Selection - Unsure how to Bind to Selected Item](https://feedback.telerik.com/blazor/1463819-treelist-row-template-with-selection-unsure-how-to-bind-to-selected-item)

### Asynchronous Operations

Asynchronous operations such as loading data on demand should be handled in the [`OnExpand`]({%slug treelist-data-binding-load-on-demand%}) event rather than in the [`SelectedItemsChanged`]({%slug treelist-events%}#selecteditemschanged) event. In a future version, the component may expose an event like `RowClick` for such operations.

### Handle Data Changes

When the treelist `Data` collection changes, the `SelectedItems` collection has the following behavior:

* If the treelist does *not* use an `ObservableCollection` for its `Data` - The `SelectedItems` collection will be preserved. You need to clear or manipulate it when the data is changed according to your needs and business logic.

    * If you update or delete an item, you must make the same update in the selected items through the treelist [editing events]({%slug treelist-editing-overview%}).

* When using an `ObservableCollection` for the treelist `Data`- If an item is removed or the entire data is cleared using the collection's `.Clear()` method, it will automatically update the `SelectedItems` collection too (the removed Data items will be removed from the Selected Items collection).

    * The other CRUD operations (Create and Update), you should use the treelist [editing events]({%slug treelist-editing-overview%}) to handle the situation according to your business logic and preferred behavior.
    * When the data changes and the selected items are cleared, the `SelectedItemsChanged` event will fire with the empty collection. If you are using two-way binding, the collection will be cleared.



## See Also

  * [Live Demo: TreeList Selection](https://demos.telerik.com/blazor-ui/treelist/selection)
  * [Live Demo: TreeList Checkbox Selection](https://demos.telerik.com/blazor-ui/treelist/checkbox-selection)
  * [Single Selection]({%slug treelist-selection-single%})
  * [Multiple Selection]({%slug treelist-selection-multiple%})
