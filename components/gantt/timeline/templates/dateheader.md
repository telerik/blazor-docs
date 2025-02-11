---
title: Date Header
page_title: Date Header
description: Date header templates for the Gantt Timeline 
slug: gantt-dateheader-template
tags: telerik,blazor,gantt,dateheader,template
published: True
position: 5
---

# Date Header

The `Date Header` provides you with full control over the rendering for each header view slot of the Timeline. The Date Header templates will be implemented inside the settings of the corresponding view parent tag.

| GanttViews | Major slot header| Minor slot header|
| ----------- | ----------- | ----------- |
| `DayView` | `DayHeaderTemplate` | `TimeHeaderTemplate` |
| `WeekView` | `WeekHeaderTemplate` | `DayHeaderTemplate` |
| `MonthView` | `MonthHeaderTemplate` | `WeekHeaderTemplate` |
| `YearView` | `YearHeaderTemplate` | `MonthHeaderTemplate` |

The templates are `RenderFragment<DateTime>`, so the `context` is of type `DateTime`.
When both `Template` and [`DateFormat`](slug:gantt-columns-dateformat) are specified, the `Template` will be rendered. 


### Notes

The `CurrentInfo.CurrentCulture` is used when rendering the formats, so if you need specific formats for specific users, you must set the culture of the app accordingly.

### Example

>caption Customize the date header of each slot of the timeline.

````RAZOR
@using System.Globalization

<TelerikGantt Data="@Data"
              Width="1200px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem"
              OnCreate="@CreateItem">
    <GanttToolBarTemplate>
        <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</GanttCommandButton>
    </GanttToolBarTemplate>
    <GanttViews>
        <GanttDayView>
            <DayHeaderTemplate>
                <strong>@string.Format(CultureInfo.CurrentCulture, "Day: {0:dddd}", context)</strong>
            </DayHeaderTemplate>
            <TimeHeaderTemplate>
                @string.Format(CultureInfo.CurrentCulture, "Time: {0:HH:mm}", context)
            </TimeHeaderTemplate>
        </GanttDayView>
        <GanttWeekView>
            <WeekHeaderTemplate>
                <strong>@string.Format(CultureInfo.CurrentCulture,"Week start: {0:MMMM dd}", context)</strong>
            </WeekHeaderTemplate>
            <DayHeaderTemplate>
                @string.Format(CultureInfo.CurrentCulture,"Day: {0:dddd}", context)
            </DayHeaderTemplate>
        </GanttWeekView>
        <GanttMonthView>
            <MonthHeaderTemplate>
                <strong>@string.Format(CultureInfo.CurrentCulture, "Month: {0:MMMM}", context)</strong>
            </MonthHeaderTemplate>
            <WeekHeaderTemplate>
                @string.Format(CultureInfo.CurrentCulture,"Week: {0:dd}", context)
            </WeekHeaderTemplate>
        </GanttMonthView>
        <GanttYearView>
            <YearHeaderTemplate>
                <strong>@string.Format(CultureInfo.CurrentCulture, "Year: {0:yyyy}", context)</strong>
            </YearHeaderTemplate>
            <MonthHeaderTemplate>
                @string.Format(CultureInfo.CurrentCulture, "Month: {0:MMM}", context)
            </MonthHeaderTemplate>
        </GanttYearView>
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
        <GanttCommandColumn>
            <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="@SvgIcon.Trash"></GanttCommandButton>
        </GanttCommandColumn>
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

    private async Task CreateItem(GanttCreateEventArgs args)
    {
        var argsItem = args.Item as FlatModel;

        argsItem.Id = LastId++;

        if (args.ParentItem != null)
        {
            var parent = (FlatModel)args.ParentItem;

            argsItem.ParentId = parent.Id;
        }

        Data.Insert(0, argsItem);

        CalculateParentPercentRecursive(argsItem);
        CalculateParentRangeRecursive(argsItem);
    }

    private async Task UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as FlatModel;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            var startOffset = item.Start - foundItem.Start;
            if (startOffset != TimeSpan.Zero)
            {
                MoveChildrenRecursive(foundItem, startOffset);
            }

            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }

        CalculateParentPercentRecursive(foundItem);
        CalculateParentRangeRecursive(foundItem);
    }

    private async Task DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);

        CalculateParentPercentRecursive(item);
        CalculateParentRangeRecursive(item);
    }

    public void OnItemExpand(GanttExpandEventArgs args)
    {
        var item = args.Item as FlatModel;

    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = GetChildren(item).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }

    private void CalculateParentPercentRecursive(FlatModel item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.PercentComplete = children.Average(i => i.PercentComplete);

                CalculateParentPercentRecursive(parent);
            }
        }
    }

    private void CalculateParentRangeRecursive(FlatModel item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.Start = children.Min(i => i.Start);
                parent.End = children.Max(i => i.End);

                CalculateParentRangeRecursive(parent);
            }
        }
    }

    private void MoveChildrenRecursive(FlatModel item, TimeSpan offset)
    {
        var children = GetChildren(item);

        foreach (var child in children)
        {
            child.Start = child.Start.Add(offset);
            child.End = child.End.Add(offset);

            MoveChildrenRecursive(child, offset);
        }
    }

    private FlatModel GetParent(FlatModel item)
    {
        return Data.FirstOrDefault(i => i.Id.Equals(item.ParentId));
    }

    private IEnumerable<FlatModel> GetChildren(FlatModel item)
    {
        return Data.Where(i => item.Id.Equals(i.ParentId));
    }
}
````


## See Also

  * [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)