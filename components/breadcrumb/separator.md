---
title: Separator
page_title: Breadcrumb Separator
description: Separator in the Breadcrumb for Blazor.
slug: breadcrumb-separator
tags: telerik,blazor,breadcrumb,separator
published: True
position: 15
---

# Breadcrumb Separator

The Breadcrumb component renders a [Telerik font icon]({%slug general-information/font-icons%}) as a separator between its items. By default the separator icon is `chevron-right`.

You can define a separator icon of your choice through the `SeparatorIcon` field the `TelerikBreadcrumb` exposes. It accepts a `string` with the Telerik icon name.

Furthermore, you can take full control over the Separator rendering with the [SeparatorTemplate]({%slug breadcrumb-templates%}#separatortemplate) the Breadcrumb component provides.

>caption Change the default Breadcrumb Separator. The result from the snippet below.

![Breadcrumb Separator Icon](images/breadcrumb-separator-example.png)

````CSHTML
@* This example demonstrates how to change the default Telerik icon used as a Breadcrumb Separator*@

<TelerikBreadcrumb SeparatorIcon="caret-double-alt-right"
                   Data="@Items">
</TelerikBreadcrumb>

@code {
    public List<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
            new BreadcrumbItem { Text = "Home", Icon = "home" },
            new BreadcrumbItem { Text = "Products"},
            new BreadcrumbItem { Text = "Computer peripherals"},
            new BreadcrumbItem { Text = "Keyboards"}
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
    }
}
````


## See Also

  * * [Live Demo: Breadcrumb Separator](https://demos.telerik.com/blazor-ui/breadcrumb/separator)