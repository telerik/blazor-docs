---
title: Templates
page_title: Wizard Templates
description: Explore the available templates for the Wizard for Blazor.
slug: wizard-templates
tags: telerik,blazor,wizard,template,templates
published: True
position: 50
components: ["wizard"]
---
# Wizard Templates

You can customize the whole appearance of the steps in the Stepper, that is part of the Wizard component, through their `StepTemplate`. It allows you to control the rendering and styles of both indicators and labels of the step.

````RAZOR
@*Use Roman numerals to enumerate the steps.*@

<TelerikWizard>
    <WizardSteps>
        <WizardStep>
            <StepTemplate>
                <span class="custom-step">
                    &#8544;
                </span>
            </StepTemplate>
            <Content>
                <p>Welcome to the Wizard!</p>
            </Content>
        </WizardStep>
        <WizardStep>
            <StepTemplate>
                    <div class="custom-step">
                        &#8545;
                    </div>
            </StepTemplate>
            <Content>
                <p>The user is performing some actions...</p>
            </Content>
        </WizardStep>
        <WizardStep>
            <StepTemplate>
                <span class="custom-step">
                    &#8546;
                </span>
            </StepTemplate>
            <Content>
                <p>Thank you!</p>
            </Content>
        </WizardStep>
    </WizardSteps>
</TelerikWizard>

<style>
    .custom-step {
        width: 40px;
        height: 40px;
        border: 2px solid #ff8008;
        border-radius: 10px;
        background-clip: padding-box;
        border-radius: 10px;
        box-sizing: border-box;
        text-align: center;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }
</style>
````

## See Also

  * [Live Demos: Wizard Template](https://demos.telerik.com/blazor-ui/wizard/stepper-template)
