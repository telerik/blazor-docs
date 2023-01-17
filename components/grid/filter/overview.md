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

# Blazor Grid Filtering Overview

The Grid component offers built-in support for filtering.

## Basics

To enable filtering, set the grid's `FilterMode` property to one of the following values:

* [`Telerik.Blazor.GridFilterMode.FilterRow`]({%slug grid-filter-row%}) - a row of filter options is rendered below the column headers

* [`Telerik.Blazor.GridFilterMode.FilterMenu`]({%slug grid-filter-menu%}) - the column headers render a button that shows a popup with filtering options

The behavior of the filter input and the available filter operators will depend on the column data type. For example, a boolean field will only have the options "is true" and "is false" and will not have operators like "contains" or "greater than".

You can filter more than one column at a time, and all filter rules will be applied together with an `AND` logic.

You can prevent the user from filtering a certain field by setting `Filterable="false"` on its column.

## More Filtering Options

In addition to the two main filtering modes, the grid offers two more features that can enhance the user experience when looking for data:

* A [searchbox in the toolbar]({%slug grid-searchbox%}) can amend the filters and let the user look up many fields at once

* The filter menu can show a [list of checkboxes]({%slug grid-checklist-filter%}) with the distinct values from the data to make filtering resemble Excel.

## Filter Descriptors

The Grid filter state is stored in [CompositeFilterDescriptors](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.CompositeFilterDescriptor). The below information is important if you want to [get or change the Grid filters programmatically]({%slug grid-state%}).

Each `CompositeFilterDescriptor` contains a [**collection** of `FilterDescriptor`s](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.FilterDescriptorCollection). All descriptors in the collection are applied with an *AND* or an *OR* `LogicalOperator`.

* [Filter Row]({%slug grid-filter-row%}) - each `CompositeFilterDescriptor` targets a specific field. By default, one filter can be applied to a field using the Filter Row operator. The filter value is stored in the first `FilterDescriptor` instance of the `CompositeFilterDescriptor` for that field.

* [Filter Menu]({%slug grid-filter-menu%}) - each `CompositeFilterDescriptor` targets a specific field. Filter values from the separate filter opearators in the menu are stored in different `FilterDescriptor` instances of the dedicated `CompositeFilterDescriptor` for that field.

* [SearchBox]({%slug grid-searchbox%}) - one `CompositeFilterDescriptor` is created in the state when the user types in the Searchbox. By default, it targets all `string` fields. A dedicated `FilterDescriptor` instance is added to this `CompositeFilterDescriptor` for each `string` field. Each `FilterDescriptor` instance contains the filter value typed in the Searchbox.


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

* The grid uses `Activator.CreateInstance<TItem>();` to get the type of the item it is bound to in order to generate proper filters and filter operators for them. Thus, the Model should have a Parameterless constructor defined.

## See Also

* [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
* [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
* [Filter the Grid by date only]({%slug grid-kb-filter-date-only%})
