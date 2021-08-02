---
title: Templates
page_title: Gantt Chart - Templates
description: Templates for the Gantt Chart for Blazor.
slug: gantt-timeline-templates
tags: telerik,blazor,gantt,chart,templates
published: True
position: 0
---

# TaskTemplate

The `TaskTemplate` provides you with full control over the rendering of the Timeline tasks.
It is applied on regular tasks (not summary or milestone).

The `TaskTemplate` is of type `RenderFragment<TItem>`, so the `context` has the datatype of the model. Therefore, no casting is needed in the template.

>Customize the Tasks content and appearance through a `TaskTemplate`. The result from the snippet.

````CSHTML


````

## See Also

  * [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)