---
title: Manage Appointments via Context Menu in the Scheduler
description: How to use the context menu to add, edit, delete appointments in specific timeslots in the Scheduler.
type: how-to
page_title: How to Add Appointments on Empty Slot in the Scheduler Using the ContextMenu. How to Add ContextMenu on Appointment in the Scheduler. 
slug: scheduler-kb-context-menu-on-appointments-and-empty-slots
tags: scheduler, blazor, contextmenu, appointments, empty slots
res_type: kb
ticketid: 1656007
---

## Environment

| Product | Scheduler for Blazor |
| --- | ContextMenu for Blazor |

## Description

This KB article answers the following questions:

* How to add a [Context menu]({%slug contextmenu-overview%}) to the appointments to provide shortcuts to custom features?
* How to add a Context menu that can be opened anywhere on the scheduler board, not just on appointments? 
* Is it possible to get the timeslot information where the Context menu is opened?
* How do I add a new appointment at a specific timeslot through the Context menu?

## Solution

To implement a Context menu on appointments and on empty slots in the Scheduler, follow these steps:

1. Use the Scheduler templates to [integrate the Context menu]({%slug contextmenu-integration%}) with them:
* Use the [Appointment Templates]({%slug scheduler-templates-appointment%}) to enable the Context menu to appear on appointments. 
* Use the [Slot Templates]({%slug scheduler-templates-slot%}) to enable the Context menu to appear on cells without appointments. 
2. Pass the context of the template in the `@oncontextmenu` event.
3. Utilize the timeslot or appointment information obtained from the context of the template.
4. Add the desired Context menu and create its items, commands and actions as needed.
