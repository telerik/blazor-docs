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

This article outlines the available ToolBar parameters, which control its appearance.

## FillMode

The `FillMode` parameter controls if the ToolBar will have a background and borders. To set the parameter value, use the `string` members of the static class `ThemeConstants.ToolBar.FillMode`.

| `FillMode` Class Member | String Value |
| --- | --- |
| `Solid` (default) | `"solid"` |
| `Flat` | `"flat"` |
| `Outline` | `"outline"` |

>caption The built-in fill modes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.ToolBar.FillMode)
        .GetFields(System.Reflection.BindingFlags.Public
            | System.Reflection.BindingFlags.Static
            | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string fillMode = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikToolBar FillMode="@fillMode">
                <ToolBarButton Icon="@SvgIcon.Cut">Cut</ToolBarButton>
                <ToolBarButton Icon="@SvgIcon.Copy">Copy</ToolBarButton>
                <ToolBarButton Icon="@SvgIcon.Clipboard">Paste</ToolBarButton>
            </TelerikToolBar>
        </div>
    }
}
````

## Size

You can increase or decrease the size of the ToolBar by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.ToolBar.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`<br /> default value   |`md`|
| `Large`   |`lg`| 

>caption The built-in sizes

````RAZOR
@{
    var fields = typeof(Telerik.Blazor.ThemeConstants.ToolBar.Size)
        .GetFields(System.Reflection.BindingFlags.Public 
        | System.Reflection.BindingFlags.Static
        | System.Reflection.BindingFlags.FlattenHierarchy)
        .Where(field => field.IsLiteral && !field.IsInitOnly).ToList();

    foreach (var field in fields)
    {
        string size = field.GetValue(null).ToString();

        <div style="float:left; margin: 20px;">
            <TelerikToolBar Size="@size">
                <ToolBarButton Icon="@SvgIcon.Cut">Cut</ToolBarButton>
                <ToolBarButton Icon="@SvgIcon.Copy">Copy</ToolBarButton>
                <ToolBarButton Icon="@SvgIcon.Clipboard">Paste</ToolBarButton>
            </TelerikToolBar>
        </div>
    }
}
````

## See Also

* [Live Demo: ToolBar Appearance](https://demos.telerik.com/blazor-ui/toolbar/appearance)
* [Vertical ToolBar](slug:toolbar-kb-vertical-orientation-display)
