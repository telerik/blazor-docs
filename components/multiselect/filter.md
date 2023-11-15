---
title: Filter
page_title: MultiSelect - Filter
description: Filtering in the MultiSelect for Blazor.
slug: multiselect-filter
tags: telerik,blazor,combo,multiselect,filter
published: True
position: 10
---

# MultiSelect Filter

The MultiSelect component can filter the available suggestions according to the current user input, so they can find the one they need faster. To see the difference in behavior, visit the [Live Demo: MultiSelect Filtering](https://demos.telerik.com/blazor-ui/multiselect/filtering) page.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive. You can also implement custom (server) filtering and set a data source dynamically through the [`OnRead` event]({%slug multiselect-events%}#onread).

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Minimum Length

To control when the filter list appears, set the `MinLength` parameter. This can be useful if you have a very large list of data or a lot of similar items.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`DebounceDelay`]({%slug multiselect-overview%}#parameters) parameter of the component.

## Filtering Example

>caption Filtering in the MultiSelect

````CSHTML
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
            Minimum string length before filtering:
            <TelerikNumericTextBox @bind-Value="@FilterMinLength" Min="0" Width="100px" />
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

<TelerikMultiSelect Data="@ProductList"
                    @bind-Value="@SelectedProducts"
                    TextField="@nameof(Product.Name)"
                    ValueField="@nameof(Product.Id)"
                    Filterable="true"
                    FilterOperator="@FilterOperator"
                    MinLength="@FilterMinLength"
                    DebounceDelay="@DebounceDelay"
                    Placeholder="Type digits to see filtering in action"
                    Width="600px">
</TelerikMultiSelect>

@code{
    private List<Product> ProductList { get; set; }

    private List<int> SelectedProducts { get; set; }

    private List<StringFilterOperator> FilterOperators =>
        Enum.GetValues(typeof(StringFilterOperator)).Cast<StringFilterOperator>().ToList();

    private StringFilterOperator FilterOperator { get; set; } = StringFilterOperator.StartsWith;

    private int FilterMinLength { get; set; } = 1;

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

* [Live Demo: MultiSelect Filtering](https://demos.telerik.com/blazor-ui/multiselect/filtering)

* [Custom Filtering by Multiple Fields]({%slug dropdowns-kb-search-in-multiple-fields%})

* [Filter by field that is not the TextField]({%slug dropdowns-kb-search-in-multiple-fields%})
