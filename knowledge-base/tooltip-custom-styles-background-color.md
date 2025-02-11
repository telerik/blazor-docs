---
title: Custom ToolTip Styles and Colors
description: How to apply custom ToolTip CSS styles like text color and background color.
type: how-to
page_title: Custom ToolTip Styles and Colors
slug: tooltip-kb-custom-styles
position: 
tags: tooltip, styling
ticketid: 1563191
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ToolTip for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to customize the Blazor ToolTip styling? I want to set different text color and background color.

## Solution

1. Review the [fundamentals of custom styling and CSS overrides](slug:themes-override).
1. Set a `Class` to the TelerikToolTip component.
1. Each tooltip is a `div.k-tooltip`. Note that the custom CSS class renders on the tooltip's **container**, not the `.k-tooltip` element itself. So use a [descendant CSS combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator).
1. If using a custom **background** color for `.k-tooltip`, then use the same **text** color for `.k-tooltip .k-callout`.

>caption Blazor ToolTip with custom background and text color

````RAZOR
<div class="target" title="ToolTip Text">Blue background, yelow color</div>

<TelerikTooltip TargetSelector=".target" Class="blue-yellow" />

<style>
    /* the ToolTip Class renders on the tooltip's container */
    .blue-yellow .k-tooltip {
        background: blue;
        color: yellow;
    }

    .blue-yellow .k-tooltip .k-callout {
        /* same as tooltip background */
        color: blue;
    }

    .target {
        position: absolute;
        top: 25vh;
        left: 25vw;
        width: 15vw;
        height: 10vh;
        border: 1px solid;
        padding: 1em;
    }
</style>
````
