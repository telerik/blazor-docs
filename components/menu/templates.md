---
title: Templates
page_title: Menu - Templates
description: Templates in the Menu for Blazor.
slug: components/menu/templates
tags: telerik,blazor,menu,templates
published: True
position: 10
components: ["menu"]
---

# Menu Templates

The Menu component allows you to define a custom template for its items. This article explains how to use it.

## ItemTemplate

The template of all items is defined in the `ItemTemplate` tag of the Menu.

The template receives the respective Menu data item as its `context`. You can use it to render the desired content. You can also set the `Context` parameter of the `ItemTemplate` tag and use a [named context variable. This is useful in nested template scenarios](slug:nest-renderfragment).

The Menu item template can contain arbitrary content according such as HTML markup and other components. You can also use standard event handlers like `@onclick` or `@onmouseover`.

## Examples

### Use ItemTemplate for Navigation

The following example shows how to render `<NavLink>` tags inside the Menu and use them for navigation instead of the [built-in Menu navigation mechanism](slug:menu-navigation). This approach requires the URL property name to be different from `Url`. [`<NavLink>` also supports the `target="_blank"` attribute](#use-itemtemplate-for-styling-and-target-_blank).

>caption Use Menu item template for navigation

<demo metaUrl="client/menu/templates/example-1/" height="420"></demo>

### Use ItemTemplate for Styling and target="_blank"

The example below shows a Menu configuration that is suitable for use in `MainLayout.razor`. The implementation disables the [built-in Menu navigation](slug:menu-navigation) because the URL property is not `Url` and `UrlField` is not set. The sample also uses `<NavLink>` tags with `target="_blank"` to open external links in a new browser window.

>caption Use Menu item template to distinguish the current page and open external links in new browser windows

<div class="skip-repl"></div>

<demo metaUrl="client/menu/templates/example-2/" height="420"></demo>

## See Also

* [Data Binding a Menu](slug:components/menu/data-binding/overview)
* [Live Demo: Menu Template](https://demos.telerik.com/blazor-ui/menu/template)
