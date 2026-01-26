---
title: Persist Gantt TreeList after Refresh
description: How to persist the width of the Gantt's treelist after refreshing its data?
type: how-to
page_title: How to Display Model Fields in the Gantt Tooltip?
slug: gantt-kb-persist-treelist-width-after-refresh
tags: gantt, blazor, treelist, width
res_type: kb
ticketid: 1690467
components: ["gantt"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Gantt for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

If I resize the TreeList part of the Gantt, it gets back to its initial width, after I refresh the Gantt's data. How can I persist the current TreeList width?

## Solution

To persist the current TreeList width, follow the steps below:

1. Bind the `TreeListWidth` parameter of the Gantt to a property. In the example below, the property is named `ListWidth`.
2. In the methods that manipulate the data of the Gantt (`AddRootTask` and `RemoveTask`), use JavaScript interop to invoke a function. The logic in the function gets and returns the current width of the TreeList.  
3. Use the current width value to update the value of the `ListWidth` property, before refreshing the data by calling `.Rebind()`.

````RAZOR
@inject IJSRuntime JS

<TelerikButton OnClick="@AddRootTask">Add root task</TelerikButton>

<TelerikButton OnClick="@RemoveTask">Remove Task 1</TelerikButton>

<TelerikGantt @ref="@GanttRef"
              Data="@GanttData"
              @bind-View="@SelectedView"
              Width="1000px"
              TreeListWidth="@ListWidth"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="150px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="60px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="90px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="End"
                     Width="90px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>

<script suppress-error="BL9992">
    function getListSize() {
       var listWidth = document.querySelector('.k-gantt .k-treelist').offsetWidth;
       return listWidth + "px";
    }
</script>

@code {
    private TelerikGantt<FlatModel>? GanttRef { get; set; }
    private string ListWidth { get; set; } = "390px";
    private int LastId { get; set; } = 1;
    private List<FlatModel> GanttData { get; set; }
    private GanttView SelectedView { get; set; } = GanttView.Week;

    private async Task AddRootTask()
    {
        var i = GanttData.Last().Id + 1;

        GanttData.Insert(0, new FlatModel()
        {
            Id = i,
            ParentId = null,
            Title = "new task",
            PercentComplete = 0,
            Start = new DateTime(2021, 7, 5),
            End = new DateTime(2021, 7, 15)
        });

        var currentListWidth = await JS.InvokeAsync<string>("getListSize");
        ListWidth = currentListWidth;

        GanttRef?.Rebind();
    }

    private async Task RemoveTask()
    {
        var taskToRemove = GanttData.FirstOrDefault(x => x.Title == "Task 1");

        GanttData.Remove(taskToRemove);

        var currentListWidth = await JS.InvokeAsync<string>("getListSize");
        ListWidth = currentListWidth;

        GanttRef?.Rebind();
    }

    
    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as FlatModel;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }

    protected override void OnInitialized()
    {
        GanttData = new List<FlatModel>();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
            {
                Id = LastId,
                Title = "Task " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(Random.Shared.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new FlatModel()
                {
                    Id = LastId,
                    ParentId = parentId,
                    Title = "    Task " + i + " : " + j.ToString(),
                    Start = new DateTime(2021, 7, 5 + j),
                    End = new DateTime(2021, 7, 6 + i + j),
                    PercentComplete = Math.Round(Random.Shared.NextDouble(), 2)
                });

                LastId++;
            }
        }

        base.OnInitialized();
    }

    class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
````

## See Also

- [Gantt Overview - Telerik UI for Blazor](slug:gantt-overview)
