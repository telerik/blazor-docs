---
title: Expand only current item of the Grid and programmatically collapse all others
description: How to expand only the current item of the Grid and programmatically close any other previously expanded.
type: how-to
page_title: Expand only current item of the Grid and programmatically collapse all others
slug: grid-kb-expand-only-current
position: 
tags: grid, expand, collapse, programmatically
ticketid: 1513997, 1520717
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

<!-- duplicate, merge with grid-kb-one-expanded-detail-template -->

## Description

I have a Grid with hierarchy enabled. When I expand one row, I want to programmatically collapse all other expanded rows.

## Solution

1. Handle the [Grid `OnRowExpand` event](slug:grid-events#onrowexpand). It provides argument of type `GridRowExpandEventArgs` with a `Item` field that refers to the currently expanded Grid item.
1. Set the `ShouldRender` property of the `GridRowExpandEventArgs` argument to `true`.
1. Use the [Grid State](slug:grid-state) to programmatically set its `ExpandedItems` property. Set `ExpandedItems` to a `List<T>` that should only contain the currently expanded item. This will result in collapsing all previously expanded items.

````RAZOR
<TelerikGrid @ref="@GridRef"
             Data="@SalesTeamMembers"
             OnRowExpand="@OnExpand">
    <DetailTemplate>
        @{
            var employee = context as MainModel;
            <TelerikGrid Data="employee.Orders">
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
    List<MainModel> SalesTeamMembers { get; set; }

    async Task OnExpand(GridRowExpandEventArgs args)
    {
        args.ShouldRender = true;

        GridState<MainModel> desiredState = GridRef.GetState();

        desiredState.ExpandedItems = new List<MainModel> { args.Item as MainModel };

        await GridRef.SetStateAsync(desiredState);
    }

    //data generation and models
    protected override void OnInitialized()
    {
        SalesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i <= 30; i++)
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
