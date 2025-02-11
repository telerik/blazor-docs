---
title: Adjusting Tooltip Position for Rotated Divs in Blazor
description: Learn how to adjust the position of the Telerik Blazor Tooltip when the target element is rotated, ensuring it displays correctly.
type: how-to
page_title: How to Correct Tooltip Position on Rotated Elements in Blazor
slug: tooltip-kb-position-rotated-div
tags: tooltip, blazor, css
res_type: kb
ticketid: 1657431
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                Tooltip for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

When rotating `<div>` elements that have an associated [Tooltip](slug:tooltip-overview) to display additional information, the Tooltip might not align correctly with the target element. The goal is to adjust the Tooltip's position so it aligns appropriately with the center of the rotated `<div>`, and optionally, remove the Tooltip's callout pointer for a cleaner appearance.

This KB article also answers the following questions:
- How to correctly position a Tooltip on a rotated `<div>` in Blazor?
- How can I hide the callout pointer of a Tooltip in Blazor?
- Is there a way to dynamically adjust Tooltip positioning based on element rotation in Blazor?

## Solution

To address the issue of Tooltip misalignment on rotated `<div>` elements, consider the following two approaches:

### Use an Inner Tooltip Target

Embed a tooltip target within the rotated element that won't be affected by the rotation. This method ensures the Tooltip aligns correctly without additional adjustments.

````RAZOR
<TelerikTooltip TargetSelector=".tooltip-target .inner-target" Class="dynamic-tooltip-styles" />

<div style="padding: 5em;">
    Hover this rectangle ...

    <span class="tooltip-target" style="transform: rotate(-20deg);">
        <span title="More info..." class="inner-target">
            <TelerikSvgIcon Icon="@SvgIcon.InfoCircle" Size="@ThemeConstants.SvgIcon.Size.ExtraLarge" />
        </span>
    </span>

    ... or this one ...

    <span class="tooltip-target" style="transform: rotate(45deg);">
        <span title="More info..." class="inner-target">
            <TelerikSvgIcon Icon="@SvgIcon.InfoCircle" Size="@ThemeConstants.SvgIcon.Size.ExtraLarge"/>
        </span>
    </span>
</div>

<style>
    .tooltip-target {
        display: inline-block;
        width: 120px;
        height: 25px;
        background: yellow;
        position: relative;
    }

        .tooltip-target .inner-target {
            position: absolute;
            right: .4em;
            bottom: 0;
        }
</style>
````

### Adjust Tooltip Margin Dynamically

Calculate the necessary offset for the Tooltip and apply it as a margin style. Additionally, this solution includes how to hide the Tooltip's callout.

````RAZOR
<TelerikTooltip TargetSelector=".tooltip-target" Class="dynamic-tooltip-styles" />

<div style="padding: 5em;">
    Hover this rectangle ...

    <span class="tooltip-target" title="Foo Tooltip" style="transform: rotate(-10deg);"
          @onmouseover="@( (MouseEventArgs args) => OnTooltipTargetOver("15px") )">
    </span>

    <br /> <br /> <br /> <br /> <br />
    <br /> <br /> <br /> <br /> <br />

    ... or this one ...

    <span class="tooltip-target" title="Bar Tooltip" style="transform: rotate(45deg);"
          @onmouseover="@( (MouseEventArgs args) => OnTooltipTargetOver("60px") )">
    </span>
</div>

<style>
    .tooltip-target {
        display: inline-block;
        width: 200px;
        height: 20px;
        background: yellow;
    }

    /* Remove tooltip callout */
    .dynamic-tooltip-styles .k-callout {
        display: none;
    }

    /* Move tooltip, depending on target CSS transform */
    .dynamic-tooltip-styles {
        margin-top: @TooltipMarginTop;
    }
</style>

@code {
    private string TooltipMarginTop { get; set; } = string.Empty;

    private void OnTooltipTargetOver(string marginTop)
    {
        TooltipMarginTop = marginTop;
    }
}
````

## See Also

- [Telerik Blazor Tooltip - Overview](slug:tooltip-overview)
- [Hide the Tooltip Callout or Change Its Position](slug:tooltip-kb-callout-position)
- [Custom ToolTip Styles and Colors](slug:tooltip-kb-custom-styles)
