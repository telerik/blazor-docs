---
title: Overview
page_title: Grid - Templates Overview
description: Learn how to use Telerik UI for Blazor Grid templates to customize columns, rows, editors, filters, headers, footers, and the pager.
slug: components/grid/features/templates
tags: telerik,blazor,grid,templates
published: True
previous_url: /grid/templates
position: 0
components: ["grid"]
---

# Grid Templates Overview

You can customize the grid appearance and behavior through the various templates it provides so you can add more details for your users such as aggregate data, format numbers and dates, use custom editing logic, implement custom filters and more.

The Grid component can use templates for: 

* [Columns (cells)](slug:grid-templates-column)&mdash;the rendering of each cell (column). You can, for example, change string formats or add your own components.

* [Rows](slug:grid-templates-row)&mdash;the entire rendering of the `tr` element of the row, so you can fully customize Grid behavior and rendering.

* [Editing of a field](slug:grid-templates-editor)&mdash;when a cell is in edit mode, it renders this template where you can use custom editors, components, and logic.

* [Column header](slug:grid-templates-column-header)&mdash;the title portion of the column.

* [Column group footer](slug:grid-templates-column-group-footer)&mdash;the footer of the column when the Grid is [grouped](slug:components/grid/features/grouping). You can use it, for example, to display [aggregates](slug:grid-aggregates).

* [Column footer](slug:grid-templates-column-footer)&mdash;the footer of the column for the Grid grand total row.

* [Group header](slug:grid-templates-group-header)&mdash;the shared section that denotes each Grid [group](slug:components/grid/features/grouping).

* [Filter](slug:grid-templates-filter)&mdash;the content of the filter cell or filter menu where you can implement custom rendering and logic for filters.

* [No data available](slug:grid-templates-no-data)&mdash;when the Grid `Data` collection is empty or null, you can customize the content inside.

* [Column chooser](slug:grid-templates-column-chooser)&mdash;the contents of the column chooser in the Column Menu. You can use this template to provide custom rendering.

* [Pager](slug:grid-templates-pager)&mdash;the template modifies the layout, content, and functionality of the Pager.

* [Command column header](slug:grid-templates-command-column-header)&mdash;the header content for a Grid command column.

* [Popup buttons](slug:grid-templates-popup-buttons)&mdash;the buttons in the Grid popup edit form.

* [Popup form](slug:grid-templates-popup-form)&mdash;the content and layout of the Grid popup edit form.


Like other Blazor content, most of them can receive a `context` argument that is the type of the model. To use templates, you must bind the grid to a named model. The filter and header templates are the exception as they are not related to rows and models.

You must make sure to provide valid HTML in the templates.

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
* [Blazor Grid](slug:grid-overview)

