---
title: Use ICS data in scheduler
description: How to show ICS data in the scheduler
type: how-to
page_title: ICS data in Scheduler
slug: scheduler-kb-ics-data
position: 
tags: 
ticketid: 1469072
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

Is there a way to use the scheduler with ics data?

## Solution

You can write up a simple converter that parses the string that is the ICS format to the [models for the Scheduler]({%slug scheduler-appointments-databinding%}) that the Blazor app uses already. You can find an example at [https://github.com/telerik/blazor-ui/tree/master/scheduler/ICS-data-convertion](https://github.com/telerik/blazor-ui/tree/master/scheduler/ICS-data-convertion)

## Notes

You can easily integrate the Scheduler component with other appointment management applications such as Google or Apple calendar by utilizing a third-party library that provides the conversion between their data models and services and the models for the scheduler in your blazor app. The Telerik Scheduler provides you with [CRUD events]({%slug scheduler-appointments-edit%}) that give you the user actions so you can call upon such services with any desired code and full flexibility.