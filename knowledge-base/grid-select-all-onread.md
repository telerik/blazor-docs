---
title: Select All Items With CheckBox when Using OnRead
description: How Select All Items With CheckBox when Using OnRead in the Grid for Blazor
type: how-to
page_title: How Select All Items With CheckBox when Using OnRead
slug: grid-kb-select-all-onread
position: 
tags: grid, selection, select all, checkbox, onread
ticketid: 1562945
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

I am binding the Grid through the `OnRead` event and I am using CheckBox selection with `SelectAllMode` set to `GridSelectAllMode.All`. However, when the user clicks the SelectAll CheckBox, only the items on the current page are selected, not all items in the dataset. How to ensure all items will be selected when clicking the SelectAll CheckBox.

## Solution

The described behavior is expected as when using the `OnRead` event, the Grid operates only with the current set/page of data. The component does not have information for all the items in your datasource and [thus it cannot select them all](slug:grid-selection-row#selection-and-paging).

To ensure all item will be selected upon clicking the SelectAll CheckBox when using the `OnRead` event, you can implement a custom approach: 

1. Use [`HeaderTemplate` for the `CheckboxColumn`](slug:components/grid/columns/checkbox#header-template) and add a custom [CheckBox component](slug:checkbox-overview) so you can have full control over its behavior.
1. Handle the [`OnChange` event](slug:checkbox-events#onchange) of the CheckBox to track when the user checks/unchecks it to manage the selected items. 
    - When the CheckBox is checked, request all the data from your datasource and assign it to the `SelectedItems` collection, so you have all items selected. You may want to cache all the data for further usage, so you don't need to request it additionally upon clicking the custom SelectAll CheckBox.
    - When the user deselects the CheckBox, clear the  `SelectedItems` collection.
1. Manage the [`Indeterminate` state](slug:checkbox-indeterminate-state) of the CheckBox based on the selected items' count.
1. Track [when the user changes the `Indeterminate` state](slug:checkbox-events#indeterminatechanged) of the CheckBox (clicks the CheckBox when it is in `Indeterminate` state). In this case, ensure that the CheckBox value will be always set to true if you want to completely mimic the default CheckBox selection behavior.

>caption Select all items with CheckBox when using OnRead

````RAZOR
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@Employee"
             OnRead="@ReadItems"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedEmployees"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn CheckBoxOnlySelection="true">
            <HeaderTemplate>
                @{
                    <TelerikCheckBox @bind-Value="@SelectAllCheckBoxValue" 
                                     Indeterminate="@(SelectedEmployees.Count() >= 1 && SelectedEmployees.Count() < Total)"
                                     IndeterminateChanged="@HandleIndeterminateChanged"
                                     OnChange="@HandleSelectAll"/>                    
                }
            </HeaderTemplate>
        </GridCheckboxColumn>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name)/>
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> SourceData { get; set; }

    private IEnumerable<Employee> SelectedEmployees { get; set; } = Enumerable.Empty<Employee>();

    private bool SelectAllCheckBoxValue { get; set; }

    private int Total { get; set; } = 0;

    //Track when the user checks/unchecks the custom SelectAll CheckBox
    private void HandleSelectAll()
    {
        if (SelectAllCheckBoxValue)
        {
            // Request all the data and assign it to the SelectedItems collection. Here we use the already available SourceData for brevity.
            SelectedEmployees = SourceData;
        }
        else
        {
            SelectedEmployees = Enumerable.Empty<Employee>();
        }
    }    

    // Ensure that clicking the custom SelectAll CheckBox when it is in its indeterminate state will always select all items. 
    // This mimics the default SelectAll CheckBox behavior.
    private void HandleIndeterminateChanged(bool value)
    {
        if (!value)
        {
            SelectAllCheckBoxValue = true;
        }
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        args.Data = datasourceResult.Data;
        args.Total = datasourceResult.Total;

        Total = datasourceResult.Total;
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            result.Add(new Employee()
                {
                    ID = i,
                    Name = "Name " + i,
                    HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20))
                });
        }

        return result;
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See Also

* [Grid Row Selection](slug:grid-selection-row)
* [Grid CheckBox Column](slug:components/grid/columns/checkbox)
* [CheckBox component](slug:checkbox-overview)