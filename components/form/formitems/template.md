---
title: Template
page_title: FormItem - Template
description: Template for the FormItem.
slug: form-formitems-template
tags: telerik,blazor,form,edit,formitems,template
published: True
position: 5
---

# FormItem Template - Custom Editors

This article explains how to customize the editor of a single Form item. To customize the rendering and item structure of the whole Form, check the article [Form Template for All Items]({%slug form-formitems-formitemstemplate%}).

You can provide your own custom editors instead of the [default editors the form can generate]({%slug form-overview%}#automatic-generation-of-fields). To do that, use the the `Template` of the [FormItem]({%slug form-formitems%}).

When the Template is used, the built-in validation messages from the Form will not be rendered. Instead you can use the [Telerik Validation tools]({%slug validation-tools-overview%}) to provide validation messages, or any other suitable component such as the `ValidationMessage` that comes with the framework.

In this article you can find the following examples:

* [Use Template to provide custom editors](#use-template-to-provide-custom-editor)
* [Add validation messages to templated Form Items](#add-validation-messages-to-templated-form-items)

## Use Template to Provide Custom Editor

````CSHMTL
@* Use the Template to change the default editors *@

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@EditContext">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
        <ValidationSummary />
    </FormValidation>
    <FormItems>
        <FormItem>
            <Template>
                <label for="country">Destination country:</label>
                <TelerikDropDownList @bind-Value="@MyModel.Country"
                                     DefaultText="Choose a country"
                                     Data="@DropDownData"
                                     Id="country">
                    <DropDownListSettings>
                        <DropDownListPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <label for="city">Destination city:</label>
                <TelerikComboBox @bind-Value="@MyModel.City"
                                 Data="@CityData"
                                 Id="city">
                    <ComboBoxSettings>
                        <ComboBoxPopupSettings Height="auto" />
                    </ComboBoxSettings>
                </TelerikComboBox>
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <label for="visited">First time to visit:</label>
                <TelerikSwitch @bind-Value="@MyModel.FirstTime"></TelerikSwitch>
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>


@code {
    private TemplateModel MyModel { get; set; } = new TemplateModel();

    private EditContext EditContext { get; set; }

    private List<string> DropDownData { get; } = new List<string>()
    {
        "Bulgaria",
        "Italy",
        "Greece"
    };

    private List<string> CityData
    {
        get
        {
            switch (MyModel.Country)
            {
                case "Bulgaria":
                    return new List<string>() { "Sofia", "Plovdiv", "Varna", "Burgas" };
                case "Italy":
                    return new List<string>() { "Rome", "Milan", "Naples", "Turin" };
                case "Greece":
                    return new List<string>() { "Athens", "Thessaloniki", "Patras", "Piraeos" };
                default:
                    return new List<string>();
                    break;
            }
        }
    }

    protected override void OnInitialized()
    {
        EditContext = new EditContext(MyModel);
        base.OnInitialized();
    }

    public class TemplateModel
    {
        public TemplateModel()
        {

        }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "You must confirm first time.")]
        public bool FirstTime { get; set; }
    }
}
````


## Add Validation Messages to Templated Form Items

You can render validation messages for templated Form items by using the [TelerikValidationMessage]({%slug validation-tools-message%}).

````CSHTML
@* Use the TelerikValidationMessage to render validation messages *@

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@EditContext">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormItem>
            <Template>
                <label for="country">Destination country:</label>
                <TelerikDropDownList @bind-Value="@MyModel.Country"
                                     DefaultText="Choose a country"
                                     Data="@DropDownData"
                                     Id="country">
                    <DropDownListSettings>
                        <DropDownListPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>
                <TelerikValidationMessage For="@(() => MyModel.Country)" />
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <label for="city">Destination city:</label>
                <TelerikComboBox @bind-Value="@MyModel.City"
                                 Data="@CityData"
                                 Id="city">
                    <ComboBoxSettings>
                        <ComboBoxPopupSettings Height="auto" />
                    </ComboBoxSettings>
                </TelerikComboBox>
                <TelerikValidationMessage For="@(() => MyModel.City)" />
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <label for="visited">First time to visit:</label>
                <TelerikSwitch @bind-Value="@MyModel.FirstTime"></TelerikSwitch>
                <TelerikValidationMessage For="@(() => MyModel.FirstTime)" />
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>


@code {
    private TemplateModel MyModel { get; set; } = new TemplateModel();

    private EditContext EditContext { get; set; }

    private List<string> DropDownData { get; } = new List<string>()
    {
        "Bulgaria",
        "Italy",
        "Greece"
    };

    private List<string> CityData
    {
        get
        {
            switch (MyModel.Country)
            {
                case "Bulgaria":
                    return new List<string>() { "Sofia", "Plovdiv", "Varna", "Burgas" };
                case "Italy":
                    return new List<string>() { "Rome", "Milan", "Naples", "Turin" };
                case "Greece":
                    return new List<string>() { "Athens", "Thessaloniki", "Patras", "Piraeos" };
                default:
                    return new List<string>();
                    break;
            }
        }
    }

    protected override void OnInitialized()
    {
        EditContext = new EditContext(MyModel);
        base.OnInitialized();
    }

    public class TemplateModel
    {
        public TemplateModel()
        {

        }

        [Required(ErrorMessage = "Select a Country")]
        public string Country { get; set; }

        [Required(ErrorMessage = "Select a City")]
        public string City { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "You must confirm first time.")]
        public bool FirstTime { get; set; }
    }
}
````

## See Also

  * [Overview]({%slug form-overview%})
  * [FormItems]({%slug form-formitems%})
  * [FormGroups]({%slug form-formgroups%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
   
