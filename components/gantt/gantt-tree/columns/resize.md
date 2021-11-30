---
title: Resize
page_title: Gantt Tree - Resize Columns
description: Drag to resize columns in the Gantt Chart for Blazor.
slug: gantt-columns-resize
tags: telerik,blazor,gantt,column,resize,drag
published: True
position: 3
---

# Resize Columns

The Gantt Tree features two different column resizing mechanisms:

* [Resize by Dragging](#resize-by-dragging)
* [Fit to Content](#autofit-columns)

The [example at the end of this page](#example) shows both options in action.

## Resize by Dragging

The Gantt Tree allows users to resize columns by dragging the borders between header cells.

To enable column resizing, set the `Resizable` parameter of the grid to `true`.

To prevent the user from resizing a certain column, set its own parameter `Resizable="false"`. The user will still be able to resize other columns around it.

Here a few notes on the resizing behavior:

* If the column `Width` is less than `MinResizableWidth` and the user tries to resize the column, it will snap to its minimum width.
* Similarly, if the column `Width` is greater than `MaxResizableWidth`, the column will snap to its maximum width.

## Autofit Columns

When column resizing is enabled, a double click on the resize handle between the header cells will automatically fit the column width to the content of the header, data and footers. This will remove text wrapping in the component.

Autofitting specific columns preserves the current widths of all the other columns. Similar to [column resizing](#resize-by-dragging), column autofitting can trigger a horizontal Gantt Tree scrollbar, or leave empty space after the last column.


## Example

>caption Enable column resizing in Telerik Gantt Tree

````CSHTML
@* Drag the border between column headers to change the column size. *@

<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId">
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Resizable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Resizable="true"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="End"
                     Resizable="true"
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

## See Also

  * [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/gantt/column-resizing)
