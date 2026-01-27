---
title: Center or Right-Align Grid Column Header Content
description: How to center or right-align the text content of Grid Column Headers?
type: how-to
page_title: Center or Right-Align Grid Column Header Content
slug: grid-kb-center-column-header-content
position: 
tags: telerik, blazor, grid, column, header, center
ticketid: 1571365
res_type: kb
components: ["grid"]
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

How to center the text content of the Grid column header?

How to align Grid header cell text to the right?


## Solution

Use [custom CSS to override the default Grid styles](slug:themes-override). Since [version 3.4.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/ui-for-blazor-3-4-0), the [Grid columns provide a `HeaderClass` parameter](slug:components/grid/columns/bound) that can help to target specific columns.

For older product versions, or to target all columns, use `.k-header` instead of a custom CSS class.

>caption Grid with centered or right-aligned column header content

````RAZOR
<TelerikGrid Data="@GridData"
             TItem="@Product"
             Pageable="true"
             Sortable="true"
             FilterMode="GridFilterMode.FilterMenu">
    <GridColumns>

        <GridColumn Title="Center" HeaderClass="center-me" TextAlign="@ColumnTextAlign.Center" />
        <GridColumn Field="@nameof(Product.Price)" Title="Sorting" Filterable="false"
                    HeaderClass="center-me" TextAlign="@ColumnTextAlign.Center" />
        <GridColumn Field="@nameof(Product.Price)" Title="Filtering" Sortable="false"
                    HeaderClass="center-me" TextAlign="@ColumnTextAlign.Center" />
        <GridColumn Field="@nameof(Product.Price)" Title="Both" HeaderClass="center-me"
                    TextAlign="@ColumnTextAlign.Center" />

        <GridColumn Title="Right" HeaderClass="align-right right-padding" TextAlign="@ColumnTextAlign.Right" />
        <GridColumn Field="@nameof(Product.Price)" Title="Sorting" Filterable="false"
                    HeaderClass="align-right right-padding" TextAlign="@ColumnTextAlign.Right" />
        <GridColumn Field="@nameof(Product.Price)" Title="Filtering" Sortable="false"
                    HeaderClass="align-right" TextAlign="@ColumnTextAlign.Right" />
        <GridColumn Field="@nameof(Product.Price)" Title="Both" HeaderClass="align-right"
                    TextAlign="@ColumnTextAlign.Right" />

    </GridColumns>
</TelerikGrid>

<style>
    /* CENTER */

    /* non-sortable headers */
    .k-grid th.center-me {
        text-align: center;
    }

    /* sortable headers */
    th.center-me .k-cell-inner > .k-link {
        justify-content: center;
    }

    /* RIGHT */

    /* non-sortable headers */
    .k-grid th.align-right {
        text-align: right;
    }

    /* sortable headers */
    th.align-right .k-cell-inner > .k-link {
        justify-content: right;
    }

    /* unbound and non-filterable columns */
    .k-grid-header th.align-right.right-padding {
        padding-right: 12px;
    }

    /* filterable grid, sortable non-filterable columns */
    .k-grid-header th.align-right.right-padding > .k-cell-inner {
        margin-right: 0;
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

* If you need to wrap the column header content as well, you can try the approach from this knowledge base article - [Wrap and center the Grid Column Header text](slug:grid-kb-wrap-and-center-column-header-text). It shows how to change the default display property of the header cells to `block` and then easily operate with their content to wrap and center it.

* If you want full control over the header text contents and rendering, you can use a [column header template](slug:grid-templates-column-header).

## See Also

* [Wrap and center the Grid Column Header text](slug:grid-kb-wrap-and-center-column-header-text)
