---
title: Overview
page_title: Wizard Overview
description: Overview of the Wizard for Blazor. Description of the Wizard features.
slug: wizard-overview
tags: telerik,blazor,wizard,overview
published: True
position: 0
components: ["wizard"]
---
# Blazor Wizard Overview

The <a href = "https://www.telerik.com/blazor-ui/wizard" target="_blank">Wizard for Blazor component</a> displays content in sequential, stepwise order. Each Wizard step can display any HTML or child components. The Wizard provides flexible layout, form integration and can prevent or allow users to skip steps.

The Wizard uses a [Stepper component](slug:stepper-overview) internally, so knowledge about the Stepper will be a plus, although not required.

## Creating Blazor Wizard

1. Use the `TelerikWizard` tag
1. Set the `Value` parameter to an `int`. The parameter supports one-way and two-way binding.
1. Add some `WizardStep` instances inside a `WizardSteps` tag.
1. Each `WizardStep` can define a `Label` and an [`Icon`](slug:common-features-icons). Additional [stepper image or text indicators](slug:wizard-structure-stepper#indicators) are discussed later.

>caption Basic Telerik Wizard

````RAZOR
<TelerikWizard @bind-Value="@WizardValue">
    <WizardSteps>
        <WizardStep Label="Start" Icon="@SvgIcon.Gear">
            <Content>
                <p>Welcome to the Wizard!</p>
            </Content>
        </WizardStep>
        <WizardStep Label="Survey" Icon="@SvgIcon.Pencil">
            <Content>
                <p>The user is performing some actions...</p>
            </Content>
        </WizardStep>
        <WizardStep Label="Finish" Icon="SvgIcon.Check">
            <Content>
                <p>Thank you!</p>
            </Content>
        </WizardStep>
    </WizardSteps>
</TelerikWizard>

<p><strong>Wizard Value: @WizardValue</strong></p>

@code {
    int WizardValue { get; set; }
}
````

## Stepper

The [Wizard Stepper](slug:wizard-structure-stepper) is the area, which shows the user the overall progress. The Stepper can also allow the user to skip steps, if this is enabled explicitly. [Read more about the Wizard Stepper](slug:wizard-structure-stepper).

## Content

The [`<Content>` tag inside each `WizardStep`](slug:wizard-structure-content) is a standard Blazor `RenderFragment`, which allows any child content.

## Buttons

The [Wizard Buttons](slug:wizard-structure-buttons) enable the user to move forward and backward through the Wizard Steps. The Wizard provides the ability to use the built-in buttons or custom buttons. [Read more about the Wizard Buttons](slug:wizard-structure-buttons).

## Form Integration

The [Wizard can contain a Form component with validation](slug:form-overview). In such scenarios, the Wizard Stepper can enhance the form's user experience by changing the step's icon to show the current form validation state.

## Events

The [Wizard component fires events](slug:wizard-events) when the current step changes or when the user completes all steps. Step changes can be canceled.

## Layout

The [Wizard can display its Stepper on either side of the component](slug:wizard-layout) - top (defaut) or bottom, left or right.

## Wizard Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-wizard">` element. Use it to [override theme styles](slug:themes-override). |
| `Height` | `string` | Applies a height style in [any supported unit](slug:common-features/dimensions). |
| `ShowPager` | `bool` <br /> (`true`) | Renders a "Step X of Y" label at the bottom of the component. |
| `StepperPosition` | `WizardStepperPosition` enum <br /> (`Top`) | Defines the [Wizard layout and the Stepper position](slug:wizard-layout) with regard to the step content. |
| `Value` | `int` | Sets the **zero-based** index of the current step. Supports two-way binding. |
| `Width` | `string` | Applies a width style in [any supported unit](slug:common-features/dimensions). |

### WizardStepperSettings Parameters

See section [General Stepper Settings](slug:wizard-structure-stepper#general-stepper-settings).

### WizardStep Parameters

See section [Individual Stepper Settings](slug:wizard-structure-stepper#individual-stepper-settings).

## Next Steps

* [Explore the Wizard Stepper settings](slug:wizard-structure-stepper)
* [Handle Wizard events](slug:wizard-events)
* [Integrate the Wizard with a Form](slug:form-overview)

## See Also

* [Live Demos: Wizard Overview](https://demos.telerik.com/blazor-ui/wizard/overview)
