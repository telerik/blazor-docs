---
title: Refresh Data
page_title: Autocomplete Refresh Data
description: Refresh Autocomplete Data using Observable Data or creating a new Collection reference.
slug: autocomplete-refresh-data
tags: telerik,blazor,autocomplete,observable,data,new,collection
published: True
position: 30
---

# Autocomplete - Refresh Data


@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)


>caption Bind the Autocomplete component to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove a suggestion to see how the Autocomplete reacts to the change. *@

@using System.Collections.ObjectModel

<h4>Add suggestion</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>

<TelerikButton OnClick="@AddSuggestion">Add suggestion</TelerikButton>
<br />

<h4>Remove the last suggestion</h4>
<TelerikButton OnClick="@RemoveSuggestion">Remove the last suggestion</TelerikButton>
<br />

<h4>Autocomplete suggestions: @Suggestions.Count</h4>
<br />

<TelerikAutoComplete Data="@Suggestions" ValueField="@( nameof(SuggestionsModel.Suggestion) )" @bind-Value="@TheValue" />

@code{
    string TheValue { get; set; }

    string ValuetoAdd { get; set; }

    void AddSuggestion()
    {
        if (!string.IsNullOrWhiteSpace(ValuetoAdd))
        {
            Suggestions.Add(
        new SuggestionsModel { Suggestion = ValuetoAdd, SomeOtherField = Suggestions.Count + 1 }
        );
            ValuetoAdd = string.Empty;
        }
    }

    void RemoveSuggestion()
    {
        if (Suggestions.Count > 0)
        {
        Suggestions.RemoveAt(Suggestions.Count - 1);
        }
    }

    ObservableCollection<SuggestionsModel> Suggestions { get; set; } = new ObservableCollection<SuggestionsModel>
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

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Autocomplete data.

````CSHTML
@* Add/remove a suggestion to see how the Autocomplete reacts to the change. *@

<h4>Add suggestion</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>

<TelerikButton OnClick="@AddSuggestion">Add suggestion</TelerikButton>
<br />

<h4>Remove the last suggestion</h4>
<TelerikButton OnClick="@RemoveSuggestion">Remove the last suggestion</TelerikButton>
<br />

<h4>Load new collection</h4>
<TelerikButton OnClick="@LoadNewData">Load data</TelerikButton>
<br />

<h4>Autocomplete suggestions: @Suggestions.Count</h4>
<br />

<TelerikAutoComplete Data="@Suggestions" ValueField="@( nameof(SuggestionsModel.Suggestion) )" @bind-Value="@TheValue" />

@code{
    string TheValue { get; set; }

    string ValuetoAdd { get; set; }

    void AddSuggestion()
    {
        if (!string.IsNullOrWhiteSpace(ValuetoAdd))
        {
            Suggestions.Add(
        new SuggestionsModel { Suggestion = ValuetoAdd, SomeOtherField = Suggestions.Count + 1 }
        );
            Suggestions = new List<SuggestionsModel>(Suggestions);
            ValuetoAdd = string.Empty;
        }
    }

    void RemoveSuggestion()
    {
        if (Suggestions.Count > 0)
        {
            Suggestions.RemoveAt(Suggestions.Count - 1);
            Suggestions = new List<SuggestionsModel>(Suggestions);
        }
    }

    void LoadNewData()
    {
        var newData = new List<SuggestionsModel>
        {
        new SuggestionsModel { Suggestion = "fourth", SomeOtherField = 4 },
        new SuggestionsModel { Suggestion = "fifth", SomeOtherField = 5 },
        new SuggestionsModel { Suggestion = "sixth", SomeOtherField = 6 }
        };

        Suggestions = new List<SuggestionsModel>(newData);

        Console.WriteLine("New data collection loaded.");
    }

    List<SuggestionsModel> Suggestions { get; set; } = new List<SuggestionsModel>
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


## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)