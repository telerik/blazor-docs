---
title: Data Binding
page_title: AutoComplete - Data Binding
description: Data Binding the AutoComplete for Blazor.
slug: autocomplete-databind
tags: telerik,blazor,autocomplete,data,bind,binding,databind
published: True
position: 5
components: ["autocomplete"]
---
# AutoComplete Data Binding

This article explains the different ways to provide data to an AutoComplete component, the properties related to data binding and their results. The key requirements is to have a string field for the suggestions.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Strings and Value Types](#strings-and-value-types)
* [Model](#bind-to-a-model)

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Strings and Value Types

You can data bind the AutoComplete to a simple collection of `string` data. When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models.

To bind the AutoComplete, you need to:

1. provide an `IEnumerable<string>` to its `Data` property,
1. point the `Value` parameter to a `string` field.

>caption Data binding an AutoComplete to a simple data source

````RAZOR
@*Bind to an IEnumerable<string>*@

User input 1: @FirstValue
<br />
<TelerikAutoComplete Data="@Suggestions" @bind-Value="@FirstValue" />

<br />
User input 2: @SecondValue
<br />
<TelerikAutoComplete Data="@ArraySuggestions" @bind-Value="@SecondValue" />

@code{
    private string FirstValue { get; set; }
    private List<string> Suggestions { get; set; } = new List<string> { "first", "second", "third" };

    private string SecondValue { get; set; }
    private string[] ArraySuggestions = new string[] { "one", "two", "three" };
}
````

## Bind to a Model

You can bind the AutoComplete to a model in your application. This is useful when you have the data in some form already and you don't need to prepare a separate collection of suggestions.

To bind the AutoComplete to a model:

1. populate its `Data` property with the collection of items you want in the dropdown
1. set the `ValueField` to point to the corresponding name of the model that contains the string data for the suggestions
1. point the `Value` parameter to a `string` field in the view-model.

>caption Data binding an AutoComplete to a model

````RAZOR
@AutoComplete
<br />
<TelerikAutoComplete Data="@Suggestions"
                     @bind-Value="@AutoComplete"
                     ValueField="@( nameof(SuggestionsModel.Suggestion) )" />

@code{
    private string AutoComplete { get; set; }

    private List<SuggestionsModel> Suggestions { get; set; } = new List<SuggestionsModel>
    {
        new SuggestionsModel { Suggestion = "first", SomeOtherField = 1 },
        new SuggestionsModel { Suggestion = "second", SomeOtherField = 2 },
        new SuggestionsModel { Suggestion = "third", SomeOtherField = 3 }
    };

    public class SuggestionsModel
    {
        public string Suggestion { get; set; }//the auto complete needs only the string field
        public int SomeOtherField { get; set; }
    }
}
````

## Missing Data

The AutoComplete is, essentially, a textbox. This means that its `Value` is always a string and it is up to you to bind and/or use it. The `Data` parameter, however, is required for the functionality of the component, and it must never be `null`. If there are no suggestions that you wish to provide to the user, consider using a regular TextBox, or creating an empty collection.

>caption Minimal AutoComplete configuration for it to run

````RAZOR
@* If you cannot provide suggestions list, use an empty collection and the component will show "No Data" to the user in the suggestions list *@

<TelerikAutoComplete Data="@Suggestions" />

@code{
    List<string> Suggestions { get; set; } = new List<string>();
}
````

## See Also

* [AutoComplete Overview](slug:autocomplete-overview)
* [Live Demo: AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/overview)
