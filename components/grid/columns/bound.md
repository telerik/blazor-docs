---
title: Data Binding
page_title: Blazor Grid - Data Bound Columns - Telerik UI for Blazor
description: Learn how to bind the Telerik UI for Blazor Grid to data and configure the appearance, behavior, operations, and templates of bound columns.
slug: components/grid/columns/bound
tags: telerik,blazor,grid,bound,column
published: True
position: 0
components: ["grid"]
---

# Grid Data Bound Columns

This article explains the basics of showing data in a grid and the features of its bound columns.

Important related information is available in the [Grid data binding fundamentals](slug:grid-data-binding) article.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

Sections in this article:

* [Show Data in a Grid](#show-data-in-a-grid) (with video tutorial)
* [Grid Bound Column Parameters](#grid-bound-column-parameters)
* [Notes](#notes)


## Show Data in a Grid

To show data in a grid, you must define `GridColumn` instances in the `GridColumns` collection for the fields of the data source you want to show. Their `Field` parameter defines which property from the model is shown in the column. You can provide the collection of models to the grid in its `Data` parameter.

>caption Provide data to the grid and choose which columns (fields) to see

<demo metaUrl="client/grid/columns-bound/" height="500"></demo>

>tip You can also use a string for the field name, using the `nameof` operator is not necessary. For example, the ID column can be defined like this: `<GridColumn Field="Id" />`. The field name is, however, **case-sensitive**.

>tip The `Data` collection can be an `ObservableCollection`, an array, or a `List`, and it must implement `IEnumerable`.

>caption Video tutorial - Get started with Telerik Data Grid for Blazor

<iframe title="Get started with the Telerik UI for Blazor Grid" width="560" height="315" src="https://www.youtube.com/embed/NW2hHtmM2Gk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Grid Bound Column Parameters

You can use the following properties on bound columns:

### Data Binding

* `Field`&mdash;(defaults to `null`)&mdash;the name of the field in the data source that the column will render as a string (case-sensitive). You can set it as a plain string (`Field="SomeField"`) or let .NET extract the field name from the model for flat models (`Field=@nameof(MyModelClass.SomeField)`).
* `FieldType`&mdash;when binding the Grid to an `object` rather than a real model, set this to the `typeof` value of the field the column displays. This applies when <a href="https://github.com/telerik/blazor-ui/tree/master/grid/binding-to-expando-object" target="_blank">binding to expando objects</a>, using [OnRead with grouping](slug:components/grid/manual-operations#grouping-with-onread), or <a href="https://demos.telerik.com/blazor-ui/grid/data-table" target="_blank">binding to a DataTable</a>.

### Appearance

* `Title`&mdash;the text rendered in the column header. See the Notes section for its behavior.
* `DisplayFormat`&mdash;the C# format string used to render the field value in the cell when the Grid is in display mode. Read more in the [Column Display Format](slug:grid-columns-displayformat) article. `DisplayFormat` does not convert UTC values to the browser user's local time zone. For an example, see [Display UTC Time in the User's Local Time](slug:grid-display-utc-time-in-local-time).
* `TextAlign`&mdash;specifies the horizontal alignment of the **data** cells. For example, use this property to right-align numeric columns. The property accepts `ColumnTextAlign` enum values (`Left`, `Right`, or `Center`). If not set, text alignment depends on existing page styles, default browser behavior, and text direction. Header cell alignment requires a different approach with `HeaderClass` and [custom CSS](slug:themes-override). See [Center Grid column header text](slug:grid-kb-center-column-header-content).
* `OnCellRender`&mdash;an event that fires when the Grid renders its columns. For more information, read the [column events](slug:grid-column-events#oncellrender) article.
* `HeaderClass`&mdash;`string` that adds a custom CSS class to the column header cell. Use it to apply custom styles or [override the default Grid styles](slug:themes-override).
* `Reorderable`&mdash;(defaults to `true`) determines whether the user can [drag to reorder](slug:components/grid/columns/reorder) this column.
* `Resizable`&mdash;(defaults to `true`) determines whether the user can [resize](slug:components/grid/columns/resize) this column.
* `Width`&mdash;(defaults to `null`) specifies the column width. See the [Dimensions](slug:common-features/dimensions) article for supported formats. See [Grid Column Width Behavior](slug:grid-columns-width) for details about Grid behavior with different column width configurations.
* `MinResizableWidth`&mdash;(defaults to `30` and ignores smaller values) specifies the minimum column width during [user resizing](slug:components/grid/columns/resize). Unlike the `Width` string property, this property is a decimal that expects pixel values.
* `MaxResizableWidth`&mdash;(defaults to `0`) specifies the maximum column width during [user resizing](slug:components/grid/columns/resize). Unlike the `Width` string property, this property is a decimal that expects pixel values.
* `Lockable`&mdash;(defaults to `true`) determines whether the user can [pin the column](slug:grid-columns-frozen) through the [Column Menu](slug:grid-column-menu).
* `Locked`&mdash;(defaults to `false`) determines whether the column is [locked](slug:grid-columns-frozen) and always visible to the user.
* `Visible`&mdash;(defaults to `null`) determines whether the column is [hidden](slug:grid-columns-visible) when set to `false`. Accepts both `bool` and `bool?` types. A value of `null` is treated as `true`.
* `Columns`&mdash;a nested tag where you can declare [multiple column headers](slug:grid-columns-multiple-column-headers).
* `ShowColumnMenu`&mdash;(defaults to `true`) determines whether the [Column Menu](slug:grid-column-menu) is enabled for the column.
* `VisibleInColumnChooser`&mdash;(defaults to `true`) determines whether the column appears in the Column Chooser of the [Column Menu](slug:grid-column-menu).

### Identification

* `Id`&mdash;a unique identifier of the Grid column. Use it to associate the column with the corresponding item in the Column Chooser when columns are organized in [sections](slug:grid-column-menu#sections).
* `ref`&mdash;the standard Blazor reference name.

### Data Operations

* `Editable`&mdash;(defaults to `true`) sets whether the column is read-only and prevents [editing](slug:grid-editing-overview) of this field when set to `false`. To edit data, you also need a [CommandColumn](slug:components/grid/columns/command).
* `EditorType`&mdash;sets the [editor component for `string` or `DateTime` columns](slug:grid-editing-overview#column-editors) when an [`EditorTemplate`](slug:grid-templates-editor) is not used.
* `Filterable`&mdash;(defaults to `true`) determines whether a [filterable](slug:components/grid/filtering) Grid lets the user filter the column. Set it to `false` to disable filtering.
* `FilterEditorType`&mdash;(defaults to `GridFilterEditorType.DatePicker`) determines whether the default filtering component of a `DateTime` column is a DatePicker or a DateTimePicker.
* `FilterEditorFormat`&mdash;sets the `Format` of the filtering component as a `string`. Works for DateTime and numeric columns. Do not use a placeholder (for example, set `"D"`, not `"{0:D}"`).
* `Sortable`&mdash;(defaults to `true`) determines whether the user can [sort](slug:components/grid/features/sorting) this column. Set it to `false` to disable sorting.
* `Groupable`&mdash;(defaults to `true`) determines whether the user can [group](slug:components/grid/features/grouping) the Grid by this column.

### Templates

* `Template`&mdash;can also be used as an inner tag to define the [column display content](slug:grid-templates-column). It can also point to a component name.
* `Context`&mdash;the standard Blazor context variable name for use inside the inline template.
* `EditorTemplate`&mdash;can also be used as an inner tag to define the [column edit content](slug:grid-templates-editor). It can also point to a component name.
* `FilterCellTemplate`&mdash;can also be used as an inner tag to customize [the Grid Filter Row](slug:grid-templates-filter#filter-row-template). It can also point to a component name.
* `FilterMenuTemplate`&mdash;can also be used as an inner tag to customize [the Grid Filter Menu](slug:grid-templates-filter#filter-menu-template). It can also point to a component name.

>tip You can find more examples in the rest of the Grid documentation and in the [Telerik live demos](https://demos.telerik.com/blazor-ui/grid/overview).

>tip The Grid can [automatically generate](slug:grid-columns-automatically-generated) its columns out of the public properties of the model.

## Notes

* For advanced operations such as grouping, filtering, and sorting, you must set a `Field` to the column. The field must point to a string or value type, such as a number, string, DateTime, or Boolean.
    * If a `Field` is not set the column will not allow filtering, grouping, sorting and editing for the column.
    * If the `Field` points to a custom object or something like an `IDictionary`, `List`, or `Array`, errors are thrown during those actions because .NET has no known data operations for reference types except strings. To handle such scenarios, you can flatten the collection and the underlying model.
    * To bind to nested (complex) models (also called navigation properties), use only the name of the field that holds the child class and its own field. For an example, see the [Bind to navigation properties in complex objects](slug:grid-use-navigation-properties) article.

* The `Field` of the column must point to a property in the model that has a public getter so that the grid can display data. For editing to be enabled, the property must have a public setter. For example:

    ````C#
    public class MyModel
    {
        public int WorkingProperty { get; set; } // Has a public getter and setter, so the Grid can display and edit it.
        public int NonWorkingProperty { private get; set; } // Has no public getter, so the Grid cannot display it.
    }
    ````

* **Foreign Keys**&mdash;using foreign tables and keys is usually done through the Grid templates. You can read more and find examples in the [Grid - Foreign Key](slug:grids-foreign-key) Knowledge Base article.

* The Grid skips fields marked with the [`IgnoreDataMemberAttribute`](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.serialization.ignoredatamemberattribute) when performing create, update, and delete (CUD) operations. Its presence indicates that this property does not need to be part of the serialized data, and skipping such fields allows [Lazy Loading Proxies in EF](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.proxiesextensions.uselazyloadingproxies?view=efcore-3.1) to work.

* If you don't set a `Title` for a column, the grid will take the `[Display(Name = "My Column Title")]` data annotation attribute from the model field. If that's not available either, the name of the field will be shown.

* If the model has a `[DisplayFormat(DataFormatString = "{0:C}")]` data annotation attribute, the display format will be taken from the format string in the attribute.

* If you want to prevent data mutation for a specific property you can set the `Editable` parameter of the GridColumn or the `[Editable]` data annotation attribute to `false` for the desired model field.
    * Columns generated out of model properties that do not have a `setter` or it is not accessible (private) will not be editable too.

* The Grid uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert action is invoked, so the model needs a parameterless constructor. A workaround is [invoking Insert through the grid state](slug:grid-kb-add-edit-state) and creating the object with your own code.

* The `Data` collection of the Grid must contain instances of only one model type. You cannot bind the Grid to a base class and populate its data with instances of inherited classes. Extra fields from inherited classes may not work or may throw exceptions because the Grid does not know about them when its `Data` collection uses the base class type.

>tip You can optimize database queries in two ways:
>
> * Use an `IQueryable<MyModel>` collection for the grid `Data`. The grid will build a LINQ expression internally that will be resolved only when needed. This can be useful when the `Data` comes from something like an EntityFramework context.
> * Implement [manual data source operations](slug:components/grid/manual-operations) and implement the desired query yourself.

## See Also

* [Live Demo: Grid Columns](https://demos.telerik.com/blazor-ui/grid/columns)
* [Blazor Grid](slug:grid-overview)
