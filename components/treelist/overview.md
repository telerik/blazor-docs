---
title: Overview
page_title: TreeList Overview
description: Overview of the TreeList for Blazor. Review features and configuration parameters.
slug: treelist-overview
tags: telerik,blazor,treelist,overview
published: True
position: 0
---

# Blazor TreeList Component Overview

The <a href = "https://www.telerik.com/blazor-ui/treelist" target="_blank">Blazor TreeList component</a> displays hierarchical data in a tabular format and allows [sorting](slug://treelist-sorting), [filtering](slug://treelist-filtering), [data editing](slug://treelist-editing-overview); provides item [selection](slug://treelist-selection-overview), [templates](slug://treelist-templates-overview) and [load on demand](slug://treelist-data-binding-load-on-demand).


## Creating Blazor TreeList

The TreeList supports both flat data and hierarchical data. The example below uses flat data.

1. Use the `<TelerikTreeList>` tag.
1. Assign the TreeList `Data` attribute to an `IEnumerable<TItem>` property. The model class `TItem` should have two properties that describe the parent-child relations, for example: `Id` (`int`) and `ParentId` (`int?`).
1. Set the following TreeList parameters, based on the `ITem` property names: `IdField` and `ParentIdField`.
1. Add some `<TreeListColumn>` instances inside a `<TreeListColumns>` tag.
1. For each column, set a `Field` and an optional `Title`.
1. Set `Expandable="true"` for the column that should render expand/collapse arrows.
1. (optional) Enable other features, such as `Pageable`, `Sortable` or `FilterMode`.

>caption Basic TreeList

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Pageable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterMenu">
    <TreeListColumns>
        <TreeListColumn Expandable="true" Field="FirstName" Title="First Name" />
        <TreeListColumn Field="LastName" Title="Last Name" />
        <TreeListColumn Field="Position" />
    </TreeListColumns>
</TelerikTreeList>

@code {

    List<Employee> TreeListData { get; set; }

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();

        for (int i = 1; i <= 9; i++)
        {
            TreeListData.Add(new Employee()
            {
                Id = i,
                ParentId = i <= 3 ? null : i % 3 + 1,
                FirstName = "First " + i,
                LastName = "Last " + i,
                Position = i <= 3 ? "Team Lead" : "Software Engineer"
            });
        }

        base.OnInitialized();
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
    }
}
````


## Data Binding

The Telerik Blazor TreeList is datasource agnostic. You can use any database and service, according to your project. The important step is to configure the model property names, which define the data structure.

The following resources provide details and examples for data binding a TreeList:

