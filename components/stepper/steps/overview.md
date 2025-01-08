---
title: Overview
page_title: Overview
description: Steps of the Stepper for Blazor.
slug: stepper-steps-overview
tags: telerik,blazor,steps,overview
published: True
position: 0
---

# Blazor Steps Overview

The Steps are the building blocks of the Stepper component. You can include the desired steps by adding a `StepperStep` tag for every step. The steps appearance can be configured through the features the `StepperStep` exposes - each step includes a visual [indicator](slug://stepper-indicators), you can define a [label](slug://stepper-labels) for the corresponding indicator and manage the step [state](slug://stepper-state) and [validity](slug://stepper-steps-validation).

The whole rendering of the steps can also be customized with a [Step Template](slug://step-template).

>caption In this article:

* [Step Parameters](#step-parameters)
* [Steps Declaration](#steps-declaration)

## Step Parameters

The `StepperStep` exposes the following parameters which allow you to configure their appearance:

### Indicators 

The [visual indicators](slug://stepper-indicators) of the steps can include the content below.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Text` | `string` | Specifies the step indicator text. |
| `Icon` | `object` | The icon which will be rendered inside the step indicator. The parameter can accept [properties of the static `SvgIcon` class, members of the `FontIcon` enum](slug://common-features-icons), or strings for custom icons. |

### State

The steps can have one of the [states](slug://stepper-state) below.

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Disabled` | `bool` | Specifies if the step is disabled. |
| `Optional` | `bool` | Specifies if the step is optional. |

### Other parameters

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Label` | `string` | Specifies the [label text](slug://stepper-labels) that will be rendered under the corresponding step indicator. |
| `Valid` | `bool?` | Specifies if the step is [valid](slug://stepper-steps-validation) or not. |
| `Class` | `string` | CSS class for the current step. |

## Steps Declaration

To include the desired steps for the Stepper component, you can either manually declare a `StepperStep` tag for every step or loop through your collection with steps data and render one `StepperStep` tag binding its parameters to the corresponding field of your model.

>caption Loop through your collection and generate a `StepperStep` for every item in the collection.

````RAZOR
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

@code {
    private List<StepModel> Steps { get; set; }

    protected override void OnInitialized()
    {
        Steps = new List<StepModel>() {
            new StepModel()
            {
                Label = "Personal Info",
                Icon = SvgIcon.User
            },
            new StepModel()
            {
                Label = "Education",
                Icon = SvgIcon.Book,
                Disabled = true
            },
            new StepModel()
            {
                Label = "Experience",
                Icon = SvgIcon.FlipVertical
            },
            new StepModel()
            {
                Label = "Attachments",
                Icon = SvgIcon.FileAdd,
                Optional = true
            }
        };

        base.OnInitialized();
    }

    public class StepModel
    {
        public string Label { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool Disabled { get; set; }
        public bool Optional { get; set; }
    }
}
````

## See Also

* [Live Demo: Stepper Overview](https://demos.telerik.com/blazor-ui/stepper/overview)
