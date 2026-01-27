---
title: Appearance
page_title: RadioButtonGroup Button Appearance
description: Appearance settings of the RadioButtonGroup Button for Blazor.
slug: radiogroup-appearance
tags: telerik,blazor,button,radio,radiobutton,appearance
published: True
position: 35
components: ["radiogroup"]
---
# Appearance Settings

You can control the appearance of the RadioButtonGroup button by setting the following attribute:

* [Size](#size)


## Size

Change the size of the radio buttons by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|---------------|--------|
|`Small`|`sm`|
|`Medium`|`md`|
|`Large` |`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Button.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();


    @foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikRadioGroup Size="@size"
                               Data="@Options"
                               @bind-Value="@ChosenOption">
            </TelerikRadioGroup>
        </div>
    }
}

@code{
    string ChosenOption { get; set; }

    List<string> Options { get; set; } = new List<string>()
    {
        "first", "second", "third"
    };
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
