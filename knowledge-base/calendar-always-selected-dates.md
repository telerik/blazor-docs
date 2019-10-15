---
title: SelectedDates and Double-click event
description: Keep certain dates always selected in a Telerik Blazor Calendar as visual indicators to the user.
type: how-to
page_title: Always Selected Dates - Marked Days
slug: calendar-always-selected-dates
position: 
tags: 
ticketid: 1434214
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Calendar for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I can pre-load existing dates fine, but if I select a new date the pre-loaded dates vanish. Do I need to reload dates on each click?

I want to show certain dates as marked on the calendar so the user always sees them, or they are always selected.

## Suggested Workarounds
You can keep a list of the items you want to denote as always selected, and ensure that they are always present in the selection, so the user effectively cannot deselect them. To do this, you need a separate collection that you will check against when the date selection changes. For example:

````CSHTML
@* the origSelection contains the immutable list *@

<TelerikCalendar SelectionMode="@CalendarSelectionMode.Multiple" ValueChanged="@MultipleSelectionChangeHandler"
                 DisabledDates="@DisabledDates" SelectedDates="@chosenDates" @bind-Date="@startDate" @ref="multipleSelCalendar">
</TelerikCalendar>
<br />
@if (chosenDates != null && chosenDates.Count > 0)
{
    <ul>
        @foreach (DateTime date in chosenDates)
        {
            <li>@date.ToString("dd MMM yyyy")</li>
        }
    </ul>
}

@code {
    private DateTime startDate = new DateTime(2019, 4, 1);

    private List<DateTime> DisabledDates = new List<DateTime>() { new DateTime(2019, 4, 1), new DateTime(2019, 4, 2) };

    private List<DateTime> chosenDates { get; set; }
    private List<DateTime> origSelection { get; set; }

    private Telerik.Blazor.Components.TelerikCalendar multipleSelCalendar;
    private void MultipleSelectionChangeHandler()
    {
        chosenDates = multipleSelCalendar.SelectedDates;

        //ensure that, after user selection, the static ones you want are still selected
        foreach (DateTime origItem in origSelection)
        {
            if (!chosenDates.Contains(origItem))
            {
                chosenDates.Add(origItem);
            }
        }
    }

    protected override async Task OnInitializedAsync()
    {
        origSelection = new List<DateTime>()
        {
            new DateTime(2019, 4, 3),
            new DateTime(2019, 4, 5)
        };

        if(chosenDates == null)
        {
            chosenDates = new List<DateTime>();
        }

        // populate the desired initial selection in the actual selection
        foreach (DateTime item in origSelection)
        {
            chosenDates.Add(item);
        }
    }
}
````

## Notes
When a Scheduler component becomes available, it may be better suited for such a task.

Also, you may want to see if the Calendar offers (day) templates when you are trying to implement such a feature, because if it does when you read this, you may be able to denote the special days without using the selection feature and tampering with the user actions.
