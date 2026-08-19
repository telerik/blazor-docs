---
title: Column Footer
page_title: Grid - Column Footer Template
description: Use custom column footer templates for grand total data in Grid for Blazor.
slug: grid-templates-column-footer
tags: telerik,blazor,grid,templates,column,footer,grand,total
published: True
position: 20
components: ["grid"]
---

# Column Footer Template

You can display a grand total row at the bottom of the grid through the `FooterTemplate` of each [bound](slug:components/grid/columns/bound) column.

You can use [aggregates](slug:grid-aggregates) for the current field directly from the `context`, and its `AggregateResults` field lets you get aggregates for other fields that you have defined through their field name and aggregate function.


>caption Footer Template with grand total data

<demo metaUrl="client/grid/templates-column-footer/"/></demo>

## Using Components in Grid Column Footer Templates

@[template](/_contentTemplates/grid/common-link.md#using-components-in-templates)

## Notes

Footer templates usually display aggregates. Here are some things to keep in mind.

* Aggregate results are based on all the data across all pages.
* Aggregate results are calculated over filtered data only.
* Footer Templates are not available for the `GridCheckboxColumn` and the `GridCommandColumn`.


## See Also

* [Live Demo: Grid Footer Template](https://demos.telerik.com/blazor-ui/grid/footer-template)
* [Blazor Grid](slug:grid-overview)

