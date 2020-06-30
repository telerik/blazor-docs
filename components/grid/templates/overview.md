---
title: Overview
page_title: Grid | Templates Overview
description: Use custom templates in Grid for Blazor
slug: components/grid/features/templates
tags: telerik,blazor,grid,templates
published: True
previous_url: /grid/templates
position: 0
---

# Grid Templates

You can customize the grid appearance and behavior through the various templates it provides so you can add more details for your users such as aggregate data, format numbers and dates, use custom editing logic, implement custom filters and more.

The Grid component can use templates for: 

* [columns (cells)]({%slug grid-templates-column%}) - the rendering of each cell (column). You can, for example, change string formats or add your own components.

* [rows]({%slug grid-templates-row%}) - the entire rendering of the `tr` element of the row, so you can fully customize the grid behavior and rendering.

* [editing of a field]({%slug grid-templates-editor%}) - when a cell is in edit mode, it will render this template where you can use custom editors, components and logic.

* [column header]({%slug grid-templates-column-header%}) - the title portion of the column.

* [column group footer]({%slug grid-templates-column-group-footer%}) - the footer of the column when the grid is [grouped]({%slug components/grid/features/grouping%}). You can use it, for example, to display [aggregates]({%slug grid-aggregates%}).

* [group header]({%slug grid-templates-group-header%}) - the shared section that denotes each grid [group]({%slug components/grid/features/grouping%}).

* [filter]({%slug grid-templates-filter%})  - the content of the filter cell or filter menu where you can implement custom rendering and logic for the filters.



Like other Blazor content, most of them can receive a `context` argument that is the type of the model. To use templates, you must bind the grid to a named model. The filter templates are the exception as they are not related to rows and models.

You must make sure to provide valid HTML in the templates.

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/customeditor)

