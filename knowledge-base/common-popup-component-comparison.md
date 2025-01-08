---
title: Differences Between Telerik Popup Components
description: Learn about the differences and unique features of each Telerik Blazor popup component, such as AnimationContainer, Dialog, Popover, Popup, Tooltip, and Window.
type: how-to
page_title: What Are the Differences Between All Telerik Blazor Popup Components
slug: common-kb-popup-component-comparison
position: 
tags: telerik, blazor, animationcontainer, dialog, popover, popup, tooltip, window
ticketid: 1642784, 1648528
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                UI for Blazor, <br />
                AnimationContainer for Blazor, <br />
                Dialog for Blazor, <br />
                Popover for Blazor, <br />
                Popup for Blazor, <br />
                Tooltip for Blazor, <br />
                Window for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* What are the differences between the Dialog and the Window component? Dialog vs Window comparison.
* What are the differences between the Popover and the Tooltip? Popover vs Tooltip comparison.
* When should you use one popup component over another?


## Solution

Here are the unique features and distinguishing characteristics of all Telerik UI for Blazor popup components:

* The [AnimationContainer](slug://components/animationcontainer/overview) is a blank animated element that [renders at the same place where it is declared](slug://components/animationcontainer/overview#position). The rendering location can matter a lot in some cases, for example, in scenarios with scrollable conatiners.
* The [Dialog](slug://dialog-overview) and [Window](slug://window-overview) are very similar. Basically, the Dialog is a modal Window that cannot be resized or dragged. The Dialog has [built-in layouts for action buttons in its footer](slug://dialog-action-buttons).
* The [Popover](slug://popover-overview) and [Tooltip](slug://tooltip-overview) are also similar. The Popover is designed to work with a single anchor (target), while the Tooltip works with multiple targets. Both components can show a callout. Similar to the [Dialog](slug://dialog-overview), the Popover supports action buttons in its footer.
* The [Popup](slug://popup-overview) UX can be similar to a [Window](slug://window-overview) or a drop down, depending on its animation and position settings. Similar to the [Popover](slug://popover-overview), the Popup also works with a single anchor and is positioned relative to it. The Popup has the [most comprehensive set of parameters that position and align it to its anchor](slug://popup-position-collision). Use the Popup to implement custom drop down components, which do not exist in the product.

The following table provides another point of view for easier comparison.

>caption Component Comparison

| Component | Rendering Location * | Position Relative To | Anchor Elements | Built-in Styled Content | Modality | Resizing and Dragging |
| --- | --- | --- | --- | --- | --- | --- |
| AnimationContainer | in-place | depends on positioned containers and [`Top` and `Left`](slug://components/animationcontainer/overview#position) | 0, but can be simulated | none | no | no |
| Dialog | root | page | 0 | header with [optional close button](slug://dialog-overview#dialog-parameters), footer with action buttons | yes | no |
| Popover | root | anchor element | 1, [limited support for multiple](https://demos.telerik.com/blazor-ui/popover/overview) | header, footer with action buttons, callout | no | no |
| Popup | root | anchor element | 1 | none | no | no |
| Tooltip | root | anchor element | unlimited | icons, callout | no | no |
| Window | depends on [`ContainmentSelector`](slug://components/window/position#containmentselector) | page | 0 | header with actions | depends on [`Modal`](slug://components/window/modal) | yes |

\* **Root** rendering location means as a direct child of the [`TelerikRootComponent`](slug://rootcomponent-overview). **In-place** is how Blazor components normally work.


## See Also

* [AnimationContainer demos](https://demos.telerik.com/blazor-ui/animationcontainer/overview)
* [Dialog demos](https://demos.telerik.com/blazor-ui/dialog/overview)
* [Popover demos](https://demos.telerik.com/blazor-ui/popover/overview)
* [Popup demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Tooltip demos](https://demos.telerik.com/blazor-ui/tooltip/overview)
* [Window demos](https://demos.telerik.com/blazor-ui/window/overview)
