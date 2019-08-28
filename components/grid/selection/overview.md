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

You can configure the selection behavior by setting `SelectionMode` to a member of the `Telerik.Blazor.GridSelectionMode` enum. The row selection can be:

* [Single]({%slug components/grid/selection/single%}})
* [Multiple]({%slug components/grid/selection/multiple%}})
* `None` - to disable row selection

To select a row, click on it. To select multiple rows, hold down the `Ctrl` or `Shift` key to extend the selection.

You can also use a [checkbox column](#checkbox-support) to select rows. To use it, add a `TelerikGridCheckboxColumn` in the `TelerikGridColumns` collection of the grid. It works with both selection modes. The checkbox in the header selects all items in the current page (if its `SelectAll` parameter is set to `true`).

You can get or set the [selected items](#get-or-set-selected-items) through the `SelectedItems` property. It is a collection of items from the Grid's `Data`. You can use two-way binding, or the `SelectedItemsChanged` event to track the user selection.

The [single selection]({%slug components/grid/selection/single%}) and [multiple selection]({%slug components/grid/selection/multiple%}) articles provide more examples and details on using the grid features.

>caption Enable row selection

````CSHTML
@using Telerik.Blazor.Components.Grid

<select @bind=@selectionMode>
    <option value=@GridSelectionMode.Single>Single</option>
    <option value=@GridSelectionMode.Multiple>Multiple</option>
</select>

<TelerikGrid Data=@GridData
             SelectionMode="@selectionMode"
             Pageable="true">
    <TelerikGridColumns>
        <TelerikGridCheckboxColumn SelectAll="@( selectionMode == GridSelectionMode.Single ? false : true )" Title="Select" Width="70px" />
        <TelerikGridColumn Field=@nameof(Employee.Name) />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
    </TelerikGridColumns>
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


>note In [Incell EditMode]({%slug components/grid/editing/incell%}) selection can be applied only via a checkbox column. This is required due to the overlapping action that triggers selection and incell editing.


## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
  * [Live Demo: Grid Checkbox Selection](https://demos.telerik.com/blazor-ui/grid/checkbox-selection)
  * [Single Selection]({%slug components/grid/selection/single%}})
  * [Multiple Selection]({%slug components/grid/selection/multiple%}})

