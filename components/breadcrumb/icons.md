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

* for a raster image, point the `ImageUrlField` parameter of the component to a `string` field of the model that contains the `url` to the image (relative or absolute).

* for a custom font icon class, point the `IconClassField` parameter of the component to a `string` field of the model that contains the desired CSS class list which provides the required rules (like font name and glyph symbol). Make sure to also reference the desired font in your app and to use its own recommendations.

The `IconClassField` and `ImageUrlField` are rendered, respectively, as `<span class="the custom class" />` and as `<img src="the-image-src" />`

>caption How to use icons in Telerik Breadcrumb. The result from the code snippet below.

![Breadcrumb Icons](images/breadcrumb-icons-example.png)

````CSHTML
@* This example shows how to add icons or images to Breadcrumb items. 
   Make sure that you also reference the OpenIconic font that comes with the Blazor App template to see the custom font icon *@

<TelerikBreadcrumb Data="@Items"
                   IconField="@nameof(BreadcrumbItem.TelerikIcon)"
                   IconClassField="@nameof(BreadcrumbItem.MyIconClass)"
                   ImageUrlField="@nameof(BreadcrumbItem.MyImage)">
</TelerikBreadcrumb>

@code {
    public IEnumerable<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
            new BreadcrumbItem
            {
                Text = "Home",
                TelerikIcon = "home"
            },
            new BreadcrumbItem
            {
                Text = "Settings",
                MyIconClass = "oi oi-wrench"
            },
            new BreadcrumbItem
            {
                Text = "Favourites",
                MyImage = "https://docs.telerik.com/blazor-ui/images/star.png"
            }
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string TelerikIcon { get; set; }
        public string MyIconClass { get; set; }
        public string MyImage { get; set; }
    }
}
````


## See Also

  * [Live Demo: Breadcrumb Items](https://demos.telerik.com/blazor-ui/breadcrumb/items)
