---
title: Data Binding
page_title: Drawer - Data Binding
description: Data Binding in the Drawer for Blazor.
slug: drawer-data-binding
tags: telerik,blazor,drawer,data,binding
published: True
position: 2
---

# Drawer Data Binding

This article explains the how to provide data to a Drawer component so it renders items for you, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

This article has the following sections:

* The available (bindable) [features of a drawer item](#drawer-item-features).
* How to match fields in the model with the drawer item [data bindings](#data-bindings).
* [Example](#example-data-binding-to-non-default-field-names) of using non-default field names for data binding.

## Drawer Item Features

The drawer items provide the following features that you control through the corresponding fields in their data binding:

* `Text` - the text that will be shown on the item.
* `Icon` - the [Telerik Font or SVG icon](slug://common-features-icons) that will be rendered in the item. Read more in the [Icons article](slug://breadcrumb-icons).
* `Url` - the view the item will navigate to by generating a link.
* `Separator` - whether the item will be a separator line instead of a clickable item.

## Data Bindings

The properties of a drawer item match directly to a field of the model the drawer is bound to. You provide that relationship by providing the name of the field from which the corresponding information is present. To do this, use the properties in the main `TelerikDrawer` tag:

* TextField => Text
* IconField => Icon
* UrlField => Url
* SeparatorField => Separator

>tip There are default values for the field names. If your model names match the defaults, you don't have to define them in the bindings settings.

@[template](/_contentTemplates/common/navigation-components.md#default-fields-match-issues)

>caption Default field names for drawer item bindings. If you use these, you don't have to specify them in the `TelerikDrawer` tag explicitly.

<div class="skip-repl"></div>

````RAZOR
public class DrawerItem
{
	public string Text { get; set; }
	public ISvgIcon Icon { get; set; }
	public string Url { get; set; }
	public bool Separator { get;set; }
}
````

## Example - Data Binding to Non-Default Field Names

````RAZOR
@* This example shows how you can data bind the drawer and set the field names it will use from the model 
Place it in the MainLayout.razor so you can use it for navigation:
https://docs.telerik.com/blazor-ui/components/drawer/navigation
*@

<TelerikDrawer Data="@Data" UrlField="ItemUrl" TextField="ItemText" IconField="ItemIcon"
               MiniMode="true" Mode="@DrawerMode.Push" Expanded="true">
    <DrawerContent>
        ...Drawer Content...
    </DrawerContent>
</TelerikDrawer>

@code {
    private IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
            {
            new DrawerItem { ItemText = "Counter", ItemIcon = SvgIcon.Plus, ItemUrl = "counter" },
            new DrawerItem { ItemText = "FetchData", ItemIcon = SvgIcon.GridLayout, ItemUrl = "fetchdata" },
            };

    public class DrawerItem
    {
        public string ItemText { get; set; }
        public ISvgIcon ItemIcon { get; set; }
        public string ItemUrl { get; set; }
    }
}
````


## See Also

* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
* [Drawer Navigation]({% slug drawer-navigation)
