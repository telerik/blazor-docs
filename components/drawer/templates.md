---
title: Templates
page_title: Drawer - Templates
description: Templates in the Drawer for Blazor.
slug: drawer-templates
tags: telerik,blazor,drawer,templates
published: True
position: 12
components: ["drawer"]
---

# Drawer Templates

The Drawer can be customized by using Templates. This article explains the available layout templates for the component.

* [ItemTemplate](#itemtemplate)
* [Template](#template)

## ItemTemplate

The `<ItemTemplate>` controls the rendering of the [data bound items](slug:drawer-data-binding) in the Drawer, in case you want to use a rendering different than the default one.

This template receives a `context` argument that is of the data model type and represents the current item.

When using an `ItemTemplate`, the Drawer can still [navigate automatically if the `UrlField` parameter is set, or if the Drawer data items have a populated `Url` property](slug:drawer-navigation).

>caption Use ItemTemplate to control the rendering of the items in the Drawer.

<demo metaUrl="client/drawer/templates/itemtemplate-2/" height="420"></demo>

## Template

The `<Template>` allows you to control the whole rendering of the Drawer so you can add extra content and application logic. This template receives a `context` argument that is `IEnumerable<TItem>` - it is the `Data` collection of the component.

When using this template all built-in features of the Drawer are disabled and should be implemented by the application, for example the [item selection](slug:drawer-selection) and rendering, navigation to different pages, etc. Page navigation can be done with `<a>`, `<NavLink>`, `NavigationManager` and so on.

The drawer will expand and collapse as usual, but the content has to be controlled by the application entirely.

Make sure that the `<DrawerContent>` tag is outside of the `<Template>` - the `<DrawerContent>` is responsible for the rendering the application outside of the Drawer, whereas the `<Template>` controls only the rendering of the component. In the `<DrawerContent>` tag you can place the `@Body` when you are using the Drawer as a sidebar navigation. 

>tip You can find a runnable sample that showcases this in the [Drawer as Side Navigation using the Template](https://github.com/telerik/blazor-ui/tree/master/drawer/template) sample project.

Using the `<Template>` and `<ItemTemplate>` together is not possible - the Template removes any built-in rendering from the Drawer.

>important Using the template takes functionality away from the drawer because it no longer controls its own rendering. For example, appearance of the items, focused states, keyboard navigation, page navigation and clicks are no longer controlled by the Drawer component and need to be implemented by the application template.

>caption Using a template with manual item selection, header and footer

<demo metaUrl="client/drawer/templates/manual-selection-template-1/" height="670"></demo>

## See Also

* [Drawer Templates Demo](https://demos.telerik.com/blazor-ui/drawer/overview)
* [Drawer Data Binding](slug:drawer-data-binding)
* [Drawer Navigation](slug:drawer-navigation)
* [Hierarchical Drawer Demo](https://demos.telerik.com/blazor-ui/drawer/hierarchical-drawer)
