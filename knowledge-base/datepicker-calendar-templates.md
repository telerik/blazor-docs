---
title: Use Calendar Templates in a DatePicker
description: How to use calendar cell templates with a DatePicker, so that one can style dates 
type: how-to
page_title: Use Calendar Cell Templates with a DatePicker
slug: datepicker-calendar-templates
position: 
tags: datepicker, dateinput, calendar, template
ticketid: 1543090
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DatePicker for Blazor, <br />
                DateInput for Blazor, <br />
                Calendar for Blazor, <br />
                AnimationContainer for Blazor, <br />
                Button for Blazor
            </td>
		</tr>
	</tbody>
</table>

## Description

How to use calendar [month cell template]({%slug calendar-templates-month%}) (`MonthCellTemplate`) with the TelerikDatePicker? I need to modify color and font size of enabled and disabled dates inside the Calendar.

## Solution

At the time of writing (UI for Blazor version 2.29), the DatePicker does not expose [Calendar templates]({%slug calendar-templates-overview%}). However, it is possible to achieve the desired result with a combination of a few components:

* [DateInput]({%slug components/dateinput/overview%}),
* [icon button]({%slug button-icons%})
* [Calendar]({%slug components/calendar/overview%})
* [AnimationContainer]({%slug components/animationcontainer/overview%}).

The only difference to a DatePicker is that the Calendar will not hide automatically when the user clicks outside the popup. The user will need to click on the icon button, or select a date. To improve the experience, you can add a "close" button inside the AnimationContainer.

The components are wrapped in a container with a `position:relative` style. This is needed to align the AnimationContainer popup position to the DateInput.

>caption Create a DatePicker with separate DateInput, Button, Calendar and AnimationContainer

````CSHTML
TelerikDateInput:
<div class="picker-wrapper">
    <TelerikDateInput @bind-Value="@DateValue" />
    <TelerikButton OnClick="@ToggleCalendar" Icon="calendar" Class="picker-button" />

    <TelerikAnimationContainer @ref="@CalendarContainer" Class="picker-popup k-calendar">
        <div class="close-button"><TelerikButton OnClick="@ToggleCalendar" Icon="close" /></div>
        <TelerikCalendar Value="@DateValue" ValueChanged="@CalendarValueChanged"></TelerikCalendar>
    </TelerikAnimationContainer>
</div>

<style>
    /* align the calendar popup position to the date input */
    .picker-wrapper {
        display: inline-block;
        position: relative;
        white-space: nowrap;
    }
    /* move the popup button over the DateInput */
    .picker-button {
        margin-left: -34px;
        border-left-width: 0;
    }
    /* remove the Calendar border, as we apply one to the AnimationContainer with k-calendar */
    .picker-popup > .k-calendar {
        border-width: 0;
    }
    /* align the close button to the right */
    .close-button {
        text-align: right;
    }
    /* make the button look like an icon */
    .close-button > .k-button {
        border: 0;
        height: auto;
        margin-bottom: 0;
        padding-bottom: 0;
        background: none transparent;
    }
</style>

@code {
    DateTime DateValue { get; set; } = DateTime.Now;
    TelerikAnimationContainer CalendarContainer { get; set; }

    async Task CalendarValueChanged(DateTime newDate)
    {
        DateValue = newDate;
        await ToggleCalendar();
    }

    async Task ToggleCalendar()
    {
        await CalendarContainer.ToggleAsync();
    }
}
````
