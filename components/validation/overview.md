---
title: Overview
page_title: Validation Tools - Overview
description: Overview of the Validation Tools for Blazor.
slug: validation-tools-overview
tags: telerik,blazor,validation,tools,overview
published: True
position: 0
---

# Validation Tools Overview

The Telerik UI for Blazor provides different ways to customize the validation messages. They can be used together with the [Telerik Form]({%slug form-overview%}) or with any form that provides an <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext?view=aspnetcore-5.0" target="_blank">EditContext</a> like the `EditForm` provided by the framework. 

@[template](/_contentTemplates/common/form-validation.md#note-validation)

#### This article contains the following sections

* [Validation Tools](#validation-tools)
* [Integration](#integration)
	* [Integration with the TelerikForm](#integration-with-the-telerikform)
	* [Integration with the Microsoft EditForm](#integration-with-the-microsoft-editform)


## Validation Tools

Telerik provides the following validation tools to help you style your form validation:

* [Validation Summary]({%slug validation-tools-summary%})
* [Validation Message]({%slug validation-tools-message%})
* [Validation Tooltip]({%slug validation-tools-tooltip%})

These components add customization options on top of the standard validation tools the frameworks provides - `ValidationSummary` and `ValidationMessage`

## Integration

Here are two examples of integrating the Telerik validation extenders with forms:

* [Integration with the TelerikForm](#integration-with-the-telerikform)
* [Integration with the Microsoft EditForm](#integration-with-the-microsoft-editform)

### Integration with the TelerikForm

You can seamlessly integrate the validation tools with the [Form Component]({%slug form-overview%}). In order to avoid doubling of validation message you should set the [ValidationMessageType]({%slug form-overview%}#features) parameter of the form to `FormValidationMessageType.None`. You can also use them in the [templates with custom editors]({%slug form-formitems-template%}) that you can define with your own code.

````CSHTML
@* Disable the default validation messages from the Telerik Form and use the validation tools instead *@

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person" ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
        <TelerikValidationSummary />
    </FormValidation>

    <FormItems>
        <FormItem LabelText="Name" Field="@nameof(Person.Name)" Hint="This editor uses TelerikValidationTooltip" Id="NameFieldVsalidationTooltip" />
        <TelerikValidationTooltip For="@( () => person.Name)" TargetSelector="#NameFieldVsalidationTooltip" />

        <FormItem LabelText="Age" Field="@nameof(Person.Age)" Hint="This editor uses TelerikValidationMessage" />
        <TelerikValidationMessage For="@( () => person.Age)" />

        <FormItem LabelText="Name" Field="@nameof(Person.IsMarried)" Hint="This editor uses TelerikValidationTooltip" Id="IsMarriedFieldValidationTooltip" />
        <TelerikValidationTooltip For="@( () => person.IsMarried)" TargetSelector="#IsMarriedFieldValidationTooltip" />
    </FormItems>
</TelerikForm>

@code {
    Person person = new Person();

    public class Person
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Range(10,150, ErrorMessage ="The age should be between 10 and 150")]
        public int? Age { get; set; }

        [Required]
        public bool IsMarried { get; set; }
    }
}
````

### Integration with the Microsoft EditForm

````CSHTML
@* Use the Telerik Validation tools inside an EditForm *@

@using System.ComponentModel.DataAnnotations

<EditForm Model="@person">
    <DataAnnotationsValidator />

    <TelerikValidationSummary />

    <p>
        <label for="NameFieldId">Name</label>
        <TelerikTextBox @bind-Value="@person.Name" Id="NameFieldId"></TelerikTextBox>
        <TelerikValidationTooltip For="@( () => person.Name)" TargetSelector="#NameFieldId" />
    </p>

    <p>
        <label for="AgeFieldId">Age</label>
        <TelerikNumericTextBox @bind-Value="@person.Age" Id="AgeFieldId"></TelerikNumericTextBox>
        <TelerikValidationMessage For="@( () => person.Age)" />
    </p>

    <p>
        <label for="IsMarriedFieldId">Is Married</label>
        <TelerikCheckBox @bind-Value="@person.IsMarried" Id="IsMarriedFieldId"></TelerikCheckBox>
        <TelerikValidationTooltip For="@( () => person.IsMarried)" TargetSelector="#IsMarriedFieldId" />
    </p>

    <TelerikButton ButtonType="ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    Person person = new Person();

    public class Person
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Range(10, 150, ErrorMessage = "The age should be between 10 and 150")]
        public int? Age { get; set; }

        [Required]
        public bool IsMarried { get; set; }
    }
}
````

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [TelerikValidationSummary]({%slug validation-tools-summary%})
* [TelerikValidationMessage]({%slug validation-tools-message%})
* [TelerikValidationTooltip]({%slug validation-tools-tooltip%})
* [Form Component]({%slug form-overview%})

