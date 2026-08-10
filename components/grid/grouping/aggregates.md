---
title: Aggregates
page_title: Grid - Aggregates
description: Enable and configure field aggregates in Grid for Blazor.
slug: grid-aggregates
tags: telerik,blazor,grid,aggreagates,aggregate
published: True
previous_url: /components/grid/aggregates
position: 5
components: ["grid"]
---
# Grid Aggregates

The Grid component provides built-in aggregates for column values based on [grouping](slug:components/grid/features/grouping) and also a grand total row.

#### In this article:

* [Available Aggregate Functions](#available-aggregate-functions)
* [Where You Can Use Aggregates](#where-you-can-use-aggregates)
* [How to Enable Aggregates](#how-to-enable-aggregates)
* [Example](#example)
* [Notes](#notes)

## Available Aggregate Functions

There are several available aggregate functions under the `Telerik.Blazor.GridAggregateType` enum:

* `Average`
* `Count`
* `Max`
* `Min`
* `Sum`

The `Count` aggregate can be applied to any type of field. The other aggregates can only be applied to numerical fields (e.g., `int`, `decimal`, `double`, etc.).

## Where You Can Use Aggregates

You can use aggregates in the following templates:

* [`GroupFooterTemplate`](slug:grid-templates-column-group-footer) of a `GridColumn` - a footer in the respective column that renders when the grid is grouped.
* [`GroupHeaderTemplate`](slug:grid-templates-group-header) of a `GridColumn` - a header in the respective column that renders when the grid is grouped by that column. The `Value` field in the context carries the current group value.
* [`FooterTemplate`](slug:grid-templates-column-footer) of a `GridColumn` - a grand total row of footers for the entire grid.

## Access The Aggregate Values

You can access the aggregate values through the template `context`:

* All templates expose the aggregate values for the current column.
* The `context` of the `GroupHeaderTemplate` and the `GroupFooterTemplate` has an `AggregateResults` property of a type `Dictionary<string, GridGroupAggregateResult>`. This dictionary allows you to access the aggregates for the other columns in the Grid.

## How to Enable Aggregates

To enable aggregates:

1. Under the `GridAggregates` tag, define the `GridAggregate` entries to enable the aggregations per field you want to use.
1. If the Grid is bound to a [dynamic object (Expando)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/types/walkthrough-creating-and-using-dynamic-objects), set the `FieldType` attribute of the `GridAggregate` tag (it is of type `Type`).
1. Set the grid's `Groupable` property to `true`.
    * If you will be using only `FooterTemplate`s - grouping is not required.
1. Group the grid to see the effect on group-specific templates.


## Example

>caption Use Aggregates in the Telerik Blazor Grid

<demo metaUrl="client/grid/grouping/aggregates/" height="500"></demo>

>caption The result of the code snippet above after the grid has been grouped by the `Team` and `Active Projects` columns

![Blazor Grid Aggregates Overview](images/grid-aggregates-overview.png)


## Notes 

* You should define only aggregates that you will use to avoid unnecessary calculations that may be noticeable on large data sets.

* If you try to use an aggregate that is not defined, you will get a `null` value.
* If you try to use an aggregate that is not compatible with `Field` type, a runtime error will occur.

* If you update a field of a model the `Data` collection in the view-model, aggregates will not be updated automatically - the grid needs to re-evaluate that data first, and since this is an expensive operation a UI render does not trigger it. You can [update the data collection](slug:grid-refresh-data) yourself, or fetching it anew from the service (example [here](slug:grid-editing-overview), see how the Create/Update/Delete events fetch data anew).

* If you [bind the Grid via `OnRead` event](slug:components/grid/manual-operations), make sure to set `AggregateResults` in the `GridReadEventArgs` event argument object. Otherwise the Grid will calculate aggregates from the data on the current page only.

<div class="skip-repl"></div>

````CS
private async Task OnGridRead(GridReadEventArgs args)
{
    DataSourceResult result = AllGridData.ToDataSourceResult(args.Request);

    args.Data = result.Data;
    args.Total = result.Total;
    args.AggregateResults = result.AggregateResults;
}
````


## See Also

* [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
* [Blazor Grid](slug:grid-overview)
