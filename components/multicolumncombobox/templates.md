---
title: Templates
page_title: MultiColumnComboBox - Templates
description: Templates in the ComboBox for Blazor.
slug: multicolumncombobox-templates
tags: telerik,blazor,combo,combobox,templates
published: True
position: 25
components: ["multicolumncombobox"]
---

# MultiColumnComboBox Templates

The MultiColumnComboBox component allows you to change what is rendered in its header and footer through templates.

>caption In this article:

* [Row Template](#row-template)
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)
* [Example](#example)

## Row Template

The `RowTemplate` allows you to control the rendering of each whole row in the dropdown. Use a row template if separate [column templates](slug:multicolumncombobox-columns-templates) do not allow enough customization.

You can access the `context` object and cast it to the bound model to employ some custom business logic. The `contenxt` represents the current data item for the row.

> The MultiColumnComboBox items render as a list (`<ul>`), not a `<table>`. Using table cells inside the row template is possible only if you render a complete table for each item. To mimic the default component appearance, use two sibling containers inside the `<RowTemplate>` with a `k-table-td` CSS class.

## Header Template

@[template](/_contentTemplates/dropdowns/templates.md#header-template)

## Footer Template

@[template](/_contentTemplates/dropdowns/templates.md#footer-template)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

## Example

>caption Using MultiColumnComboBox Templates

<demo metaUrl="client/multicolumncombobox/templates/example-1/" height="520"></demo>

## See Also

* [Live Demo: MultiColumnComboBox Templates](https://demos.telerik.com/blazor-ui/multicolumncombobox/templates)
