---
title: Manual Data Source Operations
page_title: ListView for Blazor | Manual Data Source Operations
description: How to implement your own read, page, filter, sort operations for the listview data
slug: listview-manual-operations
tags: telerik,blazor,listview,manual,operadtions,onread
published: True
position: 3
---

# Manual Data Source Operations

The ListView lets you fetch the current page of data on demand through the `OnRead` event. This can let you optimize database queries and return only a small number of records.

In this article you will find examples how to:
* implement [custom paging](#custom-paging)
* implement [filtering and sorting](#filter-and-sort)

## Custom Paging

This is, effectively, loading data on demand only when the user goes to a certain page, as opposed to the default case where you fetch all the data items initially.

To implement your own paging in the listview, you need to:
* Handle the `OnRead` event and set the current page of data to the listview's `Data` parameter
* Set the `TotalCount` parameter of the listview to the total number of items from the data source, so it can show the proper pager.

>caption Custom Paging in the ListView

````CSHTML
@* This example simulates fetching the page data from a service *@

<TelerikListView Data="@ListViewCurrPageData" OnRead="@OnReadHandler" TotalCount="@TotalItems" Pageable="true" PageSize="@PageSize">
    <Template>
        <h6>@context.Name</h6>
    </Template>
</TelerikListView>

@code{
    int TotalItems { get; set; }
    List<SampleData> ListViewCurrPageData { get; set; }
    int PageSize { get; set; } = 15;
    async Task OnReadHandler(ListViewReadEventArgs e)
    {
        ListViewCurrPageData = await GetListViewPageData(e.Request.Page, e.Request.PageSize);
        TotalItems = await GetTotalItemsCount();
        StateHasChanged();
    }

    protected override async Task OnInitializedAsync()
    {
        ListViewCurrPageData = await GetListViewPageData(1, PageSize);
        TotalItems = await GetTotalItemsCount();
    }

    async Task<List<SampleData>> GetListViewPageData(int pageIndex, int pageSize)
    {
        // this is just a simulation of a service call, implement as appropriate in your app

        await Task.Delay(500); // simulate real network/database delay. Remove in a real app

        return _allData.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
    }

    async Task<int> GetTotalItemsCount()
    {
        return _allData.Count;
    }

    private List<SampleData> _allData { get; set; } = Enumerable.Range(1, 500).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();


    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````


## Filter and Sort

While the listview does not have built-in UI for filtering and sorting like a grid does, you can add your own components to invoke such actions and simply update the data source of the component.

The example below shows a relatively simple way to filter and sort over all data in the current view model without loading data on demand.

>caption Filter and Sort data in a listview

````CSHTML
@* This is one sample implementation, you should optimize the queries according to your project and needs *@

<TelerikListView Data="@ListViewData" Pageable="true">
    <HeaderTemplate>
        Sort Name: <TelerikDropDownList Data="@( new List<string>() { "None", "Ascending", "Descending" } )"
                                        Value="@sort" ValueChanged="@( (string dir) => SortName(dir) )" />
        <br />
        Filter: <TelerikTextBox Value="@filter" ValueChanged="@( (string val) => FilterData(val) )" />
    </HeaderTemplate>
    <Template>
        <h6>@context.Name</h6>
    </Template>
</TelerikListView>

@code{
    int TotalItems { get; set; }
    List<SampleData> ListViewData { get; set; }

    string sort { get; set; }
    string filter { get; set; }

    private List<SampleData> _allData { get; set; } = Enumerable.Range(1, 500).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    protected override void OnInitialized()
    {
        ListViewData = new List<SampleData>(_allData);
    }

    void FilterData(string filterVal)
    {
        filter = filterVal;
        string lowercaseFilter = filterVal.ToLowerInvariant();
        // you can optimize and implement this query as desired
        ListViewData = _allData.Where(itm => itm.Name.ToLowerInvariant().Contains(lowercaseFilter) || itm.Id.ToString() == lowercaseFilter).ToList();
    }

    void SortName(string dir)
    {
        sort = dir;
        // you can optimize and implement this query as desired
        switch (dir)
        {
            case "Ascending":
                ListViewData = ListViewData.OrderBy(o => o.Name).ToList();
                break;
            case "Descending":
                ListViewData = ListViewData.OrderByDescending(o => o.Name).ToList();
                break;
            default:
                ListViewData = ListViewData.OrderBy(o => o.Id).ToList();
                break;
        }
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>tip To optimize queries, you can store the `DataSourceRequest` from the `OnRead` event in a view-model field to easily access the current page.
>
> You can also use the Telerik extension methods - the `.ToDataSourceResult()` that takes a `DataSourceRequest` argument over the full collection of data and add filer and sort descriptors to it. Examples of doing that are available in the Live Demos: [ListView Filtering](https://demos.telerik.com/blazor-ui/listview/filtering) and [ListView Sorting](https://demos.telerik.com/blazor-ui/listview/sorting)

## See Also

  * [Live Demo: ListView Filtering](https://demos.telerik.com/blazor-ui/listview/filtering)
  * [Live Demo: ListView Sorting](https://demos.telerik.com/blazor-ui/listview/sorting)
   
  