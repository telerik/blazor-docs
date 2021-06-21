---
title: Refresh Data
page_title: ComboBox Refresh Data
description: Refresh ComboBox Data using Observable Data or creating a new Collection reference.
slug: combobox-refresh-data
tags: telerik,blazor,combobox,observable,data,new,collection
published: True
position: 35
---

# ComboBox - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the ComboBox component to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove an option to see how the ComboBox reacts to the change. *@

@using System.Collections.ObjectModel

<h4>Add option</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>

<TelerikButton OnClick="@AddOption">Add option</TelerikButton>
<br />

<h4>Remove the last option</h4>
<TelerikButton OnClick="@RemoveOption">Remove the last option</TelerikButton>
<br />

<h4>ComboBox options: @myDdlData.Count</h4>
<br />

<TelerikComboBox Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
</TelerikComboBox>

@code {
    string ValuetoAdd { get; set; }

    int selectedValue { get; set; }

    ObservableCollection<MyDdlModel> myDdlData = new ObservableCollection<MyDdlModel>(Enumerable.Range(1, 5).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x }));

    void AddOption()
    {
        if (!string.IsNullOrWhiteSpace(ValuetoAdd))
        {
            myDdlData.Add(
            new MyDdlModel { MyTextField = ValuetoAdd, MyValueField = myDdlData.Count + 1 }
            );
            ValuetoAdd = string.Empty;
        }
    }

    void RemoveOption()
    {
        if (myDdlData.Count > 0)
        {
        myDdlData.RemoveAt(myDdlData.Count - 1);
        }
    }

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the ComboBox data.

````CSHTML
@* Add/remove an option to see how the ComboBox reacts to the change. *@

<h4>Add option</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>

<TelerikButton OnClick="@AddOption">Add option</TelerikButton>
<br />

<h4>Remove the last option</h4>
<TelerikButton OnClick="@RemoveOption">Remove the last option</TelerikButton>
<br />

<h4>Load new collection</h4>
<TelerikButton OnClick="@LoadNewData">Load data</TelerikButton>
<br />

<h4>ComboBox options: @myDdlData.Count</h4>
<br />

<TelerikComboBox Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
</TelerikComboBox>

@code {
    string ValuetoAdd { get; set; }

    int selectedValue { get; set; }

    List<MyDdlModel> myDdlData = new List<MyDdlModel>(Enumerable.Range(1, 5).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x }));

    void AddOption()
    {
        if (!string.IsNullOrWhiteSpace(ValuetoAdd))
        {
            myDdlData.Add(
            new MyDdlModel { MyTextField = ValuetoAdd, MyValueField = myDdlData.Count + 1 }
            );
            myDdlData = new List<MyDdlModel>(myDdlData);
            ValuetoAdd = string.Empty;
        }
    }

    void RemoveOption()
    {
        if (myDdlData.Count > 0)
        {
            myDdlData.RemoveAt(myDdlData.Count - 1);
            myDdlData = new List<MyDdlModel>(myDdlData);
        }
    }

    void LoadNewData()
    {
        var newData = new List<MyDdlModel>(Enumerable.Range(6, 5).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x }));

        myDdlData = new List<MyDdlModel>(newData);

        Console.WriteLine("New data collection loaded.");
    }

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)