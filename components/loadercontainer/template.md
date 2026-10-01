---
title: Template
page_title: LoaderContainer Template
description: Template in the LoaderContainer for Blazor.
slug: loadercontainer-template
tags: telerik,blazor,loader,container,loadercontainer,templates
published: True
position: 10
components: ["loadercontainer"]
---

# LoaderContainer Template

The `Template` allows you to control the rendering of the LoaderContainer. When you are using the `Template` there will be no panel rendered by default.

This article provides examples that show how to:

* [Create a Custom LoaderContainer](#create-a-custom-loadercontainer)
* [Implement a Custom Panel](#implement-a-custom-panel)


## Create a Custom LoaderContainer

This example shows how to change the contents of the loading text and animation that are shown by default. Once you set the template up, the default white background of that container will be gone so you can have full control over its appearance.

<demo metaUrl="client/loadercontainer/template/example-1/" height="420"></demo>

## Implement a Custom Panel

You can use CSS to target the DOM elements that create the Panel around the template so you can style them as required. By default, the Panel is white to contrast with the default dark overlay. This example shows how you can customize its color and content.


<demo metaUrl="client/loadercontainer/template/example-2/" height="420"></demo>

## See Also

* [Live Demo: LoaderContainer](https://demos.telerik.com/blazor-ui/loadercontainer/overview)
* [Appearance Settings](slug:loadercontainer-appearance)
   
