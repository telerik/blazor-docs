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

You can add [Telerik Font or SVG icons](slug://common-features-icons) to the Breadcrumb items. The component also supports custom icons.

To use Breadcrumb icons, define a property in the component model class and assign the property name to the `IconField` parameter of the Breadcrumb.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

If the icon property name in the Breadcrumb model is `Icon`, there is no need to set the `IconField` parameter.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in Telerik Breadcrumb

````RAZOR
<TelerikBreadcrumb Data="@Data"></TelerikBreadcrumb>

<style>
    .my-icon {
        /* define a background image or a custom font icon here */
        background: purple;
        /* dimensions and other base styles will usually come from another class */
        width: 1em;
        height: 1em;
        font-size: 16px;
    }
</style>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

@code {
    private IEnumerable<BreadcrumbItem> Data = new List<BreadcrumbItem>();

    protected override void OnInitialized()
    {
        Data = new List<BreadcrumbItem>() {
            new BreadcrumbItem() { Title = "Home", Icon = SvgIcon.Home },
            new BreadcrumbItem() { Text = "Arts (SVG)", Icon = SvgIcon.Palette },
            new BreadcrumbItem() { Text = "Photography (Font)", Icon = FontIcon.Photos },
            new BreadcrumbItem() { Text = "(Custom)", Icon = "my-icon" }
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Title { get; set; }
        public object Icon { get; set; }
    }
}
````


## See Also

* [Live Demo: Breadcrumb Items](https://demos.telerik.com/blazor-ui/breadcrumb/items)
