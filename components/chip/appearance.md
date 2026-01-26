---
title: Appearance
page_title: Chip - Appearance
description: Appearance settings of the Chip for Blazor.
slug: chip-appearance
tags: telerik,blazor,chip,appearance
published: True
position: 10
components: ["chip"]
---
# Chip Appearance

You can control the appearance of the Chip by using the following parameters:

* [`FillMode`](#fillmode)
* [`Rounded`](#rounded)
* [`Size`](#size)
* [`ThemeColor`](#themecolor)

## FillMode

The `FillMode` affects the presence of a background and borders. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Chip.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillmode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikChip @bind-Selected="@IsChipSelected"
                 FillMode="@fillmode"
                 Text="Audio">
            </TelerikChip>
        </div>
    }
}

@code {
    private bool IsChipSelected { get; set; }
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the Chip to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.Rounded` class:

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in values of the Rounded attribute

````RAZOR
@* The built-in values of the Rounded attribute.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Chip.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikChip @bind-Selected="@IsChipSelected"
                 Rounded="@rounded"
                 Text="Audio">
            </TelerikChip>
        </div>
    }
}

@code {
    private bool IsChipSelected { get; set; }
}
````

## Size

You can increase or decrease the size of the Chip by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.Chip.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Chip.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikChip @bind-Selected="@IsChipSelected"
                 Size="@size"
                 Text="Audio">
            </TelerikChip>
        </div>
    }
}

@code {
    private bool IsChipSelected { get; set; }
}
````

## ThemeColor

The `ThemeColor` parameter applies a predefined text color and background color. Use a member of the `Telerik.Blazor.ThemeConstants.Chip.ThemeColor` class:

| Class members | Manual declarations |
|------------|--------|
|`Base` <br /> default value |`base`|
|`Info`|`info`|
|`Success`|`success`|
|`Warning`|`warning`|
|`Error`|`error`|

>caption The built-in ThemeColors

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Chip.ThemeColor)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string themeColor = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikChip @bind-Selected="@IsChipSelected"
                 ThemeColor="@themeColor"
                 Text="@themeColor">
            </TelerikChip>
        </div>
    }
}

@code {
    private bool IsChipSelected { get; set; }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Handle Chip events](slug:chip-events)

## See Also

* [Live Demo: Chip Appearance](https://demos.telerik.com/blazor-ui/chip/appearance)
