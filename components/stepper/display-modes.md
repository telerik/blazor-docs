---
title: Display Modes
page_title: Display Modes
description: Display Modes of the Stepper for Blazor.
slug: stepper-display-modes
tags: telerik,blazor,stepper,display,modes
published: True
position: 17
components: ["stepper"]
---

# Display Modes

This article explains the Display modes that the Stepper for Blazor provides.

You can configure the desired display mode through the `StepType` parameter of the Stepper. It takes a member of the `StepperStepType` enum:

* [Steps](#steps) (the default)
* [Labels](#labels)


## Steps

The default Display mode of the Stepper is `Steps`. If labels are defined, with this setup the Stepper will render both indicators and labels.

>caption Display mode: Steps, customize the Stepper to render indicators and labels.

<demo metaUrl="client/stepper/display-modes/example-2/" height="320"></demo>

## Labels

If you want to display only labels for the steps, set the `StepType` parameter of the Stepper to `Labels`.

>caption Display mode: Labels, customize the Stepper to render only labels.

<demo metaUrl="client/stepper/display-modes/example-1/" height="320"></demo>

## See Also

* [Live Demo: Stepper Configuration](https://demos.telerik.com/blazor-ui/stepper/configuration)