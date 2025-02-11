---
title: Filter Nullable Bool Grid Column by Null Value
description: Learn how to filter Grid column bound to nullable boolean values programmatically. Discrover one of the many features of the Grid State.
type: how-to
page_title: How to Programatically Filter Nullable Bool Grid Column by Null Value
slug: grid-kb-filter-nullable-bool
tags: telerik, blazor, grid, filter, state
res_type: kb
ticketid: 1658561
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article explains how to programmatically filter a Grid column bound to a `bool?` by the `null` values.

## Solution

To filter a Grid column bound to a `bool?` by the `null` values:

1. Get the current [Grid state](slug:grid-state).
1. Create a `CompositeFilterDescriptor` for the desired column. Add a child [`FilterDescriptor`](slug:components/grid/filtering) with an `Operator` property that is equal to `FilterOperator.IsNull`.
1. Add the new `CompositeFilterDescriptor` to the `FilterDescriptors` property of the Grid state.
1. Use the Grid `SetStateAsync` method to update the Grid state.

Alternative options are to:

* Customize the Grid filter state in the [Grid `OnStateInit` event](slug:grid-state#onstateinit).
* [Use a Grid filter template to enable filtering by `null` from the Grid's UI](slug:grid-kb-filterrow-bool-customization).

>caption Fitler bool? Grid column by null

````RAZOR
@using Telerik.DataSource

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               OnClick="@SetGridFilter">Filter On Leave By Null</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Height="400px">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" />
        <GridColumn Field="@(nameof(SampleData.IsOnLeave))" Title="On Leave" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleData>? GridRef { get; set; }

    private List<SampleData> GridData { get; set; } = new();

    private async Task SetGridFilter()
    {
        GridState<SampleData> currentState = GridRef!.GetState();

        currentState.FilterDescriptors = new List<IFilterDescriptor>()
        {
            new CompositeFilterDescriptor()
            {
                FilterDescriptors = new FilterDescriptorCollection() {
                    // Use the IsNull filter operator when filtering by null values.
                    new FilterDescriptor()
                    {
                        Member = nameof(SampleData.IsOnLeave),
                        MemberType = typeof(bool?),
                        Operator = FilterOperator.IsNull
                    }
                }
            }
        };

        await GridRef.SetStateAsync(currentState);
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 4 + 1}",
            IsOnLeave = GetRandomNullableBool(x)
        }).ToList();
    }

    private bool? GetRandomNullableBool(int index)
    {
        if (index % 5 == 0)
        {
            return null;
        }

        return Random.Shared.Next(2) == 0 ? false : true;
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public bool? IsOnLeave { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See Also

* [FilterMenu: Filter From Code](slug:grid-filter-menu#filter-from-code)
* [Working with the Grid State](slug:grid-state)