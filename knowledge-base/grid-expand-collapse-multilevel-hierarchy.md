---
title: Expand and Collapse All Rows in a Multi-Level Hierarchical Grid
description: Learn how to implement an "Expand/Collapse All" option for a multi-level Hierarchical Grid in Blazor applications.
type: how-to
page_title: How to Implement Expand/Collapse All for Multi-Level Hierarchical Grid in Blazor
slug: grid-kb-expand-collapse-multilevel-hierarchy
tags: blazor, grid, hierarchy, state
res_type: kb
ticketid: 1675753
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

In a multi-level Hierarchical Grid structure, it is common to require functionality that allows users to expand or collapse all parent, child, and grandchild rows with a single action. This article demonstrates how to implement an "Expand/Collapse All" button for a Blazor application that controls the expansion state of all rows in a three-level hierarchical grid structure: Parent Grid -> Child Grid -> Grand Child Grid.

## Solution

To control the expansion and collapse of all rows in a multi-level Hierarchical Grid, utilize the [Grid State](slug://grid-state).

1. Use the [`SetStateAsync` method](slug://grid-state#methods) for the parent Grid to control the expansion and collapse of its rows.
2. Use the [`OnStateInit` event](slug://grid-state#onstateinit) of the child Grids to expand their rows by default when the parent Grid rows expand.
3. If some child Grids are already visible and their `OnStateInit` event has been fired, use `SetStateAsync` through their [dynamic references](slug://common-kb-dynamic-refs) to control their expansion state.

````RAZOR
<TelerikGrid @ref="@GridRef"
             Data="@GridData">
    <GridToolBarTemplate>
        <GridCommandButton OnClick="@OnExpandAllClick">Expand All</GridCommandButton>
        <GridCommandButton OnClick="@OnCollapseAllClick">Collapse All</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)" />
    </GridColumns>
    <DetailTemplate Context="masterItem">
        <TelerikGrid Data="@ChildGridData.Where(x => x.ParentId == masterItem.Id)"
                     OnStateInit="@( (GridStateEventArgs<SampleModel> args) => OnChildGridStateInit(args, masterItem.Id))">
            <GridColumns>
                <GridColumn Field="@nameof(SampleModel.Name)" />
            </GridColumns>
            <DetailTemplate Context="childItem">
                <TelerikGrid Data="@GrandChildGridData.Where(x => x.ParentId == childItem.Id)">
                    <GridColumns>
                        <GridColumn Field="@nameof(SampleModel.Name)" />
                    </GridColumns>
                </TelerikGrid>
            </DetailTemplate>
        </TelerikGrid>
    </DetailTemplate>
</TelerikGrid>

@code {
    private TelerikGrid<SampleModel>? GridRef { get; set; }
    private List<SampleModel> GridData { get; set; } = new();
    private List<SampleModel> ChildGridData { get; set; } = new();
    private List<SampleModel> GrandChildGridData { get; set; } = new();

    private async Task OnCollapseAllClick()
    {
        var gridState = GridRef!.GetState();

        gridState.ExpandedItems = new List<SampleModel>();

        await GridRef.SetStateAsync(gridState);
    }

    private async Task OnExpandAllClick()
    {
        var gridState = GridRef!.GetState();

        gridState.ExpandedItems = new List<SampleModel>(GridData);

        await GridRef.SetStateAsync(gridState);
    }

    private void OnChildGridStateInit(GridStateEventArgs<SampleModel> args, int masterId)
    {
        args.GridState.ExpandedItems = ChildGridData.Where(x => x.ParentId == masterId).ToList();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 2; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"Name {i}"
            });

            for (int j = 1; j <= 2; j++)
            {
                ChildGridData.Add(new SampleModel()
                {
                    Id = 100 * i + j,
                    ParentId = i,
                    Name = $"Name {100 * i + j}"
                });

                for (int k = 1; k <= 2; k++)
                {
                    GrandChildGridData.Add(new SampleModel()
                    {
                        Id = 1000 * i + 100 * j + k,
                        ParentId = 100 * i + j,
                        Name = $"Name {1000 * i + 100 * j + k}"
                    });

                }
            }
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## See Also

* [Grid State Documentation](slug://grid-state)
* [Nesting Render Fragments in Blazor](slug://nest-renderfragment)
* [Dynamic References in Blazor](slug://common-kb-dynamic-refs)
