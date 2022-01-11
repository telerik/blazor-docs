---
title: Appearance
page_title: ButtonGroup Button Appearance
description: Appearance settings of the Buttons in the ButtonGroup for Blazor.
slug: buttongroup-appearance
tags: telerik,blazor,buttongroup,button,appearance
published: True
position: 35
---

# Appearance Settings

You can control the appearance of the buttons in the `<TelerikButtonGroup>` by setting the following attributes:

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Shape](#shape)
* [Size](#size)
* [ThemeColor](#themecolor)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

## FillMode

The `FillMode` controls how the TelerikButton is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|![](images/button-fillmode-solid.png)|
|`Flat`|![](images/button-fillmode-flat.png)|
|`Outline`|![](images/button-fillmode-outline.png)|
|`Link`|![](images/button-fillmode-link.png)|

>caption The built-in Fill modes

````CSHTML
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    <TelerikButtonGroup>
        @foreach (var field in fields)
        {
            string fillmode = field.GetValue(null).ToString();
            <ButtonGroupButton FillMode="@fillmode">@fillmode</ButtonGroupButton>
        }
    </TelerikButtonGroup>
}
````

## Rounded

The `Rounded` paramter applies the `border-radiums` CSS rule to the button to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.Rounded` class:

| Class members | Result |
|------------|--------|
|`Small` |![button-rounded](images/button-rounded-small.png)|
|`Medium`|![button-rounded](images/button-rounded-medium.png)|
|`Large`|![button-rounded](images/button-rounded-large.png)|
|`Full`|![button-rounded](images/button-rounded-full.png)|

>caption The built-in values of the Rounded attribute

````CSHTML
@* The built-in rounded edges of the button.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    <TelerikButtonGroup>
        @foreach (var field in fields)
        {
            string rounded = field.GetValue(null).ToString();
            <ButtonGroupButton Rounded="@rounded">@rounded</ButtonGroupButton>
        }
    </TelerikButtonGroup>
}
````

## Shape

The `Shape` attribute defines the geometric shape of the button. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.Shape` class:

| Class members | Result |
|---------------|--------|
| `Rectangle`   |![button-rectangle](images/button-shape-rectangle.png)|
| `Square`   |![button-square](images/button-shape-square.png)|
| `Circle`   |To create a circular button you should set the `Shape` attribute to **Square**, and the `Rounded` attribute to **Full**|


>note The width and height of the geometric shapes depend on the amount of text in the button, and the size of the font.

>caption The built-in button shapes

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.Shape)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    <TelerikButtonGroup>
        @foreach (var field in fields)
        {
            string shape = field.GetValue(null).ToString();
            <ButtonGroupButton Shape="@shape">@shape</ButtonGroupButton>
        }
    </TelerikButtonGroup>
}
````

## Size

You can increase or decrease the size of the button by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.Size` class:

| Class members | Result |
|---------------|--------|
| `Small`   |![button-small](images/button-size-small.png)|
| `Medium`   |![button-medium](images/button-size-medium.png)|
| `Large`   |![button-large](images/button-size-large.png)|

>caption The built-in button sizes

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    <TelerikButtonGroup>
        @foreach (var field in fields)
        {
            string size = field.GetValue(null).ToString();
            <ButtonGroupButton Size="@size">@size</ButtonGroupButton>
        }
    </TelerikButtonGroup>
}
````

## ThemeColor

The color of the button is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.ThemeColor` class:

| Class members | Result |
|------------|--------|
|`Base` <br /> default value |![button-base](images/button-themecolor-base.png)|
|`Primary`|![button-primary](images/button-themecolor-primary.png)|
|`Secondary`|![button-secondary](images/button-themecolor-secondary.png)|
|`Tertiary`|![button-tertiary](images/button-themecolor-tertiary.png)|
|`Info`|![button-info](images/button-themecolor-info.png)|
|`Success`|![button-success](images/button-themecolor-success.png)|
|`Warning`|![button-warning](images/button-themecolor-warning.png)|
|`Error`|![button-error](images/button-themecolor-error.png)|
|`Dark`|![button-dark](images/button-themecolor-dark.png)|
|`Light`|![button-light](images/button-themecolor-light.png)|
|`Inverse`|![button-inverse](images/button-themecolor-inverse.png)|


>caption The built-in ThemeColors

````CSHTML
@* The built-in button colors *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.ThemeColor)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    <TelerikButtonGroup>
        @foreach (var field in fields)
        {
            string themeColor = field.GetValue(null).ToString();
            <ButtonGroupButton ThemeColor="@themeColor">@themeColor</ButtonGroupButton>
        }
    </TelerikButtonGroup>
}
````

