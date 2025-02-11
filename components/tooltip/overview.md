---
title: Overview
page_title: Tooltip Overview
description: Blazor Tooltip integrates interactive tooltips for improved user experience in Blazor web applications.
slug: tooltip-overview
tags: telerik,blazor,tooltip,overview
published: True
position: 0
---

# Blazor Tooltip Overview

The <a href="https://www.telerik.com/blazor-ui/tooltip" target="_blank">Blazor Tooltip component</a> enhances the default browser tooltips in a beautiful, cross-browser popup. The Tooltip component allows customization of its size, content, position and show event. Attach a single Tooltip instance to multiple targets to optimize the performance.

## Creating Blazor Tooltip

The Blazor Tooltip will automatically display the value of `title` and `alt` attributes of HTML elements. The example below demonstrates this scenario, but it's also possible to [define custom content in a template](#template).

1. Use the `TelerikTooltip` tag.
1. Set the Tooltip's `TargetSelector` parameter to a `string` that is a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) or [CSS combinator](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators). It should point to the HTML element(s) that will trigger a tooltip.
1. (optional) Set the Tooltip's [`Width`, `Height`](#tooltip-parameters) or [`Position`](slug:tooltip-position) parameters. They will depend mostly on the Tooltip content and the targets' position on the page.

>caption Basic Tooltip attached to multiple targets

````RAZOR
<TelerikTooltip TargetSelector=".tooltip-target" />

<div style="padding: 5em;">
    Hover the button ...

    <TelerikButton Icon="@SvgIcon.Eye" Title="Hello world!" Class="tooltip-target" />

    ... and the question mark:

    <span title="I am a Telerik Blazor Tooltip." class="tooltip-target">
        <TelerikSvgIcon Icon="@SvgIcon.QuestionCircle" />
    </span>
</div>
````

>tip For better performance, use one single Tooltip instance for multiple targets, especially if the targets are similar and a lot in number.

## Position

The Blazor Tooltip normally appears above its target, but can show on all four sides. If there is not enough space, the component will shift or flip its position automatically. Learn how to [control the Tooltip position](slug:tooltip-position).

## Show Behavior

By default, the Tooltip displays on mouse over, but it is possible to [configure it to show on click or tap](slug:tooltip-show-event).

## Template

The Blazor Tooltip accepts a nested `<Template>` tag, which is a standard Blazor `RenderFragment`. It lets you generate content for the Tooltip based on meta data from the target. You can also fetch data on demand for the Tooltip content through that. See [examples in the Tooltip Template article](slug:tooltip-template).

## Tooltip Parameters

The Blazor Tooltip provides the following configuration parameters. Also check the [Tooltip component API](slug:Telerik.Blazor.Components.TelerikTooltip).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-animation-container">` element, which is an ancestor (but not parent) of the `<div class="k-tooltip>` element. The former element is responsible for the Tooltip's `position` and `z-index` styles. The latter element applies the theme styling (borders, background, etc.). Use a CSS class to [override theme styles](slug:themes-override). Here is a [custom Tooltip styling example](slug:tooltip-kb-custom-styles). |
| `Height` | `string` | Applies a height style in [any supported unit](slug:common-features/dimensions). @[template](/_contentTemplates/tooltip/notes.md#dimensions-behavior) |
| `HideDelay` | `int` <br/> (0) | The Tooltip hiding delay in milliseconds. |
| `Id` | `string` | Renders an `id` attribute to the `<div class="k-tooltip>` element. To improve accessibility and screen reader behavior, set the same string as Tooltip `Id` and `aria-described-by` attribute of all Tooltip targets. |
| `Position` | `TooltipPosition` enum <br /> (`Top`) | Sets the [Tooltip popup direction](slug:tooltip-position), with regard to its target. |
| `ShowDelay` | `int` <br/> (0) | The Tooltip opening delay in milliseconds. |
| `ShowOn` | `TooltipShowEvent` enum <br /> (`Hover`) | Sets the [browser event, which will trigger the Tooltip to display](slug:tooltip-show-event). |
| `TargetSelector` | `string` | The CSS [selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) or [combinator](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators), which points to one or multiple Tooltip targets. |
| `Width` | `string` | Applies a width style in [any supported unit](slug:common-features/dimensions). @[template](/_contentTemplates/tooltip/notes.md#dimensions-behavior) |

>tip To have the tooltip stretch according to its content, leave **both** the `Width` and `Height` parameters empty. If one of them has a value, the HTML element will have some layout and you may get unexpected results in terms of size and position.
>
> If you will be [loading large content on demand](slug:tooltip-template#separate-component-and-load-on-demand), you should set dimensions that will accommodate the expected content and layout.

## Next Steps

* [Experiment with Tooltip Position](slug:tooltip-position)
* [Choose a Tooltip Show Event](slug:tooltip-show-event)
* [Explore ToolTip Templates](slug:tooltip-template)

## See Also

* [Live Demo: Tooltip](https://demos.telerik.com/blazor-ui/tooltip/overview)
* [Comparison between All Popup Components](slug:common-kb-popup-component-comparison)
* [Custom ToolTip Styles and Colors](slug:tooltip-kb-custom-styles)
