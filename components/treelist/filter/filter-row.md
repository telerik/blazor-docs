---
title: Filter Row
page_title: TreeList - Filter Row
description: Enable and configure Filter Row in TreeList for Blazor.
slug: treelist-filter-row
tags: telerik,blazor,TreeList,filtering,filter,row
published: True
position: 5
components: ["treelist"]
---
# TreeList Filter Row

One of the [filter modes of the treelist](slug:treelist-filtering) is a row of filter elements below the column headers.

In this article:

* [Basics](#basics)
* [Filter From Code](#filter-from-code)
* [Customization](#customization)

## Basics

To enable the TreeList filter row, set the component's `FilterMode` parameter to `TreeListFilterMode.FilterRow` and make sure that all filterable columns have their `Field` parameter set.

````RAZOR.skip-repl
<TelerikTreeList FilterMode="@TreeListFilterMode.FilterRow" />
````

The TreeList will render a row below the column headers with UI that you can use to fill in the filter criteria. You can type in the input to execute the default operator as you type, or click a button to choose a different filter operator (like "contains", "greater than" and so on). Filters are applied as the user types in the inputs. Once you enter a filter criteria, the clear button will be enabled to allow you to reset the filter state.

## Customization

You can customize the default behavior of the filter row with parameters of the columns and the TreeList.

### Configuring the Filter Row

You can override the default Filter Row behavior for each column through the following properties the `TreeListColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Filter Row Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example [Filter Row Template](slug:treelist-templates-filter#filter-row-template) article.

## Filter From Code

To learn how to programmatically filter the TreeList, refer to the [TreeList State](slug:treelist-state) documentation article. You can filter the TreeList on initial display with the [`OnStateInit` event](slug:treelist-state#onstateinit) or at any time afterwards with the [`SetStateAsync()` method](slug:treelist-state#methods).

## Example

>caption Using the TreeList Filter Row

````RAZOR
@using Telerik.DataSource

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ItemsField="@nameof(Employee.Items)"
                 FilterMode="@TreeListFilterMode.FilterRow"
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
* [Live Demo: TreeList Filter Row](https://demos.telerik.com/blazor-ui/treelist/filter-row)
