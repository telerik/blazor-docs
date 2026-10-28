---
title: Columns
page_title: Form Columns
description: Form for Blazor - Columns.
slug: form-columns
tags: telerik,blazor,form,edit,form,columns,spacing,column
published: True
position: 15
previous_url: /components/form/colums
components: ["form"]
---

# Form Columns

The Form component for Blazor allows you to add multiple columns by using the `Columns` parameter. It takes an `int` which represents the number of columns the Form will have. To manipulate the spacing between the columns you can use the `ColumnSpacing` parameter. 

>caption Add columns to a Form with Automatically generated fields

You can set the `Columns` parameter when [`<FormItemsTemplate>`](slug:form-formitems-formitemstemplate) is not used and the Form manages its layout. The Form will spread the editors evenly across the columns.

When using `Columns`, you can also define arbitrary space between the rows with the `RowSpacing` parameter.

<demo metaUrl="client/form/columns/example-1/" height="600"></demo>

## See Also

* [Overview](slug:form-overview)
* [FormItems](slug:form-formitems)
* [FormGroups](slug:form-formgroups)
* [Orientation](slug:form-orientation)
* [Events](slug:form-events)
   
