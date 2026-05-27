---
title: Replace Card ThemeColor
description: Learn how to replace the deprecated (obsolete) Card ThemeColor parameter
type: how-to
page_title: How to Replace Deprecated Card ThemeColor Parameter
slug: card-kb-replace-themecolor-parameter
tags: telerik, blazor, card, css
ticketid: 1714807
res_type: kb
components: ["card"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Card for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to replace the `ThemeColor` parameter of `TelerikCard` that was removed in version `14.0.0`?
* What to use instead of the deprecated Card `ThemeColor` parameter?

## Solution

1. Set the Card `Class` parameter to a value of your choice.
1. Define `border-color`, `background-color` and text `color` styles for the custom class that use the [color variables](https://www.telerik.com/design-system/docs/themes/kendo-themes/default/theme-variables/) for the desired theme color.

>caption Apply ThemeColor-like styles to Telerik Blazor Cards

````RAZOR
<div style="display: flex; gap: 1em; flex-wrap: wrap;">
    @foreach (string themeColor in CardThemeColors)
    {
        <TelerikCard Width="120px" Class="@($"card-theme-color card-{themeColor}")">
            <CardHeader>
                <CardTitle>@themeColor</CardTitle>
                <CardSubTitle>SubTitle</CardSubTitle>
            </CardHeader>
            <CardBody>
                <p>Lorem ipsum dolor sit amet.</p>
                <CardSeparator></CardSeparator>
                <p>Consectetur adipiscing elit.</p>
            </CardBody>
            <CardFooter>
                <p>Footer</p>
            </CardFooter>
        </TelerikCard>
    }
</div>

<style>
    @foreach (string themeColor in CardThemeColors)
    {
        @($".card-{themeColor}" + "{" +
            $"border-color: var(--kendo-color-{themeColor});" +
            $"background-color: var(--kendo-color-{themeColor}-subtle);" +
            $"color: var(--kendo-color-{themeColor}-on-subtle);" +
        "}")
    }

    .card-theme-color .k-card-header,
    .card-theme-color .k-card-subtitle,
    .card-theme-color .k-card-footer {
        color: inherit;
    }
</style>

@code {
    private readonly string[] CardThemeColors = new string[]
    {
        ThemeConstants.Button.ThemeColor.Base,
        ThemeConstants.Button.ThemeColor.Error,
        ThemeConstants.Button.ThemeColor.Info,
        ThemeConstants.Button.ThemeColor.Primary,
        ThemeConstants.Button.ThemeColor.Success,
        ThemeConstants.Button.ThemeColor.Warning,
        ThemeConstants.Button.ThemeColor.Inverse
    };
}
````

## Note

Using theme colors for Cards is not a recommended best practice from UI design perspective.

## See Also

* [Card Overview](slug:card-overview)
