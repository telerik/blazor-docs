---
title: Custom Grouping Order in Grid for Blazor
description: Learn how to implement custom grouping order in the Telerik Grid for Blazor.
type: how-to
page_title: Implementing Custom Grouping Order in Blazor Grid
slug: grid-custom-grouping-order
tags: grid, blazor, custom, grouping, order, sorting
res_type: kb
ticketid: 1661227
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

I want to group data programmatically in the Telerik Grid for Blazor by one column, ensuring the grouped order matches a specific sequence rather than the default ascending or descending order. I need to sort groups in a custom way, based on a predefined order of the data received from the backend or a custom pattern.

This KB article answers the following questions:
- How can I apply custom sorting to groups in the Grid for Blazor?
- What is the approach to sort Grid groups in a non-standard order?
- Can I define a custom sequence for grouped data in the Grid for Blazor?

## Solution

To achieve custom grouping order in the Telerik Grid for Blazor, follow these steps:

1. Bind the Grid with the `OnRead` event to handle data operations manually. Refer to the official documentation for [OnRead]({%slug common-features-data-binding-onread%}) and [Grouping with OnRead]({%slug components/grid/manual-operations%}#grouping-with-onread)

2. Instead of using the `ToDataSourceResult()` method, group the data with custom code. Each group must be represented by an `AggregateFunctionsGroup` object. For understanding the Grid's expectations, inspect the `datasourceResult` variable structure and content with a debugger, as shown in [Grouping with OnRead]({%slug components/grid/manual-operations%}#grouping-with-onread).

3. Implement custom sorting logic for grouped data based on your specific order requirements (e.g., D, A, C, B) within the `OnRead` method.

4. To display multiple property names and values in group headers, consider using the `GroupHeaderTemplate`.

5. (Optionally) Disable the Grid's `Groupable` setting to hide the group panel if you want to prevent users from modifying the grouping state.

````CSHTML
@using Telerik.Blazor.Components
@using System.Collections.ObjectModel
@using Telerik.DataSource.Extensions
@using Telerik.DataSource

<h1>Custom sort of grouping on a column</h1>

<TelerikGrid OnRead="@ReadItems"
			 TItem="GridDataModel"
			 OnStateInit="@((GridStateEventArgs<GridDataModel> args) => OnGridStateInit(args))"
			 Class="my-grid"
			 Groupable="true"
			 Width="100%">
	<GridColumns>
		<GridColumn Title="String 1"
					Field="@nameof(GridDataModel.S1)"
					Width="200px" />
		<GridColumn Title="String 2"
					Field="@nameof(GridDataModel.S2)"
					Width="200px" />
		<GridColumn Title="String 3"
					Field="@nameof(GridDataModel.S3)"
					Width="200px" />
		<GridColumn Title="String 4"
					Field="@nameof(GridDataModel.S4)"
					Width="200px" />
		<GridColumn Title="String 5"
					Field="@nameof(GridDataModel.S5)"
					Width="200px" />
	</GridColumns>
</TelerikGrid>

@code {
	private ObservableCollection<GridDataModel> GridData = new ObservableCollection<GridDataModel>();

	private bool UseGroupBy = true;

	protected override void OnInitialized()
	{
		base.OnInitialized();

		GridData = new ObservableCollection<GridDataModel>
		{
			new(5, "Hello world D", "Hello world 5-2", "Hello world 5-3", "Hello world 5-4", "Hello world 5-5"),
			new(1, "Hello world A", "Hello world 1-2", "Hello world 1-3", "Hello world 1-4", "Hello world 1-5"),
			new(3, "Hello world C", "Hello world 3-2", "Hello world 3-3", "Hello world 3-4", "Hello world 3-5"),
			new(4, "Hello world C", "Hello world 4-2", "Hello world 4-3", "Hello world 4-4", "Hello world 4-5"),
			new(2, "Hello world B", "Hello world 2-2", "Hello world 2-3", "Hello world 2-4", "Hello world 2-5"),
		};
	}

	protected async Task ReadItems(GridReadEventArgs args)
	{
		var datasourceResult = GridData.ToDataSourceResult(args.Request);

		// Determine if the data is grouped
		if (args.Request.Groups.Any())
		{
			// Data is grouped, so we need to handle AggregateFunctionsGroup objects
			var groups = datasourceResult.Data.Cast<AggregateFunctionsGroup>().ToList();

			// Custom sort logic for grouped data based on your custom order: D, A, C, B
			List<string> customOrder = new List<string> { "Hello world D", "Hello world A", "Hello world C", "Hello world B" };
			groups = groups.OrderBy(group => customOrder.IndexOf(group.Key.ToString())).ToList();

			args.Data = groups.Cast<object>().ToList();
		}
		else
		{
			// Data is not grouped, so we can cast directly to GridDataModel
			var orderedData = datasourceResult.Data.Cast<GridDataModel>()
								.OrderBy(item => GetCustomOrderIndex(item.S1))
								.ToList();

			args.Data = orderedData.Cast<object>().ToList();
		}

		args.Total = datasourceResult.Total;
		args.AggregateResults = datasourceResult.AggregateResults;
	}

	private int GetCustomOrderIndex(string? value)
	{
		// Define the custom order
		List<string> customOrder = new List<string> { "Hello world D", "Hello world A", "Hello world C", "Hello world B" };

		// Return the index based on the custom order
		return customOrder.IndexOf(value ?? string.Empty);
	}

	protected void OnGridStateInit(GridStateEventArgs<GridDataModel> args)
	{
		if (UseGroupBy)
		{
			GridState<GridDataModel> desiredState = new GridState<GridDataModel>()
				{
					GroupDescriptors = new List<GroupDescriptor>()
				{
					new GroupDescriptor()
					{
						Member = nameof(GridDataModel.S1),
						MemberType = typeof(string),
					}
				}
				};
			args.GridState = desiredState;
		}
	}

	public class GridDataModel
	{
		public int Id { get; init; }
		public string? S1 { get; set; }
		public string? S2 { get; set; }
		public string? S3 { get; set; }
		public string? S4 { get; set; }
		public string? S5 { get; set; }

		public GridDataModel()
		{
			// for the grid
		}

		public GridDataModel(
			int id,
			string s1, string s2, string s3, string s4, string s5)
		{
			Id = id;
			S1 = s1;
			S2 = s2;
			S3 = s3;
			S4 = s4;
			S5 = s5;
		}
	}
}
````

## See Also

- [Grid Data Binding - OnRead](https://docs.telerik.com/blazor-ui/common-features/data-binding/onread)
- [Manual Operations - Grouping with OnRead](https://docs.telerik.com/blazor-ui/components/grid/manual-operations#grouping-with-onread)
- [AggregateFunctionsGroup Class](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.AggregateFunctionsGroup)
