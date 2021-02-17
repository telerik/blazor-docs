---
title: Template
page_title: FormItem - Template
description: Template for the FormItem.
slug: form-formitems-template
tags: telerik,blazor,form,edit,formitems,template
published: True
position: 5
---

# FormItem Template

You can provide your own custom editors instead of the [default editors the form can generate]({%slug form-overview%}#automatic-generation-of-fields). To do that, use the the `Template` of the [FormItem]({%slug form-formitems%}).

When the Template, is used the built-in validation of the Telerik Form is disabled and it is up to the application to validate the user input.

>caption Use the Template to provide custom editors

````CSHMTL
@* Use the Template to change the default editors *@

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
                                     PopupHeight=""
                                     Id="country">
                </TelerikDropDownList>
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <label for="city">Destination city:</label>
                <TelerikComboBox @bind-Value="@MyModel.City"
                                 Data="@CityData"
                                 PopupHeight=""
                                 Id="city">
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
    public TemplateModel MyModel { get; set; } = new TemplateModel();

    public EditContext EditContext { get; set; }

    public List<string> DropDownData { get; } = new List<string>()
    {
        "Bulgaria",
        "Italy",
        "Greece"
    };
    public List<string> CityData
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

    private void Clear()
    {
        MyModel = new TemplateModel();

        EditContext = new EditContext(MyModel);

        EditContext.AddDataAnnotationsValidation();
    }
}
````

>caption The result from the code snippet above

![Template example](images/formitems-template-example.png)

## See Also

  * [Overview]({%slug form-overview%})
  * [FormItems]({%slug form-formitems%})
  * [FormGroups]({%slug form-formgroups%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
   
