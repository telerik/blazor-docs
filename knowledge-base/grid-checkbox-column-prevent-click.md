---
title: Grid CheckBox column prevent accidental click
description: How to prevent an accidental click in the CheckBox column of the Grid
type: how-to
page_title: Grid CheckBox column prevent accidental click
slug: grid-checkbox-column-prevent-click
position: 
tags: 
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

An accidental click outside the checkbox in the Grid's CheckBox column deselects the currently selected rows. How to prevent that from happening and ensure that only a click on the checkbox deselects the respective row?

## Solution

You can prevent the click event of the cells in the CheckBox column of the Grid with JavaScript. 

1. Handle the `OnRowClick` event of the Grid and call a JavaScript function in it.
2. In the function, attach a `click` event handler to the `td` Html elements in the CheckBox column and prevent the event conditionally

```razor
@inject IJSRuntime JS;

<TelerikGrid Data="@GridData"
             SelectionMode="@GridSelectionMode.Multiple"
             SelectedItems="@SelectedEmployees"
             OnRowClick="@OnRowClickHandler"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" CheckBoxOnlySelection="false" />
        <GridColumn Field="@nameof(Employee.Name)" />
        <GridColumn Field="@nameof(Employee.Team)" />
    </GridColumns>
</TelerikGrid>

<script suppress-error="BL9992">
    function handleDeselection() {
        setTimeout(function() {
            preventDeselection()
        }, 300)

    }

    function preventClickHandler(event) {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function preventDeselection() {
        document.querySelectorAll('.k-grid-content .k-table-row td:first-child').forEach(function(td) {
            td.addEventListener('click', preventClickHandler, true);
        });
    }
</script>

@code {
    private List<Employee> GridData { get; set; } = new();

    private IEnumerable<Employee> SelectedEmployees { get; set; } = Enumerable.Empty<Employee>();

    private string SelectedItemsChangedLog { get; set; } = string.Empty;

    private async Task OnRowClickHandler(GridRowClickEventArgs args)
    {
        // call a function that will prevent deselection of already selected rows
        await JS.InvokeVoidAsync("handleDeselection");
    }


    protected override void OnInitialized()
    {
        for (int i = 1; i <= 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = $"Employee {i}",
                Team = $"Team {i % 3 + 1}"
            });
        }

        SelectedEmployees = new List<Employee>() { GridData.ElementAt(2) };
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
    }
}
```
