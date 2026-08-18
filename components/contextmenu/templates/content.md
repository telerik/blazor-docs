---
title: Content Template
page_title: Menu - Content Template
description: Content Template in the Menu for Blazor.
slug: contextmenu-content-template
tags: telerik,blazor,menu,templates
published: True
position: 5
components: ["contextmenu"]
---

# Context Menu Content Template

The Context Menu component allows you to define a custom template for its entire content so you can render what you want in it

To override the context menu rendering, use the `<Template>` tag, and define your desired components and layout there.

The template receives the data source to which the context menu is bound as its `context`.

You can use the template to render arbitrary content according to your application's data and logic. You can use components in it and thus provide rich content instead of plain text. You can also use it to add DOM event handlers like click, doubleclick, mouseover if you need to respond to them.

>caption Use the content template to implement a custom layout that can also use the current target to alter itself

<demo metaUrl="client/contextmenu/templates/content/" height="450"></demo>

>caption The result from the snippet above

![Context Menu Conditional Content Template with custom layout](images/content-template-in-action.gif)

## See Also

* [Data Binding a Context Menu](slug:contextmenu-data-binding-overview)
* [Live Demo: Context Menu Templates](https://demos.telerik.com/blazor-ui/contextmenu/templates)

