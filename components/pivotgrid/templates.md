---
title: Templates
page_title: PivotGrid Templates
description: Learn about the templates of the Telerik UI for Blazor PivotGrid.
slug: pivotgrid-templates
tags: telerik,blazor,pivotgrid
published: True
position: 30
components: ["pivotgrid"]
---

# PivotGrid Templates

This article describes the PivotGrid templates. They allow you to customize the content and appearance of the PivotGrid row headers, column headers and data cells.

Each template is defined at component level. So for example the column header template applies to all column fields and headers.

* [`ColumnHeaderTemplate`](#column-header-template)
* [`DataCellTemplate`](#data-cell-template)
* [`RowHeaderTemplate`](#row-header-template)
* [Example](#example)


## Column Header Template

Define a column header template with a `<ColumnHeaderTemplate>` component. The `context` is of type `PivotGridColumnHeaderTemplateContext` and has a `Text` property, which is the original header label (field value).


## Data Cell Template

Define a data cell template with a `<DataCellTemplate>` component. The `context` is of type `PivotGridDataCellTemplateContext`. The `context` exposes `Value` (`object`) and `FormattedValue` (`string`) properties.

* You may need to cast the `Value` property to the correct type before usage.
* Depending on the Pivot Grid data and configuration, the `Value` property may be `null` and the `FormattedValue` may be an empty string.


## Row Header Template

Define a row header template with a `<RowHeaderTemplate>` component. The `context` is of type `PivotGridRowHeaderTemplateContext` and has a `Text` property, which is the original header label (field value).


## Example

All template components expose an optional `Context` parameter. Set it in scenarios with nested templates of different components, otherwise you will get an error [*Child content element uses the same parameter name ('context')*](slug:nest-renderfragment). The example below sets a custom `Context` name for the `DataCellTemplate`.

>caption Using PivotGrid header and data cell templates

<div class="skip-repl"></div>
<demo metaUrl="client/pivotgrid/templates/example-1/" height="420"></demo>


## See Also

* [Live PivotGrid Demos - Templates](https://demos.telerik.com/blazor-ui/pivotgrid/templates)
* [PivotGrid API Reference](slug:Telerik.Blazor.Components.TelerikPivotGrid-1)
