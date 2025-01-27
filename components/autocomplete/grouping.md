---
title: Grouping
page_title: AutoComplete - Grouping
description: Grouping in the AutoComplete for Blazor.
slug: components/autocomplete/grouping
tags: telerik,blazor,autocomplete,group,grouping
published: True
position: 15
---

# AutoComplete Grouping

The AutoComplete component allows users to see the listed items grouped in categories. This can improve the user experience and make browsing through the items faster.

To enable AutoComplete grouping, set the `GroupField` parameter to a field name from the model. The AutoComplete will display the corresponding field values as group headers in the dropdown. Nested values of complex object properties are supported (see the example below).

The group headers can stick to the top of the dropdown during scrolling. In other words, users will always know which is the group of the current topmost items in the scrollable list.

>caption Grouping in the AutoComplete

````RAZOR
<TelerikAutoComplete Data="@Data"
                 @bind-Value="@SelectedValue"
                 GroupField="Category.CategoryName"
                 ValueField="ProductName"
                 Placeholder="Select a product">
</TelerikAutoComplete>

@code {
    public List<Product> Data { get; set; }
    public string SelectedValue { get; set; }

    protected override void OnInitialized()
    {
        List<Product> products = new List<Product>();
        for (int i = 0; i < 20; i++)
        {
            products.Add(new Product()
            {
                ProductId = i,
                ProductName = $"Product {i}",
                Category = new Category() { CategoryId = i % 5, CategoryName = $"Category {i % 5}" }
            });
        }

        Data = products;

        base.OnInitialized();
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public Category Category { get; set; }
    }

    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
````

# Notes

* One level of grouping is supported.
* A grouped AutoComplete will provide a `Groups` property with a single [`GroupDescriptor`](slug://Telerik.DataSource.GroupDescriptor) in the [`DataSourceRequest`](slug://Telerik.DataSource.DataSourceRequest) argument of its [OnRead event](slug://autocomplete-events#onread). This will allow the developer to apply grouping with [manual data operations](slug://components/grid/manual-operations).

## See Also

  * [Live Demo: AutoComplete Grouping](https://demos.telerik.com/blazor-ui/autocomplete/grouping)
