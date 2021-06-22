---
title: Overview
page_title: Wizard Overview
description: Overview of the Wizard for Blazor.
slug: wizard-overview
tags: telerik,blazor,wizard,overview
published: True
position: 0
---

# Wizard Overview

The Wizard for Blazor component displays content in sequential, stepwise order. Each step of the Wizard has `Content` (`RenderFragment`), which can contain any type of HTML content including a [Form]({%slug form-overview%}) component.

>caption The Wizard is separated into 3 main sections:
* [Stepper]({%slug wizard-structure-stepper%})
* [Content]({%slug wizard-structure-content%})
* [Buttons]({%slug wizard-structure-buttons%})

>caption In this article:

* [Basics](#basics)
* [Features](#features)

## Basics

#### To create a basic Telerik Wizard:

1. Use the `TelerikWizard` tag
1. under its `WizardSteps` tag, set and configure the desired `WizardStep` instances and include the desired content in their `Content` tag

>caption Set up a basic Telerik Wizard. The result from the snippet below.

![Basic Wizard](images/basic-wizard-example.png)

````CSHTML
@* Telerik Wizard with its most common features *@

@using System.ComponentModel.DataAnnotations

@if (ShowWizard)
{
    <TelerikWizard @bind-Value="@Value" OnFinish="@OnFinishHandler" Width="700px">
        <WizardSteps>
            <WizardStep Label="Personal Details" Icon="user" OnChange="@OnRegistrationStepChange">
                <Content>
                    <TelerikForm Model="@UserModel"
                                 @ref="@RegisterForm">
                        <FormValidation>
                            <DataAnnotationsValidator></DataAnnotationsValidator>
                        </FormValidation>
                        <FormItems>
                            <FormItem LabelText="First Name*:" Field="@nameof(User.FirstName)"></FormItem>
                            <FormItem LabelText="Last Name*:" Field="@nameof(User.LastName)"></FormItem>
                            <FormItem Field="@nameof(User.Email)">
                                <Template>
                                    <label for="mail" class="k-label k-form-label">Email*:</label>
                                    <TelerikTextBox Id="mail" @bind-Value="@UserModel.Email" InputMode="email" PlaceHolder="example@domain.com"></TelerikTextBox>
                                    <TelerikValidationMessage For="@(() => UserModel.Email)"></TelerikValidationMessage>
                                </Template>
                            </FormItem>
                            <FormItem Field="@nameof(User.Password)">
                                <Template>
                                    <label for="pass" class="k-label k-form-label">Password*:</label>
                                    <TelerikTextBox Id="pass" @bind-Value="@UserModel.Password" Password="true"></TelerikTextBox>
                                    <TelerikValidationMessage For="@(() => UserModel.Password)"></TelerikValidationMessage>
                                </Template>
                            </FormItem>
                            <FormItem Field="@nameof(User.AcceptTerms)" />
                        </FormItems>
                        <FormButtons></FormButtons>
                    </TelerikForm>
                </Content>
            </WizardStep>
            <WizardStep Label="Attachments" Icon="paperclip">
                <Content>
                    @* No Upload functionality is included for brevity. If needed, it can be additionally set up. *@
                    <TelerikUpload AllowedExtensions="@( new List<string>() { ".pdf", ".docx" } )" />
                </Content>
            </WizardStep>
            <WizardStep Label="Confirmation" Icon="check">
                <Content>
                    <h2>Registration completed.</h2>
                </Content>
            </WizardStep>
        </WizardSteps>
    </TelerikWizard>
}

@code {

    public bool ShowWizard { get; set; } = true;

    public int Value { get; set; }

    public TelerikForm RegisterForm { get; set; }
    public User UserModel { get; set; } = new User();

    public void OnRegistrationStepChange(WizardStepChangeEventArgs args)
    {
        var isFormValid = RegisterForm.IsValid();
        if (!isFormValid)
        {
            args.IsCancelled = true;
        }
    }

    public void OnFinishHandler()
    {
        ShowWizard = false;
    }

    public class User
    {
        [Required]
        public string FirstName { get; set; } = "John";

        [Required]
        public string LastName { get; set; } = "Smith";

        [Required]
        public string Email { get; set; } = "email@domain.com";

        [MinLength(3, ErrorMessage = "The password should be at least 3 characters.")]
        [Required]
        public string Password { get; set; }

        public DateTime? BirthDate { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "You must agree with the terms.")]
        [Display(Name = "Accept Terms and Conditions")]
        public bool AcceptTerms { get; set; }
    }
}
````

## Features

* `StepperPosition` - `WizardStepperPosition` - Specify where the stepper is rendered against the wizard content. The default is `Top`. See the [Layout]({%slug wizard-layout%}) article for more information.

* Value - `int` - Specifies the current step index.

* Width - `string` - Specifies the width of the Wizard.

* Height - `string` - Specifies the height of the Wizard.

* `ShowPager` - `bool` - Specifies if the pager text should be shown.

* `Class` - CSS class that will be rendered on the main wrapping element of the Wizard.

## See Also

  * [Live Demos: Wizard Overview](https://demos.telerik.com/blazor-ui/wizard/index)