---
title: Filter Row
page_title: Grid - Filter Row
description: Enable and configure Filter Row in Grid for Blazor.
slug: grid-filter-row
tags: telerik,blazor,grid,filtering,filter,row
published: True
position: 5
components: ["grid"]
---
# Grid Filter Row

The FilterRow filtering mode renders a row below the column headers, providing a UI where you can fill in the filter criteria.

The Grid applies the filters as the user types in the filtering input. 

## Enabling Filter Row

Set the `FilterMode` parameter of the Telerik Grid to `GridFilterMode.FilterRow`.

> The default filter operator is `Contains` for `string` columns and `IsEqualTo` for numbers and dates. Boolean columns display a filtering drop down that effectively combines the filter operator and value.

>caption Filter Row in Telerik Grid

<demo metaUrl="client/grid/filter/filter-row/" height="500"></demo>


## Filter From Code

To learn how to programmatically filter the Grid, refer to the [Grid State](slug:grid-state) documentation article.

@[template](/_contentTemplates/grid/state.md#initial-state)

## Customization

You can customize the default behavior of the `FilterRow` in a couple ways:

### Configuring the Filter Row

You can override the default Filter Row behavior for each column through the following properties the `GridColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

>caption Configure the Filter Row

<demo metaUrl="client/grid/filter/filter-row-configuration/" height="500"></demo>

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Filter Row Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter Row Template](slug:grid-templates-filter#filter-row-template) article.

## See Also

  * [Grid Filtering Overview](slug:components/grid/filtering)
  * [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
  * [Blazor Grid](slug:grid-overview)
