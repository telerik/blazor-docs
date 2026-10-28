---
title: Navigation
page_title: TreeView Navigation
description: How to use the Blazor TreeView to navigate between pages.
slug: treeview-navigation
tags: telerik,blazor,treeview,navigation
published: True
position: 5
components: ["treeview"]
---

# TreeView for Navigation

The TreeView can navigate between different pages in the application.

* Use a `Url` property in the model, or set the `UrlField` attribute in a [`TreeViewBinding`](slug:components/treeview/data-binding/overview#treeview-bindings). Thus the TreeView will generate navigation links.
* It is possible to add the TreeView to the `MainLayout.razor`, outside the app `@Body`.

> External links should include a protocol, for example `https://`.
>
> Blazor doesn't support [navigation to page sections](https://www.meziantou.net/anchor-navigation-in-a-blazor-application.htm) out-of-the-box.

For specific scenarios, use a [Template](slug:components/treeview/templates) to generate the desired links manually (e.g. `NavLink` components) to enable fine-tuning.

>caption TreeView for page navigation

<demo metaUrl="client/treeview/navigation/example-1/" height="450"></demo>


## Notes

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)


## See Also

* [TreeView Overview](slug:treeview-overview)
* [TreeView Data Binding](slug:components/treeview/data-binding/overview)
* [TreeView Templates](slug:components/treeview/templates)
