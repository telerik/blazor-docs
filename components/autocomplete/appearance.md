---
title: Appearance
page_title: AutoComplete Appearance
description: Appearance settings of the AutoComplete for Blazor.
slug: autocomplete-appearance
tags: telerik,blazor,autocomplete,appearance
published: True
position: 65
components: ["autocomplete"]
---
# Appearance Settings

You can control the appearance of the AutoComplete by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the AutoComplete by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.AutoComplete.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.AutoComplete.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikAutoComplete Data="@Suggestions"
                                 Size="@size"
                                 @bind-Value="@TheValue" />
        </div>
    }
}

@code {
    string TheValue { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the AutoComplete to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.AutoComplete.Rounded` class:

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
    var fields = typeof(Telerik.Blazor.ThemeConstants.AutoComplete.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikAutoComplete Data="@Suggestions"
                                 Rounded="@rounded"
                                 @bind-Value="@TheValue" />
        </div>
    }
}

@code {
    string TheValue { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

## FillMode

The `FillMode` controls how the TelerikAutoComplete is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.AutoComplete.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.AutoComplete.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikAutoComplete Data="@Suggestions"
                                 FillMode="@fillMode"
                                 @bind-Value="@TheValue" />
        </div>
    }
}

@code {
    string TheValue { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
