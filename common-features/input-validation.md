---
title: Input Validation
page_title: Input Validation
description: How to validate Blazor inputs
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



## Simple Inputs

Simple textbox-like inputs do not have any special behavior. You need to bind them to a model field that has the desired data annotation attributes set. Such inputs are the textbox, numeric textbox and date input.

>caption How to validate inputs

````CSHTML
@using System.ComponentModel.DataAnnotations @* used for the model class attributes *@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <p class="name">
        Name: <TelerikTextBox @bind-Value="person.Name"></TelerikTextBox>
        <ValidationMessage For="@(() => person.Name)"></ValidationMessage>
    </p>
    <p class="height">
        Height (cm): <TelerikNumericTextBox @bind-Value="person.Height" />
        <ValidationMessage For="@(() => person.Height)"></ValidationMessage>
    </p>
    <p class="birthday">
        Birthday: <TelerikDateInput @bind-Value="person.Birthday" Format="dd MMMM yyyy"></TelerikDateInput>
        <ValidationMessage For="@(() => person.Birthday)"></ValidationMessage>
    </p>
    <p class="favorite-day">
        Favorite date: <TelerikDatePicker @bind-Value="person.FavoriteDay" Format="dd MMMM yyyy"></TelerikDatePicker>
        <ValidationMessage For="@(() => person.FavoriteDay)"></ValidationMessage>
    </p>
    <p class="daily-scrum">
        Daily scrum: <TelerikTimePicker @bind-Value="person.DailyScrum"></TelerikTimePicker>
        <ValidationMessage For="@(() => person.DailyScrum)"></ValidationMessage>
    </p>
    <p class="start-time">
        Start time: <TelerikDateTimePicker Format="G" @bind-Value="@person.StartTime" Width="250px"></TelerikDateTimePicker>
        <ValidationMessage For="@(() => person.StartTime)"></ValidationMessage>
    </p>
    <p class="accepts-terms">
        Accepts terms: <InputCheckbox @bind-Value="person.AcceptsTerms" />
        <ValidationMessage For="@(() => person.AcceptsTerms)"></ValidationMessage>
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
}
````

## DropDownList

The DropDownList always has an item selected - the first item from its data source, the item corresponding to the `Value`, or the `DefaultItem` the developer provides. This means that for required field validation to work, the current item must have a `null` value. Alternatively, if you cannot alter the dropdownlist item model you already have, you can use range validation and set a value for the default item that is outside of the range of actual values.

>caption How to validate a dropdownlist

````CSHTML
@using System.ComponentModel.DataAnnotations // used for the model class attributes

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
	<DataAnnotationsValidator />
	<ValidationSummary />
	<p class="gender">
		Gender: <TelerikDropDownList @bind-Value="person.Gender" DefaultItem="@ddlHint"
								   Data="@genders" TextField="MyTextField" ValueField="MyValueField">
				</TelerikDropDownList>
		<ValidationMessage For="@(() => person.Gender)"></ValidationMessage>
	</p>

	<button type="submit">Submit</button>
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

	MyDdlModel ddlHint = new MyDdlModel { MyValueField = null, MyTextField = "Gender" };

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
@using System.ComponentModel.DataAnnotations @*used for the model class attributes*@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p class="team">
        Team: <TelerikComboBox @bind-Value="person.Team" Placeholder="Select team" ClearButton="true"
                                     Data="@teams" TextField="MyTextField" ValueField="MyValueField">
        </TelerikComboBox>
        <ValidationMessage For="@(() => person.Team)"></ValidationMessage>
    </p>

    <button type="submit">Submit</button>
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
@using System.ComponentModel.DataAnnotations @*used for the model class attributes*@

@*You can still use a full model, primitive types are used for brevity here*@

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p class="team">
        Team: <TelerikComboBox Data="@ExistingTeams" @bind-Value="person.Team" AllowCustom="true" ClearButton="true"></TelerikComboBox>
        <ValidationMessage For="@(() => person.Team)"></ValidationMessage>
    </p>

    <button type="submit">Submit</button>
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


## See Also

  * [Data Annotation attributes](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation)
  * [Live Demos](https://demos.telerik.com/blazor-ui)
  * [ValueChanged and Validation]({%slug value-changed-validation-model%})
