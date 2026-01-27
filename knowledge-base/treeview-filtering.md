---
title: Filter or Search TreeView Items
description: How to filter TreeView items by different filter operators. How to search in TreeView items.
type: how-to
page_title: How to Filter or Search TreeView Items
slug: treeview-kb-filter-items
position: 
tags: telerik, blazor, treeview, filter, search
ticketid: 1684940, 1629723, 1468684, 1547890, 1578053, 1541792
res_type: kb
components: ["treeview"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeView for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to build manual filter function for the Telerik Blazor TreeView?
* How to filter TreeView items?
* How to allow users to search in the TreeView items?
* How to put search box in the Tree View to filter tree records?
* How to search the TreeView nodes, for example, folders and files?
* How to highlight the search text in the found TreeView items?


## Solution

There are different ways to implement TreeView filtering, depending on the used [TreeView data binding](slug:components/treeview/data-binding/overview).

The suggested approach below relies on [flat TreeView data](slug:components/treeview/data-binding/flat-data). See this [TreeView demo for a hierarchy data filtering example](https://demos.telerik.com/blazor-ui/treeview/manual-filtering).

In both scenarios, there should be no [loading of TreeView items on demand](slug:components/treeview/data-binding/load-on-demand), otherwise the filtering will not provide all possible results.

1. Add a [TextBox](slug:components/textbox/overview) for the filter string.
1. (optional) Add a [DropDownList](slug:components/dropdownlist/overview) or another suitable component for the [filter operator](slug:Telerik.DataSource.FilterOperator).
1. Use a [Button `OnClick` event](slug:button-events) or the [TextBox `ValueChanged` event](slug:components/textbox/events) to trigger the TreeView item search process.
1. Create a [`DataSourceRequest` object](slug:Telerik.DataSource.DataSourceRequest) and populate its `Filters` property with a single [`FilterDescriptor`](slug:Telerik.DataSource.FilterDescriptor).
    * If you need more complex filtering logic, use one or more [`CompositeFilterDescriptor`](slug:Telerik.DataSource.CompositeFilterDescriptor)s.
1. Execute the [`ToDataSourceResult()` extension method](slug:common-features-data-binding-onread#todatasourceresult-method) on the TreeView `Data`. You will need to import the [`Telerik.DataSource.Extensions` namespace](slug:Telerik.DataSource.Extensions).
1. (optional) Add any missing parent items to the filtered items collection.
1. (optional) Set the [TreeView `ExpandedItems` parameter to expand or collapse the parent TreeView items](slug:treeview-expand-items) after filtering.
1. (optional) Use a [TreeView `ItemTemplate`](slug:components/treeview/templates) to highlight the search string inside the displayed TreeView items.

>tip If the filtering operator is fixed (for example, `Contains`), you can replace steps 4 and 5 with a standard LINQ expression:
>
> `var filteredItems = FlatData.Where(x => x.Text.Contains(TreeViewFilterValue)).ToList();`

>caption Searching TreeView items with different filter operators

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikTextBox Value="@TreeViewFilterValue"
                ValueChanged="@TreeViewFilterValueChanged"
                DebounceDelay="500"
                Placeholder="Type number or letter"
                Width="180px" />

<TelerikDropDownList Data="@StringFilterOperators"
                     TItem="@FilterOperatorItem"
                     TValue="@FilterOperator"
                     TextField="@nameof(FilterOperatorItem.Text)"
                     ValueField="@nameof(FilterOperatorItem.Operator)"
                     Value="@TreeViewFilterOperator"
                     ValueChanged="@TreeViewFilterOperatorChanged"
                     Width="180px" />

<label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@ShouldExpandFilteredItems" />
    Expand Filter Results
</label>

<p>@FilterLog</p>

<TelerikTreeView Data="@FilteredData" @bind-ExpandedItems="@ExpandedItems">
    <TreeViewBindings>
        <TreeViewBinding>
            <ItemTemplate>
                @{
                    var item = (TreeItem)context;

                    if (string.IsNullOrEmpty(TreeViewFilterValue) ||
                        TreeViewFilterOperator == FilterOperator.DoesNotContain)
                    {
                        @item.Text
                    }
                    else if (TreeViewFilterOperator == FilterOperator.IsContainedIn &&
                        TreeViewFilterValue.Contains(item.Text))
                    {
                        <strong>@item.Text</strong>
                    }
                    else
                    {
                        @( new MarkupString(item.Text.Replace(
                                TreeViewFilterValue,
                                $"<strong>{TreeViewFilterValue.ToUpper()}</strong>",
                                StringComparison.InvariantCultureIgnoreCase)
                        ) )
                    }
                }
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

<style>
    .k-treeview strong {
        color: red;
        background: yellow;
    }
</style>

@code {
    private List<TreeItem> FlatData { get; set; } = new List<TreeItem>();
    private List<TreeItem> FilteredData { get; set; } = new List<TreeItem>();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    private string FilterLog { get; set; } = string.Empty;
    private bool ShouldExpandFilteredItems { get; set; } = true;

    #region Filtering Logic

    private string TreeViewFilterValue { get; set; } = string.Empty;
    private FilterOperator TreeViewFilterOperator { get; set; } = FilterOperator.Contains;

    private List<FilterOperatorItem> StringFilterOperators { get; set; } = new List<FilterOperatorItem>() {
        new FilterOperatorItem() { Operator = FilterOperator.IsEqualTo, Text = "Is Equal To" },
        new FilterOperatorItem() { Operator = FilterOperator.StartsWith, Text = "Starts With" },
        new FilterOperatorItem() { Operator = FilterOperator.Contains, Text = "Contains" },
        new FilterOperatorItem() { Operator = FilterOperator.DoesNotContain, Text = "Does Not Contain" },
        new FilterOperatorItem() { Operator = FilterOperator.EndsWith, Text = "Ends With" },
        new FilterOperatorItem() { Operator = FilterOperator.IsContainedIn, Text = "Is Contained In" }
    };

    private void TreeViewFilterOperatorChanged(FilterOperator newValue)
    {
        TreeViewFilterOperator = newValue;

        if (!string.IsNullOrEmpty(TreeViewFilterValue))
        {
            FilterTreeView();
        }
    }

    private void TreeViewFilterValueChanged(string newValue)
    {
        TreeViewFilterValue = newValue;

        if (!string.IsNullOrEmpty(TreeViewFilterValue))
        {
            FilterTreeView();
        }
        else
        {
            FilterLog = $"Showing all {FlatData.Count} items.";

            FilteredData = FlatData;

            ExpandedItems = FlatData.Where(x => x.ParentId is null);
        }
    }

    private void FilterTreeView()
    {
        var request = new DataSourceRequest()
        {
            Filters = new List<IFilterDescriptor>() {
                new FilterDescriptor()
                {
                    Member = nameof(TreeItem.Text),
                    MemberType = typeof(string),
                    Operator = TreeViewFilterOperator,
                    Value = TreeViewFilterValue
                }
            }
        };

        var result = FlatData.ToDataSourceResult(request);

        var filteredItems = result.Data.Cast<TreeItem>().ToList();
        var matchCount = filteredItems.Count;

        var addedParents = new List<TreeItem>();

        foreach (var item in filteredItems)
        {
            PopulateParent(item.Id, item.ParentId, filteredItems, addedParents);
        }

        filteredItems.AddRange(addedParents);

        FilterLog = $"Found {matchCount} matches. Showing {filteredItems.Count} out of {FlatData.Count} items.";

        FilteredData = filteredItems;

        if (ShouldExpandFilteredItems)
        {
            ExpandedItems = FilteredData;
        }
    }

    private void PopulateParent(int itemId, int? parentId, List<TreeItem> filteredItems, List<TreeItem> addedParents)
    {
        var parentItem = FlatData.FirstOrDefault(x => x.Id == parentId);

        if (parentItem != null)
        {
            if (filteredItems.FindIndex(x => x.Id == parentItem.Id) == -1 &&
                addedParents.FindIndex(x => x.Id == parentItem.Id) == -1)
            {
                addedParents.Add(parentItem);
            }

            if (parentItem.ParentId != null)
            {
                PopulateParent(parentItem.Id, parentItem.ParentId, filteredItems, addedParents);
            }
        }
    }

    #endregion Filtering Logic

    #region Data Generation and Classes

    private int TreeLevels { get; set; } = 3;
    private int RootItems { get; set; } = 3;
    private int ItemsPerLevel { get; set; } = 2;
    private int IdCounter { get; set; } = 1;
    private Random Rnd { get; set; } = new Random();

    protected override void OnInitialized()
    {
        FlatData = FilteredData = LoadFlat();

        ExpandedItems = FlatData.Where(x => x.ParentId is null);
    }

    private List<TreeItem> LoadFlat()
    {
        List<TreeItem> items = new List<TreeItem>();

        PopulateChildren(items, null, 1);

        return items;
    }

    private void PopulateChildren(List<TreeItem> items, int? parentId, int level)
    {
        var itemCount = level == 1 ? RootItems : ItemsPerLevel;

        for (int i = 1; i <= itemCount; i++)
        {
            var itemId = IdCounter++;

            items.Add(new TreeItem()
            {
                Id = itemId,
                Text = $"{itemId} " +
                    $"{(char)Rnd.Next(65, 91)}{(char)Rnd.Next(65, 91)}{(char)Rnd.Next(65, 91)} " +
                    $"{Rnd.Next(0, 10)}{Rnd.Next(0, 10)}{Rnd.Next(0, 10)}",
                ParentId = parentId,
                HasChildren = level < TreeLevels
            });

            if (level < TreeLevels)
            {
                PopulateChildren(items, itemId, level + 1);
            }
        }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }

    public class FilterOperatorItem
    {
        public FilterOperator Operator { get; set; }
        public string Text { get; set; } = string.Empty;
    }

    #endregion Data Generation and Classes
}
````


## See Also

* [TreeView Filtering with Hierarchy Data](https://demos.telerik.com/blazor-ui/treeview/manual-filtering)
* [ToDataSourceResult Method](slug:common-features-data-binding-onread#todatasourceresult-method)
* [DataSourceRequest API Reference](slug:Telerik.DataSource.DataSourceRequest)
* [TreeView Item Template](slug:components/treeview/templates)
