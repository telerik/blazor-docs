---
title: Filter
page_title: MultiSelect for Blazor | Filter
description: Filtering in the MultiSelect for Blazor
slug: multiselect-filter
tags: telerik,blazor,combo,multiselect,filter
published: True
position: 3
---

# MultiSelect Filter

The MultiSelect component can filter the available suggestions according to the current user input, so they can find the one they need faster. To see the difference in behavior, visit the [Live Demo: MultiSelect Filtering](https://demos.telerik.com/blazor-ui/multiselect/filtering) page.

To enable filtering, set the `Filterable` parameter to `true`.

Filtering ignores casing and the default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

To control when the filter list appears, set the `MinLength` parameter. This can be useful if you have a very large list of data.

You can also implement custom filtering and set a data source dynamically through the [`OnRead` event]({%slug multiselect-events%}#onread).

>caption Filtering in the MultiSelect

````CSHTML
@* as you type "de", you will only get "Developer" and "Designer" as suggestions instead of the full list *@

<TelerikMultiSelect Data="@Roles" @bind-Value="@TheValues"
                     Filterable="true"
                     Placeholder="Write 'de' to see the filtering" ClearButton="true" />

<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    List<string> TheValues { get; set; } = new List<string>();

    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

>caption Filtering with MinLength

````CSHTML
@* On the first keystroke, there will be no suggestions, then you will only get "Developer" and "Designer" as you write "de" *@

<TelerikMultiSelect Data="@Roles" @bind-Value="@TheValues"
                     Filterable="true" MinLength="2"
                     Placeholder="Write 'de' to see the filtering" ClearButton="true" />

<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    List<string> TheValues { get; set; } = new List<string>();

    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````


>caption Choose FilterOperator

````CSHTML
@* Type something in the input to see items filtered. Choose a new filter operator and repeat *@

<label>
    Choose filter operator:
    <select @bind="@filterOperator">
        @foreach (var possibleFilter in Enum.GetValues(typeof(StringFilterOperator)))
        {
            <option value="@possibleFilter">@possibleFilter</option>
        }
    </select>
</label>

<TelerikMultiSelect Data="@Roles" @bind-Value="@TheValues"
                     Filterable="true" FilterOperator="@filterOperator"
                     Placeholder="Write 's' or 'a' to see the difference" ClearButton="true" />

<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    List<string> TheValues { get; set; } = new List<string>();

    StringFilterOperator filterOperator { get; set; } = StringFilterOperator.StartsWith;

    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}

````

## See Also

  * [Live Demo: MultiSelect Filtering](https://demos.telerik.com/blazor-ui/multiselect/filtering)
   
  