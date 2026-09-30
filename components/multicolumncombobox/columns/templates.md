---
title: Templates
page_title: MultiColumnComboBox Column Templates
description: Column Templates in MultiColumnComboBox for Blazor.
slug: multicolumncombobox-columns-templates
tags: telerik,blazor,multicolumncombobox,combo,columns,headertemplate,celltemplate,templates
published: True
position: 10
components: ["multicolumncombobox"]
---

# MultiColumnComboBox Column Templates

This article explains the available templates for the Columns of the MultiColumnComboBox for Blazor.

* [`HeaderTemplate`](#headertemplate)
* [`Template`](#template)


## HeaderTemplate

The `HeaderTemplate` allows you to control the rendering of the column's header. You can define it for each of the columns of the MultiColumnComboBox.

>caption Use the HeaderTemplate to add an icon to the header cells

<demo metaUrl="client/multicolumncombobox/templates/example-2/" height="420"></demo>

## Template

The `Template` (Cell Template) allows you to control the rendering of the cells in the MultiColumnComboBox column. You can access the `context` object and cast it to the bound model to employ some custom business logic. The `contenxt` represents the current data item in the cell.

>caption Use the Template to visually distinguish some Ids

<demo metaUrl="client/multicolumncombobox/templates/example-3/" height="420"></demo>
