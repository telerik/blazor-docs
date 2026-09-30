---
title: Events
page_title: Events
description: Events of the Stepper for Blazor.
slug: stepper-events
tags: telerik,blazor,stepper,events
published: True
position: 25
components: ["stepper"]
---

# Stepper Events

This article explains the events available in the Telerik Stepper for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnChange

The `OnChange` event fires before the current step has changed. The handler receives an object of type `StepperStepChangeEventArgs` which exposes the following fields:

* `TargetIndex` - provides the index of the targeted new step.
* `IsCancelled` - specifies whether the event is canceled and the built-in action is prevented.

>caption Handle the `OnChange` event of the first and second steps.

<demo metaUrl="client/stepper/events/example-2/" height="320"></demo>


## ValueChanged

The Telerik Stepper for Blazor supports ValueChanged event. It fires upon every change of the CurrentStepIndex.

<br/>

>caption Handle the ValueChanged event.

<demo metaUrl="client/stepper/events/example-1/" height="320"></demo>

## See Also

* [Live Demo: Stepper Events](https://demos.telerik.com/blazor-ui/stepper/events)
