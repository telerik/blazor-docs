---
title: Overview
page_title: Stepper Overview
description: Overview of the Stepper for Blazor.
slug: stepper-overview
tags: telerik,blazor,stepper,overview
published: True
position: 0
---


# Blazor Stepper Overview

The <a href ="https://www.telerik.com/blazor-ui/stepper"><strong>Stepper for Blazor</strong></a> is a component that renders a path formed by a sequence of logical steps towards a bigger action. The Stepper indicates the user’s progress within this action by showing the steps left for them to complete it. It makes the user experience less overwhelming as it breaks the long process into smaller parts.

The Stepper provides several features out of the box, including the ability to define the appearance of each [step](slug://stepper-steps-overview), [validation](slug://stepper-steps-validation) for the steps, strict [linear flow](slug://stepper-linear-flow) and [step template](slug://step-template) to make the it fit any design requirements.


## Creating Blazor Stepper

1. Add the `TelerikStepper` tag to add the component to your razor page.

2. Set the `Value` parameter (`int`) to define the current step index. It supports one-way and two-way binding.

3. Add [`StepperStep` instances](slug://stepper-steps-overview) inside the `StepperSteps` tag.

4. (optional) Set the `Icon` and `Label` `StepperStep` properties.

>caption Simple setup of a Stepper component.

````RAZOR
@* Simple Stepper setup. *@

<div style="width:700px">
    <TelerikStepper @bind-Value="@CurrentStepIndex">
        <StepperSteps>
            <StepperStep Icon="@SvgIcon.Cart" Label="Cart"></StepperStep>
            <StepperStep Icon="@SvgIcon.MapMarkerTarget" Label="Delivery Address"></StepperStep>
            <StepperStep Icon="@SvgIcon.Dollar" Label="Payment Method"></StepperStep>
            <StepperStep Icon="@SvgIcon.Eye" Label="Preview"></StepperStep>
            <StepperStep Icon="@SvgIcon.TrackChangesAccept" Label="Finish Order"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>

@code {
    public int CurrentStepIndex { get; set; } = 2;
}
````

## Steps

The Steps are the building blocks of the Stepper component. Include the desired steps by adding a `StepperStep` tag for every step. Then, configure each `StepperStep` appearance via its parameters. [Read more about the Blazor Steps configuration](slug://stepper-steps-overview).

## Orientation
The Stepper component provides horizontal and vertical orientations. [Read more about the Blazor Stepper orientation](slug://stepper-orientation).

## Display Modes

The Stepper steps can display labels and icons. [Read more about the Blazor Stepper display modes](slug://stepper-display-modes).

## Linear Flow

By default, the user can select any step in the Stepper component and go to it directly. This behavior can be changed with the `Linear` parameter, so that the user goes through the steps sequentially. [Read more about the Blazor Stepper linear flow](slug://stepper-linear-flow).

## Templates

You can use the functionality of the built-in templates and customize what is rendered as steps. [Read more about the Blazor Stepper templates](slug://step-template).

## Events

The Blazor Stepper generates events that you can handle and further customize its behavior. [Read more about the Blazor Stepper events](slug://stepper-events).

## Stepper Parameters

The Blazor Stepper provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Value` | `int` | Defines the current step index. |
| `Orientation` | `StepperOrientation` enum <br /> (`Horizontal`) | Defines the orientation of the Stepper. You can read more on how to configure it in the [Orientation](slug://stepper-orientation) article. |
| `Linear` | `bool` | Enables/disables [linear flow](slug://stepper-linear-flow). |
| `StepType` | `StepperStepType` enum <br /> (`Steps`) | Defines the display mode of the Stepper. You can read more on how to configure it in the [Display modes](slug://stepper-display-modes) article. |

## Next Steps

* [Configure Steps](slug://stepper-steps-overview)
* [Use Stepper Templates](slug://step-template)
* [Explore Stepper Events](slug://stepper-events)

## See Also

  * [Live Stepper Demos](https://demos.telerik.com/blazor-ui/stepper/overview)

  * [Stepper API Reference](slug://Telerik.Blazor.Components.TelerikStepper)