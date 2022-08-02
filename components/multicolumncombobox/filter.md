---
title: Filter
page_title: MultiColumnComboBox - Filter
description: Filtering in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-filter
tags: telerik,blazor,multicolumncombobox.combo,combobox,filter
published: True
position: 10
---

# MultiColumnComboBox Filter

The MultiColumnComboBox component allows users to filter items by their text (`TextField`), so they can find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`.

Filtering is case insensitive and the default filter operator is `starts with`. Filtering looks in the `TextField`, and the filter is reset when the dropdown closes. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

By default, filtering will be debounced with 150ms. Configure that with the [`DebounceDelay`]({%slug multicolumncombobox-overview%}#parameters) parameter of the component.

>caption Filtering in the MultiColumnComboBox

````CSHTML
Choose a filter operator:

<TelerikDropDownList Data="@AvailableFilterOperators"
                     @bind-Value="@FilterOperator"
                     Width="200px" />

<p>Type some digits:</p>

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@SelectedProduct"
                            ValueField="@nameof(Product.Id)"
                            TextField="@nameof(Product.Name)"
                            Filterable="true"
                            FilterOperator="@FilterOperator"
                            Width="400px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Name)" />
        <MultiColumnComboBoxColumn Field="@nameof(Product.Quantity)" Width="100px" />
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private List<Product> MultiComboData { get; set; }

    private List<StringFilterOperator> AvailableFilterOperators { get; set; } = new List<StringFilterOperator>()
    {
        StringFilterOperator.Contains,
        StringFilterOperator.DoesNotContain,
        StringFilterOperator.EndsWith,
        StringFilterOperator.IsContainedIn,
        StringFilterOperator.StartsWith
    };

    private StringFilterOperator FilterOperator { get; set; } = StringFilterOperator.Contains;

    private int SelectedProduct { get; set; }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        MultiComboData = Enumerable.Range(1, 30).Select(x => new Product()
        {
            Id = x,
            Name = $"{x * 332211} Product {x * 112233}",
            Quantity = rnd.Next(0, 30)
        }).ToList();

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
