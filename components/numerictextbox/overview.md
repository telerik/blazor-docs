---
title: Overview
page_title: Numeric Textbox Overview
description: Overview of the Numeric Textbox for Blazor.
slug: components/numerictextbox/overview
tags: telerik,blazor,numeric textbox,overview
published: True
position: 0
---

# Blazor Numeric Textbox Overview

The <a href="https://www.telerik.com/blazor-ui/numeric-textbox" target="_blank">Blazor Numeric Textbox component</a> allows the user to enter decimal values and no text. The developer can control minimum, maximum values, steps and other elements of the UX.

## Creating Blazor Numeric Textbox

1. Add the `TelerikNumericTextBox` tag to your razor page.
1. Bind a numeric data type to the component
1. Optionally, set custom `Format`, `Min`, `Max` and `Step` values

>caption Basic numeric textbox with its key features

````CSHTML
The new value is: @theValue

<TelerikNumericTextBox Format="C" Max="5m" Min="-5m" Step="0.33m" @bind-Value="@theValue"></TelerikNumericTextBox>

@code {
     private decimal theValue { get; set; } = 1.234m;
}
````

The Numeric TextBox component is generic, meaning that it takes the type of its value parameter as an argument. It can take `int`, `long`, `float`, `double` and `decimal` values. Therefore, the values for the `Min`, `Max` and `Step` properties must be of the same type as the `Value`, and the `ValueChanged` handler must also accommodate the corresponding value type.

## Events

The Blazor Numeric TextBox generates events that you can handle and further customize its behavior. [Read more about the Blazor Numeric TextBox events...]({%slug components/numerictextbox/events%}).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...]({%slug common-features/input-validation%}).

## Custom Format Strings

The Blazor Numeric TextBox allows you to define your desired custom format throu its `Format` parameter. Here are some examples of using custom format strings.

````CSHTML
@Weight
<br />
<TelerikNumericTextBox Format="#.00 kg" Max="5m" Min="-5m" Step="0.33m" @bind-Value="@Weight"></TelerikNumericTextBox>
<br />
@code{
    decimal Weight { get; set; } = 3.456789m;
}

@Rent
<br />
<TelerikNumericTextBox Decimals="2" Format="@RentFormat" @bind-Value="@Rent"></TelerikNumericTextBox>
<br />
@code{
    decimal Rent { get; set; } = 4567.89m;
    string RentFormat { get; set; } = System.Globalization.NumberFormatInfo.CurrentInfo.CurrencySymbol + "#.00 a year";
}

@Units
<br />
<TelerikNumericTextBox Decimals="0" Format="@UnitsFormat" @bind-Value="@Units"></TelerikNumericTextBox>

@code{
    int Units { get; set; } = 12;
    string UnitsFormat { get; set; } = "# unit(s)";
}
````

## Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|-----------|------|-------------|
|`Arrows`|`bool`<br/> Defaults to `true`|Whether the up/down spinner arrows (buttons) will be shown.|
|`Decimals`|`int`|Specifies how many decimal places will be allowed while the user is typing a new value. Takes effect only while the input is focused. The default value is set from the specified culture.|
|`Format`|`string`|The format with which the number is presented when the input is not focused. Read more in the [Standard Numeric Format Strings in .NET](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) article.|
|`Id`|`string`|renders as the `id` attribute on the `<input />` element.|
|`Max`|Numeric data type|the maximum decimal value the input can take. Must be of the same type as the `Value`.|
|`Min`|Numeric data type|The minimum decimal value the input can take. Must be of the same type as the `Value`.|
|`Placeholder`|`string`|maps to the `placeholder` attribute of the HTML element. The placeholder will appear if the component is bound to **nullable** value type and there is no value set. |
|`Step`|Numeric data type|the decimal value of the step with which the value changes when the arrows are used. Must be of the same type as the `Value`.|
|`Value`|`T` - expects numeric data type|Get/set the value of the input.|
|`TabIndex`|`int?`|maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.|
|`ValidateOn`|`ValidationEvent` enum <br/> `ValidationEvent.Input` |Configures the event that will trigger validation (if validation is enabled). Read more at [Validastion Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs).|

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Numeric TextBox:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
|`Class`| `string` |The CSS class that will be rendered on the topmost wrapping elementof teh component.|
|`Width`|`string`|the width of the component. See the [Dimensions]({%slug common-features/dimensions%}) article.|

You can find more options for customizing the Numeric TextBox styling in the [Appearance article]({%slug numerictextbox-appearance%}).

## Component Reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikNumericTextBox @ref="myNumericTextboxRef" @bind-Value="CurrentValue"></TelerikNumericTextBox>

@code {
	//determines the type of the component
	private int CurrentValue { get; set; }
	
	//the type of the value variable determines the type of the reference
	private Telerik.Blazor.Components.TelerikNumericTextBox<int> myNumericTextboxRef;
}
````

## Notes

* If you want to use a currency format, you must specify the culture for your app thread, so .NET knows what symbol to render. If you don't do that, you may see an unexpected/incorrect symbol or format. The Telerik Numeric Textbox uses the thread culture for currency signs and decimalr separators (more on [globalization in the Telerik components]({%slug globalization-overview%})).

* You may want to match the decimal places available in the `Format` and in the `Decimals` parameters. This will unify the rounding of the numbers when the input is focused and when it is not. For example, if you start with a value `12.3m` and `Step=0.1m` it will render as `12.3` due to the `Math.Round()` behavior in .NET. Changing the value with the spinner icons up and then down will result in `12.30` because the value had had a second decimal digit at some point and that precision is added to the number already.

    Here is an example of matching the decimal places:

    **Razor**

        @DecimalStepValue.ToString("N2") <br />
        
        <TelerikNumericTextBox @bind-Value=@DecimalStepValue 
                               Step="0.01m" 
                               Decimals="2" 
                               Format="N2">
        </TelerikNumericTextBox>
        
        @code {
            decimal DecimalValue = 12.3m;
        }

## Next Steps

* [Using the Numeric Textbox Events]({%slug components/numerictextbox/events%})


## See Also

  * [Live Demo: Numeric Textbox](https://demos.telerik.com/blazor-ui/numerictextbox/index)
  * [Live Demo: Numeric Textbox Validation](https://demos.telerik.com/blazor-ui/numerictextbox/validation)
  * [Live Demo: Numeric Textbox Formats](https://demos.telerik.com/blazor-ui/numerictextbox/formats)
  * [Input Validation]({%slug common-features/input-validation%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikNumericTextBox-1)
