---
title: Form Groups
page_title: Form for Blazor - FormGroups
description: Form for Blazor - FormGroups.
slug: form-formgroups
tags: telerik,blazor,form,edit,formgroups,groups
published: True
position: 25
components: ["form"]
---

# Form Groups

You can group some associated fields in your form (model) by using the [FormItems](slug:form-formitems). and putting them inside `FormGroup` tags.

In this article:

* [Features](#features)
* [Example - Organize FormItems into Groups](#example-organize-formitems-into-groups)

## Features

The `FormGroup` tag exposes the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value| Description |
| --- | --- | --- |
| `LabelText` | `string` | The label for the entire group rendered as a `<legend>` element in a `<fieldset>`. |
| `Columns` | `int` | The number of columns in the group. |
| `ColumnSpacing` | `string` (`"16px"`) | The horizontal space between the columns in the group. |
| `RowSpacing` | `string` | The vertical space between the fields in the group. The default value is zero, but there is a default top margin for Form items. This parameter has effect only when `Columns` is set. |

## Example - Organize FormItems into Groups

You can organize some FormItems into logical groups. You can configure the label of the group, the number of columns and the spacing between the items.

<demo metaUrl="client/form/formgroups/example-1/" height="550"></demo>

## See Also

* [Overview](slug:form-overview)
* [FormItems](slug:form-formitems)
* [Template](slug:form-formitems-template)
* [Orientation](slug:form-orientation)
* [Events](slug:form-events)
