---
title: Changing the Icon Position and Add Two or More Icons in a Button
description: Learn how to change the position of the icons inside the Telerik UI for Blazor Button and add more than one icon to the component.
type: how-to
page_title: Repositioning Icons and Add More Icons to Button Components
slug: button-kb-changе-icons-position
tags: telerik,blazor,icon,button,position
ticketid: 1514832
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Button for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How can I show an icon in a Telerik UI for Blazor Button on the right side of the text instead of on the left side?
* How can I display an icon Button on the top and bottom side of the text?
* How can I include more than one icon in the Button?

## Solution

You can change the [icon](slug://common-features-icons) position and add more icons in the Button by using the following approaches:

* To display multiple icons in one Button, nest the `TelerikIcon` in the `TelerikButton` content.
* To control the position of the icon in relation to the text content of the Button, use CSS.

>caption Reposition the Button icon and add more than one icon to the component

````RAZOR
@*This button has two icons, one on the left and one on the right side of the text*@
<TelerikButton Class="two-icons">
    <TelerikSvgIcon Icon="@SvgIcon.InfoCircle" />
    Info
    <TelerikSvgIcon Icon="@SvgIcon.InfoCircle" />
</TelerikButton>

@* This button has an icon above the text. *@
<TelerikButton Class="icon-top" Icon="SvgIcon.InfoCircle">Info</TelerikButton>

@* This button has an icon below the text. *@
<TelerikButton Class="icon-bottom" Icon="SvgIcon.InfoCircle">Info</TelerikButton>

<style>
    .two-icons {
        height: 50px;
    }

    .icon-top {
        flex-wrap: wrap;
        width: 50px;
        height: 50px;
    }

    .icon-bottom {
        flex-wrap: wrap-reverse;
        width: 50px;
        height: 50px;
    }
</style>
````
