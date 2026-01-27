---
title: Wrap and center the Grid Column Header text
description: How to wrap and center the Grid Column Header text
type: how-to
page_title: How to wrap and center the Grid Column Header text
slug: grid-kb-wrap-and-center-column-header-text
position: 
tags: telerik, blazor, grid, column, header, wrap, center
ticketid: 1507250
res_type: kb
components: ["grid"]
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

How to make the GridColumn title text wrap around and be centered?

## Solution

Use [custom CSS to override the default Grid styles](slug:themes-override). Since [version 3.4.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/ui-for-blazor-3-4-0), the [Grid columns provide a `HeaderClass` parameter](slug:components/grid/columns/bound) that can help to target specific columns.

The custom CSS should align header text to the center and enable text wrapping.

For older product versions, or to target all columns, use `.k-header` instead of a custom CSS class.

>caption Grid with centered and wrapping column header content

````RAZOR
<p>Shrink the browser window if necessary:</p>

<TelerikGrid Data="@GridData"
             TItem="@Product"
             Pageable="true"
             Sortable="true"
             FilterMode="GridFilterMode.FilterMenu">
    <GridColumns>

        <GridColumn Title="Center Center Center Center Center" HeaderClass="center-wrap" TextAlign="@ColumnTextAlign.Center" />
        <GridColumn Field="@nameof(Product.Price)" Title="Sorting Sorting Sorting Sorting Sorting" Filterable="false"
                    HeaderClass="center-wrap" TextAlign="@ColumnTextAlign.Center" />
        <GridColumn Field="@nameof(Product.Price)" Title="Filtering Filtering Filtering Filtering Filtering" Sortable="false"
                    HeaderClass="center-wrap" TextAlign="@ColumnTextAlign.Center" />
        <GridColumn Field="@nameof(Product.Price)" Title="Both Both Both Both Both Both" HeaderClass="center-wrap"
                    TextAlign="@ColumnTextAlign.Center" />

    </GridColumns>
</TelerikGrid>

<style>
    .k-grid th.center-wrap {
        justify-content: center;
        text-align: center;
        white-space: normal;
        vertical-align: middle;
    }

    .k-grid th.center-wrap .k-column-title {
        white-space: normal;
    }
</style>

@code {
    List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 7; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = "Product " + i.ToString(),
                Price = (decimal)rnd.Next(1, 100),
                ReleaseDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                Active = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool Active { get; set; }
    }
}
````

## Notes

* If you only need to center or right-align the header text, use the approach from [Center Grid Column Header Content](slug:grid-kb-center-column-header-content). This will keep the preset `display: flex` style of the cells.

* If you want full control over the header text contents and rendering, you can use the [column header template](slug:grid-templates-column-header).

## See Also

* [Center or Right-Align Grid Column Headers](slug:grid-kb-center-column-header-content)
