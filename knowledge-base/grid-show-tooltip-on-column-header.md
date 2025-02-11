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

When the column headers in a [Grid for Blazor](slug:components/grid/) are too long for the column width, they may be truncated with an ellipsis. In such cases, adding tooltips to the headers can help display the full text.

This knowledge-base article also answers the following questions:

- How to add Tooltip to Grid column header in Blazor?
- How to show Tooltip only for truncated column headers in a Blazor Grid?
- How to customize Grid column headers in Blazor?

## Solution
To display Tooltip for Grid column headers that are truncated, follow the steps below:

1. Use the [Column Header Template](slug:components/grid/templates/column-header#column-header-template) to customize the header content. Wrap the header content in a `<span>` HTML element.
2. Monitor the column width changes by utilizing the [Grid State](slug:components/grid/state) and its [ColumnState](slug:components/grid/state#information-in-the-grid-state) property.
3. Implement the [TelerikTooltip](slug:components/tooltip/overview) component and utilize its [Template](slug:components/tooltip/template) to define the content of the tooltip, which should match the full column header text.
4. Apply a custom CSS class to the column header content when the width of the column is reduced enough to hide its full content. This class will be used as the target selector for the TelerikTooltip.

>caption Show TelerikTooltip on the Grid column header

````RAZOR
<strong>Resize first column to see the result</strong>
<br/>
<TelerikGrid Data="@MyData" Resizable="true"
             OnStateChanged="@((GridStateEventArgs<SampleData> args) => HandleColumnWidthChange(args))"
             @ref="GridRef"
             Width="300px">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Name))"
                    Width="165px">
            <HeaderTemplate>
                <span class="@HeaderClass">
                    Long Employee Name
                </span>
            </HeaderTemplate>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Team))" />
    </GridColumns>
</TelerikGrid>

<TelerikTooltip TargetSelector=".employee-header"
                Class="my-callout">
    <Template>
        Long Employee Name
    </Template>
</TelerikTooltip>

<style>
    .my-callout .k-callout {
        left: 30px !important;
    }
</style>

@code {
    private string HeaderClass { get; set; } = string.Empty;
    private string HeaderId { get; set; } = string.Empty;
    private TelerikGrid<SampleData> GridRef { get; set; } = null!;

    private IEnumerable<SampleData> MyData = Enumerable.Range(1, 10).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team" + x
        });

    private async Task HandleColumnWidthChange(GridStateEventArgs<SampleData> args)
    {
        var employeeColumnWidth = args.GridState.ColumnStates.First(c => c.Index == 1).Width.Replace("px", "");
        var columnWidth = double.Parse(employeeColumnWidth);

        if (columnWidth < 160)
        {
            HeaderClass = "employee-header";
        }
        else
        {
            HeaderClass = string.Empty;
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

The additional CSS is used to adjust the position of the tooltip callout. Modify this CSS based on your application's specific layout and design requirements.

## See Also
- [Grid Column Header Template Documentation](slug:components/grid/templates/column-header#column-header-template)
- [Telerik Tooltip Overview](slug:components/tooltip/overview)
- [Tooltip Template Feature](slug:components/tooltip/template)
- [Hide the Tooltip Callout or Change Its Position](slug:tooltip-callout-position)
