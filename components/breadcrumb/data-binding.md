---
title: Data Binding
page_title: Breadcrumb - Data Binding
description: Data Binding basics for the Breadcrumb for Blazor.
slug: breadcrumb-data-binding
tags: telerik,blazor,breadcrumb,data,binding
published: True
position: 5
components: ["breadcrumb"]
---
# Breadcrumb Data Binding

This article explains how to provide data to a Breadcrumb component, the properties related to data binding and their effect.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

This article has the following sections:

* The available (bindable) [features of a breadcrumb item](#breadcrumb-item-features).
* How to map fields in the model to the Breadcrumb items [data bindings](#data-bindings).
* [Example](#example-data-binding-to-non-default-field-names) of using non-default field names for data binding.

>tip In some cases you might prefer to dynamically generate the Breadcrumb items based on the current application `Url`. Read more how to achieve that in the [Navigation article](slug:breadcrumb-navigation).

## Breadcrumb Item Features

The Breadcrumb items provide the following features that you control through the corresponding fields in their data binding:


* `Text` - the text that will be shown on the item.
* `Title` - the text that will be added to the `title` attribute of the html element.
* `Icon` - The [Telerik Font or SVG icon](slug:common-features-icons) that will be rendered in the item. Read more in the [Icons article](slug:breadcrumb-icons).
* `Url` - the view the item will navigate to by generating a link.
* `Disabled` -  you can disable items by setting this field to `true`. Such items will keep rendering but will not be clickable.
* `Class` - the CSS class that will be rendered on the main wrapping container of the item. You can use it to apply the desired styles to the separate Breadcrumb items.

## Data Bindings

The properties of a Breadcrumb item map directly to fields from the Breadcrumb model. You define that relationship by providing the names of the fields where the corresponding information is present. To do this, use the properties in the main `TelerikBreadcrumb` tag:


* TextField => Text
* TitleField => Title
* IconField => Icon
* UrlField => Url
* DisabledField => Disabled
* ClassField => Class


>tip There are default values for the field names. If your model names match the defaults, you don't have to define them in the bindings settings.

@[template](/_contentTemplates/common/navigation-components.md#default-fields-match-issues)

>caption Default field names for Breadcrumb item bindings. If you use these, you don't have to specify them in the `TelerikBreadcrumb` tag explicitly.

````RAZOR
    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Title { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Url { get; set; }
        public bool Disabled { get; set; }
        public string Class { get; set; }
    }
````

## Example - Data Binding to Non-Default Field Names

````RAZOR
@*This example shows how you can data bind the Breadcrumb and set the field names it will use from the model*@

<TelerikBreadcrumb Data="@Items"
                   TextField="ItemText"
                   UrlField="ItemUrl"
                   DisabledField="ItemDisabled">
</TelerikBreadcrumb>

@code {
    public IEnumerable<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
            new BreadcrumbItem
            {
                ItemText = "Overview",
                ItemUrl = "https://demos.telerik.com/blazor-ui/breadcrumb/overview"
            },
            new BreadcrumbItem
            { ItemText = "Navigation",
                ItemUrl = "https://demos.telerik.com/blazor-ui/breadcrumb/navigation",
            },
            new BreadcrumbItem
            { ItemText = "Items",
                ItemUrl = "https://demos.telerik.com/blazor-ui/breadcrumb/items",
                ItemDisabled = true
            },
            new BreadcrumbItem
            {
                ItemText = "Collapse Modes",
                ItemUrl = "https://demos.telerik.com/blazor-ui/breadcrumb/collapse-modes"
            }
        };
    }

    public class BreadcrumbItem
    {
        public string ItemText { get; set; }
        public string ItemUrl { get; set; }
        public bool ItemDisabled { get; set; }
    }
}
````


## See Also

* [Live Demo: Breadcrumb Overview](https://demos.telerik.com/blazor-ui/breadcrumb/overview)
