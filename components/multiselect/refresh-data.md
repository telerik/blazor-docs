---
title: Refresh Data
page_title: MultiSelect Refresh Data
description: Refresh MultiSelect Data using Observable Data or creating a new Collection reference.
slug: multiselect-refresh-data
tags: telerik,blazor,multiselect,observable,data,new,collection
published: True
position: 30
components: ["multiselect"]
---
# MultiSelect - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

Sections in this article:

- [Rebind Method](#rebind-method)
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)
- [Update Value](#update-value)

## Rebind Method

You can refresh the data of the MultiSelect by using the `Rebind` method exposed to the reference of the TelerikMultiSelect. If you have manually defined the [OnRead event](slug:multiselect-events#onread) the business logic defined in its event handler will be executed. 

````RAZOR
@* Clicking on the Rebind button will delete the first option from the dropdown and refresh the data *@

@using Telerik.DataSource.Extensions

<TelerikButton OnClick="@RebindMultiSelect">Rebind the Multiselect</TelerikButton>

<TelerikMultiSelect TItem="@String"
                    TValue="@String"
                    @ref="@MultiSelectRef"
                    OnRead="@ReadItems"
                    @bind-Value="@SelectedValues">
</TelerikMultiSelect>

@code{
    private TelerikMultiSelect<string, string> MultiSelectRef { get; set; }

    private void RebindMultiSelect()
    {
        if (Options.Count > 0)
        {
            Options.RemoveAt(0);
        }

        MultiSelectRef.Rebind();
    }

    public List<string> SelectedValues { get; set; }
    List<string> Options { get; set; } = new List<string>();

    async Task ReadItems(MultiSelectReadEventArgs args)
    {
        await Task.Delay(1000);
        args.Data = Options.ToDataSourceResult(args.Request).Data;
    }

    protected override async Task OnInitializedAsync()
    {
        Options = new List<string>() { "one", "two", "three" };
    }
}
````

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)


>caption Bind the MultiSelect component to an ObservableCollection, so it can react to collection changes.

````RAZOR
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
        if (Options.Count > 0)
        {
        Options.RemoveAt(Options.Count - 1);
        }
    }

    public class OptionsModel
    {
        public string StringRepresentation { get; set; }
        public int MyValueField { get; set; } // this determines the type of the values list
    }
}
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Multiselect data.

````RAZOR
@* Add/remove an option or a collection of options to see how the MultiSelect reacts to the change. *@

<h4>Add a new option</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>
<TelerikButton OnClick="@AddItem">Add new option</TelerikButton>
<br />

<h4>Remove the last option</h4>
<TelerikButton OnClick="@RemoveItem">Remove last item</TelerikButton>
<br />

<h4>Load a collection of new options</h4>
<TelerikButton OnClick="@LoadNewData">Load new options</TelerikButton>
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
        if (Options.Count > 0)
        {
            Options.RemoveAt(Options.Count - 1);
            Options = new List<OptionsModel>(Options);
        }
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

>caption Set/change the selected values or clear the selection programmatically.

````RAZOR
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
        TheValues = new List<int>();
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

  * [ObservableCollection](slug:common-features-observable-data)
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui)
