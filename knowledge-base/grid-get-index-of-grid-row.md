---
title: Get the Index Of a Grid Row
description: How to get the index of a Grid row.
type: how-to
page_title: Get the Index Of a Grid Row
slug: grid-kb-index-of-a-grid-row
position: 
tags: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

I have a Grid and I would like to know the new index of a row when sorting or filtering the Grid. 


## Solution

The Grid does not directly alter the collection of items passed to its `Data` parameter. When performing operations like Sorting or Filtering the collection will not be changed, thus the index of an item will remain unchanged. In order to get the sorted/filtered collection, use the [OnRead event](slug://components/grid/manual-operations) of the Grid.

* Use the `OnRead` event to cache the Grid data in its current sort state.
* Use the `SelectedItemsChanged` or `OnRowClick` event to find the item index.
* Optionally, use `OnRead` to update the item index.

>caption Get the index of a clicked/selected row immediately and after sorting

````RAZOR
@*Get the index of a clicked/selected row immediately and after sorting*@

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@MainModel"
             OnRead="@OnReadHandler"
             OnRowClick="@OnRowClick"
             SelectionMode="@GridSelectionMode.Single"
             SelectedItems="@SelectedItems"
             SelectedItemsChanged="@((IEnumerable<MainModel> items) => SelectedItemsChanged(items))"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="Id"></GridColumn>
        <GridColumn Field="Name"></GridColumn>
    </GridColumns>
</TelerikGrid>

@if (!String.IsNullOrEmpty(Result))
{
    <div>
        @Result
    </div>
}

@code {
    List<MainModel> SalesTeamMembers { get; set; }
    List<MainModel> CurrentSalesTeamMembers { get; set; } //implementation of OnRead
    IEnumerable<MainModel> SelectedItems { get; set; } = new List<MainModel>();
    MainModel ClickedItem { get; set; }
    public string Result { get; set; }

    void SelectedItemsChanged(IEnumerable<MainModel> items)
    {
        // same logic as in OnRowClick, use either event
        SelectedItems = items;
        ClickedItem = items.FirstOrDefault();
        PrintTheRowIndex(ClickedItem);
    }

    void OnRowClick(GridRowClickEventArgs args)
    {
        // same logic as in SelectedItemsChanged, use either event
        //ClickedItem = args.Item as MainModel;
        //PrintTheRowIndex(ClickedItem);
    }

    void PrintTheRowIndex(MainModel item)
    {
        int currentIndexOfItem = CurrentSalesTeamMembers.IndexOf(item);

        if (currentIndexOfItem > -1) // this check is not mandatory
        {
            Result = $"The index of the clicked row is: {currentIndexOfItem}";
        }
    }

    async Task OnReadHandler(GridReadEventArgs args)
    {
        var dataSourceResult = SalesTeamMembers.ToDataSourceResult(args.Request);

        args.Data = CurrentSalesTeamMembers = dataSourceResult.Data.Cast<MainModel>().ToList(); // this is the collection with the sorted items
        args.Total = dataSourceResult.Total;

        // update the row index if changed
        PrintTheRowIndex(ClickedItem);
    }

    protected override void OnInitialized()
    {
        SalesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i <= 5; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````
