---
title: Orientation
page_title: Stepper Orientation
description: Orientation of the Stepper for Blazor.
slug: stepper-orientation
tags: telerik,blazor,stepper,orientation
published: True
position: 15
---


# Stepper Orientation

You can customize the stepper orientation through the `Orientation` parameter the `TelerikStepper` exposes. It takes a member of the `Telerik.Blazor.Enums.StepperOrientation` enum:
   * [`Horizontal`](#horizontal-stepper) (the default)
   * [`Vertical`](#vertical-stepper)


## Horizontal Stepper

Since `horizontal` is the default value for the Stepper `Orientation` parameter, you don't need to explicitly define it.

>caption Horizontal Stepper. The result from the snippet below.

![Horizontal Stepper](images/horizontal-stepper-example.png)

````CSHTML
@* Stepper with horizontal orientation *@

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

## Vertical Stepper

Set the `Orientation` parameter of the Stepper to `vertical` to change its default orioentation.

>caption Vertical Stepper. The result from the snippet below.

![Simple Stepper](images/vertical-stepper-example.png)

````CSHTML
@* Stepper with vertical orientation *@

<TelerikStepper Orientation="StepperOrientation.Vertical">
    <StepperSteps>
        <StepperStep Text="1" Label="Step 1"></StepperStep>
        <StepperStep Text="2" Label="Step 2"></StepperStep>
        <StepperStep Text="3" Label="Step 3"></StepperStep>
    </StepperSteps>
</TelerikStepper>
````

## See Also

  * [Live Demo: Stepper Overview](https://demos.telerik.com/blazor-ui/stepper/overview)
  * [Live Demo: Stepper Configuration](https://demos.telerik.com/blazor-ui/stepper/configuration)