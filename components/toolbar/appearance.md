---
title: Appearance
page_title: ToolBar Appearance
description: Appearance settings of the ToolBar for Blazor.
slug: toolbar-appearance
tags: telerik,blazor,toolbar,appearance
published: True
position: 35
---

# Appearance Settings

You can control the appearance of the ToolBar by setting the [Size](#size) attribute.

## Size

You can increase or decrease the size of the ToolBar by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.ToolBar.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`   |`md`|
| `Large`   |`lg`|

If the size option is not specified, it is set to `Medium` by default. 

>caption The built-in sizes

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.ToolBar.Size)
        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikToolBar Size="@size">
                <ToolBarButton Icon="cut">Cut</ToolBarButton>
                <ToolBarButton Icon="cut">Copy</ToolBarButton>
                <ToolBarButton Icon="cut">Paste</ToolBarButton>
            </TelerikToolBar>
        </div>
    }
}
````