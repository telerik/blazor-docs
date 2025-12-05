---
title: Only one filter option in FilterMenu
description: How to leave only one filter option in the Grid FilterMenu. Applies to the TreeList too.
type: how-to
page_title: Only one filter option in FilterMenu
slug: grid-kb-only-one-filtermenu-option
position: 
tags: 
ticketid: 1451755, 1551245, 1705873
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

I want simple filtering options in the Grid filter menu - both for my uses and my backend. How do I remove the extra conditions so it behaves like the filter row and does not have extra and/or operators?

>caption Before and after results

![Blazor Grid One FilterMenu Result](images/grid-kb-only-one-filtermenu-option-result.png)

## Solution

There are two options:

* Use a [custom filter template](slug:grid-templates-filter). It provides full flexibility over the interface and building the filter descriptor.
* Use custom CSS to [override the theme](slug:themes-override) and hide the elements that provide the and/or secondary conditions. The example below demonstrates this approach.

````CSS.skip-repl
.k-filter-menu-container > .k-button-group,
.k-filter-menu-container > span:nth-child(n+3) {
	display: none;
}
````

>caption Hide And/Or ButtonGroup and second filter option in the Grid/TreeList FilterMenu with CSS

````RAZOR
<TelerikGrid Data="@GridData"
             FilterMode="GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

<style>
    .k-filter-menu-container > .k-button-group,
    .k-filter-menu-container > span:nth-child(n+3) {
        display: none;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 7; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Price = rnd.Next(1, 100) * 1.23m,
                ReleaseDate = DateTime.Today.AddDays(-rnd.Next(1, 3650)),
                Discontinued = i % 4 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }
}
````
