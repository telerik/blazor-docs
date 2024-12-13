---
title: Appearance
page_title: CheckBox Appearance
description: Appearance settings of the CheckBox for Blazor.
slug: checkbox-appearance
tags: telerik,blazor,button,checkbox,appearance
published: True
position: 35
---

# Appearance Settings

You can control the appearance of the CheckBox button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)


## Size

You can increase or decrease the size of the CheckBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.CheckBox.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.CheckBox.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikCheckBox @bind-Value="@isSelected" Size="@size"></TelerikCheckBox>
        </div>
    }
}

@code{
    private bool isSelected { get; set; }
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the checkbox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.CheckBox.Rounded` class:

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in values of the Rounded attribute

````RAZOR
@* The built-in values of the Rounded attribute.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.CheckBox.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikCheckBox @bind-Value="@isSelected" Rounded="@rounded"></TelerikCheckBox>
        </div>
    }
}

@code{
    private bool isSelected { get; set; }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
