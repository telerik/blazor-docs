---
title: Column Group Footer
page_title: Grid - Column Group Footer Template
description: Use custom column group footer templates in Grid for Blazor.
slug: grid-templates-column-group-footer
tags: telerik,blazor,grid,templates,column,group,footer
published: True
position: 25
components: ["grid"]
---

# Column Group Footer

When the grid is grouped, the columns can display a footer with information about the column data [aggregates](slug:grid-aggregates) and some custom text/logic. The template is strongly typed and exposes the available aggregates values.

The `GroupFooterTemplate` context exposes the current group value through its `Value` property. It does not expose the name of the field that defines the group. To get the group field name, read the current [Grid state](slug:grid-state) and inspect the `Member` property of the `GroupDescriptor`:

````CS.skip-repl
private TelerikGrid<MyModel> GridRef { get; set; }

private string GetGroupFieldName()
{
	return GridRef.GetState().GroupDescriptors.FirstOrDefault()?.Member;
}
````

When the Grid has multiple grouping fields, inspect the full `GroupDescriptors` collection. Its order represents the grouping order; the `GroupFooterTemplate` context does not identify which group descriptor is currently rendering.

>caption Sample Column Group Footer Template

<demo metaUrl="client/grid/templates-column-group-footer/" height="700"></demo>

## Using Components in Grid Group Footer Templates

@[template](/_contentTemplates/grid/common-link.md#using-components-in-templates)

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
* [Blazor Grid](slug:grid-overview)

