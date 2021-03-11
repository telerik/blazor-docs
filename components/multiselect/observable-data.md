---
title: Observable Data
page_title: MultiSelect with Observable Data
description: MultiSelect with Observable Data
slug: multiselect-observable-data
tags: telerik,blazor,multiselect,observable,data,collection
published: True
position: 25
---

# MultiSelect with Observable Data

@[template](/_contentTemplates/common/observable-data-intro.md#observable-data-intro)


>caption Bind the MultiSelect component to an [ObservableCollection]({%slug common-features-observable-data%}), so it can react to collection changes.

````CSHTML
@using System.Collections.ObjectModel

<h3>Add option to the Multiselect</h3>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>

<TelerikButton OnClick="@AddOption">Add option</TelerikButton>
<br />

<h3>Remove the last added option from Multiselect</h3>
<TelerikButton OnClick="@RemoveOption">Remove the last option</TelerikButton>
<br />

<h3>Multiselect options: @Options.Count</h3>
<br />

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues"
                    TextField="StringRepresentation" ValueField="MyValueField" />

@code{
    List<int> TheValues { get; set; }
    string ValuetoAdd { get; set; }

    ObservableCollection<OptionsModel> Options { get; set; } = new ObservableCollection<OptionsModel>
    {
        new OptionsModel { StringRepresentation = "first",  MyValueField = 1 },
        new OptionsModel { StringRepresentation = "second", MyValueField = 2 },
        new OptionsModel { StringRepresentation = "third",  MyValueField = 3 }
    };

    void AddOption()
    {
        Options.Add(
            new OptionsModel { StringRepresentation = ValuetoAdd, MyValueField = Options.Count + 1 }
            );
    }

    void RemoveOption()
    {
        Options.RemoveAt(Options.Count - 1);
    }

    public class OptionsModel
    {
        public string StringRepresentation { get; set; }
        public int MyValueField { get; set; } // this determines the type of the values list
    }
}
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)