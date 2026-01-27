---
title: Filter a Grid Column that is a List
description: How to Filter a Grid Column that is a List
type: how-to
page_title: Filter a Grid Column that is a List
slug: grid-kb-filter-column-list
position: 
tags: telerik, blazor, grid, filter
ticketid: 1522880, 1623151
res_type: kb
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>4.4.0 +</td>
        </tr>
    </tbody>
</table>


## Description

How to filter Grid data items, which contain a `List` in a single property?

How to filter a Grid column that is a `List<string>`?

How to filter a `List` within a single Grid column?


## Solution

The required approach revolves around two milestones:

* Data binding with an `OnRead` event;
* Using a filter template.

Here are step-by-step instructions:

1. Define a [`FilterCellTemplate` or a `FilterMenuTemplate`](slug:grid-templates-filter), depending on the Grid `FilterMode`. Add a [MultiSelect](slug:multiselect-overview) or another dropdown component in the template, according to your preferences. It's also possible to use [CheckBoxes](slug:checkbox-overview).
1. (only for `FilterRow` mode) Handle the [`ValueChanged` or `OnChange` event](slug:multiselect-events) of the component inside the filter template. Pass the `FilterCellTemplateContext` to the handler and call its `FilterAsync()` method to trigger Grid rebind.
1. (only for `FilterMenu` mode) Use a [`FilterMenuButtonsTemplate`](slug:grid-templates-filter#filter-menu-buttons-template) for the Filter and Clear buttons inside the filter menu. Use [Button `OnClick`](slug:button-events) handlers to call the `FilterAsync()` or `ClearFilterAsync()` methods of the `FilterMenuTemplateContext`. In the latter case, also clear the selected values of the filtering component.
1. Use the Grid [`OnRead` event](slug:common-features-data-binding-onread) to data bind the component, instead of the `Data` parameter.
1. In the `OnRead` handler, implement custom data filtering for the list column, based on the user selection in the filter template. The implementation of this step depends on your preferences and requirements.
1. Optionally, use [`ToDataSourceResult` or `ToDataSourceResultAsync`](slug:common-features-data-binding-onread#todatasourceresult-method) for the other data operations (sorting, paging, grouping, filtering of the other columns).

The example below includes two Grids - one for each `FilterMode`.

>caption Filtering by a Grid model property that is a list

````RAZOR
@using Telerik.DataSource.Extensions

<h1>Filtering a List Grid Column</h1>

<h2>Row Filtering</h2>

<TelerikGrid OnRead="@OnGridReadRowFilter"
             TItem="@Food"
             Pageable="true"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow"
             Height="600px">
    <GridColumns>
        <GridColumn Field="@nameof(Food.Name)" Title="Food" />
        <GridColumn Field="@nameof(Food.SpiceIds)" Title="Spices" Sortable="false">
            <Template>
                @{
                    var dataItem = (Food)context;
                }
                <ul>
                    @foreach (var spiceId in dataItem.SpiceIds)
                    {
                        <li>@Spices.FirstOrDefault(x => x.Id == spiceId)?.Name</li>
                    }
                </ul>
            </Template>
            <FilterCellTemplate>
                <TelerikMultiSelect Data="@Spices"
                                    @bind-Value="@RowFilteredSpiceIds"
                                    ValueField="@nameof(Spice.Id)"
                                    TextField="@nameof(Spice.Name)"
                                    AutoClose="false"
                                    Filterable="true"
                                    FilterOperator="@StringFilterOperator.Contains"
                                    OnChange="@( (object newValue) => OnSpiceRowFilterChange(newValue, context) )" />
            </FilterCellTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<h2>Menu Filtering</h2>

<TelerikGrid OnRead="@OnGridReadMenuFilter"
             TItem="@Food"
             Pageable="true"
             Sortable="true"
             FilterMode="GridFilterMode.FilterMenu"
             Height="600px">
    <GridColumns>
        <GridColumn Field="@nameof(Food.Name)" Title="Food" />
        <GridColumn Field="@nameof(Food.SpiceIds)" Title="Spices" Sortable="false" HeaderClass="@SpicesHeaderClass">
            <Template>
                @{
                    var dataItem = (Food)context;
                }
                <ul>
                    @foreach (var spiceId in dataItem.SpiceIds)
                    {
                        <li>@Spices.FirstOrDefault(x => x.Id == spiceId)?.Name</li>
                    }
                </ul>
            </Template>
            <FilterMenuTemplate>
                <TelerikMultiSelect Data="@Spices"
                                    @bind-Value="@MenuFilteredSpiceIds"
                                    ValueField="@nameof(Spice.Id)"
                                    TextField="@nameof(Spice.Name)"
                                    AutoClose="false"
                                    Filterable="true"
                                    FilterOperator="@StringFilterOperator.Contains"
                                    OnChange="@( (object newValue) => OnSpiceMenuFilterChange(newValue, context) )" />
            </FilterMenuTemplate>
            <FilterMenuButtonsTemplate>
                <TelerikButton OnClick="@( () => OnSpiceMenuFilterApply(context) )"
                               ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Filter </TelerikButton>
                <TelerikButton OnClick="@( () => OnSpiceMenuFilterClear(context) )">Clear</TelerikButton>
            </FilterMenuButtonsTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<style>
    .active-filter .k-grid-header-menu {
        background-color: var(--kendo-color-primary);
        color: var(--kendo-color-on-primary);
    }

        .active-filter .k-grid-header-menu:hover {
            background-color: var(--kendo-color-primary);
        }
</style>

@code {
    private List<Food> GridData { get; set; } = new List<Food>();

    private string SpicesHeaderClass { get; set; } = string.Empty;

    private List<Spice> Spices { get; set; } = new List<Spice>() {
        new Spice() { Id = 1, Name = "Salt" },
        new Spice() { Id = 2, Name = "Pepper" },
        new Spice() { Id = 3, Name = "Cinnamon" },
        new Spice() { Id = 4, Name = "Basil" },
        new Spice() { Id = 5, Name = "Oregano" },
        new Spice() { Id = 6, Name = "Ginger" },
        new Spice() { Id = 7, Name = "Thyme" }
    };

    #region Row Filtering

    private List<int> RowFilteredSpiceIds { get; set; } = new List<int>();

    private void OnSpiceRowFilterChange(object newValue, FilterCellTemplateContext context)
    {
        // No need to modify filter descriptors here,
        // because this column is filtered by custom code.
        context.FilterAsync();
    }

    private async Task OnGridReadRowFilter(GridReadEventArgs args)
    {
        var filteredData = new List<Food>(GridData);

        if (RowFilteredSpiceIds.Any())
        {
            filteredData.RemoveAll(x => !RowFilteredSpiceIds.All(y => x.SpiceIds.Contains(y)));
        }
        else
        {
            SpicesHeaderClass = string.Empty;
        }

        var result = await filteredData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    #endregion Row Filtering

    #region Menu Filtering

    private List<int> MenuFilteredSpiceIds { get; set; } = new List<int>();

    private void OnSpiceMenuFilterChange(object newValue, FilterMenuTemplateContext context)
    {
        // No need to modify filter descriptors here,
        // because this column is filtered by custom code.
        // This handler is not required. Use it for custom logic, if necessary.
    }

    private async Task OnSpiceMenuFilterApply(FilterMenuTemplateContext context)
    {
        // No need to modify filter descriptors here,
        // because this column is filtered by custom code.
        await context.FilterAsync();
    }

    private async Task OnSpiceMenuFilterClear(FilterMenuTemplateContext context)
    {
        MenuFilteredSpiceIds = new List<int>();
        await context.ClearFilterAsync();

        // Because the filtering occurs outside of the Grid, the active filter style requires manual clearing.
        SpicesHeaderClass = "";
    }

    private async Task OnGridReadMenuFilter(GridReadEventArgs args)
    {
        var filteredData = new List<Food>(GridData);

        if (MenuFilteredSpiceIds.Any())
        {
            filteredData.RemoveAll(x => !MenuFilteredSpiceIds.All(y => x.SpiceIds.Contains(y)));

            // Because the filtering occurs outside of the Grid, the active filter style requires manual applying.
            SpicesHeaderClass = "active-filter";
        }

        var result = await filteredData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    #endregion Menu Filtering

    #region Models and Data

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 33; i++)
        {
            var spiceIdsForItem = Spices.OrderBy(x => rnd.Next()).Take(3).OrderBy(x => x.Name).Select(x => x.Id).ToList();

            GridData.Add(new Food()
                {
                    Id = i,
                    Name = $"Food {i}",
                    SpiceIds = spiceIdsForItem
                });
        }

        Spices = Spices.OrderBy(x => x.Name).ToList();
    }

    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<int> SpiceIds { get; set; } = new List<int>();
    }

    public class Spice
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    #endregion Models and Data
}
````

## Notes

.NET doesn't provide a built-in mechanism for filtering or comparing collections. As a result, built-in Grid data operations exist only for `string` and [value types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) like `int`, `bool`, `DateTime`, and so on.


## See Also

* [OnRead data binding](slug:common-features-data-binding-onread)
* [Grid filter template](slug:grid-templates-filter)
