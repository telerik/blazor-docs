---
title: Manual Data Source Operations
page_title: ListView - Manual Data Source Operations
description: How to implement your own read, page, filter, sort operations for the listview data.
slug: listview-manual-operations
tags: telerik,blazor,listview,manual,operadtions,onread
published: True
position: 5
components: ["listview"]
---

# Manual Data Source Operations

The ListView lets you fetch the current page of data on demand through the [`OnRead` event](slug:common-features-data-binding-onread). This can let you optimize database queries and return only a small number of records.

In this article you will find examples how to:
* implement [custom paging](#custom-paging)
* implement [filtering and sorting](#filter-and-sort)

## Custom Paging

This is, effectively, loading data on demand only when the user goes to a certain page, as opposed to the default case where you fetch all the data items initially.

To implement your own paging in the listview, you need to:
* Handle the `OnRead` event.
* Set the current page of data to the `args.Data` property of the event argument.
* Set the `args.Total` property to the total number of items on all pages, so that the pager displays correct information.
* Set the `TItem` attribute of the ListView to the model type.
* Do not set the component `Data` attribute.

>caption Custom Paging in the ListView

<demo metaUrl="client/listview/manual-operations/example-1/" height="620"></demo>

## Filter and Sort

While the listview does not have built-in UI for filtering and sorting like a grid does, you can add your own components to invoke such actions and simply update the data source of the component.

The example below shows a relatively simple way to filter and sort over all data in the current view model without loading data on demand.

>caption Filter and Sort data in a listview

<demo metaUrl="client/listview/manual-operations/example-2/" height="670"></demo>

>tip To optimize queries, you can store the `DataSourceRequest` from the `OnRead` event in a view-model field to easily access the current page.
>
> You can also use the Telerik extension methods - the `.ToDataSourceResult()` that takes a `DataSourceRequest` argument over the full collection of data and add filer and sort descriptors to it. Examples of doing that are available in the Live Demos: [ListView Filtering](https://demos.telerik.com/blazor-ui/listview/filtering) and [ListView Sorting](https://demos.telerik.com/blazor-ui/listview/sorting)

## See Also

* [Live Demo: ListView Filtering](https://demos.telerik.com/blazor-ui/listview/filtering)
* [Live Demo: ListView Sorting](https://demos.telerik.com/blazor-ui/listview/sorting)
