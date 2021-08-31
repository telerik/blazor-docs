---
title: Icons
page_title: Breadcrumb Icons
description: Icons and images in the Breadcrumb for Blazor.
slug: breadcrumb-icons
tags: telerik,blazor,breadcrumb,icons
published: True
position: 10
---

# Breadcrumb Icons

You can put an image, an icon class or a font icon for each item in the Breadcrumb to illustrate its purpose for your end users. To apply them, use the following properties:

* for a [Telerik font icon]({%slug general-information/font-icons%}), point the `IconField` parameter of the component to a `string` field of the model that contains the corresponding icon name.

* for a raster image, point the `ImageUrlField` parameter of the component to a `string` field of the model that contains the url to the image (relative or absolute).

* for a custom font icon class, point the `IconClassField` parameter of the component to a `string` field of the model that contains the desired CSS class list which provides the required rules (like font name and glyph symbol). Make sure to also reference the desired font in your app and to use its own recommendations.

The `IconClassField` and `ImageUrlField` are rendered, respectively, as `<span class="the custom class" />` and as `<img src="the-image-src" />`

>caption How to use icons in Telerik Breadcrumb. The result from the code snippet below.

![Breadcrumb Icons](images/)

````CSHTML
@* This example shows how to add icons to the Breadcrumb items *@


````



## See Also

  * [Live Demo: Breadcrumb Icons](https://demos.telerik.com/blazor-ui/breadcrumb/icons)
