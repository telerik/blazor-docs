---
title: CheckBoxList
page_title: Grid - Filtering CheckBoxList
description: Enable and configure filtering CheckBoxList in Grid for Blazor.
slug: grid-checklist-filter
tags: telerik,blazor,grid,filtering,filter,CheckBoxList
published: True
position: 15
components: ["grid"]
---
# Grid CheckBoxList Filtering

You can change the [filter menu](slug:grid-filter-menu) to show a list of checkboxes with the distinct values from the data source. This lets your users filter records by a commonly found value quickly, and select multiple values with ease. The behavior is similar to Excel filtering.

## Enabling CheckBoxList Filtering

To enable the CheckBoxList filtering in the Telerik Grid for Blazor:

1. Set the `FilterMode` parameter to `GridFilterMode.FilterMenu`
1. Set the `FilterMenuType` parameter to `FilterMenuType.CheckBoxList`. It defaults to `Menu` for the default behavior.

>caption CheckList filter in the DataGrid

<demo metaUrl="client/grid/filter/checkbox-list/" height="500"></demo>

## Custom Data

By default, the Telerik Grid takes the `Distinct` values from its `Data` to populate the checkbox list filter for each field.

Using the [`OnRead` event](slug:components/grid/manual-operations) to customize or perform data operations on the server/service limits the Grid to the current page of data, restricting user options. You may want to provide the full list.

To customize the CheckBoxList behavior, use the [Filter Menu Template](slug:grid-templates-filter#filter-menu-template). Place the `TelerikCheckBoxListFilter` component inside the `FilterMenuTemplate` to get the default CheckBoxList filtering UI. The template provides the following settings:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Description |
|---------------------|------------------|
| `FilterDescriptor`  | The filter descriptor where filters populate when checkboxes are selected. The component creates and reads descriptors, allowing easy Grid integration through two-way binding (`@bind-FilterDescriptor="@context.FilterDescriptor"`). |
| `Data` | The data that renders in the checkbox list. Use this parameter to supply the desired options to change what the Grid displays. |
| `Field` | The field from the data used for distinct options must match the column field's name and type. This allows using the same models as the Grid or defining smaller models to reduce data fetched for filter lists. |

>caption Provide all filtering options when using OnRead

<demo metaUrl="client/grid/filter/checkbox-list-custom-data/" height="500"></demo>


## See Also

* [Grid Filtering Overview](slug:components/grid/filtering)
* [Live Demo: Grid CheckBox List Filter](https://demos.telerik.com/blazor-ui/grid/filter-checkboxlist)
* [Blazor Grid](slug:grid-overview)
