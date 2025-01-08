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

- [Rebind Method](#rebind-method)
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)


## Rebind Method

To refresh the ComboBox data when using [`OnRead`](slug://components/combobox/events#onread), call the `Rebind` method of the TelerikComboBox reference. This will fire the `OnRead` event and execute the business logic in the handler.

````RAZOR
@* Clicking on the Rebind button will delete the first option from the dropdown and refresh the data *@

@using Telerik.DataSource.Extensions

<TelerikButton OnClick="@RebindComboBox">Rebind</TelerikButton>
<TelerikComboBox @ref="@ComboBoxRef"
                 TItem="Product" TValue="int"
                 OnRead="@ReadItems"
                 ValueField="@nameof(Product.ProductId)"
                 TextField="@nameof(Product.ProductName)"
                 Filterable="true"
                 Placeholder="Find what you seek by typing"
                 @bind-Value="@SelectedValue">
</TelerikComboBox>

@code{
    public int SelectedValue { get; set; }
    List<Product> AllData { get; set; } = new List<Product>();
    public TelerikComboBox<Product, int> ComboBoxRef { get; set; }

    async Task ReadItems(ComboBoxReadEventArgs args)
    {
        await Task.Delay(1000);
        args.Data = AllData.ToDataSourceResult(args.Request).Data;
    }

    protected override void OnInitialized()
    {
        List<Product> products = new List<Product>();
        for (int i = 0; i < 200; i++)
        {
            products.Add(new Product()
            {
                ProductId = i,
                ProductName = "Product" + i.ToString(),
                SupplierId = i,
                UnitPrice = (decimal)(i * 3.14),
                UnitsInStock = (short)(i * 1),
            });
        }

        AllData = products;
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int SupplierId { get; set; }
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
    }

    private void RebindComboBox()
    {
        if (AllData.Count > 0)
        {
            AllData.RemoveAt(0);
        }

        ComboBoxRef.Rebind();
    }
}
````

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the ComboBox component to an ObservableCollection, so it can react to collection changes.

````RAZOR
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

````RAZOR
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

  * [ObservableCollection](slug://common-features-observable-data)
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui)