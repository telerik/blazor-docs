---
title: Manual Data Source Operations
page_title: Scheduler - Manual Operations
description: How to implement your own read and navigate operations for the scheduler appointments.
slug: scheduler-manual-operations
tags: telerik,blazor,scheduler,read,navigate,manual,data,data source
published: false
position: 15
components: ["scheduler"]
---

# Manual Data Source Operations

By default, the scheduler will receive the entire collection of appointments, and it will perform the necessary operations (like determining which ones to go into the current view) internally to it. You can perform these operations yourself by handling the `OnRead` event of the scheduler as shown in the example below. The data source will be read after each [navigation](slug:scheduler-navigation) as well, to ensure fresh data.

The parameter of type `DataSourceRequest` exposes information about the desired paging, filtering and sorting so you can, for example, call your remote endpoint with appropriate parameters so its performance is optimized and it fetches only the relevant data.

When the `OnRead` event is used, the internal operations are disabled and you must perform them all in the `OnRead` event. You must set the `args.Data` and `args.Total` properties of the event argument object. Do not set the component `Data` attribute when using `OnRead`.

## Examples

Below you can find a few examples of using the `OnRead` event to perform custom data source operations. They may not implement all operations for brevity. They showcase the basics only, and it is up to the application's data access layer to implement them. You can read more about implementing the CUD operations in the [CRUD Operations Overview](editing/overview) article.

The comments in the code provide explanations on what is done and why.

>tip You can also use a synchronous version of the event. Its signature is `void ReadItems(GridReadEventArgs args)`.

>caption Custom paging with a remote service

<demo metaUrl="client/scheduler/manual-operations/example-1/" height="780"></demo>

>caption If you have all the data at once, the Telerik .ToDataSourceResult(request) extension method can manage the operations for you

<demo metaUrl="client/scheduler/manual-operations/example-2/" height="780"></demo>



## See Also

* [CRUD Operations Overview](slug:grid-editing-overview)
* [Live Demo: Manual Data Source Operations](https://demos.telerik.com/blazor-ui/grid/manual-operations)
* [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)
  
