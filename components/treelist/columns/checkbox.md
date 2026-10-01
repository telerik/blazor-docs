---
title: Checkbox Column
page_title: TreeList - Checkbox Column
description: Configuration options for the Telerik Blazor TreeList Checkbox Column
slug: treelist-columns-checkbox
tags: telerik,blazor,TreeList,column,selection
published: True
position: 2
components: ["treelist"]
---

# TreeList Checkbox Column

This article describes the configuration parameters of the Blazor `TreeListCheckboxColumn`.

The `TreeListCheckboxColumn` provides an additional way for users to [select TreeList rows](slug:treelist-selection-overview). By default, users can select and deselect rows by clicking anywhere on them.

## Parameters

The TreeList checkbox column has the following exclusive parameters. For other available parameters, see the [appearance settings of bound columns](slug:treelist-columns-bound#appearance).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `CheckBoxOnlySelection` | `bool` | Determines if row selection occurs only on checkbox clicks. By default, user can select rows by clicking anywhere, except on command buttons. |
| `SelectAll` | `bool` <br /> (`true`) | Determines if the column header renders a checkbox to select all rows. Set this to `false` if the [TreeList `SelectionMode` is `Single`](slug:treelist-selection-overview#use-single-or-multiple-selection). The `SelectAll` parameter has no effect when the checkbox column has a [`HeaderTemplate`](#header-template). |
| `SelectAllMode` | `TreeListSelectAllMode` enum <br /> (`Current`) | Determines if the header cell checkbox selects all rows on the current page, or all rows in the TreeList. `Current` selects the visible rows on the current page. It does not select the children of collapsed items - they are not part of the [current page](slug:treelist-paging) data. `All` selects all the data items, including ones that may be currently filtered out. |
| `SelectChildren` | `bool` | Determines if a parent row checkbox affects the selected state of respective child rows. |

>note  If the TreeList is bound to `IQueryable`, a header checkbox with an `All` option will execute the query over all the data. This may be a performance hit.

## Header Template

The `HeaderTemplate` of the TreeList checkbox column enables developers to customize the header cell's rendering and checkbox behavior.

On a side note, it is possible to [center the checkboxes in the `TreeListCheckboxColumn`](slug:grid-kb-center-checkbox-column) without using a template.

>caption TreeList Checkbox Column Header Template

<demo metaUrl="client/treelist/columns/checkbox/example-1/" height="720"></demo>

## See Also

* [Live Demo: TreeList Selection](https://demos.telerik.com/blazor-ui/treelist/row-selection)
* [TreeList Selection Overview](slug:treelist-selection-overview)
