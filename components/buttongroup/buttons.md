---
title: Buttons
page_title: ButtonGroup Buttons
description: Explore the available buttons in the ButtonGroup for Blazor.
slug: buttongroup-buttons
tags: telerik,blazor,toggle,button,group,type
published: True
position: 5
components: ["buttongroup"]
---

# ButtonGroup Buttons

The ButtonGroup component supports two types of buttons that have different behaviors:

* [`ButtonGroupButton`](#buttongroup-button)
* [`ButtonGroupToggleButton`](#buttongroup-togglebutton)

You can add the desired button instances by declaring the dedicated button tags. Additionally, you can individually configure their [appearance](slug:buttongroup-appearance), [enabled/disabled state](#disabled-state) and [visibility](#visibility) through the parameters of each button tag.

## ButtonGroup Button

The `ButtonGroupButton` does not change its visual state when clicked. It behaves as a regular button and does not support selection.

The `ButtonGroupButton` inherits the parameters and behavior of the [Telerik UI for Blazor Button](slug:components/button/overview) component.

>caption Using Buttons in a group

<demo metaUrl="client/buttongroup/buttons/regular/" height="200"></demo>

## ButtonGroup ToggleButton

The `ButtonGroupToggleButton` becomes selected when clicked and deselects when another one is clicked. If multiple selection is enabled, the user can select more than one `ButtonGroupToggleButton` at a time. Clicking on a selected button in this case will deselect it. Read more in the [Selection](slug:buttongroup-selection) article.

The `ButtonGroupToggleButton` inherits the parameters and behavior of the [`TelerikToggleButton`](slug:togglebutton-overview) component.

>caption Using ToogleButtons in a group

<demo metaUrl="client/buttongroup/buttons/toggle/" height="200"></demo>

## Disabled State

To disable a button, set its `Enabled` attribute to `false`.

>caption Disabled buttons in a ButtonGroup

<demo metaUrl="client/buttongroup/buttons/disabled/" height="200"></demo>

## Visibility

You can set the `Visible` parameter of individual buttons to `false` to hide them based on certain logic. This lets you maintain the same markup and toggle features on and off with simple flags without affecting indexes and event handlers.

>caption Hide buttons from a ButtonGroup

<demo metaUrl="client/buttongroup/buttons/visibility/" height="250"></demo>

## See Also

* [Live Demo: Button Types](https://demos.telerik.com/blazor-ui/buttongroup/button-types)
