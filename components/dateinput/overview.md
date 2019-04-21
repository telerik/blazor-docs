---
title: Overview
page_title: Date Input for Blazor Overview
description: Overview of the Date Input for Blazor
slug: components/dateinput/overview
tags: telerik,blazor,date,input,dateinput,overview
published: True
position: 0
---

# Date Input Overview

The Date Input component allows the user to enter a date. The developer can control the format of the date. If the user input does not match the desired pattern, the value is not accepted. If the input can be parsed, it will be corrected automatically.

To use a Telerik Date Input for Blazor:

1. @[template](/_contentTemplates/common/js-interop-file.md#add-blazor-js-file-to-list)

1. add the `TelerikDateInput` tag

>caption Basic date input with its key features, and ValueChanged event handling

@[template](/_contentTemplates/common/issues-and-warnings.md#generic-component-event-issue)

````CSHTML
@using Telerik.Blazor.Components.DateInput

<TelerikDateInput bind-Value="@dateInputValue" ValueChanged="@MyValueChangeHandler"
				Format="dd MMMM yyyy" Placeholder="Enter date like 29 March 2019">
</TelerikDateInput>
@result

@functions {
	DateTime dateInputValue { get; set; } = DateTime.Now;
	string result;

	private void MyValueChangeHandler(DateTime theUserInput)
	{
		Console.WriteLine("entered");
		result = string.Format("The user entered: {0}", theUserInput);

		StateHasChanged();
	}
}
````

The Date Input is a generic component and takes its type from the value the developer provides. This is reflected in the way a reference is obtained.

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.DateInput

	<TelerikDateInput ref="@theDateInput" bind-Value="@dateInputValue"></TelerikDateInput>

	@functions {
		Telerik.Blazor.Components.DateInput.TelerikDateInput<DateTime> theDateInput;

		DateTime dateInputValue { get; set; } = DateTime.Now;
	}
````

The date input provides the following features:

* `Class` - the CSS class that will be rendered on the `input` element.
* `Enabled` - whether the `input` is enabled.
* `Format` - the date format that the user input must match.
*  `Max` - the maximum date the user can enter. Defaults to 31 Dec 2099.
*  `Min` - the minimum date the user can enter. Defaults to 1 Jan 1900.
* `ParsingErrorMessage` - a hint that is displayed to the user through validation when their input cannot be parsed in the required format
* `Placeholder` - the `placeholder` attribute rendered on the `input` element that serves as a hint when there is no value in the input.
* `Value` - get/set the value of the input, can be used for binding.
* `Width` - the width of the `input` in pixels.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.


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

  * [Live Demo: Date Input](https://demos.telerik.com/blazor/dateinput/index)
  * [Input Validation]({%slug common-features/input-validation%})