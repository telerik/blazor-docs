---
title: Appearance
page_title: DateRangePicker Appearance
description: Appearance settings of the DateRangePicker for Blazor.
slug: daterangepicker-appearance
tags: telerik,blazor,DateRangePicker,appearance
published: True
position: 35
components: ["daterangepicker"]
---
# Appearance Settings

You can control the appearance of the DateRangePicker by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the DateRangePicker by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.DateRangePicker.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.DateRangePicker.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikDateRangePicker @bind-StartValue="@StartValue"
                                    @bind-EndValue="@EndValue" Size="@size"></TelerikDateRangePicker>
        </div>
    }
}

@code {
    private DateTime StartValue { get; set; } = DateTime.Now;
    private DateTime EndValue { get; set; } = DateTime.Now.AddDays(6);
}
````

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the DateRangePicker to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DateRangePicker.Rounded` class:

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
    var fields = typeof(Telerik.Blazor.ThemeConstants.DateRangePicker.Rounded)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string rounded = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikDateRangePicker @bind-StartValue="@StartValue"
                                    @bind-EndValue="@EndValue" Rounded="@rounded"></TelerikDateRangePicker>
        </div>
    }
}

@code {
    private DateTime StartValue { get; set; } = DateTime.Now;
    private DateTime EndValue { get; set; } = DateTime.Now.AddDays(6);
}
````

## FillMode

The `FillMode` controls how the TelerikDateRangePicker is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DateRangePicker.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

````RAZOR
@* These are all built-in fill modes *@

@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.DateRangePicker.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikDateRangePicker @bind-StartValue="@StartValue"
                                    @bind-EndValue="@EndValue" FillMode="@fillMode"></TelerikDateRangePicker>
        </div>
    }
}

@code {
    private DateTime StartValue { get; set; } = DateTime.Now;
    private DateTime EndValue { get; set; } = DateTime.Now.AddDays(6);
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: DateRangePicker - Appearance](https://demos.telerik.com/blazor-ui/daterangepicker/appearance)
