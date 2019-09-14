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

To use a Telerik Date Input for Blazor, add the `TelerikDateInput` tag.

>caption Basic date input with namespace and reference

````CSHTML
@dateInputValue

<TelerikDateInput @bind-Value="@dateInputValue" Format="dd/MMMM/yyyy" @ref="theDateInput">
</TelerikDateInput>

@code {
    DateTime dateInputValue { get; set; } = DateTime.Now;

    Telerik.Blazor.Components.TelerikDateInput<DateTime> theDateInput;
    // the type of the component depends on the type of the value
    // in this case it is DateTime, but it could be DateTime?
}
````

>caption The date input provides the following features:

* `Class` - the CSS class that will be rendered on the `input` element.
* `Enabled` - whether the `input` is enabled.
* `Format` - the date format that the user input must match. Read more in the [Supported Formats]({%slug components/dateinput/supported-formats%}) article.
* `ParsingErrorMessage` - a hint that is displayed to the user through validation when their input cannot be parsed in the required format
* `Value` - get/set the value of the input, can be used for binding.
* `Width` - the width of the `input`. See the [Dimensions]({%slug common-features/dimensions%}) article.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.

>caption The behavior of the component will depend on the type of field it is bound to, and this can result in different user experience and values that it will output:

##### Bound to a Nullabe DateTime

* When value is `null` - the `Format` is displayed as a placeholder.
* When modifying a part, if some parts are not defined, the value remains `null`.
* When all values are provided, the value changes.
* Upon deleting any part, the whole value changes to `null`, and all input returns to the format placeholder.
* When inside an `EditForm`, if no attributes are present on the field, and the value is deleted, no validation error is shown.



##### Bound to a Non-Nullabe DateTime

* When the value is undefined, it defaults to `0001-01-01`, so the component has it as a value.
* When modifying a part, if some parts are not defined, the bound value does not change.
* When all values are provided, the value changes.
* Upon deleting any part, only that part switches to the format placeholder.
* When inside an `EditForm`, if no attributes are present on the field, and the value is deleted, a validation error is shown.





>caption Example of using validation to prompt the user for certain input

````CSHTML
@using System.ComponentModel.DataAnnotations

<EditForm Model="@person">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <TelerikDateInput @bind-Value="person.Birthday" ParsingErrorMessage="plase enter a full date like 29 March 2019" Format="dd/MMMM/yyyy">
    </TelerikDateInput>
    <ValidationMessage For="@(() => person.Birthday)"></ValidationMessage>
    <button type="submit">submit</button>
</EditForm>

@code{
    //in a real case, the model will usually be in a separate file
    public class Person
    {
        [Required]
        [Range(typeof(DateTime), "1/1/1900", "1/12/2000",
            ErrorMessage = "Value for {0} must be between {1:dd MMM yyyy} and {2:dd MMM yyyy}")]
        public DateTime Birthday { get; set; }
    }

    Person person = new Person();
}
````

## See Also

  * [Live Demo: Date Input](https://demos.telerik.com/blazor-ui/dateinput/index)
  * [Input Validation]({%slug common-features/input-validation%})
  * [Supported Date Formats]({%slug components/dateinput/supported-formats%})
