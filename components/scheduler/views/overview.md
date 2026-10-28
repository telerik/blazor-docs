---
title: Overview
page_title: Scheduler - Views Overview
description: Views basics in the Scheduler for Blazor.
slug: scheduler-views-overview
tags: telerik,blazor,scheduler,view,overview
published: True
position: 0
components: ["scheduler"]
---

# Scheduler Views

The Scheduler component provides several different modes of display to fit different user preferences and needs.

You can choose which views the user can switch between. To do that, declare the desired views in the `SchedulerViews` tag (conditional markup is allowed).

You can also control which is the default one through the `View` parameter. You should usually use it in the `@bind-View` syntax to prevent it from resetting to its initial view when re-rendering happens.

You can read more about this in the [Navigation](slug:scheduler-navigation) article.

The available views are:

* [Scheduler**Day**View](slug:scheduler-views-day)
* [Scheduler**Week**View](slug:scheduler-views-week)
* [Scheduler**MultiDay**View](slug:scheduler-views-multiday)
* [Scheduler**Month**View](slug:scheduler-views-month)
* [Scheduler**Timeline**View](slug:scheduler-views-timeline)
* [Scheduler**Agenda**View](slug:scheduler-views-agenda)

>caption Allow the user to navigate between Day and Week views only by defining only them. Example how to choose starting View (Week) and Date (29 Nov 2019).

<demo metaUrl="client/scheduler/overview/example-3/" height="780"></demo>




## See Also

* [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)
* [Day View](slug:scheduler-views-day)

