---
title: Icons
page_title: Breadcrumb - Icons
description: Icons and images in the Breadcrumb for Blazor.
slug: breadcrumb-icons
tags: telerik,blazor,breadcrumb,icons
published: True
position: 10
---

# Breadcrumb Icons

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the Breadcrumb item by assigning a `string` to the `IconField` parameter.

>caption How to use icons in Telerik Breadcrumb.

````CSHTML
    <TelerikBreadcrumb Data="@Data"></TelerikBreadcrumb>

@code {
    public IEnumerable<BreadcrumbItem> Data = new List<BreadcrumbItem>();

    protected override void OnInitialized()
    {
        Data = new List<BreadcrumbItem>
        {
            new BreadcrumbItem { Title = "Home", Icon = FontIcon.Home },
            new BreadcrumbItem { Text = "General", Icon = FontIcon.Globe, Disabled = true },
            new BreadcrumbItem { Text = "Activities" },
            new BreadcrumbItem { Text = "Drawing", Icon = FontIcon.Palette },
            new BreadcrumbItem { Icon = FontIcon.Photos },
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Title { get; set; }
        public FontIcon? Icon { get; set; }
        public bool Disabled { get; set; }
    }
}
````


## See Also

  * [Live Demo: Breadcrumb Items](https://demos.telerik.com/blazor-ui/breadcrumb/items)
