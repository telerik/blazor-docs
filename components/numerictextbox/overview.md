---
title: Overview
page_title: Numeric Textbox Overview
description: Overview of the Numeric Textbox for Blazor.
slug: components/numerictextbox/overview
tags: telerik,blazor,numeric textbox,overview
published: True
position: 0
---

# Blazor Numeric TextBox Overview

The <a href="https://www.telerik.com/blazor-ui/numeric-textbox" target="_blank">Blazor Numeric Textbox component</a> allows the user to enter decimal values and no text. The developer can control minimum, maximum values, steps and other elements of the UX.

## Creating Blazor Numeric TextBox

1. Add the `TelerikNumericTextBox` tag to your razor page.
1. Bind a numeric data type to the component
1. Optionally, set custom `Format`, `Min`, `Max` and `Step` values

>caption Basic numeric text box with its key features

````RAZOR
The new value is: @theValue

<TelerikNumericTextBox Format="C" Max="5m" Min="-5m" Step="0.33m" @bind-Value="@theValue"></TelerikNumericTextBox>

@code {
     private decimal theValue { get; set; } = 1.234m;
}
````

The Numeric TextBox component is generic, meaning that it takes the type of its value parameter as an argument. It can take `int`, `long`, `float`, `double` and `decimal` values. Therefore, the values for the `Min`, `Max` and `Step` properties must be of the same type as the `Value`, and the `ValueChanged` handler must also accommodate the corresponding value type.

@[template](/_contentTemplates/common/inputs.md#adornments)

## Events

The Blazor Numeric TextBox generates events that you can handle and further customize its behavior. [Read more about the Blazor Numeric TextBox events...](slug://components/numerictextbox/events).

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...](slug://common-features/input-validation).

## Custom Format Strings

The Blazor Numeric TextBox allows you to define your desired custom format through the `Format` parameter, for example:

>caption Using custom format strings with the Blazor Numeric TextBox

````RAZOR
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

## Numeric TextBox Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Arrows` | `bool` <br /> (`true`) | Controls the display of the up/down spinner arrows (buttons). |
| `Autocomplete` | `string` | The [`autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) on the `<input />` element. |
| `DebounceDelay` | `int` <br /> (`150`) | The time in milliseconds between the last typed symbol and the value update. Use it to balance between client-side performance and number of database queries. |
| `Decimals` | `int` | The number of allowed decimal places during typing. Takes effect only while the input is focused. The default value depends on the culture. |
| `Format` | `string` | The number format when the input is not focused. Read more at [Standard Numeric Format Strings in .NET](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) |
| `Id` | `string` | The `id` attribute on the `<input />` element. |
| `InputMode` | `string` | The [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the `<input />` element. |
| `Max` | `TValue`* <br /> (`T.MaxValue`) | The maximum value the input can accept. Must match the `Value` type. |
| `Min` | `TValue`* <br /> (`T.MinValue`) | The minimum value the input can accept. Must match the `Value` type. |
| `Placeholder` | `string` | The `placeholder` attribute of the HTML element. The placeholder will appear if the component is bound to a **nullable** value type and there is no value set. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `SelectOnFocus` | `bool` | When set to `true`, the NumericTextBox will select its value when the component receives focus. |
| `ShowClearButton` | `bool` | Defines if the user can clear the component value through an **x** button rendered inside the input. |
| `Step` | `TValue`* <br /> (`1`) | The decimal value with which the component value changes when using the arrows. Must match the `Value` type. |
| `TabIndex` | `int?` | The `tabindex` attribute of the `<input />` element. Use it to customize the tabbing order on your page. |
| `ValidateOn` | `ValidationEvent` enum <br/> (`Input`) | The event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs](slug://common-features/input-validation#validation-modes-for-simple-inputs). |
| `Value` | `TValue`* | The component value. |

\* `TValue` can be [any numeric type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types), except `nint` and `nuint`. Note that all `TValue` parameters must be of the same type.

### Styling and Appearance

The following parameters enable you to customize the [appearance](slug://numerictextbox-appearance) of the Blazor Numeric TextBox:

| Attribute | Type and Default Value | Description |
| --- | --- | --- |
| `Class` | `string` | The CSS class that will be rendered on the `<span class="k-numerictextbox">` element. |
| `Width` | `string` | The width of the component in [any supported CSS unit](slug://common-features/dimensions). |

>tip To learn more about the appearance, anatomy, and accessibility of the Numeric TextBox, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/numerictextbox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Numeric TextBox Reference and Methods

The Numeric TextBox has a `FocusAsync` method that enables programmatic focus. To use it, obtain a reference to the component instance through `@ref`. @[template](/_contentTemplates/common/inputs.md#focus-kb)

````RAZOR
<TelerikButton OnClick="@FocusTextBox">Focus TextBox</TelerikButton>

<TelerikNumericTextBox @ref="@NumericTextBoxRef"
                       @bind-Value="DecimalValue"
                       Width="200px" />

@code {
    //determines the type of the component
    private decimal DecimalValue { get; set; }

    //the Value type determines the type of the reference
    private TelerikNumericTextBox<decimal> NumericTextBoxRef { get; set; }

    async Task FocusTextBox()
    {
        await NumericTextBoxRef.FocusAsync();
    }
}
````

## Notes

* If you want to use a currency format, you must specify the culture for your app thread, so .NET knows what symbol to render. If you don't do that, you may see an unexpected/incorrect symbol or format. The Telerik Numeric Textbox uses the thread culture for currency signs and decimal separators (more on [globalization in the Telerik components](slug://globalization-overview)).

* You may want to match the decimal places available in the `Format` and in the `Decimals` parameters. This will unify the rounding of the numbers when the input is focused and when it is not. For example, if you start with a value `12.3m` and `Step=0.1m` it will render as `12.3` due to the `Math.Round()` behavior in .NET. Changing the value with the spinner icons up and then down will result in `12.30` because the value had had a second decimal digit at some point and that precision is added to the number already.

    Here is an example of matching the decimal places:

````RAZOR.skip-repl
        @DecimalStepValue.ToString("N2") <br />
        
        <TelerikNumericTextBox @bind-Value=@DecimalStepValue 
                               Step="0.01m" 
                               Decimals="2" 
                               Format="N2">
        </TelerikNumericTextBox>
        
        @code {
            decimal DecimalValue = 12.3m;
        }
````

## Next Steps

* [Using the Numeric Textbox Events](slug://components/numerictextbox/events)


## See Also

* [Live Demo: Numeric Textbox](https://demos.telerik.com/blazor-ui/numerictextbox/overview)
* [Live Demo: Numeric Textbox Validation](https://demos.telerik.com/blazor-ui/numerictextbox/validation)
* [Live Demo: Numeric Textbox Formats](https://demos.telerik.com/blazor-ui/numerictextbox/formats)
* [Input Validation](slug://common-features/input-validation)
* [NumericTextBox API Reference](slug://Telerik.Blazor.Components.TelerikNumericTextBox-1)
