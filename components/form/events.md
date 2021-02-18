---
title: Events
page_title: Form Events
description: Form for Blazor - Events.
slug: form-events
tags: telerik,blazor,form,edit,events
published: True
position: 30
---

# Form Events

The Form component for Blazor exposes events that allow you to respond to user actions and provide custom logic.

* [OnSubmit](#onsubmit)
* [OnValidSubmit](#onvalidsubmit)
* [OnInvalidSubmit](#oninvalidsubmit)

## OnSubmit

The `OnSubmit` event fires when the user clicks on the Submit button in the Form. It takes as a parameter the `EditContext` object and is used to trigger some custom logic based on the validity of the form. 

When there is a handler for the `OnSubmit` event, the [`OnValidSubmit`](#onvalidsubmit) and [`OnInvalidSubmit`](#oninvalidsubmit) events will not be fired.
  
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

## OnValidSubmit

The `OnValidSubmit` event fires when the form is submitted and there are no validation erros. It is mapped to `OnValidSubmit ` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0#built-in-forms-components">Microsoft EditForm</a>

>caption Use the OnValidSubmit event

````CSHTML
@* You can use the OnValidSubmit event to provide custom logic when the form is valid *@

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@myEditContext"
             OnValidSubmit="@OnValidSubmitHandler">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
</TelerikForm>


@code {
    public Person person = new Person();

    EditContext myEditContext { get; set; }


    public void OnValidSubmitHandler()
    {
        //some logic when the form is valid.
        Console.WriteLine("valid submission, you can save the model");
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
        [Required(ErrorMessage = "Add your first name")]
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

## OnInvalidSubmit

The `OnInvalidSubmit` event fires when there are validation erros in the Form upon its submission. It is mapped to `OnInvalidSubmit` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0#built-in-forms-components">Microsoft EditForm</a>

>caption Use the OnInvalidSubmit event

````CSHTML
@* You can use the OnInvalidSubmit event to provide custom logic when the form is not valid *@

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@myEditContext"
             OnInvalidSubmit="@OnInvalidSubmitHandler">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
</TelerikForm>


@code {
    public Person person = new Person();

    EditContext myEditContext { get; set; }

    public void OnInvalidSubmitHandler()
    {
        //some logic when the form is not valid.
        Console.WriteLine("INVALID submission attempt");
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
        [Required(ErrorMessage = "Add your first name")]
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

  * [Overview]({%slug form-overview%})
  * [FormItems]({%slug form-formitems%})
  * [Template]({%slug form-formitems-template%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
   
