---
title: Overview
page_title: Date Picker for Blazor Overview
description: Overview of the Date Picker for Blazor
slug: components/datepicker/overview
tags: telerik,blazor,date,picker,datepicker,overview
published: True
position: 0
---

# Date Picker Overview

The Date Picker component allows the user to choose a date from a visual list (calendar). You can control the min and max date the user can select.

To use a Telerik Date Picker for Blazor:

1. @[template](/_contentTemplates/common/js-interop-file.md#add-blazor-js-file-to-list)

1. add the `TelerikDatePicker` tag

>caption Basic date picker with its key features, and ValueChanged event handling

@[template](/_contentTemplates/common/issues-and-warnings.md#generic-component-event-issue)

````CSHTML
@using Telerik.Blazor.Components.DatePicker

<TelerikDatePicker Min="@Min" Max="@Max" ValueChanged="@ValueChanged"></TelerikDatePicker>

<br />The selected date is: @selectedDate?.ToShortDateString()

@functions  {
    public DateTime Max = new DateTime(2050, 12, 31);
    public DateTime Min = new DateTime(1950, 1, 1);
    private DateTime? selectedDate;

    protected void ValueChanged(DateTime newValue)
    {
        selectedDate = newValue;
    }
}
````

The Date Picker is a generic component and takes its type from the value the developer provides. This is reflected in the way a reference is obtained.

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.DatePicker

	<TelerikDatePicker ref="@theDatePicker" bind-Value-ValueChanged="@datePickerValue"></TelerikDateInput>

	@functions {
		Telerik.Blazor.Components.DatePicker.TelerikDatePicker<DateTime> theDatePicker;

		DateTime datePickerValue { get; set; } = DateTime.Now;
	}
````

The date picker is, essentially a [date input]({%slug components/dateinput/overview%}) and a [calendar]({%slug components/calendar/overview%}) and the properties it exposes are mapped to the corresponding properties of these two components. You can read more about their behavior in the respective articles.

The following features are specific to the date picker component:

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TODO


>caption Example of using validation to prompt the user for certain input

````CSHTML
@using Telerik.Blazor.Components.DateInput
@using System.ComponentModel.DataAnnotations

<EditForm Model="@person">
	<DataAnnotationsValidator />
	<ValidationSummary />
	<TelerikDateInput bind-Value="@person.Birthday" ParsingErrorMessage="plase enter a full date like 29 March 2019"
					Format="dd MMMM yyyy" Placeholder="Enter date like 29 March 2019">
	</TelerikDateInput>
	<ValidationMessage For="@(() => person.Birthday)"></ValidationMessage>
	<button type="submit">submit</button>
</EditForm>

@functions{
	//in a real case, the model will usually be in a separate file
	public class Person
	{
		[Required]
        [Range(typeof(DateTime), "1/1/1900", "1/12/2000",
            ErrorMessage = "Value for {0} must be between {1:dd MMM yyyy} and {2:dd MMM yyyy}")]
        public DateTime? Birthday { get; set; }
	}

	Person person = new Person();
}
````

## See Also

  * [Live Demo: Date Input](https://demos.telerik.com/blazor/datepicker/index)
  * [Input Validation]({%slug common-features/input-validation%})