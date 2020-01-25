---
title: Individual (conditional) cell back color
description: How to apply Individual (conditional) cell back color in the Telerik Blazor grid
type: how-to
page_title: Individual (conditional) cell back color
slug: grid-conditional-cell-background
position: 
tags: 
ticketid: 1443681
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
I'd like to be able to set the backcolor on a cell by cell basis. I think the way is to do this with a template, but I don't know how to get the `<td>` element to style.

## Solution
If you use a row template, you can do that with any markup and logic (css classes, inline rules) you like because you control the entire markup: [row templates documentation]({%slug components/grid/features/templates%}#row-template).

When using a cell template, however, you put content inside the `<td>` element the grid renders, so you cannot access it with CSS (at least until a pseudoselector like `:has()` gets implemented). The solution for a [cell template]({%slug components/grid/features/templates%}#column-template) is to remove the default padding of the cells and to apply the desired padding and backgrounds with your own CSS, something like this:

````CSHTML
<style>
    /* replace the default cell padding with custom element padding to remove traces of the original background */
    .k-grid-table td {
        padding: 0;
        /*height: 40px;*/ /*you may want to set height to the cells so the height:100% to the child div works better*/
    }

        .k-grid-table td .my-padding {
            height: 100%;
            padding: 5px; /* or copy the original ones from our rendering */
        }

        /* set custom background */
        .k-grid-table td .special {
            background: yellow;
        }
</style>

<TelerikGrid Data="@MyData" Height="500px">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.ID))" Title="Photo">
            <Template>
                @{
                    var employee = context as SampleData;
                    <div class="@( employee.ID % 3 == 0 ? "special my-padding" : "my-padding" )">@employee.ID</div>
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
        </GridColumn>
        <GridColumn Field="HireDate" Title="Hire Date - Default string">
        </GridColumn>
        <GridColumn Field="HireDate" Title="Hire Date - Custom string">
            <Template>
                @((context as SampleData).HireDate.ToString("dd MMM yyyy"))
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        ID = x,
        Name = "name " + x,
        HireDate = DateTime.Now.AddDays(-x)
    });
}
````

>caption Change the built-in row backgrounds with CSS only

````CSHTML
<style>
    .custom-row-colors .k-grid-table .k-master-row {
        background-color: red;
    }

        .custom-row-colors .k-grid-table .k-master-row:hover {
            background-color: pink;
        }

        .custom-row-colors .k-grid-table .k-master-row.k-alt {
            background-color: green;
        }

            .custom-row-colors .k-grid-table .k-master-row.k-alt:hover {
                background-color: cyan;
            }
</style>

<TelerikGrid Data="@MyData" Height="400px" Class="custom-row-colors"
             Pageable="true" Sortable="true" Groupable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

