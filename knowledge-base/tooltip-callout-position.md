---
title: Hide the Tooltip Callout or Change Its Position
description: Learn how to customize the appearance and behavior of the Tooltip small arrow, including adjusting the callout position and hiding it when necessary.
type: how-to
page_title: Hide the Tooltip Callout or Change Its Position
slug: tooltip-kb-callout-position
tags: tooltip, styling, callout
ticketid: 1628953, 1565205
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Tooltip for Blazor</td>
        </tr>
    </tbody>
</table>

## Description
This Knowledge Base article answers the following questions:

* How to customize the Tooltip callout?
* How to change the position of the Tooltip callout?
* How to modify the position of the small arrow of a Tooltip?
* How to hide the Tooltip callout?

## Solution

1. Set a custom CSS class to the Tooltip through the `Class` parameter. This configuration allows you to target specific Tooltip instances.
2. Use the defined class to [override the theme styles](slug:themes-override).
3. Customize the callout (small arrow) position by using this CSS combinator `.your-class .k-callout`, to suit your specific requirements.
3. Set a value for the `TargetSelector` parameter of the Tooltip.

>caption Blazor Tooltip with custom callouts positions

````RAZOR
<TelerikTooltip Class="left-callout" TargetSelector=".tooltip-callout-left" />
<TelerikTooltip Class="no-callout" TargetSelector=".tooltip-no-callout" />
<TelerikTooltip Class="right-callout" TargetSelector=".tooltip-callout-right" />

<div style="padding: 2em">
    <TelerikButton Title="Tooltip content"
                   Class="tooltip-callout-left">
        Left callout
    </TelerikButton>

    <TelerikButton Title="Tooltip content"
                   Class="tooltip-no-callout">
        No callout
    </TelerikButton>

    <TelerikButton Title="Tooltip content"
                   Class="tooltip-callout-right">
        Right callout
    </TelerikButton>
</div>

<style>
    /* hiding the small arrow */
    .no-callout .k-callout {
        display: none;
    }

    /* moving the small arrow to the left */
    .left-callout .k-callout {
        left: 20px !important;
    }

    /* moving the small arrow to the right */
    .right-callout .k-callout {
        left: initial !important;
        right: 20px;
    }
</style>
````

## See Also
* [Tooltip Overview](slug:tooltip-overview)
* [Tooltip Position](slug:tooltip-position)