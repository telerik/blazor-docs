---
title: Conditionally Hide Hierarchical Grid Expand Button
description: How to hide the expand button conditionally for detail template hierararchy
type: how-to
page_title: Remove Expand button for some rows conditionally
slug: grid-kb-conditional-expand-button
position: 
tags: 
ticketid: 1430980
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
How would you remove the icon to expand a detail grid only for certain rows?  Some rows will not have detail data and should not be expandable.

I would like the expand to only be visible when it has further data to expand. 

## Solution

Use the [`OnRowRender` event]({%slug grid-events%}#onrowrender) to evaluate the current row item (for example, whether it has child items in a collection or some other flag your application has). 

Then, if you want to hide the expand icon, set a CSS class to the row that will hide the button in the expand cell.

>caption Hide the expand button conditionally per row

````CSHTML
@* Use CSS and the RowRender event to hide the detail template expand button conditionally *@

<style>
    /* 
        A CSS rule that matches the OnRowRender handler to 
        conditionally hide hierarchy expand buttons.
        You may want to add this to your site-wide stylesheet.
    */
    .k-grid tr.no-children td.k-hierarchy-cell * {
        display: none;
    }
</style>

<TelerikGrid Data="@salesTeamMembers" OnRowRender="@OnRowRenderHandler">
    <DetailTemplate>
        @{
            var employee = context as MainModel;
            <TelerikGrid Data="@employee.Orders" Pageable="true" PageSize="5">
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
    // conditionally hide the hierarchy expand button
    void OnRowRenderHandler(GridRowRenderEventArgs args)
    {
        MainModel item = args.Item as MainModel;

        bool hasNoHierarchy = item.Orders == null || item.Orders.Count == 0;
        args.Class = hasNoHierarchy ? "" : "no-children";
    }

    // sample data generation follows
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
            data.Add(mdl);

            // we add hierarchy data only to some rows
            // we will hide the expand button for the rest
            if (i % 3 == 0)
            {
                mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x ^ i }).ToList();
            }
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

## Notes
If you have hierarchical data, especially data that goes many levels deep, you may want to consider the <a href="https://demos.telerik.com/blazor-ui/treelist/overview" target="_blank">TreeList component</a> instead of a grid. It can also load data on demand.

You may also want to load data on demand for the detail template instead of loading it all at once initially, you can see one easy way to do that in the following sample project: <a href="https://github.com/telerik/blazor-ui/tree/master/grid/load-on-demand-hierarchy" target="_blank">Load data on demand in a Hierarchy Grid</a>.
