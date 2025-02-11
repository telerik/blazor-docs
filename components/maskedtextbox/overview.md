---
title: Overview
page_title: Masked Textbox Overview
description: Overview of the Masked Textbox for Blazor.
slug: maskedtextbox-overview
tags: telerik,blazor,masked,maskedtextbox,overview
published: True
position: 0
---

# Blazor MaskedTextbox Overview

The <a href = "https://www.telerik.com/blazor-ui/maskedtextbox" target="_blank">Blazor MaskedTextbox component</a> provides a mask and prompts the user to enter the data in the required format. The component prevents input that does not match the mask. Use it to show the user the required format for values like phone numbers, credit card numbers, ZIP codes, IP addresses, percentage values, and so on.

You can also add standard attributes such as custom CSS classes, `name`, `placeholder`, `tabindex`, and [more](#maskedtextbox-parameters), and also respond to [events](slug:maskedtextbox-events).

## Creating Blazor MaskedTextBox

1. Add the `<TelerikMaskedTextBox>` tag to your razor page.
1. Set its `Value` parameter to a `string`. The parameter supports two-way binding.
1. Set the desired [`Mask`](slug:maskedtextbox-mask-prompt) to prompt the user.

>caption Basic MaskedTextBox with two-way Value binding and a credit card mask

````RAZOR
<TelerikMaskedTextBox @bind-Value="@MaskedValue"
                      Mask="0000-0000-0000-0000"
                      Width="300px" />

<br /><br />
The component value is: @MaskedValue

@code{
    private string MaskedValue { get; set; }
}
````

@[template](/_contentTemplates/common/inputs.md#adornments)

## Validation

You can validate the content of the `TelerikMaskedTextBox` using the Data Annotation attributes. [See the Input Validation article for an example on how to validate the content of the MaskedTextBox](slug:common-features/input-validation#maskedtextbox).

## Events

The [MaskedTextBox component fires events for value changes and blur](slug:maskedtextbox-events). Use them to respond to user actions.

## Mask-Related Parameters

The table below provides a quick overview of the mask-related parameters. See the [Mask and Prompt article](slug:maskedtextbox-mask-prompt) for additional details.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|---|---|---|
| `IncludeLiterals` | `bool` | Controls if the literal characters from the mask are included in the `Value`. These are the characters that don't carry a special meaning such as brackets or dashes. |
| `Mask` | `string` | The mask (pattern) that the user has to follow. |
| `MaskOnFocus` | `bool` | Controls if the mask appears only while the input is focused. When `true` and no value is set, the user sees the [FloatingLabel](slug:floatinglabel-overview) or `Placeholder` instead of the mask. When a value is set, the user sees both the mask and value. |
| `Prompt` | `char` <br /> (`_`) | The character that will show in the mask where there is no user input already. |
| `PromptPlaceholder` | `char?` <br /> (` ` space) | The character that is added to the raw `Value` for places where there is no user input yet. |

## MaskedTextBox Parameters

See the [MaskedTextBox API Reference](slug:Telerik.Blazor.Components.TelerikMaskedTextBox) for a full list of parameters, methods and events.

| Parameter | Type and Default value | Description |
|---|---|---|
| `AriaDescribedBy` | `string` | The [`aria-describedby` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) of the `input`. |
| `AriaLabel` | `string` | The [`aria-label` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) of the `input`. |
| `AriaLabelledBy` | `string` | The [`aria-labelledby` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) of the `input`. |
| `AutoCapitalize` | `string` | A `string` that maps to the [`autocapitalize`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize) attribute of the HTML element. It's applicable only for touch devices and virtual keyboards. |
| `DebounceDelay` | `int` <br /> (`150`) | The time in milliseconds between the last typed symbol and the value update. |
| `Enabled` | `bool` <br /> (`true`) | Controls if users can type in the component. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `Id` | `string` | The `id` attribute of the `input`. |
| `InputMode` | `string` | The [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the `<input />` element. |
| `Name` | `string` | The `name` attribute of the `input`. |
| `Placeholder` | `string` | The `placeholder` attribute of the HTML element. |
| `ShowClearButton` | `bool` | Defines if the user can clear the component value through an **x** button rendered inside the input. |
| `SpellCheck` | `string` | A `string` that maps to the [`spellcheck`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck) attribute of the HTML element. Use it to disable browser spellchecking if it's intrusive to the user or due to [privacy and security concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck#security_and_privacy_concerns). |
| `TabIndex` | `int` | The `tabindex` attribute of the `input`. |
| `Title` | `string` | The `title` attribute of `input`. Use it to add a [Blazor Tooltip](slug:tooltip-overview). |
| `ValidateOn` | `ValidationEvent` enum <br /> (`Input`) | The event that will trigger validation (if validation is enabled). See [Validation Modes for Simple Inputs](slug:common-features/input-validation#validation-modes-for-simple-inputs). |
| `Value` | `string` | The value of the component. Supports two-way binding. |

### Styling and Appearance

The following parameters enable you to customize the [appearance](slug:maskedtextbox-appearance) of the Blazor MaskedTextBox:

| Parameter | Type and Default value | Description |
|---|---|---|
| `Class` | `string` | The custom CSS class of the `<span class="k-maskedtextbox">` element. |
| `Width` | `string` | The component width. |

>tip To learn more about the appearance, anatomy, and accessibility of the MaskedTextBox, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/maskedtextbox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## MaskedTextBox Reference and Methods

The MaskedTextBox proves a `FocusAsync` method that enables programmatic focus. To use it, obtain a reference to the component instance through `#ref`. @[template](/_contentTemplates/common/inputs.md#focus-kb)

````RAZOR
<TelerikButton OnClick="@FocusTextBox">Focus TextBox</TelerikButton>

<TelerikMaskedTextBox @ref="@MaskedTextBoxRef"
                      @bind-Value="@MaskedValue"
                      Mask="0000-0000-0000-0000"
                      Width="300px" />

@code{
    private TelerikMaskedTextBox MaskedTextBoxRef { get; set; }

    private string MaskedValue { get; set; }

    private async Task FocusTextBox()
    {
        await MaskedTextBoxRef.FocusAsync();
    }
}
````

## Mask Examples

The examples below demonstrates how to create a few [masks](slug:maskedtextbox-mask-prompt) for commonly used input types:

* **phone** - Utilizes literals (the brackets and the plus sign for the country code; and dashes for readability) and rules for numbers.

* **credit card** - Utilizes rules for the numbers and literals for the dashes.

* **SSN** - Same as credit card.

* **UK post code** - Uses rules for letters and numbers.

* **ZIP code** - Uses rules for numbers.

* **ZIP+4 code** - Literal for the dash between the rules for numbers.

* **percentage** - Rules for numbers with a literal for the decimal separator taken from the current culture and a literal for the percentage sign. The example also shows how you can parse that to a `double` value.

* **customized mask** - An example of mixing literals and rules to require an invoice number that has a certain portion of symbols that are not up to the user. Also shows how to escape characters that are rules so they act like literals.

>caption Phone, credit card, SSN, UK post code, ZIP code, ZIP+4 code masks

````RAZOR
@* type in the inputs to see the result. Depending on what you want to get, you may want to set IncludeLiterals=tru like for the percentage example at the end *@

<div style="white-space:pre;">
    @Phone
    @CardNumber
    @SSN
    @ZipCode
    @ZipPlus4Code
</div>

<TelerikMaskedTextBox Mask="(+999) 000-0000" @bind-Value="@Phone"></TelerikMaskedTextBox><br />
<TelerikMaskedTextBox Mask="0000-0000-0000-0000" @bind-Value="@CardNumber"></TelerikMaskedTextBox><br />
<TelerikMaskedTextBox Mask="000-00-0000" @bind-Value="@SSN"></TelerikMaskedTextBox><br />
<TelerikMaskedTextBox Mask="L0L 0LL" @bind-Value="@UkPostcode"></TelerikMaskedTextBox><br />
<TelerikMaskedTextBox Mask="00000" @bind-Value="@ZipCode"></TelerikMaskedTextBox><br />
<TelerikMaskedTextBox Mask="00000-0000" @bind-Value="@ZipPlus4Code"></TelerikMaskedTextBox><br />

@code{
    string Phone { get; set; }
    string CardNumber { get; set; }
    string SSN { get; set; }
    string UkPostcode { get; set; }
    string ZipCode { get; set; }
    string ZipPlus4Code { get; set; }
}
````

>caption One way to get percentage input and values

````RAZOR
@* See the method that parses the string into the desired numerical value - you can customize that as needed by your app *@

<div style="white-space:pre;">
    @RawPercentage
    @ActualPercentage
</div>

<TelerikMaskedTextBox Mask="@PercentageMask"
                      IncludeLiterals="true"
                      PromptPlaceholder="null"
                      @bind-Value="@RawPercentage">
</TelerikMaskedTextBox>

@code{
    string PercentageMask { get; set; } = $"00{System.Globalization.CultureInfo.CurrentCulture.NumberFormat.NumberDecimalSeparator}00%";
    string RawPercentage { get; set; }
    double? ActualPercentage => ParsePercentage();

    //note: this parses the value exactly and will result in numbers that can be between 0 and 100
    //and not like .NET usually treats percents as a value between 0 and 1
    //you can implement any preferred logic
    double? ParsePercentage()
    {
        if (string.IsNullOrEmpty(RawPercentage))
        {
            return null;
        }
        string trimmedValue = RawPercentage?.Replace("%", "").Replace(" ", "");
        double result;
        if(double.TryParse(trimmedValue, out result))
        {
            return result;
        }
        return null;
    }
}
````

>caption Custom mask that presets literals for the user

````RAZOR
@* This example requires an invoice number that starts with a letter, has a second character that is a letter or a number, then a dash, then has the numbers "900" and four more numbers. For example A4-900123 *@

@invoiceNumber

<TelerikMaskedTextBox Mask="LA-\9\0\00000" @bind-Value="@invoiceNumber" IncludeLiterals="true"></TelerikMaskedTextBox>

@code{
    string invoiceNumber { get; set; }
}
````

## Next Steps

* [Configure the MaskedTextBox mask](slug:maskedtextbox-mask-prompt)
* [Explore the MaskedTextBox behavior when pasting content](slug:maskedtextbox-paste)
* [Handle MaskedTextBox events](slug:maskedtextbox-events)

## See Also

* [Live Demo: MaskedTextbox](https://demos.telerik.com/blazor-ui/maskedtextbox/overview)
* [Live Demo: MaskedTextbox Validation](https://demos.telerik.com/blazor-ui/maskedtextbox/validation)
* [Add Floating Label](slug:inputs-kb-floating-label)
* [MaskedTextBox API Reference](slug:Telerik.Blazor.Components.TelerikMaskedTextBox)
