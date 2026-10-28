---
title: Indicators
page_title: Indicators
description: Indicators of the Stepper for Blazor.
slug: stepper-indicators
tags: telerik,blazor,stepper,indicators
published: True
position: 1
components: ["stepper"]
---

# Stepper Indicators

This article explains the configuration of the content that will be rendered in the step indicators. Each step could contain text or icon.

>caption In this article:

* [Indicator Text](#indicator-text)
* [Indicator Icon](#indicator-icon)

## Indicator Text

Stepper component allows you to use text for its step indicators. You can define the desired `string` for each step through the `Text` parameter the `StepperStep` exposes.

>caption Stepper component with a text indicators.

<demo metaUrl="client/stepper/steps/indicators/example-2/" height="320"></demo>

## Indicator Icon

Stepper component allows you to use Font and SVG icons for its step indicators. You can define the desired visual content through the following parameters of the `StepperStep`:

* `Icon` - defines the name of the desired Telerik font icon.

More details as well as a list of the available Telerik font icons you can find in the [Built-in Icons article](slug:common-features-icons).

<demo metaUrl="client/stepper/steps/indicators/example-1/" height="320"></demo>

## Notes

When defining text and icons for the step indicators, you should take into consideration the following specifics:

* The icons have priority over the text.

* If there is no icon, the text is used.

* If there is no text either, the component will render the order of the step as text. If this is the first defined step, the text "1" will be displayed.

## See Also

* [Live Demo: Stepper Overview](https://demos.telerik.com/blazor-ui/stepper/overview)
* [Live Demo: Stepper Icons](https://demos.telerik.com/blazor-ui/stepper/icons)