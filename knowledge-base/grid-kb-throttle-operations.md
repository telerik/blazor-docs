---
title: Debounce/Throttle grid data source operations
description: how to debounce or throttle grid data source operations
type: how-to
page_title: Debounce/Throttle grid data source operations
slug: grid-kb-throttle-operations
position: 
tags: 
ticketid: 1451805
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
I want to specify a debounce time for filtering. This way I can (for example) set the debounce time to 500(ms), and then only have the grid filter when the user stops typing.

This can be useful for filtering with remote data when using the FilterRow mode - it invokes a filter on every keystroke.

## Solution
There are three ideas on the basic approach how to do this:

* Use the [FilterMenu](https://demos.telerik.com/blazor-ui/grid/filter-menu) filtering mode because it fires filtering requests only when the user presses a button.

    * If you want to keep the UI simple (e.g., to simplify the service logic that you want to implement), the following article shows how to hide he extra filters in the filter menu: [Only one filter option in FilterMenu]({%slug grid-kb-only-one-filtermenu-option%})

    * if you already have an OData service that handles filtering, you can use that with the filter menu: [Get Telerik Grid Data from an OData v4 Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)

* Implement the desired throttling/debouncing in the [OnRead event](https://docs.telerik.com/blazor-ui/components/grid/manual-operations). Below is an example of this.

* Implement your own filtering (a second example is available below).


>caption Throttle grid data source requests

````CSHTML
@* This example throttles all events. You may want to add logic that checks how the data source request changed
for example, whether the filters changed or something else, so you can throttle only filtering, for example *@

@implements IDisposable

@using System.Threading
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data=@GridData TotalCount=@Total
             Pageable=true PageSize=15
             OnRead=@ReadItems FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Id) Title="ID" />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }
    public int Total { get; set; } = 0;

    DataSourceRequest lastRequest { get; set; }
    Timer ThrottleTimer { get; set; }

    void InitializeTimer()
    {
        int throttleTime = 500;

        ThrottleTimer = new System.Threading.Timer(async (obj) =>
            {
                await InvokeAsync(RequestData);
                ThrottleTimer.Dispose();
            },
            null, throttleTime, System.Threading.Timeout.Infinite);
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        lastRequest = args.Request;
        ThrottleTimer?.Dispose();
        InitializeTimer();
    }

    async Task RequestData()
    {
        DataEnvelope DataResult = await FetchPagedData(lastRequest);

        GridData = DataResult.CurrentPageData;
        Total = DataResult.TotalItemCount;

        StateHasChanged();
    }

    public void Dispose()
    {
        try
        {
            ThrottleTimer.Dispose();
        }
        catch { }
    }

    //sample paging and data request logic - this is just data generation from here on

    public async Task<DataEnvelope> FetchPagedData(DataSourceRequest request)
    {
        List<Employee> fullList = new List<Employee>();

        int totalCount = 100;
        for (int i = 0; i < totalCount; i++)
        {
            fullList.Add(new Employee()
            {
                Id = i,
                Name = "Name " + i,
            });
        }

        DataEnvelope result = new DataEnvelope();

        var dataSourceResult = fullList.ToDataSourceResult(request);
        result.CurrentPageData = (dataSourceResult.Data as IEnumerable<Employee>).ToList();
        result.TotalItemCount = dataSourceResult.Total;

        return result;
    }

    public class DataEnvelope
    {
        public List<Employee> CurrentPageData { get; set; }
        public int TotalItemCount { get; set; }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>caption Own filtering in the grid (header template is used until a [filter template](https://feedback.telerik.com/blazor/1407773-custom-filter-components-filter-template) becomes available)

````CSHTML
<style>
    .block-headers-with-sorting th.k-header .k-icon.k-i-sort-asc-sm,
    .block-headers-with-sorting th.k-header .k-icon.k-i-sort-desc-sm {
        position: absolute;
        right: 0;
        top: 8px;
    }
</style>

<TelerikGrid Data="@MyData" Height="300px" Pageable="true" Sortable="true" FilterMode="@GridFilterMode.None" Class="block-headers-with-sorting">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.ID))">
            <HeaderTemplate>
                <div>
                    <div style="margin-bottom: .5rem">Id</div>
                    <input style="width: 100%;" class="k-textbox"
                           @onclick:stopPropagation 
                           @oninput="@( (ChangeEventArgs e) => UserFilters((string)e.Value, "ID") )" />
                </div>
            </HeaderTemplate>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Name))">
            <HeaderTemplate>
                <div>
                    <div style="margin-bottom: .5rem">Name</div>
                    <input style="width: 100%;" class="k-textbox" 
                           @onclick:stopPropagation 
                           @oninput="@( (ChangeEventArgs e) => UserFilters((string)e.Value, "Name") )" />
                </div>
            </HeaderTemplate>
        </GridColumn>
        <GridColumn Field="HireDate" Width="350px">
            <HeaderTemplate>
                <div>
                    <div style="margin-bottom: .5rem">Hire Date</div>
                    <input style="width: 100%;" class="k-textbox"
                           @onclick:stopPropagation 
                           @oninput="@( (ChangeEventArgs e) => UserFilters((string)e.Value, "HireDate") )" />
                </div>
            </HeaderTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@operationsList

@code {
    MarkupString operationsList { get; set; }

    void UserFilters(string input, string field)
    {
        // do debouncing and filtering of the grid data (MyData in this sample) here
        // see the previous snippet on a way to implement throttling
        operationsList = new MarkupString($"{operationsList}<br />filter string: {input}, field: {field}");
        StateHasChanged();
    }

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

