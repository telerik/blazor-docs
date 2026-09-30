---
title: Show Event
page_title: Tooltip - Show Event
description: Choose when the Tooltip for Blazor shows up.
slug: tooltip-show-event
tags: telerik,blazor,tooltip,show,event
published: true
position: 3
components: ["tooltip"]
---

# Tooltip Show Event

You can control what user interaction with the Tooltip target shows the tooltip through the `ShowOn` parameter.

It takes a member of the `Telerik.Blazor.TooltipShowEvent` enum:

* `Hover` - the default value
* `Click`

By default, the tooltip shows on hover (mouseover) of its target, just like the browser tooltips that the Tooltip component replaces.

> Changing the `ShowEvent` dynamically at runtime is not supported at this stage.

>caption Explore the show events of the Tooltip

<demo metaUrl="client/tooltip/show-event/example-1/" height="420"></demo>

## Next Steps

* [Explore ToolTip Templates](slug:tooltip-template)

## See Also

* [Blazor Tooltip Overview](slug:tooltip-overview)
* [Live Demo: Tooltip Show Event](https://demos.telerik.com/blazor-ui/tooltip/show-event)
