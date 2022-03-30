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

The AutoComplete component can filter the available suggestions according to the current user input, so they can find the one they need faster. To see the difference in behavior, visit the [Live Demo: AutoComplete Filtering](https://demos.telerik.com/blazor-ui/autocomplete/filtering) page.

To enable filtering, set the `Filterable` parameter to `true`.

Filtering ignores casing and the default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

To control when the filter list appears, set the `MinLength` parameter. This can be useful if you have a very large list of data.

By default, the filtering will be debounced with 150ms. Configure that with the [`DebounceDelay`]({%slug autocomplete-overview%}#parameters) parameter of the component.

You can also implement custom (server) filtering and set a data source dynamically through the [`OnRead` event]({%slug autocomplete-events%}#onread).

>caption Filtering in the AutoComplete

````CSHTML
@* as you type "de", you will only get "Developer" and "Designer" as suggestions instead of the full list *@

<TelerikAutoComplete Data="@Suggestions" @bind-Value="@TheValue"
                     Filterable="true"
                     Placeholder="Write 'de' to see the filtering" ClearButton="true" />

@code{
    string TheValue { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

>caption Filtering with MinLength

````CSHTML
@* On the first keystroke, there will be no suggestions, then you will only get "Developer" and "Designer" as you write "de" *@

<TelerikAutoComplete Data="@Suggestions" @bind-Value="@TheValue"
                     Filterable="true" MinLength="2"
                     Placeholder="Write 'de' to see the filtering" ClearButton="true" />

@code{
    string TheValue { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````


>caption Choose FilterOperator

````CSHTML
@* Type something in the input to see items filtered. Choose a new filter operator and repeat *@

<label>
    Choose filter operator:
    <select @bind="filterOperator">
        @foreach (var possibleFilter in Enum.GetValues(typeof(StringFilterOperator)))
        {
            <option value="@possibleFilter">@possibleFilter</option>
        }
    </select>
</label>
<TelerikAutoComplete Data="@Suggestions" @bind-Value="@TheValue"
                     Filterable="true" FilterOperator="@filterOperator"
                     Placeholder="Write 's' or 'a' to see the difference" ClearButton="true" />

@code{
    string TheValue { get; set; }
    StringFilterOperator filterOperator { get; set; } = StringFilterOperator.StartsWith;

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## See Also

  * [Live Demo: AutoComplete Filtering](https://demos.telerik.com/blazor-ui/autocomplete/filtering)
   
  
