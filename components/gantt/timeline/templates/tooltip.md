---
title: Templates
page_title: Gantt Chart - Templates
description: Templates for the Gantt Chart for Blazor.
slug: gantt-timeline-templates
tags: telerik,blazor,gantt,chart,templates
published: True
position: 0
---

# TooltipTemplate

he `TooltipTemplate` provides you with full control over the rendering of the Timeline Task Tooltips.

The `TooltipTemplate` receives a context of type `object`, that can be cast to `TooltipTemplateContext`. It has the following properties available for display:

````CSHTML
    <TooltipTemplate>
        <h4>@(((TooltipTemplateContext)context).Title)</h4>
        <h5>Percent Complete: @(((TooltipTemplateContext)context).DataAttributes["percent"])%</h5>
        <h5>Start: @(((TooltipTemplateContext)context).DataAttributes["start"])</h5>
        <h5>End: @(((TooltipTemplateContext)context).DataAttributes["end"])</h5>
    </TooltipTemplate>
````

Apart from that, you can add and customize any other content - for example, icons, images, components etc.

>Customize the Task Tooltip through the `TooltipTemplate`. The result from the snippet.

````CSTHML


````

## See Also

  * [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)