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

I am having a Grid and I would like to know the new index of a row when sorting or filtering the Grid. 


## Solution

The Grid does not directly alter the collection of items passed to its `Data` parameter so when performing operations like Sorting or Filtering the collection will not be changed, thus the index of the item will remain unchanged. In order to get the sorted/filtered collection you should use the [OnRead]({%slug components/grid/manual-operations%}) event for the Grid.

* [Get the New Index Of a Selected Row](#get-the-new-index-of-a-selected-row)
* [Get the New Index Of a Clicked Row](#get-the-new-index-of-an-clicked-row)

### Get the New Index Of a Selected Row

````CSHTML
@*Get the new index of the selected Grid row when sorting the Grid*@

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@currentSalesTeamMembers"
             SelectionMode="@GridSelectionMode.Single"
             SelectedItems="@selectedItems"
             SelectedItemsChanged="@((IEnumerable<MainModel> items) => SelectedItemsChanged(items))"
             OnRead="@OnReadHandler"
             TotalCount="@Total"
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
    public int Total { get; set; }
    List<MainModel> salesTeamMembers { get; set; }
    IEnumerable<MainModel> selectedItems { get; set; } = new List<MainModel>();
    List<MainModel> currentSalesTeamMembers { get; set; } //implementation of OnRead
    MainModel currentItem { get; set; } //need to save the selected item to determine its new index
    public string Result { get; set; }

    void SelectedItemsChanged(IEnumerable<MainModel> items)
    {
        selectedItems = items;

        var selectedItem = items.FirstOrDefault();

        currentItem = selectedItem;
    }

    async Task OnReadHandler(GridReadEventArgs args)
    {
        var dataSourceResult = salesTeamMembers.ToDataSourceResult(args.Request);

        currentSalesTeamMembers = dataSourceResult.Data.Cast<MainModel>().ToList(); // this is the collection with the sorted items

        int currentIndexOfItem = currentSalesTeamMembers.IndexOf(currentItem);

        if(currentIndexOfItem > -1) // this check is not mandatory
        {
            Result = $"The index of the selected item is: {currentIndexOfItem}";
        }

        Total = dataSourceResult.Total;

        StateHasChanged();
    }

    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 0; i < 5; i++)
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

### Get the New Index Of a Clicked Row

````CSHTML
@*Get the new index of a clicked row*@

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@currentSalesTeamMembers"
             OnRowClick="@OnRowClickHandler"
             OnRead="@OnReadHandler"
             TotalCount="@Total"
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
    public int Total { get; set; }
    List<MainModel> salesTeamMembers { get; set; }
    List<MainModel> currentSalesTeamMembers { get; set; } //implementation of OnRead
    MainModel currentItem { get; set; } //need to save the selected item to determine its new index
    public string Result { get; set; }

    void OnRowClickHandler(GridRowClickEventArgs args)
    {
        var clickedRow = args.Item as MainModel;

        currentItem = clickedRow;

        PrintTheRowIndex(clickedRow);
    }

    void PrintTheRowIndex(MainModel item)
    {
        int currentIndexOfItem = currentSalesTeamMembers.IndexOf(item);

        if (currentIndexOfItem > -1) // this check is not mandatory
        {
            Result = $"The index of the clicked row is: {currentIndexOfItem}";
        }
    }

    async Task OnReadHandler(GridReadEventArgs args)
    {
        var dataSourceResult = salesTeamMembers.ToDataSourceResult(args.Request);

        currentSalesTeamMembers = dataSourceResult.Data.Cast<MainModel>().ToList(); // this is the collection with the sorted items

        Total = dataSourceResult.Total;

        PrintTheRowIndex(currentItem);

        StateHasChanged();
    }

    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 0; i < 5; i++)
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

