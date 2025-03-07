---
title: Hide Grid Virtual Row Skeletons
description: Learn how to hide / remove / disable the Grid and TreeList cell placeholder skeletons during virtual row scrolling.
type: how-to
page_title: How To Hide Row Skeletons During Virtual Grid Scrolling
slug: grid-kb-hide-virtual-row-skeletons
tags: blazor, grid, treelist, skeleton, styles, css
ticketid: 1658135, 1642794
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

* How to remove the Grid row placeholders during virtual scrolling?
* How to hide the skeletons that appear in empty table cells during virtual scrolling?
* How to disable the Grid cell placeholders?
* How to turn off the Grid loader indicators inside the virtual rows?

## Solution

Apply a `display:none` or `visibility:hidden` CSS style to the `.k-skeleton` selector inside Grid table cells.

>caption Removing placeholder skeletons during virtual Grid scrolling

````RAZOR
<TelerikGrid Data="@GridData"
             Height="360px"
             PageSize="20"
             RowHeight="40"
             ScrollMode="@GridScrollMode.Virtual"
             Class="no-skeletons">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" />
    </GridColumns>
</TelerikGrid>

<style>
    .no-skeletons .k-table-td > .k-skeleton {
        display: none;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 1000; i++)
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

* [Virtual Grid Scrolling](slug:components/grid/virtual-scrolling)
* [Virtual TreeList Scrolling](slug:treelist-virtual-scrolling)
