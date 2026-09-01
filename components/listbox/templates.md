---
title: Templates
page_title: ListBox - Templates
description: Implement ListBox templates to customize the item rendering and styling. Use a custom no data template when there are no items to display.
slug: listbox-templates
tags: telerik,blazor,listbox
published: True
position: 50
components: ["listbox"]
---

# ListBox Templates

The ListBox features templates that allow you to customize the component rendering and styling. This article describes all available templates and explains how to use them.

* [Item Template](#item-template)
* [No Data Template](#no-data-template)


## Item Template

The ListBox `ItemTemplate` enables you to change the default HTML output and CSS styling of the data items.

The `<ItemTemplate>` tag is a Blazor `RenderFragment`. It exposes a `context` variable that is the current data item object and you can access its properties directly without casting.


## No Data Template

The ListBox shows the `NoDataTemplate` when there are no items in the component `Data`.


## Example

The following example shows how to place a Button inside the `NoDataTemplate`, which adds new items to the ListBox. Another option for such functionality is to use a [custom toolbar button](slug:listbox-toolbar#custom-tools).

Always [`Rebind()`](slug:listbox-overview#listbox-reference-and-methods) the ListBox after making programmatic changes to its `Data`.

>caption Using ListBox templates

<demo metaUrl="client/listbox/templates/" height="400px"></demo>


## Next Steps

* [Handle ListBox events](slug:listbox-events)


## See Also

* [Live Demo: ListBox Templates](https://demos.telerik.com/blazor-ui/listbox/templates)
