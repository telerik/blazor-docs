---
title: Input Validation
page_title: Input Validation
description: How to validate Blazor inputs.
slug: common-features/input-validation
tags: telerik,blazor,validation,data,annotation,form
published: True
position: 2
---
# Input Validation

The UI for Blazor suite supports and integrates seamlessly into Blazor's Forms and Validation infrastructure. All Telerik UI for Blazor Input components work out of the box when placed inside an `EditForm`, respond to `EditContext` changes and provide default invalid styles.

To validate the Blazor inputs, you need to:

1. Define a model that has the desired [Data Annotation attributes](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation).
1. Place the inputs corresponding to its fields in an `EditForm`.
1. Add a `DataAnnotationsValidator` inside the editable form.
1. Provide the values to the inputs through the `bind-Value` binding syntax.

This article provides examples of validating the Telerik Blazor components. The examples are separated by input types for brevity:


* [Simple Inputs](#simple-inputs)
* [DropDownList](#dropdownlist)
* [ComboBox](#combobox)
* [MultiSelect](#multiselect)
* [DateRangePicker](#daterangepicker)
* [Editor](#editor)
* [MaskedTextbox](#maskedtextbox)


## Simple Inputs

Simple textbox-like inputs do not have any special behavior. You need to bind them to a model field that has the desired data annotation attributes set. Such inputs are the textbox, numeric textbox and date input.

>caption How to validate inputs

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@
@* The Id parameters are not mandatory for validation, they just show better forms integration *@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <p class="name">
        <label for="nameTextbox">Name:</label>
        <TelerikTextBox @bind-Value="@person.Name" Id="nameTextbox"></TelerikTextBox>
        <ValidationMessage For="@(() => person.Name)"></ValidationMessage>
    </p>
    <p class="role">
        <label for="roleAutoComplete">Role:</label>
        <TelerikAutoComplete Data="@RoleSuggestions" @bind-Value="@person.Role" Id="roleAutoComplete"
                             Placeholder="Enter your role (can be free text)" ClearButton="true" />
        <ValidationMessage For="@(() => person.Role)"></ValidationMessage>
    </p>
    <p class="height">
        <label for="heightNumeric">Height (cm):</label>
        <TelerikNumericTextBox @bind-Value="@person.Height" Id="heightNumeric" />
        <ValidationMessage For="@(() => person.Height)"></ValidationMessage>
    </p>
    <p class="birthday">
        <label for="birthdayDateInput">Birthday:</label>
        <TelerikDateInput @bind-Value="@person.Birthday" Format="dd MMMM yyyy" Id="birthdayDateInput"></TelerikDateInput>
        <ValidationMessage For="@(() => person.Birthday)"></ValidationMessage>
    </p>
    <p class="favorite-day">
        <label for="favDayDatePicker">Favorite date:</label>
        <TelerikDatePicker @bind-Value="@person.FavoriteDay" Format="dd MMMM yyyy" Id="favDayDatePicker"></TelerikDatePicker>
        <ValidationMessage For="@(() => person.FavoriteDay)"></ValidationMessage>
    </p>
    <p class="daily-scrum">
        <label for="scrumTimePicker">Daily scrum:</label>
        <TelerikTimePicker @bind-Value="@person.DailyScrum" Id="scrumTimePicker"></TelerikTimePicker>
        <ValidationMessage For="@(() => person.DailyScrum)"></ValidationMessage>
    </p>
    <p class="start-time">
        <label for="dayStartDateTimePicker">Start time:</label>
        <TelerikDateTimePicker Format="G" @bind-Value="@person.StartTime" Width="250px" Id="dayStartDateTimePicker"></TelerikDateTimePicker>
        <ValidationMessage For="@(() => person.StartTime)"></ValidationMessage>
    </p>
    <p class="accepts-terms">
        <label class="k-checkbox-label" for="acceptTermsCheckbox">Accepts terms</label>
        <TelerikCheckBox @bind-Value="@person.AcceptsTerms" Id="acceptTermsCheckbox"></TelerikCheckBox>
        <ValidationMessage For="@(() => person.AcceptsTerms)"></ValidationMessage>
    </p>
    <p class="subscribe-mail">
        <label>
            Newsletter subscription
            <TelerikSwitch @bind-Value="@person.SubscribeToNewsletter"></TelerikSwitch>
        </label>
        <ValidationMessage For="@(() => person.SubscribeToNewsletter)"></ValidationMessage>
    </p>

    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    // Usually this class would be in a different file
    public class Person
    {
        [Required(ErrorMessage = "Enter a name")]
        [StringLength(10, ErrorMessage = "That name is too long")]
        public string Name { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "That role name is too long, use abbreviations")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Provide your height in centimeters")]
        [Range(1, 300, ErrorMessage = "Nobody is that tall")]
        public int? Height { get; set; }

        [Required]
        [Range(typeof(DateTime), "1/1/1900", "1/12/2000",
            ErrorMessage = "Value for {0} must be between {1:dd MMM yyyy} and {2:dd MMM yyyy}")]
        public DateTime Birthday { get; set; }

        [Required]
        [Range(typeof(DateTime), "1/1/1999", "1/12/2019",
            ErrorMessage = "Value for {0} must be between {1:dd MMM yyyy} and {2:dd MMM yyyy}")]
        [Display(Name = "Your Favourite Day")]
        public DateTime FavoriteDay { get; set; }

        [Required(ErrorMessage = "The daily standup is required")]
        [Range(typeof(DateTime), "1/1/1900 08:00:00", "1/1/1900 17:00:00",
            ErrorMessage = "Time should be in business hours, between 8AM and 5 PM.")]
        public DateTime? DailyScrum { get; set; }

        [Required(ErrorMessage = "Enter a starting time")]
        [Range(typeof(DateTime), "29/11/2018 10:00:00", "22/12/2025 17:00:00",
            ErrorMessage = "Value for {0} must be between {1:dd MMM yyyy HH:mm} and {2:dd MMM yyyy HH:mm}")]
        public DateTime StartTime { get; set; }

        [Required]
        [Range(typeof(bool), "true", "true", ErrorMessage = "Must accept terms")]
        public bool AcceptsTerms { get; set; }

        [Required]
        [Range(typeof(bool), "true", "true", ErrorMessage = "Must subscribe to the newsletter")]
        public bool SubscribeToNewsletter { get; set; }
    }

    Person person = new Person()
    {
        // for time pickers, the initial date value must match the date portion of the range validation rule
        DailyScrum = new DateTime(1900, 1, 1, 1, 1, 1),
    };

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }

    List<string> RoleSuggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## DropDownList

The DropDownList always has an item selected - the first item from its data source, the item corresponding to the `Value`, or the item created from the `DefaultText` the developer provides (which has the default value for the type of the Value field - for example, `0` for an `int` and `null` for an `int?` or `string`).

This means that for required field validation to work, the current item must have a `null` value. Alternatively, if you cannot alter the dropdownlist item model you already have, you can use range validation and set a value for the default item that is outside of the range of actual values.

>caption How to validate a dropdownlist

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@
@* The Id parameter is not mandatory for validation, ut just shows better forms integration *@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p class="gender">
        <label for="genderDropdownlist">Gender:</label>
        <TelerikDropDownList @bind-Value="person.Gender" DefaultText="Select gender" Id="genderDropdownlist"
                             Data="@genders" TextField="MyTextField" ValueField="MyValueField">
        </TelerikDropDownList>
        <ValidationMessage For="@(() => person.Gender)"></ValidationMessage>
    </p>

    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    // Usually the model classes would be in different files
    public class Person
    {
        [Required(ErrorMessage = "Gender is mandatory.")]//the value field in the dropdown model must be null in the default item
        [Range(1, 3, ErrorMessage = "Please select your gender.")] //limits the fourth option just to showcase this is honored
        public int? Gender { get; set; }
    }

    public class MyDdlModel
    {
        //nullable so the default item can allow required field validation
        //alternatively, use a range validator and put a value out of that range for the default item
        public int? MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    Person person = new Person();

    IEnumerable<MyDdlModel> genders = new List<MyDdlModel>
    {
        new MyDdlModel {MyTextField = "female", MyValueField = 1},
        new MyDdlModel {MyTextField = "male", MyValueField = 2},
        new MyDdlModel {MyTextField = "other", MyValueField = 3},
        new MyDdlModel {MyTextField = "I'd rather not say", MyValueField = 4}
    };

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }
}
````


# ComboBox

The ComboBox works with the `Value` of the selected item (through its `ValueField`). This means that for required field validation to work, the current item must have a `null` value, or `AllowCustom` must be `true` and the input empty.

>caption How to validate a combobox without custom values

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@
@* The Id parameter is not mandatory for validation, ut just shows better forms integration *@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p class="team">
        <label for="teamCombobox">Team:</label>
        <TelerikComboBox @bind-Value="person.Team" Placeholder="Select team" ClearButton="true" Id="teamCombobox"
                               Data="@teams" TextField="MyTextField" ValueField="MyValueField">
        </TelerikComboBox>
        <ValidationMessage For="@(() => person.Team)"></ValidationMessage>
    </p>

    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    // Usually the model classes would be in different files
    public class Person
    {
        [Required(ErrorMessage = "Team is mandatory.")]//the value field in the combobox model must be null for this to have effect
        [Range(1, 3, ErrorMessage = "Please select an actual team.")] //limits the fourth option just to showcase this is honored
        public int? Team { get; set; }
    }

    public class MyDdlModel
    {
        //nullable so the default item can allow required field validation
        //alternatively, use a range validator and put a value out of that range for the default item
        public int? MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    Person person = new Person();

    IEnumerable<MyDdlModel> teams = new List<MyDdlModel>
    {
        new MyDdlModel {MyTextField = "Team 1", MyValueField = 1},
        new MyDdlModel {MyTextField = "Team 2", MyValueField = 2},
        new MyDdlModel {MyTextField = "Team 3", MyValueField = 3},
        new MyDdlModel {MyTextField = "CEO", MyValueField = 4}
    };

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }
}

````

>caption How to validate a combobox with custom values

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@
@* The Id parameter is not mandatory for validation, ut just shows better forms integration *@

@*You can still use a full model, primitive types are used for brevity here*@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p class="team">
        <label for="teamComboBox">Team:</label>
        <TelerikComboBox Data="@ExistingTeams" @bind-Value="person.Team" AllowCustom="true" ClearButton="true" Id="teamComboBox"></TelerikComboBox>
        <ValidationMessage For="@(() => person.Team)"></ValidationMessage>
    </p>

    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    // Usually the model classes would be in different files
    public class Person
    {
        [Required(ErrorMessage = "Team is mandatory.")]//the combo must be empty for this to take effect
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$",
         ErrorMessage = "Characters are not allowed.")] // Allow up to 40 uppercase and lowercase symbols, no special characters
                                                        // Applies to custom values as well as values from the data source.
        public string Team { get; set; }
    }

    Person person = new Person();

    protected List<string> ExistingTeams = new List<string>() { "first", "second", "third" };

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }
}
````



