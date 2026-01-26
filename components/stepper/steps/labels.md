---
title: Labels
page_title: Labels
description: Steps Labels for the Stepper for Blazor.
slug: stepper-labels
tags: telerik,blazor,stepper,labels
published: True
position: 2
components: ["stepper"]
---
# Steps Labels

The Stepper component allows you to set labels for the corresponding step indicators. You can define the desired labels through the `Label` parameter the `StepperStep` exposes. If you don't set value to the `Label` parameter, no label will be rendered for the step indicator.

>caption Stepper component with indicators and labels. The result from the snippet below.

![Indicators and Labels](images/labels-and-indicators-example.png)

````RAZOR
@* Stepper with icon indicators and labels *@

<div style="width:500px">
    <TelerikStepper>
        <StepperSteps>
            <StepperStep Label="Personal Info" Icon="@SvgIcon.User"></StepperStep>
            <StepperStep Label="Education" Icon="@SvgIcon.Book"></StepperStep>
            <StepperStep Label="Experience" Icon="@SvgIcon.FlipVertical"></StepperStep>
            <StepperStep Label="Attachments" Icon="@SvgIcon.Paperclip"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````

<br/>

>caption Stepper component with indicators and only a couple labels defined. The result from the snippet below.

![Some Labels](images/some-labels-example.png)

````RAZOR
@* Stepper with icon indicators and only a couple labels *@

<div style="width:500px">
    <TelerikStepper>
        <StepperSteps>
            <StepperStep Label="Personal Info" Icon="@SvgIcon.User"></StepperStep>
            <StepperStep Icon="@SvgIcon.Book"></StepperStep>
            <StepperStep Icon="@SvgIcon.FlipVertical"></StepperStep>
            <StepperStep Label="Attachments" Icon="@SvgIcon.Paperclip"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````

<br/>

>caption Stepper component with only indicators and no labels. The result from the snippet below.

![Only Indicators](images/only-indicators-example.png)

````RAZOR
@* Stepper with only indicators and no labels *@

<div style="width:500px">
    <TelerikStepper>
        <StepperSteps>
            <StepperStep Icon="@SvgIcon.User"></StepperStep>
            <StepperStep Icon="@SvgIcon.Book"></StepperStep>
            <StepperStep Icon="@SvgIcon.FlipVertical"></StepperStep>
            <StepperStep Icon="@SvgIcon.Paperclip"></StepperStep>
        </StepperSteps>
    </TelerikStepper>
</div>
````

## See Also

  * [Live Demo: Stepper Overview](https://demos.telerik.com/blazor-ui/stepper/overview)