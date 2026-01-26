---
title: Appearance
page_title: MaskedTextBox Appearance
description: Appearance settings of the MaskedTextBox for Blazor.
slug: maskedtextbox-appearance
tags: telerik,blazor,button,maskedtextbox,mask,appearance
published: True
position: 55
components: ["maskedtextbox"]
---
# Appearance Settings

You can control the appearance of the MaskedTextBox button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the MaskedTextBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.MaskedTextBox.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.MaskedTextBox.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <TelerikMaskedTextBox @bind-Value="@MaskedTextBoxValue" Size="@size"></TelerikMaskedTextBox>
        </div>
    }
}

@code{
    private string MaskedTextBoxValue { get; set; }
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the textbox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MaskedTextBox.Rounded` class:

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
    var fields = typeof(Telerik.Blazor.ThemeConstants.MaskedTextBox.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <TelerikMaskedTextBox @bind-Value="@MaskedTextBoxValue" Rounded="@rounded"></TelerikMaskedTextBox>
        </div>
    }
}

@code{
    private string MaskedTextBoxValue { get; set; }
}
````

## FillMode

The `FillMode` controls how the TelerikMaskedTextBox is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MaskedTextBox.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.MaskedTextBox.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();
        
        <div style="float:left; margin: 20px;">
            <TelerikMaskedTextBox @bind-Value="@MaskedTextBoxValue" FillMode="@fillMode"></TelerikMaskedTextBox>
        </div>
    }
}

@code{
    private string MaskedTextBoxValue { get; set; }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