* [TreeList Data Binding Overview](slug://treelist-data-binding-overview) - general information on how data binding works
* [Bind TreeList to Flat Self-Referencing Data](slug://treelist-data-binding-flat-data)
* [Bind TreeList to Hierarchical Data](slug://treelist-data-binding-hierarchical-data) - in this case, each data item may contain a nested item collection
* [Load On Demand in TreeList](slug://treelist-data-binding-load-on-demand) - how to load child items only when necessary


## Data Operations

The Blazor TreeList supports all fundamental data operations out-of-the-box:

* [TreeList Paging](slug://treelist-paging)
* [TreeList Sorting](slug://treelist-sorting)
* [TreeList Filtering](slug://treelist-filtering)


## Editing

The TreeList can perform CRUD operations on its current data. It exposes events that let you control the operations and transfer changes to the actual data source. See [TreeList CRUD Operations Overview](slug://treelist-editing-overview) for more details.


## Column Features

The Treelist columns are one of its main building blocks. They offer a rich set of functionality to enable flexibility for different application scenarios.

* [Bound Columns](slug://treelist-columns-bound)
* [Column display Format](slug://treelist-columns-displayformat) for numeric and date values
* [Column reordering](slug://treelist-columns-reorder)
* [Column resizing](slug://treelist-columns-resize)
* [Column Menu](slug://treelist-column-menu) to control data operations and column visibility
* [How column width works](slug://treelist-columns-width)
* [CheckBox column](slug://treelist-columns-checkbox)
* [Command column](slug://treelist-columns-command)
* [Frozen (Locked) columns](slug://treelist-columns-frozen)
* [UI Virtualization](slug://treelist-columns-virtual)
* [Visibility](slug://treelist-columns-visible)
* [Autogenerated columns](slug://treelist-columns-automatically-generated)
* [Multi-column Headers](slug://treelist-columns-multiple-column-headers)
* [Column events](slug://treelist-column-events)


## Templates

The various [TreeList templates](slug://treelist-templates-overview) provide better control over the rendering of:

* [data cells](slug://treelist-templates-column) and [data rows](slug://treelist-templates-row)
* [header cells](slug://treelist-templates-column-header)
* [filter menus and rows](slug://treelist-templates-filter)
* [data editors](slug://treelist-templates-editor)
* [no data message](slug://treelist-templates-no-data)


## More TreeList Features

* [Selection - single and multiple](slug://treelist-selection-overview).
* [State - get or set the TreeList configuration programmatically](slug://treelist-state)
* [Toolbar - define custom TreeList actions](slug://treelist-toolbar)


## TreeList Parameters

The following table lists Tree List parameters, which are not related to other features on this page. Check the [TreeList API Reference](slug://Telerik.Blazor.Components.TelerikTreeList-1) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `Class` | `string` | The additional CSS class that will be rendered to the `div.k-treelist` element. Use it to apply custom styles or [override the theme](slug://themes-override). For example, [change the TreeList font size](slug://grid-kb-change-font-size). |
| `Height` | `string` | The height value in [any supported CSS unit](slug://common-features/dimensions). |
| `Navigable` | `bool` | Whether [keyboard navigation](slug://accessibility-overview#keyboard-navigation) is enabled. |
| `Width` | `string` | The width value in [any supported CSS unit](slug://common-features/dimensions). The TreeList has no default width, but expands horizontally to fill its container. |


## TreeList Reference and Methods

The TreeList component has methods to to execute actions such as:

* [Rebind to refresh the data](slug://treelist-refresh-data#rebind-method)
* [Automatically resize columns to fit their content](slug://treelist-columns-resize)
* [Get or set the TreeList configuration state](slug://treelist-state)
* [Get the dragged data item and its drop index from the destination TreeList](slug://treelist-drag-drop-overview)

To execute these methods, obtain reference to the Grid instance via `@ref`. 

The TreeList is a generic component.Its type depends on the type of its model and the type of its `Value`. In case you cannot provide either the `Value` or `Data` initially, you need to [set the corresponding types to the `TItem` and `TValue` parameters](slug://common-features-data-binding-overview#component-type).

>caption Store the TreeList instance reference and execute methods

````RAZOR
<TelerikButton OnClick="@AutoFit">Autofit All Columns</TelerikButton>

<TelerikTreeList @ref="@TreeListRef"
                 Data="@Data"
                 IdField="EmployeeId"
                 ParentIdField="ReportsTo"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="FirstName" Expandable="true"></TreeListColumn>
        <TreeListColumn Field="EmployeeId"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    TelerikTreeList<Employee> TreeListRef { get; set; }
    public List<Employee> Data { get; set; }

    void AutoFit()
    {
        TreeListRef.AutoFitAllColumns();
    }

    protected override void OnInitialized()
    {
        Data = new List<Employee>();
        var rand = new Random();
        int currentId = 1;

        for (int i = 1; i < 6; i++)
        {
            Data.Add(new Employee()
            {
                EmployeeId = currentId,
                ReportsTo = null,
                FirstName = "Employee  " + i.ToString()
            });

            currentId++;
        }
        for (int i = 1; i < 6; i++)
        {
            for (int j = 0; j < 5; j++)
            {
                Data.Add(new Employee()
                {
                    EmployeeId = currentId,
                    ReportsTo = i,
                    FirstName = "    Employee " + i + " : " + j.ToString()
                });

                currentId++;
            }
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public int? ReportsTo { get; set; }
    }
}
````


# Next Steps

* [Explore Tree List data binding](slug://treelist-data-binding-overview)
* [Learn about Tree List columns](slug://treelist-columns-bound)


## See Also

* [Live Demos: TreeList](https://demos.telerik.com/blazor-ui/treelist/overview)
* [TreeList API Reference](slug://Telerik.Blazor.Components.TelerikTreeList-1)
