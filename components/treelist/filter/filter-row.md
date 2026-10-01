---
title: Filter Row
page_title: TreeList - Filter Row
description: Enable and configure Filter Row in TreeList for Blazor.
slug: treelist-filter-row
tags: telerik,blazor,TreeList,filtering,filter,row
published: True
position: 5
components: ["treelist"]
---

# TreeList Filter Row

One of the [filter modes of the treelist](slug:treelist-filtering) is a row of filter elements below the column headers.

In this article:

* [Basics](#basics)
* [Filter From Code](#filter-from-code)
* [Customization](#customization)

## Basics

To enable the TreeList filter row, set the component's `FilterMode` parameter to `TreeListFilterMode.FilterRow` and make sure that all filterable columns have their `Field` parameter set.

````RAZOR.skip-repl
<TelerikTreeList FilterMode="@TreeListFilterMode.FilterRow" />
````

The TreeList will render a row below the column headers with UI that you can use to fill in the filter criteria. You can type in the input to execute the default operator as you type, or click a button to choose a different filter operator (like "contains", "greater than" and so on). Filters are applied as the user types in the inputs. Once you enter a filter criteria, the clear button will be enabled to allow you to reset the filter state.

## Customization

You can customize the default behavior of the filter row with parameters of the columns and the TreeList.

### Configuring the Filter Row

You can override the default Filter Row behavior for each column through the following properties the `TreeListColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Filter Row Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example [Filter Row Template](slug:treelist-templates-filter#filter-row-template) article.

## Filter From Code

To learn how to programmatically filter the TreeList, refer to the [TreeList State](slug:treelist-state) documentation article. You can filter the TreeList on initial display with the [`OnStateInit` event](slug:treelist-state#onstateinit) or at any time afterwards with the [`SetStateAsync()` method](slug:treelist-state#methods).

## Example

>caption Using the TreeList Filter Row

<demo metaUrl="client/treelist/filter/filter-row/example-1/" height="720"></demo>

## See Also

* [Treelist Filtering Overview](slug:treelist-filtering)
* [Live Demo: TreeList Filter Row](https://demos.telerik.com/blazor-ui/treelist/filter-row)
