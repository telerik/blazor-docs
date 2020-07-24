---
title: Overview
page_title: TreeList - Templates Overview
description: Use custom templates in TreeList for Blazor.
slug: treelist-templates-overview
tags: telerik,blazor,TreeList,templates
published: True
position: 0
---

# TreeList Templates

You can customize the TreeList appearance and behavior through the various templates it provides so you can add more details for your users - such as format numbers and dates, show images and so on.

The TreeList component can use templates for: 

* [columns (cells)]({%slug treelist-templates-column%}) - the rendering of each cell (column). You can, for example, change string formats or add your own components.

* [editing of a cell]({%slug treelist-templates-editor%}) - when a cell is in edit mode, it will render this template where you can use custom editors, components and logic.

* [rows]({%slug treelist-templates-row%}) - the entire rendering of the `tr` element of the row, so you can fully customize the treelist behavior and rendering.

* [column header]({%slug treelist-templates-column-header%}) - the title portion of the column.


Like other Blazor content, most of them can receive a `context` argument that is the type of the model. To use templates, you must bind the treelist to a named model. The header templates are the exception as they are not related to rows and models.

You must make sure to provide valid HTML in the templates.

## See Also

 * [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)
 

