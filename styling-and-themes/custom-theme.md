---
title: Customize Themes
page_title: Customize Themes
description: Learn how to create a custom theme for you Blazor application and alter the default appearance of the UI for Blazor components.
slug: themes-customize
tags: telerik,blazor,theme,custom
published: True
previous_url: /themes/custom-theme
position: 10
---

# Customize Themes

There are several ways to customize the appearance of Telerik Blazor components. Each is suitable for specific scenarios and business requirements. This article describes the pros and cons, and compares all CSS customization alternatives.

* [Create custom themes with the Progress ThemeBuilder](#using-themebuilder)
* [Override theme variables](#setting-theme-variables)
* [Override theme styles](#overriding-theme-styles)
* [Build custom themes manually](#building-themes-from-source-code)
* [Load a custom theme in your app](#loading-custom-themes)

> When you use custom themes for Telerik UI for Blazor components, you must recreate the custom theme every time you update the Telerik components in your application. This ensures compatibility and allows you to get the theme updates and fixes.


## Using ThemeBuilder

[ThemeBuilder](https://docs.telerik.com/themebuilder) is a web application that enables you to create new custom themes by changing the styles of existing built-in themes. Every change that you make is visualized instantly. Once you are done styling the UI components, you can export a ZIP file with the desired styles and [add the custom theme to your Blazor app](#loading-custom-themes).

The ThemeBuilder allows [different customization capabilities, depending on the used tier](https://docs.telerik.com/themebuilder/introduction#themebuilder-tiers).


## Setting Theme Variables

Each theme defines the same collection of variables, but with different values. For example, here are the <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/theme-variables/" target="_blank">Default theme variables</a>. You can override the theme variable values outside the theme CSS file. In this way, you can customize the appearance of the Telerik Blazor components without the need to create and maintain a full custom theme.

This approach is supported starting with theme version `8.0.0` and Telerik UI for Blazor version `6.0.0`. Upgrading the Blazor components does not require any additional steps with regard to the CSS code, unless there are breaking changes in the CSS variable names.

The example below shows how to customize some of the theme variables.

>caption Override theme variables

````RAZOR
@if (RenderCustomVariables)
{
    <style>
        :root {
            --kendo-color-base: #ddf;
            --kendo-color-base-hover: #eef;
            --kendo-color-base-active: #ccf;
            --kendo-color-on-base: #00c;

            --kendo-color-primary: #c00;
            --kendo-color-primary-hover: #c66;
            --kendo-color-primary-active: #900;
            --kendo-color-on-primary: #fee;

            --kendo-border-radius-md: 1rem;

            --kendo-font-size: 18px;
        }
    </style>
}

<p><label><TelerikCheckBox @bind-Value="@RenderCustomVariables" />
    Apply Custom Theme Variables</label></p>

<TelerikButton>Base Button</TelerikButton>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">
    Primary Button
</TelerikButton>

@code {
    private bool RenderCustomVariables { get; set; } = true;
}
````

## Overriding Theme Styles

You can [override theme styles with custom CSS](slug://themes-override), no matter if the app is using a built-in or custom theme. This approach makes sense only for a relatively small number of customizations. Beyond that, choose some of the other alternatives on this page.

Upgrading may require changes to the additional custom CSS code, but only if there are breaking changes in the HTML output and styling.


## Building Themes From Source Code

The most complex and flexible way to use Telerik themes is to build them from the SASS source code in your development environment.

Each <a href="https://www.telerik.com/design-system/docs/themes/kendo-themes/default/customization/" target="_blank">Theme Customization page in the Progress Design System Kit documentation</a> and the [kendo-themes repository wiki](https://github.com/telerik/kendo-themes/wiki/Compiling-themes) provide more information about this process.


## Loading Custom Themes

Custom themes are used in a [similar way as the built-in themes](slug://getting-started/what-you-need#css-theme). The notable differences are:

* The custom theme must reside in the `wwwroot` folder of the Blazor app or on a CDN provider.
* You must recreate custom themes every time you [update the Telerik UI for Blazor version](slug://upgrade-tutorial).

Make sure that the Blazor app is loading only one Telerik theme at a time. If you are replacing a built-in theme with a custom theme, you must remove the `<link>` element of the built-in theme.


## See Also

* [ThemeBuilder Online Tool](https://themebuilderapp.telerik.com)
* [ThemeBuilder Documentation](https://docs.telerik.com/themebuilder)
