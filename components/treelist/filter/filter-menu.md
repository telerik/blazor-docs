---
title: Filter Menu
page_title: TreeList - Filter Menu
description: Enable and configure Filter Menu in TreeList for Blazor.
slug: treelist-filter-menu
tags: telerik,blazor,TreeList,filtering,filter,menu
published: True
position: 10
components: ["treelist"]
---

# TreeList Filter Menu

The `FilterMenu` filter mode renders a button in the column header. When you click the button, a popup with filtering options appears. The popup allows you to apply two filter criteria, choose a suitable filter operator and buttons to apply, or clear the filter.

## Enabling Filter Menu

Set the `FilterMode` parameter of the Telerik TreeList to `TreeListFilterMode.FilterMenu` and make sure that all filterable columns have their `Field` parameter set.

````RAZOR.skip-repl
<TelerikTreeList FilterMode="@TreeListFilterMode.FilterMenu" />
````

Also see the full [runnable example](#example) below.

## Customization

You can customize the default behavior of the Filter Menu with parameters of the columns and the TreeList.

### Configuring the Filter Menu

You can override the default Filter Row behavior for each column through the following property the `TreeListColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-menu-customization-properties)

### Filter Menu Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter  Menu Template](slug:treelist-templates-filter#filter-menu-template) article.

## Filter From Code

To learn how to programmatically filter the TreeList, refer to the [TreeList State](slug:treelist-state) documentation article. You can filter the TreeList on initial display with the [`OnStateInit` event](slug:treelist-state#onstateinit) or at any time afterwards with the [`SetStateAsync()` method](slug:treelist-state#methods).

## Example

>caption Using the TreeList Filter Menu

````RAZOR
@using Telerik.DataSource

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ItemsField="@nameof(Employee.Items)"
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 FilterRowDebounceDelay="200"
                 Height="400px">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Id)"
                        ShowFilterCellButtons="false"
                        Width="100px" />
        <TreeListColumn Field="@nameof(Employee.Name)"
                        Expandable="true"
                        DefaultFilterOperator="@FilterOperator.Contains" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="180px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)"
                        DisplayFormat="{0:d}"
                        DefaultFilterOperator="@FilterOperator.IsGreaterThanOrEqualTo"
                        FilterEditorFormat="d"
                        FilterEditorType="@TreeListFilterEditorType.DatePicker"
                        Width="180px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="120px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee>? TreeListData { get; set; }

    protected override void OnInitialized()
    {
        TreeListData = new();
        PopulateItems(TreeListData, 1);
    }

    #region Data Generation

    private readonly int TreeLevelCount = 3;
    private readonly int RootItemCount = 3;
    private readonly int ChildItemCount = 2;

    private int LastId { get; set; }
    private readonly Random Rnd = Random.Shared;


    private void PopulateItems(List<Employee> items, int level)
    {
        for (int i = 1; i <= (level == 1 ? RootItemCount : ChildItemCount); i++)
        {
            var itemId = ++LastId;

            var newItem = new Employee()
            {
                Id = itemId,
                HasChildren = level < TreeLevelCount,
                Name = $"Employee Name {itemId}",
                Notes = $"Multi-line\nnotes {itemId}",
                Salary = Rnd.Next(1_000, 10_000) * 1.23m,
                HireDate = DateTime.Today.AddDays(-Rnd.Next(365, 3650)),
                IsDriver = itemId % 2 == 0
            };

            items.Add(newItem);
        }

        if (level < TreeLevelCount)
        {
            PopulateChildren(items, level + 1);
        }
    }

    private void PopulateChildren(List<Employee> items, int level)
    {
        foreach (var item in items)
        {
            item.Items = new List<Employee>();

            PopulateItems(item.Items, level);
        }
    }

    #endregion Data Generation

    public class Employee
    {
        public int Id { get; set; }
        public bool HasChildren { get; set; }
        public List<Employee>? Items { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public decimal? Salary { get; set; }
        public DateTime? HireDate { get; set; }
        public bool IsDriver { get; set; }
    }
}
````

## See Also

* [Treelist Filtering Overview](slug:treelist-filtering)
* [Live Demo: TreeList Filter Menu](https://demos.telerik.com/blazor-ui/treelist/filter-menu)
