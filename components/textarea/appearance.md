---
title: Appearance
page_title: TextArea Appearance
description: Appearance settings of the TextArea for Blazor.
slug: TextArea-appearance
tags: telerik,blazor,button,TextArea,appearance
published: True
position: 35
components: ["textarea"]
---
# Appearance Settings

You can control the appearance of the TextArea button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the TextArea by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.TextArea.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.TextArea.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <TelerikTextArea @bind-Value="@TextAreaValue" Size="@size"></TelerikTextArea>
        </div>
    }
}

@code{
    private string TextAreaValue { get; set; }
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the TextArea to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextArea.Rounded` class:

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
    var fields = typeof(Telerik.Blazor.ThemeConstants.TextArea.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <TelerikTextArea @bind-Value="@TextAreaValue" Rounded="@rounded"></TelerikTextArea>
        </div>
    }
}

@code{
    private string TextAreaValue { get; set; }
}
````

## FillMode

The `FillMode` controls how the TelerikTextArea is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextArea.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.TextArea.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <span>@fillMode</span>
            <TelerikTextArea @bind-Value="@TextAreaValue" FillMode="@fillMode"></TelerikTextArea>
        </div>
    }
}

@code{
    private string TextAreaValue { get; set; }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
