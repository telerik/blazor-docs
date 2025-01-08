---
title: Horizontal Grid Scrolling without Column Widths
description: How to avoid shrinking or disappearing of Grid columns that have no column widths? How to get a horizontal scrollbar when the Grid columns have no widths?
type: how-to
page_title: How to Get Horizontal Scrollbar With no Grid Column Widths
slug: grid-kb-horizontal-scrolling-no-column-widths
position:
tags: telerik, blazor, grid, column, css
ticketid: 1588667, 1576220, 1615618
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

This knowledge base article gives solution to the following scenario:

* Some or none of the Grid columns have a `Width`.
* The columns without a `Width` shrink too much or disappear when the browser window or the Grid become narrow. This phenomenon occurs no matter if the Grid shows a horizontal scrollbar or not.


How to keep the above column `Width` configuration and:

* The width-less columns remain visible and do not shrink or disappear.
* The Grid shows a horizontal scrollbar.

## Solution

1. Use the Grid's [`Class` parameter](slug://grid-overview#grid-parameters) to set a custom CSS class.
1. Set a `min-width` style for the Grid table elements through the custom CSS class. The `min-width` value must be greater than the sum of the all set column [`Width`s](slug://grid-columns-width).

As a result, the width-less N number of columns will receive 1/N of the remaining space. A large-enough `min-width` value will ensure that the width-less columns remain visible and wide enough.

The Grid will show a horizontal scrollbar when its width is less than the table `min-width`.

````RAZOR
<TelerikGrid Data="@GridData"
             Class="grid-min-width"
             Height="400px">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="200px" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" />
    </GridColumns>
</TelerikGrid>

<style>
    .grid-min-width .k-table {
        min-width: 600px;
    }
    /* optional - reset the min-width for detail Grids */
    .grid-min-width .k-table .k-table {
        min-width: auto;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product
            {
                Id = i,
                Name = "Product name " + i,
                Price = (decimal)(rnd.Next(1, 50) * 3.14),
                Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)),
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
    }
}
````

## See Also

* [Grid column width behavior](slug://grid-columns-width)
