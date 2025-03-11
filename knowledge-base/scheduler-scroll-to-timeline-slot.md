---
title: Scroll to a Slot in the Scheduler Timeline View
description: Learn how to scroll to a specific slot in the Timeline View of the Telerik Scheduler for Blazor.
type: how-to
page_title: How to Scroll to a Slot in the Scheduler Timeline View
slug: scheduler-kb-scroll-to-timeline-slot
tags: blazor, scheduler, timeline
ticketid: 1680788
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Scheduler for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to focus and highlight the current time slot on load?
* How to auto scroll horizontally the Scheduler Timeline to the current time slot?
* How to style the current time slot in the Scheduler Timeline?

## Solution

1. Set the [Scheduler `View` parameter](slug:scheduler-views-overview) with two-way binding or with a [`ViewChanged` handler](slug:scheduler-events#viewchanged). Thus the app will know which is the current view.
1. Define the [Scheduler `OnCellRender` event](slug:scheduler-events#oncellrender). Set a custom CSS class with `args.Class` if `args.Start` matches the current or desired time.
1. Use the custom CSS class to apply custom styles.
1. Use [`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) and the custom CSS class to find the slot element in the HTML DOM.
1. Use [`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) to scroll to the slot.

>caption Scrolling to a styled Scheduler Timeline slot

````RAZOR
@inject IJSRuntime js

<TelerikScheduler Data="@SchedulerData"
                  @bind-Date="@SchedulerDate"
                  @bind-View="@SchedulerView"
                  OnCellRender="@OnSchedulerCellRender"
                  Width="80vw"
                  Height="80vh">
    <SchedulerViews>
        <SchedulerDayView />
        <SchedulerWeekView />
        <SchedulerMonthView />
        <SchedulerTimelineView />
    </SchedulerViews>
</TelerikScheduler>

@* Move JavaScript to separate JS file *@
<script suppress-error="BL9992">
    function scrollToSlot() {
        var slotsAfterCurrent = document.querySelectorAll(".current-slot + .k-slot-cell");
        if (slotsAfterCurrent.length > 0) {
            slotsAfterCurrent[slotsAfterCurrent.length - 1].scrollIntoView({ behavior: "smooth" });
        }
    }
</script>

<style>
    .current-slot {
        background-color: var(--kendo-color-primary-subtle);
    }
</style>

@code {
    private List<Appointment> SchedulerData { get; set; } = new();
    private DateTime SchedulerDate { get; set; } = DateTime.Today;

    private SchedulerView SchedulerView { get; set; } = SchedulerView.Timeline;

    private bool ShouldScrollTimeline { get; set; }

    private void OnSchedulerCellRender(SchedulerCellRenderEventArgs args)
    {
        if (SchedulerView == SchedulerView.Timeline && args.Start.Hour == DateTime.Now.Hour)
        {
            args.Class = "current-slot";
            ShouldScrollTimeline = true;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender || ShouldScrollTimeline)
        {
            await Task.Delay(1); // Wait for HTML to render
            ShouldScrollTimeline = false;

            await js.InvokeVoidAsync("scrollToSlot");
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public class Appointment
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
        public string Description { get; set; } = string.Empty;

        public Appointment()
        {
            Id = Guid.NewGuid();
        }
    }
}
````

## See Also

* [Scheduler Events](slug:scheduler-events)
