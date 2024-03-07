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
* The Columns without `Width` disappear or shrink when:
    * There are too many Columns.
    * Some or all Columns `Width`s are too big.
    * The browser viewport becomes too narrow.

2\. Scenario 2:
* None of the Grid Columns have `Width`.
* The Grid does not get a horizontal scrollbar.
* There are a lot of Columns and they shrink too much.


How can we keep the above implementations and:
* The Columns without `Width` not to disapear or shrink.
* Get a horizontal Grid scrollbar.

## Solution

Use the Grid's [`Class` parameter]({%slug grid-overview%}#grid-parameters) to set a custom CSS style. Set the `min-width` style for the Grid Tables. The `min-width` should be more than the sum of the all set Column [`Width` s]({%slug grid-columns-width%}). The width-less N number of Columns will receive 1/N of the remaining space. So if you set enough `min-width` this will ensure the width-less Columns do not disappear or shrink and you will get a horizontal Grid scrollbar.

````CSHTML
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

## Notes

If you have hierarchy, the style will apply to the detail tables as well. 
