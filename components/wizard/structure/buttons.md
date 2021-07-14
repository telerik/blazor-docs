---
title: Buttons
page_title: Wizard Buttons
description: Buttons of the Wizard for Blazor.
slug: wizard-structure-buttons
tags: telerik,blazor,wizard,buttons
published: True
position: 5
---

# Wizard Buttons

This article provides details on the buttons available in the Telerik Wizard.

By default the Wizard provides three buttons, however it also allows option to add custom buttons, so you can configure it to match your desired scenario.

In this article:
* [Default buttons](#default-buttons)
* [Custom buttons](#custom-buttons)


## Default buttons

The Wizard provides the following default buttons:

* `Next` - navigates to the next step of the Wizard. If the next step is <strong>disabled</strong>, the button will also appear as disabled. If the next step is <strong>enabled</strong> the following process will be triggered:
    * Invoke [`OnStepChange`]({%slug wizard-events%}#onchange),
    * Go to the next page (if the event is not cancelled from `event args`)
    * Invoke [`ValueChanged`]({%slug wizard-events%}#valuechanged) after the step is changed

* `Previous` - navigates to the previous step of the Wizard. If the previous step is <strong>disabled</strong>, the button will also appear as disabled. If the previous step is <strong>enabled</strong> the following process will be triggered:
    * Invoke [`OnStepChange`]({%slug wizard-events%}#onchange),
    * Go to the previous page (if the event is not cancelled from `event args`)
    * Invoke [`ValueChanged`]({%slug wizard-events%}#valuechanged) after the step is changed

* `Done` - allows the user to complete the wizard. Invokes the [OnFinish]({%slug wizard-events%}#onfinish) event.

>caption Wizard with the default buttons. The result from the snippet.

![Default buttons](images/default-buttons-example.gif)

````CSHTML
@* Wizard with default buttons *@

<div style="text-align:center">
    <TelerikWizard Width="600px" Height="300px">
        <WizardSteps>
            <WizardStep Text="1">
                <Content>
                    <h2>Content for Wizard Step 1</h2>
                </Content>
            </WizardStep>
            <WizardStep Text="2">
                <Content>
                    <h2>Content for Wizard Step 2</h2>
                </Content>
            </WizardStep>
            <WizardStep Text="3">
                <Content>
                    <h2>Content for Wizard Step 3</h2>
                </Content>
            </WizardStep>
        </WizardSteps>
    </TelerikWizard>
</div>
````


## Custom buttons

The Wizard component allows you to include your custom buttons. You can define the desired buttons under the `WizardButtons` tag of the `TelerikWizard`.

This configuration overrides the whole rendering of the bottom right section of the Wizard including the built-in buttons and thus provides a full control over it. If you want to include Next and Previous buttons as per the default setup of the Wizard, you need to also add them inside the `WizardButtons`.


>caption Wizard with custom buttons. The result from the snippet.

![Custom buttons](images/custom-buttons-example.gif)

````CSHTML
@* Wizard with custom buttons *@

<div style="text-align:center">
    <TelerikWizard  @bind-Value="@Value" Width="600px" Height="300px">
        <WizardSteps>
            <WizardStep Text="1">
                <Content>
                    <h2>Content for Wizard Step 1</h2>
                </Content>
            </WizardStep>
            <WizardStep Text="2">
                <Content>
                    <h2>Content for Wizard Step 2</h2>
                </Content>
            </WizardStep>
            <WizardStep Text="3">
                <Content>
                    <h2>Content for Wizard Step 3</h2>
                </Content>
            </WizardStep>
        </WizardSteps>
        <WizardButtons>
            @{
                var index = context;

                if (index > 0)
                {
                    <TelerikButton OnClick="@(() => Value = 0)">Go to first page</TelerikButton>
                    <TelerikButton OnClick="@(() => Value -= 1)">Previous</TelerikButton>
                }
                if (index != 2)
                {
                    <TelerikButton ButtonType="ButtonType.Button" Primary="true" OnClick="@(() => Value += 1)">Next</TelerikButton>
                    <TelerikButton ButtonType="ButtonType.Button" Primary="true" OnClick="@(() => Value = 2)">Go to last page</TelerikButton>
                }
            }
        </WizardButtons>
    </TelerikWizard>
</div>

@code{

    public int Value { get; set; }
}
````

## See Also

  * [Live Demos: Wizard Buttons](https://demos.telerik.com/blazor-ui/wizard/buttons)