---
title: Only one Grid-Detail page expanded at once on row click
description: How to have only one expanded detail template and to expand it on row click
type: how-to
page_title: Expand only one detail template on row click
slug: grid-kb-one-expanded-detail-template
position: 
tags: 
ticketid: 1513997, 1520717
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

<!-- duplicate, merge with grid-kb-expand-only-current -->

## Description
I would like functionality where you close any detail page that is open if the customer open another one. So in any given situation, there will be only one detailpage open.

I also want to expand the detail template on row click, not (only) through the built-in expand button.

## Solution
You can use the [grid state](slug:grid-state) to make sure only one item is expanded. You can also use the [OnRead event](slug:components/grid/manual-operations) to have an ordered list of the current page items so you can get the row index easily for use with the state. You can also use the [grid events](slug:grid-events) (`OnRowClick` and `OnRowExpand`) to call the logic that will change the grid state.

````RAZOR
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@MainModel"
             OnRead="@OnReadHandler"
             OnRowClick="@OnRowClickHandler"
             OnRowExpand="@OnRowExpandHandler"
             @ref="@Grid"
             Pageable="true" PageSize="5" FilterMode="@GridFilterMode.FilterMenu" Sortable="true">
    <DetailTemplate>
        @{
            var employee = context as MainModel;
            <TelerikGrid Data="@employee.Orders" Pageable="true" PageSize="5">
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
    List<MainModel> AllSalesTeamMembers { get; set; }
    TelerikGrid<MainModel> Grid { get; set; }

    async Task EnsureOnlyCurrentRowExpanded(MainModel currItem)
    {
        // use the current grid state to keep filters, sorts, paging and so on
        var state = Grid.GetState();
        // set only the current row to be expanded
        state.ExpandedItems = new List<MainModel> { currItem };
        // Note: SetState() will call OnRead, so you may want to
        // consider raising flags and caching data if you want to reduce requests for remote data
        await Grid.SetStateAsync(state);
    }

    async Task OnRowClickHandler(GridRowClickEventArgs args)
    {
        args.ShouldRender = true;
        await EnsureOnlyCurrentRowExpanded(args.Item as MainModel);
    }

    async Task OnRowExpandHandler(GridRowExpandEventArgs args)
    {
        args.ShouldRender = true;
        await EnsureOnlyCurrentRowExpanded(args.Item as MainModel);
    }

    async Task OnReadHandler(GridReadEventArgs args)
    {
        var dataSourceResult = AllSalesTeamMembers.ToDataSourceResult(args.Request);
        args.Data = dataSourceResult.Data.Cast<MainModel>().ToList();
        args.Total = dataSourceResult.Total;
    }

    // only models and data generation follow

    protected override void OnInitialized()
    {
        AllSalesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i <= 15; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 3).Select(x => new DetailsModel { OrderId = x, DealSize = x ^ i }).ToList();
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
