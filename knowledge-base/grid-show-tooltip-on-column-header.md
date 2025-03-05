---
title: Adding Tooltips to Grid Column Headers with Ellipsis in Blazor
description: Learn how to display tooltips on Blazor Grid column headers when the text is truncated due to column resizing.
type: how-to
page_title: How to Show Tooltips on Truncated Grid Column Headers in Blazor
slug: grid-kb-show-tooltip-on-column-header
tags: grid, blazor, tooltip, column header, template, ellipsis
res_type: kb
ticketid: 1677858
---

## Description

When the column headers in a [Telerik Grid for Blazor](slug:grid-overview) are too long for the column width, they may be truncated with an ellipsis. In such cases, adding tooltips to the headers can help display the full text.

This knowledge-base article also answers the following questions:

- How to add Tooltip to Grid column header in Blazor?
- How to show Tooltip only for truncated column headers in a Blazor Grid?
- How to customize Grid column headers in Blazor?

## Solution

To display Tooltip for Grid column headers that are truncated, follow the steps below:

1. Use the [Column Header Template](slug:components/grid/templates/column-header#column-header-template) to customize the header content. Wrap the header content in a `<span>` HTML element.
2. [Monitor the column width changes](slug:grid-kb-column-state) by using the [Grid `OnStateChanged` event](slug:components/grid/state#onstatechanged) and the [`ColumnState`](slug:components/grid/state#information-in-the-grid-state) property of the `GridState`.
3. Use a [TelerikTooltip](slug:components/tooltip/overview) component to display tooltip for each column header.
4. Apply a custom CSS class to the column header content when the width of the column is insufficient to display its full content.

>caption Show TelerikTooltip on the Grid column header

````RAZOR
<p><strong>Resize and shrink some columns to observe the expected result</strong></p>.

<TelerikGrid @ref="@GridRef"
             Data="@MyData"
             Reorderable="true"
             Resizable="true"
             OnStateChanged="@((GridStateEventArgs<SampleData> args) => HandleColumnWidthChange(args))"
             Width="510px">
    <GridColumns>
        <GridColumn Field="@nameof(SampleData.Id)" Width="130px">
            <HeaderTemplate>
                <span title="Unique Identifier"
                      class="@(ShowTooltip.GetValueOrDefault(nameof(SampleData.Id), false) ? "employee-header" : "")">
                    Unique Identifier
                </span>
            </HeaderTemplate>
        </GridColumn>

        <GridColumn Field="@(nameof(SampleData.Name))" Width="165px">
            <HeaderTemplate>
                <span title="Long Employee Name"
                      class="@(ShowTooltip.GetValueOrDefault(nameof(SampleData.Name), false) ? "employee-header" : "")">
                    Long Employee Name
                </span>
            </HeaderTemplate>
        </GridColumn>

        <GridColumn Field="@(nameof(SampleData.Team))" Width="210px">
            <HeaderTemplate>
                <span title="Extremely Long Team Name"
                      class="@(ShowTooltip.GetValueOrDefault(nameof(SampleData.Team), false) ? "employee-header" : "")">
                    Extremely Long Team Name
                </span>
            </HeaderTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<TelerikTooltip TargetSelector=".employee-header" Class="my-callout">
</TelerikTooltip>

<style>
    .my-callout .k-callout {
        left: 30px !important;
    }
</style>

@code {
    private TelerikGrid<SampleData>? GridRef { get; set; }

    private IEnumerable<SampleData> MyData = Enumerable.Range(1, 10).Select(x => new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3 + 1}"
        });

    // Define minimum width requirements for tooltips
    private static readonly Dictionary<string, double> MinColumnWidths = new()
    {
        { nameof(SampleData.Id), 125 },
        { nameof(SampleData.Name), 160 },
        { nameof(SampleData.Team), 205 }
    };

    // Store whether a tooltip should be shown for each column
    private Dictionary<string, bool> ShowTooltip = new();

    private async Task HandleColumnWidthChange(GridStateEventArgs<SampleData> args)
    {
        foreach (var column in args.GridState.ColumnStates)
        {
            string columnField = column.Field;
            if (MinColumnWidths.TryGetValue(columnField, out double minWidth))
            {
                double currentWidth = double.Parse(column.Width.Replace("px", ""));
                ShowTooltip[columnField] = currentWidth < minWidth;
            }
        }

        await GridRef.SetStateAsync(args.GridState);
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
    }
}
````

> The additional CSS is used to adjust the position of the tooltip callout. Modify this CSS based on your application's specific layout and design requirements.

## See Also
- [Grid Column Header Template Documentation](slug:components/grid/templates/column-header#column-header-template)
- [Telerik Tooltip Overview](slug:components/tooltip/overview)
- [Tooltip Template Feature](slug:components/tooltip/template)
- [Hide the Tooltip Callout or Change Its Position](slug:tooltip-callout-position)
- [Show Tooltip in Grid](slug:tooltip-in-grid)
