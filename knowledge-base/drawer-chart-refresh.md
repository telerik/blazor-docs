---
title: Refresh a Chart Inside a Drawer
description: How to refresh a Chart within a Drawer content.
type: how-to
page_title: Refresh a Chart Inside a Drawer
slug: drawer-kb-chart-refresh
position: 
tags: 
ticketid: 1583102
res_type: kb
components: ["drawer"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Drawer for Blazor,<br /> Charts for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

This knowledge base article answers the following questions:

* How do I refresh a Chart inside a Drawer?
* Is it possible to refresh a Chart when the Drawer is expanded?

## Solution

1. To indicate when the Chart requires a refresh, create a bool flag and set it within the Drawer's [`ExpandedChanged`](slug:drawer-events#expandedchanged) handler.
2. Call the Chart's [`Refresh()` method](slug:components/chart/overview#chart-reference-and-methods) within the `OnAfterRenderAsync` lifecycle method. Set a brief delay to allow the Drawer to finish expanding before the refresh.

````RAZOR
<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Toggle Drawer</TelerikButton>

<TelerikDrawer Expanded="@Expanded"
               ExpandedChanged="@ExpandedChanged"
               Data="@Data"
               Mode="@DrawerMode.Push"
               @ref="@DrawerRef">
    <DrawerContent>
        <TelerikChart @ref="@ChartRef">
            <ChartSeriesItems>
                <ChartSeries Type="@ChartSeriesType.Heatmap"
                             Name="Commits Made per developer"
                             Data="@HeatmapData"
                             XField="@(nameof(MyHeatmapDataModel.Week))"
                             YField="@(nameof(MyHeatmapDataModel.Day))"
                             Field="@(nameof(MyHeatmapDataModel.CommitsNumber))">

                </ChartSeries>
            </ChartSeriesItems>
        </TelerikChart>
    </DrawerContent>
</TelerikDrawer>

@code {
    private TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    private TelerikChart ChartRef { get; set; }

    private bool Expanded { get; set; }
    private bool ShouldRefreshChart { get; set; }

    private async Task ExpandedChanged(bool newExpanded)
    {
        Expanded = newExpanded;

        ShouldRefreshChart = true;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (ShouldRefreshChart)
        {
            ShouldRefreshChart = false;
            await Task.Delay(500);
            ChartRef.Refresh();
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        HeatmapData = GetMyHeatmapData();
    }

    #region Drawer Data
    private IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
            {
            new DrawerItem { Text = "Page", Icon = SvgIcon.Plus}
            };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
    #endregion

    #region Chart Data
    private List<MyHeatmapDataModel> HeatmapData { get; set; }

    private List<MyHeatmapDataModel> GetMyHeatmapData()
    {
        List<MyHeatmapDataModel> data = new List<MyHeatmapDataModel>()
        {
            new MyHeatmapDataModel("John", 14, 1, "Mon"),
            new MyHeatmapDataModel("Idell", 8, 2, "Mon"),
            new MyHeatmapDataModel("Ines", 13, 3, "Mon"),
            new MyHeatmapDataModel("Stephen", 22, 4, "Mon"),
            new MyHeatmapDataModel("John", 7, 1, "Tue"),
            new MyHeatmapDataModel("Idell", 18, 2, "Tue"),
            new MyHeatmapDataModel("Ines", 2, 3, "Tue"),
            new MyHeatmapDataModel("Stephen", 5, 4, "Tue"),
            new MyHeatmapDataModel("John", 10, 1, "Wed"),
            new MyHeatmapDataModel("Idell", 11, 2, "Wed"),
            new MyHeatmapDataModel("Ines", 20, 3, "Wed"),
            new MyHeatmapDataModel("Stephen", 15, 4, "Wed")
        };

        return data;
    }

    private class MyHeatmapDataModel
    {
        public MyHeatmapDataModel() { }

        public MyHeatmapDataModel(string devName, int commits, int week, string day)
        {
            DeveloperName = devName;
            CommitsNumber = commits;
            Week = week;
            Day = day;
        }

        public string DeveloperName { get; set; }
        public int CommitsNumber { get; set; }
        public int Week { get; set; }
        public string Day { get; set; }
    }
    #endregion
}
````

## See Also

* [Drawer Events](slug:drawer-events)
* [Charts Overview](slug:components/chart/overview)
* [Prevent Drawer from collapsing on item click](slug:drawer-kb-prevent-collapse)