---
title: Custom Themes
page_title: Custom Themes
description: Learn how to create a custom theme for you Blazor application and alter the default appearance of the UI for Blazor components.
slug: themes-custom
tags: telerik,blazor,theme,custom
published: True
previous_url: /themes/custom-theme
position: 10
---

# Custom Themes

Custom themes allow you to modify the appearance of the Telerik UI for Blazor components, so they match the desired color scheme and your Blazor app coloring and style.

This article contains the following sections:

* [Compare the visual customization options for the Telerik Blazor components](#blazor-css-customization-options)
* [Create custom themes with the Progress ThemeBuilder](#using-themebuilder)
* [Customize theme variables](#setting-theme-variables)
* [Build custom themes manually](#building-themes-from-source-code)
* [Load a custom theme in your app](#loading-custom-themes)
* [Contribute](#contribution)

> When you use custom themes for Telerik UI for Blazor components, you must recreate the custom theme every time you update the Telerik components in your application. This ensures compatibility and allows you to get the theme updates and fixes.


## Visual Customization Options

You can customize the appearance of the Telerik Blazor components in several ways. Each has pros and cons, and each is most suitable for specific scenarios and business requirements. The [Blazor Theme Customization Options]({%slug common-kb-theme-customization-options%}) article offers a comparison between these CSS customization alternatives.


## Using ThemeBuilder

[ThemeBuilder]({%slug themebuilder%}) is a web application that enables you to create new custom themes by changing the styles of existing built-in themes. Every change that you make is visualized almost instantly. Once you are done styling the UI components, you can export a ZIP file with the desired styles and [use the custom theme in your Blazor app](#loading-custom-themes).


## Setting Theme Variables

The Telerik themes define a collection of theme variables and values. Then, these variables take part in CSS rules to apply consistent styles to all Telerik Blazor components.

It is possible to customize the appearance of our components by overriding the theme variable values outside the theme CSS file. This spares the need to create and maintain a full custom theme.

Each theme defines the same collection of variables, but with different values:

* [Default theme variables](https://www.telerik.com/design-system/docs/themes/theme-default/theme-variables/)
* [Bootstrap theme variables](https://www.telerik.com/design-system/docs/themes/theme-bootstrap/theme-variables/)
* [Material theme variables](https://www.telerik.com/design-system/docs/themes/theme-material/theme-variables/)
* [Fluent theme variables](https://www.telerik.com/design-system/docs/themes/theme-fluent/theme-variables/)

The example below shows how to customize some of the theme variables.

>caption Override theme color variables

````CSHTML
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
    private bool RenderCustomVariables { get; set; }
}
````


## Building Themes From Source Code

The most complex and flexible way to use Telerik themes is to build them from the SASS source code in your development environment.

The [Theme Customization page of the Progress Design System documentation](https://www.telerik.com/design-system/docs/themes/customization/) and the [kendo-themes repository wiki](https://github.com/telerik/kendo-themes/wiki/Compiling-themes) provide more information about this process.


## Loading Custom Themes

Custom themes are used in a [similar way as the built-in themes]({%slug getting-started/what-you-need%}#css-theme). The notable differences are:

* The custom theme must reside in the `wwwroot` folder of the Blazor app or on a custom CDN provider.
* You must [recreate custom themes every time you update the Telerik UI for Blazor version]({%slug upgrade-tutorial%}).

Make sure that the Blazor app is loading only one Telerik theme at a time. If you are replacing a built-in theme with a custom theme, you must remove the `<link>` element of the built-in theme.

>caption Adding a custom Telerik theme

<div class="skip-repl"></div>

````HTML
<head>
    <!-- custom Telerik stylesheet in wwwroot/telerik/ -->
    <link rel="stylesheet" href="telerik/custom-theme.css" />

    <!-- other application stylesheets -->
</head>
````


## Contribution

To contribute to the development of the Kendo UI Themes, go to the [telerik/kendo-themes](https://github.com/telerik/kendo-themes) GitHub repository.


## See Also

* [Progress ThemeBuilder](https://themebuilderapp.telerik.com)
* [Progress ThemeBuilder Documentation](https://docs.telerik.com/themebuilder)
* [Kendo SASS Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes)
