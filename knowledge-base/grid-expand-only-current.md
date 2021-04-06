---
title: Expand only current item of the Grid and programmatically collapse all others
description: How to expand only the current item of the Grid and programmatically close any other previously expanded.
type: how-to
page_title: Expand only current item of the Grid and programmatically collapse all others
slug: grid-kb-expand-only-current
position: 
tags: grid, expand, collapse, programmatically
ticketid: 1513997
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

I have a Grid with hierarchy enabled. When I expand one row, I want to programmatically collapse all other expanded rows.

## Solution

The OnRowExpand event provides arguments of type GridRowExpandEventArgs. You can check the Item field of the arguments to get information which item is currently expanded. 

You can then use the Grid State to programmatically set its ExpandedRows field. In order to achieve the desired behavior, the ExpandedRows of the Grid state should only has information for the current expanded item. This will result in collapsing all previously expanded items and keep just the current one expanded.

The ExpandedRows accepts a list of item indexes. In order to get the correct index of the current expanded item in case of filtering, sorting, paging of the Grid, use the OnRead event to work with the current data.

See code comments in the example below for more details on the spot.

````CSHTML
@using Telerik.DataSource.Extensions

Expanded item index: @currItemIndex

<TelerikGrid Data="@salesTeamMembers" OnRowExpand="@OnExpand" OnRead="@OnReadHandler" @ref="GridRef" >
    <DetailTemplate>
        @{
            var employee = context as MainModel;
            <TelerikGrid Data="employee.Orders" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="OrderId"></GridColumn>
                    <GridColumn Field="DealSize"></GridColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
    <GridColumns>
        <GridColumn Field="Id"></GridColumn>
        <GridColumn Field="Name"></GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<MainModel> GridRef { get; set; }

    List<MainModel> salesTeamMembers { get; set; }

    List<MainModel> currentSalesTeamMembers { get; set; } //implementation of OnRead

    MainModel currentItem { get; set; } //need to save the expanded item to determine its new index

    public int currItemIndex { get; set; } //the new index of the current expanded item

    public int Total { get; set; }

    //use the OnRead event to work with the current data in order to get the new index of the current expanded item in case of filtering, sorting, paging of the Grid
    void OnReadHandler(GridReadEventArgs args)
    {
        var dataSourceResult = salesTeamMembers.ToDataSourceResult(args.Request);

        currentSalesTeamMembers = dataSourceResult.Data.Cast<MainModel>().ToList(); // this is the collection with the sorted items

        Total = dataSourceResult.Total;
    }

    //in the OnRowExpand handler you can perform the desired logic to collapse the rest of the items and keep just the current one opened
    async Task OnExpand(GridRowExpandEventArgs args)
    {
        currentItem = args.Item as MainModel;

        //get the new index of the current expanded item from the current data 
        currItemIndex = currentSalesTeamMembers.IndexOf(currentItem);

        //use the Grid state and its ExpandedRows field to set the only expanded item to be the current one
        GridState<MainModel> desiredState = new GridState<MainModel>();

        desiredState.ExpandedRows = new List<int> { currItemIndex };

        await GridRef.SetState(desiredState);
    }

    //data generation and models
    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 0; i < 30; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x ^ i }).ToList();
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DetailsModel> Orders { get; set; }
    }

    public class DetailsModel
    {
        public int OrderId { get; set; }
        public double DealSize { get; set; }
    }
}
````

