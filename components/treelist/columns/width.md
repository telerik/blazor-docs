---
title: Width
page_title: TreeList - Column Width
description: Column width behavior in treelist for Blazor.
slug: treelist-columns-width
tags: telerik,blazor,treelist,column,width
published: True
position: 4
components: ["treelist"]
---
# TreeList Column Width

This article explains how to set TreeList column widths and how the component behaves, depending on its column width configuration.

## Basics

The TreeList renders separate HTML `<table>` elements for its header and data areas. This allows users to scroll the data area vertically, while the header area remains visible at all times. The TreeList tables apply `table-layout: fixed` and `width: 100%` CSS styles to ensure column alignment between the three areas.

You can set the TreeList column `Width` parameter in any CSS unit, such as `px`, `%`, `vw`, `em`, `rem`. Unit-less `Width` values are not supported. You can read more on how to set sizes in Telerik components in the [Dimensions](slug:common-features/dimensions) article.

## Column Width Behavior

The TreeList column width settings can vary and result in the following behaviors:

@[template](/_contentTemplates/common/parameters-table-styles.md#multidimensional-table)

<table class="multi-dimensional-table">
    <colgroup><col style="width: 112px" /><col style="width: 70px" /><col /><col /></colgroup>
    <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th colspan="2">The Sum of All Set Column Widths Is:</th>
    </tr>
    <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        <th>Greater Than the TreeList Width</th>
        <th>Less Than the TreeList Width</th>
    </tr>
    <tr>
        <th style="writing-mode: vertical-lr;" rowspan="3">How Many Columns Have Width:</th>
        <th>All</th>
        <td><ul><li>All columns respect their <code>Width</code> setting.</li><li>A horizontal scrollbar appears.</li></ul></td>
        <td><ul><li>All columns expand beyond their <code>Width</code> setting to fill the available space in the TreeList.</li><li>There is no horizontal scrollbar.</li></ul></td>
    </tr>
    <tr>
        <th>Some</th>
        <td><ul><li>All columns respect their <code>Width</code> setting, if exists.</li><li>All columns without a <code>Width</code> shrink and disappear.</li><li>A horizontal scrollbar appears.</li></ul></td>
        <td><ul><li>All columns respect their <code>Width</code> setting, if exists.</li><li>All columns without a <code>Width</code> shrink or expand, depending on the remaining space in the TreeList.</li><li>There is no horizontal scrollbar.</li></ul></td>
    </tr>
    <tr>
        <th>None</th>
        <td colspan="2"><ul style="margin: .5em auto; width: max-content;"><li>All columns have the same width, which depends on the TreeList width.</li><li>There is no horizontal scrollbar.</li></ul></td>
    </tr>
</table>

To allow the users to adjust or auto-fit the column widths to the content, enable [TreeList column resizing](slug:treelist-columns-resize). You can also [resize columns through the TreeList state](slug:treelist-state#methods) or [auto-fit columns programmatically](slug:treelist-columns-resize#autofit-columns).

> Single table rendering and automatic table layout are not supported.

## Recommendations

For predictable and user-friendly behavior, consider the following TreeList configuration:

* If the TreeList has a fixed width and you need horizontal scrolling, set widths to all columns. Use absolute units that do not depend on the browser viewport size.
* If the TreeList does not need horizontal scrolling and is not likely to shrink too much, then leave at least one column without a width. This ensures that all set column widths are respected and the width-less columns take up the remaining space.
* If the TreeList width is unpredictable and the width-less columns may shrink too much, then apply a `min-width` style to the TreeList tables, according to the example below.

>caption Apply a minimum width to the TreeList table in a responsive layout

````RAZOR
<TelerikSplitter Orientation="@SplitterOrientation.Horizontal">
    <SplitterPanes>
        <SplitterPane Size="120px" Collapsible="true">
            <p>Resize this pane to resize the TreeList.</p>
        </SplitterPane>
        <SplitterPane>
            <TelerikTreeList Data="@TreeListData"
                             IdField="@nameof(Employee.Id)"
                             ParentIdField="@nameof(Employee.ParentId)"
                             FilterMode="TreeListFilterMode.FilterMenu"
                             Sortable="true"
                             Height="360px"
                             Class="treelist-min-width">
                <TreeListColumns>
                    <TreeListColumn Field="@nameof(Employee.Id)" Width="90px" />
                    <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
                    <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="120px" />
                    <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="150px" />
                    <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="120px" />
                </TreeListColumns>
            </TelerikTreeList>
        </SplitterPane>
    </SplitterPanes>
</TelerikSplitter>

<style>
    .treelist-min-width .k-table {
        /* 480px set widths + at least 270px for the emaining Name column */
        min-width: 750px;
    }
</style>

@code {
    private List<Employee>? TreeListData { get; set; }

    private EmployeeService TreeListEmployeeService { get; set; } = new();

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await TreeListEmployeeService.Read();
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal? Salary { get; set; }
        public DateTime? HireDate { get; set; }
        public bool IsDriver { get; set; }
    }

    #region Data Service

    public class EmployeeService
    {
        private List<Employee> Items { get; set; } = new();

        private readonly int TreeLevelCount;
        private readonly int RootItemCount;
        private readonly int ChildItemCount;

        private int LastId { get; set; }
        private Random Rnd { get; set; } = Random.Shared;

        public async Task<List<Employee>> Read()
        {
            await SimulateAsyncOperation();
            return Items;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        private void PopulateChildren(List<Employee> items, int? parentId, int level)
        {
            int itemCount = level == 1 ? RootItemCount : ChildItemCount;
            for (int i = 1; i <= itemCount; i++)
            {
                int itemId = ++LastId;
                items.Add(new Employee()
                {
                    Id = itemId,
                    ParentId = parentId,
                    HasChildren = level < TreeLevelCount,
                    Name = $"Employee Name {itemId}", // {level}-{i}
                    Salary = Rnd.Next(1_000, 10_000) * 1.23m,
                    HireDate = DateTime.Today.AddDays(-Rnd.Next(365, 3650)),
                    IsDriver = itemId % 2 == 0
                });
                if (level < TreeLevelCount)
                {
                    PopulateChildren(items, itemId, level + 1);
                }
            }
        }

        public EmployeeService(int treeLevelCount = 3, int rootItemCount = 3, int childItemCount = 2)
        {
            TreeLevelCount = treeLevelCount;
            RootItemCount = rootItemCount;
            ChildItemCount = childItemCount;
            List<Employee> items = new();
            PopulateChildren(items, null, 1);
            Items = items;
        }
    }

    #endregion Data Service
}
````

# See Also

* [Column Resizing](slug:treelist-columns-resize)
