---
title: Add Grid Columns Programmatically
description: How to add Grid Columns programmatically.
type: how-to
page_title: Add Grid Columns Programmatically
slug: grid-kb-programatic-grid-columns
position: 
tags: 
ticketid: 1559943
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

I want to add a custom Grid column programmatically. I would also like to define attributes for the column such as `Field`, `Title`, and `DisplayFormat`.

## Solution

You can use the [`RenderFragment Delegate`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.renderfragment?view=aspnetcore-8.0) to create a `GridColumn` from the C# portion of the application. 


>caption Add a Grid column from code

````RAZOR
@* Use the RenderFragment to add a grid column. Click on the Add a column button to see the result *@

    <TelerikButton OnClick="@(() => CustomGridColumnFromCode = AddAGridColumn())">Add a column</TelerikButton>

    <TelerikGrid Data="@MyData" Height="400px"
                 Pageable="true" Sortable="true" Groupable="true"
                 FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
                 Resizable="true" Reorderable="true"
                 @ref="@GridRef">
        <GridColumns>
            <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
            <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
            <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
            <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />

            @CustomGridColumnFromCode
        </GridColumns>
    </TelerikGrid>


    @code {
        private TelerikGrid<SampleData> GridRef { get; set; }

        private RenderFragment CustomGridColumnFromCode { get; set; }

        private RenderFragment AddAGridColumn() => __builder =>
        {
            <GridColumn Field="CustomDateField" Title="From code behind" DisplayFormat="{0:dd MMM yy}" />
        };

        public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            CustomDateField = DateTime.Today.AddDays(x),
            HireDate = DateTime.Now.AddDays(-x).Date
        });

        public class SampleData
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Team { get; set; }
            public DateTime CustomDateField { get; set; }
            public DateTime HireDate { get; set; }
        }
    }
````

