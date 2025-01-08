---
title: Change the Boolean Filtering Options in a FilterRow Dropdown
description: Learn how to customize the default text in a Grid FilterRow dropdown list, including changing is true and is false to Yes and No, modifying the FilterRow dropdown list display names, and filtering the boolean column values by null for a more user-friendly and tailored filtering experience.
type: how-to
page_title: How to Change the Boolean Filtering Options in a FilterRow Dropdown
slug: grid-kb-filterrow-bool-customization
ticketid: 1575619, 1603347, 1646267, 1654640
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

This KB article answers the following questions:

* How to change the default `is true` and `is false` text in the Grid `FilterRow` dropdown?
* How to change the default display names in the `FilterRow` dropdown?
* How to filter boolean `Grid` column values by `null`?
* How to change the default values in the `FilterRow` dropdown to `Yes` and `No`?

## Solution

1. Define a [Filter Row Template](slug://grid-templates-filter#filter-row-template).
1. Create a `DropDownList` that includes the custom display values.
1. Create a `Button` that will replicate the `FilterRow` clear button.
1. Implement a method that manually filters the Grid based on the DropDownList selection.

>caption Grid with custom display values in the `FilterRow` dropdown and manual filtering.

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data=@GridData FilterMode="GridFilterMode.FilterRow"
             Pageable="true" Height="400px" Width="800px" PageSize="@GridData.Count()">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.AgreesToTermsAndConditions) Title="Agreed to Terms">
            <FilterCellTemplate>

                @* Dropdown list for selecting filter options *@
                <TelerikDropDownList Data="@FilterOptions" Value="@DropDownListValue"
                                     ValueChanged="@((string newValue) => ApplyFilter(newValue, context))">
                    <DropDownListSettings>
                        <DropDownButtonPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>

                @* Button to clear the filter *@
                <TelerikButton ButtonType="ButtonType.Button"
                               Class="k-clear-button-visible ml-2"
                               Icon="@SvgIcon.FilterClear"
                               Enabled="@(DropDownListValue != DefaultFilterOption)"
                               OnClick="@(async () =>
                                          {
                                              await context.ClearFilterAsync();
                                              DropDownListValue = DefaultFilterOption;
                                          })">
                </TelerikButton>
            </FilterCellTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; } = new();

    private string DefaultFilterOption { get; set; }

    // Custom options for the dropdown filter
    private List<string> FilterOptions { get; set; } = new();

    // Selected value in the dropdown filter
    private string DropDownListValue { get; set; }

    // Method to apply the filter based on the selected value in the dropdown
    private async Task ApplyFilter(string newValue, FilterCellTemplateContext context)
    {
        DropDownListValue = newValue;

        var filter = context.FilterDescriptor.FilterDescriptors[0] as FilterDescriptor;
        if (filter != null)
        {
            switch (DropDownListValue)
            {
                case "Yes":
                    filter.Value = true;
                    filter.Operator = FilterOperator.IsEqualTo;
                    break;
                case "No":
                    filter.Value = false;
                    filter.Operator = FilterOperator.IsEqualTo;
                    break;
                case "Unknown":
                    filter.Value = null;
                    filter.Operator = FilterOperator.IsNull;
                    break;
                case "All":
                    await context.ClearFilterAsync();
                    return;
            }

            // Apply the filter
            await context.FilterAsync();
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Employee
                {
                    EmployeeId = i,
                    Name = $"Employee {i}",
                    AgreesToTermsAndConditions = (i % 5 == 0) ? null : (i % 3 == 0)
                });
        }

        DefaultFilterOption = Enum.GetNames(typeof(FilterOption)).First();
        DropDownListValue = DefaultFilterOption;
        FilterOptions = Enum.GetNames(typeof(FilterOption)).ToList();
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty!;
        public bool? AgreesToTermsAndConditions { get; set; }
    }

    public enum FilterOption
    {
        All,
        Yes,
        No,
        Unknown
    }
}
````

## See Also

* [Grid Filtering](slug://components/grid/filtering)
* [Grid Filter Templates](slug://grid-templates-filter)
* [Grid Filter From Code](slug://grid-filter-row#filter-from-code)
* [Use Filter Operator Drop-Down in Filter Template](slug://grid-kb-filter-operator-dropdown)