---
title: Prevent click in Grid Header template component to trigger sorting
description: how to stop click propagation in Grid Header template
type: troubleshooting
page_title: Prevent click in Grid Header template component to trigger sorting
slug: grid-kb-click-header-template-sorts
position: 
tags: grid, column, header, template
ticketid: 1498927
res_type: kb
---

# Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid Header Template</td>
		</tr>
	</tbody>
</table>


## Description

 I have custom column's grid header template that contains CheckBox and column's title. The column is sortable.

The checkbox calls a specific method, but clicking on it also triggers sorting.
How to prevent sorting when clicking a specific component in a column header?


## Cause\Possible Cause(s)

The reason behind this behavior is called Event Bubbling, also known as one of the event Propagation phases.

Invoking an event from the child element (`TelerikCheckBox` in the example below) bubbles up to its parent element (in this case the column header) and also triggers any event called in the parent (sorting, filtering etc.).

## Solution

The way to reduce the bubbling is to use the `stopPropagation` feature in the child element. That will result in triggering only the desired event from child.

### Example

````CSHTML
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
                        <div style="padding-right: 1rem; cursor: pointer" data-toggle="tooltip" data-placement="bottom" title="Show all elements" @onclick:stopPropagation="true">
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