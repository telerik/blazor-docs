---
title: Multiple Details Grids per Master
description: How to render multiple child (detail) Grids under a master Grid?
type: how-to
page_title: Show Multiple Detail Grids per Master
slug: grid-kb-multiple-child-grids-per-item
position: 
tags: grid, hierarchy, multiple, children
ticketid: 1550340
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

We have a hierarchical Grid where each master item has two child sub-Grids. We want to display both child Grids at the same time.

## Solution

[Grid hierarchy](slug:components/grid/features/hierarchy) requires a child Grid in a [`DetailTemplate`](slug:Telerik.Blazor.Components.TelerikGrid-1#Telerik_Blazor_Components_TelerikGrid_1_DetailTemplate). The `DetailTemplate` is essentially a `RenderFragment`, so it can include any content - be that one, two or more Grids, other components or html elements.

In order to render two child (detail) Grids at the same time, you just need to declare both of them inside the `DetailTemplate` tag. The example below demonstrates how to achieve this.

````RAZOR
@*Declare two child Grids in the DetailTemplate*@

<TelerikGrid Data="@Users">
    <DetailTemplate>
        @{
            var user = context as MainModel;
            
            <TelerikGrid Data="user.Orders" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="OrderId"></GridColumn>
                    <GridColumn Field="DealSize"></GridColumn>
                </GridColumns>
            </TelerikGrid>

            <hr />

            <TelerikGrid Data="user.Addresses" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="City"></GridColumn>
                    <GridColumn Field="Street"></GridColumn>
                    <GridColumn Field="Number"></GridColumn>
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
    List<MainModel> Users { get; set; }

    protected override void OnInitialized()
    {
        Users = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i < 10; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x ^ i }).ToList();
            mdl.Addresses = Enumerable.Range(1, 15).Select(x => new Address { City = "City " + x, Street = "Sreet " + x, Number = x }).ToList();
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DetailsModel> Orders { get; set; }
        public List<Address> Addresses { get; set; }
    }

    public class DetailsModel
    {
        public int OrderId { get; set; }
        public double DealSize { get; set; }
    }

     public class Address
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }        
    }
}
````
