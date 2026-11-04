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

The Menu component allows you to define custom templates for its items. This article explains how to use them:

* [`ItemTemplate`](#itemtemplate)
* [`ItemActionsTemplate`](#itemactionstemplate)
* [`GroupHeaderTemplate`](#groupheadertemplate)

## ItemTemplate

The template of all items is defined in the `ItemTemplate` tag of the Menu.

The template receives the respective Menu data item as its `context`. You can use it to render the desired content. You can also set the `Context` parameter of the `ItemTemplate` tag and use a [named context variable. This is useful in nested template scenarios](slug:nest-renderfragment).

The Menu item template can contain arbitrary content, such as HTML markup and other components. You can also use standard event handlers like `@onclick` or `@onmouseover`.

The `ItemTemplate` replaces only the default icon and text of the item. The Menu renders the [item description](slug:components/menu/data-binding/overview#menu-item-features) and the [`ItemActionsTemplate`](#itemactionstemplate) content independently of the `ItemTemplate`.

## ItemActionsTemplate

The `ItemActionsTemplate` renders optional trailing content in each Menu item, for example, a keyboard shortcut, metadata, or a hint. The Menu renders this content after the item text and description, and before the expand arrow of items with children.

The template receives an `ItemActionsTemplateContext<TItem>` object as its `context`. The object exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `TItem` | The data item of the current Menu item. |
| `Index` | `string` | The position of the item in the data hierarchy. The indexes of the different levels are joined by an underscore. For example, `"1_3"` is the fourth child of the second root item. The value counts group headers and separators, so it is unique across the `ItemActionsTemplate` and the `GroupHeaderTemplate`. |

>note The Menu does not provide keyboard navigation for the content of the `ItemActionsTemplate`. Use the template for informational content, such as shortcuts, rather than for interactive elements.

>caption Show keyboard shortcuts and descriptions in the Menu items

<demo metaUrl="client/menu/templates/example-3/" height="320"></demo>

## GroupHeaderTemplate

The Menu can organize the child items in a popup under labeled group headers. To create a group header, set the [`GroupHeader` field](slug:components/menu/data-binding/overview#menu-item-features) of a child item to `true`. The group header applies to the items that follow it until the next group header.

By default, the group header displays the item text and icon. Use the `GroupHeaderTemplate` to render custom content instead.

The template receives a `GroupHeaderTemplateContext<TItem>` object as its `context`. The object exposes the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `TItem` | The data item of the current group header. |
| `Index` | `string` | The position of the group header in the data hierarchy. The value uses the same format as the `Index` of the [`ItemActionsTemplate` context](#itemactionstemplate). |

Group headers have the following behavior:

* They are not interactive. The Menu does not focus group headers and skips them during keyboard navigation.
* They are different from [separators](slug:components/menu/data-binding/overview#menu-item-features). You can use both in the same popup.
* They apply only to child items. The root items of the Menu ignore the `GroupHeader` field and render as regular items. The [ContextMenu](slug:contextmenu-group-header-template) supports group headers at the root level too.

>note The content of the `GroupHeaderTemplate` must remain non-interactive. Do not render buttons, links, or other focusable elements in it.

>caption Group the Menu child items under custom headers

<demo metaUrl="client/menu/templates/example-4/" height="360"></demo>

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
