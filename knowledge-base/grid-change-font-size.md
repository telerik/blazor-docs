---
title: Change Grid Font Size
description: How to set custom Blazor Grid font size
type: how-to
page_title: Change Blazor Grid Font Size
slug: grid-kb-change-font-size
position: 
tags: grid, font, size, custom
ticketid: 
res_type: kb
---

# Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

How to change the Grid font size? How to set custom font styles?

## Solution

[Override the theme styles]({%slug themes-override%}) and set the desired font size to the Grid and its child components.

>caption Change Blazor Grid Font Size

````CSHTML
<style>
    /* grid cells */
    .k-grid.font-size,

    /* textboxes */
    .k-grid.font-size .k-input,
    /* date pickers */
    .k-grid.font-size .k-picker,
    /* buttons */
    .k-grid.font-size .k-button,

    /* column and filter menu */
    .k-popup,
    .k-popup .k-input,
    .k-popup .k-picker,
    .k-popup .k-button,

    /* dropdowns */
    .k-popup .k-list {
        font-size: 12px;
    }
</style>

<TelerikGrid Data="@GridData"
             Class="font-size"
             Pageable="true"
             Sortable="true"
             Groupable="true"
             ShowColumnMenu="true"
             EditMode="GridEditMode.Inline"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@FontIcon.Plus">Add</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" />
        <GridColumn Field="Price" />
        <GridColumn Field="@(nameof(Product.Released))" />
        <GridColumn Field="@(nameof(Product.Discontinued))" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@FontIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@FontIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 20).Select(x => new Product
        {
            Id = x,
            Name = "Product name " + x,
            Price = (decimal)(x * 3.14),
            Released = DateTime.Now.AddMonths(-x).Date,
            Discontinued = x % 5 == 0
        }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Change Inputs and Buttons Font Size]({%slug inputs-kb-change-font-size%})
