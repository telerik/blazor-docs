---
title: Group Header Template
page_title: Context Menu - Group Header Template
description: Organize the Context Menu for Blazor items under labeled group headers and customize the group header content with a template.
slug: contextmenu-group-header-template
tags: telerik,blazor,context menu,templates,group header
published: True
position: 14
components: ["contextmenu"]
---

# Context Menu Group Header Template

Use the `GroupHeaderTemplate` to render custom content in a [Context Menu group header](slug:contextmenu-item-grouping).

The template receives a `GroupHeaderTemplateContext<TItem>` object as its `context`. The object exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `TItem` | The data item of the current group header. |
| `Index` | `string` | The position of the group header in the data hierarchy. The value uses the same format as the `Index` of the [`ItemActionsTemplate` context](slug:contextmenu-item-actions-template). |

>note The content of the `GroupHeaderTemplate` must remain non-interactive. Do not render buttons, links, or other focusable elements in it.

>caption Customize the Context Menu group headers

<demo metaUrl="client/contextmenu/templates/group-header/" height="400"></demo>

## See Also

* [Context Menu Templates Overview](slug:contextmenu-templates-overview)
* [Context Menu Item Grouping](slug:contextmenu-item-grouping)
* [Context Menu Item Actions Template](slug:contextmenu-item-actions-template)
* [Data Binding a Context Menu](slug:contextmenu-data-binding-overview)
