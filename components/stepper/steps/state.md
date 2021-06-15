---
title: Steps State
page_title: Steps State
description: Steps State of the Stepper for Blazor.
slug: stepper-steps-state
tags: telerik,blazor,stepper,display,modes
published: True
position: 6
---

# Steps State

The Stepper for Blazor allows you to control the state of its steps. You can use to following step parameters to customize their state:

* [Optional]
* [Disabled]

## Optional

To mark a step as optional, you can set its `Optional` parameter to `true` (its default value is `false`). This configuration strives to visually notify the user that a certain step is optional by rendering "(Optional)" text underneath the corresponding step. It doesn't come with a built-in functionality to skip the step if a linear flow is enabled.
The stepper component will also Localize the "Optional" text which will appear under the optional steps

>caption Set an optional step. The result from the snippet.

![Optional step](images/optional-step-example.png)

````CSHTML
@* Stepper with one optional step. *@

<div style="width:700px">
    <TelerikStepper>
        <StepperSteps>
            <StepperStep Label="Cart" Icon="cart"></StepperStep>
            <StepperStep Label="Delivery address" Icon="marker-pin-target"></StepperStep>
            <StepperStep Label="Payment method" Icon="dollar"></StepperStep>
            <StepperStep Optional="true" Label="Preview" Icon="preview"></StepperStep>
            <StepperStep Label="Finish Order" Icon="track-changes-accept"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````


## Disabled

You can disable a step by setting the `Disabled` parameter of the the desired Step to `true` (its default value is `false`). You can also toggle its value to conditionally enable/disable steps based on your application logic.

>caption Set a disabled step. The result from the snippet.

![Optional step](images/disabled-step-example.png)

````CSHTMl
* Stepper with one disabled step. *@

<div style="width:700px">
    <TelerikStepper>
        <StepperSteps>
            <StepperStep Label="Cart" Icon="cart"></StepperStep>
            <StepperStep Label="Delivery address" Icon="marker-pin-target"></StepperStep>
            <StepperStep Label="Payment method" Icon="dollar"></StepperStep>
            <StepperStep Disabled="true" Label="Preview" Icon="preview"></StepperStep>
            <StepperStep Label="Finish Order" Icon="track-changes-accept"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````

## See Also

  * [Live Demo: Stepper Template](https://demos.telerik.com/blazor-ui/stepper/state)