---
title: Filter
page_title: DropDownList - Filter
description: Filtering in the DropDownList for Blazor.
slug: components/dropdownlist/filter
tags: telerik,blazor,drop,down,list,dropdownlist,filter
published: True
position: 10
components: ["dropdownlist"]
---
# DropDownList Filter

The DropDownList filter textbox allows users to filter the available items by their text and find the one they need faster. The filtering input is at the top of the dropdown popup.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive.

You can also use the [`OnRead` event](slug:components/dropdownlist/events#onread) to:
* Get the [applied filtering criteria](slug:common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`FilterDebounceDelay`](slug:components/dropdownlist/overview#dropdownlist-parameters) parameter of the component.

## Placeholder

By default, the filter input in the popup is empty. Set the desired hint in it through the `FilterPlaceholder` parameter.

## Filtering Example

>caption Filtering in the DropDownList

````RAZOR
<ul>
    <li>
        <label>
            Choose filter operator:
            <select @bind="FilterOperator">
                @foreach (var possibleFilter in Enum.GetValues(typeof(StringFilterOperator)))
                {
                    <option value="@possibleFilter">@possibleFilter</option>
                }
            </select>
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

<TelerikDropDownList Data="@ProductList"
                     @bind-Value="@SelectedProduct"
                     TextField="@nameof(Product.Name)"
                     ValueField="@nameof(Product.Id)"
                     Filterable="true"
                     FilterOperator="@FilterOperator"
                     FilterDebounceDelay="@DebounceDelay"
                     FilterPlaceholder="Search a product number..."
                     DefaultText="Type digits to see filtering in action"
                     Width="300px">
</TelerikDropDownList>

@code {
    private List<Product> ProductList { get; set; }

    private int? SelectedProduct { get; set; }

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

* [Live Demo: DropDownList Filtering](https://demos.telerik.com/blazor-ui/dropdownlist/filtering)
* [Custom Filtering by Multiple Fields](slug:dropdowns-kb-search-in-multiple-fields)
* [Blazor DropDownList](slug:components/dropdownlist/overview)