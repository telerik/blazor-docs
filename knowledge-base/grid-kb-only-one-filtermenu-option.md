---
title: Only one filter option in FilterMenu
description: How to leave only one filter option in the Grid FilterMenu. Applies to the TreeList too.
type: how-to
page_title: Only one filter option in FilterMenu
slug: grid-kb-only-one-filtermenu-option
position: 
tags: 
ticketid: 1451755, 1551245
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
I want simple filtering options in the Grid filter menu - both for my uses and my backend. How do I remove the extra conditions so it behaves like the filter row and does not have extra and/or operators?

>caption Before and after results

![Blazor Grid One FilterMenu Result](images/grid-kb-only-one-filtermenu-option-result.png)

## Solution

There are two options:

* Use a [custom filter template](slug:grid-templates-filter). It provides full flexibility over the interface and building the filter descriptor.
* Use custom CSS to [override the theme](slug:themes-override) and hide the elements that provide the and/or secondary conditions. The example below demonstrates this approach. Note that **the required CSS is different for different UI for Blazor versions**:

<div class="skip-repl"></div>
````CSS
<style>
    /* UI for Blazor 3.0+ */
    .k-filter-menu-container > span:nth-child(n+3) {
        display: none;
    }
    /* UI for Blazor 2.30- */
    .k-filter-menu-container > div > :nth-child(n+3) {
        display: none;
    }
</style>
````

>caption Hide And/Or filter options in the Grid/TreeList FilterMenu with CSS

````RAZOR
@* Hide the secondary filter interface with CSS *@

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="5"
             Sortable="true"
             FilterMode="GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field=@nameof(Product.Name) Title="Product Name" />
        <GridColumn Field=@nameof(Product.Price) Title="Price" />
        <GridColumn Field=@nameof(Product.ReleaseDate) Title="Release Date" />
        <GridColumn Field=@nameof(Product.Discontinued) Title="Discontinued" />
    </GridColumns>
</TelerikGrid>

<style>

    /* UI for Blazor 3.0+ */
    .k-filter-menu-container > span:nth-child(n+3) {
        display: none;
    }

    /* UI for Blazor 2.30- */
    .k-filter-menu-container > div > :nth-child(n+3) {
        display: none;
    }

</style>

@code {
    List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 15; i++)
        {
            GridData.Add(new Product()
            {
                ID = i,
                Name = "Product " + i.ToString(),
                Price = (decimal)rnd.Next(1, 100),
                ReleaseDate = new DateTime(rnd.Next(2020, 2023), rnd.Next(1, 13), rnd.Next(1, 28)),
                Discontinued = i % 4 == 0
            });
        }
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }
}
````
