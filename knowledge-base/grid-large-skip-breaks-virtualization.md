---
title: Setting Large Skip Manually Shows Virtualization Placeholders
description: When I set Skip with Virtualization, I see a few placeholder rows and not all items shows properly
type: troubleshooting
page_title: Setting Large (Invalid) Skip Manually Twice Shows Virtualization Placeholders
slug: grid-kb-large-skip-virtualization
position: 
tags: 
ticketid: 1505970
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
We use [virtualization](slug:components/grid/virtual-scrolling) and set the `Skip` of the grid through its [state](slug:grid-state) (for example, to restore state from the user or to scroll the grid programmatically).

When the sum of the skip and the page size is bigger then the total count of the items and we try to set the Skip property for the second time, some of the top items are not shown.

>caption Recording of the problem and the solution (see the code below)

![Setting invalid Skip value breaks the grid virtualization appearance](images/invalid-skip.gif)

## Possible Cause
The origin of the problem is that when the `Skip` value is too large, there may not be enough items to fill the Grid viewport. 

For example, if the Grid viewport can fit 15 items, but according to the `Skip` setting, there are only 8 items to display, those items cannot push the placeholder rows out of view, and you will still see them at the top of the Grid.

## Solution
Ensure that you set a suitable `Skip` value, so that row placeholders don't show. For example, when the data arrives, check if there are too few items and update the `Skip` value.

>caption Reproducible and a solution for setting an invalid (too large) Skip

````RAZOR
@using Telerik.DataSource.Extensions

<ol>
    <li>Click the button twice or more - placeholders remain visible on the second call because the items are too few.</li>
    <li>Check the checkbox</li>
    <li>
        <label>
            <TelerikCheckBox @bind-Value="@shouldFixInvalidSkip"></TelerikCheckBox> Enable the fix
        </label>
    </li>
    <li>Click the button again</li>
</ol>

<TelerikButton OnClick="@( async () => await SetSkip(96) )">Set too large Skip</TelerikButton>

<TelerikGrid TItem="@Employee" OnRead=@ReadItems @ref="@GridRef"
             PageSize="@PageSize"
             ScrollMode="@GridScrollMode.Virtual" RowHeight="50" Height="400px"
             FilterMode="@GridFilterMode.FilterRow" Sortable="true">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    //this part describes the problem and the solution (behind a flag so you can clearly see it)
    bool shouldFixInvalidSkip { get; set; }
    int PageSize = 20;
    TelerikGrid<Employee> GridRef { get; set; }

    async Task SetSkip(int skip)
    {
        if (GridRef != null)
        {
            var state = GridRef.GetState();
            state.Skip = skip;
            await GridRef.SetStateAsync(state);
        }
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        //this should actually be happening on the server, but for brevity we do it here
        //see more at https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);
        List<Employee> curentData;

        args.Data = curentData = (datasourceResult.Data as IEnumerable<Employee>).ToList();
        args.Total = datasourceResult.Total;

        if (shouldFixInvalidSkip)
        {
            // when you set large Skip values manually you can check whether they will
            // cause an issue and correct that issue by setting a valid Skip value

            // with the current grid settings there can be 6 items in the viewport, calculate this as needed in your app
            // for example, based on the row size and grid height, or even use JS Interop if needed to get actual DOM elements' sizes
            int itemsThatFitPerPage = 6;
            bool isInvalidSkip = (args.Data as IEnumerable<Employee>).Count() < itemsThatFitPerPage;
            //generally, the issue can occur as a result of the following condition
            //but using that can prevent the user from scrolling all the way down to the last items
            //Total < (args.Request.Skip + PageSize);

            if (isInvalidSkip)
            {
                int matchingSkip = args.Total - itemsThatFitPerPage;
                await SetSkip(matchingSkip);
            }
        }
    }

    // only basic data binding follows

    public List<Employee> SourceData { get; set; }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 1; i <= 100; i++)
        {
            result.Add(new Employee()
            {
                ID = i,
                Name = "Name " + i,
                HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20))
            });
        }

        return result;
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````


## Notes

The Grid cannot apply the fix automatically, because that would mean altering the state you provide. This would be invalid and unexpected behavior. Moreover, it could result in infinite loops or errors, and is a heuristic (undetermined) task.
