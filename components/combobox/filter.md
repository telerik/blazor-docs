---
title: Filter
page_title: ComboBox for Blazor | Filter
description: Filtering in the ComboBox for Blazor
slug: components/combobox/filter
tags: telerik,blazor,combo,combobox,filter
published: True
position: 1
---

# ComboBox Filter

The ComboBox component allows the user to filter the available items by their text, so they can find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`.

The filter operator is `contains`, it looks in the `TextField`, and filtering is reset when the dropdown closes.

>caption Filtering in the ComboBox

````CSHTML
@* Type something in the input to see items whose text contains only the typed string, for example "uct 2" *@

@SelectedValue
<br />

<TelerikComboBox Data="@Data"
                 Filterable="true"
                 Placeholder="Find product by typing part of its name"
                 @bind-Value="@SelectedValue" TextField="ProductName" ValueField="ProductId">
</TelerikComboBox>

@code {
    public List<Product> Data { get; set; }
    public int? SelectedValue { get; set; }

    protected override void OnInitialized()
    {
        List<Product> products = new List<Product>();
        for (int i = 0; i < 20; i++)
        {
            products.Add(new Product()
            {
                ProductId = i,
                ProductName = $"Product {i}"
            });
        }

        Data = products;
        base.OnInitialized();
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
}
````


## See Also

  * [Live Demo: ComboBox Filtering](https://demos.telerik.com/blazor-ui/combobox/filtering)
   
  