---
title: Task
page_title: Task
description: TaskTemplate for the Gantt Timeline Tasks
slug: gantt-task-template
tags: telerik,blazor,gantt,chart,task,template
published: True
position: 10
components: ["gantt"]
---

# TaskTemplate

The `TaskTemplate` provides you with full control over the rendering of the Timeline tasks.
It is applied on regular tasks (not summary or milestone).

The `TaskTemplate` is of type `RenderFragment<TItem>`, so the `context` has the datatype of the model. Therefore, no casting is needed in the template.

>caption Customize the Tasks content and appearance through a `TaskTemplate`. The result from the snippet.

<demo metaUrl="client/gantt/task/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)
* [How to set different colors for the Gantt tasks](slug:gantt-kb-different-colors-for-tasks)
