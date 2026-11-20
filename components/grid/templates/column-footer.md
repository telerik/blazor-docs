---
title: Column Footer
page_title: Grid - Column Footer Template
description: Use custom Telerik UI for Blazor Grid column footer templates to display grand totals and other footer content.
slug: grid-templates-column-footer
tags: telerik,blazor,grid,templates,column,footer,grand,total
published: True
position: 20
components: ["grid"]
---

# Grid Column Footer Template

You can display a grand total row at the bottom of the Grid through the `FooterTemplate` of each [bound Grid column](slug:components/grid/columns/bound).

You can use [aggregates](slug:grid-aggregates) for the current field directly from the `context`, and its `AggregateResults` field lets you get aggregates for other fields that you have defined through their field name and aggregate function.


>caption Footer Template with grand total data

<demo metaUrl="client/grid/templates-column-footer/" height="400"></demo>

## Using Components in Grid Column Footer Templates

@[template](/_contentTemplates/grid/common-link.md#using-components-in-templates)

## Notes

The following note applies to column footer templates:

Footer templates usually display aggregates. Here are some things to keep in mind.

* Aggregate results are based on all the data across all pages.
* Aggregate results are calculated over filtered data only.
* Footer Templates are not available for the `GridCheckboxColumn` and the `GridCommandColumn`.


## See Also

* [Live Demo: Grid Footer Template](https://demos.telerik.com/blazor-ui/grid/footer-template)
* [Blazor Grid](slug:grid-overview)

