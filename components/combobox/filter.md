---
title: Filter
page_title: ComboBox - Filter
description: Filtering in the ComboBox for Blazor.
slug: components/combobox/filter
tags: telerik,blazor,combo,combobox,filter
published: True
position: 10
components: ["combobox"]
---
# ComboBox Filter

The ComboBox component allows the user to filter the available items by their text, so they can find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive. 

You can also use the [`OnRead` event](slug:components/combobox/events#onread) to:
* Get the [applied filtering criteria](slug:common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`DebounceDelay`](slug:components/combobox/overview#parameters) parameter of the component.

## Filtering Example

>caption Filtering in the ComboBox

````RAZOR
<ul>
    <li>
        <label>
            Filter operator:
            <TelerikDropDownList @bind-Value="@FilterOperator"
                                 Data="@FilterOperators"
                                 Width="160px" />
        </label>
    </li>
    <li>
        <label>
            Debounce delay:
            <TelerikNumericTextBox @bind-Value="@DebounceDelay" Min="0" Width="120px" />
        </label>
    </li>
</ul>

<br />

<TelerikComboBox Data="@ProductList"
                 @bind-Value="@SelectedProduct"
                 TextField="@nameof(Product.Name)"
                 ValueField="@nameof(Product.Id)"
                 Filterable="true"
                 FilterOperator="@FilterOperator"
                 DebounceDelay="@DebounceDelay"
                 Placeholder="Type digits to see filtering in action"
                 ShowClearButton="true"
                 Width="300px">
</TelerikComboBox>

@code{
    private List<Product> ProductList { get; set; }

    private int? SelectedProduct { get; set; }

    private List<StringFilterOperator> FilterOperators =>
        Enum.GetValues(typeof(StringFilterOperator)).Cast<StringFilterOperator>().ToList();

    private StringFilterOperator FilterOperator { get; set; } = StringFilterOperator.StartsWith;

    private int DebounceDelay { get; set; } = 150;

    protected override void OnInitialized()
    {
        ProductList = new List<Product>();

        for (int i = 1; i <= 30; i++)
        {
            ProductList.Add(new Product()
            {
                Id = i,
                Name = $"{i} Product {i * 111}"
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [Live Demo: ComboBox Filtering](https://demos.telerik.com/blazor-ui/combobox/filtering)

* [Custom Filtering by Multiple Fields](slug:dropdowns-kb-search-in-multiple-fields)

