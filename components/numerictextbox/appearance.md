---
title: Appearance
page_title: NumericTextBox Appearance
description: Appearance settings of the NumericTextBox for Blazor.
slug: numerictextbox-appearance
tags: telerik,blazor,button,numerictextbox,appearance
published: True
position: 35
components: ["numerictextbox"]
---
# Appearance Settings

You can control the appearance of the NumericTextBox button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the NumericTextBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.NumericTextBox.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.NumericTextBox.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikNumericTextBox @bind-Value="@NumericValue" Size="@size"></TelerikNumericTextBox>
        </div>
    }
}

@code{
    private int NumericValue { get; set; }
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the textbox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.NumericTextBox.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

````RAZOR
@* The built-in values of the Rounded attribute.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.NumericTextBox.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikNumericTextBox @bind-Value="@NumericValue" Rounded="@rounded"></TelerikNumericTextBox>
        </div>
    }
}

@code{
    private int NumericValue { get; set; }
}
````

## FillMode

The `FillMode` controls how the TelerikNumericTextBox is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.NumericTextBox.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.NumericTextBox.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikNumericTextBox @bind-Value="@NumericValue" FillMode="@fillMode"></TelerikNumericTextBox>
        </div>
    }
}

@code{
    private int NumericValue { get; set; }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
