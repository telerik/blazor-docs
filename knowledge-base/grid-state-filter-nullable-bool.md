---
title: Programatically Filter Nullable Bool Grid Column by Null Value
description: Learn how to programmatically filter nullable bool values in the Grid component for Blazor.
type: how-to
page_title: How to filter a Grid column bound to a nullable bool by the null values programatically
slug: grid-kb-state-filter-nullable-bool
tags: grid, blazor, column, datagrid, filter, state, nullable, bool
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

I want to programatically filter a Grid column that is bound to `bool?` by the `null` values. 


This KB article also answers the following questions:
- How to filter a Grid column bound to a `bool?` by the null values programmatically?

## Solution

To filter a Grid column bound to a `bool?` by the null values programmatically:

````CSHTML
@using Telerik.DataSource

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary" OnClick="@SetGridFilter">Filter By Null</TelerikButton>

<TelerikGrid Data="@MyData"
             Height="400px"
             @ref="@GridRef"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.IsOnLeave))" Title="On Leave" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleData>? GridRef { get; set; }

    private IEnumerable<SampleData> MyData { get; set; }

    private async Task SetGridFilter()
    {
        GridState<SampleData> currentState = GridRef.GetState();

        currentState.FilterDescriptors = new List<IFilterDescriptor>()
            {
                new CompositeFilterDescriptor()
                {
                    FilterDescriptors = new FilterDescriptorCollection()
                    {
                        // Use the IsNull filter operator when filtering by null values.
                        new FilterDescriptor() { Member = "IsOnLeave", Operator = FilterOperator.IsNull, Value = null, MemberType = typeof(bool?) },
                    }
                }
            };

        await GridRef.SetStateAsync(currentState);
    }

    protected override void OnInitialized()
    {
        Random random = Random.Shared;

        MyData = Enumerable.Range(1, 30).Select(x => new SampleData
            {
                Id = x,
                Name = "name " + x,
                Team = "team " + x % 5,
                IsOnLeave = GetRandomNullableBool(x, random),
                HireDate = DateTime.Now.AddDays(-x).Date
            });
    }

    private bool? GetRandomNullableBool(int index, Random random)
    {
        if (index % 5 == 0)
        {
            return null;
        }
        return random.Next(2) == 0 ? (bool?)false : (bool?)true;
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool? IsOnLeave { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See Also