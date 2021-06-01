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

The Stepper for Blazor is a component that renders a path formed by a sequence of logical steps towards a bigger action. The stepper indicates the user’s progress within this action by showing the steps left for them to complete it. It makes the user experience less overwhelming as it breaks the long process into smaller parts and should have an option to be configured whether going back and forth through the steps is allowed. Besides using it as standalone component, the Stepper will also become an integral part of the Wizard component.


#### In this article:
   * [Basics](#basics)
   * [Example](#example)
   * [Features](#features)

## Basics

To use a Telerik Card for Blazor:

1. add the ... tag

1. add the desired Steps

>tip You can see a code example below, review the [Building Blocks]({%slug card-building-blocks%}) article for more examples.

## Example

The below snippet demonstrates simple setup of a Stepper component.

>caption The result from the snippet.

![Simple Stepper](images/stepper-overview-example.png)

````CSHTML
@* Simple Stepper setup *@

<div style="width:500px">
    <TelerikStepper>
        <StepperSteps>
            <StepperStep Text="1" Label="Step 1"></StepperStep>
            <StepperStep Text="2" Label="Step 2"></StepperStep>
            <StepperStep Text="3" Label="Step 3"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````

## Features

The Stepper provides the following features:

* `Orientation` - `StepperOrientation` - defines the orientation of the Stepper. It takes a member of the `Telerik.Blazor.Enums.StepperOrientation` enum:
    * `Horizontal` (the default)
    * `Vertical` 

* `Value ` - `int`- defines the current step index

* `Linear` - `bool` - enables/disables linear flow

* `StepType` - `StepperStepType` - defines the step type of the Stepper. Takes a member of the `Telerik.Blazor.Enums.StepperOrientation` enum:
    *  `Steps` - Stepper will display only indicators
    * `Labels` - default - Stepper will display indicators and labels


## See Also

  * [Live Demo: Stepper Overview](https://demos.telerik.com/blazor-ui/stepper/overview)