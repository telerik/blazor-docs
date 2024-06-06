---
title: Set "All" PageSize Option as Default
description: How to set the "All" option for the PageSize as default in Telerik Grid for Blazor.
type: how-to
page_title: How to Set "All" PageSize Option as Default
slug: grid-kb-set-all-pagesize-option-as-default
tags: grid, page, size, all, option, default
ticketid: 1624891
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>5.1.1 or earlier</td>
        </tr>
    </tbody>
</table>

## Description

I want to set the default selected entry in the Pager of the Telerik Grid to be "All" items. However, the `PageSize` property only accepts a non-nullable `int`, so I cannot bind it to a nullable `int?` variable. Is there a way to initialize the `PageSize` with `null` to indicate that I want the "All" option as the default?

## Solution

The `PageSize` parameter of the Grid accepts a non-nullable `int` by design. To set the "All" option as the default for the page size in the Telerik Grid, use a custom approach as follows:

1. In the component's initialization method (`OnInitializedAsync`), load the data and set the `PageSize` property to the total count of the records.
2. Add the "All" option (`null`) to the `PageSizes` collection.
3. Bind the `PageSize` property to the `@bind-PageSize` attribute of the `TelerikGrid` component.
4. Specify the `PageSizes` collection in the `GridPagerSettings` component to display the dropdown with the available page sizes.

> Starting from version 6.0.0, the above approach will display in the actual item count in the pager DropDownList instead of **"All"**. If the user selects **"All"** manually, this is what the drop down component will show.

>caption Set "All" PageSize Option as Default

```
Page size: @PageSize

<TelerikGrid Data="@GridData"
             Pageable="true"
             @bind-PageSize="@PageSize"
             Height="500px">
    <GridSettings>
        <GridPagerSettings InputType="PagerInputType.Buttons"
                           PageSizes="@PageSizes" 
                           ButtonCount="5">
        </GridPagerSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(Product.Name))" Title="Product Name" />
        <GridColumn Field="@(nameof(Product.Price))" />
        <GridColumn Field="@(nameof(Product.Released))" />
        <GridColumn Field="@(nameof(Product.Discontinued))" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();

    private int PageSize { get; set; }

    private List<int?> PageSizes { get; set; } = new List<int?> { null, 5, 10, 15 };

    protected override async Task OnInitializedAsync()
    {
        await LoadData();

        PageSize = GridData.Count();
    }

    private async Task LoadData()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new Product
            {
                Id = x,
                Name = "Product name " + x,
                Price = (decimal)(x * 3.14),
                Released = DateTime.Now.AddMonths(-x).Date,
                Discontinued = x % 5 == 0
            }).ToList();
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
```
