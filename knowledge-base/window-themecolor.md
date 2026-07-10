---
title: Apply Window ThemeColor
description: Learn how to apply background and color styles to the Telerik Window and Dialog components for Blazor in the same way as the removed ThemeColor parameter.
type: troubleshooting
page_title: How to Apply ThemeColor to Blazor Dialog and Window
meta_title: How to Apply ThemeColor to Blazor Dialog and Window
slug: window-kb-themecolor
tags: telerik, blazor, window, styles
ticketid: 1716488
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Window for Blazor, <br /> Dialog for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>14.0.0 and above</td>
        </tr>
    </tbody>
</table>

## Description

After upgrading Telerik UI for Blazor to version 14 and above, the `ThemeColor` parameter of the Window and Dialog components is no longer available. This article shows how to achieve the previous component appearance.

## Cause

The [changes in the `ThemeColor` parameter availability and theme color values](slug:changes-in-14-0-0#themecolor-changes) are a result of a design revision. The removed parameters and values were no longer deemed appropriate or recommended for the Telerik UI for Blazor design language.

## Solution

To apply a theme color to a Window or Dialog component:

1. Implement a CSS rule that applies `color` and `background-color` styles to `.k-window-titlebar`. The styles can use the built-in [Telerik CSS theme color variables](slug:themes-custom#setting-theme-variables). There is no need to override the variable values.
    ````CSS.skip-repl
    .window-primary .k-window-titlebar {
        color: var(--kendo-color-on-primary);
        background-color: var(--kendo-color-primary);
    }
    ````
1. Set the respective custom CSS class (for example, `window-primary`) to the Window or Dialog `Class` parameter.
    ````RAZOR.skip-repl
    <TelerikWindow Class="window-primary" />
    ````

>caption Set Dialog and Window theme color with CSS

````RAZOR
<TelerikWindow @bind-Visible="@WindowVisible"
               Class="@($"window-{ThemeColor}")"
               Width="400px">
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="Maximize" />
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        <p>Apply theme color:</p>
        <TelerikRadioGroup Data="@ThemeColors"
                           @bind-Value="@ThemeColor"
                           Layout="@RadioGroupLayout.Vertical" />
    </WindowContent>
</TelerikWindow>

<TelerikDialog @ref="@DialogRef"
               Class="@($"window-{ThemeColor}")"
               @bind-Visible="@DialogVisible"
               Width="400px">
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogContent>
        <p>Apply theme color:</p>
        <TelerikRadioGroup Data="@ThemeColors"
                           @bind-Value="@ThemeColor"
                           Layout="@RadioGroupLayout.Vertical"
                           OnChange="@(() => { DialogRef!.Refresh(); })" />
    </DialogContent>
</TelerikDialog>

<style>
    @foreach (var themeColor in ThemeColors)
    {
        @GetCssRuleForWindowThemeColor(themeColor)
    }
</style>

<TelerikButton OnClick="@(() => WindowVisible = true)"
               Visible="@(!WindowVisible && !DialogVisible)">
    Open Window
</TelerikButton>

<TelerikButton OnClick="@(() => DialogVisible = true)"
               Visible="@(!DialogVisible && !WindowVisible)">
    Open Dialog
</TelerikButton>

@code {
    private readonly string[] ThemeColors = new string[] { "primary", "secondary", "tertiary", "inverse", "info", "success", "warning", "error" };
    private string ThemeColor { get; set; } = string.Empty;

    private TelerikDialog? DialogRef;
    private bool DialogVisible { get; set; }
    private bool WindowVisible { get; set; } = true;

    private string GetCssRuleForWindowThemeColor(string themeColor)
    {
        return
            $".window-{themeColor} .k-window-titlebar" +
            "{" +
                $"color: var(--kendo-color-on-{themeColor});" +
                $"background-color: var(--kendo-color-{themeColor});" +
            "}";
    }

    protected override void OnInitialized()
    {
        ThemeColor = ThemeColors[0];

        base.OnInitialized();
    }
}
````

## See Also

* [Dialog Overview](slug:dialog-overview)
* [Window Overview](slug:window-overview)
