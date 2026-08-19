---
title: Navigation
page_title: PanelBar - Navigation
description: Using the Blazor PanelBar for navigating between pages.
slug: panelbar-navigation
tags: telerik,blazor,panelbar,navigation
published: True
position: 5
components: ["panelbar"]
---

# PanelBar for Navigation

The PanelBar can be used to navigate between different pages in the application. It can generate the needed links for you through its `UrlField` when [data binding](slug:panelbar-data-binding-overview).

To use the PanelBar for navigating between pages:

* Add the PanelBar to your application.
* Provide a collection of models that describe the pages you want the user to navigate to.
* Populate its `UrlField` with the corresponding data from the model or provide a `Url` property in the model.

>caption Use the PanelBar to navigate between pages

<demo metaUrl="client/panelbar/navigation/" height="420"></demo>


## Notes

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)


## See Also

* [PanelBar Overview](slug:panelbar-overview)
* [PanelBar Data Binding](slug:panelbar-data-binding-overview)
