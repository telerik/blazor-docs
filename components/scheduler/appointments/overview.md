---
title: Overview
page_title: Scheduler for Blazor | Appointments Overview
description: Appointments basics in the Scheduler for Blazor
slug: scheduler-appointments-overview
tags: telerik,blazor,scheduler,appointment,appointments,overview
published: True
position: 0
---

# Scheduler Appointments

The Scheduler component is designed to work with a collection of appointments. This article will explain their basic features.

The appointment model needs to provide the fields from the list below that are used by the scheduler. The default values for the fields are shown in the listing.

>tip The `Telerik.Blazor.Components.IAppointment` interface can show you what fields you can use.

>caption Appointment fields

* `Title` - (`string`) - this is what is shown in the main scheduler view so the user can identify the event.
* `Start` - (`DateTime`) - the date and time at which the appointment starts.
* `End` - (`DateTime`) - the date and time at which the appointment ends.
* `Description` - (`string`) - detailed description of the event. Shown in the edit form.
* `IsAllDay` - (`bool`) - whether the event is shown in the all-day slot in the applicable views. Such events are not rendered in a specific time interval (slot), but are always shown when their day is visible.

>tip You are not limited to using these fields only. For example, you may want to have an `ID` field to easily tell appointments apart for your [CUD operations]({%slug scheduler-appointments-edit%}).


## See Also

  * [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)
  * [Editing Appointments]({%slug scheduler-appointments-edit%})