## MultiSelect

The MultiSelect has a value that is a `List` and the validation attributes must take that into account (for example, a regular expression attribute cannot work).

>caption How to validate a MultiSelect

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@
@* The Id parameter is not mandatory for validation, ut just shows better forms integration *@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p class="languages">
        <label for="languagesMultiSelect">Languages:</label>
        <TelerikMultiSelect @bind-Value="@person.DevLanguages"
                                       Placeholder="Programming languages you know"
                                       Data="@DevSkills"
                                       Id="languagesMultiSelect"/>
        <ValidationMessage For="@(() => person.DevLanguages)"></ValidationMessage>
    </p>

    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    public class Person
    {
        [Required(ErrorMessage = "You must list the dev skills you have")]
        [MinLength(3, ErrorMessage = "At least three languages are required so this application is considered")]
        public List<string> DevLanguages { get; set; }
    }

    Person person = new Person();

    List<string> DevSkills = new List<string>
   {
        "Blazor", "C#", "Python", "C", "C++", "Assembler", "Ruby", "Java", "JavaScript", "HTML", "CSS", "SQL", "PHP"
    };

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }
}
````

## DateRangePicker

The Date Range Picker component consists of two inputs that the user can change independently. They can choose to alter one or both, and the application cannot know their intent - they can change one to an invalid value (for example, a start date that is after the end date), but then intend to change the second input as well.

