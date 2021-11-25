---
title: Data Binding
page_title: Blazor Grid - Data Bound Columns | Telerik UI for Blazor
description: Data binding and bound column properties in Grid for Blazor.
slug: components/grid/columns/bound
tags: telerik,blazor,grid,bound,column
published: True
position: 0
---

# Grid Data Bound Columns

This article explains the basics of showing data in a grid and the features of its bound columns.

Important related information are the [Grid data binding fundamentals]({%slug grid-data-binding%}).

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

Sections in this article:

* [Show Data In A Grid](#show-data-in-a-grid) (with video tutorial)
* [Grid Bound Column Parameters](#grid-bound-column-parameters)
* [Notes](#notes)


## Show Data In A Grid

To show data in a grid, you must define `GridColumn` instances in the `GridColumns` collection for the fields of the data source you want to show. Their `Field` parameter defines which property from the model is shown in the column. You can provide the collection of models to the grid in its `Data` parameter.

>caption Provide data to the grid and choose which columns (fields) to see

````CSHTML
@* define data, model and columns for a grid *@

@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@

<TelerikGrid Data="@MyData">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" />
        <GridColumn Field="@(nameof(SampleData.Name))" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        [Display(Name = "Employee Name")]
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

>tip You can also use a string for the field name, using the `nameof` operator is not necessary. For example, the ID column can be defined like this: `<GridColumn Field="Id" />`. The field name is, however, **case-sensitive**.

>tip The `Data` collection can be an `ObservableCollection`, an array, a `List` - it must only implement `IEnumerable`.

>caption Video tutorial - Get started with Telerik Data Grid for Blazor

<iframe width="560" height="315" src="https://www.youtube.com/embed/NW2hHtmM2Gk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Grid Bound Column Parameters

You can use the following properties on bound columns:

### Data Binding

* `Field` - (defaults to `null`) - the name of the field in the data source that the column will render as a string (case-sensitive). You can set its as a plain string (`Field="SomeField"`) or to have .NET extract the field name from the model for flat models (`Field=@nameof(MyModelClass.SomeFIeld)`).
* `FieldType` - when binding the grid to an `object` rather than a real model, set this to the `typeof` the field the column will be displaying. Such a case would be <a href="https://github.com/telerik/blazor-ui/tree/master/grid/binding-to-expando-object" target="_blank">binding to expando objects</a>, using [OnRead with grouping]({%slug components/grid/manual-operations%}#grouping-with-onread) or <a href="https://demos.telerik.com/blazor-ui/grid/data-table" target="_blank">binding to a DataTable</a>.

### Appearance

* `Title` - the text that is rendered in the column header. See the Notes below for its behavior.
* `DisplayFormat` - the C# format string that is used to render the field value in the cell when the grid is in display mode. Read more in the [Column Display Format]({%slug grid-columns-displayformat%}) article.
* `TextAlign` - specifies the horizontal alignment of the cell text. For example, you can use this property to right-align numeric columns. The property accepts `ColumnTextAlign` enum values (`Left`, `Right` or `Center`). If not set, the text alignment will depend on existing styles on the page, default browser behavior and the text direction.
* `OnCellRender` - an event that fires upon the rendering of the Grids columns. For more information read the columns [events]({%slug grid-column-events%}#oncellrender) article.
* `Reorderable` - (defaults to `true`) - whether the user can [drag to reorder]({%slug components/grid/columns/reorder%}) this column.
* `Resizable` - (defaults to `true`) - whether the user can [resize]({%slug components/grid/columns/resize%}) this column.
* `Width` - (defaults to `null`) - the width of the column. See the [Dimensions]({%slug common-features/dimensions%}) article for information about the supported formats. See [Grid Column Width Behavior]({%slug grid-columns-width%}) for detailed information about the Grid behavior with different column width configurations.
* `MinResizableWidth` - (defaults to `0`) - the minimum allowed column width during [user resizing]({%slug components/grid/columns/resize%}). Unlike the `Width` string property, this one is decimal.
* `MaxResizableWidth` - (defaults to `0`) - the maximum allowed column width during [user resizing]({%slug components/grid/columns/resize%}). Unlike the `Width` string property, this one is decimal.
* `Lockable` - (defaults to `true`) - determines whether the user can [pin the column]({%slug grid-columns-frozen%}) through the [column menu]({%slug grid-column-menu%}).
* `Locked` - (defaults to `false`) - if this parameter is set to true it [locks]({%slug grid-columns-frozen%}) the column so it is always visible to the user.
* `Visible` - (defaults to `null`) - if this parameter is set to `false` it [hides]({%slug grid-columns-visible%}) the column from the Grid. Accepts both `bool` and `bool?` types, and `null` is treated like `true`.
* `Columns` - a nested tag where you can declare [multiple column headers]({%slug grid-columns-multiple-column-headers%}).
* `ShowColumnMenu` - (defaults to `true`) - if set to false, disables the [column menu]({%slug grid-column-menu%}) for that particular column.
* `VisibleInColumnChooser` - (defaults to `true`) - if set to false, removes the column from the Column chooser of the [column menu]({%slug grid-column-menu%}).

### Identification

* `Id` - a unique identifier of the Grid Column. Use to associate the column to the respective item in the column chooser when the columns are organized in [sections]({%slug grid-column-menu%}#sections).  
* `ref` - the standard Blazor reference name.

### Data Operations

* `Editable` - (defaults to `true`) - you can set this property to `true` or `false` to allow or prevent [editing]({%slug components/grid/overview%}#editing) of this field. Defaults to `true`. To edit data, you also need a [CommandColumn]({%slug components/grid/columns/command%}).
* `Filterable` - (defaults to `true`) - you can set this to `false` so a [filterable]({%slug components/grid/filtering%}) grid will not let the user filter that particular column.
* `Sortable` - (defaults to `true`) - set it to `false` so the user cannot [sort]({%slug components/grid/features/sorting%}) this column.
* `Groupable` - (defaults to `true`) - whether the user can [group]({%slug components/grid/features/grouping%}) the grid by this column.

### Templates

* `Template` - this property can also be used as an inner tag and it lets you define the [column display content]({%slug components/grid/features/templates%}#column-template). It can also point to a component name.
* `Context` - the standard Blazor context variable name for use inside the inline template.
* `EditorTemplate` - this property can also be used as an inner tag and it lets you define the [column edit content]({%slug components/grid/features/templates%}#edit-template). It can also point to a component name.
* `FilterCellTemplate` - this property can also be used as an inner tag and it lets you customize [the Grid Filter Row]({%slug grid-templates-filter%}#filter-row-template). It can also point to a component name.
* `FilterMenuTemplate` - this property can also be used as an inner tag and it lets you customize [the Grid Filter Menu]({%slug grid-templates-filter%}#filter-menu-template). It can also point to a component name.

>tip You can find more examples in the rest of the grid documentation and in our [live demos](https://demos.telerik.com/blazor-ui/grid/overview).

>tip The Grid can [automatically generate]({%slug grid-columns-automatically-generated%}) its columns out of the public properties of the model.

## Notes

* For advanced operations such as grouping, filtering, sorting, you *must* set a `Field` to the column, and the field it points to must be a string or a value type (such as a number, string, DateTime, boolean).
    * If a `Field` is not set the column will not allow filtering, grouping, sorting and editing for the column.
    * If the `Field` points to a custom object or something like an `IDictionary`, `List`, and `Array` errors will be thrown upon those actions because there are no known data operations on non-primitive types in .NET. To handle such scenarios you could flatten the collection and the underlying model. 
    * To bind to nested (complex) models (also called navigation properties), use only the name of the field that holds the child class and its own field. For an example, see the [Bind to navigation properties in complex objects]({%slug grid-use-navigation-properties%}) article.

* The `Field` of the column must point to a property in the model that has a public getter so that the grid can display data. For editing to be enabled, the property must have a public setter. For example:

    **C#**
        public class MyModel
        {
            public int WorkinProperty { get; set; } // has public getter and setter so it can be shown and edited
            public int NonWorkingField // no public getter, so the grid cannot display this
        }

* **Foreign Keys** - using foreign tables and keys is usually done through the grid templates. You can read more and find examples in the [Grid - Foreign Key]({%slug grids-foreign-key%}) KnowledgeBase article.

* The grid skips fields marked with the [`IgnoreDataMemberAttribute`](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.serialization.ignoredatamemberattribute) when performing CUD operations. Its presence indicates that this property does not need to be part of the serialized data anyway, and skipping such fields allows [Lazy Loading Proxies in EF](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.proxiesextensions.uselazyloadingproxies?view=efcore-3.1) to work.

* If you don't set a `Title` for a column, the grid will take the `[Display(Name = "My Column Title")]` data annotation attribute from the model field. If that's not available either, the name of the field will be shown.

* If the model has a `[DisplayFormat(DataFormatString = "{0:C}")]` data annotation attribute, the display format will be taken from the format string in the attribute.

* If you want to prevent data mutation for a specific property you can set the `Editable` parameter of the GridColumn or the `[Editable]` data annotation attribute to `false` for the desired model field.
    * Columns generated out of model properties that do not have a `setter` or it is not accessible (private) will not be editable too.

* The Grid uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert action is invoked, so the Model should have a Parameterless constructor defined. A workaround might be [invoking Insert through the grid state]({%slug grid-state%}#initiate-editing-or-inserting-of-an-item) and creating the object with your own code.

* The `Data` collection of the grid must contain instances of only one model type. You cannot bind the grid to a base class and populate its data with instances of inherited classes (neither one, nor more than one type) - extra fields from such inherited classes may not work or may even throw exceptions because the grid will not know about them when its `Data` collection is of the base class type.

>tip You can optimize database queries in two ways:
>
> * Use an `IQueryable<MyModel>` collection for the grid `Data`. The grid will build a LINQ expression internally that will be resolved only when needed. This can be useful when the `Data` comes from something like an EntityFramework context.
> * Implement [manual data source operations](../manual-operations) and implement the desired query yourself.

## See Also

  * [Live Demo: Grid Columns](https://demos.telerik.com/blazor-ui/grid/columns)
