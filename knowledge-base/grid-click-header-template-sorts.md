---
title: Prevent clicking in the Grid Header Template from triggering sorting
description: Clicking in the header template sorts the column - how to stop that
type: troubleshooting
page_title: Prevent clicking in the Grid Header Template from triggering sorting
slug: grid-kb-click-header-template-sorts
position: 
tags: grid, column, header, template
ticketid: 1498927
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

How to prevent sorting when clicking a specific component in a column header?

I have custom column's grid header template that contains CheckBox and column's title. The column is sortable. The checkbox calls a specific method, but clicking on it also triggers sorting.

I would like to put a `TelerikComboBox` into a `HeaderTemplate` of a Grid's column. But when I click into the ComboBox to type something (it's filterable), the header's sorting event hides it and the column will be sorted. How could I solve this?



## Possible Cause

The reason behind this behavior is called Event Bubbling, also known as one of the event Propagation phases.

Invoking an event from the child element (`TelerikCheckBox` in the example below) bubbles up to its parent element (in this case the column header) and also triggers any event called in the parent (sorting, filtering, etc.).

## Solution

The way to reduce the bubbling is to use the `stopPropagation` feature in the child element. That will result in the click event triggering only the desired event from child.

>caption How to stop the grid sort when clicking an element in the header template

````CSHTML
@* Stopping the Click event from propagating on the clickable elements in your template prevents the grid column from receiving the event and sorting *@

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true" 
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px"/>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false">
            <HeaderTemplate>
                <div class="row">
                    <div class="col d-flex align-items-center">
                        <div @onclick:stopPropagation="true"
                            
                            style="padding-right: 1rem; cursor: pointer" data-toggle="tooltip" data-placement="bottom" title="Show all elements">
                            <TelerikCheckBox Value="@isChecked" />
                        </div>
                        <span>Elements</span>
                    </div>
                </div>
            </HeaderTemplate>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    bool isChecked { get; set; }
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
