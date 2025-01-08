---
title: Change Border Color of Grid Columns
description: How to change the border color style of Grid and TreeList columns. How to change the color of all borders in the Grid and TreeList.
type: how-to
page_title: How to Change the Border Color of Grid Columns
slug: grid-kb-change-border-color
position: 
tags: telerik, blazor, grid, treelist, css, styles
ticketid: 1629660, 1632430
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to change the color of all borders in the Grid or TreeList?
* How to change the border color of specific Grid or TreeList columns?
* How to customize the border color of header cells?
* How to set the border color of data table cells?
* How to change the grid lines color?

## Solution

CSS style customizations require knowledge about [CSS specificity](slug://themes-override#css-knowledge) and how to [use the browser's DOM inspector](slug://themes-override#tools).

Here are two possible scenarios:

* [Apply custom color to all borders in the Grid or TreeList](#set-color-to-all-borders)
* [Customize specific borders only](#set-color-to-some-column-borders)

The Grid and TreeList reuse the same CSS classes. As a result, the examples below work in the exact same way for the two components.

## Set Color to All Borders

To change the color of all borders in the Grid or TreeList:

1. Set a custom CSS `Class` to the component.
1. Apply the desired `border-color` style to:
    * The main component `<div>`;
    * Any nested container `<div>` that has visible borders, for example, the toolbar or the pager;
    * All header cells (`<th>`);
    * All data cells (`<td>`).

>caption Apply custom styles to all Grid or TreeList borders

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Pageable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 Class="red-border">
    <TreeListColumns>
        <TreeListColumn Expandable="true" Field="FirstName" Title="First Name" />
        <TreeListColumn Field="LastName" Title="Last Name" />
        <TreeListColumn Field="Position" />
    </TreeListColumns>
</TelerikTreeList>

<style>
    /* component */
    .k-grid.red-border,
    /* header area bottom border */
    .k-grid.red-border .k-grid-header,
    /* header area vertical borders */
    .k-grid.red-border th,
    /* data area vertical borders */
    .k-grid.red-border td,
    /* pager */
    .k-grid.red-border .k-pager {
        border-color: red;
    }
</style>

@code {
    private List<Employee> TreeListData { get; set; } = new List<Employee>();

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
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}
````

## Set Color to Some Column Borders

To change the border color of a specific Grid or TreeList column:

1. Set the `HeaderClass` parameter of the column. See [Grid Column Appearance](slug://components/grid/columns/bound#appearance) or [TreeList Column Appearance](slug://treelist-columns-bound#appearance).
1. Subscribe to the `OnCellRender` event of the column. In the event handler, set `args.Class` to a custom CSS class. See [Grid `OnCellRender` event](slug://grid-column-events) or [TreeList `OnCellRender` event](slug://treelist-column-events).
1. Apply the desired `border-color` style to:
    * The specific header cell and the one after it (`th + th`);
    * The specific data cell and the one after it (`td + td`).

> The first column doesn't have a left border. If necessary, apply a custom border style to the header table and data table containers.

>caption Apply custom styles to some Grid or TreeList borders

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Pageable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 Class="red-left-border">
    <TreeListColumns>
        <TreeListColumn Expandable="true"
                        Field="FirstName"
                        Title="First Name" />
        <TreeListColumn Field="LastName"
                        Title="Last Name"
                        HeaderClass="red-column-border"
                        OnCellRender="@OnLastNameCellRender" />
        <TreeListColumn Field="Position" />
    </TreeListColumns>
</TelerikTreeList>

<style>
    /* left header border */
    .k-grid th.red-column-border,
    /* right header border */
    .k-grid th.red-column-border + th,
    /* left data cell border */
    .k-grid td.red-column-border,
    /* right data cell border */
    .k-grid td.red-column-border + td {
        border-color: red;
    }

    /* The first column has no left border. */
    /* Use if the target column is the first one. */
    /*
    .k-grid.red-left-border > .k-grid-header,
    .k-grid.red-left-border > .k-grid-container {
        border-left: 1px solid red;
    }
    */
</style>

@code {
    private List<Employee> TreeListData { get; set; } = new List<Employee>();

    private void OnLastNameCellRender(TreeListCellRenderEventArgs args)
    {
        args.Class = "red-column-border";
    }

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
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}
````

## See Also

* [Change CSS Theme Styles](slug://themes-override)
* [Change Grid Font Size](slug://grid-kb-change-font-size)
