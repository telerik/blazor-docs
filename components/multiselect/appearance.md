---
title: Appearance
page_title: MultiSelect Appearance
description: Appearance settings of the MultiSelect for Blazor.
slug: multiselect-appearance
tags: telerik,blazor,multiselect,appearance
published: True
position: 65
components: ["multiselect"]
---
# Appearance Settings

You can control the appearance of the MultiSelect by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the MultiSelect by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.MultiSelect.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.MultiSelect.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikMultiSelect Data="@Countries"
                                Size="@size"
                                @bind-Value="@Values"
                                Width="350px"
                                AutoClose="false">
            </TelerikMultiSelect>
        </div>
    }
}

@code {
    List<string> Countries { get; set; } = new List<string>();
    List<string> Values { get; set; } = new List<string>();

    protected override void OnInitialized()
    {
        Countries.Add("Albania");
        Countries.Add("Bosnia & Herzegovina");
        Countries.Add("Bulgaria");
        Countries.Add("Croatia");
        Countries.Add("Kosovo");
        Countries.Add("North Macedonia");
        Countries.Add("Montenegro");
        Countries.Add("Serbia");
        Countries.Add("Slovenia");

        base.OnInitialized();
    }
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the MultiSelect to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MultiSelect.Rounded` class:

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
    var fields = typeof(Telerik.Blazor.ThemeConstants.MultiSelect.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikMultiSelect Data="@Countries"
                                Rounded="@rounded"
                                @bind-Value="@Values"
                                Width="350px"
                                AutoClose="false">
            </TelerikMultiSelect>
        </div>
    }
}

@code {
    List<string> Countries { get; set; } = new List<string>();
    List<string> Values { get; set; } = new List<string>();

    protected override void OnInitialized()
    {
        Countries.Add("Albania");
        Countries.Add("Bosnia & Herzegovina");
        Countries.Add("Bulgaria");
        Countries.Add("Croatia");
        Countries.Add("Kosovo");
        Countries.Add("North Macedonia");
        Countries.Add("Montenegro");
        Countries.Add("Serbia");
        Countries.Add("Slovenia");

        base.OnInitialized();
    }
}
````

## FillMode

The `FillMode` controls how the TelerikMultiSelect is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MultiSelect.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.MultiSelect.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikMultiSelect Data="@Countries"
                                FillMode="@fillMode"
                                @bind-Value="@Values"
                                Width="350px"
                                AutoClose="false">
            </TelerikMultiSelect>
        </div>
    }
}

@code {
    List<string> Countries { get; set; } = new List<string>();
    List<string> Values { get; set; } = new List<string>();

    protected override void OnInitialized()
    {
        Countries.Add("Albania");
        Countries.Add("Bosnia & Herzegovina");
        Countries.Add("Bulgaria");
        Countries.Add("Croatia");
        Countries.Add("Kosovo");
        Countries.Add("North Macedonia");
        Countries.Add("Montenegro");
        Countries.Add("Serbia");
        Countries.Add("Slovenia");

        base.OnInitialized();
    }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
