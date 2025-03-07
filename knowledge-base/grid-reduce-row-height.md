---
title: Reduce Grid Row Height and Cell Paddings
description: Learn how to decrease the Grid and TreeList row height and remove table cell paddings to make the rows smaller.
type: how-to
page_title: How To Reduce the Grid Row Height and Remove Cell Paddings
slug: grid-kb-reduce-row-height
tags: blazor, grid, treelist, styles, css
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to reduce the Grid row height?
* How to decrease the Grid cell paddings and height?

## Solution

There are two ways to reduce the row height:

* Use the [`Size` parameter](slug:grid-sizing). This will apply predefined amount of padding (empty space) around the cell content.
* Use [custom CSS to override the Telerik theme](slug:themes-override). This allows full control over the component styling.

The TreeList uses the same HTML output and CSS classes as the Grid. The suggested CSS code below is applicable to both components.

>caption Changing the Grid row height

````RAZOR
<h1>Change Grid Row Height</h1>

<h2>Use Default Styles</h2>

<TelerikGrid Data="@GridData">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Quantity)" />
    </GridColumns>
</TelerikGrid>

<h2>Use Grid <code>Size</code> Parameter</h2>

<TelerikGrid Data="@GridData"
             Size="@ThemeConstants.Grid.Size.Small">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Quantity)" />
    </GridColumns>
</TelerikGrid>

<h2>Use Custom CSS</h2>

<TelerikGrid Data="@GridData"
             Class="grid-reduce-row-height">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Quantity)" />
    </GridColumns>
</TelerikGrid>

<style>
    .grid-reduce-row-height .k-grid-header .k-table-th,
    .grid-reduce-row-height .k-grid-content .k-table-td {
        padding: 2px 4px;
        font-size: 12px;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 3; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000)
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
````

## See Also

* [How to Change the Grid Font Size](slug:grid-kb-change-font-size)
* [How to Change the Grid Size](slug:grid-sizing)
* [How to Override Telerik Theme CSS Styles](slug:themes-override)
