---
title: Templates
page_title: MultiSelect - Templates
description: Templates in the MultiSelect for Blazor.
slug: multiselect-templates
tags: telerik,blazor,multiselect,templates
published: True
position: 20
components: ["multiselect"]
---

# MultiSelect Templates

The MultiSelect component allows you to change what is rendered in its items, header and footer through templates.

>caption In this article:

* [Item Template](#item-template)
* [Tag Template](#tag-template)
* [Summary Tag Template](#summary-tag-template)
* [Header Template](#header-template)
* [Footer Template](#footer-template)
* [No Data Template](#no-data-template)
* [Example](#example)

## Item Template

@[template](/_contentTemplates/dropdowns/templates.md#item-template)

Using a MultiSelect `ItemTemplate` together with [`EnableCheckBoxes="true"`](slug:multiselect-overview#checkboxes) does not remove the built-in item checkboxes.

## Tag Template

@[template](/_contentTemplates/dropdowns/templates.md#tag-template)

## Summary Tag Template

The `SummaryTagTemplate` controls the rendering of the summary tag. The Multiselect renders a summary tag in the following cases:
* In [Single Tag Mode](slug:multiselect-tag-mode#single-mode).
* In Multiple Tag Mode&mdash;[when the selected items are more than the `MaxAllowedTags`](slug:multiselect-tag-mode#summarized-tags-based-on-the-number-of-selections).

The context of the `SummaryTagTemplate` is of type `MultiSelectSummaryTagTemplateContext<TItem>`. It provides an `Items` field (a `List<TItem>`) that contains the selected items.

## Header Template

@[template](/_contentTemplates/dropdowns/templates.md#header-template)

## Footer Template

@[template](/_contentTemplates/dropdowns/templates.md#footer-template)

## No Data Template

@[template](/_contentTemplates/dropdowns/templates.md#no-data-template)

## Example

>caption Using MultiSelect Templates

<demo metaUrl="client/multiselect/templates/example-1/" height="420"></demo>

## See Also

* [Live Demo: MultiSelect Templates](https://demos.telerik.com/blazor-ui/multiselect/templates)
   
  
