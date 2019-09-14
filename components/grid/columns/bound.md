---
title: Bound Column
page_title: Grid for Blazor | Bound Column
description: Column properties in Grid for Blazor
slug: components/grid/columns/bound
tags: telerik,blazor,grid,bound,column
published: True
position: 0
---

# Grid Bound Column

To show data in a grid, you must define bound columns for the fields of the data source you want to show.

They are added to the `GridColumns` tag and are of type `GridColumn`. You can use the following properties on them:

* `Field` - the name of the field in the data source that the column will render as a string. You can set its as a plain string (`Field="SomeField"`) or to have .NET extract the field name from the model (`Field=@nameof(MyModelClass.SomeFIeld)`).
* `Title` - the text that is rendered in the column header.
* `Editable` - you can set this property to `true` or `false` to allow or prevent [editing]({%slug components/grid/overview%}#editing) of this field. Defaults to `true`.
* `Filterable` - you can set this to `false` so a [filterable]({%slug components/grid/filtering%}) grid will not let the user filter that particular column.
* `Width` - the width of the column. See the [Dimensions]({%slug common-features/dimensions%}) article. Keep in mind that these are columns in a `<table>`, so it is often a good practice to leave one column without explicit dimensions so it can accommodate the remaining width and changes to the container size.
* `Template` - this property can also be used as an inner tag and it lets you define the [column display content]({%slug components/grid/features/templates%}#column-template). It can also point to a component name.
* `Context` - the standard Blazor context variable name for use inside the inline template.
* `ref` - the standard Blazor reference name.
* `EditorTemplate` - this property can also be used as an inner tag and it lets you define the [column edit content]({%slug components/grid/features/templates%}#edit-template). It can also point to a component name.

For an example of the column usage, see the [Grid Overview]({%slug components/grid/overview%}) article and the [examples repo](https://github.com/telerik/ui-for-blazor-examples/).

## See Also

  * [Live Demo: Grid Columns](https://demos.telerik.com/blazor-ui/grid/columns)
