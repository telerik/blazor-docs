---
title: DataBound Column
page_title: TreeList - DataBound Column
description: Data binding and bound column properties in treelist for Blazor.
slug: treelist-columns-bound
tags: telerik,blazor,treelist,bound,column
published: True
position: 0
---

# TreeList DataBound Column

This article explains the basics of showing data in a treelist and the features of its bound columns.

Sections in this article:

* [Show Data In A TreeList](#show-data-in-a-treelist)
* [TreeList Bound Column Parameters](#treelist-bound-column-parameters)
* [Notes](#notes)


## Show Data In A TreeList

To show data in a treelist, you must define `TreeListColumn` instances in the `TreeListColumns` collection for the fields of the data source you want to show. Their `Field` parameter defines which property from the model is shown in the column. You can provide the collection of models to the treelist in its `Data` parameter.

Since the treelist is designed for hierarchical data, you should also define which column will hold the expand/collapse arrow for the child items. It can be any column, not necessarily the first, and you denote it by setting its `Expandable` parameter to `true`.

You can read more details on how to tie the treelist to your data fields and child elements in the [Data Binding Overview]({%slug treelist-data-binding-overview%}) article. It provides information on the features of the model, and describing the parent-child relationships in two different ways.

>caption Provide data to the treelist and choose which columns (fields) to see

````CSHTML
@* define data, model and columns for a treelist *@

@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@

<TelerikTreeList Data="@Data" Pageable="true" IdField="Id" ParentIdField="ParentId" Width="650px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Employee> Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample models and data generation

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        [Display(Name = "Employee Name")]
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
        public string Team { get; set; } // in this example we don't use this field (in the treelist)
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null,
                Name = $"root: {i}",
                HireDate = DateTime.Now.AddYears(-i)
            }); ;

            for (int j = 1; j < 4; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child {j} of {i}",
                    HireDate = DateTime.Now.AddDays(-currId)
                });

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = currId * 1000 + k;
                    data.Add(new Employee
                    {
                        Id = nestedId,
                        ParentId = currId,
                        Name = $"second level child {k} of {i} and {currId}",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

>tip You can also use a string for the field name, using the `nameof` operator is not necessary. For example, the ID column can be defined like this: `<TreeListColumn Field="Id" />`. The field name is, however, **case-sensitive**.

>tip The `Data` collection can be an `ObservableCollection`, an array, a `List` - it must only implement `IEnumerable`.



## TreeList Bound Column Parameters

You can use the following properties on the bound columns:

* `Expandable` - when set to true, the column shows an expand/collapse arrow in front of the value and denotes hierarchy be intending it. You should set this to at least one column of your treelist to showcase the hierarchical nature of the data.
* `Field` - the name of the field in the data source that the column will render as a string (case-sensitive). You can set its as a plain string (`Field="SomeField"`) or to have .NET extract the field name from the model for flat models (`Field=@nameof(MyModelClass.SomeFIeld)`).
* `Title` - the text that is rendered in the column header.
* `Editable` - you can set this property to `true` or `false` to allow or prevent [editing]({%slug treelist-overview%}#editing) of this field. Defaults to `true`. To edit data, you also need a [CommandColumn]({%slug treelist-columns-command%}).
* `Filterable` - you can set this to `false` so a [filterable]({%slug treelist-filtering%}) treelist will not let the user filter that particular column.
* `Locked` - defines whether the column is [locked (frozen, pinned)]({%slug treelist-columns-frozen%}).
* `Sortable` - set it to `false` so the user cannot [sort]({%slug treelist-sorting%}) this column.
* `Reorderable` - whether the user can [drag to reorder]({%slug treelist-columns-reorder%}) this column.
* `Resizable` - whether the user can [resize]({%slug treelist-columns-resize%}) this column.
* `Width` - the width of the column. See the [Dimensions]({%slug common-features/dimensions%}) article. Keep in mind that these are columns in a `<table>`, so it is often a good practice to leave one column without explicit dimensions so it can accommodate the remaining width and changes to the container size.
* `Template` - this property can also be used as an inner tag and it defines the [custom cell content]({%slug treelist-templates-column%}) that renders instead of the default field value the treelist puts in it.
* `HeaderTemplate` - this property can also be used as an inner tag and defines the custom contents of the [header cell]({%slug treelist-templates-column-header%}) that you can render instead of the Title.
* `EditorTemplate` - this property can also be used as an inner tag and defines a [custom input and logic that is used for editing the field]({%slug treelist-templates-editor%}).


>tip You can find more examples in the rest of the treelist documentation and in our [live demos](https://demos.telerik.com/blazor-ui/treelist/overview).


## Notes

* For advanced operations such as filtering and sorting, you *must* set a `Field` to the column, and the field it points to must be a string or a value type (such as a number, string, DateTime, boolean).
    * If a `Field` is not set the column will not allow filtering, sorting and editing for the column.
    * If the `Field` points to a custom object or something like an `IDictionary`, errors will be thrown upon those actions because there are no known data operations on non-primitive types in .NET.
    * To bind to nested (complex) models (also called navigation properties), use only the name of the field that holds the child class and its own field. For an example, see the [Bind to navigation properties in complex objects]({%slug grid-use-navigation-properties%}) article.

* The treelist skips fields marked with the [`IgnoreDataMemberAttribute`](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.serialization.ignoredatamemberattribute) when performing CUD operations. Its presence indicates that this property does not need to be part of the serialized data anyway, and skipping such fields allows [Lazy Loading Proxies in EF](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.proxiesextensions.uselazyloadingproxies?view=efcore-3.1) to work.

* If you don't set a `Title` for a column, the treelist will take the `[Display(Name = "My Column Title")]` data annotation attribute from the model field. If that's not available either, the name of the field will be shown.

* If you want to prevent data mutation for a specific property you can set the `Editable` parameter of the TreeListColumn or the `[Editable]` data annotation attribute to `false` for the desired model field.
    * Columns generated out of model properties that do not have a `setter` or it is not accessible (private) will not be editable too.

* The treelist uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert action is invoked, so the Model should have a Parameterless constructor defined. 

<!-- A workaround might be [invoking Insert through the treelist state]({%slug treelist-state%}#initiate-editing-or-inserting-of-an-item) and creating the object with your own code. -->


>tip You can improve performance by loading child nodes only when the user expands them. Read more in the [Load on Demand]({%slug treelist-data-binding-load-on-demand%}) article.

## See Also

  * [Live Demo: TreeList Columns](https://demos.telerik.com/blazor-ui/treelist/columns)
