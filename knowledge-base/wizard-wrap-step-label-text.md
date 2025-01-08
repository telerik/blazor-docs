---
title: Wizard Text Wrapping
description: This article demonstrates how to allow text wrapping for step labels in the Telerik UI for Blazor Wizard component to ensure full text visibility.
type: how-to
page_title: How to Enable Text Wrapping in Wizard Step Labels - Telerik UI for Blazor
slug: wizard-kb-wrap-step-label-text
tags: telerik, blazor, wizard, css, styles
res_type: kb
ticketid: 1671064, 1574805, 1527700
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

How to allow the `TelerikWizard` to show the full text of the step labels. For instance, step labels in my Wizard component are getting cut off, and I wish to display the complete text by wrapping it onto the next line.

## Solution

To wrap the Wizard step labels and display the full text, apply custom CSS styles. These styles allow the text to wrap in the Wizard steps and break words if necessary to fit the content within the available space.

>caption Wrap Wizard step label text

````RAZOR
<style>
    .k-wizard .k-step .k-step-text {
        white-space: normal; /* Allow text to wrap */
        word-wrap: break-word; /* Break words if necessary */
    }
</style>

<TelerikWizard @bind-Value="@WizardValue">
    <WizardSteps>
        <WizardStep Label="Start Start Start Start Start" Icon="@SvgIcon.Gear">
            <Content>
                <p>Welcome to the Wizard!</p>
            </Content>
        </WizardStep>
        <WizardStep Label="Survey Survey Survey Survey Survey" Icon="@SvgIcon.Pencil">
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
    private int WizardValue { get; set; }
}
````

## See Also

- [Wizard Overview](https://docs.telerik.com/blazor-ui/components/wizard/overview)
- [Override the Theme or Apply Custom CSS Styles](slug://themes-override)
