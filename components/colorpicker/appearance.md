---
title: Appearance
page_title: ColorPicker Appearance
description: Appearance settings of the ColorPicker for Blazor.
slug: colorpicker-appearance
tags: telerik,blazor,colorpicker,appearance
published: True
position: 65
components: ["colorpicker"]
---
# Appearance Settings

You can control the appearance of the ColorPicker by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the ColorPicker by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.ColorPicker.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.ColorPicker.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikColorPicker @bind-Value="@Color"
                                Size="@size"/>
        </div>
    }
}

@code {
    string Color { get; set; } = "rgb(40, 47, 137)";
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the ColorPicker to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ColorPicker.Rounded` class:

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
    var fields = typeof(Telerik.Blazor.ThemeConstants.ColorPicker.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikColorPicker @bind-Value="@Color"
                                Rounded="@rounded"/>
        </div>
    }
}

@code {
    string Color { get; set; } = "rgb(40, 47, 137)";
}
````

## FillMode

The `FillMode` controls how the TelerikColorPicker is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ColorPicker.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.ColorPicker.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikColorPicker @bind-Value="@Color"
                                FillMode="@fillMode"/>
        </div>
    }
}

@code {
    string Color { get; set; } = "rgb(40, 47, 137)";
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
