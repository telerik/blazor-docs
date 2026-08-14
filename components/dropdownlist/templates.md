---
title: Templates
page_title: DropDown List - Templates
description: Templates in the DropdownList for Blazor.
slug: components/dropdownlist/templates
tags: telerik,blazor,dropdownlist,dropdown,list,templates
published: True
position: 25
components: ["dropdownlist"]
---

# DropDownList Templates

The DropDownList component allows you to change what is rendered in its items, body, header and footer through templates.

>caption In this article:

* [Value Template](#value-template)
* [Item Template](#item-template)
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)
* [Example](#example)


## Value Template

The `ValueTemplate` determines how the selected item renders in the main element of the dropdown list that is always visible. By default, the text from the model is rendered.

The `ValueTemplate` exposes a `context` which represents the selected item object. Use it to render the selected item details.

## Item Template

@[template](/_contentTemplates/dropdowns/templates.md#item-template)

## Header Template

@[template](/_contentTemplates/dropdowns/templates.md#header-template)

## Footer Template

@[template](/_contentTemplates/dropdowns/templates.md#footer-template)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

## Example

>caption Using AutoComplete Templates

<demo metaUrl="client/dropdownlist/templates/" height="500"></demo>

## See Also

* [Live Demo: DropDownList Templates](https://demos.telerik.com/blazor-ui/dropdownlist/templates)
* [Blazor DropDownList](slug:components/dropdownlist/overview)