---
title: Virtual Scrolling
page_title: Grid for Blazor | Virtual Scrolling
description: Enable and configure virtual scrolling in Grid for Blazor
slug: components/grid/virtual-scrolling
tags: telerik,blazor,grid,virtual,scrolling
published: True
position: 55
---

# Virtual Scrolling

Virtual scrolling is an alternative to paging. Instead of using a pager, the user scrolls vertically through all records in the data source. The same set of elements is reused to improve performance. While the new data is loading, a loading indicator is shown on the cells.

## Requirements

To enable virtual scrolling:

1. Set `ScrollMode="@GridScrollMode.Virtual"` - this enables the virtualization of items
2. Provide  `Height`, `RowHeight`, and `PageSize` to the grid - this lets the grid calculate the position of the user in order to fetch the correct set of items from the data source.

>caption Sample of virtual scrolling in the Telerik Grid for Blazor

````CSHTML
@* Scroll the grid instead of paging *@

<TelerikGrid Data=@GridData
             ScrollMode="@GridScrollMode.Virtual"
             Height="400px" RowHeight="40" PageSize="20"
             Sortable="true" FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="Id" />
        <GridColumn Field="Name" Title="First Name" />
        <GridColumn Field="LastName" Title="Last Name" />
        <GridColumn Field="HireData">
            <Template>
                @((context as SampleData).HireDate.ToString("MMMM dd, yyyy"))
            </Template>
        </GridColumn>
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
        return Enumerable.Range(1, 1000).Select(x => new SampleData
        {
            Id = x,
            Name = $"name {x}",
            LastName = $"Surname {x}",
            HireDate = DateTime.Now.Date.AddDays(-x)
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

>caption How virtual scrolling looks like (deliberately slowed down to showcase the loading signs)

![](images/virtual-scrolling-overview.gif)

## Notes

There are several things to keep in mind when using virtual scrolling:

* The `Height` of the grid must be in pixels. The `RowHeight` is a decimal value that is always considered as pixel values.
* Do not mix virtualization with paging, as they are alternatives to the same feature.
* You can control how many rows are rendered through the `PageSize`. If performance does not suit your needs, tweak mostly that property (for example, if latency is high - fetch larger chunks of data so that a remote service is called less often; or when the browser is responding slowly, decrease the page size to render fewer DOM elements).
* When using the [`OnRead` event]({%slug components/grid/manual-operations%}), use the `PageSize` and `Skip` parameters to know what data to return, instead of `PageSize` and `Page` as with regular paging.
* Horizontal scrolling is not virtualized, all columns are rendered.
* Provide for a page size of the Grid that is large enough, so that the table rows do not fit in the scrollable data area, otherwise the vertical virtual scrollbar will not be created and scrolling will not work. The page size of the Grid should be over three times larger than the number of visible table rows in the data area.

## Limitations

Virtualization is mainly a technique for improving client-side performance and the user experience. Its cost is that some features of the grid do not work with it. An alternative to that is to use [regular paging]({%slug components/grid/features/paging%}) with [mantual data source operations]({%slug components/grid/manual-operations%}) to implement the desired performance of the data retrieval.

List of the known limitations of the virtual scrolling feature:

* [Hierarchy]({%slug components/grid/features/hierarchy%}) is not supported.
* [Grouping]({%slug components/grid/features/grouping%}) is not supported.
* [Row Templates]({%slug components/grid/features/templates%}#row-template) are not supported.

## See Also

  * [Live Demo: Grid Sorting](https://demos.telerik.com/blazor-ui/grid/sorting)
   
