---
title: Appearance
page_title: TextBox Appearance
description: Appearance settings of the TextBox for Blazor.
slug: textbox-appearance
tags: telerik,blazor,button,textbox,appearance
published: True
position: 35
---

# Appearance Settings

You can control the appearance of the TextBox button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the TextBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.TextBox.Size` class:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.TextBox.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <TelerikTextBox @bind-Value="@TextBoxValue" Size="@size"></TelerikTextBox>
        </div>
    }
}

@code{
    private string TextBoxValue { get; set; }
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the textbox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextBox.Rounded` class:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

````CSHTML
@* The built-in values of the Rounded attribute.  *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.TextBox.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <TelerikTextBox @bind-Value="@TextBoxValue" Rounded="@rounded"></TelerikTextBox>
        </div>
    }
}

@code{
    private string TextBoxValue { get; set; }
}
````

## FillMode

The `FillMode` controls how the TelerikTextBox is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextBox.FillMode` class:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````CSHTML
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.TextBox.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <span>@fillMode</span>
            <TelerikTextBox @bind-Value="@TextBoxValue" FillMode="@fillMode"></TelerikTextBox>
        </div>
    }
}

@code{
    private string TextBoxValue { get; set; }
}
````

