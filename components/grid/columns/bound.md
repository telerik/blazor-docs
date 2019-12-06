---
title: Data Binding
page_title: Grid for Blazor | DataBound Column
description: Data binding and bound column properties in Grid for Blazor
slug: components/grid/columns/bound
tags: telerik,blazor,grid,bound,column
published: True
position: 0
---

# Grid Bound Column

This article explains the basics of showing data in a grid and the features of its bound columns.

Sections in this article:

* [Show Data In A Grid](#show-data-in-a-grid)
* [Grid Bound Column Parameters](#grid-bound-column-parameters)


## Show Data In A Grid

To show data in a grid, you must define `GridColumn` instances in the `GridColumns` collection for the fields of the data source you want to show. Their `Field` parameter defines which property from the model is shown in the column. You can provide the collection of models to the grid in its `Data` parameter.

>caption Provide data to the grid and choose which columns (fields) to see

````CSHTML
@* define data, model and columns for a grid *@

<TelerikGrid Data="@MyData">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
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
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````


>tip You can also use a string for the field name, using the `nameof` operator is not necessary. For example, the ID column can be defined like this: `<GridColumn Field="Id" />`.

>tip The `Data` collection can be an `ObservableCollection`, an array, a `List` - it must only implement `IEnumerable`.



## Grid Bound Column Parameters

You can use the following properties on the bound columns:

* `Field` - the name of the field in the data source that the column will render as a string. You can set its as a plain string (`Field="SomeField"`) or to have .NET extract the field name from the model (`Field=@nameof(MyModelClass.SomeFIeld)`).
* `Title` - the text that is rendered in the column header.
* `Editable` - you can set this property to `true` or `false` to allow or prevent [editing]({%slug components/grid/overview%}#editing) of this field. Defaults to `true`. To edit data, you also need a [CommandColumn]({%slug components/grid/columns/command%}).
* `Filterable` - you can set this to `false` so a [filterable]({%slug components/grid/filtering%}) grid will not let the user filter that particular column.
* `Groupable` - whether the use can [group]({%slug components/grid/features/grouping%}) the grid by this column.
* `Reorderable` - whether the user can [drag to reorder]({%slug components/grid/columns/reorder%}) this column.
* `Resizable` - whether the user can [resize]({%slug components/grid/columns/resize%}) this column.
* `Width` - the width of the column. See the [Dimensions]({%slug common-features/dimensions%}) article. Keep in mind that these are columns in a `<table>`, so it is often a good practice to leave one column without explicit dimensions so it can accommodate the remaining width and changes to the container size.
* `Template` - this property can also be used as an inner tag and it lets you define the [column display content]({%slug components/grid/features/templates%}#column-template). It can also point to a component name.
* `Context` - the standard Blazor context variable name for use inside the inline template.
* `ref` - the standard Blazor reference name.
* `EditorTemplate` - this property can also be used as an inner tag and it lets you define the [column edit content]({%slug components/grid/features/templates%}#edit-template). It can also point to a component name.

For an example of the column usage, see the [Grid Overview]({%slug components/grid/overview%}), the rest of the documentation and our [live demos](https://demos.telerik.com/blazor-ui/grid/overview).

>note For advanced operations such as grouping, filtering, sorting, you *must* set a `Field` to the column, and the field it points to must be a primitive type. If a `Field` is not set or it points to a custom object or something like an IDictionary, errors will be thrown because there are no known data operations on non-primitive types in .NET. An alternative is to implement all data source operations yourself by handling the [OnRead event](../manual-operations).

## See Also

  * [Live Demo: Grid Columns](https://demos.telerik.com/blazor-ui/grid/columns)
