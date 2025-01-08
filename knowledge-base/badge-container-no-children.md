---
title: Add Badge to Container With No Children
description: How to add a Telerik Badge to a container that cannot have children.
type: how-to
page_title: How To Add a Badge to a Container that Cannot Have Children
slug: kb-badge-container-no-children
tags: telerik, badge, avatar, container
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Badge for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

How to add the Telerik Badge to the [Telerik Avatar component](slug://avatar-overview) or another container that cannot have child elements.

## Solution

To add the Badge to the Avatar component or any other container that cannot have children, you need to wrap both the Badge and the container in an HTML element with the `position: relative`, `overflow: visible;`, and `display: inline-block;` CSS styles.

>caption Add the Telerik Badge to the Avatar component

````RAZOR
<div style="position: relative; overflow: visible; display: inline-block;">
    <TelerikAvatar Type="AvatarType.Text">
        JD
    </TelerikAvatar>

    <TelerikBadge ThemeColor="primary"
                  VerticalAlign="@BadgeVerticalAlign.Bottom"
                  HorizontalAlign="@BadgeHorizontalAlign.End"
                  Size="sm">
        Busy
    </TelerikBadge>
</div>
````
