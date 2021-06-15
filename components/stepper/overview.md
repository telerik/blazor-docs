---
title: Overview
page_title: Stepper Overview
description: Overview of the Stepper for Blazor.
slug: stepper-overview
tags: telerik,blazor,stepper,overview
published: True
position: 0
---


# Stepper Overview

The <strong>Stepper for Blazor</strong> is a component that renders a path formed by a sequence of logical steps towards a bigger action. The Stepper indicates the user’s progress within this action by showing the steps left for them to complete it. It makes the user experience less overwhelming as it breaks the long process into smaller parts.

The Stepper provides several features out of the box, including the ability to define the appearance of each step, validation for the steps, strict linear flow and step template to make the it fit any design requirements.


#### In this article:
   * [Basics](#basics)
   * [Example](#example)
   * [Features](#features)

## Basics

To use a Telerik Stepper for Blazor:

1. Use the `TelerikStepper` tag

1. Under its `StepperSteps` tag include and configure the desired [`Steps`]({%slug  stepper-steps-overview%})

## Example

The below snippet demonstrates simple setup of a Stepper component.

>caption The result from the snippet.

![Simple Stepper](images/stepper-overview-example.png)

````CSHTML
@* Simple Stepper setup *@

<div style="width:700px">
    <TelerikStepper @bind-Value="@CurrentStepIndex">
        <StepperSteps>
            <StepperStep Icon="cart" Label="Cart"></StepperStep>
            <StepperStep Icon="marker-pin-target" Label="Delivery Address"></StepperStep>
            <StepperStep Icon="dollar" Label="Payment Method"></StepperStep>
            <StepperStep Icon="preview" Label="Preview"></StepperStep>
            <StepperStep Icon="track-changes-accept" Label="Finish Order"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>

@code {
    public int CurrentStepIndex { get; set; } = 2;
}
````

## Features

The Stepper provides the following features:

* `Orientation` - `StepperOrientation` - defines the orientation of the Stepper. You can read more on how to configure it in the [Orientation]({%slug stepper-orientation%}) article.

* `Value ` - `int`- defines the current step index.

* `Linear` - `bool` - enables/disables [linear flow]({%slug stepper-linear-flow%}).

* `StepType` - `StepperStepType` - defines the display mode of the Stepper. You can read more on how to configure it in the [Display modes]({%slug stepper-display-modes%}) article.

## See Also

  * [Live Demo: Stepper Overview](https://demos.telerik.com/blazor-ui/stepper/overview)