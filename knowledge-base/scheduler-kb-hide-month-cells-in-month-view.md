---
title: How to Hide Other Month Cells in Month View
description: Learn how to hide dates from other months in the Scheduler component's current month view.
type: how-to
page_title: How to Hide Dates from Other Months in the Current Month View
slug: scheduler-kb-hide-month-cells-in-month-view
tags: hiding, other month cells, month view, scheduler
ticketid: 1637063
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

I need to hide the dates from other months in the Scheduler component's current month view because it may confuse the users.

## Solution

To hide the dates from other months in the month view of the Scheduler component:
1. Define `SlotTemplate` .
2. Use an `if` block to render conditionally the dates based on the selected month. 

>caption Scheduler with hidden dates in the current month view

````CSHTML
@using Telerik.SvgIcons

<TelerikScheduler Data="@Data"
                  @bind-Date="@SelectedDate"
                  @bind-View="@CurrView"
                  OnCreate="@AddAppointment"
                  OnUpdate="@UpdateAppointment"
                  OnDelete="@DeleteAppointment"
                  Height="600px"
                  AllowDelete="true"
                  AllowUpdate="true"
                  AllowCreate="true">
    <SchedulerViews>
        <SchedulerMonthView>
            <SlotTemplate>
                @{
                    if (context.Start.Month == SelectedDate.Month)
                    {
                        var dayNumber = context.Start.Day;
                        <span class="k-link" @onclick="() => OnDateClick(dayNumber)">
                            @context.Start.Day
                        </span>

                        if (context.Start.DayOfWeek == DayOfWeek.Saturday
                        || context.Start.DayOfWeek == DayOfWeek.Sunday)
                        {
                            <div style="color: green;"><span>Weekend</span></div>
                        }
                    }
                }
            </SlotTemplate>
        </SchedulerMonthView>
    </SchedulerViews>
</TelerikScheduler>

@code {
    // ... code omitted for brevity ...
}
````

## See Also
* [Scheduler Slot Templates]({%slug scheduler-templates-slot%})

