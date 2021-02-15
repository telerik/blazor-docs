---
title: Events
page_title: Form Events
description: Form for Blazor - Events.
slug: form-events
tags: telerik,blazor,form,edit,events
published: True
position: 15
---

# Form Events

The Form component for Blazor exposes events that allow you to respond to user actions and provide custom logic.

* [OnSubmit](#onsubmit)
* [OnValidSubmit](#onvalidsubmit)
* [OnInvalidSubmit](#oninvalidsubmit)

## OnSubmit

The `OnSubmit` event fires when the user clicks on the Submit button in the Form. It takes as a parameter the `EditContext` object and is used to trigger some custom logic based on the validity of the form. When this event is setup the `OnValidSubmit` and `OnInvalidSubmit` events will not be fired.
  
The `OnSubmit` event is mapped to the `OnSubmit` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0#built-in-forms-components">Microsoft EditForm</a>


>caption Handle the OnSubmit event

````CSHTML
@* Use the OnSubmit event to trigger some custom logic depending on the validity of the form *@

@using System.ComponentModel.DataAnnotations 

<TelerikForm EditContext="@myEditContext"
             OnSubmit="@OnSubmitHandler">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
</TelerikForm>


@code {
    public Person person = new Person();

    EditContext myEditContext { get; set; }


    private void OnSubmitHandler(EditContext editContext)
    {
        bool isFormValid = editContext.Validate();

        if (isFormValid)
        {
            //apply some custom logic when the form is valud
        }
        else
        {
            //apply some custom logic when the form is not valid
        }
    }

    protected override void OnInitialized()
    {
        myEditContext = new EditContext(person);
        base.OnInitialized();
    }

    public class Person
    {
        [Editable(false)]
        public int Id { get; set; }
        [Required(ErrorMessage ="Add your first name")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Add your last name")]
        public string LastName { get; set; }
        [Range(typeof(DateTime), "1/1/1900", "1/15/2020", ErrorMessage = "The Date of Birth must be between 1/1/1900 and 1/15/2021")]
        public DateTime DOB { get; set; } = DateTime.Today.AddYears(-20);
        public string CompanyName { get; set; }
        public DateTime HireDate { get; set; }
        public bool IsOnVacation { get; set; } = true;
    }
}
````

## See Also

  * [Toolbar]({%slug editor-toolbars%})
  * [Built-in Tools and Commands]({%slug editor-built-in-tools%})
  * [Custom Tools]({%slug editor-custom-tool%})
  * [Import and Export]({%slug editor-import-export%})
  * [Events]({%slug form-events%})
  * [Live Demo: Form](https://demos.telerik.com/blazor-ui/form/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikEditor)
   
