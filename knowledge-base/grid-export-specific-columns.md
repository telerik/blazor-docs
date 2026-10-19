---
title: Define the Exported Grid Columns
description: Define which columns the Telerik Grid for Blazor exports to Excel.
type: how-to
page_title: How to Define the Exported Grid Columns in Blazor
slug: grid-kb-export-specific-columns
tags: telerik, blazor, grid, export, excel, columns
res_type: kb
components: ["grid"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

Define exactly which data fields the Telerik Grid exports to an Excel file.

## Solution

Clear the `args.Columns` collection in the `OnBeforeExport` event handler and add one `GridExcelExportColumn` for each field. The `Field` property must match a property in the Grid data item.

>caption Define the exported Grid columns

````RAZOR
<TelerikGrid Data="@Products">
    <GridToolBar>
        <GridToolBarExcelExportTool>Export to Excel</GridToolBarExcelExportTool>
    </GridToolBar>
    <GridSettings>
        <GridExcelExport OnBeforeExport="@OnBeforeExcelExport" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> Products { get; set; } = new()
    {
        new Product { Name = "Product 1", Price = 12.50m },
        new Product { Name = "Product 2", Price = 24.00m }
    };

    private void OnBeforeExcelExport(GridBeforeExcelExportEventArgs args)
    {
        args.Columns.Clear();
        args.Columns.Add(new GridExcelExportColumn
        {
            Field = nameof(Product.Name),
            Title = "Product",
            Width = "180px"
        });
        args.Columns.Add(new GridExcelExportColumn
        {
            Field = nameof(Product.Price),
            Title = "Price",
            NumberFormat = "$#,##0.00"
        });
    }

    public class Product
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
````

## See Also

* [Grid Export Events](slug:grid-export-events)
* [Export Selected Grid Rows](slug:grid-kb-export-selected-rows)