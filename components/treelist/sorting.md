---
title: Sorting
page_title: TreeList - Sorting
description: Enable and configure sorting in TreeList for Blazor.
slug: treelist-sorting
tags: telerik,blazor,treelist,sorting
published: True
position: 21
components: ["treelist"]
---

# TreeList Sorting

The TreeList component offers support for sorting.

To enable sorting, set the `Sortable` parameter to `true`.

When the user clicks the column header, the treelist will sort the data according to the column's data type, and an arrow indicator of the sorting direction will be shown next to the column title. Note that the hierarchical structure is kept, so an item's parent(s) will appear before the item.

You can prevent the user from sorting a certain field by setting `Sortable="false"` on its column.

You can sort the Treelist on the different columns and sorting is done according to the rules for the concrete column type. For example, rules for a `string` are different from rules for an `int`.

Sorting keeps the expanded/collapsed state of items. For example, if filtering brings into view a child whose parent is collapsed, you will only see the collapsed parent.

You can let the user sort by more than one field by setting the `SortMode` parameter to `Telerik.Blazor.SortMode.Multiple`.

The sorting criteria are stored in a [collection of `SortDescriptor`](slug:common-features-descriptors#sorting).

>caption Enable Sorting in the Telerik Blazor TreeList

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 Sortable="true"
                 SortMode="@SortMode.Multiple"
                 Height="90vh">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Id)" Width="90px" Sortable="false" />
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.Team)" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="120px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<Employee>? TreeListData { get; set; }

    protected override void OnInitialized()
    {
        TreeListData = new();
        PopulateChildren(TreeListData, null, 1);
    }

    private readonly int TreeLevelCount = 3;
    private readonly int RootItemCount = 3;
    private readonly int ChildItemCount = 2;

    private int LastId { get; set; }
    private Random Rnd { get; set; } = Random.Shared;

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
                Name = $"Employee {itemId}",
                Team = parentId.HasValue ? $"Team {parentId}" : "Executive Team",
                Salary = Rnd.Next(2, 6) * 1000m,
                HireDate = DateTime.Today.AddDays(-Rnd.Next(365, 3650)),
                IsDriver = itemId % 2 == 0
            });

            if (level < TreeLevelCount)
            {
                PopulateChildren(items, itemId, level + 1);
            }
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public decimal? Salary { get; set; }
        public DateTime? HireDate { get; set; }
        public bool IsDriver { get; set; }
    }
}
````

You can sort the TreeList from your own code through its [state](slug:treelist-state).

@[template](/_contentTemplates/treelist/state.md#initial-state)

>caption Set sorting programmatically

````RAZOR
@[template](/_contentTemplates/treelist/state.md#set-sort-from-code)
````

## See Also

* [Live Demo: TreeList Sorting](https://demos.telerik.com/blazor-ui/treelist/sorting)
