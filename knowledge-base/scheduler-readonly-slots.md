---
title: Scheduler Readonly Slots
description: How to set readonly slots in the Scheduler?
type: how-to
page_title: Scheduler Readonly Slots
slug: scheduler-kb-readonly-slots
position: 
tags: scheduler,readonly,slot,prevent,edit,create
ticketid: 1537704
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

I want to define readonly time slots in the Scheduler. The user should not be able to create or edit appointments at those times. This is useful for breaks (no appointments at lunch time) or holidays. How to achieve that?

## Solution

You can implement custom validation method to check if an appointment is valid and handle the [Scheduler CRUD events]({%slug scheduler-appointments-edit%}) to update the data only if the appointment meets the desired criteria.

Additionally, you can include some custom CSS styles to visually mark the corresponding slots as readonly (for example, set a different background color).

You can find an example here: [Scheduler - Readonly Slots](https://github.com/telerik/blazor-ui/tree/master/scheduler/readonly-slots).

>tip At the time of writing (UI for Blazor version 2.30), the Scheduler does not expose an [OnCellRender event](https://feedback.telerik.com/blazor/1521973-oncellrender-event) to add custom CSS classes to time slots. The example calculates the readonly slot indexes manually and uses those indexes in a CSS rule. Once `OnCellRender` is available, such customizations will be a lot easier.