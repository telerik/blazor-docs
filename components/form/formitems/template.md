---
title: Template
page_title: FormItem - Template
description: Template for the FormItem.
slug: form-formitems-template
tags: telerik,blazor,form,edit,formitems,template
published: True
position: 5
components: ["form"]
---
# FormItem Template - Custom Editors

This article explains how to customize the editor of a single Form item. To customize the rendering and item structure of the whole Form, check the article [Form Template for All Items](slug:form-formitems-formitemstemplate).

## Basics

Form item templates enables the app to:

* Replace the [default editor that the Form generates for a given data type](slug:form-overview#automatic-generation-of-fields) with a different component.
* Use the usual editor component for a given data type, but customize the editor or handle additional events.

To use a form item template, add a `<Template>` tag inside the [FormItem](slug:form-formitems).

When using a Form item template, the following `FormItem` parameters are ignored, because the Form expects the template content to provide suitable replacements:

* `EditorType`
* `Hint`
* `Id`
* `LabelText`

@[template](/_contentTemplates/common/form-validation.md#note-editcontext-formitem-template)

## Validation Messages and Styling

The `FormItem` `Template` replaces all the Form item's built-in rendering, which includes [validation messages](https://www.telerik.com/blazor-ui/validation-message) and form item labels. You can use the [Telerik validation tools](slug:validation-tools-overview) to display the desired validation UI, or even use the standard Blazor `ValidationMessage` component.

The Telerik [Blazor Form](slug:form-overview) applies red color to the labels of invalid Form items. To preserve this behavior in Form item templates:

1. Set the `FormItem` [`Field` parameter](slug:form-formitems#formitem-parameters), which is otherwise not required when using a `Template`.
1. Use a `<label class="k-label k-form-label">` element inside the `<Template>`.

## Example

The sample below shows how to:

* Define custom editor components inside a `FormItem` `Template`.
* (optional) Preserve the built-in HTML rendering inside the template for consistent form item layout (`<label>` and `<div>` tags).
* (optional) Preserve the built-in label styling for invalid form items (`FormItem` `Field` parameters and `<label>` classes).
* (optional) Use [validation messages](https://www.telerik.com/blazor-ui/validation-message) inside Form item templates (`<TelerikValidationMessage>`).

>caption Using Form Item Templates

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@FormModel">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(TravelDestination.Country)">
            <Template>
                <label for="country" class="k-label k-form-label">Destination Country</label>
                <div class="k-form-field-wrap">
                    <TelerikDropDownList @bind-Value="@FormModel.Country"
                                         DefaultText="Select Country"
                                         Data="@DropDownData"
                                         Id="country">
                        <DropDownListSettings>
                            <DropDownListPopupSettings Height="auto" />
                        </DropDownListSettings>
                    </TelerikDropDownList>
                    <TelerikValidationMessage For="@(() => FormModel.Country)" />
                </div>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(TravelDestination.City)">
            <Template>
                <label for="city" class="k-label k-form-label">Destination City</label>
                <div class="k-form-field-wrap">
                    <TelerikComboBox Data="@CityData"
                                     @bind-Value="@FormModel.City"
                                     Placeholder="Select City"
                                     Id="city">
                        <ComboBoxSettings>
                            <ComboBoxPopupSettings Height="auto" />
                        </ComboBoxSettings>
                    </TelerikComboBox>
                    <TelerikValidationMessage For="@(() => FormModel.City)" />
                </div>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(TravelDestination.FirstTime)">
            <Template>
                <label for="firsttime" class="k-label k-form-label">First Time Visit</label>
                <div class="k-form-field-wrap">
                    <TelerikSwitch @bind-Value="@FormModel.FirstTime"
                                   OnLabel="Yes"
                                   OffLabel="No" />
                </div>
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

@code {
    private TravelDestination FormModel { get; set; } = new();

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
            switch (FormModel.Country)
            {
                case "Bulgaria":
                    return new List<string>() { "Sofia", "Plovdiv", "Varna", "Burgas" };
                case "Italy":
                    return new List<string>() { "Rome", "Milan", "Naples", "Turin" };
                case "Greece":
                    return new List<string>() { "Athens", "Thessaloniki", "Patras", "Piraeos" };
                default:
                    return new List<string>();
            }
        }
    }

    public class TravelDestination
    {
        [Required(ErrorMessage = "Country is required")]
        public string Country { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }

        public bool FirstTime { get; set; }
    }
}
````

## See Also

* [Live Demo: Form Item Templates](https://demos.telerik.com/blazor-ui/form/templates)
* [Form Items](slug:form-formitems)
* [Form Groups](slug:form-formgroups)
* [Form Events](slug:form-events)
