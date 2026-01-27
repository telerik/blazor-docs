---
title: Filter
page_title: MultiColumnComboBox - Filter
description: Filtering in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-filter
tags: telerik,blazor,multicolumncombobox.combo,combobox,filter
published: True
position: 10
components: ["multicolumncombobox"]
---
# MultiColumnComboBox Filter

The MultiColumnComboBox component allows users to filter items by their text, so they can find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive.

You can also use the [`OnRead` event](slug:multicolumncombobox-events#onread) to:
* Get the [applied filtering criteria](slug:common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`DebounceDelay`](slug:multicolumncombobox-overview#multicolumncombobox-parameters) parameter of the component.

## Filtering Example

>caption Filtering in the MultiColumnComboBox

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

<p>Type some digits:</p>

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@SelectedProduct"
                            ValueField="@nameof(Product.Id)"
                            TextField="@nameof(Product.Name)"
                            Filterable="true"
                            FilterOperator="@FilterOperator"
                            DebounceDelay="@DebounceDelay"
                            Width="400px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Name)" />
        <MultiColumnComboBoxColumn Field="@nameof(Product.Quantity)" Width="100px" />
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code{
    private List<Product> MultiComboData { get; set; }

    private int? SelectedProduct { get; set; }

    private List<StringFilterOperator> FilterOperators =>
        Enum.GetValues(typeof(StringFilterOperator)).Cast<StringFilterOperator>().ToList();

    private StringFilterOperator FilterOperator { get; set; } = StringFilterOperator.StartsWith;

    private int DebounceDelay { get; set; } = 150;

    protected override void OnInitialized()
    {
        MultiComboData = new List<Product>();

        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            MultiComboData.Add(new Product()
            {
                Id = i,
                Name = $"{i} Product {i * 111222}",
                Quantity = rnd.Next(0, 30)
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}
````


## See Also

* [Live Demo: MultiColumnComboBox Filtering](https://demos.telerik.com/blazor-ui/multicolumncombobox/filtering)

* [Custom Filtering by Multiple Fields](slug:dropdowns-kb-search-in-multiple-fields)
