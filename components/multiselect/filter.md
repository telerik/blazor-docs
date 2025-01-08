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

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive.

You can also use the [`OnRead` event](slug://multiselect-events#onread) to:
* Get the [applied filtering criteria](slug://common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Minimum Length

To control when the filter list appears, set the `MinLength` parameter. This can be useful if you have a very large list of data or a lot of similar items.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`DebounceDelay`](slug://multiselect-overview#parameters) parameter of the component.

## Persist Filter

By default, the filter value will be cleared when the user selects an item.

You can configure the MultiSelect to keep the filter value:

* When the user selects an item from the list.
* When the user closes the popup but keeps the focus on the MultiSelect (for example, presses [`Esc` to close the popup](https://demos.telerik.com/blazor-ui/multiselect/keyboard-navigation)).

This can be useful if you want to allow the user to select multiple values that match the same filtering criteria (for example, select several people with the same last name). Blurring the MultiSelect indicates that the user is done with the selection and the filter value will be cleared upon blur.

To keep the filter upon selection, set the `PersistFilterOnSelect` parameter to `true`. It only applies when `Filterable="true"` and `AutoClose="false"`.

## Filtering Example

>caption Filtering in the MultiSelect

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
    <li>
        <label>
            Persist filter:
            <TelerikCheckBox @bind-Value="@PersistFilter"/>
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
                    PersistFilterOnSelect="@PersistFilter"
                    AutoClose="false"
                    Placeholder="Type digits to see filtering in action"
                    Width="600px">
</TelerikMultiSelect>

@code {
    private List<Product> ProductList { get; set; }

    private List<int> SelectedProducts { get; set; }

    private List<StringFilterOperator> FilterOperators =>
        Enum.GetValues(typeof(StringFilterOperator)).Cast<StringFilterOperator>().ToList();

    private StringFilterOperator FilterOperator { get; set; } = StringFilterOperator.StartsWith;

    private int FilterMinLength { get; set; } = 1;

    private int DebounceDelay { get; set; } = 150;

    private bool PersistFilter { get; set; } = true;

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

* [Custom Filtering by Multiple Fields](slug://dropdowns-kb-search-in-multiple-fields)

