---
title: Icons
page_title: TreeView Icons
description: Icons and images in the TreeView for Blazor.
slug: treeview-icons
tags: telerik,blazor,treeview,icon,iconclass,image
published: True
position: 15
components: ["treeview"]
---

# TreeView Icons

You can add [Telerik Font or SVG icons](slug:common-features-icons) to the TreeView items. The component also supports custom icons.

To use TreeView item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the respective `TreeViewBinding`.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

If the icon property name in the TreeView model is `Icon`, there is no need to set the `IconField` parameter.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in the Telerik TreeView

<demo metaUrl="client/treeview/icons/example-1/" height="420"></demo>

## See Also

* [TreeView Overview](slug:treeview-overview)
