---
title: Descriptors - FilterDescriptor, SearchFilter, SortDescriptor, GroupDescriptor
page_title: Descriptors - FilterDescriptor, SearchFilter, SortDescriptor, GroupDescriptor
description: Discover the FilterDescriptor, SortDescriptor, SearchFilter and GroupDescriptor properties and how to access their values.
slug: common-features-descriptors
tags: telerik,blazor,filterdescriptor, sortdescriptor, groupdescriptor, searchfilter
published: True
position: 10
---


## Data Operation Descriptors

This article explains how to retrieve the applied filtering, searching, sorting, and grouping criteria in Blazor components. The article applies to components that support these features. The components that offer one or all of the functionalities are:

* Components that [expose an `OnRead` event]({%slug common-features-data-binding-onread%}#components-with-onread-event), excluding the [ListView]({%slug listview-overview%}), because the ListView doesn't support built-in filtering, searching, sorting, and grouping.
* [Filter]({%slug filter-overview%})
* [Gantt]({%slug gantt-overview%})
* [TreeList]({%slug treelist-overview%})

## Get Sort, Filter, Group, and Search Descriptors

There are two ways to obtain the applied filtering, searching, sorting, grouping criteria:

### Through the OnRead Event

Use the [`Request` property]({%slug common-features-data-binding-onread%}#event-argument) of the [`OnRead` event argument object](/blazor-ui/api/Telerik.Blazor.Components.ReadEventArgs):

````CS
async Task OnReadHandler(...ReadEventArgs args)
{
    // Get the applied filtering and searching criteria
    // args.Request.Filters

    // Get the applied grouping criteria, including:
    // *the field by which the user groups
    // *the sort direction of the groups ordering
    // args.Request.Groups

    // Get the applied sorting criteria, including:
    // *the field which the user sorts
    // *the sort direction
    // args.Request.Sorts
}
````

### Through the Component State

Use the component state property of the `OnStateChanged` event argument. This approach is applicable for the Gantt, the Grid and the TreeList, because they expose the state feature. For example:

````CS
async Task OnStateChangedHandler(GridStateEventArgs<Product> args)
{
    // Get the applied filtering criteria
    // args.GridState.FilterDescriptors

    // Get the applied searching criteria
    // args.GridState.SearchFilter

    // Get the applied grouping criteria, including:
    // *the field by which the user groups
    // *the sort direction of the groups ordering
    // args.GridState.GroupDescriptors

    // Get the applied sorting criteria, including:
    // *the field which the user sorts
    // *the sort direction
    // args.GridState.SortDescriptors
}
````

See full examples at the bottom of the article.


## Filtering

The filtering criteria for each filtered field are stored in an individual collection of [`IFilterDescriptor`](/blazor-ui/api/Telerik.DataSource.IFilterDescriptor). To access the filtering criteria, such as the user input to filter by, cast each `IFilterDescriptor`:

* If the component is of type input or select, such as the AutoComplete, the ComboBox, the DropDownList, the MultiColumnComboBox, the MultiSelect, cast the first `IFilterDescriptor` from the collection to [`FilterDescriptor`](/blazor-ui/api/telerik.datasource.filterdescriptor).
* Otherwise, cast each `IFilterDescriptor` to [`CompositeFilterDescriptor`](/blazor-ui/api/Telerik.DataSource.CompositeFilterDescriptor).

### CompositeFilterDescriptor

The `CompositeFilterDescriptor` exposes:

* [`FilterDescriptors`](/blazor-ui/api/telerik.datasource.compositefilterdescriptor#Telerik_DataSource_CompositeFilterDescriptor_FilterDescriptors) property. This property represents another collection of `IFilterDescriptor`. To access the filtering criteria cast each `IFilterDescriptor` to a `FilterDescriptor`. When the Filter component gets groupable filtering, cast each `IFilterDescriptor` to another `CompositeFilterDescriptor`.
* [`LogicalOperator`](/blazor-ui/api/telerik.datasource.compositefilterdescriptor#Telerik_DataSource_CompositeFilterDescriptor_LogicalOperator) property. This property can be either `AND` or `OR`. This property represents the logical operator applied between the instances in the `FilterDescriptors` collection.

When the filtering is initiated, the `CompositeFilterDescriptor` properties get different values, depending on the filter mode:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Filter Mode | FilterDescriptors Property Value | LogicalOperator Property Value |
| --- | --- | --- |
| FilterMenu | Two filter descriptor instances per each filtered field. Each filter descriptor instance gets the user input as `Value`. If there is no user input in one of the input fields in the menu then this filter descriptor instance `Value` is null. | Depending on the user choice. |
| FilterRow | Two filter descriptor instances per each filtered field. The second filter descriptor instance always gets null as `Value`, because there is no second input field. | AND |


## Searching

The searching criteria in a Grid or TreeList are stored in an individual `IFilterDescriptor`. Cast it to [`CompositeFilterDescriptor`](#compositefilterdescriptor). The `CompositeFilterDescriptor` holds one child `FilterDescriptor`s for each searchable string column. Each `FilterDescriptor` has the same `Value`, which is the user search input. The value of the `LogicalOperator` property of the `CompositeFilterDescriptor` is `Or`.


## Sorting

The sorting criteria are stored in a collection of [`SortDescriptor`](/blazor-ui/api/telerik.datasource.sortdescriptor) objects. Each `SortDescriptor` instance gives access to:
* The `Member`&mdash;The field where the user sorts.
* The `SortDirection`&mdash;The sort direction for this sort descriptor.


## Grouping

Тhe grouping criteria for each group is stored in an individual collection of [`GroupDescriptor`](/blazor-ui/api/telerik.datasource.groupdescriptor). The `GroupDescriptor` class inherits the `SortDescriptor` class and gives access to the same properties as the `SortDescriptor` class.


## Example with OnRead Event Handler

You can obtain the FilterDescriptor, SortDescriptor, GroupDescriptor in the `OnRead` event handler.

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>@ConsoleSim</p>

<TelerikGrid TItem="@SampleData"
             OnRead="@OnReadHandler"
             Sortable="true"
             Groupable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Pageable="true" PageSize="15"
             Height="400px">
    <GridToolBarTemplate>
        <GridSearchBox />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleData.Id)" />
        <GridColumn Field="@nameof(SampleData.Name)" />
        <GridColumn Field="@nameof(SampleData.Team)" />
        <GridColumn Field="@nameof(SampleData.HireDate)" />
    </GridColumns>
</TelerikGrid>


@code {
    private MarkupString ConsoleSim { get; set; } // to showcase what you get

    private async Task OnReadHandler(GridReadEventArgs args)
    {
        string output = string.Empty;

        //get the filtering and searching criteria
        output += "<span><strong>FILTERS:</strong><span></br>";
        foreach (var item in args.Request.Filters)
        {
            if (item is CompositeFilterDescriptor)
            {
                CompositeFilterDescriptor currFilter = (CompositeFilterDescriptor)item;
                output += $"START nested filter: Logical operator: {currFilter.LogicalOperator}, details:<br />";
                foreach (FilterDescriptor nestedFilter in currFilter.FilterDescriptors)
                {
                    output += $"Filtered field: {nestedFilter.Member}, Filter operator: {nestedFilter.Operator}, Filter value: {nestedFilter.Value}<br />";
                }
                output += "END nested filter<br />";
            }
        }

        //get the sorting criteria
        output += "<span><strong>SORTS:</strong><span></br>";
        foreach (SortDescriptor item in args.Request.Sorts)
        {
            output += $"Sorted field: {item.Member}, Sort direction: {item.SortDirection} <br />";
        }

        //get the grouping criteria
        output += "<span><strong>GROUPS:</strong><span></br>";
        foreach (GroupDescriptor item in args.Request.Groups)
        {
            output += $"Grouped field: {item.Member}, Group sort direction: {item.SortDirection} <br />";
        }

        ConsoleSim = new MarkupString(output);

        var result = PristineData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    private IEnumerable<SampleData> PristineData = Enumerable.Range(1, 300).Select(x => new SampleData
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

## Example with Component State

You can obtain the FilterDescriptor, SearchFilter, SortDescriptor, GroupDescriptor through the component state.

````CSHTML
@using System.Text.Json
@using Telerik.DataSource

<p>@ConsoleSim</p>

    <TelerikGrid Data="@GridData"
             Sortable="true"
             Groupable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Pageable="true" PageSize="15"
             Height="400px"
             OnStateChanged="@( (GridStateEventArgs<Product> args) => OnGridStateChanged(args) )">
        <GridToolBarTemplate>
            <GridSearchBox />
        </GridToolBarTemplate>
        <GridColumns>
            <GridColumn Field="@nameof(Product.Name)" />
            <GridColumn Field="@nameof(Product.Category)" />
            <GridColumn Field="@nameof(Product.Stock)" />
            <GridColumn Field="@nameof(Product.Discontinued)" />
        </GridColumns>
    </TelerikGrid>

@code {
    private MarkupString ConsoleSim { get; set; }

    private List<Product> GridData { get; set; } = new List<Product>();

    private async Task OnGridStateChanged(GridStateEventArgs<Product> args)
    {
        string output = string.Empty;

        //get the searching criteria
        output += "<span><strong>SEARCHING:</strong><span></br>";
        var searching = args.GridState.SearchFilter;

        if (searching is CompositeFilterDescriptor)
            {
            CompositeFilterDescriptor currSearch = searching as CompositeFilterDescriptor;
            output += $"START nested searching: Logical operator: {currSearch.LogicalOperator}, details:<br />";
                // by design, there will actually be 2 only, this showcases the concept and the types
            foreach (FilterDescriptor nestedSearch in currSearch.FilterDescriptors)
                {
                output += $"Search field: {nestedSearch.Member}, Search operator {nestedSearch.Operator}, Search value: {nestedSearch.Value}<br />";
                }
            output += "END nested searching<br />";
            }
        

        //get the filtering criteria
        output += "<span><strong>FILTERS:</strong><span></br>";

        foreach (var item in args.GridState.FilterDescriptors)
        {
            if (item is CompositeFilterDescriptor)
            {
                CompositeFilterDescriptor currFilter = item as CompositeFilterDescriptor;
                output += $"START nested filter: Logical operator: {currFilter.LogicalOperator}, details:<br />";
                foreach (FilterDescriptor nestedFilter in currFilter.FilterDescriptors)
                {
                    output += $"Filtered field: {nestedFilter.Member}, Filter operator: {nestedFilter.Operator}, Filter value: {nestedFilter.Value}<br />";
                }
                output += "END nested filter<br />";
            }
        }

        //get the sorting criteria
        output += "<span><strong>SORTS:</strong><span></br>";
        foreach (SortDescriptor item in args.GridState.SortDescriptors)
        {
            output += $"Sorted field: {item.Member}, Sort direction: {item.SortDirection} <br />";
        }

        //get the grouping criteria
        output += "<span><strong>GROUPS:</strong><span></br>";
        foreach (SortDescriptor item in args.GridState.GroupDescriptors)
        {
            output += $"Grouped field: {item.Member}, Group sort direction: {item.SortDirection} <br />";
        }

        ConsoleSim = new MarkupString(output);
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 12; i++)
        {
            GridData.Add(new Product()
                {
                    Id = i,
                    Name = $"Product {i}",
                    Category = $"Category {i % 4 + 1}",
                    Stock = rnd.Next(0, 100),
                    Discontinued = i % 3 == 0
                });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int Stock { get; set; }
        public bool Discontinued { get; set; }
    }
}
````
