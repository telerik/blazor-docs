---
title: Wrap Calendar Views
description: How to wrap Calendar views to several lines (rows) when they don't fit horizontally.
type: how-to
page_title: How to Wrap Calendar Views to Multiple Rows
slug: calendar-kb-views-wrap
position: 
tags: calendar
ticketid: 1585064, 1617097
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

How to make the multiview Calendar wrap to multiple rows when the months do not fit?

How to use columns and rows for the Blazor Calendar multi-month feature?


## Solution

1. Set a [`Class`](slug://components/calendar/overview#styling-and-appearance) to the `<TelerikCalendar>` component.
1. Use the custom CSS class to set a `flex-flow: row wrap;` CSS style to `.k-hstack` as a descendant selector.
1. (optional) Use the custom CSS class to apply a fixed width.

>caption Wrapping Calendar Views

````RAZOR
<h1>Calendar View Wrapping</h1>

<h2>Fixed Width</h2>

<TelerikCalendar Views="4"
                 View="CalendarView.Month"
                 Class="multi-wrap width500">
</TelerikCalendar>

<h2>Flexible Width</h2>

<TelerikCalendar Views="4"
                 View="CalendarView.Month"
                 Class="multi-wrap">
</TelerikCalendar>

<style>
    .width500 {
        width: 500px;
    }

    .multi-wrap .k-hstack {
        flex-flow: row wrap;
    }
</style>
````

## See Also

* [Calendar MultiView](slug://components/calendar/multiview)
* [Disable Calendar Weekends](slug://calendar-kb-disable-weekends)
* [Hide Calendar Weekends](slug://calendar-kb-hide-weekends)
