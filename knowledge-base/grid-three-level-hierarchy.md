---
title: Multi-level Hierarchy
description: Show multiple levels of hierarchical data in a grid
type: how-to
page_title: Multi-level Hierarchy
slug: grid-three-level-hierarchy
position: 
tags: 
ticketid: 1432878
res_type: kb
---

## Description

I'm trying to see more than 1 level of hierarchy in my grid but i don't know how i would to such a thing with the current infrastructure.

## Solution

Put nested `<TelerikGrid>` instances in the `DetailTemplate` of their parents. This allows you to have multiple levels of nested grids. The example below shows a three-level hierarchy.

>note It is important to use named `context` variables, otherwise such code will not compile. Read more [here]({%slug nest-renderfragment%}).

>caption Three Level Hierarchy in a Grid

````CSHTML
@* A screenshot with the result is available after the code snippet *@

<TelerikGrid Data="salesTeamMembers">
    <DetailTemplate Context="employeeItem">
        @{
            var employee = employeeItem as MainModel;
            <TelerikGrid Data="employee.Orders" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="OrderId"></GridColumn>
                    <GridColumn Field="DealSize"></GridColumn>
                </GridColumns>
                <DetailTemplate Context="orderInfo">
                    <TelerikGrid Data="orderInfo.ShippingHistory">
                        <GridColumns>
                            <GridColumn Field="HistoryItem"></GridColumn>
                        </GridColumns>
                    </TelerikGrid>
                </DetailTemplate>
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
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x ^ i }).ToList();
            foreach (DetailsModel item in mdl.Orders)
            {
                List<ThirdLevel> history = new List<ThirdLevel>();
                for (int j = 0; j < 5; j++)
                {
                    history.Add(new ThirdLevel { HistoryItem = $"step {j} for Order {item.OrderId}" });
                }
                item.ShippingHistory = history;
            }
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
        public List<ThirdLevel> ShippingHistory { get; set; }
    }

    public class ThirdLevel
    {
        public string HistoryItem { get; set; }
    }
}
````

![](three-level-hierarchy-grid.png)

