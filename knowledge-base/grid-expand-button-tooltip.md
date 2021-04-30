---
title: Grid Expand Button Tooltip
description: How to add tooltip to the detail template expand button for hierarchy
type: how-to
page_title: Expand Button Tooltip
slug: grid-kb-expand-button-tooltip
position: 
tags: 
ticketid: 1517730
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
Is there a tooltip option to add for the expend plus button on the left of a telerik grid row?

I want to add a tooltip to the hierarchy expand button for the detail template as an extra visual queue for my users.

## Solution
You can use JS Interop to add title attributes on the grid elements.

You can call this JS function after the grid re-renders with new data by using its [OnRead event]({%slug components/grid/manual-operations%}).

The example below shows one way to do that, and to distinguish a particular grid, and to pass the title attribute value from the C# code so you can, for example, localize it.

````CSHTML
@using Telerik.DataSource.Extensions
@inject IJSRuntime _js

<script suppress-error="BL9992">
    // move this script to a proper place in your project. 
    // the suppress-error hack is here to make it easy to copy-paste so you can run and test it
    function setGridExpandButtonTitles(gridSelector, tooltipText) {
        setTimeout(function () { // small timeout to have this run after the blazor render
            if (gridSelector) {
                // this selector targets all icons, you can extend it to distinguish between plus and minus icons if you want
                let expandButtons = document.querySelectorAll(gridSelector + " .k-hierarchy-cell > span.k-icon");
                expandButtons.forEach(elem => elem.setAttribute("title", tooltipText))
            }
        }, 50);
    }
</script>

<TelerikGrid Data="@CurrentGridData" Class="titles-on-expand-buttons"
                TotalCount="@Total" OnRead="@ReadItems"
                Sortable="true" Pageable="true" FilterMode="@GridFilterMode.FilterMenu">
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
    List<MainModel> CurrentGridData { get; set; }
    List<MainModel> AllData { get; set; }
    int Total { get; set; } = 0;

    protected async Task ReadItems(GridReadEventArgs args)
    {
        // typical data retrieval through OnRead
        var datasourceResult = AllData.ToDataSourceResult(args.Request);

        CurrentGridData = (datasourceResult.Data as IEnumerable<MainModel>).ToList();
        Total = datasourceResult.Total;

        StateHasChanged();
        // end data operations
        
        // ensure the hierarchy expand icons have the desired tooltip after the grid re-renderes with new data
        await _js.InvokeVoidAsync("setGridExpandButtonTitles", ".titles-on-expand-buttons", "Expand Details");
    }

    // only data generation follows

    protected override void OnInitialized()
    {
        AllData = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 0; i < 35; i++)
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
