---
title: Item Actions Template
page_title: Context Menu - Item Actions Template
description: Use the Item Actions Template in the Context Menu for Blazor to render trailing content, such as keyboard shortcuts, in the menu items.
slug: contextmenu-item-actions-template
tags: telerik,blazor,context menu,templates,item actions,shortcut
published: True
position: 12
components: ["contextmenu"]
---

# Context Menu Item Actions Template

The Context Menu `ItemActionsTemplate` renders optional trailing content in each item, for example, a keyboard shortcut, metadata, or a hint. The Context Menu renders this content after the item text and [description](slug:contextmenu-data-binding-overview#context-menu-item-features), and before the expand arrow of items with children.

The template receives an `ItemActionsTemplateContext<TItem>` object as its `context`. The object exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `TItem` | The data item of the current Context Menu item. |
| `Index` | `string` | The position of the item in the data hierarchy. The indexes of the different levels are joined by an underscore. For example, `"1_3"` is the fourth child of the second root item. The value counts group headers and separators, so it is unique across the `ItemActionsTemplate` and the [`GroupHeaderTemplate`](slug:contextmenu-group-header-template). |

The `ItemActionsTemplate` works independently of the [`ItemTemplate`](slug:contextmenu-item-template). The `ItemTemplate` replaces only the default icon and text of the item.

>note The Context Menu does not provide keyboard navigation for the content of the `ItemActionsTemplate`. Use the template for informational content, such as shortcuts, rather than for interactive elements.

>caption Show keyboard shortcuts and descriptions in the Context Menu items

<demo metaUrl="client/contextmenu/templates/item-actions/" height="400"></demo>

## See Also

* [Context Menu Templates Overview](slug:contextmenu-templates-overview)
* [Context Menu Group Header Template](slug:contextmenu-group-header-template)
* [Data Binding a Context Menu](slug:contextmenu-data-binding-overview)
