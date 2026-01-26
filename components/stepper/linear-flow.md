---
title: Linear Flow
page_title: Linear Flow
description: Linear Flow of the Stepper for Blazor.
slug: stepper-linear-flow
tags: telerik,blazor,stepper,linear,flow
published: True
position: 20
components: ["stepper"]
---
# Linear Flow

By default, the user can select any step in the Stepper component. This behavior could be customized by configuring its `Linear` flow property. When it is enabled, the completion of the previous step is required before proceeding to the next step. The user will be able to go one step at a time (back or forth).

To enable Linear flow of the Stepper, set its `Linear` parameter to `true`. By default its value is `false`.

<br/>

>caption Enable the Linear Flow of the Stepper. The result from the snippet.

![Linear Flow](images/linear-flow-example.gif)

````RAZOR
@* Stepper with Linear Flow enabled *@

<TelerikStepper Linear="true">
    <StepperSteps>
        <StepperStep Icon="@SvgIcon.Cart" Label="Cart"></StepperStep>
        <StepperStep Icon="@SvgIcon.MapMarkerTarget" Label="Delivery Address"></StepperStep>
        <StepperStep Icon="@SvgIcon.Dollar" Label="Payment Method"></StepperStep>
        <StepperStep Icon="@SvgIcon.Eye" Label="Preview"></StepperStep>
        <StepperStep Icon="@SvgIcon.TrackChangesAccept" Label="Finish Order"></StepperStep>
    </StepperSteps>
</TelerikStepper>
````


## See Also

  * [Live Demo: Stepper Configuration](https://demos.telerik.com/blazor-ui/stepper/configuration)