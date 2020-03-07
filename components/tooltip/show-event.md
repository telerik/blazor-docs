---
title: Show Event
page_title: Tooltip for Blazor | Show Event
description: Choose when the Tooltip for Blazor shows up
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

<select @bind=@showEvent>
    @foreach (var item in Enum.GetValues(typeof(TooltipShowEvent)))
    {
        <option value=@item>@item</option>
    }
</select>

<TelerikTooltip TargetSelector="#target" ShowOn="@showEvent">
</TelerikTooltip>

<div id="target" title="lorem ipsum">@showEvent me to see the tooltip</div>

@code {
    TooltipShowEvent showEvent { get; set; } = TooltipShowEvent.Hover;
}

<style>
    #target {
        margin: 200px;
        width: 200px;
        border: 1px solid red;
    }
</style>
````


## See Also

* [Tooltip Overview]({%slug tooltip-overview%})

