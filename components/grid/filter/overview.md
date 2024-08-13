---
title: Overview
page_title: Grid - Filtering Overview
description: Enable and configure filtering in Grid for Blazor.
slug: components/grid/filtering
tags: telerik,blazor,grid,filtering,filter
published: True
previous_url: /components/grid/filtering
position: 0
---

# Filtering Overview

This article explains the available filtering modes in the Telerik Grid for Blazor.

## FilterRow

The FilterRow filtering mode renders a row below the column headers, providing a UI where you can fill in the filter criteria. Read more about enabling and fine-tuning the filtering row in the [FilterRow documentation article...]({%slug grid-filter-row%})

## FilterMenu

The FilterMenu filter mode renders a button in the column header. Clicking the button opens a popup with filtering options, allowing you to apply two filter criteria, choose a filter operator, and use buttons to apply or clear the filter. Read more about enabling and fine-tuning the filtering menu in the [FilterMenu documentation article...]({%slug grid-filter-menu%})

> You can prevent the user from filtering a certain field by setting `Filterable="false"` on its column.

## More Filtering Options

In addition to the two main filtering modes, the grid offers two more features that can enhance the user experience when looking for data.

### ToolBar SearchBox

The ToolBar of the Telerik Grid for Blazor includes a [SearchBox]({%slug grid-searchbox%}) that lets users amend filters and search across multiple fields simultaneously.

### CheckBoxList

The filter menu can display a [list of checkboxes]({%slug grid-checklist-filter%}) with distinct values from the data, making filtering similar to Excel.

## Filter Descriptors

The Grid filter state is stored in [`CompositeFilterDescriptors`](/blazor-ui/api/Telerik.DataSource.CompositeFilterDescriptor). Use the following information if you want to [get or change the Grid filters programmatically]({%slug grid-state%}).

Each `CompositeFilterDescriptor` includes a collection of filter descriptors, where all descriptors in the collection are applied with an AND or OR logical operator.

* [Filter Row]({%slug grid-filter-row%})&mdash;Each `CompositeFilterDescriptor` targets a specific field. By default, one filter can be applied to a field using the Filter Row operator, with the filter value stored in the first filter descriptor instance for that field.

* [Filter Menu]({%slug grid-filter-menu%})&mdash;Each `CompositeFilterDescriptor` targets a specific field. The filter values from separate filter operators in the menu are stored in different filter descriptor instances within the `CompositeFilterDescriptor` for that field.

* [SearchBox]({%slug grid-searchbox%})&mdash;A `CompositeFilterDescriptor` is created in the state when the user types in the search box. By default, it targets all string fields, adding a dedicated filter descriptor instance for each string field. Each filter descriptor contains the filter value typed in the search box.


## Custom Filtering

There are two approaches to customize the grid filtering behavior, and you can use them together:

* Perform the data operations yourself (e.g., by outsourcing them to some API backend or other service) - to do that, use the [`OnRead` event]({%slug components/grid/manual-operations%}). This will let you fetch only the current page of data for the grid, instead of pulling the entire data set and storing it in-memory in the view-model.

* Customize the appearance and behavior of the filters - for that, use the [Filter Templates]({%slug grid-templates-filter%}) the grid provides.


## Customize The Filter Editors

You can customize the filter editors declaratively for some data types. It is possible to change the editor component or the editor format.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| GridColumn Parameter | Type | Works for | Description |
|---|---|---|---|
| `FilterEditorType` | `GridFilterEditorType` enum | `DateTime` columns | The component, which the Grid will render for filtering (DatePicker or DateTimePicker). |
| `FilterEditorFormat` | `string` | `DateTime` and numeric columns | The `Format` of the filtering component. Do not use a placeholder (e.g. set `"D"`, not `"{0:D}"`). |

````CSHTML
@* Using FilterEditorType and FilterEditorFormat parameters *@

<TelerikGrid Data=@GridData 
             FilterMode="Telerik.Blazor.GridFilterMode.FilterMenu"
             Pageable="true" 
             Height="400px">
    <GridColumns>
        <GridColumn Field="@nameof(Employee.Name)" />
        <GridColumn Field="@nameof(Employee.AgeInYears)" Title="Age" />
        <GridColumn Field="@nameof(Employee.HireDate)" 
                    FilterEditorType="@GridFilterEditorType.DateTimePicker"
                    FilterEditorFormat="yyyy-MM-dd HH:mm"
                    Title="Hire Date" />
        <GridColumn Field="@nameof(Employee.IsOnLeave)" Title="On Vacation" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                AgeInYears = rand.Next(10, 80),
                HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20)),
                IsOnLeave = i % 3 == 0
            });
        }
    }

    public class Employee
    {
        public int? EmployeeId { get; set; }
        public string Name { get; set; }
        public int? AgeInYears { get; set; }
        public DateTime HireDate { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
````

## Advanced Examples

The following articles and sample projects can be helpful when implementing filtering:

* [Capture Filtered event]({%slug grid-state%}#get-and-override-user-action-that-changes-the-grid) - the grid state lets you know when it changes so you can capture different aspects of the change

* [Server Filtering]({%slug components/grid/manual-operations%}) - this article explains how to implement manual data source operations so you can offload the work to the server. It provides the overview of how to setup the grid for that, and examples - several with local data and links a repository with examples using REST API endpoints.

* [Filter and Edit Enum fields]({%slug grid-kb-filter-edit-enum%})

* [Leave only one option in the Filter Menu]({%slug grid-kb-only-one-filtermenu-option%}) - this is a CSS approach, or you can implement a [custom filter template]({%slug grid-templates-filter%}).


## Notes

The Grid uses `Activator.CreateInstance<TItem>();` to obtain the item's type it is bound to, enabling it to generate accurate filters and filter operators. To facilitate this, ensure you define a parameterless constructor for the model. If your model has no parameterless constructor use the [`OnModelInit` event]({%slug grid-events%}#onmodelinit).

## See Also

* [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
* [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
* [Filter the Grid by date only]({%slug grid-kb-filter-date-only%})
