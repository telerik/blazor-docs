---
title: Scroll to Selected Grid Row
description: How to scroll a grid to the selected table row
type: how-to
page_title: Scroll to Selected Grid item
slug: grid-kb-scroll-to-selected-row
position: 
tags: 
ticketid: 1513767
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

I want to programmatically [select a row in the Grid](slug://grid-selection-row) based on specific conditions in my code. Once selected, I’d like the Grid to automatically scroll to that row so it’s visible to the user.

## Solution

The solution to select programatically a row in Grid and scroll to that selected row, depends on the Grid configuration.

### Grid with **[paging feature](slug://components/grid/features/paging)**

1. Ensure the Grid is on the same page as the selected row.
1. Invoke a JavaScript to make the browser scroll to the selected row into view. The browsers provide the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView" target="_blank">`scrollIntoView()` method</a> that does the scrolling. You can find a selected row in the grid markup by its `k-selected` CSS class.

### Grid with **[virtualization feature](slug://components/grid/virtual-scrolling)**

1. Use the [Grid state](slug://grid-state).
1. Set the [`Skip` parameter](slug://grid-state#information-in-the-grid-state) to the index of the item in the current data collection.

## Example

The example below offers comments in the code on some possible improvements.

>caption Select a Row in Grid Programmatically and Scroll to the Row

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions
@inject IJSRuntime JsInterop


@* Move JavaScript code to a separate JS file in production *@
<script suppress-error="BL9992">
    window.scrollToSelectedRow = function () {
        var selectedRow = document.querySelector('.k-selected');
        if (selectedRow) {
            selectedRow.scrollIntoView();
        }
    }
</script>

<script suppress-error="BL9992">
    window.scrollToFirstRow = function () {
        var selectedRow = document.querySelector('.k-table-row.k-master-row');
        if (selectedRow) {
            selectedRow.scrollIntoView();
        }
    }
</script>

<br/>
<h2>Grid with Paging</h2>
<TelerikAutoComplete Data="@Employees"
                     Value="@SelectedEmployeeInPageMode"
                     Placeholder="Search an employee..."
                     ShowClearButton="true"
                     DebounceDelay="500"
                     Width="300px"
                     FilterOperator="StringFilterOperator.Contains"
                     ValueChanged="@HandleSelectedRowWithPageMode">
</TelerikAutoComplete>

<TelerikGrid Data=@GridData
             SelectionMode="@GridSelectionMode.Single"
             @bind-SelectedItems="@SelectedItemsInPageMode"
             Pageable="true"
             Page="@PageInPageMode"
             PageSize="@PageSizeInPageMode"
             Height="300px">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

<br/>
<h2>Grid with Virtualization</h2>
<TelerikAutoComplete Data="@Employees"
                     Value="@SelectedEmployeeInVirtualization"
                     Placeholder="Search an employee..."
                     ShowClearButton="true"
                     DebounceDelay="500"
                     Width="300px"
                     FilterOperator="StringFilterOperator.Contains"
                     ValueChanged="@HandleSelectedRowWithVirtualization">
</TelerikAutoComplete>

<TelerikGrid @ref="@GridRef"
             TItem="@Employee"
             OnRead="@ReadItems"
             SelectionMode="GridSelectionMode.Single"
             @bind-SelectedItems="@SelectedItemsInVirtualization"
             Sortable="true"
             ScrollMode="@GridScrollMode.Virtual"
             RowHeight="40"
             PageSize="@PageSizeInVirtualization"
             Height="300px">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>


@code {
    #region  Parameters

    private TelerikGrid<Employee>? GridRef { get; set; }

    private List<Employee> GridData { get; set; } = new();
    private List<string> Employees { get; set; } = new();

    private IEnumerable<Employee> SelectedItemsInPageMode { get; set; } = Enumerable.Empty<Employee>();
    private IEnumerable<Employee> SelectedItemsInVirtualization { get; set; } = Enumerable.Empty<Employee>();

    private string SelectedEmployeeInPageMode { get; set; } = string.Empty;
    private string SelectedEmployeeInVirtualization { get; set; } = string.Empty;

    private int PageInPageMode { get; set; } = 1;
    private int PageSizeInPageMode { get; set; } = 30;
    private int PageSizeInVirtualization { get; set; } = 20;

    private int GridDataCount { get; set; }
    private int AllDataCount { get; set; }

    #endregion Parameters

    #region Event Handlers

    private async Task HandleSelectedRowWithPageMode(string newValue)
    {
        SelectedEmployeeInPageMode = newValue;

        if (!string.IsNullOrEmpty(SelectedEmployeeInPageMode))
        {
            SelectedItemsInPageMode = GridData.Where(item => item.Name == SelectedEmployeeInPageMode).ToList();

            //Find and set the page where is the selected item
            int itemIndex = GridData.IndexOf(SelectedItemsInPageMode.First());
            PageInPageMode = (int)Math.Ceiling((double)(itemIndex + 1) / PageSizeInPageMode);

            await Task.Delay(20);//Simulate network delay so the page can be set and render in the browser

            await JsInterop.InvokeVoidAsync("scrollToSelectedRow");
        }
        else
        {
            SelectedItemsInPageMode = new List<Employee>();
            await Task.Delay(20);//Simulate network delay
            await JsInterop.InvokeVoidAsync("scrollToFirstRow");
        }
    }

    private async Task HandleSelectedRowWithVirtualization(string newValue)
    {
        SelectedEmployeeInVirtualization = newValue;

        int targetItemIndex;

        if (!string.IsNullOrEmpty(SelectedEmployeeInVirtualization))
        {
            SelectedItemsInVirtualization = GridData.Where(item => item.Name == SelectedEmployeeInVirtualization).ToList();
            targetItemIndex = GridData.IndexOf(SelectedItemsInVirtualization.First());
        }
        else
        {
            SelectedItemsInVirtualization = new List<Employee>();
            targetItemIndex = GridData.IndexOf(GridData.First());
        }
        await SetSkip(targetItemIndex, SelectedItemsInVirtualization);
    }

    #endregion Event Handlers

    #region Methods

    private async Task SetSkip(int skip)
    {
        await SetSkip(skip, null);
    }

    private async Task SetSkip(int skip, IEnumerable<Employee> itemsToSelect)
    {
        if (GridRef != null)
        {
            var state = GridRef.GetState();
            if (itemsToSelect != null)
            {
                state.SelectedItems = (ICollection<Employee>)itemsToSelect;
            }
            state.Skip = ValidateSkip(skip);
            await GridRef.SetStateAsync(state);
        }
    }

    private int ValidateSkip(int desiredSkip)
    {
        if (desiredSkip < 0) return 0;
        int itemsThatFitPerPage = 7;
        bool isInvalidSkip = GridDataCount < itemsThatFitPerPage;
        return isInvalidSkip ? AllDataCount - itemsThatFitPerPage : desiredSkip;
    }

    #endregion Methods

    #region Life Cycle Methods

    protected override async Task OnInitializedAsync()
    {
        GridData = GenerateData();
        Employees = GridData.Select(e => e.Name).ToList();
    }

    #endregion Life Cycle Methods

    #region Data Generation

    protected async Task ReadItems(GridReadEventArgs args)
    {
        var datasourceResult = GridData.ToDataSourceResult(args.Request);
        var data = ((IEnumerable<Employee>)datasourceResult.Data).ToList();
        args.Data = data;
        args.Total = AllDataCount = datasourceResult.Total;
        GridDataCount = data.Count;

        //See more about why this is done here https://docs.telerik.com/blazor-ui/knowledge-base/grid-large-skip-breaks-virtualization
        int allowedSkip = ValidateSkip(args.Request.Skip);
        if (allowedSkip != args.Request.Skip)
        {
            await SetSkip(allowedSkip);
        }
    }

    private List<Employee> GenerateData()
    {
        List<Employee> data = new List<Employee>();
        for (int i = 1; i <= 100; i++)
        {
            data.Add(new Employee()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    Team = "Team " + i % 3
                });
        }
        return data;
    }

    #endregion Data Generation

    #region Models

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }

    #endregion Models
}
````

## See Also
* [Grid Row Selection](slug://grid-selection-row)
* [Grid paging feature](slug://components/grid/features/paging)
* [Grid virtualization feature](slug://components/grid/virtual-scrolling)
