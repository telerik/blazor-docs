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

I want to set readonly time slots, where no appointments are possible. This is useful for breaks (no appointments at lunch time) or holidays. How to achieve that?

## Solution

You can implement custom validation method to check if an appointment is valid and handle the [Scheduler CRUD events]({%slug scheduler-appointments-edit%}) to update the data only if the appointment meets the desired criteria.

Additionally, you can include some custom CSS styles to visually mark the corresponding slots as readonly (for example, set a different background color).

You can find an example here: [Scheduler - Readonly Slots](https://github.com/telerik/blazor-ui/tree/master/scheduler/readonly-slots).

>tip At the time of writing (UI for Blazor version 2.30), the Scheduler does not expose [OnCellRender](https://feedback.telerik.com/blazor/1521973-oncellrender-event) event to add a specific CSS class to the readonly cells. The example showcases a custom approach for calculating the index of the desired cells and use that index to set the styles. Once the OnCellRender is available, it can be handled for such customizations.