---
title: DataBound Column
page_title: Gantt Tree - DataBound Column
description: Data binding and bound column properties in Gantt for Blazor.
slug: gantt-columns-bound
tags: telerik,blazor,gantt,bound,column
published: True
position: 0
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

You can read more details on how to tie the Gantt to your data fields and child elements in the [Data Binding Overview]({%slug gantt-data-binding-overview%}) article. It provides information on the features of the model, and describing the parent-child relationships in two different ways.

>caption Provide data to the Gantt and choose which columns (fields) to see

````CSHTML
@* define data, model and columns for a Gantt chart *@

<TelerikGantt Data="@Data"
              Width="50%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId">
    <GanttViews>
        <GanttWeekView></GanttWeekView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="Id"
                     Visible="false">
        </GanttColumn>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title" >
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Width="60px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     TextAlign="@ColumnTextAlign.Right">
        </GanttColumn>
        <GanttColumn Field="End"
                     DisplayFormat="End: {0:d}"
                     Width="100px">
        </GanttColumn>
    </GanttColumns>
</TelerikGantt>

@code {
    public DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);

    class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public int LastId { get; set; } = 1;
    List<FlatModel> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<FlatModel>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
            {
                Id = LastId,
                Title = "Employee  " + i.ToString(),
                Start = new DateTime(2020, 12, 6 + i),
                End = new DateTime(2020, 12, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new FlatModel()
                {
                    Id = LastId,
                    ParentId = parentId,
                    Title = "    Employee " + i + " : " + j.ToString(),
                    Start = new DateTime(2020, 12, 6 + i + j),
                    End = new DateTime(2020, 12, 7 + i + j),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                });

                LastId++;
            }
        }

        base.OnInitialized();
    }
}
````

>tip You can also use a string for the field name, using the `nameof` operator is not necessary.The field name is, however, **case-sensitive**.

>tip The `Data` collection can be an `ObservableCollection`, an array, a `List` - it must only implement `IEnumerable`.


## Gantt Bound Column Parameters

You can use the following properties on bound columns:

### Data Binding

* `Expandable` - (defaults to `false`) - when set to true, the column shows an expand/collapse arrow in front of the value and denotes hierarchy be intending it. You should set this to at least one column of your treelist to showcase the hierarchical nature of the data.
* `Field` - (defaults to `null`) - the name of the field in the data source that the column will render as a string (case-sensitive). You can set its as a plain string (`Field="SomeField"`) or to have .NET extract the field name from the model for flat models (`Field=@nameof(MyModelClass.SomeFIeld)`).

### Appearance

* `Title` - the text that is rendered in the column header. See the Notes below for its behavior.
* `DisplayFormat` - the C# format string that is used to render the field value in the cell when the grid is in display mode. Read more in the [Column Display Format]({%slug treelist-columns-displayformat%}) article.
* `TextAlign` - specifies the horizontal alignment of the cell text. For example, you can use this property to right-align numeric columns. The property accepts `ColumnTextAlign` enum values (`Left`, `Right` or `Center`). If not set, the text alignment will depend on existing styles on the page, default browser behavior and the text direction.
* `Visible` - (defaults to `null`) - if this parameter is set to `false` it hides the column from the Gantt Tree. Accepts both `bool` and `bool?` types, and `null` is treated like `true`.

## Notes

* For advanced operations such as filtering and sorting, you *must* set a `Field` to the column, and the field it points to must be a string or a value type (such as a number, string, DateTime, boolean).
    * If a `Field` is not set the column will not allow filtering, sorting and editing for the column.
    * If the `Field` points to a custom object or something like an `IDictionary`, errors will be thrown upon those actions because there are no known data operations on non-primitive types in .NET.

* If you don't set a `Title` for a column, the Gantt will take the `[Display(Name = "My Column Title")]` data annotation attribute from the model field. If that's not available either, the name of the field will be shown.

* If the model has a `[DisplayFormat(DataFormatString = "{0:C}")]` data annotation attribute, the display format will be taken from the format string in the attribute.

* If you want to prevent data mutation for a specific property you can set the `Editable` parameter of the TreeListColumn or the `[Editable]` data annotation attribute to `false` for the desired model field.
    * Columns generated out of model properties that do not have a `setter` or it is not accessible (private) will not be editable too.

* The Gantt uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert action is invoked, so the Model should have a Parameterless constructor defined. 
