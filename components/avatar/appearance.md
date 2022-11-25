---
title: Appearance
page_title: Avatar Appearance
description: Appearance settings of the Avatar for Blazor.
slug: avatar-appearance
tags: telerik,blazor,avatar,appearance
published: True
position: 10
---

# Appearance Settings

You can control the appearance of the Avatar by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)
* [ThemeColor](#themecolor)
* [Bordered](#bordered)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

## Size

You can increase or decrease the size of the button by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`   |`md`|
| `Large`   |`lg`|

>caption The built-in button sizes

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikButton Size="@size">@size</TelerikButton>
        </div>
    }
}
````

## Rounded

The `Rounded` parameter applies the `border-radius` CSS rule to the button to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

````CSHTML
@* The built-in rounded edges of the button.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikButton Rounded="@rounded">@rounded</TelerikButton>
        </div>
    }
}
````

## FillMode

The `FillMode` controls how the TelerikButton is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|
|`Link`|`link`|

>caption The built-in Fill modes

````CSHTML
@* These are all built-in fill modes *@

@{ 
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillmode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikButton FillMode="@fillmode">@fillmode</TelerikButton>
        </div>
    }
}
````

## ThemeColor

The color of the button is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.ThemeColor` class:

| Class members | Manual declarations |
|------------|--------|
|`Base` <br /> default value |`base`|
|`Primary`|`primary`|
|`Secondary`|`secondary`|
|`Tertiary`|`tertiary`|
|`Info`|`info`|
|`Success`|`success`|
|`Warning`|`warning`|
|`Error`|`error`|
|`Dark`|`dark`|
|`Light`|`light`|
|`Inverse`|`inverse`|


>caption The built-in ThemeColors

````CSHTML
@* The built-in button colors *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.ThemeColor)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string themeColor = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikToggleButton ThemeColor="@themeColor">@themeColor</TelerikToggleButton>
        </div>
    }
}
````

## Bordered

...


## See Also

  * [Live Demo: Avatar](https://demos.telerik.com/blazor-ui/avatar/overview)