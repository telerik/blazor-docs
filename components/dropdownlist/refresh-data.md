---
title: Refresh Data
page_title: DropDownList Refresh Data
description: Refresh DropDownList Data using Observable Data or creating a new Collection reference.
slug: dropdownlist-refresh-data
tags: telerik,blazor,dropdownlist,observable,data,new,collection
published: True
position: 30
components: ["dropdownlist"]
---
# DropDownList - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:

- [Rebind Method](#rebind-method)
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)


## Rebind Method

You can refresh the data of the DropDownList by using the `Rebind` method exposed to the reference of the TelerikDropDownList. If you have manually defined the [OnRead event](slug:components/dropdownlist/events#onread) the business logic defined in its event handler will be executed. 

````RAZOR
@* Clicking on the Rebind button will delete the first option from the dropdown and refresh the data *@

@using Telerik.DataSource.Extensions

<TelerikButton OnClick="@RebindDropDown">Rebind the DropDown</TelerikButton>

<TelerikDropDownList TItem="@String" 
                     TValue="@String"
                     @ref="@DropDownRef"
                     OnRead="@ReadItems"
                     @bind-Value="@SelectedValue">
</TelerikDropDownList>

@code{
    private TelerikDropDownList<string, string> DropDownRef { get; set; }

    private void RebindDropDown()
    {
        if(Options.Count > 0)
        {
            Options.RemoveAt(0);
        }

        DropDownRef.Rebind();
    }

    public string SelectedValue { get; set; }
    List<string> Options { get; set; } = new List<string>();

    async Task ReadItems(DropDownListReadEventArgs args)
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


>caption Bind the DropDownList component to an ObservableCollection, so it can react to collection changes.

````RAZOR
@* Add/remove an option to see how the DropDownList reacts to the change. *@

@using System.Collections.ObjectModel

<h4>Add option</h4>
<TelerikTextBox @bind-Value="@ValuetoAdd"></TelerikTextBox>

<TelerikButton OnClick="@AddOption">Add option</TelerikButton>
<br />

<h4>Remove the last option</h4>
<TelerikButton OnClick="@RemoveOption">Remove the last option</TelerikButton>
<br />

<h4>DropDownList options: @myDdlData.Count</h4>
<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
</TelerikDropDownList>

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

>caption Create new collection reference to refresh the DropDownList data.

````RAZOR
@* Add/remove an option to see how the DropDownList reacts to the change. *@

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

<h4>DropDownList options: @myDdlData.Count</h4>
<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
</TelerikDropDownList>

@code {
    string ValuetoAdd { get; set; }

    int selectedValue { get; set; }

    List<MyDdlModel> myDdlData = Enumerable.Range(1, 5).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x }).ToList();

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

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)
* [Blazor DropDownList](slug:components/dropdownlist/overview)