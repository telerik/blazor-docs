---
title: Appearance
page_title: Pager Appearance
description: Appearance settings of the Pager for Blazor.
slug: pager-appearance
tags: telerik,blazor,pager,appearance
published: True
position: 35
---

# Appearance Settings

You can control the appearance of the Pager by setting the [Size](#size) attribute.

## Size

You can increase or decrease the size of the Pager by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Pager.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`   |`md`|
| `Large`   |`lg`|

>caption The built-in sizes

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.Pager.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikPager Size="@size"
                          PageSize="10"
                          Total="20" 
                          PageSizes="@(new List<int?> {5, 10, null})">
            </TelerikPager>
        </div>
    }
}
````