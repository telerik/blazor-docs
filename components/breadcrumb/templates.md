---
title: Templates
page_title: Breadcrumb Templates
description: Templates for the Breadcrumb for Blazor.
slug: breadcrumb-templates
tags: telerik,blazor,breadcrumb,templates
published: True
position: 25
---


# Breadcrumb Templates

The Breadcrumb can be customized by using Templates. This article explains the available templates for the component.

* [ItemTemplate](#itemtemplate)
* [SeparatorTemplate](#separatortemplate)

## ItemTemplate

The `<ItemTemplate>` controls the rendering of the [data bound items]({%slug breadcrumb-data-binding%}) in the Breadcrumb, in case you want to use a rendering different than the default one.

This template receives a `context` argument that is of the data model type and represents the current item.

>caption Use `ItemTemplate` to control the rendering of the items in the Breadcrumb. The result from the snippet below.

![Breadcrumb ItemTemplate](images/breadcrumb-item-template-example.png)


````CSHTML
@* Customize the rendering of the Breadcrumb items *@

<TelerikBreadcrumb Data="@Items">
    <ItemTemplate>
        <span class="item">
            @if (context.Text == "Item2")
            {
                <span>❕</span>
            }
            @context.Text
        </span>
    </ItemTemplate>
</TelerikBreadcrumb>

<style>
    .item {
        font-family: cursive;
        font-size: 17px;
        color: white !important;
        background-color: #ff6358;
        border-radius: 5px;
        padding: 3px 5px;
        cursor: pointer;
    }
</style>

@code {
    public IEnumerable<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
    {
        new BreadcrumbItem { Text = "Item1", Details = "Info for Item 1"},
        new BreadcrumbItem { Text = "Item2", Details = "Info for Item 2"},
        new BreadcrumbItem { Text = "Item3", Details = "Info for Item 3"},
        new BreadcrumbItem { Text = "Item4", Details = "Info for Item 4"}
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Details { get; set; }
    }
}
````


## SeparatorTemplate

The `<SeparatorTemplate>` allows you to control the rendering of the Breadcrumb Separator, so you can define custom content between the component items.

>caption Use `SeparatorTemplate` to customize the Breadcrumb Separator. The result from the snippet below.

![Breadcrumb SeparatorTemplate](images/breadcrumb-separator-template-example.png)

````CSHTML
@* Customize the rendering of the Breadcrumb Separator *@

<TelerikBreadcrumb Data="@Items">
    <SeparatorTemplate>
        <span>🔸</span>
    </SeparatorTemplate>
</TelerikBreadcrumb>

@code {
    public IEnumerable<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
    {
        new BreadcrumbItem { Text = "Item1", Details = "Info for Item 1"},
        new BreadcrumbItem { Text = "Item2", Details = "Info for Item 2"},
        new BreadcrumbItem { Text = "Item3", Details = "Info for Item 3"},
        new BreadcrumbItem { Text = "Item4", Details = "Info for Item 4"}
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Details { get; set; }
    }
}
````


## See Also

* [Live Demo: Breadcrumb Templates](https://demos.telerik.com/blazor-ui/breadcrumb/templates)
