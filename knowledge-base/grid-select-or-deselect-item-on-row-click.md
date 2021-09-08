---
title: Select or Deselect Grid Items on Row Click
description: How to Select or Unselect Grid Rows on Row Click?
type: how-to
page_title: Select or Deselect Grid Items on Row Click
slug: grid-kb-select-or-deselect-item-on-row-click
position: 
tags: telerik, blazor, grid, select, deselect, row, click
ticketid: 1534470
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

How can I select and deselect multiple rows by clicking on a row in a Grid with enabled selection?

## Solution

When Grid selection is enabled, the built-in option for deselecting a row or selecting multiple rows is `Ctrl` + Click (`Cmd` + Click on Macs) - see the [Grid Selection article]({%slug components/grid/selection/overview%}) for more details. To deselect a row or select multiple rows by row clicking and without holding the `Ctrl` key, use the following approach:

* Cancel the built-in selection. You can achieve that by handling the `SelectedItemsChanged` event and not executing any logic in it.

* Handle the Grid [OnRowClick]({%slug grid-events%}#onrowclick) event to programmatically modify the `SelectedItems` collection.

The snippet below demonstrates how to achieve the described approach.

````CSHTML
@* Programmatically select/deselect items on row click *@

<TelerikGrid Data="@MyData"
             Height="400px"
             Width="700px"
             Pageable="true"
             OnRowClick="@OnRowClickHandler"
             SelectionMode="@GridSelectionMode.Multiple"
             SelectedItems="@SelectedItems"
             SelectedItemsChanged="@((IEnumerable<SampleData> data) => SelectedItemsChanged(data))">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public IEnumerable<SampleData> SelectedItems { get; set; } = Enumerable.Empty<SampleData>();

    //Handle the SelectedItemsChanged event and do not execute any logic in it, so you can override the built-in selection.
    void SelectedItemsChanged(IEnumerable<SampleData> data)
    {
    }

    //Handle the OnRowClick event to programmatically update the SelectedItems collection. Check if an item exists in the collection (is selected). Add it to the collection to select it. Remove it from the collection to deselect it.
    async Task OnRowClickHandler(GridRowClickEventArgs args)
    {
        var currItem = args.Item as SampleData;

        if (SelectedItems.Any(x => x.Id == currItem.Id))
        {
            SelectedItems = SelectedItems.Where(x => x.Id != currItem.Id);
        }
        else
        {
            SelectedItems = SelectedItems.Concat(new[] { currItem });
        }

        SelectedItems = new List<SampleData>(SelectedItems);        

        args.ShouldRender = true;
    }

    //Grid model and dummy data generation
    public List<SampleData> MyData { get; set; } = new List<SampleData>();

    protected override void OnInitialized()
    {
        for (int x = 1; x < 30; x++)
        {
            MyData.Add(
                new SampleData()
                {
                    Id = x,
                    Name = "name " + x,
                    Team = "team " + x % 5,
                    HireDate = DateTime.Now.AddDays(-x).Date
                });
        };

        base.OnInitialized();
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````
