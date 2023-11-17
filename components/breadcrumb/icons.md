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

You can add [Telerik Font or SVG icons]({%slug common-features-icons%}) to the Breadcrumb items. The component also supports custom icons.

To use Breadcrumb icons, define a property in the component model class and assign the property name to the `IconField` parameter of the Breadcrumb. The model property can hold a `FontIcon` enum, an `ISvgIcon`, or a `string` that signifies a CSS class.

If the icon property name in the Breadcrumb model is `Icon`, there is no need to set the `IconField` parameter.

>caption How to use icons in Telerik Breadcrumb

````CSHTML
<TelerikBreadcrumb Data="@Data"></TelerikBreadcrumb>

<style>
    /* Third-party icon libraries should provide these styles out-of-the-box. */
    /* You may need two CSS classes for the same element - 
        one for base icon styles and one for the specific icon glyph. */

    .my-icon {
        width: 1em;
        height: 1em;
        font-size: 16px;
        background: purple;
    }
</style>

@code {
    public IEnumerable<BreadcrumbItem> Data = new List<BreadcrumbItem>();

    protected override void OnInitialized()
    {
        Data = new List<BreadcrumbItem>
        {
            new BreadcrumbItem { Title = "Home (Font)", Icon = SvgIcon.Home },
            new BreadcrumbItem { Text = "General", Icon = SvgIcon.Globe, Disabled = true },
            new BreadcrumbItem { Text = "Activities" },
            new BreadcrumbItem { Text = "Drawing (SVG)", Icon = SvgIcon.Palette },
            new BreadcrumbItem { Text = "Custom", Icon = "my-icon" },
            new BreadcrumbItem { Icon = SvgIcon.Photos }
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Title { get; set; }
        public object Icon { get; set; }
        public bool Disabled { get; set; }
    }
}
````


## See Also

  * [Live Demo: Breadcrumb Items](https://demos.telerik.com/blazor-ui/breadcrumb/items)
