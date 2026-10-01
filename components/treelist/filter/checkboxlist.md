---
title: CheckBoxList
page_title: TreeList - Filtering CheckBoxList
description: Enable and configure filtering CheckBoxList in TreeList for Blazor.
slug: treelist-checklist-filter
tags: telerik,blazor,TreeList,filtering,filter,CheckBoxList
published: True
position: 15
components: ["treelist"]
---

# TreeList CheckBoxList Filtering

You can change the [filter menu](slug:treelist-filter-menu) to show a list of checkboxes with the distinct values from the data source. This lets your users filter records by a commonly found value quickly, and select multiple values with ease. The behavior is similar to Excel filtering.

To enable the checkbox list filtering in the treelist:

1. Set the `FilterMode` parameter of the grid to `Telerik.Blazor.TreeListFilterMode.FilterMenu`
1. Set the `FilterMenuType` parameter of the grid to `Telerik.Blazor.FilterMenuType.CheckBoxList`. It defaults to `Menu` for the default behavior.

You can also change the filter menu behavior for a particular column - its own `FilterMenuType` parameter can be either `Menu` or `CheckBoxList` regardless of the main treelist parameter. This lets you mix both modes as necessary for your application - you can either have all columns use the same mode with a single setting, or override it for a few columns that need the less common mode.

>caption CheckList filter in the treelist

<demo metaUrl="client/treelist/filter/checkboxlist/example-1/" height="720"></demo>

>caption The result from the snippet above
## Custom Data

By default, the treelist takes the `Distinct` values from its `Data` to populate the checkbox list filter for each field.

To customize the checkbox list behavior, you should use the [filter menu template](slug:treelist-templates-filter#filter-menu-template). To help you with that, we have exposed the `TelerikCheckBoxListFilter` component that you can place inside the `FilterMenuTemplate` to get the default treelist UI. It provides the following settings:

* `FilterDescriptor` - the filter descriptor where filters will be populated when checkboxes are selected. The component creates the necessary descriptors for you and reads existing ones. This makes it easy to plug into the treelist without any additional code through two-way binding (`@bind-FilterDescriptor="@context.FilterDescriptor"`).

* `Data` - the data that will be rendered in the checkbox list. This is where you can supply the desired options to change what the treelist displays.

* `Field` - the field from the data that will be used to take the `Distinct` options. It must match the name and type of the column field for which this filter is defined. This lets you use the same models that the treelist uses, or to define smaller models to reduce the data you fetch for the filter lists.

>caption Reduce filtering options for a specific column (Team)

<demo metaUrl="client/treelist/filter/checkboxlist/example-2/" height="720"></demo>


## See Also

* [Treelist Filtering Overview](slug:treelist-filtering)
* [Live Demo: Treelist CheckBox List Filter](https://demos.telerik.com/blazor-ui/treelist/filter-checkboxlist)
  