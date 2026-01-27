---
title: Enable Sticky Grid Headers
description: Learn how to enable sticky Grid or TreeList headers, which remain visible at the top of the browser viewport when the users scrolls the whole web page.
type: how-to
page_title: How To Enable Sticky Grid Headers
slug: grid-kb-sticky-headers
tags: telerik, blazor, grid, treelist, css, styling
ticketid: 1687016, 1592949, 1522505
res_type: kb
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB also answers the following questions:

* How to lock (freeze) the Grid header row, so that it remains at the top of the browser viewport during page scrolling?
* How to set a `position:sticky` style to the Grid header row?
* How to make the Grid header stick and persist (always show) at the top of the page while scrolling without a fixed Grid height?

## Solution

Sticky Grid headers require custom CSS. The Grid and TreeList components use very similar HTML rendering, so the approach for both components is the same.

The solution prevents you from setting a Grid `Height`. This should not be a problem, as the idea is users to scroll the whole web page, rather than the Grid.

1. Set the Grid `Class` to some custom CSS class.
1. Use the custom CSS class to apply `position:sticky` style to `.k-grid-header` and reset the `overflow` styles of all Grid elements that have this style set to `hidden` or `scroll`.

>caption Enable sticky Grid headers

````RAZOR
<label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@StickMasterHeader" />
    Sticky Master Grid Header
</label>

<label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@StickDetailHeader" />
    Sticky Detail Grid Header
</label>

<TelerikGrid Data="@CategoryData"
             Class="@( StickMasterHeader ? "sticky-header" : "" )"
             TItem="@Category"
             OnStateInit="@OnMasterGridStateInit">
    <GridColumns>
        <GridColumn Field="@nameof(Category.Name)"
                    Title="Category Name" />
    </GridColumns>
    <DetailTemplate>
        <TelerikGrid Data="@ProductData.Where(x => x.CategoryId == context.Id)"
                     Class="@( StickDetailHeader ? "sticky-header" : "" )">
            <GridColumns>
                <GridColumn Field="@nameof(Product.Name)"
                            Title="@( $"Product Name for Category {context.Id}" )" />
            </GridColumns>
        </TelerikGrid>
    </DetailTemplate>
</TelerikGrid>

<style>
    .sticky-header > .k-grid-aria-root,
    .k-grid-aria-root:has(.sticky-header),
    .k-grid-container:has(.sticky-header),
    .k-grid-content:has(.sticky-header) {
        overflow: visible;
        height: auto;
    }

    .k-detail-cell:has(.sticky-header) {
        overflow: visible;
    }

    .sticky-header .k-grid-header {
        position: sticky;
        top: 0;
        z-index: 10;
    }
</style>

@code {
    private List<Category> CategoryData { get; set; } = new();
    private List<Product> ProductData { get; set; } = new();

    private bool StickMasterHeader { get; set; } = true;
    private bool StickDetailHeader { get; set; } = true;

    private int LastId { get; set; }

    private void OnMasterGridStateInit(GridStateEventArgs<Category> args)
    {
        args.GridState.ExpandedItems = CategoryData;
    }

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 15; i++)
        {
            CategoryData.Add(new Category()
            {
                Id = i,
                Name = $"Category Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}"
            });

            for (int j = 1; j <= 5; j++)
            {
                int productId = ++LastId;
                ProductData.Add(new Product()
                {
                    Id = productId,
                    CategoryId = i,
                    Name = $"Product Name {productId} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}"
                });
            }
        }
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class Product
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## See Also

* [Grid Overview](slug:grid-overview)
* [TreeList Overview](slug:treelist-overview)
