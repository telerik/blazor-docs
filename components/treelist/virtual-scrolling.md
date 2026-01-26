---
title: Virtual Scrolling
page_title: TreeList - Virtual Scrolling
description: Enable and configure the virtual scrolling of rows in the TreeList for Blazor.
slug: treelist-virtual-scrolling
tags: telerik,blazor,treelist,virtual,scrolling
published: True
position: 25
components: ["treelist"]
---
# TreeList Virtual Scrolling

The TreeList virtual scrolling feature allows users to scroll vertically through all records in the data source. The feature is an alternative to paging.

To enhance the rendering performance, the TreeList reuses the same set of HTML elements. Loading indicators (skeletons) appear in the table cells during scrolling and data loading. If the user scrolls back up after scrolling down to the next set of rows, the previous data reloads from the data source, similar to regular paging, with the scroll distance determining the data to be loaded.

You can also use the [Blazor TreeList virtualization for the TreeList columns](slug:treelist-columns-virtual).

## Using Virtual Scrolling

To enable Blazor TreeList row virtualization:

1. Set the `ScrollMode` parameter to `TreeListScrollMode.Virtual` (the default value is `Scrollable`).
1. [Set the `Height` parameter](#height) to a `string` CSS value.
1. [Set the `RowHeight` parameter](#rowheight) to a `decimal` value that denotes pixels.
1. [Set the `PageSize` parameter](#pagesize).

> The values of the `Height`, `RowHeight`, and `PageSize` parameters are related to one another. The following sections explain how.

## Height

Set the TreeList `Height` parameter to any [valid `string` CSS value](slug:common-features/dimensions), for example, `px`, `%`, `em`, or `vh`. If the TreeList should expand vertically, accoding to the available space, then check the article [Adjust Grid Height to Match the Browser Viewport Height](slug:grid-kb-adjust-height-with-browser).

Set the `Height` value, so that users can't see the whole [`PageSize` of items](#pagesize) at once. Otherwise, empty row skeletons may display in the TreeList while users are not scrolling.

## PageSize

Set the TreeList `PageSize` parameter to an `int` value. The `PageSize` determines how many table rows are populated and rendered at any given time.

Set the `PageSize` value, so that the rendered table rows do fit in the [TreeList height](#height). At least one table row must be completely invisible. Otherwise, empty row skeletons may display in the TreeList while users are not scrolling. The exact `PageSize` value allows you to balance between better user experience and rendering efficiency:

* A larger `PageSize` value will make the TreeList display empty row skeletons more rarely while users are scrolling down. At the same time, the TreeList may be re-rendering the same data items repetitively if the user scrolls just a little.
* A smaller `PageSize` will make the TreeList render a smaller number of items on each user scroll. At the same time, users will see row skeletons sooner or more frequently during scrolling.

## RowHeight

Set the `RowHeight` parameter to a `decimal` value. The TreeList uses it to set an inline `height` style in pixels to all TreeList table rows (`<tr>`).

The `RowHeight` value must be large enough to accommodate the cell content in all rows, even if the content differs. In other words, the `RowHeight` setting must apply the same or greater table row height than what the browser would normally render. The effective row height depends on:

* The cell content and text wrapping
* The CSS theme, including font size, line height, and cell paddings.

For example, the following list shows the minimum valid `RowHeight` values when using the [built-in CSS themes](slug:themes-overview), single-line plain text content, and no command buttons:

* `36` for the Default theme (`14px` font size, `20px` line height, and 2 * `8px` vertical paddings)
* `40` for the Bootstrap theme (`16px` font size, `24px` line height, and 2 * `8px` vertical paddings)
* `48` for the Material theme (`14px` font size, `28px` line height, and 2 * `10px` vertical paddings)
* `44` for the Fluent theme (`14px` font size, `20px` font size and 2 * `12px` vertical paddings)

> Browsers treat table row `height` styles as `min-height` styles. If the table row content cannot fit in the set `RowHeight`, the browser expands the table row. The TreeList configuration must not allow this to happen. It is crucial that all TreeList table rows display with the same effective height when using virtial scrolling, otherwise the virtual scrolling experience will break.

The `RowHeight` parameter value cannot change at runtime, unless the application recreates the whole TreeList component by removing it from the web page temporarily.

If necessary, you can also use the `RowHeight` parameter without virtual row scrolling.

## Limitations

There is a [browser limitation, which affects the maximum number of data items in a virtual TreeList](slug:grid-kb-virtualization-many-records). The problem occurs with millions of items and you can partially mitigate it by [changing the TreeList styles to make the row height smaller](slug:grid-kb-reduce-row-height).

In addition to virtual scrolling, another approach to optimize the rendering performance is to use [TreeList paging](slug:treelist-paging).

## Example

>caption Virtual TreeList scrolling

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 FilterMode="TreeListFilterMode.FilterMenu"
                 Height="360px"
                 PageSize="20"
                 RowHeight="40"
                 ScrollMode="@TreeListScrollMode.Virtual"
                 Sortable="true">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="160px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="160px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="120px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee>? TreeListData { get; set; }

    private EmployeeService TreeListEmployeeService { get; set; } = new(treeLevelCount: 3, rootItemCount: 10, childItemCount: 20);

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

## See Also

* [Live Demo: TreeList Virtual Scrolling](https://demos.telerik.com/blazor-ui/treelist/virtual-scrolling)
* [How to Disable Row Placeholders During Virtual Scrolling](slug:grid-kb-hide-virtual-row-skeletons)
