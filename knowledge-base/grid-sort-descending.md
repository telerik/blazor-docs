---
title: Sort Grid Column Descending
description: How to sort a Grid column descending first, and then ascending.
type: how-to
page_title: How to Sort a Grid Column Descending First
slug: grid-kb-sort-descending
position: 
tags: grid, sorting, state
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to sort a Grid column descending first, and then ascending?

How to reverse the Grid sorting logic for a column?


## Solution

This scenario requires knowledge about the [Grid State](slug:grid-state). Get familiar with the following sections first:

* [Information in the Grid State](slug:grid-state#information-in-the-grid-state)
* [Grid `OnStateChanged` Event](slug:grid-state#onstatechanged)
* [Grid State Methods](slug:grid-state#methods)

The Grid always tries to maintain the following order of sorting states for each column:

No sorting &gt; Ascending &gt; Descending &gt; No sorting &gt; ...

Let's assume that the Grid has a `Stock` column which is not sorted, but it should be sorted descending first, if the user clicks on the header. The required algorithm to intercept sorting and change the sort direction is:

1. Set a helper variable that will keep the previous sort state of the `Stock` column. If the column is unsorted by default, then the helper variable can be equal to `null`.
1. Subscribe to the [Grid `OnStateChanged` Event](slug:grid-state#onstatechanged).
1. Check if the user has changed the sort state by checking if `args.PropertyName` is `"SortDescriptors"`.
1. If yes, then iterate `args.GridState.SortDescriptors` and check if the `Stock` column is now sorted, what is the sort direction, and what was the previous sort direction.
1. Depending on the current situation, either override the `SortDirection` property of the [`SortDescriptor`](slug:telerik.datasource.sortdescriptor), or add a new `SortDescriptor` to the `args.GridState.SortDescriptors`. The logic will vary, depending on the Grid `SortMode` (`Single` or `Multiple`).
1. Use the [Grid `SetStateAsync` method](slug:grid-state#methods) to apply the modified Grid state to the component instance.

>caption Sort a Grid column descending first

````RAZOR
@using Telerik.DataSource

Grid SortMode:

<TelerikRadioGroup Data="@RadioGroupData"
                   Value="@GridSortMode"
                   ValueChanged="@( (SortMode newMode) => OnRadioGroupValueChanged(newMode) )"/>

<br /><br />

The Stock column will sort <strong>descending</strong> first.
The Name and Price columns will sort <strong>ascending</strong> first.

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Sortable="true"
             SortMode="@GridSortMode"
             Pageable="true"
             OnStateChanged="@( (GridStateEventArgs<Product> args) => OnGridStateChanged(args) )">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Stock)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Product> GridRef { get; set; } = null!;

    private List<Product> GridData { get; set; } = new List<Product>();

    private SortMode GridSortMode { get; set; } = SortMode.Single;

    private ListSortDirection? LastStockSort { get; set; } = null;

    private List<SortMode> RadioGroupData { get; set; } = new List<SortMode>() {
        SortMode.Single, SortMode.Multiple
    };

    private async Task OnGridStateChanged(GridStateEventArgs<Product> args)
    {
        if (args.PropertyName == "SortDescriptors")
        {
            if (LastStockSort == ListSortDirection.Descending && (
                (GridSortMode == SortMode.Multiple && !args.GridState.SortDescriptors.Any(x => x.Member == nameof(Product.Stock))) ||
                (GridSortMode == SortMode.Single && !args.GridState.SortDescriptors.Any())
                )
            )
            {
                // override Stock sorting from None to Ascending
                args.GridState.SortDescriptors.Add(new SortDescriptor()
                {
                    Member = nameof(Product.Stock),
                    SortDirection = ListSortDirection.Ascending
                });
            }
            else
            {
                SortDescriptor stockDescriptorToRemove = null;

                foreach (var sd in args.GridState.SortDescriptors)
                {
                    if (sd.Member == nameof(Product.Stock))
                    {
                        if (sd.SortDirection == ListSortDirection.Ascending &&
                            LastStockSort == null)
                        {
                            // override Stock sorting from Ascending to Descending
                            sd.SortDirection = ListSortDirection.Descending;
                            LastStockSort = ListSortDirection.Descending;
                        }
                        else if (sd.SortDirection == ListSortDirection.Descending &&
                            LastStockSort == ListSortDirection.Ascending)
                        {
                            // override Stock sorting from Ascending to none
                            stockDescriptorToRemove = sd;
                            break;
                        }
                    }
                }

                args.GridState.SortDescriptors.Remove(stockDescriptorToRemove);
            }

            var currentStockDescriptor = args.GridState.SortDescriptors.FirstOrDefault(x => x.Member == nameof(Product.Stock));

            if (currentStockDescriptor == null)
            {
                LastStockSort = null;
            }
            else
            {
                LastStockSort = currentStockDescriptor.SortDirection;
            }

            await GridRef.SetStateAsync(args.GridState);
        }
    }

    private async Task OnRadioGroupValueChanged(SortMode newMode)
    {
        GridSortMode = newMode;
        LastStockSort = null;
        await GridRef.SetStateAsync(null);
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 33; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Price = (decimal)rnd.Next(1, 4) * 100m,
                Stock = 50 - rnd.Next(1, 4),
                ReleaseDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                InProduction = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool InProduction { get; set; }
    }
}
````

## See Also

* [Grid State documentation](slug:grid-state)
* [GridState API reference](slug:Telerik.Blazor.Components.GridState-1)
