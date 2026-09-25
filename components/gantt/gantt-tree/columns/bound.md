---
title: DataBound Column
page_title: Gantt Tree - DataBound Column
description: Data binding and bound column properties in Gantt for Blazor.
slug: gantt-columns-bound
tags: telerik,blazor,gantt,bound,column
published: True
position: 0
components: ["gantt"]
---

# Gantt DataBound Column

This article explains the basics of showing data in a Gantt Tree and the features of its bound columns.

Sections in this article:

* [Show Data In A Gantt](#show-data-in-a-gantt)
* [Gantt Bound Column Parameters](#gantt-bound-column-parameters)
* [Notes](#notes)


## Show Data In A Gantt

To show data in a Gantt Chart, you must define `GanttColumn` instances in the `GanttColumns` collection for the fields of the data source you want to show. Their `Field` parameter defines which property from the model is shown in the column. You can provide the collection of models to the Gantt in its `Data` parameter.

Since the Gantt is designed for hierarchical data, you should also define which column will hold the expand/collapse arrow for the child items. It can be any column, not necessarily the first, and you denote it by setting its `Expandable` parameter to `true`.

You can read more details on how to tie the Gantt to your data fields and child elements in the [Data Binding Overview](slug:gantt-data-binding-overview) article. It provides information on the features of the model, and describing the parent-child relationships in two different ways.

>caption Provide data to the Gantt and choose which columns (fields) to see

<demo metaUrl="client/gantt/bound/example-1/" height="740"></demo>

>tip You can also use a string for the field name, using the `nameof` operator is not necessary.The field name is, however, **case-sensitive**.

>tip The `Data` collection can be an `ObservableCollection`, an array, a `List` - it must only implement `IEnumerable`.


## Gantt Bound Column Parameters

The Blazor Gantt Bound Column provides various parameters to configure the component. Also check the [Gantt public API](slug:Telerik.Blazor.Components.TelerikGantt-1).

### Data Binding

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `Expandable` | `bool` | When set to true, the column shows an expand/collapse arrow in front of the value and denotes hierarchy be intending it. Set this to at least one column of your treelist to showcase the hierarchical nature of the data. |
| `Field` | `string` | The name of the field in the data source that the column will render as a string (case-sensitive). Set its as a plain string (`Field="SomeField"`) or to have .NET extract the field name from the model for flat models (`Field=@nameof(MyModelClass.SomeFIeld)`). |

### Appearance

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Title` | `string` | The text that is rendered in the column header. See the Notes below for its behavior. |
| `DisplayFormat` | `string` | The C# format string that is used to render the field value in the cell when the Gantt is in display mode. Read more in the [Column Display Format](slug:treelist-columns-displayformat) article. |
| `TextAlign` | `ColumnTextAlign` enum <br /> (`Left`) | Specifies the horizontal alignment of the cell text. |
| `Width` | `string` | The width of the column. See the [Dimensions](slug:common-features/dimensions) article for information about the supported formats. See [Gantt Column Width Behavior](slug:gantt-columns-width) for detailed information about the Gantt behavior with different column width configurations. |
| `MinResizableWidth` | `int` <br /> (`30`) | The minimum allowed column width during [user resizing](slug:gantt-columns-resize). Unlike the string `Width` property, this one is decimal and expects pixel values. |
| `MaxResizableWidth` | `int` | The maximum allowed column width during [user resizing](slug:gantt-columns-resize). Unlike the string `Width` property, this one is decimal and expects pixel values. |
| `Visible` | `bool?` <br /> (`null`) | If this parameter is set to `false`, it hides the column from the Gantt Tree. Accepts both `bool` and `bool?` types, and `null` is treated like `true`. |
| `HeaderClass` | `string` | Adds a custom CSS class to the header cell of the column. Use it to apply custom styles or [override the default Gantt styles](slug:themes-override). |

## Notes

* For advanced operations such as filtering and sorting, you *must* set a `Field` to the column, and the field it points to must be a string or a value type (such as a number, string, DateTime, boolean).
    * If a `Field` is not set the column will not allow filtering, sorting and editing for the column.
    * If the `Field` points to a custom object or something like an `IDictionary`, errors will be thrown upon those actions because there are no known data operations for reference types in .NET, except for strings.

* If you don't set a `Title` for a column, the Gantt will take the `[Display(Name = "My Column Title")]` data annotation attribute from the model field. If that's not available either, the name of the field will be shown.

* If the model has a `[DisplayFormat(DataFormatString = "{0:C}")]` data annotation attribute, the display format will be taken from the format string in the attribute.

* If you want to prevent data mutation for a specific property you can set the `Editable` parameter of the TreeListColumn or the `[Editable]` data annotation attribute to `false` for the desired model field.
    * Columns generated out of model properties that do not have a `setter` or it is not accessible (private) will not be editable too.

* The Gantt uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert action is invoked, so the Model should have a Parameterless constructor defined. 
