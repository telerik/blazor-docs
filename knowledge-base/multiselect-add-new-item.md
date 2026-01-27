---
title: Add New Item to MultiSelect
description: How to add new item to MultiSelect.
type: how-to
page_title: Add New Item to MultiSelect
slug: multiselect-kb-add-new-item
position: 
tags: multiselect
ticketid: 1470173, 1496248, 1501053, 1534242, 1554788
res_type: kb
components: ["multiselect"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>MultiSelect for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to allow the user to add new items to the Multiselect, and select them automatically?


## Solution

The example below shows how to add new items from **outside** the MultiSelect. It follows this algorithm:

1. Add the new item to the `Data` and/or the remote data source.
1. Select the new item by adding it to the `Value` collection. Let's assume the `Value` collection is `List<int> SelectedItems`
1. `Rebind()` the MultiSelect.
1. (`Data` scenarios only) Refresh the `SelectedItems` instance, so that the component can detect the update.
1. (`OnRead` scenarios only) Raise a boolean flag in the `OnRead` handler.
1. (`OnRead` scenarios only) Check the boolean flag in `OnAfterRenderAsync` and refresh the `SelectedItems` instance

There is also a related example in GitHub. It shows how to [add new items from **inside** the MultiSelect dropdown](https://github.com/telerik/blazor-ui/tree/master/multiselect/add-new-item).

>caption Add and select new MultiSelect items

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<h1>Add and select new MultiSelect items on the fly</h1>

<p>
    <TelerikTextBox @bind-Value="@NewText" Width="200px" PlaceHolder="type new item" />
    <TelerikButton OnClick="@AddItem">Add and Select Item</TelerikButton>
</p>

<h2>Bind MultiSelect with Data parameter</h2>

<TelerikMultiSelect @ref="@MultiSelect1"
                    Data="@MultiSelectData"
                    @bind-Value="@SelectedItems"
                    TextField="@nameof(SampleModel.Text)"
                    ValueField="@nameof(SampleModel.ID)"
                    Width="300px" />

<h2>Bind MultiSelect with OnRead event</h2>

<TelerikMultiSelect @ref="@MultiSelect2"
                    TItem="@SampleModel"
                    TValue="@int"
                    OnRead="@OnReadHandler2"
                    @bind-Value="@SelectedItems"
                    TextField="@nameof(SampleModel.Text)"
                    ValueField="@nameof(SampleModel.ID)"
                    Width="300px" />

@code{
    TelerikMultiSelect<SampleModel, int> MultiSelect1 { get; set; }
    TelerikMultiSelect<SampleModel, int> MultiSelect2 { get; set; }

    List<int> SelectedItems { get; set; } = new List<int>() { 1 };

    bool ShouldRaiseFlag2 { get; set; } = true;
    bool ShouldRefreshSelectedItems2 { get; set; }

    string NewText { get; set; }

    async Task AddItem()
    {
        // simulate network delay
        await Task.Delay(100);

        // create new item instance
        int newId = MultiSelectData.Count + 1;
        SampleModel newItem = new SampleModel() { ID = newId, Text = $"{NewText} {newId}" };

        // add new item to data
        MultiSelectData.Add(newItem);

        // add new item to selection
        SelectedItems.Add(newId);

        // rebind MultiSelects
        MultiSelect1.Rebind();
        MultiSelect2.Rebind();

        // refresh selection instance for MultiSelect 1
        SelectedItems = new List<int>(SelectedItems);

        // flag for refresh selection instance for MultiSelect 2
        ShouldRaiseFlag2 = true;
    }

    async Task OnReadHandler2(MultiSelectReadEventArgs args)
    {
        // simulate network delay
        await Task.Delay(100);

        DataSourceResult result = MultiSelectData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;

        if (ShouldRaiseFlag2)
        {
            ShouldRaiseFlag2 = false;
            // flag for refresh selection instance for MultiSelect 2
            ShouldRefreshSelectedItems2 = true;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        // (OnRead binding only)
        // refresh selection instance for MultiSelect 2
        // works also for selecting initial items
        if (ShouldRefreshSelectedItems2)
        {
            ShouldRefreshSelectedItems2 = false;
            SelectedItems = new List<int>(SelectedItems);
            StateHasChanged();
        }
        await base.OnAfterRenderAsync(firstRender);
    }

    List<SampleModel> MultiSelectData { get; set; } = new List<SampleModel> {
            new SampleModel { ID = 1, Text = "foo" },
            new SampleModel { ID = 2, Text = "bar" },
            new SampleModel { ID = 3, Text = "baz" }
        };

    public class SampleModel
    {
        public int ID { get; set; }
        public string Text { get; set; }
    }
}
````
