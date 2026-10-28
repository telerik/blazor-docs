---
title: Data Cells Don't Move During Grid Column Reordering with RowTemplate
description: Learn how to ensure that table data cells in a RowTemplate reorder together with the column headers during column reordering in a Telerik Blazor Grid and TreeList.
type: troubleshooting
page_title: Data Cells Don't Move During Grid Column Reordering with RowTemplate
meta_title: Data Cells Don't Move During Grid Column Reordering with RowTemplate
slug: grid-kb-cell-dont-move-with-headers-during-grid-column-reorder
tags: blazor, grid, treelist, rowtemplate, reordering
res_type: kb
ticketid: 1719992
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I am using a Grid with a [`RowTemplate`](slug:grid-templates-row) and [column reordering](slug:components/grid/columns/reorder) is enabled. When users drag a column to reorder it, the data cells don't move along with the column header cells. How to avoid this cell misalignment?

## Cause

Components like the Grid and TreeList have no control over custom template content, including `RowTemplate`. If column reordering is enabled, the app must programmatically reorder the data cells in the template after users reorder columns.

## Solution

The following algorithm and example are applicable to both the Telerik Blazor Grid and the TreeList.

To reorder data cells together with header cells during column reordering:

1. Use the [Grid `OnStateChanged` event](slug:grid-state#onstatechanged) to find out the [new column order](slug:grid-kb-column-state).
1. Render the table cells in the `RowTemplate`, depending on the current column order.
1. (optional) Use additional application logic to apply cell value formatting or other rendering customizations.

>caption Reorder Grid table data cells during column header reordering

```razor
@using System.Globalization
@using System.Reflection

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             TItem="@Product"
             Pageable="true"
             PageSize="5"
             Reorderable="true"
             Sortable="true"
             OnStateChanged="@OnGridStateChanged">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Width="90px" />
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Quantity)" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" />
    </GridColumns>
    <RowTemplate>
        @{
            List<GridColumnState> orderedColumns = GridColumnStates?
                .OrderBy(c => c.Index)
                .ToList() ?? new List<GridColumnState>();

            foreach (GridColumnState col in orderedColumns)
            {
                PropertyInfo? prop = context.GetType().GetProperty(col.Field);
                object? cellValue = prop?.GetValue(context);
                Type? type = prop is null ? null : Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;
                string? cellText = cellValue is IFormattable f && type is not null && CellFormats.TryGetValue(col.Field, out string? fmt)
                    ? f.ToString(fmt, CultureInfo.CurrentCulture)
                    : cellValue?.ToString();

                <td @key="@col" class="k-table-td">@cellText</td>
            }
        }
    </RowTemplate>
</TelerikGrid>

@code {
    private TelerikGrid<Product>? GridRef;
    private List<Product> GridData { get; set; } = new List<Product>();
    private List<GridColumnState>? GridColumnStates { get; set; }

    private readonly Dictionary<string, string> CellFormats = new Dictionary<string, string>()
    {
        { nameof(Product.Price), "c2"},
        { nameof(Product.Quantity), "n0"},
        { nameof(Product.ReleaseDate), "d"}
    };

    private void OnGridStateChanged(GridStateEventArgs<Product> args)
    {
        GridColumnStates = args.GridState.ColumnStates.ToList();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender && GridRef is not null)
        {
            GridColumnStates = GridRef.GetState().ColumnStates.ToList();
            StateHasChanged();
        }
    
        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 17; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 10000),
                ReleaseDate = DateTime.Today.AddDays(-rnd.Next(60, 1000))
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        public DateTime ReleaseDate { get; set; } = DateTime.Today;
    }
}
```

## See Also

* [Use Built-In Grid and TreeList Features Together with `RowTemplate`](slug:grid-kb-row-template-simulate-built-in-functions)
* [Get Grid or TreeList Column State, Index, Width and Visibility](slug:grid-kb-column-state)
* [Grid `RowTemplate`](slug:grid-templates-row)
* [TreeList `RowTemplate`](slug:treelist-templates-row)
