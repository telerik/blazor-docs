---
title: Row
page_title: TreeList - Row Template
description: Use custom row templates in treelist for Blazor.
slug: treelist-templates-row
tags: telerik,blazor,treelist,templates,row
published: True
position: 10
components: ["treelist"]
---

# Row Template

The row template allows you to define in your own code the entire contents of the `<tr>` element the treelist will render for each record. To set it, provide contents to the `<RowTemplate>` inner tag of the treelist.

It can be convenient if you want to use templates for most or all of the columns, as it requires less markup than setting individual templates for many columns.

The contents of the row template must be `<td>` elements and their number (or total `colspan`) must match the number of columns defined in the treelist.

You can use the `Context` attribute of the `<RowTemplate>` tag of the treelist to set the name of the context variable. Its type is the model type to which the treelist is bound.

>important Using the row template takes functionality away from the treelist because it no longer controls its own rendering. For example, editing could not render editors, expand-collapse arrows will not be available, column resizing and reordering cannot change the data cells anymore, only the headers, and row selection must be implemented by the app.

>caption Using a row template

<demo metaUrl="client/treelist/templates/row/example-1/" height="720"></demo>

- the treelist looks like a grid and does not showcase the records hierarchy
## See Also

* [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)

