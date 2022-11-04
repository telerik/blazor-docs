---
title: Appearance
page_title: Calendar Appearance
description: Appearance settings of the Calendar for Blazor.
slug: calendar-appearance
tags: telerik,blazor,calendar,appearance
published: True
position: 30
---

# Appearance Settings

You can control the appearance of the Calendar by setting the following attribute:

## Size

You can increase or decrease the size of the Calendar by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.Calendar.Size` class:

| Class member | Manual declaration |
|---|---|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Calendar.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikCalendar @bind-Value="@DateValue" Size="@size"></TelerikCalendar>
        </div>
    }
}

@code {
    private DateTime DateValue { get; set; } = DateTime.Now;
}
````

## See Also

* [Live Demo: Calendar - Appearance](https://demos.telerik.com/blazor-ui/calendar/appearance)