There is no built-in provision in the framework for validating a field value based on another field value and so you need to implement a custom data annotation attribute to ensure the start date is before the end date.

>caption Validate that the start date is before the end date through a custom attribute

````CSHTML
@* These using statements are for the custom data annotation validation attribute. Check its implementation at the end of this code snippet *@
@using System.Reflection
@using System.ComponentModel.DataAnnotations

<EditForm Model="@dateRange" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p>Try typing a date in the End input that is earlier than the Start date, and press Submit.
    Or, use the Up and Down arrows to change the value of either input.</p>
    <TelerikDateRangePicker @bind-StartValue="@dateRange.StartDate"
                            @bind-EndValue="@dateRange.EndDate" />

    <TelerikButton Class="mt-4" ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    private DateRangeModel dateRange { get; set; } = new DateRangeModel()
    {
        StartDate = DateTime.Today,
        EndDate = DateTime.Today.AddDays(5)
    };

    async void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }

    // A custom validation attribute is used to show an error message to the user
    // if they type an end date that is before the start date in the input
    public class CompareDateAttribute : ValidationAttribute
    {
        public string compareToDateTimeProperty;

        public CompareDateAttribute(string compareToPropertyName)
        {
            this.compareToDateTimeProperty = compareToPropertyName;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var validationObject = validationContext.ObjectInstance;
            PropertyInfo propertyInfo = validationObject.GetType().GetProperty(compareToDateTimeProperty);

            var currentValue = (DateTime?)value;
            var compareToValue = (DateTime?)propertyInfo?.GetValue(validationObject);

            return currentValue < compareToValue ? ValidationResult.Success : new ValidationResult(ErrorMessage);
        }
    }

    public class DateRangeModel
    {
        [Required]
        [Range(typeof(DateTime), "1/1/2019", "1/12/2025",
        ErrorMessage = "Value for {0} must be between {1:dd MMM yyyy} and {2:dd MMM yyyy}")]
        // custom validation attribute to ensure start date is before the end date
        [CompareDate(nameof(EndDate), ErrorMessage = "The Start date must be before the End date.")]
        public DateTime? StartDate { get; set; }

        [Required]
        [Range(typeof(DateTime), "1/1/2019", "1/12/2025",
        ErrorMessage = "Value for {0} must be between {1:dd MMM yyyy} and {2:dd MMM yyyy}")]
        public DateTime? EndDate { get; set; }

        public DateRangeModel()
        {

        }
    }
}
````


