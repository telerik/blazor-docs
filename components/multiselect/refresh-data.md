---
title: Refresh Data
page_title: MultiSelect Refresh Data
description: Refresh MultiSelect Data using Observable Data or creating a new Collection reference.
slug: multiselect-refresh-data
tags: telerik,blazor,multiselect,observable,data,new,collection
published: True
position: 15
---

# MultiSelect Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

Sections in this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)
- [Update Value](#update-value)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)


>caption Bind the MultiSelect component to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove an option to see how the MultiSelect reacts to the change. *@

@using System.Collections.ObjectModel

<h4>Add option</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>

<TelerikButton OnClick="@AddOption">Add option</TelerikButton>
<br />

<h4>Remove the last option</h4>
<TelerikButton OnClick="@RemoveOption">Remove the last option</TelerikButton>
<br />

<h4>Options: @Options.Count</h4>

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues"
                    TextField="StringRepresentation" ValueField="MyValueField" />

@code{
    List<int> TheValues { get; set; } = new List<int>();
    string ValuetoAdd { get; set; }

    ObservableCollection<OptionsModel> Options { get; set; } = new ObservableCollection<OptionsModel>
{
        new OptionsModel { StringRepresentation = "first",  MyValueField = 1 },
        new OptionsModel { StringRepresentation = "second", MyValueField = 2 },
        new OptionsModel { StringRepresentation = "third",  MyValueField = 3 }
    };

    void AddOption()
    {
        if (!string.IsNullOrWhiteSpace(ValuetoAdd))
        {
            Options.Add(
            new OptionsModel { StringRepresentation = ValuetoAdd, MyValueField = Options.Count + 1 }
            );
            ValuetoAdd = string.Empty;
        }
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

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Multiselect data.

````CSHTML
@* Add/remove an option or a collection of options to see how the MultiSelect reacts to the change. *@

<h4>Add a collection of new options</h4>
<TelerikButton OnClick="@LoadNewData">Load new options</TelerikButton>
<br />

<h4>Add a new option</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>
<TelerikButton OnClick="@AddItem">Add new option</TelerikButton>
<br />

<h4>Remove the last option</h4>
<TelerikButton OnClick="@RemoveItem">Remove last item</TelerikButton>
<br />

<h4>Options: @Options.Count</h4>

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues"
                    TextField="StringRepresentation" ValueField="MyValueField" />

@code{
    List<int> TheValues { get; set; }
    string ValuetoAdd { get; set; }

    List<OptionsModel> Options { get; set; } = new List<OptionsModel>
    {
        new OptionsModel { StringRepresentation = "first",  MyValueField = 1 },
        new OptionsModel { StringRepresentation = "second", MyValueField = 2 },
        new OptionsModel { StringRepresentation = "third",  MyValueField = 3 }
    };

    void AddItem()
    {
        if (!string.IsNullOrWhiteSpace(ValuetoAdd))
        {
            Options.Add(new OptionsModel { StringRepresentation = ValuetoAdd, MyValueField = Options.Count + 1 });
            Options = new List<OptionsModel>(Options);
            ValuetoAdd = string.Empty;
        }
    }

    void RemoveItem()
    {
        Options.RemoveAt(Options.Count - 1);
        Options = new List<OptionsModel>(Options);
    }

    void LoadNewData()
    {
        var newData = new List<OptionsModel>
    {
        new OptionsModel { StringRepresentation = "fourth",  MyValueField = 4 },
        new OptionsModel { StringRepresentation = "fifth", MyValueField = 5 },
        new OptionsModel { StringRepresentation = "sixth",  MyValueField = 6 }
    };

        Options = new List<OptionsModel>(newData);

        Console.WriteLine("New options collection loaded.");
    }

    public class OptionsModel
    {
        public string StringRepresentation { get; set; }
        public int MyValueField { get; set; } // this determines the type of the values list
    }
}
````

## Update Value

The `Value` parameter also accepts a collection but it does not support observable data. If you want to change the Value, make sure you are providing a collection of items that are included in the data source (not random ones).

>caption Set/change the selected values or clear the selection programatically.

````CSHTML
<h4>Set or change selected values</h4>
<TelerikButton OnClick="@SetSelected">Set selected</TelerikButton>
<br />

<h4>Clear selected values</h4>
<TelerikButton OnClick="@ClearSelected">Clear selected</TelerikButton>
<br />

@if (TheValues.Count > 0)
{
    <ul>
        @foreach (var item in TheValues)
        {
            <li>@item</li>
        }
    </ul>
}

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues"
                    TextField="StringRepresentation" ValueField="MyValueField" />

@code{
    List<int> TheValues { get; set; } = new List<int>();
    string ValuetoAdd { get; set; }

    void SetSelected()
    {
        TheValues = Options.Select(x => x.MyValueField).Skip(1).Take(2).ToList();
    }

    void ClearSelected()
    {
        TheValues.Clear();
        TheValues = new List<int>(TheValues);
    }

    List<OptionsModel> Options { get; set; } = new List<OptionsModel>
    {
        new OptionsModel { StringRepresentation = "first",  MyValueField = 1 },
        new OptionsModel { StringRepresentation = "second", MyValueField = 2 },
        new OptionsModel { StringRepresentation = "third",  MyValueField = 3 },
        new OptionsModel { StringRepresentation = "fourth",  MyValueField = 4 },
        new OptionsModel { StringRepresentation = "fifth", MyValueField = 5 },
        new OptionsModel { StringRepresentation = "sixth",  MyValueField = 6 }
    };

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