---
title: Navigation
page_title: Drawer - Navigation
description: Using the Blazor Drawer for navigating between pages.
slug: drawer-navigation
tags: telerik,blazor,drawer,navigation
published: True
position: 3
components: ["drawer"]
---

# Drawer for Navigation

The Drawer is a different kind of a [menu](slug:components/menu/overview) that is commonly used to navigate between pages in the app - it can generate the needed links for you through its `UrlField` when [data binding](slug:drawer-data-binding).

To use the Drawer for navigating between pages:

* Add the Drawer to the `MainLayout.razor` of your app.
* Put the `@Body` tag in the `<DrawerContent>` tag of the drawer.
* Provide a collection of models that describe the pages you want the user to navigate to.

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)

>caption Use the Drawer for Navigation in `MainLayout.razor`

<div class="skip-repl"></div>

<demo metaUrl="client/drawer/navigation/navigation-1/" height="420"></demo>

## Additional Examples

* A GitHub sample project that showcases [Drawer as side navigation](https://github.com/telerik/blazor-ui/tree/master/drawer/sidenav).
* KB article on [how to select a Drawer item when the page loads](slug:drawer-kb-sync-selected-item).


## See Also

* [Drawer Data Binding](slug:drawer-data-binding)
* [Drawer Templates](slug:drawer-templates)
* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
