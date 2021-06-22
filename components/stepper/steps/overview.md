---
title: Overview
page_title: Overview
description: Steps of the Stepper for Blazor.
slug: stepper-steps-overview
tags: telerik,blazor,steps,overview
published: True
position: 0
---

# Steps Overview

The Steps are the building blocks of the Stepper component. You can include the desired steps by adding a `StepperStep` tag for every step. The steps appearance can be configured through the features the `StepperStep` exposes - each step includes a visual [indicator]({%slug stepper-indicators%}), you can define a [label]({%slug stepper-labels%}) for the corresponding indicator and manage the step [state]({%slug stepper-state%}) and [validity]({%slug stepper-steps-validation%}).

The whole rendering of the steps can also be customized with a [Step Template]({%slug step-template%}).

>caption In this article:

* [Steps Declaration](#steps-declaration)
* [Steps Features](#features)

## Steps Declaration

To include the desired steps for the Stepper component, you can either manually declare a `StepperStep` tag for every step or loop through your collection with steps data and render one `StepperStep` tag binding its parameters to the corresponding field of your model.

>caption Loop through your collection and generate a `StepperStep` for every item in the collection. The result from the snippet.

![Steps collection](images/steps-collection-example.png)

````CSHTML
@*Loop through a collection to create a step for all items in the collection. *@

<div style="width:700px">
    <TelerikStepper>
        <StepperSteps>
            @foreach (var step in Steps)
            {
            <StepperStep Label="@step.Label" Icon="@step.Icon" 
                         Optional="@step.Optional" Disabled="@step.Disabled">
            </StepperStep>
            }
        </StepperSteps>
    </TelerikStepper>
</div>

@code{
    List<StepModel> Steps { get; set; }

    protected override void OnInitialized()
    {
        Steps = new List<StepModel>()
    {
            new StepModel()
            {
                Label = "Personal Info",
                Icon = "user"
            },
            new StepModel()
            {
                Label = "Education",
                Icon = "dictionary-add",
                Disabled = true
            },
            new StepModel()
            {
                Label = "Experience",
                Icon = "flip-vertical"
            },
            new StepModel()
            {
                Label = "Attachments",
                Icon = "attachment",
                Optional = true
            }
        };
            base.OnInitialized();
    }

    public class StepModel
    {
        public string Label { get; set; }
        public string Icon { get; set; }
        public bool Disabled { get; set; }
        public bool Optional { get; set; }
    }
}
````

## Features

The `StepperStep` exposes the following features which allow you to configure their appearance:

* [Indicators]({%slug stepper-indicators%}) - the visual indicators of the steps can include the following content:
    * Text - `string` - Specifies the step indicator text.
    * Icon - `string` - The icon which will be rendered inside the step indicator.
    * IconClass - `string` - The icon class which will be rendered inside the step indicator.
    * ImageUrl - `string` - The image which will be rendered inside the step indicator.
    * SpriteClass - `string` - The Sprite class which will be rendered inside the step indicator.
    
* Label - `string` - Specifies the [label text]({%slug stepper-labels%}) that will be rendered under the corresponding step indicator.

* [State]({%slug stepper-state%})
    * Disabled `bool` - Specifies if the step is disabled. The default value is `false`.
    * Optional - `bool` - Specifies if the step is optional. The default value is `false`.

* Valid - `bool?` - Specifies if the step is [valid]({%slug stepper-steps-validation%}) or not. The default value is `null`.

* Class - `string` - CSS class for the current step.

## See Also

  * [Live Demo: Stepper Overview](https://demos.telerik.com/blazor-ui/stepper/overview)