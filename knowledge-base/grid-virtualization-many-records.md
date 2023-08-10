---
title: Virtual Scroll does not show all items
description: When you have many items in the grid, you may be unable to see all of them with virtual scrolling
type: troubleshooting
page_title: Virtual Scrolling Does Not Show All Items
slug: grid-kb-virtualization-many-records
position: 
tags: 
ticketid: 1502885
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
The virtual grid breaks when there are more than 3.000.000 records in TotalCount.

I cannot see all records in the grid with virtual scrolling when there are many records.

I cannot scroll to the end of the records when I have many records.

Other symptoms can include the grid content overflowing its parent and hiding content after the grid, or you could see a border from the grid near the end of the scrollable container.

In this article:

* [Steps to Reproduce](#steps-to-reproduce)
* [Possible Cause](#possible-cause)
* [Solution](#solution)

## Steps to Reproduce

>caption Sample reproducible - try dragging the scrollbar to the end - you won't see record number 1 000 000

````CSHTML
Total items: @GridData.Count

<TelerikGrid Data=@GridData
             ScrollMode="@GridScrollMode.Virtual"
             Height="480px" RowHeight="60" PageSize="20"
             Sortable="true" FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="Id" />
        <GridColumn Field="Name" Title="First Name" />
        <GridColumn Field="LastName" Title="Last Name" />
        <GridColumn Field="HireDate" Width="200px" DisplayFormat="{0:MMMM dd, yyyy}" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<SampleData> GridData { get; set; }

    protected override async Task OnInitializedAsync()
    {
        GridData = await GetData();
    }

    private async Task<List<SampleData>> GetData()
    {
        return Enumerable.Range(1, 1000000).Select(x => new SampleData
        {
            Id = x,
            Name = $"name {x}",
            LastName = $"Surname {x}",
            HireDate = DateTime.Now.Date.AddDays(-x % 1000)
        }).ToList();
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

The issue with the content overflow is the same - when the element size limit is reached, the browser does not render the element correctly and it overflows its parent.

>caption Overflowing content due to browser element size limit (see additional code below)\

![the content can overflow and hide adjacent elements when the element size limit is reached](images/virtualization-max-browser-height-overflow-issue.png)

>caption Add this code just after the grid closing tag to color the element borders like in the image above to see the issue

````CSHTML
</TelerikGrid>

something after the grid that I can't see because of the grid issue

<style>
    .k-grid {
        border: 2px solid red !important;
    }

    .k-grid-container {
        border: 1px solid blue !important;
    }
</style>
````


## Possible Cause
Browsers have a limitation on how large (tall or wide) an element can be. This limits how much data you can fit and how far the user can scroll.

The height of the actual grid data element is `total records count` x `row height`. For example, with 60px row height, 1 million records will be 60 000 000 pixels.

Browsers can usually go up to about 33 000 000 pixels.

Thus, the scrollbar can only get so small, and you can only scroll to a certain extent of the data.

>caption Screenshot explaining the browser limitation that does not allow the user to scroll far enough

![browser limitation of element height limits the number of records the grid can show with virtualization](images/virtualization-max-browser-height.png)



## Solution
The only possible solution if you have so many records is to use the standard [paging]({%slug components/grid/features/paging%}).
