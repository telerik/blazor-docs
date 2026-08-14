---
title: Templates
page_title: Rating Templates
description: Learn how to use the ItemTemplate to customize the styling and appearance of your Rating component for Blazor. 
slug: rating-templates
tags: telerik,blazor,rating,templates
published: True
position: 11
components: ["rating"]
---

# Templates

The Rating features templates that allow you to customize the component rendering and styling. This article describes all available templates and explains how to use them.

* [Item Template](#item-template)

## Item Template

The Rating `ItemTemplate` enables you to change the default HTML output and CSS styling of the items (icons).

The `<ItemTemplate>` tag is a Blazor `RenderFragment`. It exposes a `context` variable that is the current data item object and you can access its properties directly without casting.

<demo metaUrl="client/rating/templates/" height="300"></demo>

## See Also

* [Live Demo: Rating Templates](https://demos.telerik.com/blazor-ui/rating/templates)