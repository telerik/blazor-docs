---
title: Overview
page_title: Numeric Textbox Overview
description: Overview of the Numeric Textbox for Blazor.
slug: components/numerictextbox/overview
tags: telerik,blazor,numeric textbox,overview
published: True
position: 0
---

# Numeric Textbox Overview

The <a href="https://www.telerik.com/blazor-ui/numeric-textbox" target="_blank">Blazor Numeric Textbox component</a> allows the user to enter decimal values and no text. The developer can control minimum, maximum values, steps and other elements of the UX.

#### To use a Telerik Numeric Textbox for Blazor, add the `TelerikNumericTextBox` tag.

>caption Basic numeric textbox with its key features

````CSHTML
The new value is: @theValue

<TelerikNumericTextBox Format="C" Max="5m" Min="-5m" Step="0.33m" @bind-Value="@theValue"></TelerikNumericTextBox>

@code {
     private decimal theValue { get; set; } = 1.234m;
}
````

The numeric textbox component is generic, meaning that it takes the type of its value parameter as an argument. It can take `int`, `long`, `float`, `double` and `decimal` values. Therefore, the values for the `Min`, `Max` and `Step` properties must be of the same type as the `Value`, and the `ValueChanged` handler must also accommodate the corresponding value type.

>caption Component namespace and reference

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

The numeric textbox provides the following features:

* `Arrows` - whether the up/down spinner arrows (buttons) will be shown. Defaults to `true`.
* `Decimals` - how many decimal places will be allowed while the user is typing a new value. Takes effect only while the input is focused.
* `Format` - the format with which the number is presented when the input is not focused. Read more in the [Standard Numeric Format Strings in .NET](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) article.
* `Id` - renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.
* `Max` - the maximum decimal value the input can take. Must be of the same type as the `Value`.
* `Min` - the minimum decimal value the input can take. Must be of the same type as the `Value`.
* `Step` - the decimal value of the step with which the value changes when the arrows are used. Must be of the same type as the `Value`.
* `Value` - to get/set the value of the input.
* `Width` - the width of the `input`. See the [Dimensions]({%slug common-features/dimensions%}) article.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article.

>caption Example of using a custom format string

````CSHTML
<TelerikNumericTextBox Format="#.00 kg" Max="5m" Min="-5m" Step="0.33m" Value="3.456789m"></TelerikNumericTextBox>
````




>note If you want to use a currency format, you must specify the `CurrentThread.CurrentCulture`, so .NET knows what symbol to render. If you don't do that, you may see an unexpected/incorrect symbol or format.



## See Also

  * [Live Demo: Numeric Textbox](https://demos.telerik.com/blazor-ui/numerictextbox/index)
  * [Live Demo: Numeric Textbox Validation](https://demos.telerik.com/blazor-ui/numerictextbox/validation)
  [Live Demo: Numeric Textbox Formats](https://demos.telerik.com/blazor-ui/numerictextbox/formats)
  * [Input Validation]({%slug common-features/input-validation%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikNumericTextBox-1)
