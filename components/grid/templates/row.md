---
title: Row
page_title: Grid - Row Template
description: Use a custom Telerik UI for Blazor Grid row template to control row markup, cells, and selected Grid features.
slug: grid-templates-row
tags: telerik,blazor,grid,templates,row
published: True
position: 10
components: ["grid"]
---

# Grid Row Template

The row template allows you to define the entire contents of the `<tr>` element that the Grid renders for each record. To set it, provide content to the `<RowTemplate>` inner tag of the Grid.

It can be convenient if you want to use templates for most or all of the columns, as it requires less markup than setting individual templates for many columns.

The contents of the row template must be `<td>` elements and their number (or total `colspan`) must match the number of columns defined in the grid.

You can use the `Context` attribute of the `<RowTemplate>` tag of the Grid to set the name of the context variable. Its type is the model type to which the Grid is bound.

>important Using the row template gives the application control over rendering, so the Grid cannot provide some built-in features. InCell and Inline editing cannot render editors, detail templates are unavailable, and column resizing, locking, visibility, and reordering affect only the headers. The application must implement checkbox selection. See [Implement Built-in Functions when Using Grid Row Template](slug:grid-kb-row-template-simulate-built-in-functions) for an example.

>caption Using a row template

<demo metaUrl="client/grid/templates-row/" height="550"></demo>

## Using Components in Grid Row Templates

@[template](/_contentTemplates/grid/common-link.md#using-components-in-templates)

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
* [Blazor Grid](slug:grid-overview)

