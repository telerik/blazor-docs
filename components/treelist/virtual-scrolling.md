---
title: Virtual Scrolling
page_title: TreeList - Sorting
description: Enable and configure the virtual scrolling of rows in the TreeList for Blazor.
slug: treelist-virtual-scrolling
tags: telerik,blazor,treelist,virtual,rows,scrolling
published: True
position: 25
---

# TreeList Virtual Scrolling


Virtual scrolling provides an alternative to paging. Instead of utilizing a pager, the user vertically scrolls through all records in the data source.

To enhance rendering performance, the TreeList reuses the same set of HTML elements. As the next data loads, a loading indicator appears on the cells. If the user scrolls back up after scrolling down to the next set of rows, the previous data reloads from the data source, similar to regular paging, with the scroll distance determining the data to be loaded.

## Enabling Virtual Scrolling

* Set the `ScrollMode` parameter to `TreeListScrollMode.Virtual` (the default value is `Scrollable`).
* Set the `Height` and `RowHeight` parameters.

>caption Enable Sorting in Telerik TreeList

````CSHTML
<TelerikTreeList Data="@TreeListData"
                 ScrollMode="@TreeListScrollMode.Virtual"
                 Height="500px"
                 RowHeight="50"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterMenu">
    <TreeListColumns>
        <TreeListColumn Expandable="true" Field="FirstName" Title="First Name" />
        <TreeListColumn Field="LastName" Title="Last Name" />
        <TreeListColumn Field="Position" />
    </TreeListColumns>
</TelerikTreeList>

@code {

    private List<Employee> TreeListData { get; set; }

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();

        for (int i = 1; i <= 1000; i++)
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

## Notes

There are several things to keep in mind when using virtual scrolling:

* The `RowHeight` is a decimal value that is always considered as pixel values. The TreeList `Height` does not have to be in pixels, but it may help you calculate the `PageSize` (see below).

    * If the row/cell height the browser would render is larger than the `RowHeight` value, the browser will ignore it. It can depend on the chosen Theme or other CSS rules, or on cell data that falls on more than one row. Inspect the rendered HTML to make sure the grid setting matches the rendering.

        The default TreeList rendering has padding in the cells, and the loading sign has a line height set in order to render. This may impose some minimum heights that can vary with the theme and/or custom styles on the page.

    * The `RowHeight` must not change at runtime, because the new dimensions will cause issues with the scrolling logic.

    * Browser zoom or monitor DPI settings can cause the browser to render different dimensions than the expected and/or non-integer values, which can break the virtualization logic.

* Do not mix virtualization with paging, as they are alternatives to the same feature.

* Provide for a `PageSize` of the TreeList that is large enough, so that the loaded table rows do not fit in the scrollable data area, otherwise the vertical virtual scrollbar will not be created and scrolling will not work. To do this, take into account the `Height` of the TreeList and the `RowHeight`.

    * The `PageSize` controls how many rows are rendered at any given time, and how many items are requested from the data source when loading data on demand (see below). You should avoid setting large page sizes, you need to only fill up the TreeList data viewport.

## See Also

  * [Live Demo: TreeList Virtual Scrolling](https://demos.telerik.com/blazor-ui/treelist/virtual-scrolling)
   
