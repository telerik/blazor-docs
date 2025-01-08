---
title: Accessibility Overview
page_title: Telerik UI for Blazor Gantt Documentation | Gantt Accessibility Overview
description: "Get started with the Telerik UI for Blazor Gantt and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,gantt
slug: gantt-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor Gantt component is <a href="https://www.w3.org/TR/WCAG22" target="_blank">WCAG 2.2 AA</a> and <a href="https://www.section508.gov" target="_blank">Section 508</a> compliant. The component also follows the <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank">WAI-ARIA best practices</a> for implementing the keyboard navigation for its component <a href="https://www.w3.org/TR/wai-aria/#roles" target="_blank">role</a>, and is tested against the popular screen readers.

# Blazor Gantt Accessibility Example

WCAG 2.2 introduces the <a href="https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements" target="_blank">"Dragging Movements"</a> criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

The illustrative example below shows the Gantt tree columns reorder action, achievable through the [Column Menu](slug://gantt-column-menu). Telerik UI for Blazor aims to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the Gantt component](slug://gantt-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug://accessibility-overview#color-contrast).

>caption Gantt accessibility compliance example

````RAZOR
@*Evaluate the example with Axe Core or another accessibility tool*@

<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              Navigable="true"
              ColumnReorderable="true"
              Sortable="true"
              ColumnResizable="true"
              ShowColumnMenu="true">
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="@nameof(FlatModel.Title)" ShowColumnMenu="false">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.PercentComplete)">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.Start)">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.End)">
        </GanttColumn>
    </GanttColumns>
</TelerikGantt>

@code {
    private DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);
    private int LastId { get; set; } = 1;
    private List<FlatModel> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<FlatModel>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
                {
                    Id = LastId++,
                    Title = "Employee  " + i.ToString(),
                    Start = new DateTime(2020, 12, 10 + i),
                    End = new DateTime(2020, 12, 11 + i),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                };

            Data.Add(newItem);
            var parentId = newItem.Id;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new FlatModel()
                    {
                        Id = LastId++,
                        ParentId = parentId,
                        Title = "    Employee " + i + " : " + j.ToString(),
                        Start = new DateTime(2020, 12, 20 + j),
                        End = new DateTime(2020, 12, 21 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });
            }
        }

        base.OnInitialized();
    }

    public class FlatModel
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

## See also
 * [Live demo: Gantt Accessibility](https://demos.telerik.com/blazor-ui/gantt/keyboard-navigation)
 * [Live demo: Gantt Overview](https://demos.telerik.com/blazor-ui/gantt/overview)
 * [Live demo: Blazor Accessibility](https://docs.telerik.com/blazor-ui/accessibility/overview)