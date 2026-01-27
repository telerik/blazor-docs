---
title: Overview
page_title: TreeList - Filtering Overview
description: Enable and configure filtering in TreeList for Blazor.
slug: treelist-filtering
tags: telerik,blazor,TreeList,filtering,filter
published: True
previous_url: /components/treelist/filtering
position: 0
components: ["treelist"]
---
# Blazor TreeList Filtering Overview

The TreeList component offers built-in support for filtering.

## Basics

To enable filtering, set the `FilterMode` property of the treelist to one of the following values:

* [`Telerik.Blazor.TreeListFilterMode.FilterRow`](slug:treelist-filter-row) - a row of filter options is rendered below the column headers

* [`Telerik.Blazor.TreeListFilterMode.FilterMenu`](slug:treelist-filter-menu) - the column headers render a button that shows a popup with filtering options

The behavior of the filter input and the available filter operators will depend on the column data type. For example, a boolean field will only have the options "is true" and "is false" and will not have operators like "contains" or "greater than".

You can filter more than one column at a time, and all filter rules will be applied together with an `AND` logic.

You can prevent the user from filtering a certain field by setting `Filterable="false"` on its column.


Filtering keeps an item's parent(s) in the list, so you may see item that do not match the criteria. This is required so you can actually navigate to and see the items that match.

Filtering keeps the expanded/collapsed state of items. For example, if filtering leaves a child whose parent is collapsed, you will only see the collapsed parent.

## More Filtering Options

In addition to the two main filtering modes, the treelist offers two more features that can enhance the user experience when looking for data:

* A [searchbox in the toolbar](slug:treelist-searchbox) can amend the filters and let the user look up many fields at once

* The filter menu can show a [list of checkboxes](slug:treelist-checklist-filter) with the distinct values from the data to make filtering resemble Excel.

* You can customize the appearance and behavior of the filters through the [filter templates](slug:treelist-templates-filter).

## Filter Descriptors

You can get the applied filtering criteria for each filtered field. Use the [TreeList state](slug:treelist-state) to obtain the user input, the filter operator and other filtering properties. Find out how in the [Data Operation Descriptors article](slug:common-features-descriptors#filtering).

## Customize The Filter Editors

You can customize the filter editors declaratively for some data types. It is possible to change the editor component or the editor format.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| TreeListColumn Parameter | Type | Works for | Description |
|---|---|---|---|
| `FilterEditorType` | `TreeListFilterEditorType` enum | `DateTime` columns | The component, which the TreeList will render for filtering (DatePicker or DateTimePicker). |
| `FilterEditorFormat` | `string` | `DateTime` and numeric columns | The `Format` of the filtering component. Do not use a placeholder (e.g. set `"D"`, not `"{0:D}"`). |

````RAZOR
@* Using FilterEditorType and FilterEditorFormat parameters *@

<TelerikTreeList Data="@Data" 
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 Pageable="true" 
                 IdField="Id" ParentIdField="ParentId" 
                 Width="650px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px"></TreeListColumn>
        <TreeListColumn Field="Id"></TreeListColumn>
        <TreeListColumn Field="@(nameof(Employee.HireDate))"
                        FilterEditorType="@TreeListFilterEditorType.DateTimePicker"
                        FilterEditorFormat="yyyy-MM-dd HH:mm"
                        Title="Hire Date">
        </TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null,
                Name = $"root: {i}",
                HireDate = DateTime.Today.AddYears(-i)
            });

            for (int j = 2; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child of {i}",
                    HireDate = DateTime.Today.AddYears(-j)
                });

                for (int k = 3; k < 5; k++)
                {
                    data.Add(new Employee
                    {
                        Id = currId * 1000 + k,
                        ParentId = currId,
                        Name = $"second level child {k} of {i} and {currId}",
                        HireDate = DateTime.Today.AddYears(-k)
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````


## Notes

* The treelist uses `Activator.CreateInstance<TItem>();` to get the type of the item it is bound to in order to generate proper filters and filter operators for them. Thus, the Model should have a Parameterless constructor defined.

## See Also

  * [Live Demo: TreeList Filter Row](https://demos.telerik.com/blazor-ui/treelist/filter-row)
  * [Live Demo: TreeList Filter Menu](https://demos.telerik.com/blazor-ui/treelist/filter-menu)
