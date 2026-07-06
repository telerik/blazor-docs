```markdown
---
title: Using the Row Filter Operator Equals Does Not Match DateTime Values Unless the Time Part Is Zero
description: Learn how to correctly filter DateTime values in the Grid component of UI for Blazor using the Equals operator.
type: how-to
page_title: Filtering DateTime Values in UI for Blazor Grid with Equals Operator
meta_title: Filtering DateTime Values in UI for Blazor Grid with Equals Operator
slug: filtering-datetime-values-ui-for-blazor-grid
tags: ui-for-blazor, grid, datetime, filtering
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> UI for Blazor Grid </td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

When filtering DateTime values in the [UI for Blazor Grid](https://docs.telerik.com/blazor-ui/components/grid/overview) using the "Equals" operator, the filter does not match values unless the time part of the DateTime is exactly zero. This happens because the "Equals" operator matches the entire DateTime value, including both the date and time portions.

This knowledge base article also answers the following questions:
- Why does filtering by DateTime in the Grid only work when the time is zero?
- How to filter DateTime values in UI for Blazor Grid correctly?
- How to ignore the time part when filtering DateTime in the Grid?

## Solution

To filter DateTime values in the Grid while ignoring the time component, use a custom filter. Follow these steps:

1. Add a custom filter to compare only the date portion of the DateTime value.
2. Use the `FilterTemplate` of the Grid column to implement the custom filter logic.

### Example Implementation

In this example, the `OrderDate` column in the Grid is filtered to match only the date part:

```razor
@using System.Linq

<TelerikGrid Data="@GridData" FilterMode="Telerik.Blazor.GridFilterMode.FilterMenu" Height="500px">
    <GridColumns>
        <GridColumn Field="OrderDate" Title="Order Date">
            <FilterTemplate>
                <DatePicker @bind-Value="@selectedDate" />
                <button @onclick="@(() => ApplyDateFilter(selectedDate))">Filter</button>
            </FilterTemplate>
        </GridColumn>
        <GridColumn Field="OrderID" Title="Order ID" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Order> GridData = new List<Order>
    {
        new Order { OrderID = 1, OrderDate = new DateTime(2023, 10, 1, 14, 30, 0) },
        new Order { OrderID = 2, OrderDate = new DateTime(2023, 10, 2, 10, 0, 0) }
    };

    private DateTime? selectedDate;

    private void ApplyDateFilter(DateTime? date)
    {
        if (date.HasValue)
        {
            GridData = GridData.Where(o => o.OrderDate.Date == date.Value.Date).ToList();
        }
    }

    public class Order
    {
        public int OrderID { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
```

### Explanation of the Code
1. The `FilterTemplate` includes a `DatePicker` for selecting a date and a button to apply the filter.
2. The `ApplyDateFilter` method filters the data by comparing only the date part of the `OrderDate` field.

## See Also

- [UI for Blazor Grid Documentation](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [DatePicker Documentation](https://docs.telerik.com/blazor-ui/components/datepicker/overview)
- [Grid Filtering Documentation](https://docs.telerik.com/blazor-ui/components/grid/filtering)
```
