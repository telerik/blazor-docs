---
title: Filter Icon Not Highlighted 
description: This article demonstrates how to fix the filter menu icon not being highlighted when filters are applied programmatically.
type: troubleshooting
page_title: How to Highlight Filter Icon in a Blazor Grid with Pre-applied Filters
slug: grid-highlight-filter-icon
tags: grid, blazor, filter, highlight, initialization, compositefilterdescriptor
res_type: kb
ticketid: 1668133
components: ["grid"]
---
## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Grid for Blazor</td>
                <td>TreeList for Blazor</td>
	    </tr>
    </tbody>
</table>

## Description

When using the Grid for Blazor, applying a filter programmatically on initialization does not highlight the header filter icon. This behavior is expected when filters are manually applied by the user, indicating which columns are currently filtered.

## Cause

The issue arises due to the direct use of `FilterDescriptor` without wrapping it in a `CompositeFilterDescriptor`. The `CompositeFilterDescriptor` is necessary to group individual filters and ensure the UI reflects the applied filters correctly.

## Solution

To highlight the filter menu icon upon initialization, wrap the filter definitions in a `CompositeFilterDescriptor`. This approach ensures the Grid's UI accurately displays which filters are active.

Below is an example demonstrating how to initialize a Grid with a predefined filter on the "Released" column that highlights the filter icon correctly:

```RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="5"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Groupable="true"
             OnStateInit="@( (GridStateEventArgs<Product> args) => OnGridStateInit(args) )">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Released)" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }

    private async Task OnGridStateInit(GridStateEventArgs<Product> args)
    {
        var discontinuedColumnFilter = new CompositeFilterDescriptor()
        {
            FilterDescriptors = new FilterDescriptorCollection() {
                new FilterDescriptor()
                {
                   Member = "Released",
                   Operator = FilterOperator.IsLessThan,
                   Value = DateTime.Today,
                   MemberType = typeof(DateTime)
                }
            }
        };
        args.GridState.FilterDescriptors.Add(discontinuedColumnFilter);
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 12; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                Discontinued = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
```

## See Also

- [Grid Overview](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [Grid OnStateInit Event](https://docs.telerik.com/blazor-ui/components/grid/state#onstateinit)
