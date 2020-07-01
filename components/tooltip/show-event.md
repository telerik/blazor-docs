---
title: Show Event
page_title: Tooltip - Show Event
description: Choose when the Tooltip for Blazor shows up.
slug: tooltip-show-event
tags: telerik,blazor,tooltip,show,event
published: true
position: 3
---

# Tooltip Show Event

You can control what user interaction with the Tooltip target shows the tooltip through the `ShowOn` parameter.

It takes a member of the `Telerik.Blazor.TooltipShowEvent` enum:

* `Hover` - the default value
* `Click`

By default, the tooltip shows on hover (mouseover) of its target, just like the browser tooltips that the Tooltip component replaces.

>caption Explore the show events of the tooltip

````CSHTML
@* Setting a show event is not mandatory, it defaults to Hover *@

<TelerikTooltip TargetSelector="#hoverTarget" ShowOn="@TooltipShowEvent.Hover">
</TelerikTooltip>

<div id="hoverTarget" title="lorem ipsum">
    <strong>Hover</strong> me to see the tooltip.
</div>

<TelerikTooltip TargetSelector="#clickTarget" ShowOn="@TooltipShowEvent.Click">
</TelerikTooltip>

<div id="clickTarget" title="dolor sit amet">
    <strong>Click</strong> me to see the tooltip.
    Then click somewhere to hide the tooltip.
</div>

@code {
    TooltipShowEvent showEvent { get; set; } = TooltipShowEvent.Hover;
}

<style>
    #hoverTarget {
        position: absolute;
        top: 200px;
        left: 200px;
        width: 200px;
        background: yellow;
    }

    #clickTarget {
        position: absolute;
        top: 200px;
        left: 500px;
        width: 200px;
        background: green;
    }
</style>
````

## Notes

Changing the `ShowEvent` dynamically at runtime is not supported at this stage.


## See Also

* [Tooltip Overview]({%slug tooltip-overview%})
* [Live Demo: Tooltip Show Event](https://demos.telerik.com/blazor-ui/tooltip/show-event)

