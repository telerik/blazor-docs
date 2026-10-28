---
title: Paging
page_title: TreeList - Paging
description: Enable and configure paging in TreeList for Blazor.
slug: treelist-paging
tags: telerik,blazor,treelist,paging
published: True
position: 20
components: ["treelist"]
---

# TreeList Paging 

The TreeList component offers support for paging.

>caption In this article:

* [Basics](#basics)
* [Events](#events)
* [Pager Settings](#pager-settings)


## Basics

* To enable paging, set the TreeList `Pageable` parameter to `true`.
* Set the number of items rendered at once with the `PageSize` parameter (defaults to 10).
* If needed, set the current page of the TreeList through its integer `Page` property.
* You can further customize the pager interface via additional [pager settings](#pager-settings).

Paging is calculated for the currently expanded and visible items. Children in collapsed nodes are not included in the total count and in the current page. Thus, expanding or collapsing a node (row) can change the items you see on the current page.

>caption Enable paging in Telerik TreeList

<demo metaUrl="client/treelist/paging/example-1/" height="720"></demo>

>tip You can bind the values of those properties to variables in the `@code {}` section. If you want to bind the page index to a variable, you must use the `@bind-Page="@MyPageIndexVariable"` syntax.

Here is one way to implement a page size choice that puts all records on one page.

>caption Bind Page Size to a variable

<demo metaUrl="client/treelist/paging/example-2/" height="720"></demo>

## Events

The TreeList exposes several relevant events. You can find related examples in the [Events](slug:treelist-events) article.

* `PageChanged` - you can use this to react to the user changing the page.
* `PageSizeChanged` - fires when the user changes the page size via the pager DropDownList.


## Pager Settings

In addition to `Page` and `PageSize`, the TreeList provides advanced pager configuration options via the `TreeListPagerSettings` tag, which is nested inside `TreeListSettings`. These configuration attributes include:

@[template](/_contentTemplates/common/pager-settings.md#pager-settings)

<demo metaUrl="client/treelist/paging/example-3/" height="720"></demo>

## See Also

* [Live Demo: TreeList Paging](https://demos.telerik.com/blazor-ui/treelist/paging)
