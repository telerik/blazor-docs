---
title: Paging
page_title: Grid - Paging
description: Enable and configure paging in Grid for Blazor.
slug: components/grid/features/paging
tags: telerik,blazor,grid,paging
published: True
position: 20
components: ["grid"]
---

# Grid Paging

The Grid component can page the entire data source automatically. Alternatively, you can hook to an event and fetch each page of data yourself.

>caption In this article:

* [Basics](#basics)
* [Events](#events)
* [Pager Settings](#pager-settings)
* [More Examples](#more-examples)


## Basics

* To enable paging, set the Grid `Pageable` parameter to `true`.
* Set the number of items rendered at once with the `PageSize` parameter (defaults to 10).
* If needed, set the current page of the Grid through its integer `Page` property.
* You can further customize the pager interface via additional [pager settings](#pager-settings).

>caption Enable paging in Telerik Grid

<demo metaUrl="client/grid/paging/"></demo>

>note If you want to bind the page index to a variable, you must use two-way binding - the `@bind-Page="@MyPageIndexVariable"` syntax. If you only use one-way binding -  `Page="@MyPageIndexVariable"` - the grid will reset to the value of that parameter on every re-render. If you choose to use one-way binding, you must update the field value in the [`PageChanged` event](slug:grid-events#pagechanged) to avoid that.

Here is one way to implement a page size choice that puts all records on one page.

>caption Bind Page Size to a variable

<demo metaUrl="client/grid/paging-page-size/"></demo>

## Events

The Grid exposes several relevant events. You can find related examples in the [Events](slug:grid-events) article.

* `PageChanged` - you can use this to react to the user changing the page.
* `PageSizeChanged` - fires when the user changes the page size via the pager DropDownList.
* `OnRead` - you can use this to perform the read operation yourself on demand, instead of providing the entire data source at once. You can read more about this in the [Manual Data Source Operations](slug:components/grid/manual-operations) article.

## Pager Settings  

In addition to `Page` and `PageSize`, the Grid provides advanced pager configuration options via the `GridPagerSettings` tag, which is nested inside `GridSettings`. These configuration attributes include:

@[template](/_contentTemplates/common/pager-settings.md#pager-settings)

<demo metaUrl="client/grid/paging-settings/"></demo>

## More Examples

The following articles and sample projects can be helpful when implementing paging:

* [Capture PageChanged Event](slug:grid-events#pagechanged)

* [Server Paging](slug:components/grid/manual-operations) - this article explains how to implement manual data source operations so you can offload the work to the server. It provides the overview of how to setup the grid for that, and examples - several with local data and links a repository with examples using REST API endpoints.

* [How to Increase the DropDownList Width of the Pager](slug:pager-kb-dropdown-width)

* [How to Integrate Top and Bottom Pager](https://demos.telerik.com/blazor-ui/pager/integration)

## See Also

* [Live Demo: Grid Paging](https://demos.telerik.com/blazor-ui/grid/paging)
* [Blazor Grid](slug:grid-overview)
