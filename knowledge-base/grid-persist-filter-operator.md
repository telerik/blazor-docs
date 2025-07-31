---
title: Persist Grid Filter Operator After Value Clear
description: Learn how to set the filter operator of a Grid column, so that it's not lost after clearing the filter value.
type: how-to
page_title: How to Persist Grid Filter Operator After Clearing the Value
slug: grid-kb-persist-filter-operator
tags: telerik, blazor, grid, filter
ticketid: 1694386
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to keep the same filter operator across multiple filter operations in a Grid column?
* The set filter operator is lost when I clear the filter value. How to persist it?
* How to maintain a non-default filter operator when the user removes the current filter value?

## Solution

The suggested approach below applies to both the Grid and the TreeList.

1. Subscribe to the [Grid `OnStateChanged` event](slug:grid-state#events).
1. Check the [`PropertyName` value in the `OnStateChanged` event argument](slug:telerik.blazor.components.gridstateeventargs-1) to detect when the user is filtering.
1. Save the currently applied filter operators for each filtered column to some custom collection.
1. Compare the previously saved filters to the current ones. When the user removes the filter of a column, save the previous filter operator.
1. Once the user filters by a column that has a saved filter operator, restore this operator.

>caption Persist Grid filter operator

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             TItem="@Product"
             FilterMode="GridFilterMode.FilterRow"
             Pageable="true"
             Sortable="true"
             OnStateChanged="@OnGridStateChanged">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Group)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    private List<FilterDescriptor> SavedFilterDescriptors { get; set; } = new();
    private Dictionary<string, FilterOperator> ClearedFilterOperators { get; set; } = new();

    private void OnGridStateChanged(GridStateEventArgs<Product> args)
    {
        // Check if the user has changed the filter configuration
        if (args.PropertyName == "FilterDescriptors")
        {
            IEnumerable<CompositeFilterDescriptor> currentFilters = args.GridState.FilterDescriptors.OfType<CompositeFilterDescriptor>();

            // Iterate previously saved filters and compare to current ones
            foreach (FilterDescriptor savedOneColumnFd in SavedFilterDescriptors)
            {
                string savedMember = savedOneColumnFd.Member;
                object savedFilterValue = savedOneColumnFd.Value;
                FilterOperator savedOperator = savedOneColumnFd.Operator;

                if (!string.IsNullOrEmpty(savedFilterValue?.ToString()))
                {
                    // Search for current filters for the saved column
                    FilterDescriptor? currentOneColumnFd = currentFilters
                        .FirstOrDefault(x => x.FilterDescriptors.OfType<FilterDescriptor>().Any(y => y.Member == savedMember))?
                        .FilterDescriptors.OfType<FilterDescriptor>().First();

                    // Check if filter for the current column no longer exists
                    if (currentOneColumnFd is null)
                    {
                        // Save filter operator for future restore
                        if (ClearedFilterOperators.ContainsKey(savedMember))
                        {
                            ClearedFilterOperators[savedMember] = savedOperator;
                        }
                        else
                        {
                            ClearedFilterOperators.Add(savedMember, savedOperator);
                        }
                    }
                }
            }

            SavedFilterDescriptors.Clear();

            // Iterate current filters
            foreach (CompositeFilterDescriptor currentOneColumnCfd in currentFilters)
            {
                IEnumerable<FilterDescriptor> currentOneColumnFds = currentOneColumnCfd.FilterDescriptors.OfType<FilterDescriptor>();

                string currentMember = currentOneColumnFds.First().Member;
                FilterOperator currentOperator = currentOneColumnFds.First().Operator;
                object currentValuе = currentOneColumnFds.First().Value;

                // Detect new filter value after clearing and restore previous operator
                if (ClearedFilterOperators.ContainsKey(currentMember))
                {
                    currentOneColumnFds.First().Operator = currentOperator = ClearedFilterOperators[currentMember];
                    ClearedFilterOperators.Remove(currentMember);
                }

                // Save current filter state
                SavedFilterDescriptors.Add(new FilterDescriptor() { Member = currentMember, Operator = currentOperator, Value = currentValuе });
            }
        }
    }

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 57; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Group = $"Group {i % 3 + 1}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 10000),
                Released = DateTime.Today.AddDays(-rnd.Next(60, 1000)),
                Discontinued = i % 4 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Group { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Grid State](slug:grid-state)
* [Grid Filtering](slug:components/grid/filtering)
* [TreeList State](slug:treelist-state)
* [TreeList Filtering](slug:treelist-filtering)
