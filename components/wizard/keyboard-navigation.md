---
title: Keyboard Navigation
page_title: Wizard - Keyboard Navigation
description: Find the default keyboard shortcuts of the Wizard for Blazor. Learn how to customize the Wizard keyboard navigation keys and key combinations.
slug: wizard-keyboard-navigation
tags: telerik,blazor,wizard,keyboard
published: True
tag: new
position: 14
components: ["wizard"]
---

# Wizard Keyboard Navigation

This article describes how the Wizard keyboard navigation works and how to [customize](#using-custom-keys) it. The article extends the general information about [keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation).

The Wizard is a single tab stop component and its keyboard navigation is active while the component's Stepper is focused.

## Default Keys

The following sections list the default built-in keyboard shortcuts and the actions that they perform when a specific item in the Wizard Stepper is focused. Also check the [Wizard Keyboard Navigation demo](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Key Combination | Description |
| --- | --- |
| `ArrowRight`, `ArrowDown` | Moves to the next step. |
| `ArrowLeft`, `ArrowUp` | Moves to the previous step. |
| `Home` | Moves to the first step. |
| `End` | Moves to the last step. |

## Using Custom Keys

The Wizard supports replacing the default built-in keyboard shortcuts or adding new ones that perform the same actions.

To override the built-in Wizard keyboard shortcuts, you need to create a `Dictionary<string, WizardKeyboardCommand?>>` that defines:

* Key names as `string` values. Use the same key names as in the [`KeyboardEventArgs.Key`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.keyboardeventargs.key) property, for example, `"B"`, `"Enter"`, or `"ArrowDown"`.
* Keyboard commands to execute as [`WizardKeyboardCommand`](#keyboard-command) values.

Set the `Dictionary` to the Wizard `CustomKeyboardShortcuts` parameter.

>caption Setting custom WizardKeyboardCommand keyboard shortcuts

````RAZOR.skip-repl
<TelerikWizard CustomKeyboardShortcuts="@WizardCustomKeyboardShortcuts" />

@code {
    private Dictionary<string, WizardKeyboardCommand?> WizardCustomKeyboardShortcuts => new()
    {
        { "Enter", WizardKeyboardCommand.NavigateToNextStep }
    };
}
````

### Keyboard Command

The [`WizardKeyboardCommand`](slug:Telerik.Blazor.WizardKeyboardCommand) enum represents a user action, for example, `NavigateToNextStep`.

You can define multiple keyboard shortcuts that execute the same keyboard command. If a Wizard keyboard command has no custom key, the component uses the default key. To disable a built-in keyboard command for a specific key, use `null`.

### Example

The following sample shows how to:

* Disable `ArrowUp` and `ArrowDown` and only use `ArrowRight` and `ArrowLeft` for nevigating to the next and previous step.
* Disable `Home` and `End`, so that there is no way to jump to the first or last step.

````RAZOR
<TelerikWizard @bind-Value="@WizardValue"
               CustomKeyboardShortcuts="@WizardCustomKeyboardShortcuts">
    <WizardSteps>
        <WizardStep Label="Start" Icon="@SvgIcon.Home">
            <Content>
                <p>Welcome to the Wizard!</p>
            </Content>
        </WizardStep>
        <WizardStep Label="Survey" Icon="@SvgIcon.Pencil">
            <Content>
                <p>The user is performing some actions...</p>
            </Content>
        </WizardStep>
        <WizardStep Label="Finish" Icon="@SvgIcon.Check">
            <Content>
                <p>Thank you!</p>
            </Content>
        </WizardStep>
    </WizardSteps>
</TelerikWizard>

@code {
    private int WizardValue { get; set; }

    private Dictionary<string, WizardKeyboardCommand?> WizardCustomKeyboardShortcuts => new()
    {
        { "ArrowRight", WizardKeyboardCommand.NavigateToNextStep },
        { "ArrowLeft", WizardKeyboardCommand.NavigateToPreviousStep },
        { "Home", null },
        { "End", null }
    };
}
````

## See Also

* [Online Demo: Wizard Keyboard Navigation](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation)
* [Keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation)
* [Telerik UI for Blazor Accessibility Overview](slug:accessibility-overview)
