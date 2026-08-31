---
title: Templates
page_title: Breadcrumb - Templates
description: Templates for the Breadcrumb for Blazor.
slug: breadcrumb-templates
tags: telerik,blazor,breadcrumb,templates
published: True
position: 25
components: ["breadcrumb"]
---

# Breadcrumb Templates

The Breadcrumb can be customized by using Templates. This article explains the available templates for the component.

* [ItemTemplate](#itemtemplate)
* [SeparatorTemplate](#separatortemplate)

## ItemTemplate

The `<ItemTemplate>` controls the rendering of the [data bound items](slug:breadcrumb-data-binding) in the Breadcrumb, in case you want to use a rendering different than the default one.

This template receives a `context` argument that is of the data model type and represents the current item.

>caption Use `ItemTemplate` to control the rendering of the items in the Breadcrumb. The result from the snippet below.

<demo metaUrl="client/breadcrumb/templates/" height="300"></demo>


## SeparatorTemplate

The `<SeparatorTemplate>` allows you to control the rendering of the Breadcrumb Separator, so you can define custom content between the component items.

>caption Use `SeparatorTemplate` to customize the Breadcrumb Separator. The result from the snippet below.

<demo metaUrl="client/breadcrumb/templates/separator/" height="250"></demo>

## See Also

* [Live Demo: Breadcrumb Templates](https://demos.telerik.com/blazor-ui/breadcrumb/templates)
