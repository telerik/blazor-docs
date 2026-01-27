---
title: How to Remove the Grid Header Row
description: How to hide the header row of the Grid and TreeList with CSS.
type: how-to
page_title: How to Hide the Grid Header Row
slug: grid-hide-header-row
position: 
tags: grid, treelist, hide, header, row
ticketid: 1467583
res_type: kb
components: ["grid"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor, TreeList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How do I hide the Grid header row?

## Solution

To hide the header row in a Grid or TreeList, set the CSS property value of the header element `k-grid-header` `display` to `none`. 

>To avoid affecting all Grid/TreeList components, apply a specific class to the targeted Grid or TreeList and use the class in the selector.

>caption Hide the Grid/TreeList header row

````RAZOR
@* Hide the header row of the Grid *@

<style>
    .no-headers-grid .k-grid-header {
        display: none;
    }
</style>

<TelerikGrid Class="no-headers-grid"
             Data="@Employees">
    <GridColumns>
        <GridColumn Field="Id"></GridColumn>
        <GridColumn Field="Name"></GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<Employee> Employees { get; set; }

    protected override void OnInitialized()
    {
        Employees = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        List<Employee> data = new List<Employee>();
        for (int i = 0; i < 5; i++)
        {
            data.Add(new Employee { Id = i, Name = $"Name {i}" });
        }
        return data;
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````