---
title: Place a Wizard in Another Wizard Step
description: How can I add sub steps by placing one Wizard inside another Wizard's step?
type: how-to
page_title: Place a Wizard in Another Wizard Step
slug: wizard-kb-nest-wizard-in-step
tags: telerik, blazor, wizard, nested wizard, sub steps
ticketid: 1709608
res_type: kb
components: ["wizard"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Wizard for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How can I add sub steps by placing one Wizard inside another Wizard's step?

## Solution

You can nest a Wizard in a Wizard step by using the step's `Content` render fragment and placing another `TelerikWizard` inside it.

>caption Nest a Wizard in a parent Wizard step

````RAZOR
<TelerikWizard @bind-Value="@OuterWizardValue" Width="700px">
    <WizardSteps>
        <WizardStep Label="Main Step 1">
            <Content>
                <p>Parent Wizard content.</p>

                <TelerikWizard @bind-Value="@InnerWizardValue" Width="100%">
                    <WizardSteps>
                        <WizardStep Label="Nested Step 1">
                            <Content>
                                <p>Nested Wizard first step.</p>
                            </Content>
                        </WizardStep>
                        <WizardStep Label="Nested Step 2">
                            <Content>
                                <p>Nested Wizard second step.</p>
                            </Content>
                        </WizardStep>
                    </WizardSteps>
                </TelerikWizard>
            </Content>
        </WizardStep>
        <WizardStep Label="Main Step 2">
            <Content>
                <p>Parent Wizard second step.</p>
            </Content>
        </WizardStep>
    </WizardSteps>
</TelerikWizard>

@code {
    private int OuterWizardValue { get; set; }
    private int InnerWizardValue { get; set; }
}
````

## See Also

- [Wizard Overview](slug:wizard-overview)
- [Wizard Stepper Settings](slug:wizard-structure-stepper)
