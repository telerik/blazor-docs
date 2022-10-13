---
title: Change the Pager DropDown Width
description: How to change the Grid Pager dropdown width and make it wider to fit larger page sizes?
type: how-to
page_title: How to Change the Pager DropDown Width?
slug: pager-kb-dropdown-width
position: 
tags: pager, grid
ticketid: 1565123, 1583175
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Pager for Blazor, <br />
                Grid for Blazor, <br />
                ListView for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

How to change the pager dropdown list width and make it wider? The page size number in the DropDownList is cut off when it contains three or more digits.


## Solution

1. Set a custom `Class` to the component.
1. Target the `.k-pager-sizes .k-dropdownlist` elements inside the components that have the custom `Class`. See [How to override the Telerik Blazor theme]({%slug themes-override%}).

>caption Change the Pager dropdown width

````CSHTML
<h2>Pager in Grid:</h2>

<TelerikGrid Class="wider-pagesizes"
             Data="@GridData"
             TItem="@Product"
             Pageable="true">
    <GridSettings>
        <GridPagerSettings PageSizes="@PageSizes" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
    </GridColumns>
</TelerikGrid>

<h2>Standalone Pager:</h2>

<TelerikPager Class="wider-pagesizes"
              Total="50"
              PageSizes="@PageSizes" />

<style>
    .wider-pagesizes .k-pager-sizes .k-dropdownlist {
        width: 12em;
    }
</style>

@code {
    private List<Product> GridData { get; set; }

    private List<int?> PageSizes { get; set; } = new List<int?> { 10, 20, null };

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        for (int i = 1; i <= 50; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = "Product " + i
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

To target all pager instances in the app, you can skip the custom CSS class:

````css
.k-pager .k-pager-sizes .k-dropdownlist {
    width: 12em;
}
````
