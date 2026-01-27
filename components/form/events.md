---
title: Events
page_title: Form Events
description: The Form component for Blazor exposes events that allow you to react to user actions and provide user logic.
slug: form-events
tags: telerik,blazor,form,edit,events
published: True
position: 30
components: ["form"]
---
# Form Events

The Form component for Blazor exposes events that allow you to respond to user actions and provide custom logic.

* [OnSubmit](#onsubmit)
* [OnUpdate](#onupdate)
* [OnValidSubmit](#onvalidsubmit)
* [OnInvalidSubmit](#oninvalidsubmit)

>note The examples in this article use the `EditContext`, but you can use a [model](slug:form-overview#creating-blazor-form) instead. 

## OnSubmit

The `OnSubmit` event fires when the user clicks on the Submit button in the Form. Its handler takes as an argument the `EditContext` object and is used to trigger some custom logic based on the validity of the form. 

When there is a handler for the `OnSubmit` event, the [`OnValidSubmit`](#onvalidsubmit) and [`OnInvalidSubmit`](#oninvalidsubmit) events will not be fired.
  
The `OnSubmit` event is mapped to the `OnSubmit` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0">Microsoft EditForm</a>


>caption Handle the OnSubmit event

````RAZOR
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
            //apply some custom logic when the form is valid
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

## OnUpdate

The `OnUpdate` event fires when the user changes a value in the Form. The event is tied to the `FieldChanged` event of the Form's `EditContext`.

By default, `OnUpdate` will fire on each keystroke for [auto-generated form items](slug:form-overview#automatic-generation-of-fields) and [`FormItem` templates](slug:form-formitems-template). To change this behavior, define a `FormItem` `Template` and set [`ValidateOn` to `ValidationEvent.Change`](slug:common-features/input-validation#validation-modes-for-simple-inputs) for the field editor component. In this case, `OnUpdate` will fire when the user blurs the field editor or hits Enter while the editor is focused.

You can use the `OnUpdate` event to programmatically [refresh the UI outside the current Form item](slug:form-formitems#ui-rendering-inside-the-form).

The `OnUpdate` event argument is a [`FormUpdateEventArgs` object](slug:Telerik.Blazor.Components.FormUpdateEventArgs) with the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `Model` | `object` | The Form model with the latest updated values. Cast it to the correct type to access the class members. |
| `FieldName` | `string` | The name of the updated model property. |

>caption Using the Form OnUpdate event

````RAZOR
<p>OnUpdate will fire on each key stroke that changes a form value:</p>

<TelerikForm Model="@Colleague"
             OnUpdate="@OnFormUpdate"
             Width="300px">
</TelerikForm>

<p>OnUpdate will fire on blur or Enter keypress:</p>

<TelerikForm Model="@Colleague"
             OnUpdate="@OnFormUpdate"
             Width="300px">
    <FormItems>
        <FormItem Field="@nameof(Person.FirstName)">
            <Template>
                FirstName
                <br />
                <TelerikTextBox @bind-Value="@Colleague.FirstName"
                                ValidateOn="@ValidationEvent.Change" />
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

<p>Event Log: @EventLogger</p>

@code {
    private Person Colleague = new Person();

    private string EventLogger { get; set; }

    private async Task OnFormUpdate(FormUpdateEventArgs args)
    {
        Person updatedModel = (Person)args.Model;
        var updatedValue = typeof(Person).GetProperty(args.FieldName).GetValue(updatedModel);

        EventLogger = $"OnUpdate fired for {args.FieldName} with a new value of \"{updatedValue}\"";
    }

    public class Person
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
````

## OnValidSubmit

The `OnValidSubmit` event fires when the form is submitted and there are no validation errors. It is mapped to `OnValidSubmit ` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0">Microsoft EditForm</a>. Its handler takes the `EditContext` as an argument.

>caption Use the OnValidSubmit event

````RAZOR
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


    public void OnValidSubmitHandler(EditContext editContext)
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

The `OnInvalidSubmit` event fires when there are validation errors in the Form upon its submission. It is mapped to `OnInvalidSubmit` event of the <a target="_blank" href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0">Microsoft EditForm</a>. Its handler takes the `EditContext` as an argument.

>caption Use the OnInvalidSubmit event

````RAZOR
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

    public void OnInvalidSubmitHandler(EditContext editContext)
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

  * [Overview](slug:form-overview)
  * [FormItems](slug:form-formitems)
  * [Template](slug:form-formitems-template)
  * [Orientation](slug:form-orientation)
  * [Events](slug:form-events)
   
