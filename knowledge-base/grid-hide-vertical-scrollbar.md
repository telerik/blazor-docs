---
title: How to Remove the Vertical Grid Scrollbar
description: How to hide the vertical scrollbar of the Grid and TreeList with CSS, if scrolling is not used.
type: how-to
page_title: How to Hide the Vertical Grid Scrollbar
slug: grid-hide-vertical-scrollbar
position: 
tags: grid, treelist, scroll, scrollbar, scrolling
ticketid: 1541813, 1541728
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor, TreeList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How do I hide the Grid vertical scrollbar? I don't set the Grid `Height`, so I prefer to completely remove the disabled vertical scrollbar with CSS.

## Solution

There are three required CSS styles to disable vertical scrolling and ensure proper cell alignment between the header, data and footer area of the Grid/TreeList:

1. Remove the vertical scrollbar, which is visible by default.
1. Remove the empty space above and below the vertical scrollbar. These empty spaces are in the header and footer area.
1. Remove two right borders in the header and footer area, which are no longer necessary. These borders normally separate the empty spaces from the header and footer cells.

### Notes

* Do not set the component `Height` attribute. Do not apply `height` style to the component `<div>`. Doing so may show the vertical scrollbar back and cause misalignment between the header cells and data cells.
* Versions **2.26** and older require `!important` for the `padding` style.
* The exact same classes and styles will work for the **TreeList** as well.

>caption Hide the Grid/TreeList vertical scrollbar

````CSHTML
@* Hide the vertical scrollbar of the Grid *@

<TelerikGrid Data="@GridData" Class="grid-no-scroll">
    <GridColumns>
        <GridColumn Field=@nameof(Product.Name) Title="Product Name">
            <FooterTemplate>
                footer
            </FooterTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<style>
    .grid-no-scroll .k-grid-content {
        overflow-y: auto;
    }

    .grid-no-scroll .k-grid-header,
    .grid-no-scroll .k-grid-footer {
        padding-right: 0; /* version 2.26 and older requires !important here */
    }

    .grid-no-scroll .k-grid-header-wrap,
    .grid-no-scroll .k-grid-footer-wrap {
        border-right-width: 0;
    }

</style>

@code {
    List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        for (int i = 1; i <= 5; i++)
        {

            GridData.Add(new Product()
            {
                ID = i,
                Name = "Product " + i.ToString()
            });
        }
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````