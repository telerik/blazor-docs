---
title: Appearance
page_title: Signature Appearance
description: Appearance settings of the Signature for Blazor.
slug: signature-appearance
tags: telerik,blazor,signature,appearance
published: True
position: 5
components: ["signature"]
---
# Signature Settings

You can control the appearance of the Signature component by using the following parameters:

* [BackgroundColor](#backgroundcolor)
* [Color](#color)
* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

## BackgroundColor

Use the `BackgroundColor` parameter to change the background color of the Blazor Signature. 

>caption Change the background color of the Signature

````RAZOR
@* Provide a valid CSS color for the background color of the Signature *@
@* This example sets red with HEX code *@

<TelerikSignature @bind-Value="@SignatureValue" Width="300px" Height="300px" BackgroundColor="#FF0000">
</TelerikSignature>

@code {
    private string SignatureValue { get; set; }
}
````

## Color

Use the `Color` parameter to change the color of the Signature's stroke. 

>caption Change the color of the stroke

````RAZOR
@* Provide a valid CSS color for the background color of the Signature *@
@* This example sets red with the plain text color name *@

<TelerikSignature @bind-Value="@SignatureValue" Width="300px" Height="300px" Color="red" DebounceDelay="400">
</TelerikSignature>

@code {
    private string SignatureValue { get; set; }
}
````

## FillMode

The `FillMode` parameter controls how the TelerikSignature is filled. It takes a member of the `Telerik.Blazor.ThemeConstants.Signature.FillMode` static class:

| Class members | Manual declarations |
|------------|--------|
| `Solid` <br /> (`default value`) | `solid` |
| `Flat` | `flat` |
| `Outline` | `outline` |

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Signature.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillmode = field.GetValue(null).ToString();

        <div style="display: inline-block; margin: 20px;">
            @fillmode        
            <TelerikSignature @bind-Value="@SignatureValue"
                      Width="300px"
                      Height="300px"
                      FillMode="@fillmode">
            </TelerikSignature>
        </div>
    }
}

@code {
    private string SignatureValue { get; set; }
}
````

## Rounded

The Rounded parameter applies the `border-radius` CSS style to the button to achieve curving of the edges. It takes a member of the `Telerik.Blazor.ThemeConstants.Signature.FillMode` static class:

| Class members | Manual declarations |
|------------|--------|
| `Small`  | `sm` |
| `Medium` <br /> (`default value`) | `md` |
| `Large` | `lg` |

>caption The built-in values of the Rounded attribute

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Signature.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="display: inline-block; margin: 20px;">
            <TelerikSignature @bind-Value="@SignatureValue"
                      Width="300px"
                      Height="300px"
                      Rounded="@rounded">
            </TelerikSignature>
        </div>
    }
}

@code {
    private string SignatureValue { get; set; }
}
````


## Size

Use the `Size` parameter to apply the `min-height` CSS style to the `<div class="k-signature">` element. Set the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Signature.Size` static class:

| Class members | Manual declarations |
|------------|--------|
| `Small`  | `sm` |
| `Medium` <br /> (`default value`) | `md` |
| `Large` | `lg` |

>caption Set the Size parameter

````RAZOR
<TelerikSignature @bind-Value="@SignatureValue"
                  Width="300px"
                  Height="300px"
                  Size="@Telerik.Blazor.ThemeConstants.Signature.Size.Large">
</TelerikSignature>

@code {
    private string SignatureValue { get; set; }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Signature Overview](slug:signature-overview)
* [Live Demo: Signature Overview](https://demos.telerik.com/blazor-ui/signature/overview)
