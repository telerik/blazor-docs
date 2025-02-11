---
title: Filter
page_title: AutoComplete - Filter
description: Filtering in the ComboBox for Blazor.
slug: autocomplete-filter
tags: telerik,blazor,combo,autocomplete,filter
published: True
position: 10
---

# AutoComplete Filter

The AutoComplete component can filter the available suggestions, according to the current input. In this way users can find the desired value faster. To see the difference in behavior, visit the [Live Demo: AutoComplete Filtering](https://demos.telerik.com/blazor-ui/autocomplete/filtering) page.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive.

You can also use the [`OnRead` event](slug:autocomplete-events#onread) to:
* Get the [applied filtering criteria](slug:common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Minimum Length

To control when the filter list appears, set the `MinLength` parameter. This can be useful if you have a very large list of data or a lot of similar items.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`DebounceDelay`](slug:autocomplete-overview#autocomplete-parameters) parameter of the component.

## Filtering Example

>caption Filtering in the AutoComplete

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
            <TelerikNumericTextBox @bind-Value="@AutoCompleteDebounceDelay" Min="0" Width="120px" />
        </label>
    </li>
</ul>

<br />

<TelerikAutoComplete Data="@Suggestions"
                     @bind-Value="@AutoCompleteValue"
                     Filterable="true"
                     FilterOperator="@FilterOperator"
                     MinLength="@FilterMinLength"
                     DebounceDelay="@AutoCompleteDebounceDelay"
                     Placeholder="Type 's' or 'a' to see the difference"
                     ShowClearButton="true"
                     Width="300px" />

@code{
    private string AutoCompleteValue { get; set; }

    private List<StringFilterOperator> FilterOperators =>
        Enum.GetValues(typeof(StringFilterOperator)).Cast<StringFilterOperator>().ToList();

    private StringFilterOperator FilterOperator { get; set; } = StringFilterOperator.StartsWith;

    private int FilterMinLength { get; set; } = 1;

    private int AutoCompleteDebounceDelay { get; set; } = 150;

    private List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## See Also

* [Live Demo: AutoComplete Filtering](https://demos.telerik.com/blazor-ui/autocomplete/filtering)

* [Custom Filtering by Multiple Fields](slug:dropdowns-kb-search-in-multiple-fields)
