---
title: Column (Cell)
page_title: Grid - Column (Cell) Template
description: Use custom column and cell templates in Grid for Blazor.
slug: grid-templates-column
tags: telerik,blazor,grid,templates,column,cell
published: True
position: 5
components: ["grid"]
---
# Column Template

By default, each Grid cell renders the value of the respective column `Field` of the current data item (row). You can change this behavior by using a column `Template` and adding your own content or logic.

## Basics

To define a column template, use a `<Template>` tag inside the `<GridColumn>` tag. The Grid uses the defined `Template` to show the "view" representation of all cells in that column. This also includes cells from [columns that are marked as `Editable="false"`](slug:components/grid/columns/bound#data-operations), while the cells' parent row is in [inline edit mode](slug:grid-editing-inline).

Visual Studio tends to autocomplete the `<Template>` tag with a lowercase `t` which breaks the template logic and does not allow you to access the `context`. Ensure the `Template` tag uses a capital `T`. 

### Template Context

The Grid column template exposes a `context` variable, which is the respective item from the Grid data collection. Cast the `context` to your Grid model type in order to access and use its properties. [Rename the `context` variable when using nested templates, for example a Grid column `Template` inside a Grid `DetailTemplate`](slug:nest-renderfragment).

>tip If you only want to format numbers, dates, enums, you can do so with the [DisplayFormat feature](slug:grid-columns-displayformat) without the need to declare a template.

## Example

The example below shows how to:

* Define a Grid column `Template`.
* Cast and access the template `context`.
* Render HTML or nest components in the column template.
* Use inline or multi-line template.

>caption Using Grid cell (column) template

<demo metaUrl="client/grid/templates/column/" height="500"></demo>

>tip The above example renders read-only checkboxes to display boolean values. You can also [use checkboxes in display mode and directly change the underlying data source values](slug:grid-kb-checkbox-editing). This can make boolean value editing faster, because the Grid doesn't go into edit mode.

## Using Components in Grid Column Templates

@[template](/_contentTemplates/grid/common-link.md#using-components-in-templates)

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
* [Blazor Grid](slug:grid-overview)
