---
title: Content Template
page_title: PanelBar - Content Template
description: Use th content template in the PanelBar for Blazor.
slug: panelbar-templates-content
tags: telerik,blazor,panelbar,templates
published: True
position: 10
components: ["panelbar"]
---

## ContentTemplate

You can control and customize the rendering of the content items in the PanelBar with a `ContentTemplate`. Here is how to use it.

* The `ContentTemplate` is defined under the `PanelBarBinding` tag.
* It provides a `context` object that you can cast to the type, which the PanelBar is bound to.
* The template can include other Razor components or executable code.
* Similar to [`PanelBarBinding`s](slug:panelbar-data-binding-overview), there can be **one** `ContentTemplate` for all items at the same level. If the content of these items should be different, use conditional statements inside the template.
* A `ContentTemplate` displays like a child item. It is rendered only for the items, which have no children.

If a root item has child items, it is not a `ContentTemplate` target because it is not a leaf item. A `PanelBarBinding` with `Level="0"` targets root items, but a `ContentTemplate` at that level will not render for roots that have children. To customize the root item itself, use a [`HeaderTemplate`](slug:panelbar-templates-header). To customize leaf children, define the `ContentTemplate` in the binding for the level where those children are rendered. If only one item at that level needs custom content, use conditional logic inside the single template.

>caption Use ContentTemplate to customize the content items

<demo metaUrl="client/panelbar/templates/content/" height="500"></demo>

## See Also

* [Data Binding a PanelBar](slug:panelbar-data-binding-overview)
* [Live Demo: PanelBar](https://demos.telerik.com/blazor-ui/panelbar/overview)