## Editor

The Editor produces an HTML string in the field you bind its `Value` to. Thus, while the user may see a certain amount of content, the actual content may have more symbols, because the HTML tags count towards the total string length, but the user does not see them.

Unlike other components, the editor does not trigger form validation on every keystroke, because it is expected to require a lot of content and that would be bad for performance. Validation is still triggered upon the `ValueChanged` event, but that fires with a delay - the `UpdateInterval` parameter which defaults to 100ms.

>caption How to validate the Editor component

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@

<EditForm Model="@theProduct" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <TelerikEditor @bind-Value="@theProduct.Description">
    </TelerikEditor>

    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {
    public class Product
    {
        [Required(ErrorMessage = "Description is required")]
        [MaxLength(100, ErrorMessage = "The max allowed length of the content is 100 symbols")]
        [MinLength(20, ErrorMessage = "The min allowed length of the content is 20 symbols")]
        public string Description { get; set; }
    }

    Product theProduct = new Product();

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }
}
````


## MaskedTextbox

The Masked Textbox prompts the user for their input and restricts it according to its [Mask]({%slug maskedtextbox-mask-prompt%}). The Blazor validation is, however, controlled by data annotation attributes on the model and so the application must have the appropriate rules set that match the desired input and masks. The RegularExpression annotation is commonly used to require a specific input format and values, or you can implement custom data annotation attributes too.

>caption Sample DataAnnotation rules that match masks to validate user input

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attributes only *@

<EditForm Model="@Payment" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <p>
        <TelerikMaskedTextBox Mask="0000-0000-0000-0000" IncludeLiterals="true" Label="Credit Card:" @bind-Value="@Payment.CreditCard"></TelerikMaskedTextBox>
        <ValidationMessage For="@(() => Payment.CreditCard)" />
    </p>

    <p>
        <TelerikMaskedTextBox Mask="+1-000-000-0000" Label="Phone:" @bind-Value="@Payment.PhoneNumber" PromptPlaceholder="null"></TelerikMaskedTextBox>
        <ValidationMessage For="@(() => Payment.PhoneNumber)" />
    </p>

    <p>
        <TelerikMaskedTextBox Mask="00000-9999" Label="ZIP:" @bind-Value="@Payment.Zip" PromptPlaceholder="null"></TelerikMaskedTextBox>
        <ValidationMessage For="@(() => Payment.Zip)" />
    </p>

    <TelerikButton ButtonType="@ButtonType.Submit" Primary="true">Submit</TelerikButton>
</EditForm>


@code{
    PaymentDetails Payment { get; set; } = new PaymentDetails();

    public class PaymentDetails
    {
        //NOTE: These are sample rules, make sure to use ones that are correct and suitable for your application needs

        [Required]
        [RegularExpression("^[1-9][0-9]{3}-[1-3]{4}-[0-9]{4}-[0-9]{4}$", ErrorMessage = "Please enter a valid credit card number")]
        public string CreditCard { get; set; }

        [MinLength(10)]
        public string PhoneNumber { get; set; }

        [Required]
        [RegularExpression(@"^\d{5}(?:[-\s]\d{4})?$", ErrorMessage = "Please Enter valid ZIP code")]
        public string Zip { get; set; }
    }

    void HandleValidSubmit()
    {
        Console.WriteLine("VALID SUBMIT");
    }
}
````


## See Also

  * [Data Annotation attributes](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
  * [ValueChanged and Validation]({%slug value-changed-validation-model%})
  * [Validate on Blur/Change, not on input]({%slug textbox-validate-on-change%})
  * [Error: Requires a value for ValueExpression]({%slug common-kb-requires-valueexpression%})
