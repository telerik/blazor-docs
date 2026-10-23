---
title: Prevent RowTemplate Cell Content from Shifting During Header Reordering in Telerik Blazor TreeList
description: Learn how to ensure that cell content in a RowTemplate does not shift when reordering headers in a Telerik Blazor TreeList.
type: troubleshooting
page_title: Fix RowTemplate Cell Misalignment with Header Reordering in Telerik Blazor TreeList
meta_title: Fix RowTemplate Cell Misalignment with Header Reordering in Telerik Blazor TreeList
slug: prevent-rowtemplate-cell-shifting-header-reordering-treelist
tags: blazor, treelist, rowtemplate, column-reordering, cell-alignment
res_type: kb
ticketid: 1719992
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td>
Grid for UI for Blazor
</td>
</tr>
</tbody>
</table>

## Description

I want to prevent cell content in the [TreeList](https://docs.telerik.com/blazor-ui/components/treelist/overview) RowTemplate from shifting when headers are reordered. Currently, when moving columns, the content in the cells does not move along with the headers.

## Cause

The TreeList does not control the content in a RowTemplate. If column reordering is enabled, the application must ensure the correct table cell order in the RowTemplate to align with the header.

## Solution

To fix this issue, ensure that the cells in the RowTemplate are ordered dynamically based on the column states. Use the `OnStateChanged` event to track column reordering and update the cell order accordingly.

1. Use the `OnStateChanged` event to track column reordering.
2. Dynamically order the cells in the RowTemplate based on the column states.
3. Use `TreeListColumnStates` to align the cell order with the header order.

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

- [TreeList RowTemplate](https://docs.telerik.com/blazor-ui/components/treelist/templates/row)
- [Enable Column Reordering in the TreeList](https://docs.telerik.com/blazor-ui/components/treelist/reordering)
- [TreeList GetState Method](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeList-1#getstate)
