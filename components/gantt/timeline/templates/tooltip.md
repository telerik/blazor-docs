---
title: Tooltip
page_title: Tooltip
description: TooltipTemplate for the Gantt Timeline Tooltips.
slug: gantt-tooltip-template
tags: telerik,blazor,gantt,chart,tooltip,template
published: True
position: 15
components: ["gantt"]
---

# TooltipTemplate

The `TooltipTemplate` provides you with full control over the rendering of the Timeline Task Tooltips.

The `TooltipTemplate` receives a context of type `object`, that can be cast to `TooltipTemplateContext`. It has the following properties available for display:

<div class="skip-repl"></div>
````RAZOR
	<TooltipTemplate>
		<h4>@(((TooltipTemplateContext)context).Title)</h4>
		<h5>Percent Complete: @(((TooltipTemplateContext)context).DataAttributes["percent"])%</h5>
		<h5>Start: @(((TooltipTemplateContext)context).DataAttributes["start"])</h5>
		<h5>End: @(((TooltipTemplateContext)context).DataAttributes["end"])</h5>
		@*The "startDate" and "endDate" properties below are parsable to DateTime object.*@
		<h5>StartDate: @(DateTime.Parse(((TooltipTemplateContext)context).DataAttributes["startDate"]).Day)</h5>
		<h5>EndDate: @(DateTime.Parse(((TooltipTemplateContext)context).DataAttributes["endDate"]).Day)</h5>
	</TooltipTemplate>
````

Apart from that, you can add and customize any other content - for example, icons, images, components etc.

>caption Customize the Task Tooltip through the `TooltipTemplate`.

<demo metaUrl="client/gantt/tooltip/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)
