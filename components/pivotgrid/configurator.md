---
title: Configurator
page_title: PivotGrid Configurator
description: The PivotGrid configurator allows end users to control the fields, columns, rows and values (measures), which the Telerik UI for Blazor PivotGrid will show.
slug: pivotgrid-configurator
tags: telerik,blazor,pivotgrid
published: True
position: 20
---

# PivotGrid Configurator

This article describes the appearance and behavior of the PivotGrid configurator.

## Sections

The Pivot Grid Configurator contains the following sections:

* [Fields](#fields)
* [Columns](#columns-and-rows)
* [Rows](#columns-and-rows)
* [Values](#values)
* [Buttons](#buttons)


## Fields

**Fields** display in a TreeView with checkboxes. Here is how they work:

* The TreeView items and their checkbox state are populated automatically, based on the PivotGrid data and initial configuration.
* Users can check and uncheck TreeView items, which will add or remove the respective Field in the Columns or Rows sections.
* If a field is defined in a `<PivotGridRow>` or `<PivotGridColumn>` tag in the Pivot Grid, then users cannot use that field in another Configurator section.
* If a field is not defined anywhere in the PivotGrid declaration, then checking a TreeView checkbox will add it as a *column field*. Then, the user can drag it to another section.


## Columns and Rows

The **Columns** section of the Configurator shows all fields that are currently used as column headers.

The **Rows** section shows the fields that are used as row headers.

The Row and Column fields support sorting and filtering of the field values. User should click the three dots in each chip to open a context menu with these options.


## Values

The **Values** section of the Configurator shows all fields that are currently used as measures (dimensions).


## Buttons

The bottom section of the Configurator renders *Apply* and *Cancel* buttons. End users should click them after adding or removing fields to the Columns, Rows and Values sections.

The following user actions do not require users to click on *Apply*:

* Reordering already added fields via dragging
* Sorting
* Filtering


## Example

Refer to the [example of a Pivot Grid using an XMLA Data Provider Type](slug:pivotgrid-data-binding#xmla).


## Next Steps

* [Implement PivotGrid templates](slug:pivotgrid-templates)


## See Also

* [Live PivotGrid Demos](https://demos.telerik.com/blazor-ui/pivotgrid/overview)
* [PivotGrid API Reference](slug:Telerik.Blazor.Components.TelerikPivotGrid-1)
