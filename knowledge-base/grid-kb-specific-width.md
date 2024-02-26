---
title: Horizontal Grid Scrolling without Column Widths
description: How to distribute the available Grid Width to some columns only?
type: how-to
page_title: Available Grid Width distributed to some Columns
slug: grid-kb-specific-width
position:
tags: telerik, blazor, grid, column, css
ticketid: 1635964
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

How to modify the [Grid Column Width Behavior]({%slug grid-columns-width%}) in this case:

* When all column widths are explicitly set and the cumulative column width is less than the available Grid width, the remaining width is distributed evenly between all columns

so the remaining Grid `Width` to be distributed only to some columns, alternatively lock the `Width` for some columns?


## Solution

Here are three possible solutions:

1\. You can leave the columns you are fine to grow without width.

>important Notes:
>
* If the cumulative width of columns with set widths is less than the available Grid width, the widths of the columns with a set width are respected and the remaining width is distributed evenly between the other columns.
* If the cumulative width of columns with set widths is more or near as size to the available Grid width, the columns without width will dissapear or shrink.


2\. Leave the columns you are fine to grow without width and set a `min-width` style for the Grid.

````CSHTML
<TelerikGrid Data="@GridData"
             Class="min900">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="400px" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" />
     </GridColumns>
</TelerikGrid>

<style>
    .min900  {
        min-width: 900px;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new ();

    protected override void OnInitialized()
    {
        GridData = new ();

        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product
                {
                    Id = i,
                    Name = "Product name " + i,
                    Price = (decimal)(rnd.Next(1, 50) * 3.14),
                    Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                });

        }

        base.OnInitialized();
    }

    private class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
    }
}
````

3\. Leave the columns you are fine to grow without width and set a `min-width` style for the Grid Tables.

````CSHTML
<TelerikGrid Data="@GridData"
             Class="table-min-width">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="400px" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" />
     </GridColumns>
</TelerikGrid>

<style>
    .table-min-width .k-table {
        min-width: 900px;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new ();

    protected override void OnInitialized()
    {
        GridData = new ();

        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product
                {
                    Id = i,
                    Name = "Product name " + i,
                    Price = (decimal)(rnd.Next(1, 50) * 3.14),
                    Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                });
        }

        base.OnInitialized();
    }

    private class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
    }
}
````

>important Notes:
>
* You may get a horizontal scrollbar in the Grid if the browser viewport is too narrow.
* If you have hierarchy, the style will apply to the detail tables as well.
* The `min-width` style should be more than the sum of the all set column widths. The width-less N number of columns will receive 1/N of the remaining space.
