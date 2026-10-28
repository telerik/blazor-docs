---
title: Resource Grouping Header
page_title: Scheduler - Resource Grouping Header Template
description: Use custom resource grouping header rendering through a template in the scheduler for Blazor.
slug: scheduler-templates-resource-grouping-header
tags: telerik,blazor,scheduler,templates,resource,grouping,header
published: True
position: 13
components: ["scheduler"]
---

# Resource Grouping Header Templates

You can use the `SchedulerResourceGroupHeaderTemplate` to customize the rendering of the Scheduler resource grouping header cells. This allows you to change the appearance of the content, add custom content or any HTML elements.

The `SchedulerResourceGroupHeaderTemplate`:
* Is invoked for each resource when the Scheduler is configured to have resources and grouping.
* Applies in both horizontal and vertical grouping.
* Can be defined individually for each [Scheduler view](slug:scheduler-views-overview).

The `context` of the template is a `SchedulerResourceGroupHeaderTemplateContext` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Text` | `string` | The group text. |
| `Value` | `object` | The resource value.|
| `Field` | `string` | The field of the resource. |

>caption Example of using the SchedulerResourceGroupHeaderTemplate

<demo metaUrl="client/scheduler/resource-grouping-header/example-1/" height="780"></demo>

## See Also

* [Live Demo: Scheduler Templates](https://demos.telerik.com/blazor-ui/scheduler/templates)

