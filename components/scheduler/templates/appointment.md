---
title: Appointment
page_title: Scheduler - Appointment Template
description: Use custom appointment rendering through a template in the scheduler for Blazor.
slug: scheduler-templates-appointment
tags: telerik,blazor,scheduler,templates,appointment
published: True
position: 5
components: ["scheduler"]
---

# Appointment Templates

You can change the contents that render in the appointment of the scheduler through its appointment template. This lets you change the default display of the title of the event and add more information for your users such as icons, buttons, start and end time, and custom fields.

There are two templates:

* `ItemTemplate` - controls the rendering of the regular appointments that are within the limits of one day.

* `AllDayItemTemplate` - controls the rendering of all-day appointments in the All-Day row. It is not applicable for the Month view because this view does not differentiate appointments based on that, but you can render different things for such appointments in the custom template.

The appointment template lets you control the rendering of the appointment content, but it keeps the other built-in appointment features - such as drag and resize handles, delete icon, arrows indicating if the appointment spans more than a day.

You can set a template for the entire scheduler, or you can also set templates per [view](slug:scheduler-views-overview). If a template is set on the particular view, it will take precedence over the shared template for the whole scheduler.

The `context` of the template is the item that it will display. You can cast it to the model type you use.

You can also style the entire appointments by adding a class to their wrapping element by using the [ItemRender event](slug:scheduler-events#onitemrender).

>caption Example of using appointment templates and all-day appointment templates in the scheduler. The Month view uses a different template than the other views

<demo metaUrl="client/scheduler/appointment/example-1/" height="780"></demo>

## See Also

* [Live Demo: Scheduler Templates](https://demos.telerik.com/blazor-ui/scheduler/templates)

