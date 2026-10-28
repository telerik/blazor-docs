---
title: Aggregates
page_title: Grid - Aggregates
description: Configure Telerik UI for Blazor Grid aggregates in group headers, group footers, and the grand total row.
slug: grid-aggregates
tags: telerik,blazor,grid,aggregates,aggregate
published: True
previous_url: /components/grid/aggregates
position: 5
components: ["grid"]
---

# Grid Aggregates

The Grid component provides built-in aggregates for column values based on [grouping](slug:components/grid/features/grouping) and also a grand total row.

## In This Article

* [Available Aggregate Functions](#available-aggregate-functions)
* [Where You Can Use Aggregates](#where-you-can-use-aggregates)
* [How to Enable Aggregates](#how-to-enable-aggregates)
* [Aggregates Example](#aggregates-example)
* [Aggregate Notes](#aggregate-notes)

## Available Aggregate Functions

There are several available aggregate functions under the `Telerik.Blazor.GridAggregateType` enum:

* `Average`
* `Count`
* `Max`
* `Min`
* `Sum`

The `Count` aggregate can be applied to any field type. Apply the other aggregates only to numeric fields such as `int`, `decimal`, and `double`.

## Where You Can Use Aggregates

You can use aggregates in the following templates:

* [`GroupFooterTemplate`](slug:grid-templates-column-group-footer) of a `GridColumn`&mdash;a footer in the respective column that renders when the Grid is grouped.
* [`GroupHeaderTemplate`](slug:grid-templates-group-header) of a `GridColumn`&mdash;a header in the respective column that renders when the Grid is grouped by that column. The `Value` field in the context carries the current group value.
* [`FooterTemplate`](slug:grid-templates-column-footer) of a `GridColumn`&mdash;a grand total row of footers for the entire Grid.

## Accessing Aggregate Values

You can access the aggregate values through the template `context`:

* All templates expose the aggregate values for the current column.
* The `context` of the `GroupHeaderTemplate` and the `GroupFooterTemplate` has an `AggregateResults` property of a type `Dictionary<string, GridGroupAggregateResult>`. This dictionary allows you to access the aggregates for the other columns in the Grid.

## How to Enable Aggregates

To enable aggregates:

1. Under the `GridAggregates` tag, define the `GridAggregate` entries to enable the aggregations per field you want to use.
1. If the Grid is bound to a [dynamic object (Expando)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/types/walkthrough-creating-and-using-dynamic-objects), set the `FieldType` attribute of the `GridAggregate` tag (it is of type `Type`).
1. Set the Grid's `Groupable` property to `true`.
    * If you use only `FooterTemplate`s, grouping is not required.
1. Group the Grid to see the effect on group-specific templates.


## Aggregates Example

>caption Use Aggregates in the Telerik Blazor Grid

<demo metaUrl="client/grid/grouping-aggregates/" height="600"></demo>

## Aggregate Notes

* Define only the aggregates that you use to avoid unnecessary calculations that may affect large data sets.

* If you use an aggregate that is not defined, the value is `null`.
* If you try to use an aggregate that is not compatible with `Field` type, a runtime error will occur.

* If you update a field of a model in the `Data` collection, aggregates are not updated automatically. The Grid must re-evaluate the data first, and a UI render does not trigger this expensive operation. You can [update the data collection](slug:grid-refresh-data) yourself or fetch it again from the service. See the [Grid CRUD operations](slug:grid-editing-overview) article for an example of fetching data in the Create, Update, and Delete events.

* If you [bind the Grid via `OnRead` event](slug:components/grid/manual-operations), make sure to set `AggregateResults` in the `GridReadEventArgs` event argument object. Otherwise the Grid will calculate aggregates from the data on the current page only.

<div class="skip-repl"></div>

````C#
private async Task OnGridRead(GridReadEventArgs args)
{
    DataSourceResult result = await AllGridData.ToDataSourceResultAsync(args.Request);

    args.Data = result.Data;
    args.Total = result.Total;
    args.AggregateResults = result.AggregateResults;
}
````


## See Also

* [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
* [Blazor Grid](slug:grid-overview)
