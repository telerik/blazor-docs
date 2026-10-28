---
title: Column (Cell)
page_title: TreeList - Column (Cell) Template
description: Use custom column and cell templates in treelist for Blazor.
slug: treelist-templates-column
tags: telerik,blazor,treelist,templates,column,cell
published: True
position: 5
components: ["treelist"]
---

# Column Template

By default, the TreeList renders the value of the field in the column, as it is provided from the data source. You can change this behavior by using the `Template` of the column and add your own content and/or logic to make a string out of the object.

Using a template will keep the `Expandable="true"` feature in a column - the expand/collapse arrows that the treelist renders for you. Your template will render after the arrow.

>tip If you only want to format numbers, dates, enums, you can do so with the [DisplayFormat feature](slug:treelist-columns-displayformat) without the need to declare a template.

The example below shows how to:

* set the `Template` (make sure to use the capital `T`, at the time of writing the Visual Studio autocomplete tends to use the lowercase `t` which breaks the template logic and does not allow you to access the context)
* access the `context` of the model item so you can employ your own logic
* set HTML in the column
* take an arbitrary field from the model

>caption Using cell (column) template

<demo metaUrl="client/treelist/templates/column/example-1/" height="720"></demo>


## See Also

* [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)
* [Live Demo: TreeList Custom Editor Template](https://demos.telerik.com/blazor-ui/treelist/custom-editor)
