---
title: Change the expand/collapse icons in a Hierarchical Grid
description: How to change the expand/collapse icons in a Hierarchical Grid?
type: how-to
page_title: Change the expand/collapse icons in a Hierarchical Grid
slug: grid-kb-change-expand-collapse-icons
position: 
tags: telerik,blazor,grid,icon,expand,collapse,change,hierarchical
ticketid: 1515980
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
How to change the expand/collapse icons in a Hierarchical Grid?
I want to change the built-in plus/minus icons in a Hierarchical Grid. 

## Solution
You can change the expand/collapse [icons]({%slug general-information/font-icons%}) in the Hierarchical Grid by overriding the built-in plus/minus icons with other icons using custom CSS rules. In addition, you can use the Class parameter of the Grid to add custom CSS Class and modify a specific instance of the Grid, instead of all instances on the page. The code block below demonstrates how to achieve the described approach.

````CSHTML
@*Change the icons in the Hierarchical Grid*@

<style>
    .custom-icons .k-hierarchy-cell .k-icon.k-plus::before {
        content: "\e005";
    }

    .custom-icons .k-hierarchy-cell .k-icon.k-minus::before {
        content: "\e006";
    }
</style>

<TelerikGrid Class="custom-icons" Data="salesTeamMembers" @ref="Grid">
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
    public TelerikGrid<MainModel> Grid { get; set; }

    async Task ExpandHierarchy()
    {
        GridState<MainModel> desiredState = new GridState<MainModel>()
        {
            ExpandedRows = new List<int> { 0, 1 }//expand the first two rows
        };

        await Grid.SetState(desiredState);
    }

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

>caption Change the built-in expand/collapse icons. The result of the code snippet above.

![Hierarchical Grid with changed expand/collapse icons](images/grid-change-expand-collapse-icons-example.png)

## Notes
To get the desired icons, you can use your dev tools to inspect the rendered icon you want and get its content. Also, you can use any custom icons that are not from the Telerik font (e.g., icons from Bootstrap, Open Iconic, and so on) by specifying the desired font name in addition to the content. 