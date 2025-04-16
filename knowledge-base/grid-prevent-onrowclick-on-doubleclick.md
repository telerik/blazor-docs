---
title: How to Prevent OnRowClick on Double Click
description: Learn how to distinguish between single and double click events on Grid rows in Blazor applications, preventing OnRowClick when a double click occurs.
type: how-to
page_title: Differentiating Between Single and Double Clicks on Grid Rows in Blazor
slug: grid-kb-prevent-onrowclick-on-doubleclick
tags: grid, blazor, onrowclick, onrowdoubleclick
res_type: kb
ticketid: 1684377
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description
I need to handle both [`OnRowClick`](slug:grid-events#onrowclick) and [`OnRowDoubleClick`](slug:grid-events#onrowdoubleclick) events in a Grid, but I don't want `OnRowClick` to be called when I double click.

## Solution
To achieve the distinction between single and double clicks and prevent the `OnRowClick` event from firing on a double click, implement a delay mechanism using a timer. This solution involves starting a timer on the first click event. If the second click (double click) occurs before the timer elapses, the timer is stopped, and the `OnRowClick` logic is cancelled. Otherwise, the `OnRowClick` logic proceeds.

Here is a code example demonstrating the approach:

`````Razor
@using System.Timers
@using Telerik.Blazor.Components

@implements IDisposable

<TelerikGrid Data="@gridData"
             OnRowClick="@HandleRowClick"
             OnRowDoubleClick="@HandleRowDoubleClick">
    <GridColumns>
        <GridColumn Field="@nameof(SampleData.Name)" Title="Name" />
    </GridColumns>
</TelerikGrid>

<p>@clickMessage</p>

@code {
    private Timer clickTimer;
    private string clickMessage;
    private const int clickDelay = 250;
    private object lastClickedItem;

    private void HandleRowClick(GridRowClickEventArgs args)
    {
        lastClickedItem = args.Item;

        clickTimer?.Stop();
        clickTimer?.Dispose();

        clickTimer = new Timer(clickDelay);
        clickTimer.Elapsed += async (sender, eventArgs) =>
        {
            clickTimer.Stop();
            clickTimer.Dispose();
            clickTimer = null;

            await InvokeAsync(() =>
            {
                clickMessage = $"Single clicked on: {((SampleData)lastClickedItem).Name}";
                StateHasChanged();
            });
        };

        clickTimer.AutoReset = false;
        clickTimer.Start();
    }

    private void HandleRowDoubleClick(GridRowClickEventArgs args)
    {
        // Cancel single-click logic
        clickTimer?.Stop();
        clickTimer?.Dispose();
        clickTimer = null;

        clickMessage = $"Double clicked on: {((SampleData)args.Item).Name}";
    }

    private IEnumerable<SampleData> gridData = new List<SampleData>
    {
        new SampleData { Name = "Item 1" },
        new SampleData { Name = "Item 2" },
        new SampleData { Name = "Item 3" }
    };

    public class SampleData
    {
        public string Name { get; set; }
    }

    public void Dispose()
    {
        clickTimer?.Dispose();
    }
}
`````

## See Also
- [Grid Events](slug:grid-events)
- [Timer Class in .NET](https://docs.microsoft.com/en-us/dotnet/api/system.timers.timer)
