---
title: Custom Sorting Order for Groups in DropDownList
description: Learn how to apply a custom order to groups in the DropDownList for Blazor.
type: how-to
page_title: How to Set a Custom Grouping Order in Blazor DropDownList
slug: dropdownlist-custom-sorting-order-groups
tags: dropdownlist, blazor, telerik, grouping, custom order
res_type: kb
ticketid: 1666981, 1579415
components: ["dropdownlist"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>DropDownList for Blazor, <br /> AutoComplete for Blazor, <br /> MultiSelect for Blazor, <br /> ComboBox for Blazor, <br /> MultiColumnComboBox for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I am using the [grouping feature of the DropDownList](slug:components/dropdownlist/grouping). My DropDownList model has a nested model as property. The DropDownList `GroupField` parameter is bound to a property of the nested model. I want the groups to appear in a non-alphabetical, custom order. I can see that there is a feature request to add a <a href="https://feedback.telerik.com/blazor/1565506-sort-direction-parameter-for-grouping" target="_blank">sort direction option when grouping</a>. But in the meantime how can I customize the grouping order in the DropDownList?

## Solution

To sort the groups in a DropDownList by a custom order, perform a manual sorting operation in the [`OnRead` event](slug:components/dropdownlist/events#onread) handler. Follow these steps:

1. Create a list of strings that represents the values of the group headers. This list will determine the preferred sorting order.
2. Cast the [`DataSourceResult`](slug:common-features-data-binding-onread#event-argument) to [`AggregateFunctionsGroup`](slug:Telerik.DataSource.AggregateFunctionsGroup).
3. Sort the casted data using the <a href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.sort?view=net-8.0" target="_blank">`Sort` method</a> with a custom comparison function.
4. Pass the sorted data as [`args.Data`](slug:common-features-data-binding-onread#todatasourceresult-method).

>caption Apply a custom grouping order in the DropDownList
````RAZOR
@using Telerik.DataSource.Extensions
@using Telerik.DataSource

<TelerikDropDownList TItem="@Product"
                     TValue="@int"
                     OnRead="@ReadItems"
                     @bind-Value="@SelectedValue"
                     GroupField="ProductCategory.CategoryName"
                     TextField="@nameof(Product.Description)"
                     ValueField="@nameof(Product.ProductId)"
                     DefaultText="Select a Product">
</TelerikDropDownList>

@code {
    private int SelectedValue { get; set; }
    private List<Product> Products = new List<Product>
        {
            new Product { ProductId = 10, Description = "Juliet Jewelery Product", ProductCategory = new ProductCategory { CategoryId = 10, CategoryName = "Jewelery" } },
            new Product { ProductId = 18, Description = "Medical Care Product", ProductCategory = new ProductCategory { CategoryId = 8, CategoryName = "Healthcare" } },
            new Product { ProductId = 19, Description = "QQ Tech Product", ProductCategory = new ProductCategory { CategoryId = 9, CategoryName = "Information Technology" } },
            new Product { ProductId = 10, Description = "Z Jewelery Product", ProductCategory = new ProductCategory { CategoryId = 10, CategoryName = "Jewelery" } },
            new Product { ProductId = 4, Description = "Delta Bond Product", ProductCategory = new ProductCategory { CategoryId = 4, CategoryName = "Defense" } },
            new Product { ProductId = 8, Description = "Health Care Product", ProductCategory = new ProductCategory { CategoryId = 8, CategoryName = "Healthcare" } },
            new Product { ProductId = 9, Description = "Tech Product", ProductCategory = new ProductCategory { CategoryId = 9, CategoryName = "Information Technology" } }
        };

    protected async Task ReadItems(DropDownListReadEventArgs args)
    {
        await Task.Delay(200);

        var preferredOrder = new List<string> { "Healthcare", "Information Technology", "Defense", "Jewelery" };

        var datasourceResult = Products.ToDataSourceResult(args.Request);

        var sortedData = datasourceResult.Data.Cast<AggregateFunctionsGroup>().ToList();
        sortedData.Sort((a, b) =>
        {
            int indexA = preferredOrder.IndexOf(a.Key.ToString());
            int indexB = preferredOrder.IndexOf(b.Key.ToString());

            if (indexA >= 0 && indexB >= 0)
            {
                return indexA.CompareTo(indexB);
            }

            if (indexA >= 0) return -1;
            if (indexB >= 0) return 1;
            return a.Key.ToString().CompareTo(b.Key.ToString());
        });

        args.Data = sortedData;
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string Description { get; set; }
        public ProductCategory ProductCategory { get; set; }
    }

    public class ProductCategory
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
````


## See Also

- [Telerik DropDownList for Blazor - Overview](slug:components/dropdownlist/overview)
- [OnRead Event in Telerik DropDownList](slug:components/dropdownlist/events#onread)
- [Grouping in Telerik DropDownList](slug:components/dropdownlist/grouping)
- [Custom Grouping Order in Grid](slug:grid-custom-grouping-order)
