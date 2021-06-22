---
title: Layout
page_title: Wizard Layout
description: Layout of the Wizard for Blazor.
slug: wizard-layout
tags: telerik,blazor,wizard,layout
published: True
position: 10
---

# Wizard Layout

The Wizard component allows you to control its layout. By default, the internal stepper is rendered on top of the Wizard [content]({%slug wizard-structure-content%}). You can customize its position through the `StepperPosition` the `TelerikWizard` exposes. It takes a member if the `WizardStepperPosition` enum:

* `Top` (the default)
* `Bottom`
* `Left`
* `Right`

>caption Customize the Wizard layout. The result from the snippet below.

![Wizard layout](images/wizard-layout-example.png)

````CSHTML
@* Change the position of the internal Stepper to Left *@

<div style="text-align:center">
    <TelerikWizard StepperPosition="WizardStepperPosition.Left" Width="600px" Height="300px">
        <WizardSteps>
            <WizardStep Text="1">
                <Content>
                    <div style="padding-top:80px">
                        <h2>Content for Wizard Step 1</h2>
                    </div>
                </Content>
            </WizardStep>
            <WizardStep Text="2">
                <Content>
                    <div style="padding-top:80px">
                        <h2>Content for Wizard Step 2</h2>
                    </div>
                </Content>
            </WizardStep>
            <WizardStep Text="3">
                <Content>
                    <div style="padding-top:80px">
                        <h2>Content for Wizard Step 3</h2>
                    </div>
                </Content>
            </WizardStep>           
        </WizardSteps>
    </TelerikWizard>
</div>
````

## See Also

  * [Live Demos: Wizard Configuration](https://demos.telerik.com/blazor-ui/wizard/configuration)