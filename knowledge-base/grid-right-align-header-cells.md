---
title: Right Align Grid Header Cells
description: How to align the text in Grid header and data cells to the right
type: how-to
page_title: Right Align Grid Header Cells
slug: grid-kb-right-align-header-cells
position: 
tags: grid, header, headers, right, align, text-align
ticketid:
res_type: kb
---

## Description

I have a Grid that displays numeric data. The numbers in the data cells are aligned to the right with the `TextAlign` column attribute. How do I align the text content of Grid header cells to the right?

## Solution

To align the Grid header cell labels to the right, use custom CSS as per the example below. Note that different CSS rules are needed, depending on the Grid configuration. The CSS code affects all columns.

>caption Align Grid header cells and data cells to the right

````CSHTML
<TelerikGrid Data="@GridData"
             Sortable="true"
             FilterMode="GridFilterMode.FilterMenu"
             Class="right-align">
    <GridColumns>
        <GridColumn Field=@nameof(Product.Name) Title="Product Name" TextAlign="ColumnTextAlign.Right" />
        <GridColumn Field=@nameof(Product.Price) Title="Price" TextAlign="ColumnTextAlign.Right" DisplayFormat="{0:n2}" />
        <GridColumn Field=@nameof(Product.Quantity) Title="Units In Stock" TextAlign="ColumnTextAlign.Right" />
    </GridColumns>
</TelerikGrid>

<style>

    .right-align .k-grid-header .k-header {
        /* no sorting, no filtering */
        text-align: right;

        /* filtering or column menu, no sorting */
        /*padding-right: calc(1.6em + 14px);*/
    }

    /* sorting - move the sorting arrow to the left */
    .right-align .k-cell-inner > .k-link {
        flex-flow: row-reverse nowrap;
    }

    /* filtering or column menu - keep the icon on the RIGHT */
    .right-align .k-cell-inner .k-column-title {
        padding-right: calc(1.6em + 10px);
    }

    /* OR */

    /* filtering or column menu - move the icon to the LEFT */
    /*.right-align .k-grid-header .k-grid-filter,
    .right-align .k-grid-header .k-header-column-menu {
        right: auto;
        left: 0;
    }*/
</style>

@code {
    public List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 5; i++)
        {

            GridData.Add(new Product()
            {
                ID = i,
                Name = "Product " + i.ToString(),
                Price = (decimal)rnd.Next(1, 100),
                Quantity = (short)rnd.Next(1, 100)
            });
        }
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public short Quantity { get; set; }
    }
}
````
