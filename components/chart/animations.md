---
title: Animations
page_title: Chart Animations
description: Enable, disable, and customize animations in the Telerik UI for Blazor Chart.
slug: chart-animations
tags: telerik,blazor,chart,animation,motion
published: true
tag: new
position: 35
components: ["charts"]
---

# Chart Animations

The Chart uses animations when it first renders and when its data changes. Animations help users follow the transition between the old and new data.

Set the `Transitions` parameter of the `TelerikChart` to control animations. The default value is `true`. Set `Transitions` to `false` to disable them.

````RAZOR.skip-repl
<TelerikChart Transitions="@false">
    @* Chart configuration *@
</TelerikChart>
````

## Customizing Animations

The Chart animation duration and easing come from the CSS theme. Override the following [CSS variables](slug:themes-customize#setting-theme-variables) to adjust the motion:

| CSS variable | Description |
|--------------|-------------|
| `--kendo-duration-rapid` | Controls the duration of shorter animation effects. Use for micro-interactions, immediate feedback, and small elements moving short distances. |
| `--kendo-duration-steady` | Controls the duration of longer animation effects. Use for important transitions occupying significant screen space or data-heavy visual animations. |
| `--kendo-easing-linear` | Defines the easing curve for linear motion. |
| `--kendo-easing-standard` | Defines the easing curve for standard motion. |
| `--kendo-easing-stretchy` | Defines the easing curve for motion with an elastic effect. |

The Chart can use different duration and easing variables for individual animation effects. Set all variables together to create consistent motion.

Scope the variables through the Chart `Class` parameter to customize one Chart. Define the variables on a parent HTML element or in a global stylesheet to customize multiple Charts.

### Applying a Custom Animation

The following example applies a longer duration and an elastic easing curve to one Chart.

>caption Customize and replay the Chart animation

<demo metaUrl="client/chart/animation/custom-animation/" height="540"></demo>

### Switching Between Motion Profiles

You can change the CSS variables at runtime to let users choose a motion profile. The next example sets the variables on a wrapper element, so they apply only to the nested Chart.

Select a profile and then select **Replay** to apply the duration and easing curve.

>caption Switch between Chart motion profiles

<demo metaUrl="client/chart/animation/switching-motion-profiles/" height="540"></demo>

## See Also

* [Chart Overview](slug:components/chart/overview)
* [Customizing Themes](slug:themes-customize)
* [Chart Rendering Modes](slug:chart-rendering-modes)
