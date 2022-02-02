---
title: Refresh Data
page_title: ListView Refresh Data
description: Refresh ListView Data using Observable Data or creating a new Collection reference.
slug: listview-refresh-data
tags: telerik,blazor,listview,observable,data,new,collection
published: True
position: 53
---

# ListView - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:

- [Rebind Method](#rebind-method)
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Rebind Method

To refresh the ComboBox data when using [`OnRead`]({%slug autocomplete-events%}#onread), call the `Rebind` method of the TelerikAutoComplete reference. This will fire the `OnRead` event and execute the business logic in the handler.

````CSHTML
@* Clicking on the Rebind button will delete the first item from the ListView and refresh the data *@

@using Telerik.DataSource.Extensions

<div class="example-box">
    <h3>Pressing rebind will remove the first item from the combobox and rebind it.</h3>
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
</div>

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

>caption Bind the ListView to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove employee to see how the ListView reacts to that change. *@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddEmployee">Add employee</TelerikButton>

<TelerikButton OnClick="@RemoveEmployee">Remove employee</TelerikButton>

<TelerikListView Data="@ListViewData" Width="700px" Pageable="true">
    <HeaderTemplate>
        <h2>Employee List</h2>
    </HeaderTemplate>
    <Template>
        <div class="listview-item">
            <h4>@context.Name</h4>
            <h5>@context.Team</h5>
        </div>
    </Template>
</TelerikListView>

@code{
    void AddEmployee()
    {
        var x = ListViewData.Count + 1;
        ListViewData.Add(new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3}"
        });
    }

    void RemoveEmployee()
    {
        if (ListViewData.Count > 0)
        {
            ListViewData.RemoveAt(ListViewData.Count - 1);
        }
    }
        
    ObservableCollection<SampleData> ListViewData { get; set; } = new ObservableCollection<SampleData>(Enumerable.Range(1, 5).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}",
        Team = $"Team {x % 3}"
    }));

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}

@* Styles would usually go to to the site stylesheet *@

<style>
    .listview-item {
        height: 150px;
        width: 150px;
        display: inline-block;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    }
</style>
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the ListView data.

````CSHTML
@* Add/remove employee or change the collection to see how the ListView reacts to that change. *@

<TelerikButton OnClick="@AddEmployee">Add employee</TelerikButton>

<TelerikButton OnClick="@RemoveEmployee">Remove employee</TelerikButton>

<TelerikButton OnClick="@ChangeData">Change employee data</TelerikButton>

<TelerikListView Data="@ListViewData" Width="700px" Pageable="true">
    <HeaderTemplate>
        <h2>Employee List</h2>
    </HeaderTemplate>
    <Template>
        <div class="listview-item">
            <h4>@context.Name</h4>
            <h5>@context.Team</h5>
        </div>
    </Template>
</TelerikListView>

@code{
    void AddEmployee()
    {
        var x = ListViewData.Count + 1;
        ListViewData.Add(new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3}"
        });
        ListViewData = new List<SampleData>(ListViewData);
    }

    void RemoveEmployee()
    {
        if (ListViewData.Count > 0)
        {
            ListViewData.RemoveAt(ListViewData.Count - 1);
            ListViewData = new List<SampleData>(ListViewData);
        }
    }

    void ChangeData()
    {
        var newData = Enumerable.Range(6, 5).Select(x => new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3}"
        }).ToList();
        ListViewData = new List<SampleData>(newData);
    }

    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 5).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}",
        Team = $"Team {x % 3}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}

@* Styles would usually go to to the site stylesheet *@

<style>
    .listview-item {
        height: 150px;
        width: 150px;
        display: inline-block;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    }
</style>
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)