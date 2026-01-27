---
title: Expand/Collapse Detail page on RowClick or DoubleRowClick
description: How to expand/collapse Detail page on RowClick or DoubleRowClick instead of clicking the expand/collapse button?
type: how-to
page_title: Expand/Collapse Detail page on RowClick or DoubleRowClick
slug: grid-kb-expand-collapse-detail-onclick-or-ondoubleclick
position: 
tags: grid, hierarchy, detail, expand, collapse, onclick, ondoubleclick
ticketid: 1548965
res_type: kb
components: ["grid"]
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

I want to expand and collapse the Grid Details on row click or double click instead of clicking the expand/collapse button.

## Solution

Handle the Grid events ([`OnRowClick`](slug:grid-events#onrowclick) or [`OnRowDoubleClick`](slug:grid-events#onrowdoubleclick)) to programmatically expand/collapse the `DetailTemplate` of a master item.

In the event handlers, get the [Grid State](slug:grid-state) and modify its `ExpandedItems` field. If the current item is not expanded, add it to the `ExpandedItems` collection. If it is already expanded - remove it from the collection. Set the modified Grid State afterwards. The examples below demonstrate how to achieve that.

>tip If you want to keep only one Detail page expanded, check the [Only one Grid-Detail page expanded at once on row click](slug:grid-kb-one-expanded-detail-template) knowledge base article.

>caption Expand/Collapse Detail page OnRowClick

````RAZOR
@*Handle the OnRowClick event to programmatically expand/collapse the DetailTemplate*@

<TelerikGrid Data="@salesTeamMembers" 
             OnRowClick="@OnRowClickHandler"
             @ref="@Grid">
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
    List<MainModel> salesTeamMembers { get; set; }
    TelerikGrid<MainModel> Grid { get; set; }

    async Task OnRowClickHandler(GridRowClickEventArgs args)
    {
        var currItem = args.Item as MainModel;

        var state = Grid.GetState();

        bool isCurrItemExpanded = state.ExpandedItems.Any(x => x.Id == currItem.Id);

        if (isCurrItemExpanded)
        {
            state.ExpandedItems.Remove(currItem);
        }else{
            state.ExpandedItems.Add(currItem);
        }

        await Grid.SetStateAsync(state);
    }

    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i <= 5; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x^i }).ToList();
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get;set; }
        public List<DetailsModel> Orders { get; set; }
    }

    public class DetailsModel
    {
        public int OrderId { get; set; }
        public double DealSize { get; set; }
    }
}
````


>caption Expand/Collapse Detail page OnRowDoubleClick

````RAZOR
@*Handle the OnRowDoubleClick event to programmatically expand/collapse the DetailTemplate*@

<TelerikGrid Data="@salesTeamMembers" 
             OnRowDoubleClick="@OnRowDoubleClickHandler"
             @ref="@Grid">
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
    List<MainModel> salesTeamMembers { get; set; }
    TelerikGrid<MainModel> Grid { get; set; }

    async Task OnRowDoubleClickHandler(GridRowClickEventArgs args)
    {
        var currItem = args.Item as MainModel;

        var state = Grid.GetState();

        bool isCurrItemExpanded = state.ExpandedItems.Any(x => x.Id == currItem.Id);

        if (isCurrItemExpanded)
        {
            state.ExpandedItems.Remove(currItem);
        }else{
            state.ExpandedItems.Add(currItem);
        }

        await Grid.SetStateAsync(state);
    }

    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i <= 5; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x^i }).ToList();
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get;set; }
        public List<DetailsModel> Orders { get; set; }
    }

    public class DetailsModel
    {
        public int OrderId { get; set; }
        public double DealSize { get; set; }
    }
}

````
