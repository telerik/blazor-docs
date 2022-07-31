---
title: Grouping
page_title: ComboBox - Grouping
description: Grouping in the ComboBox for Blazor.
slug: components/combobox/grouping
tags: telerik,blazor,combo,combobox,group,grouping
published: True
position: 15
---

# ComboBox Grouping

The ComboBox component allows users to see the listed items grouped in categories. This can improve the user experience and make browsing through the items faster.

To enable ComboBox grouping, set the `GroupField` parameter to a field name from the model. The ComboBox will display the corresponding field values as group headers in the dropdown. Nested values of complex object properties are supported (see the example below).

The group headers can stick to the top of the dropdown during scrolling. In other words, users will always know which is the group of the current topmost items in the scrollable list.

>caption Grouping in the ComboBox

````CSHTML
<TelerikComboBox Data="@Data"
                 @bind-Value="@SelectedValue"
                 GroupField="Category.CategoryName"
                 TextField="ProductName"
                 ValueField="ProductId"
                 Placeholder="Select a product">
</TelerikComboBox>

@code {
    public IEnumerable<Product> Data { get; set; }
    public int SelectedValue { get; set; }

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
* The `DefaultItem` (e.g. "Select item...") is always rendered above the sticky group header in the dropdown.
* A grouped ComboBox will provide a `Groups` property with a single [`GroupDescriptor`](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.GroupDescriptor) in the [`DataSourceRequest`](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.DataSourceRequest) argument of its [OnRead event]({%slug components/combobox/events%}#onread). This will allow the developer to apply grouping with [manual data operations]({%slug components/grid/manual-operations%}).
* `GroupHeaderTemplate` and `GroupItemTemplate` will be introduced in a future version. Currently there is a bug in the Blazor framework that prevents us from supporting them.
* Virtual scrolling with grouping will be supported in a future version.

## See Also

  * [Live Demo: ComboBox Grouping](https://demos.telerik.com/blazor-ui/combobox/grouping)
