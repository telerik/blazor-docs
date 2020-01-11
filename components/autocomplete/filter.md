---
title: Filter
page_title: AutoComplete for Blazor | Filter
description: Filtering in the ComboBox for Blazor
slug: autocomplete-filter
tags: telerik,blazor,combo,autocomplete,filter
published: True
position: 3
---

# AutoComplete Filter

The AutoComplete component can filter the available suggestions according to the current user input, so they can find the one they need faster. To see the difference in behavior, visit the [Live Demo: AutoComplete Filtering](https://demos.telerik.com/blazor-ui/autocomplete/filtering) page.

To enable filtering, set the `Filterable` parameter to `true`. The filter operator is `starts with`, and it ignores casing.

To control when the filter list appears, set the `MinLength` parameter. This can be useful if you have a very large list of data.

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

## See Also

  * [Live Demo: AutoComplete Filtering](https://demos.telerik.com/blazor-ui/autocomplete/filtering)
   
  