---
title: Overview
page_title: Grid for Blazor | Selection Overview
description: Selection basics in the Grid for Blazor
slug: components/grid/selection/overview
tags: telerik,blazor,grid,selection,overview
published: True
position: 0
---

# Grid Selection

The Grid component offers support for row selection.

In this article:

* [Selection Basics](#selection-basics)
	* [Example - Enable Row Selection](#example---enable-row-selection)
* [Notes](#notes)
	* [Editing Modes](#editing-modes)
	* [Selection in Template](#selection-in-template)
	* [Handle Data Changes](#handle-data-changes)



## Selection Basics

You can configure the selection behavior by setting `SelectionMode` to a member of the `Telerik.Blazor.GridSelectionMode` enum. The row selection can be:

* [Single]({%slug components/grid/selection/single%})
* [Multiple]({%slug components/grid/selection/multiple%})
* `None` - to disable row selection

To select a row, click on it. To select multiple rows, hold down the `Ctrl` or `Shift` key to extend the selection.

You can also use a checkbox column to select rows. To use it, add a `GridCheckboxColumn` in the `GridColumns` collection of the grid. It works with both selection modes. The checkbox in the header selects all items in the current page or throughout the entire Grid (if its `SelectAll` parameter is set to `true` and the [SelectAllMode]({%slug components/grid/selection/multiple%}#checkbox-selection) is set to `All`).

You can get or set the selected items through the `SelectedItems` property. It is a collection of items from the Grid's `Data`.

The [single selection]({%slug components/grid/selection/single%}) and [multiple selection]({%slug components/grid/selection/multiple%}) articles provide more examples and details on using the grid features.

### Example - Enable Row Selection

````CSHTML
See how the row selection modes work

<select @bind=@selectionMode>
    <option value=@GridSelectionMode.Single>Single</option>
    <option value=@GridSelectionMode.Multiple>Multiple</option>
</select>

<TelerikGrid Data=@GridData
             SelectionMode="@selectionMode"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="@( selectionMode == GridSelectionMode.Single ? false : true )" Title="Select" Width="70px" />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    GridSelectionMode selectionMode = GridSelectionMode.Single;

    protected override void OnInitialized()
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
    }
}
````

## Notes

### Editing Modes

In the [Incell EditMode]({%slug components/grid/editing/incell%}) selection can be applied only via a checkbox column. This is required due to the overlapping action that triggers selection and incell editing (clicking in the row).

### Selection in Template

When using the Grid [Template](https://docs.telerik.com/blazor-ui/components/grid/templates) and you want to stop the Selection from being triggered when the user clicks in it, you should add the `@onclick:stopPropagation` directive to the element.

>caption Prevent row selection from happening when the user clicks inside a template

````CSHTML
<GridColumn Field=@nameof(Product.ProductId) Title="Id">
    <Template>
        <span @onclick:stopPropagation>
            <TelerikNumericTextBox Value="@((context as Product).ProductId)"></TelerikNumericTextBox>
        </span>
    </Template>
</GridColumn>
````

### Handle Data Changes

When the grid `Data` collection changes, the `SelectedItems` collection has the following behavior:

* No `OnRead` event configured (the default state) - When the Grid `Data` collection reference is changed the `SelectedItems` collection will be cleared automatically.

* If the Grid has the [OnRead](https://docs.telerik.com/blazor-ui/components/grid/events#read-event) event configured - The `SelectedItems` collection will be preserved. You need to clear or manipulate it when the data is changed according to your needs and business logic.

* When using an `ObservableCollection` for the grid `Data`- If an item is removed or the entire data is cleared using the collection's `.Clear()` method, it will automatically update the `SelectedItems` collection too (the removed Data items will be removed from the Selected Items collection). 

While the grid can clean up the `SelectedItems` when the Data changes or on `Delete` (when bound to an `ObservableCollection`), with the other CRUD operations (Create and Update), you should use the grid [editing events]({%slug components/grid/editing/overview%}) to handle the situation according to your business logic and preferred behavior.




## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
  * [Live Demo: Grid Checkbox Selection](https://demos.telerik.com/blazor-ui/grid/checkbox-selection)
  * [Single Selection]({%slug components/grid/selection/single%})
  * [Multiple Selection]({%slug components/grid/selection/multiple%})
