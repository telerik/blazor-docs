---
title: Change Grid Search Results on Column Hide or Show
description: Learn how to modify the Grid search results on the fly when the user hides or shows a column.
type: how-to
page_title: How to Change Grid Search Results on Column Hide or Show
slug: grid-kb-search-match-visible-columns
tags: telerik, blazor, grid, search
ticketid: 1565592
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to change the Grid search results when the user hides or shows a string column?
* How to refresh and match the Grid search results when the `Visible` attribute of a column changes?
* How to hide or show search results in the Grid when the visibility of a column changes and a column is no longer displayed?

## Solution

1. Subscribe to the [Grid `OnStateChanged` event](slug:grid-state#onstatechanged).
1. Check if the `PropertyName` event argument is equal to `"ColumnStates"` to verify that the user has modified the column state.
1. Check for `FilterDescriptor` instances in `args.GridState.SearchFilter.FilterDescriptors` to verify if a search is active.
1. [Get the visible columns from `args.GridState.ColumnStates`.](slug:grid-kb-column-state) Use only the columns with a `Field` that points to a `string` property.
1. Compare the `Field` values of the visible string columns with the `Member` values of the search-related filter descriptors.
1. Add or remove `FilterDescriptors` in `args.GridState.SearchFilter.FilterDescriptors` to align the search configuration with the currently visible columns.
1. [Update the Grid state with `SetStateAsync()`](slug:grid-state#methods).

>caption Change search results when the user hides or shows a column

````RAZOR
@using Telerik.DataSource

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             TItem="@SampleModel"
             Pageable="true"
             Sortable="true"
             ShowColumnMenu="true"
             OnStateChanged="@OnGridStateChanged">
    <GridToolBarTemplate>
        <GridSearchBox Placeholder="Type two identical letters" Width="200px" />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Id)" Width="100px" VisibleInColumnChooser="false" />
        <GridColumn Field="@nameof(SampleModel.Name)" />
        <GridColumn Field="@nameof(SampleModel.Description)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleModel>? GridRef { get; set; }

    private List<SampleModel> GridData { get; set; } = new();

    // Non-string columns should not take part in the custom logic.
    private readonly List<string> GridStringFields = new List<string>() { nameof(SampleModel.Name), nameof(SampleModel.Description) };

    private async Task OnGridStateChanged(GridStateEventArgs<SampleModel> args)
    {
        // This will be true also for column resizing, reordering and locking.
        // Some additional checks exist below.
        if (args.PropertyName == "ColumnStates")
        {
            var searchFilterDescriptors = ((CompositeFilterDescriptor)args.GridState.SearchFilter).FilterDescriptors;

            if (searchFilterDescriptors.Any())
            {
                var searchValue = ((FilterDescriptor)searchFilterDescriptors.First()).Value;
                bool shouldRebindGrid = false;

                var visibleStringColumnFields = new List<string>();
                var filterDescriptorsToRemove = new List<IFilterDescriptor>();

                foreach (GridColumnState colState in args.GridState.ColumnStates)
                {
                    if (!string.IsNullOrEmpty(colState.Field) &&
                        GridStringFields.Contains(colState.Field) &&
                        (!colState.Visible.HasValue || colState.Visible.Value))
                    {
                        visibleStringColumnFields.Add(colState.Field);
                    }
                }

                // Find FilterDescriptors for hidden columns.
                foreach (FilterDescriptor fd in searchFilterDescriptors)
                {
                    if (!visibleStringColumnFields.Contains(fd.Member))
                    {
                        filterDescriptorsToRemove.Add(fd);
                    }
                }
                // Remove FilterDescriptors for hidden columns.
                foreach (FilterDescriptor fd in filterDescriptorsToRemove)
                {
                    searchFilterDescriptors.Remove(fd);
                    shouldRebindGrid = true;
                }

                // Add FilterDescriptors for newly shown columns.
                foreach (string field in visibleStringColumnFields)
                {
                    if (!searchFilterDescriptors.Any(x => ((FilterDescriptor)x).Member == field))
                    {
                        searchFilterDescriptors.Add(new FilterDescriptor()
                        {
                            Member = field,
                            MemberType = typeof(string),
                            Operator = FilterOperator.Contains,
                            Value = searchValue
                        });
                        shouldRebindGrid = true;
                    }
                }

                // Apply the changes in args.GridState.SearchFilter and rebind the Grid.
                if (shouldRebindGrid)
                {
                    await GridRef!.SetStateAsync(args.GridState);
                }
            }
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 50; i++)
        {
            char nameCharCode = (char)(64 + i % 26 + 1);
            char descriptionCharCode = (char)(91 - i % 26 - 1);

            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"Name {i} {nameCharCode}{nameCharCode}",
                Description = $"Description {i} {descriptionCharCode}{descriptionCharCode}"
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
````

## See Also

* [Search in Hidden Grid Columns](slug:grid-kb-search-in-hidden-fields)
* [Grid State](slug:grid-state)
* [Grid SearchBox](slug:grid-searchbox)
