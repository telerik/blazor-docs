---
title: Overview
page_title: Textbox for Blazor Overview
description: Overview of the Textbox for Blazor
slug: components/textbox/overview
tags: telerik,blazor,textbox,overview
published: True
position: 0
---

# Textbox Overview

The Textbox component allows the user to enter a generic plain text message. The developer can control minimum, maximum length of the text, pattern, and other elements of the UX such as label or class.

To use a Telerik Textbox for Blazor, add the `TelerikTextBox` tag.

>caption Basic textbox with its key features, and ValueChanged event handling

@[template](/_contentTemplates/common/issues-and-warnings.md#generic-component-event-issue)

````CSHTML
@using Telerik.Blazor.Components.TextBox

<TelerikTextBox ValueChanged="@MyValueChangeHandler" bind-Value="@theTbValue"
			  Label="Enter Information" Id="myInputId" MaxLength="20"></TelerikTextBox>

@result

@functions {
	string result;
	string theTbValue { get; set; } = "lorem ipsum";

	private void MyValueChangeHandler(string theUserInput)
	{
		result = string.Format("The user entered: {0}", theUserInput);

		StateHasChanged();
	}
}
````

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.TextBox

<TelerikTextBox ref="@theTextBoxRef"></TelerikTextBox>

@functions {
    Telerik.Blazor.Components.TextBox.TelerikTextBox theTextBoxRef;
}
````

The numeric textbox provides the following features:

* `Class` - the CSS class that will be rendered on the `input` element.
* `Enabled` - whether the `input` is enabled.
* `Label` - the `label` element rendered next to the `input` to provide the user with information on its purpose.
* `MaxLength` - the maximum length of the text input by the user.
* `MinLength` - the minimum length of the text input by the user.
* `Pattern` - the pattern that the user input must match.
* `Value` - get/set the value of the input, can be used for binding.
* `Width` - the width of the `input`. See the [Dimensions]({%slug common-features/dimensions%}) article.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.

The length, enabled and pattern attributes are HTML attributes on the `<input />` element and it is up to the browser to honor them. For example, the `minlength` attribute is rarely taken into account, and the pattern is usually evaluated only upon form submission.

>caption Example of using a custom pattern for some credit cards

````CSHTML
@using Telerik.Blazor.Components.TextBox

<EditForm Model="@person">
	<DataAnnotationsValidator />
	<ValidationSummary />
	<TelerikTextBox bind-Value="@person.CardNumber" Pattern="[0-9]{13,16}">
	</TelerikTextBox>
	<button type="submit">submit</button>
</EditForm>

@functions{
	public class Person
	{
		//you may want to add data annotation here to provide more robust validation
		//the pattern can also be moved to the regex validation
		public string CardNumber { get; set; }
	}

	Person person = new Person();
}

````

## See Also

  * [Live Demo: Textbox](https://demos.telerik.com/blazor-ui/textbox/index)
  * [Live Demo: Textbox Validation](https://demos.telerik.com/blazor-ui/textbox/validation)
  * [Input Validation]({%slug common-features/input-validation%})