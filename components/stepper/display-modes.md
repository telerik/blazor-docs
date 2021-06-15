---
title: Display modes
page_title: Display modes
description: Display modes of the Stepper for Blazor.
slug: stepper-display-modes
tags: telerik,blazor,stepper,display,modes
published: True
position: 17
---

# Display modes

This article explains the Display modes that the Stepper for Blazor provides.

By default, the Stepper shows step indicator and labels (if there are labels defined). You can configure the desired display mode through the `StepType` parameter of the Stepper. It takes a member of the `StepperStepType`:

* [Steps](#steps) - the Stepper will render both indicators and labels
* [Labels](#labels) - the Stepper will render only labels


## Steps

The default Display mode of the Stepper is `Steps`. If labels are defined, with this setup the Stepper will render both indicators and labels.

> caption Display mode: Steps, customize the Stepper to render indicators and labels.The result from the snippet.

![Indicators and labels](images/labels-and-indicators-example.png)

````CSHTML
@* Stepper with both labels and indicators. *@

<div style="width:500px">
    <TelerikStepper StepType="StepperStepType.Steps">
        <StepperSteps>
            <StepperStep Label="Personal Info" Icon="user"></StepperStep>
            <StepperStep Label="Education" Icon="dictionary-add"></StepperStep>
            <StepperStep Label="Experience" Icon="flip-vertical"></StepperStep>
            <StepperStep Label="Attachments" Icon="attachment"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````

## Labels

If you want to display only labels of the steps, set the `StepType` parameter of the Stepper to `Labels`.

> caption Display mode: Labels, customize the Stepper to render only labels. The result from the snippet.

![Labels only](images/labels-only-example.png)

````CSHTML
@* Stepper with only labels. *@

<div style="width:500px">
    <TelerikStepper StepType="StepperStepType.Labels">
        <StepperSteps>
            <StepperStep Label="Personal Info" Icon="user"></StepperStep>
            <StepperStep Label="Education" Icon="dictionary-add"></StepperStep>
            <StepperStep Label="Experience" Icon="flip-vertical"></StepperStep>
            <StepperStep Label="Attachments" Icon="attachment"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````

## See Also

  * [Live Demo: Stepper Template](https://demos.telerik.com/blazor-ui/stepper/configuration)