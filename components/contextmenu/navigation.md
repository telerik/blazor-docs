---
title: Navigation
page_title: Context Menu - Navigation
description: Using the Blazor Context Menu for navigating between pages.
slug: contextmenu-navigation
tags: telerik,blazor,menu,navigation
published: True
position: 10
components: ["contextmenu"]
---

# Context Menu for Navigation

The Context Menu can be used to navigate between different pages in the application. It can generate the needed links for you through its `UrlField` when [data binding](slug:contextmenu-data-binding-overview).

To use the Context Menu for navigating between pages:

* Add the ContextMenu to your application and [choose a target](slug:contextmenu-overview) or [show it with your own code](slug:contextmenu-integration#know-the-target-and-adjust-items).
* Provide a collection of models that describe the pages you want the user to navigate to.
* Populate its `UrlField` with the corresponding data from the model or provide a `Url` property in the model.

>caption Use the Context Menu to navigate between pages

<demo metaUrl="client/contextmenu/navigation/" height="300"></demo>

## Notes

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)

## See Also

* [Context Menu Overview](slug:contextmenu-overview)
* [Context Menu Data Binding](slug:contextmenu-data-binding-overview)
* [Context Menu Templates](slug:contextmenu-templates-overview)
