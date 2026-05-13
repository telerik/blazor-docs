---
title: Format DateTime Labels on X-Axis in RangeBar Chart
description: Learn how to display readable date and time labels on the value axis of a RangeBar chart that uses Unix timestamps in Telerik UI for Blazor.
type: how-to
page_title: How to Format DateTime Labels on Value Axis in RangeBar Chart
slug: chart-kb-rangebar-datetime-axis-labels
tags: telerik, blazor, chart, rangebar, datetime, axis
res_type: kb
ticketid:
components: ["charts"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Charts for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

The RangeBar series requires numeric values for its `FromField` and `ToField` properties. When working with `DateTime` data, convert the values to Unix timestamps (milliseconds). How do I display readable date and time labels on the value axis instead of the raw numeric timestamps?

## Solution

To display readable date and time labels on the value axis:

1. Convert `DateTime` values to Unix timestamps (milliseconds) through computed properties in the model class.
2. Use the [`Template` parameter of `ChartValueAxisLabels`]({%slug components/chart/label-template-format%}) to convert the numeric timestamp back to a human-readable format with a JavaScript function.

The chart rendering engine uses JavaScript for label templates, so the `Date` constructor and `toLocaleTimeString()` method are available for formatting. The `Template` parameter must point to the name of a JavaScript function that is defined in the global scope.

>caption RangeBar chart with readable DateTime axis labels

````RAZOR
<TelerikChart Height="450px">

    <ChartSeriesItems>
        @foreach (var group in Events.GroupBy(e => e.Index))
        {
            <ChartSeries Type="ChartSeriesType.RangeBar"
                         Data="@group.ToList()"
                         CategoryField="@nameof(EventRecord.NameDisplay)"
                         FromField="@nameof(EventRecord.StartUnix)"
                         ToField="@nameof(EventRecord.EndUnix)"
                         Spacing="-1"
                         Color="rgb(146, 190, 52)">
            </ChartSeries>
        }
    </ChartSeriesItems>

    <ChartValueAxes>
        <ChartValueAxis Min="@AxisMin" Max="@AxisMax">
            <ChartValueAxisTitle Text="Time" />
            <ChartValueAxisLabels Template="formatTimeLabel" />
        </ChartValueAxis>
    </ChartValueAxes>

    <ChartCategoryAxes>
        <ChartCategoryAxis>
            <ChartCategoryAxisTitle Text="Event" />
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTooltip Visible="true">
        <Template>
            @{
                var rec = context.DataItem as EventRecord;
            }
            @if (rec is not null)
            {
                <div style="display: grid; grid-template-columns: auto auto; column-gap: 8px; line-height: 1.7; min-width: 160px;">
                    <strong style="grid-column: span 2;">@rec.NameDisplay</strong>
                    <span>Start:</span><b>@rec.Start.ToString("HH:mm:ss")</b>
                    <span>End:</span><b>@rec.End.ToString("HH:mm:ss")</b>
                    <span>Duration:</span><b>@((rec.End - rec.Start).TotalMinutes.ToString("F0")) min</b>
                    <span>Openings:</span><b>@rec.Openings</b>
                </div>
            }
        </Template>
    </ChartTooltip>

</TelerikChart>

<!-- Move JavaScript code to a separate JS file in production -->
<script suppress-error="BL9992">
    function formatTimeLabel(context) {
        return new Date(context.value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
</script>

@code {
    private List<EventRecord> Events { get; set; } = new();

    private double AxisMin { get; set; }

    private double AxisMax { get; set; }

    protected override void OnInitialized()
    {
        var baseDate = DateTime.UtcNow.Date.AddHours(8);

        Events = new List<EventRecord>
        {
            new() { Name = "Deploy",  Index = 1, Start = baseDate.AddMinutes(0),   End = baseDate.AddMinutes(45),  Openings = 3 },
            new() { Name = "Deploy",  Index = 2, Start = baseDate.AddMinutes(60),  End = baseDate.AddMinutes(90),  Openings = 1 },
            new() { Name = "Build",   Index = 1, Start = baseDate.AddMinutes(10),  End = baseDate.AddMinutes(30),  Openings = 5 },
            new() { Name = "Build",   Index = 2, Start = baseDate.AddMinutes(50),  End = baseDate.AddMinutes(80),  Openings = 2 },
            new() { Name = "Test",    Index = 1, Start = baseDate.AddMinutes(35),  End = baseDate.AddMinutes(65),  Openings = 4 },
            new() { Name = "Test",    Index = 2, Start = baseDate.AddMinutes(100), End = baseDate.AddMinutes(130), Openings = 0 },
            new() { Name = "Release", Index = 1, Start = baseDate.AddMinutes(140), End = baseDate.AddMinutes(160), Openings = 2 },
        };

        var paddingMs = TimeSpan.FromMinutes(5).TotalMilliseconds;
        AxisMin = Events.Min(e => e.StartUnix) - paddingMs;
        AxisMax = Events.Max(e => e.EndUnix) + paddingMs;
    }

    public class EventRecord
    {
        public string Name { get; set; } = string.Empty;
        public int Index { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int Openings { get; set; }

        public string NameDisplay => $"{Name} #{Index}";

        public long StartUnix =>
            new DateTimeOffset(DateTime.SpecifyKind(Start, DateTimeKind.Unspecified), TimeSpan.Zero)
                .ToUnixTimeMilliseconds();

        public long EndUnix =>
            new DateTimeOffset(DateTime.SpecifyKind(End, DateTimeKind.Unspecified), TimeSpan.Zero)
                .ToUnixTimeMilliseconds();
    }
}
````

## See Also

* [Chart Label Template and Format]({%slug components/chart/label-template-format%})
* [RangeBar Chart Overview]({%slug components/chart/types/rangebar%})
